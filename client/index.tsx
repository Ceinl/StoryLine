import { SignInWithGoogle, signOut, useAuth, useMutation, useQuery } from "lakebed/client";
import {
  cleanTimelineDate,
  cleanTimelineDescription,
  cleanTimelineTitle,
  cleanTimelineTrack,
  getEventTrackIds,
  type AdminQueue,
  type ProposedTimelineEvent,
  type TimelineData,
  type TimelineEvent,
  type TimelineEventInput,
  type Track
} from "../shared/timeline";

let tracks: Track[] = [];
let events: TimelineEvent[] = [];
let selectedTrackIds = new Set(["general", "openai", "anthropic", "google", "xai", "open-source", "restrictions"]);
let splitMode = true;
let minDate = new Date();
let maxDate = new Date();
let dateRange = 1;
let monthMarkers: Date[] = [];
let timelineWidth = 3200;

const emptyTimeline: TimelineData = { tracks: [], events: [] };
const emptyAdminQueue: AdminQueue = { isAdmin: false, pending: [] };

function dedupeEvents(list: TimelineEvent[]): TimelineEvent[] {
  const seen = new Set<string>();
  return list.filter((event) => {
    if (seen.has(event.id)) {
      return false;
    }
    seen.add(event.id);
    return true;
  });
}

function setTimelineData(data: Partial<TimelineData> | undefined) {
  tracks = Array.isArray(data?.tracks) ? data.tracks : [];
  events = Array.isArray(data?.events) ? dedupeEvents([...data.events]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];

  if (events.length === 0) {
    minDate = new Date();
    maxDate = new Date();
    dateRange = 1;
    monthMarkers = [];
    timelineWidth = 3200;
    return;
  }

  const times = events.map((event) => new Date(event.date).getTime());
  minDate = new Date(Math.min(...times));
  maxDate = new Date(Math.max(...times));
  dateRange = Math.max(1, maxDate.getTime() - minDate.getTime());
  monthMarkers = createMonthMarkers(minDate, maxDate);
  timelineWidth = Math.max(3200, monthMarkers.length * 360);
}

function createMonthMarkers(startDate: Date, endDate: Date): Date[] {
  const markers: Date[] = [];
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);

  for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
    markers.push(new Date(date));
  }

  return markers;
}

function getTrack(trackId: string): Track {
  return tracks.find((track) => track.id === trackId) ?? tracks[0] ?? { id: "general", name: "General AI", color: "#E5E5E5", description: "" };
}

function getEventsForTrack(trackId: string): TimelineEvent[] {
  return events.filter((event) => getEventTrackIds(event).includes(trackId));
}

function getEventPosition(dateString: string): number {
  const position = ((new Date(dateString).getTime() - minDate.getTime()) / dateRange) * 100;
  return Math.min(100, Math.max(0, position));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function searchText(event: TimelineEvent): string {
  const track = getTrack(event.track);
  return [event.title, event.description, event.date, track.name, ...(event.links?.map((link) => link.label) ?? [])]
    .join(" ")
    .toLowerCase();
}

function queryAll<T extends HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll(selector)) as T[];
}

function setSplitMode(nextValue: boolean) {
  splitMode = nextValue;
  document.querySelector<HTMLElement>('[data-view="split"]')?.classList.toggle("hidden", !splitMode);
  document.querySelector<HTMLElement>('[data-view="unified"]')?.classList.toggle("hidden", splitMode);

  const button = document.querySelector<HTMLButtonElement>('[data-action="toggle-split"]');
  if (button) {
    button.textContent = splitMode ? "Split by Organization" : "Unified Timeline";
    button.classList.toggle("bg-[#ff6b35]", splitMode);
    button.classList.toggle("text-black", splitMode);
    button.classList.toggle("text-[#e5e5e5]", !splitMode);
  }
}

function toggleTrack(trackId: string) {
  if (selectedTrackIds.has(trackId)) {
    selectedTrackIds.delete(trackId);
  } else {
    selectedTrackIds.add(trackId);
  }

  const selected = selectedTrackIds.has(trackId);
  const track = getTrack(trackId);
  document.querySelector<HTMLElement>(`[data-track-row="${trackId}"]`)?.classList.toggle("hidden", !selected);

  const button = document.querySelector<HTMLButtonElement>(`[data-track-button="${trackId}"]`);
  if (button) {
    button.style.background = selected ? track.color : "transparent";
    button.style.borderColor = selected ? track.color : "#2a2a2a";
    button.style.color = selected ? "#000000" : "#e5e5e5";
    button.style.opacity = selected ? "1" : "0.5";
  }
}

function updateSearch(input: HTMLInputElement) {
  const query = input.value.trim().toLowerCase();
  const hasQuery = query.length > 0;
  const matches = new Set<string>();

  queryAll<HTMLButtonElement>("[data-result-id]").forEach((result) => {
    const isMatch = hasQuery && (result.dataset.resultSearch ?? "").includes(query);
    result.classList.toggle("hidden", !isMatch);
    if (isMatch && result.dataset.resultId) {
      matches.add(result.dataset.resultId);
    }
  });

  queryAll<HTMLElement>("[data-event-id]").forEach((dot) => {
    const isMatch = dot.dataset.eventId ? matches.has(dot.dataset.eventId) : false;
    dot.style.opacity = !hasQuery || isMatch ? "1" : "0.25";
    dot.style.filter = !hasQuery || isMatch ? "none" : "grayscale(1)";
    dot.style.boxShadow = hasQuery && isMatch ? `0 0 20px ${dot.dataset.eventColor ?? "#ff6b35"}` : "none";
  });

  const emptyState = document.querySelector<HTMLElement>('[data-search-empty="true"]');
  emptyState?.classList.toggle("hidden", !hasQuery || matches.size > 0);
  document.querySelector<HTMLElement>('[data-search-panel="true"]')?.classList.toggle("hidden", !hasQuery);
}

// A marker instance is one dot on one track row; shared news renders one
// instance per track, so cards and pins are keyed by instance while
// highlighting spans every instance of the same event.
let pinned: { instanceId: string; eventId: string } | null = null;

function clearSharedConnector() {
  document.querySelector<SVGSVGElement>('[data-connector="true"]')?.replaceChildren();
}

function drawSharedConnector(eventId: string) {
  const svg = document.querySelector<SVGSVGElement>('[data-connector="true"]');
  if (!svg) {
    return;
  }

  clearSharedConnector();
  const dots = queryAll<HTMLElement>(`[data-view="split"] [data-event-id="${eventId}"]`).filter((dot) => dot.getClientRects().length > 0);
  if (dots.length < 2) {
    return;
  }

  const svgRect = svg.getBoundingClientRect();
  const points = dots
    .map((dot) => {
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top,
        color: dot.dataset.eventColor ?? "#ff6b35"
      };
    })
    .sort((a, b) => a.y - b.y);

  for (let i = 0; i < points.length - 1; i += 1) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(points[i].x));
    line.setAttribute("y1", String(points[i].y));
    line.setAttribute("x2", String(points[i + 1].x));
    line.setAttribute("y2", String(points[i + 1].y));
    line.setAttribute("stroke", points[i].color);
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", "6 4");
    svg.appendChild(line);
  }
}

function highlightEventNodes(eventId: string) {
  queryAll<HTMLElement>(`[data-event-id="${eventId}"]`).forEach((dot) => {
    dot.style.transform = "scale(1.5)";
    dot.style.boxShadow = `0 0 20px ${dot.dataset.eventColor ?? "#ff6b35"}`;
  });
  drawSharedConnector(eventId);
}

function unhighlightEventNodes(eventId: string) {
  queryAll<HTMLElement>(`[data-event-id="${eventId}"]`).forEach((dot) => {
    dot.style.transform = "";
    dot.style.boxShadow = "";
  });
  clearSharedConnector();
}

function revealCard(instanceId: string, eventId: string) {
  queryAll<HTMLElement>(`[data-card-id="${instanceId}"]`).forEach((card) => card.classList.remove("hidden"));
  queryAll<HTMLElement>(`[data-marker-id="${instanceId}"]`).forEach((marker) => {
    marker.style.zIndex = "40";
  });
  highlightEventNodes(eventId);
  positionEventCards(instanceId);
}

function concealCard(instanceId: string, eventId: string) {
  queryAll<HTMLElement>(`[data-card-id="${instanceId}"]`).forEach((card) => card.classList.add("hidden"));
  queryAll<HTMLElement>(`[data-marker-id="${instanceId}"]`).forEach((marker) => {
    marker.style.zIndex = "";
  });
  unhighlightEventNodes(eventId);
}

function handleMarkerEnter(instanceId: string, eventId: string) {
  revealCard(instanceId, eventId);
}

function handleMarkerLeave(instanceId: string, eventId: string) {
  if (pinned?.instanceId !== instanceId) {
    concealCard(instanceId, eventId);
    if (pinned) {
      // Leaving an unpinned marker must not strip the pinned event's highlight.
      highlightEventNodes(pinned.eventId);
    }
  }
}

function pinCard(instanceId: string, eventId: string) {
  if (pinned && pinned.instanceId !== instanceId) {
    concealCard(pinned.instanceId, pinned.eventId);
  }
  pinned = { instanceId, eventId };
  revealCard(instanceId, eventId);
}

function togglePinnedCard(instanceId: string, eventId: string) {
  if (pinned?.instanceId === instanceId) {
    unpinCard();
  } else {
    pinCard(instanceId, eventId);
  }
}

function unpinCard() {
  if (!pinned) {
    return;
  }
  const { instanceId, eventId } = pinned;
  pinned = null;
  concealCard(instanceId, eventId);
}

function dismissCard(instanceId: string, eventId: string) {
  if (pinned?.instanceId === instanceId) {
    pinned = null;
  }
  concealCard(instanceId, eventId);
}

// Search results pin on mousedown and then hide the panel, so the browser
// retargets the following click to whatever is under the cursor; swallow that
// one click so it cannot instantly unpin the card we just opened.
let suppressNextUnpin = false;

function suppressUnpinForNextClick() {
  suppressNextUnpin = true;
  window.setTimeout(() => {
    suppressNextUnpin = false;
  }, 300);
}

if (typeof document !== "undefined") {
  document.addEventListener("click", (event) => {
    if (suppressNextUnpin) {
      suppressNextUnpin = false;
      return;
    }
    const target = event.target as HTMLElement | null;
    // Keep the card open when the click is on a marker or on a search result
    // (search results pin a card via focusEvent on mousedown).
    if (target && !target.closest("[data-marker-id], [data-result-id]")) {
      unpinCard();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      unpinCard();
    }
  });
}

function positionEventCards(eventId: string) {
  window.requestAnimationFrame(() => {
    queryAll<HTMLElement>(`[data-card-id="${eventId}"]`).forEach((card) => {
      card.style.top = "2rem";
      card.style.bottom = "auto";

      if (card.getBoundingClientRect().bottom > window.innerHeight - 24) {
        card.style.top = "auto";
        card.style.bottom = "2rem";
      }
    });
  });
}

function focusEvent(event: TimelineEvent) {
  if (splitMode && !selectedTrackIds.has(event.track)) {
    toggleTrack(event.track);
  }

  const input = document.querySelector<HTMLInputElement>('[data-search-input="true"]');
  if (input) {
    input.value = event.title;
    updateSearch(input);
  }

  // Shared news has one dot per track row; target the first visible one so we
  // never pin a card inside a hidden row.
  const dots = queryAll<HTMLElement>(`[data-view="${splitMode ? "split" : "unified"}"] [data-event-id="${event.id}"]`);
  const activeDot = dots.find((dot) => dot.getClientRects().length > 0) ?? dots[0];
  const instanceId = activeDot?.closest<HTMLElement>("[data-marker-id]")?.dataset.markerId;
  if (instanceId) {
    pinCard(instanceId, event.id);
    suppressUnpinForNextClick();
  }
  document.querySelector<HTMLElement>('[data-search-panel="true"]')?.classList.add("hidden");

  window.requestAnimationFrame(() => {
    const container = document.querySelector<HTMLElement>('[data-timeline-scroll="true"]');
    if (!container || !activeDot) {
      return;
    }

    const dotLeft = (Number(activeDot.dataset.eventPosition ?? "0") / 100) * timelineWidth;
    container.scrollTo({ left: Math.max(0, dotLeft - container.clientWidth / 2), behavior: "smooth" });
  });
}

function scrollTimelineToEnd(container: HTMLElement | null) {
  // Wait until the timeline data has loaded and the row has its final width,
  // otherwise we would scroll to the end of the empty placeholder and land back
  // on the left once the real events expand the timeline.
  if (!container || container.dataset.initialScroll === "done" || events.length === 0) {
    return;
  }

  container.dataset.initialScroll = "done";
  window.requestAnimationFrame(() => {
    container.scrollLeft = container.scrollWidth;
  });
}

function buildProposalInput(data: FormData): TimelineEventInput {
  return {
    date: cleanTimelineDate(String(data.get("date") ?? "")),
    title: cleanTimelineTitle(String(data.get("title") ?? "")),
    description: cleanTimelineDescription(String(data.get("description") ?? "")),
    track: cleanTimelineTrack(String(data.get("track") ?? ""), tracks),
    linkLabel: String(data.get("linkLabel") ?? ""),
    linkUrl: String(data.get("linkUrl") ?? "")
  };
}

function AuthControls({ isLoading, isGuest, displayName, picture }: { isLoading: boolean; isGuest: boolean; displayName: string; picture?: string }) {
  if (isLoading) {
    return <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-[#666666]">Checking session</span>;
  }

  if (isGuest) {
    return <SignInWithGoogle className="border border-[#2a2a2a] px-3 py-2 font-mono text-[11px] font-black uppercase tracking-wide text-[#e5e5e5] hover:border-[#ff6b35]" />;
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      {picture ? <img alt="" className="h-7 w-7 rounded-full border border-[#2a2a2a] object-cover" referrerPolicy="no-referrer" src={picture} /> : null}
      <span className="hidden max-w-36 truncate font-mono text-[11px] font-bold uppercase tracking-wide text-[#a0a0a0] sm:block">{displayName}</span>
      <button className="font-mono text-[11px] font-black uppercase tracking-wide text-[#666666] hover:text-white" onClick={() => signOut()} type="button">
        Sign out
      </button>
    </div>
  );
}

function ProposalForm({ proposeEvent }: { proposeEvent: (input: TimelineEventInput) => Promise<string> }) {
  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = buildProposalInput(new FormData(form));
    if (!input.date || !input.title || !input.description || !input.track) {
      window.alert("Add a date, title, description, and track before submitting.");
      return;
    }

    const result = await proposeEvent(input);
    form.reset();
    window.alert(result === "approved" ? "News added to the timeline." : "Proposal sent for review.");
  }

  return (
    <details className="relative">
      <summary className="cursor-pointer list-none border-2 border-[#ff6b35] px-4 py-2 font-mono text-xs font-black uppercase tracking-wide text-[#ff6b35] transition hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:text-black">
        Propose news
      </summary>
      <form className="absolute right-0 top-full z-[80] mt-2 w-[min(92vw,28rem)] border-2 border-[#ff6b35] bg-[#161616] p-4 shadow-[8px_8px_0_rgba(255,107,53,0.25)]" onSubmit={(event) => void onSubmit(event)}>
        <div className="mb-3 grid gap-3 sm:grid-cols-[9rem_1fr]">
          <input className="border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none focus:border-[#ff6b35]" name="date" required type="date" />
          <select className="border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none focus:border-[#ff6b35]" name="track" required>
            <option value="">Track</option>
            {tracks.map((track) => <option key={track.id} value={track.id}>{track.name}</option>)}
          </select>
        </div>
        <input className="mb-3 w-full border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none placeholder:text-[#666666] focus:border-[#ff6b35]" name="title" placeholder="News title" required />
        <textarea className="mb-3 min-h-28 w-full border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none placeholder:text-[#666666] focus:border-[#ff6b35]" name="description" placeholder="What happened?" required />
        <div className="mb-4 grid gap-3 sm:grid-cols-[9rem_1fr]">
          <input className="border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none placeholder:text-[#666666] focus:border-[#ff6b35]" name="linkLabel" placeholder="Link label" />
          <input className="border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 font-mono text-sm text-[#f2f2f2] outline-none placeholder:text-[#666666] focus:border-[#ff6b35]" name="linkUrl" placeholder="https://..." type="url" />
        </div>
        <button className="w-full border-2 border-[#ff6b35] bg-[#ff6b35] px-4 py-2 font-mono text-xs font-black uppercase tracking-wide text-black" type="submit">
          Submit proposal
        </button>
      </form>
    </details>
  );
}

function AdminReview({ queue, decideProposal }: { queue: AdminQueue; decideProposal: (id: string, decision: string) => Promise<void> }) {
  if (!queue.isAdmin) {
    return null;
  }

  return (
    <details className="relative">
      <summary className="cursor-pointer list-none border border-[#2a2a2a] px-3 py-2 font-mono text-[11px] font-black uppercase tracking-wide text-[#e5e5e5] hover:border-[#ff6b35]">
        Review queue ({queue.pending.length})
      </summary>
      <div className="absolute right-0 top-full z-[80] mt-2 max-h-[70vh] w-[min(94vw,34rem)] overflow-y-auto border-2 border-[#ff6b35] bg-[#161616] p-4 shadow-[8px_8px_0_rgba(255,107,53,0.25)]">
        {queue.pending.length === 0 ? (
          <p className="font-mono text-sm text-[#666666]">No pending proposals.</p>
        ) : queue.pending.map((proposal) => <ProposalReviewCard decideProposal={decideProposal} key={proposal.id} proposal={proposal} />)}
      </div>
    </details>
  );
}

function ProposalReviewCard({ proposal, decideProposal }: { proposal: ProposedTimelineEvent; decideProposal: (id: string, decision: string) => Promise<void> }) {
  const track = getTrack(proposal.track);

  return (
    <article className="border-b border-[#2a2a2a] py-4 last:border-b-0 first:pt-0">
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: track.color }}>
        {formatDate(proposal.date)} / {track.name} / proposed by {proposal.proposedByName}
      </p>
      <h3 className="mb-2 text-lg font-black leading-tight tracking-tight text-[#f2f2f2] [font-family:Georgia,serif]">{proposal.title}</h3>
      <p className="text-sm leading-relaxed text-[#a0a0a0]">{proposal.description}</p>
      {proposal.links && proposal.links.length > 0 ? (
        <a className="mt-2 inline-block font-mono text-xs font-bold underline decoration-2 underline-offset-4 hover:opacity-70" href={proposal.links[0].url} rel="noopener noreferrer" style={{ color: track.color }} target="_blank">
          {proposal.links[0].label} -&gt;
        </a>
      ) : null}
      <div className="mt-3 flex gap-2">
        <button className="border border-[#4CAF50] bg-[#4CAF50] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-black" onClick={() => void decideProposal(proposal.id, "approve")} type="button">
          Approve
        </button>
        <button className="border border-[#2a2a2a] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[#a0a0a0] hover:border-[#ff6b35] hover:text-white" onClick={() => void decideProposal(proposal.id, "deny")} type="button">
          Deny
        </button>
      </div>
    </article>
  );
}

function EventMarker({ event, track, viewId, index, compact = false }: { event: TimelineEvent; track: Track; viewId: string; index: number; compact?: boolean }) {
  const position = getEventPosition(event.date);
  const pinStyle = { background: track.color };
  const cardAlign = position > 86 ? "right-0" : "left-1/2 -translate-x-1/2";
  const instanceId = `${event.id}::${viewId}`;

  return (
    <div
      className="group absolute top-8 z-20"
      data-marker-id={instanceId}
      onMouseEnter={() => handleMarkerEnter(instanceId, event.id)}
      onMouseLeave={() => handleMarkerLeave(instanceId, event.id)}
      style={{ left: `${position}%`, animationDelay: `${Math.min(index * 35, 900)}ms` }}
    >
      <button
        aria-label={`${event.title}, ${formatDate(event.date)}`}
        className="block h-5 w-5 rounded-full border-4 border-[#0a0a0a] transition-all duration-200 hover:scale-150 focus:scale-150 focus:outline-none"
        data-event-color={track.color}
        data-event-id={event.id}
        data-event-position={String(position)}
        onClick={() => togglePinnedCard(instanceId, event.id)}
        style={pinStyle}
        type="button"
      />
      <article
        className={`hidden absolute z-50 w-72 border-2 bg-[#161616] p-4 shadow-[8px_8px_0_rgba(255,107,53,0.28)] ${cardAlign}`}
        data-card-id={instanceId}
        onMouseEnter={() => positionEventCards(instanceId)}
        style={{ borderColor: track.color }}
      >
        <button
          aria-label="Close"
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center border border-[#2a2a2a] font-mono text-base leading-none text-[#a0a0a0] transition hover:border-[#ff6b35] hover:text-white"
          onClick={() => dismissCard(instanceId, event.id)}
          type="button"
        >
          ×
        </button>
        <p className="mb-2 pr-8 font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: track.color }}>
          {formatDate(event.date)} / {track.name}
        </p>
        <h3 className="mb-2 text-lg font-black leading-tight tracking-tight text-[#f2f2f2] [font-family:Georgia,serif]">
          {event.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#a0a0a0]">{event.description}</p>
        {event.links && event.links.length > 0 ? (
          <div className="mt-3 flex flex-col gap-1">
            {event.links.map((link) => (
              <a
                className="font-mono text-xs font-bold underline decoration-2 underline-offset-4 hover:opacity-70"
                href={link.url}
                key={link.url}
                rel="noopener noreferrer"
                style={{ color: track.color }}
                target="_blank"
              >
                {link.label} -&gt;
              </a>
            ))}
          </div>
        ) : null}
        {compact ? <div className="mt-3 h-1 w-14" style={{ background: track.color }} /> : null}
      </article>
    </div>
  );
}

function DateMarkers() {
  const years = Array.from(new Set(events.map((event) => new Date(event.date).getFullYear())));

  return (
    <div className="absolute inset-x-0 top-0 h-24">
      {years.map((year) => (
        <div
          className="absolute top-0 text-4xl font-black text-[#a0a0a0]/25 [font-family:Georgia,serif]"
          key={year}
          style={{ left: `${getEventPosition(`${year}-01-01`)}%` }}
        >
          {year}
        </div>
      ))}
      {monthMarkers.map((marker) => (
        <div
          className="absolute top-12 font-mono text-xs font-semibold uppercase text-[#666666]"
          key={marker.toISOString()}
          style={{ left: `${getEventPosition(marker.toISOString())}%` }}
        >
          {marker.toLocaleDateString("en-US", { month: "short" })}
        </div>
      ))}
    </div>
  );
}

export function App() {
  const auth = useAuth();
  const timeline = useQuery<TimelineData>("timeline") ?? emptyTimeline;
  const adminQueue = useQuery<AdminQueue>("adminQueue") ?? emptyAdminQueue;
  const proposeEvent = useMutation<[input: TimelineEventInput], string>("proposeEvent");
  const decideProposal = useMutation<[id: string, decision: string], void>("decideProposal");

  setTimelineData(timeline);

  return (
    <main className="relative h-dvh overflow-hidden bg-[#0a0a0a] text-[#e5e5e5] [font-family:'JetBrains_Mono',ui-monospace,SFMono-Regular,Menlo,monospace]">
      <div className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:4px_4px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur">
        <div className="grid gap-4 px-5 py-4 xl:grid-cols-[minmax(0,1fr)_22rem_auto] lg:px-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="border-2 border-[#ff6b35] bg-[#ff6b35] px-4 py-2 font-mono text-xs font-black uppercase tracking-wide text-black transition hover:-translate-y-0.5"
                data-action="toggle-split"
                onClick={() => setSplitMode(!splitMode)}
                type="button"
              >
                Split by Organization
              </button>
              {tracks.map((track) => {
                const isSelected = selectedTrackIds.has(track.id);
                return (
                  <button
                    className="border px-3 py-2 font-mono text-[11px] font-bold transition hover:opacity-100"
                    data-track-button={track.id}
                    key={track.id}
                    onClick={() => toggleTrack(track.id)}
                    style={{
                      background: isSelected ? track.color : "transparent",
                      borderColor: isSelected ? track.color : "#2a2a2a",
                      color: isSelected ? "#000000" : "#e5e5e5",
                      opacity: isSelected ? 1 : 0.5
                    }}
                    type="button"
                  >
                    {track.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full self-start">
            <input
              className="w-full border-2 border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 pr-10 font-mono text-sm font-bold text-[#f2f2f2] outline-none placeholder:text-[#666666] focus:border-[#ff6b35]"
              data-search-input="true"
              onBlur={() => window.setTimeout(() => document.querySelector<HTMLElement>('[data-search-panel="true"]')?.classList.add("hidden"), 160)}
              onFocus={(event) => updateSearch(event.currentTarget as HTMLInputElement)}
              onInput={(event) => updateSearch(event.currentTarget as HTMLInputElement)}
              placeholder="Search timeline..."
              type="search"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6b35]">⌕</span>
            <div
              className="absolute right-0 top-full z-[60] mt-2 hidden max-h-80 w-full overflow-y-auto border-2 border-[#ff6b35] bg-[#161616] shadow-[8px_8px_0_rgba(255,107,53,0.25)]"
              data-search-panel="true"
            >
              {events.map((event) => {
                const track = getTrack(event.track);
                return (
                  <button
                    className="hidden w-full border-b border-[#2a2a2a] px-4 py-3 text-left transition last:border-b-0 hover:bg-[#ff6b35] hover:text-black"
                    data-result-id={event.id}
                    data-result-search={searchText(event)}
                    key={event.id}
                    onMouseDown={(mouseEvent) => {
                      mouseEvent.preventDefault();
                      focusEvent(event);
                    }}
                    type="button"
                  >
                    <span className="block font-mono text-[10px] font-black uppercase tracking-[0.16em]">
                      {formatDate(event.date)} / {track.name}
                    </span>
                    <span className="mt-1 block text-sm font-black leading-tight [font-family:Georgia,serif]">{event.title}</span>
                  </button>
                );
              })}
              <div className="hidden px-4 py-3 font-mono text-sm text-[#666666]" data-search-empty="true">No matching events</div>
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-end gap-2">
            <ProposalForm proposeEvent={proposeEvent} />
            <AdminReview decideProposal={decideProposal} queue={adminQueue} />
            <AuthControls displayName={auth.displayName} isGuest={auth.isGuest} isLoading={auth.isLoading} picture={auth.picture} />
          </div>
        </div>
      </header>

      <section
        className="absolute inset-x-0 bottom-0 top-[236px] overflow-x-auto overflow-y-hidden px-5 sm:top-[190px] lg:px-8 xl:top-[88px]"
        data-timeline-scroll="true"
        ref={(element) => scrollTimelineToEnd(element)}
      >
        <div className="relative h-full min-h-[640px] py-7" style={{ width: `${timelineWidth}px` }}>
          <DateMarkers />

          <div className="relative pt-24" data-view="split">
            <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" data-connector="true" />
            {tracks.map((track) => {
              const isSelected = selectedTrackIds.has(track.id);
              return (
                <div className={`relative h-28 ${isSelected ? "" : "hidden"}`} data-track-row={track.id} key={track.id}>
                  <div className="absolute left-0 right-0 top-10 h-0.5" style={{ background: track.color }} />
                  <div className="sticky left-0 top-0 z-30 inline-block rounded px-2 py-1 font-mono text-xs font-black" style={{ background: track.color, color: "#000000" }}>
                    {track.name}
                  </div>
                  {getEventsForTrack(track.id).map((event, index) => <EventMarker event={event} index={index} key={event.id} track={track} viewId={track.id} />)}
                </div>
              );
            })}
          </div>

          <div className="relative hidden pt-24" data-view="unified">
            <div className="relative h-40">
              <div className="absolute left-0 right-0 top-10 h-[3px] bg-[#e5e5e5]" />
              <div className="sticky left-0 top-0 z-30 inline-block rounded bg-[#e5e5e5] px-3 py-1.5 font-mono text-xs font-black text-black">AI Timeline</div>
              {events.map((event, index) => <EventMarker compact event={event} index={index} key={event.id} track={getTrack(event.track)} viewId="unified" />)}
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed inset-x-5 bottom-4 z-40 hidden items-center gap-4 font-mono text-xs text-[#666666] lg:flex">
        <span>&lt;- Scroll horizontally to explore -&gt;</span>
        <span className="h-4 w-px bg-[#2a2a2a]" />
        <span>Hover or click events for details</span>
        <span className="h-4 w-px bg-[#2a2a2a]" />
        <span>Proposed news is reviewed before publishing</span>
        <a
          className="ml-auto font-bold text-[#666666] underline-offset-4 hover:text-white hover:underline"
          href="https://github.com/Ceinl/StoryLine"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub -&gt;
        </a>
      </footer>
    </main>
  );
}
