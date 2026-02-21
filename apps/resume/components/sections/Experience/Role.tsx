import { IRole } from '@workspace/data/types/resume';
import Achievement from '@/components/sections/Experience/Achievement'
import MetadataRow from '@/components/sections/Experience/MetadataRow';
import MDDescription from '@/components/MarkdownDescription';
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { shortURL } from '@workspace/utils/url';
import SkillBadge from '@/components/SkillBadge';
import { PrintOnly, ScreenOnly } from '@/components/MediaVisibility';
import { scrollToSkill } from '@/lib/scrollToSkill';

const RoleTitle = ({ role }: { role: IRole }) => (
  <h4 className="font-bold inline print:text-brand-print">
    {role.title}
    {role.projectUrl && (
      <span className="text-muted-foreground">
        <ScreenOnly as="span">
          <span> — </span>
          <a href={role.projectUrl} target="_blank" rel="noopener noreferrer" className="hover:underline print:text-brand-print">
            {role.project} <ExternalLink className="inline h-3 w-3 mb-1" />
          </a>
        </ScreenOnly>
        <PrintOnly as="span" display="inline">
          <span> — </span> {role.project} / {shortURL(role.projectUrl)}
        </PrintOnly>
      </span>
    )}
  </h4>
)

const ShortRole = ({ role }: { role: IRole }) => (
  <>
    <span className="font-bold">
      <RoleTitle role={role} />:&nbsp;
    </span>
    <span className="text-sm">
      <MDDescription markdown={role.description} />
    </span>
  </>
)

export default function Role({ roleKey, role, short, isOpen, toggleCollapsible }: { roleKey: string, role: IRole, short: boolean, isOpen: boolean, toggleCollapsible: (key: string) => void }) {
  if(!!short) {
    return <ShortRole role={role} />
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-1">
        <RoleTitle role={role} />
        <MetadataRow
          remote={role.remote}
          location={role.location}
          startDate={role.startDate}
          endDate={role.endDate}
        />
      </div>

      <Collapsible open={isOpen} className="my-2 pl-2 border-l border-border hover:border-muted-foreground/50">
        <div className="group">
          <CollapsibleTrigger
            onClick={() => toggleCollapsible(roleKey)}
            className={`w-full text-left flex items-center gap-2 focus:outline-none ${role.achievements.length > 0 ? "cursor-pointer" : ""}`}
          >
            <p className="mt-1 text-sm group-hover:text-primary transition-colors">
              {role.achievements.length > 0 && (
                <span className="inline mr-1">
                  {isOpen ? (
                    <ChevronUp className="inline h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </span>
              )}
              <MDDescription markdown={role.description} />
            </p>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-2 ml-4">
          <ul className="space-y-1 list-disc pl-2 text-sm">
            {role.achievements.map((achievement, pointIndex) => (
              <Achievement key={pointIndex} achievement={achievement} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-wrap gap-2">
        {(role.skills ?? []).map((skill, skillIndex) => {
          const slug = skill.slug || skill.name.replace(/[\s_]+/g, '-').toLowerCase()
          return (
            <SkillBadge key={skillIndex}>
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSkill(slug)
                }}
              >
                {skill.name}
              </a>
            </SkillBadge>
          )
        })}
      </div>
    </>
  );
}
