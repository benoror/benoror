import Markdown from 'react-markdown'
import { Badge } from '@workspace/ui/components/badge';

export default function MDDescription({ markdown }: { markdown: string }) {
  return (
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
}