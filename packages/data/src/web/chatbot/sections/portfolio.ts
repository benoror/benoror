import {
  projectsItems,
  publicationsItems,
  talksItems,
  type PortfolioItem,
} from "../../portfolio/index.js";
import type { ChatbotSection, PortfolioSectionItem } from "../schema.js";

function mapPortfolioItem(item: PortfolioItem): PortfolioSectionItem {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    role: item.role,
    description: item.description,
    circa: item.circa,
    url: item.url,
    techStack: item.techStack,
    links: item.links,
  };
}

export function buildPortfolioSection(): ChatbotSection {
  return {
    id: "projects",
    kind: "portfolio",
    title: "Ben Orozco Projects and Portfolio",
    keywords: [
      "projects",
      "portfolio",
      "open source",
      "maker",
      "ai projects",
      "games",
      "gaming",
      "video games",
      "game development",
      "bloxcraft",
      "gba dev",
    ],
    aliases: [
      "what has ben built",
      "project work",
      "what games has ben developed",
      "has ben made games",
    ],
    priority: 3,
    data: {
      overview:
        "Selected work spanning open source, SaaS products, experiments, talks, and publications.",
      projects: projectsItems.map(mapPortfolioItem),
      talks: talksItems.map(mapPortfolioItem),
      publications: publicationsItems.map(mapPortfolioItem),
    },
  };
}
