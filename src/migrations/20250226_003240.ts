import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN IF EXISTS "links_rsvp";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "links_tickets";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "registration_status";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "registration_link";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_links_rsvp";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_links_tickets";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_registration_status";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_registration_link";
  DROP TYPE "public"."enum_events_registration_status";
  DROP TYPE "public"."enum__events_v_version_registration_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_registration_status" AS ENUM('open-to-all', 'optional', 'required');
  CREATE TYPE "public"."enum__events_v_version_registration_status" AS ENUM('open-to-all', 'optional', 'required');
  ALTER TABLE "events" ADD COLUMN "links_rsvp" varchar;
  ALTER TABLE "events" ADD COLUMN "links_tickets" varchar;
  ALTER TABLE "events" ADD COLUMN "registration_status" "enum_events_registration_status" DEFAULT 'open-to-all';
  ALTER TABLE "events" ADD COLUMN "registration_link" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_links_rsvp" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_links_tickets" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_registration_status" "enum__events_v_version_registration_status" DEFAULT 'open-to-all';
  ALTER TABLE "_events_v" ADD COLUMN "version_registration_link" varchar;`)
}
