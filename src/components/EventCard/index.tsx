import { CalendarDays, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
import RichText from '../RichText'
import clsx from 'clsx'

interface EventCardProps {
  event: Event
  onEventPage?: boolean
}

export async function EventCard({ event, onEventPage }: EventCardProps) {
  const { location, date, image, title, id, external_link } = event
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
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'EST',
    }).format(new Date(date))
  }

  function formatTime(date: string) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'EST',
    }).format(new Date(date))
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
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4" />
                {formatDate(date.start)}
              </div>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {onEventPage && (
          <div className="space-y-4">
            <RichText className="mx-auto h-full" data={event.description} enableGutter={false} />
          </div>
        )}

        <Separator />
      </CardContent>
      <CardFooter
        className={clsx('flex items-center mt-auto', {
          'justify-between': !onEventPage,
          'justify-end': onEventPage,
        })}
      >
        {!onEventPage && <Link href={`/event/${id}`}>Learn more</Link>}
        <div className="flex gap-4">
          {!!external_link?.href && (
            <Button asChild>
              <Link href={external_link.href} target="_blank">
                {external_link['button-text']}
              </Link>
            </Button>
          )}
          <CalBtn event={event} descriptionPt={plainTextContent} />
        </div>
      </CardFooter>
    </Card>
  )
}
