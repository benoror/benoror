"use client"
import { Check, Moon, Sparkles, Sun } from "lucide-react"
import { useAppTheme } from "@/hooks/use-app-theme"
import { pickBlueValue } from "@/lib/theme-styles"

import { Button } from "@workspace/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"

export function ModeToggle() {
  const { activeTheme, activeResolvedTheme, setTheme, isBlueDark } = useAppTheme()
  const showDarkIcon = activeTheme !== "outrun" && activeResolvedTheme === "dark"
  const toggleColorClass = pickBlueValue(isBlueDark, "text-sky-100", "text-sky-700")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`rounded-full cursor-pointer ${toggleColorClass}`}>
          {activeTheme === "outrun" ? (
            <Sparkles className="h-[1.2rem] w-[1.2rem] text-pink-400" />
          ) : showDarkIcon ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("outrun")} className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-400" />
            Outrun
          </span>
          {activeTheme === "outrun" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <Moon className="h-4 w-4 text-sky-400" />
            Dark
          </span>
          {activeTheme === "dark" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-400" />
            Light
          </span>
          {activeTheme === "light" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between gap-3">
          <span>System</span>
          {activeTheme === "system" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
