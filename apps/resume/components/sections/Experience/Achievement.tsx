import { IAchievement } from '@workspace/data/types/resume';
import Markdown from 'react-markdown'
import { Badge } from '@workspace/ui/components/badge';

const MDDescription = ({ markdown }: { markdown: string }) => (
  <Markdown children={markdown} components={{
    p: ({ children }) => <>{children}</>,
    a({node, ...props}) {
      return (
        <Badge variant="outline" className="text-sm font-mono">
          <a {...props} className="" />
        </Badge>
      )
    }
  }} />
)

export default function Achievement({ achievement }: { achievement: IAchievement }) {
  return (
    <li className="text-md print:text-sm">
      <MDDescription markdown={achievement.achievement} />
      {Array.isArray(achievement.subAchievements) && achievement.subAchievements.length > 0 && (
        <ul className="pl-8 md:pl-4 list-[circle] list-outside md:list-inside space-x-6">
          {achievement.subAchievements.map((achievement, index) => (
            <Achievement key={index} achievement={achievement} />
          ))}
        </ul>
      )}
    </li>
  );
}
