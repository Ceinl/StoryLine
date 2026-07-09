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

function applyAppSurface() {
  if (typeof document === "undefined") {
    return;
  }

  // The browser can reveal the document background during touch/momentum
  // overscroll, so keep the root surface aligned with the app shell.
  document.documentElement.style.backgroundColor = "#09090b";
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.backgroundColor = "#09090b";
  document.body.style.overscrollBehavior = "none";
}

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
  // Pad the domain a few days on each side so edge events do not sit flush
  // against the container and month labels have room to breathe.
  const dayMs = 24 * 60 * 60 * 1000;
  minDate = new Date(Math.min(...times) - 5 * dayMs);
  maxDate = new Date(Math.max(...times) + 8 * dayMs);
  dateRange = Math.max(1, maxDate.getTime() - minDate.getTime());
  monthMarkers = createMonthMarkers(minDate, maxDate);
  timelineWidth = Math.max(3200, monthMarkers.length * 360);
}

function createMonthMarkers(startDate: Date, endDate: Date): Date[] {
  const markers: Date[] = [];
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

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
    button.textContent = splitMode ? "By organization" : "Unified";
  }
}

function applyTrackButtonStyle(button: HTMLElement, track: Track, selected: boolean) {
  button.style.borderColor = selected ? `${track.color}55` : "#26262a";
  button.style.color = selected ? "#d4d4d8" : "#5b5b63";
  const dot = button.querySelector<HTMLElement>("[data-track-dot]");
  if (dot) {
    dot.style.background = selected ? track.color : "#3f3f46";
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
    applyTrackButtonStyle(button, track, selected);
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
    dot.style.opacity = !hasQuery || isMatch ? "1" : "0.2";
    dot.style.boxShadow = hasQuery && isMatch ? `0 0 0 4px ${dot.dataset.eventColor ?? "#e5e5e5"}33` : "none";
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
        color: dot.dataset.eventColor ?? "#e5e5e5"
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
    line.setAttribute("stroke-opacity", "0.5");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-dasharray", "4 4");
    svg.appendChild(line);
  }
}

function highlightEventNodes(eventId: string) {
  queryAll<HTMLElement>(`[data-event-id="${eventId}"]`).forEach((dot) => {
    dot.style.scale = "1.4";
    dot.style.boxShadow = `0 0 0 4px ${dot.dataset.eventColor ?? "#e5e5e5"}33`;
  });
  drawSharedConnector(eventId);
}

function unhighlightEventNodes(eventId: string) {
  queryAll<HTMLElement>(`[data-event-id="${eventId}"]`).forEach((dot) => {
    dot.style.scale = "";
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
    return <span className="text-xs text-zinc-600">Checking session…</span>;
  }

  if (isGuest) {
    return <SignInWithGoogle className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200" />;
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      {picture ? <img alt="" className="h-6 w-6 rounded-full object-cover" referrerPolicy="no-referrer" src={picture} /> : null}
      <span className="hidden max-w-36 truncate text-xs text-zinc-500 sm:block">{displayName}</span>
      <button className="text-xs text-zinc-600 transition hover:text-zinc-300" onClick={() => signOut()} type="button">
        Sign out
      </button>
    </div>
  );
}

const fieldClass = "rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-600";

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
      <summary className="cursor-pointer list-none rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">
        Propose news
      </summary>
      <form className="absolute right-0 top-full z-[80] mt-2 w-[min(92vw,26rem)] rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/40" onSubmit={(event) => void onSubmit(event)}>
        <div className="mb-3 grid gap-3 sm:grid-cols-[9rem_1fr]">
          <input className={fieldClass} name="date" required type="date" />
          <select className={fieldClass} name="track" required>
            <option value="">Track</option>
            {tracks.map((track) => <option key={track.id} value={track.id}>{track.name}</option>)}
          </select>
        </div>
        <input className={`mb-3 w-full ${fieldClass}`} name="title" placeholder="News title" required />
        <textarea className={`mb-3 min-h-28 w-full ${fieldClass}`} name="description" placeholder="What happened?" required />
        <div className="mb-4 grid gap-3 sm:grid-cols-[9rem_1fr]">
          <input className={fieldClass} name="linkLabel" placeholder="Link label" />
          <input className={fieldClass} name="linkUrl" placeholder="https://..." type="url" />
        </div>
        <button className="w-full rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white" type="submit">
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
      <summary className="cursor-pointer list-none rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">
        Review queue ({queue.pending.length})
      </summary>
      <div className="absolute right-0 top-full z-[80] mt-2 max-h-[70vh] w-[min(94vw,32rem)] overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/40">
        {queue.pending.length === 0 ? (
          <p className="text-sm text-zinc-600">No pending proposals.</p>
        ) : queue.pending.map((proposal) => <ProposalReviewCard decideProposal={decideProposal} key={proposal.id} proposal={proposal} />)}
      </div>
    </details>
  );
}

function ProposalReviewCard({ proposal, decideProposal }: { proposal: ProposedTimelineEvent; decideProposal: (id: string, decision: string) => Promise<void> }) {
  const track = getTrack(proposal.track);

  return (
    <article className="border-b border-zinc-800 py-4 first:pt-0 last:border-b-0">
      <p className="mb-1.5 flex items-center gap-2 text-xs text-zinc-500">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: track.color }} />
        {formatDate(proposal.date)} · {track.name} · {proposal.proposedByName}
      </p>
      <h3 className="mb-1.5 text-base font-medium leading-snug text-zinc-100">{proposal.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{proposal.description}</p>
      {proposal.links && proposal.links.length > 0 ? (
        <a className="mt-2 inline-block text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-200" href={proposal.links[0].url} rel="noopener noreferrer" target="_blank">
          {proposal.links[0].label}
        </a>
      ) : null}
      <div className="mt-3 flex gap-2">
        <button className="rounded-md bg-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-900 transition hover:bg-white" onClick={() => void decideProposal(proposal.id, "approve")} type="button">
          Approve
        </button>
        <button className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200" onClick={() => void decideProposal(proposal.id, "deny")} type="button">
          Deny
        </button>
      </div>
    </article>
  );
}

function EventMarker({ event, track, viewId, index }: { event: TimelineEvent; track: Track; viewId: string; index: number }) {
  const position = getEventPosition(event.date);
  const cardAlign = position > 86 ? "right-0" : "left-1/2 -translate-x-1/2";
  const instanceId = `${event.id}::${viewId}`;

  return (
    <div
      className="group absolute top-10 z-20"
      data-marker-id={instanceId}
      onMouseEnter={() => handleMarkerEnter(instanceId, event.id)}
      onMouseLeave={() => handleMarkerLeave(instanceId, event.id)}
      style={{ left: `${position}%`, animationDelay: `${Math.min(index * 35, 900)}ms` }}
    >
      <button
        aria-label={`${event.title}, ${formatDate(event.date)}`}
        className="block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-zinc-950 transition-transform duration-150 hover:scale-150 focus:scale-150 focus:outline-none"
        data-event-color={track.color}
        data-event-id={event.id}
        data-event-position={String(position)}
        onClick={() => togglePinnedCard(instanceId, event.id)}
        style={{ background: track.color }}
        type="button"
      />
      <article
        className={`hidden absolute z-50 w-72 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/40 ${cardAlign}`}
        data-card-id={instanceId}
        onMouseEnter={() => positionEventCards(instanceId)}
      >
        <button
          aria-label="Close"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded text-base leading-none text-zinc-600 transition hover:text-zinc-200"
          onClick={() => dismissCard(instanceId, event.id)}
          type="button"
        >
          ×
        </button>
        <p className="mb-1.5 flex items-center gap-2 pr-8 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: track.color }} />
          {formatDate(event.date)} · {track.name}
        </p>
        <h3 className="mb-1.5 text-base font-medium leading-snug text-zinc-100">{event.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{event.description}</p>
        {event.links && event.links.length > 0 ? (
          <div className="mt-3 flex flex-col gap-1">
            {event.links.map((link) => (
              <a
                className="text-xs text-zinc-400 underline underline-offset-4 transition hover:text-zinc-200"
                href={link.url}
                key={link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function getMarkerPosition(marker: Date): number {
  return ((marker.getTime() - minDate.getTime()) / dateRange) * 100;
}

function visibleMonthMarkers(): { marker: Date; position: number }[] {
  return monthMarkers
    .map((marker) => ({ marker, position: getMarkerPosition(marker) }))
    .filter(({ position }) => position >= 0 && position <= 100);
}

function DateMarkers() {
  const markers = visibleMonthMarkers();

  return (
    <div className="relative h-10 shrink-0">
      {markers.map(({ marker, position }, index) => (
        <div
          className="absolute top-3 text-[11px] tracking-wide text-zinc-500"
          key={marker.toISOString()}
          style={{ left: `${position}%` }}
        >
          {marker.toLocaleDateString("en-US", { month: "short" })}
          {index === 0 || marker.getMonth() === 0 ? <span className="ml-1 text-zinc-600">{marker.getFullYear()}</span> : null}
        </div>
      ))}
    </div>
  );
}

function MonthGridlines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 top-10">
      {visibleMonthMarkers().map(({ marker, position }) => (
        <div className="absolute bottom-0 top-0 w-px bg-zinc-900" key={marker.toISOString()} style={{ left: `${position}%` }} />
      ))}
    </div>
  );
}

export function App() {
  applyAppSurface();

  const auth = useAuth();
  const timeline = useQuery<TimelineData>("timeline") ?? emptyTimeline;
  const adminQueue = useQuery<AdminQueue>("adminQueue") ?? emptyAdminQueue;
  const proposeEvent = useMutation<[input: TimelineEventInput], string>("proposeEvent");
  const decideProposal = useMutation<[id: string, decision: string], void>("decideProposal");

  setTimelineData(timeline);

  return (
    <main className="flex h-dvh min-h-dvh flex-col overflow-hidden overscroll-none bg-zinc-950 text-zinc-300 antialiased [font-family:ui-sans-serif,system-ui,-apple-system,sans-serif]">
      <header className="z-50 border-b border-zinc-900">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 lg:px-8">
          <h1 className="text-sm font-medium text-zinc-100">StoryLine</h1>

          <div className="relative w-full max-w-xs sm:w-64">
            <input
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              data-search-input="true"
              onBlur={() => window.setTimeout(() => document.querySelector<HTMLElement>('[data-search-panel="true"]')?.classList.add("hidden"), 160)}
              onFocus={(event) => updateSearch(event.currentTarget as HTMLInputElement)}
              onInput={(event) => updateSearch(event.currentTarget as HTMLInputElement)}
              placeholder="Search…"
              type="search"
            />
            <div
              className="absolute left-0 top-full z-[60] mt-2 hidden max-h-80 w-[min(92vw,24rem)] overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/40"
              data-search-panel="true"
            >
              {events.map((event) => {
                const track = getTrack(event.track);
                return (
                  <button
                    className="hidden w-full border-b border-zinc-800 px-4 py-2.5 text-left transition last:border-b-0 hover:bg-zinc-800"
                    data-result-id={event.id}
                    data-result-search={searchText(event)}
                    key={event.id}
                    onMouseDown={(mouseEvent) => {
                      mouseEvent.preventDefault();
                      focusEvent(event);
                    }}
                    type="button"
                  >
                    <span className="block text-[11px] text-zinc-500">{formatDate(event.date)} · {track.name}</span>
                    <span className="mt-0.5 block text-sm text-zinc-200">{event.title}</span>
                  </button>
                );
              })}
              <div className="hidden px-4 py-3 text-sm text-zinc-600" data-search-empty="true">No matching events</div>
            </div>
          </div>

          <button
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
            data-action="toggle-split"
            onClick={() => setSplitMode(!splitMode)}
            type="button"
          >
            By organization
          </button>

          <div className="flex flex-wrap items-center gap-1.5">
            {tracks.map((track) => {
              const isSelected = selectedTrackIds.has(track.id);
              return (
                <button
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition"
                  data-track-button={track.id}
                  key={track.id}
                  onClick={() => toggleTrack(track.id)}
                  style={{
                    borderColor: isSelected ? `${track.color}55` : "#26262a",
                    color: isSelected ? "#d4d4d8" : "#5b5b63"
                  }}
                  type="button"
                >
                  <span className="h-1.5 w-1.5 rounded-full" data-track-dot style={{ background: isSelected ? track.color : "#3f3f46" }} />
                  {track.name}
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <ProposalForm proposeEvent={proposeEvent} />
            <AdminReview decideProposal={decideProposal} queue={adminQueue} />
            <AuthControls displayName={auth.displayName} isGuest={auth.isGuest} isLoading={auth.isLoading} picture={auth.picture} />
          </div>
        </div>
      </header>

      <section
        className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none px-5 lg:px-8"
        data-timeline-scroll="true"
        ref={(element) => scrollTimelineToEnd(element)}
      >
        <div className="relative flex h-full min-h-[480px] flex-col" style={{ width: `${timelineWidth}px` }}>
          <MonthGridlines />
          <DateMarkers />

          <div className="relative min-h-0 flex-1" data-view="split">
            <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" data-connector="true" />
            <div className="flex h-full flex-col justify-evenly pb-6">
              {tracks.map((track) => {
                const isSelected = selectedTrackIds.has(track.id);
                return (
                  <div className={`relative h-16 shrink-0 ${isSelected ? "" : "hidden"}`} data-track-row={track.id} key={track.id}>
                    <div className="absolute left-0 right-0 top-10 h-px opacity-25" style={{ background: track.color }} />
                    <div className="sticky left-0 top-0 z-30 inline-flex items-center gap-1.5 pr-3 text-xs text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: track.color }} />
                      {track.name}
                    </div>
                    {getEventsForTrack(track.id).map((event, index) => <EventMarker event={event} index={index} key={event.id} track={track} viewId={track.id} />)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden min-h-0 flex-1" data-view="unified">
            <div className="flex h-full flex-col justify-center pb-6">
              <div className="relative h-16 shrink-0">
                <div className="absolute left-0 right-0 top-10 h-px bg-zinc-800" />
                <div className="sticky left-0 top-0 z-30 inline-block text-xs text-zinc-400">All events</div>
                {events.map((event, index) => <EventMarker event={event} index={index} key={event.id} track={getTrack(event.track)} viewId="unified" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="hidden items-center gap-3 border-t border-zinc-900 px-5 py-2 text-[11px] text-zinc-600 lg:flex lg:px-8">
        <span>Scroll horizontally · click events for details</span>
        <a
          className="ml-auto transition hover:text-zinc-300"
          href="https://github.com/Ceinl/StoryLine"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
