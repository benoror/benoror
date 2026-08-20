import { IAchievement } from '@workspace/data/resume/schema';
import MDDescription from '@/components/MarkdownDescription';

export default function Achievement({ achievement }: { achievement: IAchievement }) {
  const subAchievements = (achievement.subAchievements ?? []).filter((entry) => !entry.hidden)

  return (
    <li className="text-md print:text-sm">
      <MDDescription markdown={achievement.description} />
      {subAchievements.length > 0 && (
        <ul className="pl-8 md:pl-4 list-[circle] list-outside md:list-inside space-x-6">
          {subAchievements.map((entry, index) => (
            <Achievement key={index} achievement={entry} />
          ))}
        </ul>
      )}
    </li>
  );
}
