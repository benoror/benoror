import { LINKS, PERSONAL } from '@workspace/data/personal';
import { ABOUT } from '@workspace/data/resume';
import { Button } from '@workspace/ui/components/button';
import { MailIcon, GlobeIcon, NotebookIcon } from "lucide-react";
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { shortURL } from '@workspace/utils/url';

export default function Contact() {
  const IconLink = ({ Icon, link, text }: { Icon: React.ElementType, link: string, text: string }) => (
    <div className="flex items-center gap-2">
      <Button
        className="size-8 border-sky-100 dark:border-sky-950"
        variant="outline"
        size="icon"
        asChild
      >
        <a href={link} target='_blank'>
          <Icon className="size-4 text-brand-emphasis" />
        </a>
      </Button>
      <a href={link} target='_blank' className="text-brand-emphasis">
        {text}
      </a>
    </div>
  )

  return (
    <div className="flex gap-4 pt-1 text-xs text-muted-foreground flex-col sm:flex-row sm:items-baseline">
      <IconLink Icon={MailIcon} link={`mailto:${ABOUT.public_email}`} text={shortURL(ABOUT.public_email)} />
      <IconLink Icon={GlobeIcon} link={LINKS.website_url} text={shortURL(LINKS.website_url)} />
      <IconLink Icon={GitHubIcon} link={LINKS.github_url} text={shortURL(LINKS.github_url)} />
      <IconLink Icon={LinkedInIcon} link={LINKS.linkedin_url} text={shortURL(LINKS.linkedin_url)} />
      <IconLink Icon={NotebookIcon} link={LINKS.blog_url} text={shortURL(LINKS.blog_url)} />
    </div>
  )
}
