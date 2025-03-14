import { Button } from '@workspace/ui/components/button';
import { MailIcon } from "lucide-react";
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';

export default function Contact() {
  return (
    <div className="flex gap-8 pt-1 text-sm text-muted-foreground flex-col sm:flex-row sm:items-baseline">
      {process.env.NEXT_PUBLIC_EMAIL ? (
        <div className="flex items-center gap-2">
          <Button
            className="size-8 print:hidden"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} target='_blank'>
              <MailIcon className="size-4" />
            </a>
          </Button>
          <MailIcon className="size-4 hidden print:block" />
          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} target='_blank'>
            {process.env.NEXT_PUBLIC_EMAIL}
          </a>
        </div>
      ) : null}
      {process.env.NEXT_PUBLIC_GITHUB_URL ? (
        <div className="flex items-center gap-2">
          <Button
            className="size-8 print:hidden"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target='_blank'>
              <GitHubIcon className="size-4" />
            </a>
          </Button>
          <GitHubIcon className="size-4 hidden print:block" />
          <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target='_blank'>
            {process.env.NEXT_PUBLIC_GITHUB_URL.replace('https://', '')}
          </a>
        </div>
      ) : null}
      
      {process.env.NEXT_PUBLIC_LINKEDIN_URL ? (
        <div className="flex items-center gap-2">
          <Button
            className="size-8 print:hidden"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target='_blank'>
              <LinkedInIcon className="size-4" />
            </a>
          </Button>
          <LinkedInIcon className="size-4 hidden print:block" />
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target='_blank'>
            {process.env.NEXT_PUBLIC_LINKEDIN_URL.replace('https://www.', '')}
          </a>
        </div>
      ) : null}
    </div>
  )
}
