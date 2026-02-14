import SubSkills from '@/components/sections/Skills/Skill/SubSkills/SubSkills';
import { sinceToString, sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import PrintSubSkill from '@/components/sections/Skills/Skill/SubSkills/PrintSubSkill/PrintSubSkill';
import SubSkill from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubSkill';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';

export default function Skill({ skill }: { skill: ISkill}) {
  const yearsOfExperience = sinceToString(skill.since)

  const subSkillsList = (
    <>
      <div className="Xhidden print:hidden flex flex-wrap justify-items-start justify-center gap-3">
        {skill.subSkills?.map((subSkill, index) => <SubSkill key={index} skill={subSkill} /> )}
      </div>
      <div className="hidden print:block w-full text-justify">
        {skill.subSkills?.map((subSkill, index) => <PrintSubSkill key={index} skill={subSkill} /> )}
      </div>
    </>
  )

  return (
    <Card id={skill.slug}>
      <CardHeader>
        <CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <a className="text-sky-800 dark:text-sky-200 hover:underline cursor-pointer font-bold text-center block ">
                {skill.name} ({yearsOfExperience})
              </a>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</DialogTitle>
              <p>{skill.description}</p>
              {subSkillsList}
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subSkillsList}
      </CardContent>
    </Card>
  )
}
