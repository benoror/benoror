"use client"

import { useState } from "react"
import { BriefcaseBusinessIcon } from "lucide-react";
import Role from '@/components/sections/Experience/Role'
import { COMPANIES } from '@workspace/data/resume'
import { ICompany, IRole } from '@workspace/data/types/resume';
import { Badge } from '@workspace/ui/components/badge';
import { ExternalLink, Calendar, Globe, MapPin } from "lucide-react"
import { shortURL } from '@workspace/utils/url';

export default function Experience() {
  // Track open/closed state for each role
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {}
    // Initialize all as closed by default except the first company
    COMPANIES.forEach((company: ICompany, companyIndex: number) => {
      (company.roles ?? []).forEach((_: IRole, roleIndex: number) => {
        initialState[`${companyIndex}-${roleIndex}`] = companyIndex < 1
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
    <section className="Experience flex flex-col items-center gap-5 print:gap-4">
      <h2 className="text-2xl font-bold print:text-xl mb-4">
        <BriefcaseBusinessIcon className="size-6 inline" /> 💼 Experience
      </h2>
      <div>
        {COMPANIES.map((company: ICompany, companyIndex: number) => (
          <div key={companyIndex} className={companyIndex !== 0 ? "pt-4" : ""}>
            <div className="flex flex-row justify-between items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">
                {company.url ? (
                  <a href={company.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {company.name} <ExternalLink className="inline h-4 w-4 mb-1 print:hidden" />
                  </a>
                ) : (
                  company.name
                )}
                <span className="hidden print:inline text-muted-foreground text-sm">/ {shortURL(company.url)}</span>
              </h3>
              <div className="flex flex-row items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  {company.remote && (
                    <Badge
                      variant="outline"
                      className="flex items-center h-5 px-1.5 text-xs font-normal bg-primary/10 border-primary/20"
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      Remote
                    </Badge>
                  )}
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {company.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{company.startDate} - {company.endDate}</span>
                </div>
              </div>
            </div>

            <p className="text-sm mb-4 text-muted-foreground">{company.description}</p>

            <div className="space-y-6 pl-4 border-l-2 border-gray-200">
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
    </section>
  )
}
