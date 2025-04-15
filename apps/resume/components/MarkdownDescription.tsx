import Markdown from 'react-markdown'
import SkillBadge from './SkillBadge';

export default function MDDescription({ markdown }: { markdown: string }) {
  return (
    <Markdown children={markdown} components={{
      p: ({ children }) => <>{children}</>,
      a({node, ...props}) {
        return (
          <SkillBadge>
            <a {...props} />
          </SkillBadge>
        )
      }
    }} />
  )
}