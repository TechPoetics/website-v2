'use client'

import { Button } from '@/components/ui/button'
import { Event } from '@/payload-types'
import { createEvent, EventAttributes } from 'ics'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Calendar } from 'lucide-react'
import { GoogleIcon } from '../Icons'

interface CalBtnProps {
  event: Event
  descriptionPt: string
}

export default function CalBtn({ event, descriptionPt }: CalBtnProps) {
  const downloadIcsFile = () => {
    const icsEvent: EventAttributes = {
      start: event.date.start,
      end: event.date.end,
      title: event.title,
      description: descriptionPt,
      location: event.location.name,
    }

    createEvent(icsEvent, (error, value) => {
      if (error) {
        console.error(error)
        return
      }

      // Create a Blob with the ICS content
      const blob = new Blob([value], { type: 'text/calendar' })
      const url = URL.createObjectURL(blob)

      // Create a temporary link element and trigger the download
      const a = document.createElement('a')
      a.href = url
      const formattedDate = new Date(event.date.start).toLocaleDateString().replaceAll('/', '-')
      a.download = `BTP Event - ${formattedDate}.ics` // Set the filename
      document.body.appendChild(a)
      a.click()

      // Cleanup
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  const addEventToGoogleCalendar = () => {
    const startDate = event.date.start.toString().replace(/[-:.]/g, '').split('000Z')[0] + 'Z'
    const endDate = event.date.end.toString().replace(/[-:.]/g, '').split('000Z')[0] + 'Z'
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(descriptionPt)}&location=${encodeURIComponent(event.location.name)}&dates=${startDate}/${endDate}`

    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4 hidden sm:block" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuItem className="flex items-center gap-2" onClick={addEventToGoogleCalendar}>
          <GoogleIcon />
          <span className="jsx-3148223987">Google Calendar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onClick={downloadIcsFile}>
          <Calendar className="h-4 w-4" />
          iCal (Apple / Outlook)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
