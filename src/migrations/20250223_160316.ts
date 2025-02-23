import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "links_rsvp" varchar;
  ALTER TABLE "events" ADD COLUMN "links_tickets" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_links_rsvp" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_links_tickets" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN IF EXISTS "links_rsvp";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "links_tickets";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_links_rsvp";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_links_tickets";`)
}
