'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'

import { Switch } from '@/components/ui/switch'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { Button } from '@/components/ui/button'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (!!preference) {
      setTheme(preference as Theme)
    }
  }, [setTheme])

  if (!mounted) {
    return <div className="w-11 h-6 bg-gray-300 rounded-md animate-pulse"></div> // Skeleton while waiting for hydration
  }

  return (
    <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'dark'
            ? 'text-[#A1A1AA] scale-75 rotate-12'
            : 'text-foreground scale-100 rotate-0'
        }`}
      />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'light'
            ? 'text-[#A1A1AA] scale-75 rotate-12'
            : 'text-foreground scale-100 rotate-0'
        }`}
      />
    </div>
  )
}

export function MobileThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (!!preference) {
      setTheme(preference as Theme)
    }
  }, [setTheme])

  if (!mounted) {
    return <div className="w-11 h-6 bg-gray-300 rounded-md animate-pulse"></div> // Skeleton while waiting for hydration
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={toggleTheme}
        size="icon"
        variant="outline"
        className="hover:bg-accent rounded-[8px]"
      >
        {theme === 'light' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] text-foreground scale-100 rotate-0" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] text-foreground scale-100 rotate-0" />
        )}
      </Button>
    </div>
  )
}
