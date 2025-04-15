import SubSkills from '@/components/sections/Skills/Skill/SubSkills/SubSkills';
import { sinceToString } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function Skill({ skill }: { skill: ISkill}) {
  return (
    <Card id={skill.slug}>
      <CardHeader>
        <CardTitle>{skill.name} - {sinceToString(skill.since)}</CardTitle>
        <CardDescription>{skill.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {skill.subSkills && <SubSkills skills={skill.subSkills} />}
      </CardContent>
    </Card>
  )
}
