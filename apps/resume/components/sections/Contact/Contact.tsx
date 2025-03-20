import { ABOUT } from '@workspace/data/resume';
import { LINKS } from '@workspace/data/social';
import { Button } from '@workspace/ui/components/button';
import { MailIcon, GlobeIcon, NotebookIcon } from "lucide-react";
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { shortURL } from '@workspace/utils/url';

// ToDo: Componentize icon-links
export default function Contact() {
  return (
    <div className="flex gap-4 pt-1 text-xs text-muted-foreground flex-col sm:flex-row sm:items-baseline">
      <div className="flex items-center gap-2">
        <Button
          className="size-8 print:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <a href={`mailto:${ABOUT.public_email}`} target='_blank'>
            <MailIcon className="size-4" />
          </a>
        </Button>
        <MailIcon className="size-4 hidden print:block" />
        <a href={`mailto:${ABOUT.public_email}`} target='_blank'>
          {ABOUT.public_email}
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="size-8 print:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <a href={LINKS.website_url} target='_blank'>
            <GlobeIcon className="size-4" />
          </a>
        </Button>
        <GlobeIcon className="size-4 hidden print:block" />
        <a href={LINKS.website_url} target='_blank'>
          {shortURL(LINKS.website_url)}
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="size-8 print:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <a href={LINKS.github_url} target='_blank'>
            <GitHubIcon className="size-4" />
          </a>
        </Button>
        <GitHubIcon className="size-4 hidden print:block" />
        <a href={LINKS.github_url} target='_blank'>
          {shortURL(LINKS.github_url)}
        </a>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          className="size-8 print:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <a href={LINKS.linkedin_url} target='_blank'>
            <LinkedInIcon className="size-4" />
          </a>
        </Button>
        <LinkedInIcon className="size-4 hidden print:block" />
        <a href={LINKS.linkedin_url} target='_blank'>
          {shortURL(LINKS.linkedin_url)}
        </a>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          className="size-8 print:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <a href={LINKS.blog_url} target='_blank'>
            <NotebookIcon className="size-4" />
          </a>
        </Button>
        <NotebookIcon className="size-4 hidden print:block" />
        <a href={LINKS.blog_url} target='_blank'>
          {shortURL(LINKS.blog_url)}
        </a>
      </div>
    </div>
  )
}
