import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "events" ADD COLUMN "meta_image_id" uuid;
  ALTER TABLE "events" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_image_id" uuid;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP CONSTRAINT "events_meta_image_id_media_id_fk";
  
  ALTER TABLE "_events_v" DROP CONSTRAINT "_events_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "events_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_events_v_version_meta_version_meta_image_idx";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_description";`)
}
