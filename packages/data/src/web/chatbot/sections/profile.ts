import { FEED_SOURCES, HOME, INTERESTS, LINKS, PERSONAL, SKILLS } from "../../../shared/profile/index.js";
import type { ChatbotSection } from "../schema.js";

type LinkTuple = [string, (typeof LINKS)[keyof typeof LINKS]];

export function buildProfileSection(): ChatbotSection {
  return {
    id: "social_media",
    kind: "personal",
    title: "Ben Orozco Online Presence and Interests",
    keywords: ["social", "links", "profiles", "interests", "online presence"],
    aliases: ["where to find ben online", "social media"],
    priority: 2,
    data: {
      identity: {
        fullName: PERSONAL.full_name,
        shortName: PERSONAL.short_name,
      },
      home: {
        header: HOME.header,
        publicEmail: HOME.public_email,
        summary: HOME.about_me,
      },
      interests: INTERESTS,
      signatureStrengths: SKILLS.map((skill) => skill.name),
      links: (Object.entries(LINKS) as LinkTuple[]).map(([key, entry]) => ({
        id: key,
        label: ("legend" in entry ? entry.legend : undefined) ?? key.replaceAll("_", " "),
        url: entry.url,
      })),
      publicWritingSources: FEED_SOURCES.map((source) => ({
        id: source.id,
        name: source.name,
        siteUrl: source.site_url,
        status: source.status,
        note: source.note,
      })),
    },
  };
}
