import { capsule, mutation, query, string, table } from "lakebed/server";
import {
  buildTimelineLinks,
  cleanTimelineDate,
  cleanTimelineDescription,
  cleanTimelineTitle,
  cleanTimelineTrack,
  type TimelineEventInput,
  type TimelineLink
} from "../shared/timeline";
import { curatedTimelineData as timelineData } from "../shared/newsTimeline";

const ADMIN_EMAIL_ENV = "ADMIN_EMAIL";

function isAdmin(ctx: any): boolean {
  const adminEmail = (ctx.env[ADMIN_EMAIL_ENV] ?? "").trim().toLowerCase();
  return Boolean(adminEmail) && (ctx.auth.email ?? "").trim().toLowerCase() === adminEmail;
}

function linksToJson(links: TimelineLink[] | undefined): string {
  return JSON.stringify(links ?? []);
}

function linksFromJson(value: string): TimelineLink[] {
  try {
    const links = JSON.parse(value) as TimelineLink[];
    return Array.isArray(links) ? links.filter((link) => link.label && link.url) : [];
  } catch {
    return [];
  }
}

function ensureSeeded(_ctx: { db: any }) {
  // The curated timeline is source-controlled and returned directly from queries.
  // The database is only used for user-submitted proposals.
}

function normalizeInput(input: TimelineEventInput) {
  const tracks = timelineData.tracks;
  const date = cleanTimelineDate(input.date);
  const title = cleanTimelineTitle(input.title);
  const description = cleanTimelineDescription(input.description);
  const track = cleanTimelineTrack(input.track, tracks);
  const links = buildTimelineLinks(input);

  if (!date || !title || !description || !track) {
    return null;
  }

  return { date, title, description, track, linksJson: linksToJson(links) };
}

export default capsule({
  name: "StoryLine",

  schema: {
    tracks: table({
      trackId: string(),
      name: string(),
      color: string(),
      description: string(),
      sortKey: string()
    }),
    events: table({
      date: string(),
      title: string(),
      description: string(),
      track: string(),
      linksJson: string()
    }),
    proposals: table({
      date: string(),
      title: string(),
      description: string(),
      track: string(),
      linksJson: string(),
      status: string(),
      proposedById: string(),
      proposedByName: string()
    })
  },

  queries: {
    timeline: query((ctx) => {
      ensureSeeded(ctx);

      const tracks = timelineData.tracks;
      const approved = ctx.db.proposals.where("status", "approved").orderBy("createdAt", "asc").all().map((proposal: any) => ({
        id: `proposal-${proposal.id}`,
        date: proposal.date,
        title: proposal.title,
        description: proposal.description,
        track: proposal.track,
        links: linksFromJson(proposal.linksJson)
      }));
      const events = [...timelineData.events, ...approved];

      return { tracks, events };
    }),

    adminQueue: query((ctx) => {
      if (!isAdmin(ctx)) {
        return { isAdmin: false, pending: [] };
      }

      const pending = ctx.db.proposals.where("status", "pending").orderBy("createdAt", "desc").all().map((proposal: any) => ({
        id: proposal.id,
        date: proposal.date,
        title: proposal.title,
        description: proposal.description,
        track: proposal.track,
        links: linksFromJson(proposal.linksJson),
        status: proposal.status,
        proposedByName: proposal.proposedByName,
        createdAt: proposal.createdAt
      }));

      return { isAdmin: true, pending };
    })
  },

  mutations: {
    proposeEvent: mutation((ctx, input: TimelineEventInput) => {
      ensureSeeded(ctx);

      const event = normalizeInput(input);
      if (!event) {
        return "invalid";
      }

      if (isAdmin(ctx)) {
        ctx.db.proposals.insert({
          ...event,
          status: "approved",
          proposedById: ctx.auth.userId,
          proposedByName: ctx.auth.displayName
        });
        return "approved";
      }

      ctx.db.proposals.insert({
        ...event,
        status: "pending",
        proposedById: ctx.auth.userId,
        proposedByName: ctx.auth.displayName
      });
      return "queued";
    }),

    decideProposal: mutation((ctx, id: string, decision: string) => {
      ensureSeeded(ctx);

      if (!isAdmin(ctx)) {
        return;
      }

      const proposal = ctx.db.proposals.get(id);
      if (!proposal || proposal.status !== "pending") {
        return;
      }

      if (decision === "approve") {
        ctx.db.proposals.update(id, { status: "approved" });
        return;
      }

      if (decision === "deny") {
        ctx.db.proposals.update(id, { status: "denied" });
      }
    })
  }
});
