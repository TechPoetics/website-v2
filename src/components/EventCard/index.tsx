import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import RichText from '../RichText'
import { $getRoot } from '@payloadcms/richtext-lexical/lexical'
import { Event } from '@/payload-types'
import { Media as MediaComp } from '../Media'
import CalBtn from './cal-btn'
import payloadConfig from '@payload-config'
import {
  sanitizeServerEditorConfig,
  getEnabledNodes,
  defaultEditorFeatures,
} from '@payloadcms/richtext-lexical'
import { createHeadlessEditor } from '@payloadcms/richtext-lexical/lexical/headless'
import { RegistrationStatus } from '@/collections/Events'

interface EventCardProps {
  event: Event
}

export async function EventCard({ event }: EventCardProps) {
  const { location, date, description, image, title, registration } = event
  const config = await payloadConfig

  const editorConfig = await sanitizeServerEditorConfig(
    {
      features: defaultEditorFeatures,
    },
    config,
  )

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: editorConfig,
    }),
  })

  // Import editor state into your headless editor
  try {
    headlessEditor.update(
      () => {
        headlessEditor.setEditorState(headlessEditor.parseEditorState(event.description))
      },
      { discrete: true }, // This should commit the editor state immediately
    )
  } catch (e) {
    console.error({ err: e }, 'ERROR parsing editor state')
  }

  // Export to plain text
  const plainTextContent =
    headlessEditor.getEditorState().read(() => {
      return $getRoot().getTextContent()
    }) || ''

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function formatTime(date: string) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative overflow-hidden aspect-[1/1]">
        {image && typeof image !== 'string' && (
          <MediaComp priority imgClassName="z-10" resource={image} />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatDate(date.start)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatTime(date.start)} - {formatTime(date.end)}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{location.name}</div>
              <div className="text-muted-foreground">{location.address}</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <RichText
            className="max-w-[48rem] mx-auto h-full line-clamp-[10]"
            data={description}
            enableGutter={false}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-auto">
        {registration?.status && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {registrationStatusToString(registration.status as RegistrationStatus)}
          </div>
        )}
        <div className="flex gap-4">
          {registration?.status !== 'open-to-all' && (
            <Button asChild>
              <Link href={registration?.link ?? '#'} target="_blank">
                Register
              </Link>
            </Button>
          )}
          <CalBtn event={event} descriptionPt={plainTextContent} />
        </div>
      </CardFooter>
    </Card>
  )
}

function registrationStatusToString(status: RegistrationStatus) {
  switch (status) {
    case RegistrationStatus.OPEN_TO_ALL:
      return 'Open to all'
    case RegistrationStatus.OPTIONAL:
      return 'Registration Optional'
    case RegistrationStatus.REQUIRED:
      return 'Registration Required'
  }
}
