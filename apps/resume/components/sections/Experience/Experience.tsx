"use client"

import { useState } from "react"
import { BriefcaseBusinessIcon } from "lucide-react";
import Role from '@/components/sections/Experience/Role'
import Section from '@/components/Section';
import { COMPANIES } from '@workspace/data/resume'
import { ICompany, IRole } from '@workspace/data/types/resume';
import MetadataRow from '@/components/sections/Experience/MetadataRow';
import { ExternalLink } from "lucide-react"
import { shortURL } from '@workspace/utils/url';
import MDDescription from "@/components/MarkdownDescription";

export default function Experience() {
  // Track open/closed state for each role
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {}
    // Initialize all as closed by default except the first N companies
    COMPANIES.forEach((company: ICompany, companyIndex: number) => {
      (company.roles ?? []).forEach((_: IRole, roleIndex: number) => {
        initialState[`${companyIndex}-${roleIndex}`] = companyIndex < 5
      })
    })
    return initialState
  })

  const toggleCollapsible = (key: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Section title="Experience" icon={<BriefcaseBusinessIcon />}>
      <div>
        {COMPANIES.map((company: ICompany, companyIndex: number) => (
          <div key={companyIndex} className={companyIndex !== 0 ? "pt-3" : ""}>
            <div className="flex flex-row justify-between items-center gap-2 mb-1.5">
              <h3 className="text-lg font-semibold text-brand-emphasis bg-muted-foreground/10 py-0 px-2 rounded-sm">
                {company.url ? (
                  <a href={company.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {company.name} <ExternalLink className="inline h-4 w-4 mb-1 print:hidden" />
                  </a>
                ) : (
                  company.name
                )}
                <span className="hidden print:inline text-muted-foreground text-sm">— {shortURL(company.url)}</span>
              </h3>
              <MetadataRow
                remote={company.remote}
                location={company.location}
                startDate={company.startDate}
                endDate={company.endDate}
              />
            </div>

            <p className="text-sm mb-3">
              <MDDescription markdown={company.description} />
            </p>

            <div className="space-y-4 pl-4 border-l-2 border-border">
              {(company.roles ?? []).map((role: IRole, roleIndex: number) => {
                const key = `${companyIndex}-${roleIndex}`
                const isOpen = openStates[key]

                return (
                  <div key={key} className="pl-0">
                    <Role roleKey={key} role={role} short={!!company.short} isOpen={isOpen ?? false} toggleCollapsible={toggleCollapsible} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
