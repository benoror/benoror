import { IAchievement } from '@workspace/data/types/resume';

export default function Achievement({ achievement }: { achievement: IAchievement }) {
  return (
    <li className="text-md print:text-sm">
      {achievement.achievement}
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
