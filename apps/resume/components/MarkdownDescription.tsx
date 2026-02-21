import Markdown from 'react-markdown'
import SkillBadge from './SkillBadge';
import { scrollToSkill } from '@/lib/scrollToSkill';

export default function MDDescription({ markdown }: { markdown: string }) {
  return (
    <Markdown children={markdown} components={{
      p: ({ children }) => <>{children}</>,
      a({ node, href, ...props }) {
        const isSkillAnchor = href?.startsWith('#')
        const handleClick = isSkillAnchor
          ? (e: React.MouseEvent) => {
              e.preventDefault()
              scrollToSkill(href!.slice(1))
            }
          : undefined

        return (
          <SkillBadge>
            <a href={href} onClick={handleClick} {...props} />
          </SkillBadge>
        )
      }
    }} />
  )
}