export type Track = {
  id: string;
  name: string;
  color: string;
  description: string;
};

export type TimelineLink = {
  label: string;
  url: string;
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  track: string;
  // Optional full list of tracks for news shared across organizations.
  // The primary `track` is always included even if omitted here.
  tracks?: string[];
  links?: TimelineLink[];
};

export function getEventTrackIds(event: Pick<TimelineEvent, "track" | "tracks">): string[] {
  return Array.from(new Set([event.track, ...(event.tracks ?? [])].filter(Boolean)));
}

export type TimelineData = {
  tracks: Track[];
  events: TimelineEvent[];
};

export type TimelineEventInput = {
  date: string;
  title: string;
  description: string;
  track: string;
  linkLabel?: string;
  linkUrl?: string;
};

export type ProposedTimelineEvent = TimelineEvent & {
  proposedByName: string;
  status: string;
  createdAt: string;
};

export type AdminQueue = {
  isAdmin: boolean;
  pending: ProposedTimelineEvent[];
};

export function cleanTimelineDate(value: string): string {
  const cleanValue = value.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(cleanValue) ? cleanValue : "";
}

export function cleanTimelineTitle(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 120);
}

export function cleanTimelineDescription(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 520);
}

export function cleanTimelineTrack(value: string, tracks: Track[]): string {
  const cleanValue = value.trim();
  return tracks.some((track) => track.id === cleanValue) ? cleanValue : "";
}

export function cleanTimelineLinkLabel(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 64);
}

export function cleanTimelineLinkUrl(value: string): string {
  const cleanValue = value.trim().slice(0, 500);
  return /^https:\/\//i.test(cleanValue) ? cleanValue : "";
}

export function buildTimelineLinks(input: TimelineEventInput): TimelineLink[] {
  const label = cleanTimelineLinkLabel(input.linkLabel ?? "");
  const url = cleanTimelineLinkUrl(input.linkUrl ?? "");
  return label && url ? [{ label, url }] : [];
}

export { curatedTimelineData as timelineData } from "./newsTimeline";
