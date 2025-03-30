import Markdown from 'react-markdown'
import { Badge } from '@workspace/ui/components/badge';

export default function MDDescription({ markdown }: { markdown: string }) {
  return (
    <Markdown children={markdown} components={{
      p: ({ children }) => <>{children}</>,
      a({node, ...props}) {
        return (
          // <Badge variant="secondary" className="font-normal"></Badge>
          <Badge variant="secondary" className="font-normal">
            <a {...props} className="underline decoration-dotted decoration-gray hover:decoration-solid" />
          </Badge>
        )
      }
    }} />
  )
}