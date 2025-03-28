import { IRole } from '@workspace/data/types/resume';
import Achievement from '@/components/sections/Experience/Achievement'
import { Badge } from '@workspace/ui/components/badge';
import { CalendarDays, Calendar, ChevronDown, ChevronUp, Globe, MapPin } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"

export default function Role({ roleKey, role, isOpen, toggleCollapsible }: { roleKey: string, role: IRole, isOpen: boolean, toggleCollapsible: (key: string) => void }) {
  // return (
  //   // <div className="Role flex flex-col gap-1">
  //   //   <h3 className="text-md font-bold print:text-md">{role.title}</h3>
  //   //   <a className="text-md print:text-sm" href={role.websiteUrl}>{role.project || role.company}</a>
  //   //   <p className="text-md print:text-sm">{role.location}</p>
  //   //   <p className="text-md print:text-sm text-muted-foreground flex items-center">
  //   //     <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{role.startDate} - {role.endDate}
  //   //   </p>
  //   //   {Array.isArray(role.achievements) && role.achievements.length > 0 ? (
  //   //     <details open={index < 2}>
  //   //       <summary className="text-md print:text-sm cursor-pointer">{role.description}</summary>
  //   //       <ul className="pl-8 md:pl-4 list-disc list-outside md:list-inside space-x-6">
  //   //         {role.achievements.map((achievement, index) => (
  //   //           <Achievement key={index} achievement={achievement} />
  //   //         ))}
  //   //       </ul>
  //   //     </details>
  //   //   ) : (
  //   //     <p className="text-md print:text-sm">{role.description}</p>
  //   //   )}
  //   // </div>
  // );
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
        <h4 className="font-medium">{role.title}</h4>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 text-sm text-muted-foreground">
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

      <Collapsible open={isOpen} className="my-3">
        <div className="group">
          <CollapsibleTrigger
            onClick={() => toggleCollapsible(roleKey)}
            className="w-full text-left flex items-start gap-2 cursor-pointer focus:outline-none"
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
              {role.description}
            </p>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-2 ml-6">
          <ul className="space-y-1 list-disc pl-5 text-sm">
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
