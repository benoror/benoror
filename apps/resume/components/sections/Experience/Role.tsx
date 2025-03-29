import { IRole } from '@workspace/data/types/resume';
import Achievement from '@/components/sections/Experience/Achievement'
import { Badge } from '@workspace/ui/components/badge';
import MDDescription from '@/components/MarkdownDescription';
import { ExternalLink, Calendar, ChevronDown, ChevronUp, Globe, MapPin } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { shortURL } from '@workspace/utils/url';

const RoleTitle = ({ role }: { role: IRole }) => (
  <h4 className="font-bold inline">
    {role.title}
    {role.projectUrl && (
      <span className="text-muted-foreground">
        <span className="print:hidden">
          <span> — </span>
          <a href={role.projectUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {role.project} <ExternalLink className="inline h-3 w-3 mb-1" />
          </a>
        </span>
        <span className="hidden print:inline">
          <span> — </span> {role.project} / {shortURL(role.projectUrl)}
        </span>
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
        <div className="flex flex-row justify-between items-start gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {role.remote && (
              <Badge
                variant="secondary"
                className="flex items-center h-5 px-1.5 text-xs font-normal bg-primary/10 border-primary/20"
              >
                <Globe className="h-3 w-3 mr-1" />
                Remote
              </Badge>
            )}
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {role.location}
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{role.startDate} - {role.endDate}</span>
          </div>
        </div>
      </div>

      <Collapsible open={isOpen} className="my-3 pl-2 border-l hover:border-muted-foreground/25 border-transparent">
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
        {(role.skills ?? []).map((skill, skillIndex) => (
          <Badge key={skillIndex} variant="secondary" className="font-normal">
            {skill.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
