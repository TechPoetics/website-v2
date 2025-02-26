import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "external_link_href" varchar;
  ALTER TABLE "events" ADD COLUMN "external_link_button_text" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_external_link_href" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_external_link_button_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN IF EXISTS "external_link_href";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "external_link_button_text";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_external_link_href";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_external_link_button_text";`)
}
