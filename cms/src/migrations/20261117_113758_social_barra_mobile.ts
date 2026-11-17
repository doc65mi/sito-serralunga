import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_impostazioni_social_rete" AS ENUM('instagram', 'facebook', 'tiktok', 'pinterest', 'youtube', 'linkedin');
  CREATE TYPE "public"."enum_impostazioni_social_posizione" AS ENUM('barra', 'menu', 'entrambi', 'nessuno');
  CREATE TABLE "impostazioni_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rete" "enum_impostazioni_social_rete" NOT NULL,
  	"indirizzo" varchar,
  	"attivo" boolean DEFAULT true
  );
  
  ALTER TABLE "impostazioni" ADD COLUMN "social_posizione" "enum_impostazioni_social_posizione" DEFAULT 'barra';
  ALTER TABLE "impostazioni" ADD COLUMN "barra_mobile_attiva" boolean DEFAULT true;
  ALTER TABLE "impostazioni" ADD COLUMN "barra_mobile_catalogo" varchar DEFAULT '/catalogo/';
  ALTER TABLE "impostazioni" ADD COLUMN "barra_mobile_account" varchar DEFAULT '/contract/area-riservata/';
  ALTER TABLE "impostazioni" ADD COLUMN "barra_mobile_whatsapp" varchar;
  ALTER TABLE "impostazioni_social" ADD CONSTRAINT "impostazioni_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impostazioni_social_order_idx" ON "impostazioni_social" USING btree ("_order");
  CREATE INDEX "impostazioni_social_parent_id_idx" ON "impostazioni_social" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "impostazioni_social" CASCADE;
  ALTER TABLE "impostazioni" DROP COLUMN "social_posizione";
  ALTER TABLE "impostazioni" DROP COLUMN "barra_mobile_attiva";
  ALTER TABLE "impostazioni" DROP COLUMN "barra_mobile_catalogo";
  ALTER TABLE "impostazioni" DROP COLUMN "barra_mobile_account";
  ALTER TABLE "impostazioni" DROP COLUMN "barra_mobile_whatsapp";
  DROP TYPE "public"."enum_impostazioni_social_rete";
  DROP TYPE "public"."enum_impostazioni_social_posizione";`)
}
