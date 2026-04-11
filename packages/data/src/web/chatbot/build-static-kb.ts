import type { StaticChatbotKnowledgeBase } from "./schema.js";
import { buildFaqSection } from "./sections/faq.js";
import { buildProfileSection } from "./sections/profile.js";
import { buildPortfolioSection } from "./sections/portfolio.js";
import { buildResumeSection } from "./sections/resume.js";
import { buildSummarySection } from "./sections/summary.js";

export async function buildStaticChatbotKnowledgeBase(): Promise<StaticChatbotKnowledgeBase> {
  const [summary, faq] = await Promise.all([buildSummarySection(), buildFaqSection()]);

  return {
    version: 1,
    sections: [
      summary,
      faq,
      buildResumeSection(),
      buildPortfolioSection(),
      buildProfileSection(),
    ],
  };
}
