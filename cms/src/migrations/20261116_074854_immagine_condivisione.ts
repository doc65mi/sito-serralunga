import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impostazioni" ADD COLUMN "immagine_condivisione_id" integer;
  ALTER TABLE "impostazioni" ADD CONSTRAINT "impostazioni_immagine_condivisione_id_media_id_fk" FOREIGN KEY ("immagine_condivisione_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "impostazioni_immagine_condivisione_idx" ON "impostazioni" USING btree ("immagine_condivisione_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impostazioni" DROP CONSTRAINT "impostazioni_immagine_condivisione_id_media_id_fk";
  
  DROP INDEX "impostazioni_immagine_condivisione_idx";
  ALTER TABLE "impostazioni" DROP COLUMN "immagine_condivisione_id";`)
}
