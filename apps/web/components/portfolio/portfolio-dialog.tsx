"use client"

import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { X } from "lucide-react"
import type { PortfolioItem } from "@workspace/data/portfolio"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog"

interface PortfolioDialogProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

export default function PortfolioDialog({ item, isOpen, onClose }: PortfolioDialogProps) {
  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/90 border-sky-900/30 text-sky-100">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{item.title}</DialogTitle>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-sky-900/20" aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="prose prose-invert prose-blue max-w-none">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-md border border-sky-900/30 my-4 max-w-full h-auto" />
              ),
              h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-bold mt-6 mb-4 text-sky-100" />,
              h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-bold mt-5 mb-3 text-sky-100" />,
              h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold mt-4 mb-2 text-sky-100" />,
              p: ({ node, ...props }) => <p {...props} className="my-3 text-sky-200" />,
              ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-3 text-sky-200" />,
              li: ({ node, ...props }) => <li {...props} className="my-1" />,
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-sky-300 hover:text-sky-100 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          >
            {item.fullDescription}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {item.techStack.map((tech) => (
            <span key={tech} className="bg-sky-950 text-sky-200 px-2 py-1 rounded-md text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 mt-4">
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Visit Project
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-950/50 hover:bg-sky-900 text-sky-100 border border-sky-400/30 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Source
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

