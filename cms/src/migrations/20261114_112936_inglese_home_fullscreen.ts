import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_installazioni_voci_categoria" AS ENUM('hotel', 'risto', 'spa', 'resid');
  CREATE TYPE "public"."enum_home_installazioni_voci_formato" AS ENUM('alta', 'bassa', 'media', 'larga');
  CREATE TYPE "public"."enum_home_collezioni_tessere_scritta" AS ENUM('scura', 'chiara');
  CREATE TYPE "public"."enum__home_v_version_installazioni_voci_categoria" AS ENUM('hotel', 'risto', 'spa', 'resid');
  CREATE TYPE "public"."enum__home_v_version_installazioni_voci_formato" AS ENUM('alta', 'bassa', 'media', 'larga');
  CREATE TYPE "public"."enum__home_v_version_collezioni_tessere_scritta" AS ENUM('scura', 'chiara');
  ALTER TYPE "public"."_locales" ADD VALUE 'en';
  ALTER TYPE "public"."enum__prodotti_v_published_locale" ADD VALUE 'en';
  ALTER TYPE "public"."enum__case_history_v_published_locale" ADD VALUE 'en';
  ALTER TYPE "public"."enum__designer_v_published_locale" ADD VALUE 'en';
  ALTER TYPE "public"."enum__home_v_published_locale" ADD VALUE 'en';
  CREATE TABLE "home_progetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "home_progetti_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_chi_siamo_punti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_chi_siamo_punti_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_installazioni_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"categoria" "enum_home_installazioni_voci_categoria" DEFAULT 'hotel',
  	"formato" "enum_home_installazioni_voci_formato" DEFAULT 'media',
  	"link" varchar
  );
  
  CREATE TABLE "home_installazioni_voci_locales" (
  	"titolo" varchar,
  	"sottotitolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_contract_servizi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_contract_servizi_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_home_v_version_progetti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_progetti_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_chi_siamo_punti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_chi_siamo_punti_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_installazioni_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"categoria" "enum__home_v_version_installazioni_voci_categoria" DEFAULT 'hotel',
  	"formato" "enum__home_v_version_installazioni_voci_formato" DEFAULT 'media',
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_installazioni_voci_locales" (
  	"titolo" varchar,
  	"sottotitolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_contract_servizi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_contract_servizi_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_slide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_slide_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_luoghi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_luoghi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_materia_schede" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_materia_schede_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_materia_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_materia_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_slide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_slide_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_luoghi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_luoghi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_materia_schede" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_materia_schede_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_materia_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_materia_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_slide" CASCADE;
  DROP TABLE "home_slide_locales" CASCADE;
  DROP TABLE "home_luoghi" CASCADE;
  DROP TABLE "home_luoghi_locales" CASCADE;
  DROP TABLE "home_materia_schede" CASCADE;
  DROP TABLE "home_materia_schede_locales" CASCADE;
  DROP TABLE "home_materia_numeri" CASCADE;
  DROP TABLE "home_materia_numeri_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_slide" CASCADE;
  DROP TABLE "_home_v_version_slide_locales" CASCADE;
  DROP TABLE "_home_v_version_luoghi" CASCADE;
  DROP TABLE "_home_v_version_luoghi_locales" CASCADE;
  DROP TABLE "_home_v_version_materia_schede" CASCADE;
  DROP TABLE "_home_v_version_materia_schede_locales" CASCADE;
  DROP TABLE "_home_v_version_materia_numeri" CASCADE;
  DROP TABLE "_home_v_version_materia_numeri_locales" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  ALTER TABLE "home" DROP CONSTRAINT "home_video_file_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_video_poster_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_banner_immagine_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_citazione_immagine_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_invito_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_video_file_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_video_poster_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_banner_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_citazione_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_invito_immagine_id_media_id_fk";
  
  DROP INDEX "home_video_video_file_idx";
  DROP INDEX "home_video_video_poster_idx";
  DROP INDEX "home_banner_banner_immagine_idx";
  DROP INDEX "home_citazione_citazione_immagine_idx";
  DROP INDEX "home_invito_invito_immagine_idx";
  DROP INDEX "_home_v_version_video_version_video_file_idx";
  DROP INDEX "_home_v_version_video_version_video_poster_idx";
  DROP INDEX "_home_v_version_banner_version_banner_immagine_idx";
  DROP INDEX "_home_v_version_citazione_version_citazione_immagine_idx";
  DROP INDEX "_home_v_version_invito_version_invito_immagine_idx";
  ALTER TABLE "home_collezioni_tessere" ADD COLUMN "scritta" "enum_home_collezioni_tessere_scritta" DEFAULT 'scura';
  ALTER TABLE "home" ADD COLUMN "hero_immagine_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_video_id" integer;
  ALTER TABLE "home" ADD COLUMN "hero_nota_video" boolean DEFAULT false;
  ALTER TABLE "home" ADD COLUMN "hero_link1" varchar;
  ALTER TABLE "home" ADD COLUMN "hero_link2" varchar;
  ALTER TABLE "home" ADD COLUMN "chi_siamo_sfondo" varchar DEFAULT '1825';
  ALTER TABLE "home" ADD COLUMN "chi_siamo_immagine_id" integer;
  ALTER TABLE "home" ADD COLUMN "chi_siamo_link" varchar;
  ALTER TABLE "home" ADD COLUMN "installazioni_link" varchar;
  ALTER TABLE "home" ADD COLUMN "contract_immagine_id" integer;
  ALTER TABLE "home" ADD COLUMN "catalogo_immagine_id" integer;
  ALTER TABLE "home_locales" ADD COLUMN "hero_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "hero_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "hero_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "hero_link1_etichetta" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "hero_link2_etichetta" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "chi_siamo_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "chi_siamo_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "chi_siamo_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "chi_siamo_pulsante" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "installazioni_sfondo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "installazioni_testo_sinistra" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "installazioni_testo_destra" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "installazioni_pulsante" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "contract_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "contract_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "catalogo_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "catalogo_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "catalogo_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "catalogo_pulsante" varchar DEFAULT 'Richiesta catalogo';
  ALTER TABLE "home_locales" ADD COLUMN "catalogo_grazie" varchar DEFAULT 'Grazie: riceverete catalogo e listino entro 24 ore lavorative.';
  ALTER TABLE "_home_v_version_collezioni_tessere" ADD COLUMN "scritta" "enum__home_v_version_collezioni_tessere_scritta" DEFAULT 'scura';
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_immagine_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_video_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_nota_video" boolean DEFAULT false;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_link1" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_link2" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_chi_siamo_sfondo" varchar DEFAULT '1825';
  ALTER TABLE "_home_v" ADD COLUMN "version_chi_siamo_immagine_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_chi_siamo_link" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_installazioni_link" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_contract_immagine_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_catalogo_immagine_id" integer;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_hero_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_hero_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_hero_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_hero_link1_etichetta" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_hero_link2_etichetta" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_chi_siamo_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_chi_siamo_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_chi_siamo_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_chi_siamo_pulsante" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_installazioni_sfondo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_installazioni_testo_sinistra" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_installazioni_testo_destra" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_installazioni_pulsante" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_contract_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_contract_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_catalogo_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_catalogo_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_catalogo_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_catalogo_pulsante" varchar DEFAULT 'Richiesta catalogo';
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_catalogo_grazie" varchar DEFAULT 'Grazie: riceverete catalogo e listino entro 24 ore lavorative.';
  ALTER TABLE "impostazioni" ADD COLUMN "barra_link" varchar;
  ALTER TABLE "impostazioni_locales" ADD COLUMN "barra_testo" varchar;
  ALTER TABLE "impostazioni_locales" ADD COLUMN "barra_link_etichetta" varchar;
  ALTER TABLE "home_progetti" ADD CONSTRAINT "home_progetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_progetti_locales" ADD CONSTRAINT "home_progetti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_progetti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_chi_siamo_punti" ADD CONSTRAINT "home_chi_siamo_punti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_chi_siamo_punti_locales" ADD CONSTRAINT "home_chi_siamo_punti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_chi_siamo_punti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_numeri" ADD CONSTRAINT "home_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_numeri_locales" ADD CONSTRAINT "home_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_installazioni_voci" ADD CONSTRAINT "home_installazioni_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_installazioni_voci" ADD CONSTRAINT "home_installazioni_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_installazioni_voci_locales" ADD CONSTRAINT "home_installazioni_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_installazioni_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_contract_servizi" ADD CONSTRAINT "home_contract_servizi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_contract_servizi_locales" ADD CONSTRAINT "home_contract_servizi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_contract_servizi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_progetti" ADD CONSTRAINT "_home_v_version_progetti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_progetti_locales" ADD CONSTRAINT "_home_v_version_progetti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_progetti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_chi_siamo_punti" ADD CONSTRAINT "_home_v_version_chi_siamo_punti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_chi_siamo_punti_locales" ADD CONSTRAINT "_home_v_version_chi_siamo_punti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_chi_siamo_punti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_numeri" ADD CONSTRAINT "_home_v_version_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_numeri_locales" ADD CONSTRAINT "_home_v_version_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_installazioni_voci" ADD CONSTRAINT "_home_v_version_installazioni_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_installazioni_voci" ADD CONSTRAINT "_home_v_version_installazioni_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_installazioni_voci_locales" ADD CONSTRAINT "_home_v_version_installazioni_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_installazioni_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_contract_servizi" ADD CONSTRAINT "_home_v_version_contract_servizi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_contract_servizi_locales" ADD CONSTRAINT "_home_v_version_contract_servizi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_contract_servizi"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_progetti_order_idx" ON "home_progetti" USING btree ("_order");
  CREATE INDEX "home_progetti_parent_id_idx" ON "home_progetti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_progetti_locales_locale_parent_id_unique" ON "home_progetti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_progetti_locales_parent_id_idx" ON "home_progetti_locales" USING btree ("_parent_id");
  CREATE INDEX "home_chi_siamo_punti_order_idx" ON "home_chi_siamo_punti" USING btree ("_order");
  CREATE INDEX "home_chi_siamo_punti_parent_id_idx" ON "home_chi_siamo_punti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_chi_siamo_punti_locales_locale_parent_id_unique" ON "home_chi_siamo_punti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_chi_siamo_punti_locales_parent_id_idx" ON "home_chi_siamo_punti_locales" USING btree ("_parent_id");
  CREATE INDEX "home_numeri_order_idx" ON "home_numeri" USING btree ("_order");
  CREATE INDEX "home_numeri_parent_id_idx" ON "home_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_numeri_locales_locale_parent_id_unique" ON "home_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_numeri_locales_parent_id_idx" ON "home_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "home_installazioni_voci_order_idx" ON "home_installazioni_voci" USING btree ("_order");
  CREATE INDEX "home_installazioni_voci_parent_id_idx" ON "home_installazioni_voci" USING btree ("_parent_id");
  CREATE INDEX "home_installazioni_voci_immagine_idx" ON "home_installazioni_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_installazioni_voci_locales_locale_parent_id_unique" ON "home_installazioni_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_installazioni_voci_locales_parent_id_idx" ON "home_installazioni_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "home_contract_servizi_order_idx" ON "home_contract_servizi" USING btree ("_order");
  CREATE INDEX "home_contract_servizi_parent_id_idx" ON "home_contract_servizi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_contract_servizi_locales_locale_parent_id_unique" ON "home_contract_servizi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_contract_servizi_locales_parent_id_idx" ON "home_contract_servizi_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_progetti_order_idx" ON "_home_v_version_progetti" USING btree ("_order");
  CREATE INDEX "_home_v_version_progetti_parent_id_idx" ON "_home_v_version_progetti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_progetti_locales_locale_parent_id_unique" ON "_home_v_version_progetti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_progetti_locales_parent_id_idx" ON "_home_v_version_progetti_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_chi_siamo_punti_order_idx" ON "_home_v_version_chi_siamo_punti" USING btree ("_order");
  CREATE INDEX "_home_v_version_chi_siamo_punti_parent_id_idx" ON "_home_v_version_chi_siamo_punti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_chi_siamo_punti_locales_locale_parent_id_uni" ON "_home_v_version_chi_siamo_punti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_chi_siamo_punti_locales_parent_id_idx" ON "_home_v_version_chi_siamo_punti_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_numeri_order_idx" ON "_home_v_version_numeri" USING btree ("_order");
  CREATE INDEX "_home_v_version_numeri_parent_id_idx" ON "_home_v_version_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_numeri_locales_locale_parent_id_unique" ON "_home_v_version_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_numeri_locales_parent_id_idx" ON "_home_v_version_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_installazioni_voci_order_idx" ON "_home_v_version_installazioni_voci" USING btree ("_order");
  CREATE INDEX "_home_v_version_installazioni_voci_parent_id_idx" ON "_home_v_version_installazioni_voci" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_installazioni_voci_immagine_idx" ON "_home_v_version_installazioni_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_installazioni_voci_locales_locale_parent_id_" ON "_home_v_version_installazioni_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_installazioni_voci_locales_parent_id_idx" ON "_home_v_version_installazioni_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_contract_servizi_order_idx" ON "_home_v_version_contract_servizi" USING btree ("_order");
  CREATE INDEX "_home_v_version_contract_servizi_parent_id_idx" ON "_home_v_version_contract_servizi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_contract_servizi_locales_locale_parent_id_un" ON "_home_v_version_contract_servizi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_contract_servizi_locales_parent_id_idx" ON "_home_v_version_contract_servizi_locales" USING btree ("_parent_id");
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_immagine_id_media_id_fk" FOREIGN KEY ("hero_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_chi_siamo_immagine_id_media_id_fk" FOREIGN KEY ("chi_siamo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_contract_immagine_id_media_id_fk" FOREIGN KEY ("contract_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_catalogo_immagine_id_media_id_fk" FOREIGN KEY ("catalogo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_immagine_id_media_id_fk" FOREIGN KEY ("version_hero_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_chi_siamo_immagine_id_media_id_fk" FOREIGN KEY ("version_chi_siamo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_contract_immagine_id_media_id_fk" FOREIGN KEY ("version_contract_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_catalogo_immagine_id_media_id_fk" FOREIGN KEY ("version_catalogo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_hero_hero_immagine_idx" ON "home" USING btree ("hero_immagine_id");
  CREATE INDEX "home_hero_hero_video_idx" ON "home" USING btree ("hero_video_id");
  CREATE INDEX "home_chi_siamo_chi_siamo_immagine_idx" ON "home" USING btree ("chi_siamo_immagine_id");
  CREATE INDEX "home_contract_contract_immagine_idx" ON "home" USING btree ("contract_immagine_id");
  CREATE INDEX "home_catalogo_catalogo_immagine_idx" ON "home" USING btree ("catalogo_immagine_id");
  CREATE INDEX "_home_v_version_hero_version_hero_immagine_idx" ON "_home_v" USING btree ("version_hero_immagine_id");
  CREATE INDEX "_home_v_version_hero_version_hero_video_idx" ON "_home_v" USING btree ("version_hero_video_id");
  CREATE INDEX "_home_v_version_chi_siamo_version_chi_siamo_immagine_idx" ON "_home_v" USING btree ("version_chi_siamo_immagine_id");
  CREATE INDEX "_home_v_version_contract_version_contract_immagine_idx" ON "_home_v" USING btree ("version_contract_immagine_id");
  CREATE INDEX "_home_v_version_catalogo_version_catalogo_immagine_idx" ON "_home_v" USING btree ("version_catalogo_immagine_id");
  ALTER TABLE "home" DROP COLUMN "tipo_apertura";
  ALTER TABLE "home" DROP COLUMN "video_file_id";
  ALTER TABLE "home" DROP COLUMN "video_poster_id";
  ALTER TABLE "home" DROP COLUMN "video_link";
  ALTER TABLE "home" DROP COLUMN "banner_immagine_id";
  ALTER TABLE "home" DROP COLUMN "designer_segnaposto";
  ALTER TABLE "home" DROP COLUMN "citazione_immagine_id";
  ALTER TABLE "home" DROP COLUMN "invito_immagine_id";
  ALTER TABLE "home_locales" DROP COLUMN "h1";
  ALTER TABLE "home_locales" DROP COLUMN "video_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "video_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "video_testo";
  ALTER TABLE "home_locales" DROP COLUMN "video_link_etichetta";
  ALTER TABLE "home_locales" DROP COLUMN "manifesto_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "manifesto_testo";
  ALTER TABLE "home_locales" DROP COLUMN "banner_numero";
  ALTER TABLE "home_locales" DROP COLUMN "banner_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "banner_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "banner_testo";
  ALTER TABLE "home_locales" DROP COLUMN "materia_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "materia_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "materia_testo";
  ALTER TABLE "home_locales" DROP COLUMN "designer_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "designer_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "designer_testo";
  ALTER TABLE "home_locales" DROP COLUMN "portfolio_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "portfolio_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "portfolio_testo";
  ALTER TABLE "home_locales" DROP COLUMN "citazione_testo";
  ALTER TABLE "home_locales" DROP COLUMN "citazione_firma";
  ALTER TABLE "home_locales" DROP COLUMN "invito_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "invito_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "invito_testo";
  ALTER TABLE "home_locales" DROP COLUMN "invito_pulsante";
  ALTER TABLE "home_locales" DROP COLUMN "invito_grazie";
  ALTER TABLE "_home_v" DROP COLUMN "version_tipo_apertura";
  ALTER TABLE "_home_v" DROP COLUMN "version_video_file_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_video_poster_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_video_link";
  ALTER TABLE "_home_v" DROP COLUMN "version_banner_immagine_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_designer_segnaposto";
  ALTER TABLE "_home_v" DROP COLUMN "version_citazione_immagine_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_invito_immagine_id";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_h1";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_video_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_video_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_video_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_video_link_etichetta";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_manifesto_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_manifesto_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_banner_numero";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_banner_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_banner_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_banner_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_materia_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_materia_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_materia_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_designer_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_designer_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_designer_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_portfolio_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_portfolio_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_portfolio_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_citazione_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_citazione_firma";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_invito_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_invito_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_invito_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_invito_pulsante";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_invito_grazie";
  DROP TYPE "public"."enum_home_tipo_apertura";
  DROP TYPE "public"."enum__home_v_version_tipo_apertura";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_tipo_apertura" AS ENUM('slide', 'video');
  CREATE TYPE "public"."enum__home_v_version_tipo_apertura" AS ENUM('slide', 'video');
  CREATE TABLE "home_slide" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "home_slide_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"link_etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_luoghi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "home_luoghi_locales" (
  	"numero" varchar,
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_materia_schede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "home_materia_schede_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_materia_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_materia_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"designer_id" integer,
  	"prodotti_id" integer
  );
  
  CREATE TABLE "_home_v_version_slide" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_slide_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"link_etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_luoghi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_luoghi_locales" (
  	"numero" varchar,
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_materia_schede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_materia_schede_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_materia_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_materia_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"designer_id" integer,
  	"prodotti_id" integer
  );
  
  ALTER TABLE "home_progetti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_progetti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_chi_siamo_punti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_chi_siamo_punti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_installazioni_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_installazioni_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_contract_servizi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_contract_servizi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_progetti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_progetti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_chi_siamo_punti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_chi_siamo_punti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_installazioni_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_installazioni_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_contract_servizi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_contract_servizi_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_progetti" CASCADE;
  DROP TABLE "home_progetti_locales" CASCADE;
  DROP TABLE "home_chi_siamo_punti" CASCADE;
  DROP TABLE "home_chi_siamo_punti_locales" CASCADE;
  DROP TABLE "home_numeri" CASCADE;
  DROP TABLE "home_numeri_locales" CASCADE;
  DROP TABLE "home_installazioni_voci" CASCADE;
  DROP TABLE "home_installazioni_voci_locales" CASCADE;
  DROP TABLE "home_contract_servizi" CASCADE;
  DROP TABLE "home_contract_servizi_locales" CASCADE;
  DROP TABLE "_home_v_version_progetti" CASCADE;
  DROP TABLE "_home_v_version_progetti_locales" CASCADE;
  DROP TABLE "_home_v_version_chi_siamo_punti" CASCADE;
  DROP TABLE "_home_v_version_chi_siamo_punti_locales" CASCADE;
  DROP TABLE "_home_v_version_numeri" CASCADE;
  DROP TABLE "_home_v_version_numeri_locales" CASCADE;
  DROP TABLE "_home_v_version_installazioni_voci" CASCADE;
  DROP TABLE "_home_v_version_installazioni_voci_locales" CASCADE;
  DROP TABLE "_home_v_version_contract_servizi" CASCADE;
  DROP TABLE "_home_v_version_contract_servizi_locales" CASCADE;
  ALTER TABLE "home" DROP CONSTRAINT "home_hero_immagine_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_hero_video_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_chi_siamo_immagine_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_contract_immagine_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_catalogo_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_hero_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_hero_video_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_chi_siamo_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_contract_immagine_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_catalogo_immagine_id_media_id_fk";
  
  ALTER TABLE "prodotti_colori_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_dimensioni_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_specifiche_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_firma_progetto_testi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_case_segnaposto_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_correlati_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "prodotti_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_colori_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_dimensioni_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_specifiche_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_firma_progetto_testi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_case_segnaposto_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_version_correlati_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_prodotti_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_progetto_paragrafi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_progetto_scheda_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_passi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_protagonista_dati_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_prodotti_usati_voci_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "case_history_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_version_progetto_paragrafi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_version_progetto_scheda_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_version_passi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_version_protagonista_dati_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_case_history_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "designer_biografia_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "designer_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "designer_premi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "designer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_designer_v_version_biografia_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_designer_v_version_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_designer_v_version_premi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_designer_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_slide_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_luoghi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_materia_schede_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_materia_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_collezioni_tessere_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_slide_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_luoghi_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_materia_schede_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_materia_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_collezioni_tessere_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pagina_designer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "impostazioni_menu_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "impostazioni_colonne_link_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "impostazioni_colonne_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "impostazioni_legali_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "impostazioni_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('it');
  ALTER TABLE "prodotti_colori_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_dimensioni_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_specifiche_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_firma_progetto_testi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_case_segnaposto_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_correlati_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "prodotti_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_colori_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_dimensioni_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_specifiche_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_firma_progetto_testi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_case_segnaposto_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_version_correlati_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_progetto_paragrafi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_progetto_scheda_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_passi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_protagonista_dati_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_prodotti_usati_voci_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "case_history_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_version_progetto_paragrafi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_version_progetto_scheda_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_version_passi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_version_protagonista_dati_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_case_history_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "designer_biografia_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "designer_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "designer_premi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "designer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_designer_v_version_biografia_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_designer_v_version_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_designer_v_version_premi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_designer_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_slide_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_luoghi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_materia_schede_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_materia_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_collezioni_tessere_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_version_slide_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_version_luoghi_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_version_materia_schede_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_version_materia_numeri_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_version_collezioni_tessere_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pagina_designer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "impostazioni_menu_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "impostazioni_colonne_link_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "impostazioni_colonne_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "impostazioni_legali_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "impostazioni_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_prodotti_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__prodotti_v_published_locale";
  CREATE TYPE "public"."enum__prodotti_v_published_locale" AS ENUM('it');
  ALTER TABLE "_prodotti_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__prodotti_v_published_locale" USING "published_locale"::"public"."enum__prodotti_v_published_locale";
  ALTER TABLE "_case_history_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__case_history_v_published_locale";
  CREATE TYPE "public"."enum__case_history_v_published_locale" AS ENUM('it');
  ALTER TABLE "_case_history_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__case_history_v_published_locale" USING "published_locale"::"public"."enum__case_history_v_published_locale";
  ALTER TABLE "_designer_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__designer_v_published_locale";
  CREATE TYPE "public"."enum__designer_v_published_locale" AS ENUM('it');
  ALTER TABLE "_designer_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__designer_v_published_locale" USING "published_locale"::"public"."enum__designer_v_published_locale";
  ALTER TABLE "_home_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__home_v_published_locale";
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('it');
  ALTER TABLE "_home_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__home_v_published_locale" USING "published_locale"::"public"."enum__home_v_published_locale";
  DROP INDEX "home_hero_hero_immagine_idx";
  DROP INDEX "home_hero_hero_video_idx";
  DROP INDEX "home_chi_siamo_chi_siamo_immagine_idx";
  DROP INDEX "home_contract_contract_immagine_idx";
  DROP INDEX "home_catalogo_catalogo_immagine_idx";
  DROP INDEX "_home_v_version_hero_version_hero_immagine_idx";
  DROP INDEX "_home_v_version_hero_version_hero_video_idx";
  DROP INDEX "_home_v_version_chi_siamo_version_chi_siamo_immagine_idx";
  DROP INDEX "_home_v_version_contract_version_contract_immagine_idx";
  DROP INDEX "_home_v_version_catalogo_version_catalogo_immagine_idx";
  ALTER TABLE "home" ADD COLUMN "tipo_apertura" "enum_home_tipo_apertura" DEFAULT 'slide';
  ALTER TABLE "home" ADD COLUMN "video_file_id" integer;
  ALTER TABLE "home" ADD COLUMN "video_poster_id" integer;
  ALTER TABLE "home" ADD COLUMN "video_link" varchar;
  ALTER TABLE "home" ADD COLUMN "banner_immagine_id" integer;
  ALTER TABLE "home" ADD COLUMN "designer_segnaposto" numeric DEFAULT 0;
  ALTER TABLE "home" ADD COLUMN "citazione_immagine_id" integer;
  ALTER TABLE "home" ADD COLUMN "invito_immagine_id" integer;
  ALTER TABLE "home_locales" ADD COLUMN "h1" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "video_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "video_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "video_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "video_link_etichetta" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "manifesto_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "manifesto_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "banner_numero" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "banner_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "banner_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "banner_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "materia_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "materia_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "materia_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "designer_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "designer_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "designer_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "portfolio_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "portfolio_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "portfolio_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "citazione_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "citazione_firma" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "invito_kicker" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "invito_titolo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "invito_testo" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "invito_pulsante" varchar DEFAULT 'Richiedi il volume';
  ALTER TABLE "home_locales" ADD COLUMN "invito_grazie" varchar DEFAULT 'Grazie: vi ricontatteremo a breve con il volume Serralunga.';
  ALTER TABLE "_home_v" ADD COLUMN "version_tipo_apertura" "enum__home_v_version_tipo_apertura" DEFAULT 'slide';
  ALTER TABLE "_home_v" ADD COLUMN "version_video_file_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_video_poster_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_video_link" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_banner_immagine_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_designer_segnaposto" numeric DEFAULT 0;
  ALTER TABLE "_home_v" ADD COLUMN "version_citazione_immagine_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_invito_immagine_id" integer;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_h1" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_video_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_video_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_video_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_video_link_etichetta" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_manifesto_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_manifesto_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_banner_numero" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_banner_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_banner_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_banner_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_materia_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_materia_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_materia_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_designer_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_designer_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_designer_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_portfolio_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_portfolio_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_portfolio_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_citazione_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_citazione_firma" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_invito_kicker" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_invito_titolo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_invito_testo" varchar;
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_invito_pulsante" varchar DEFAULT 'Richiedi il volume';
  ALTER TABLE "_home_v_locales" ADD COLUMN "version_invito_grazie" varchar DEFAULT 'Grazie: vi ricontatteremo a breve con il volume Serralunga.';
  ALTER TABLE "home_slide" ADD CONSTRAINT "home_slide_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_slide" ADD CONSTRAINT "home_slide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_slide_locales" ADD CONSTRAINT "home_slide_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_slide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_luoghi" ADD CONSTRAINT "home_luoghi_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_luoghi" ADD CONSTRAINT "home_luoghi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_luoghi_locales" ADD CONSTRAINT "home_luoghi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_luoghi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_materia_schede" ADD CONSTRAINT "home_materia_schede_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_materia_schede" ADD CONSTRAINT "home_materia_schede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_materia_schede_locales" ADD CONSTRAINT "home_materia_schede_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_materia_schede"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_materia_numeri" ADD CONSTRAINT "home_materia_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_materia_numeri_locales" ADD CONSTRAINT "home_materia_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_materia_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_slide" ADD CONSTRAINT "_home_v_version_slide_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_slide" ADD CONSTRAINT "_home_v_version_slide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_slide_locales" ADD CONSTRAINT "_home_v_version_slide_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_slide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_luoghi" ADD CONSTRAINT "_home_v_version_luoghi_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_luoghi" ADD CONSTRAINT "_home_v_version_luoghi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_luoghi_locales" ADD CONSTRAINT "_home_v_version_luoghi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_luoghi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_materia_schede" ADD CONSTRAINT "_home_v_version_materia_schede_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_materia_schede" ADD CONSTRAINT "_home_v_version_materia_schede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_materia_schede_locales" ADD CONSTRAINT "_home_v_version_materia_schede_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_materia_schede"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_materia_numeri" ADD CONSTRAINT "_home_v_version_materia_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_materia_numeri_locales" ADD CONSTRAINT "_home_v_version_materia_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_materia_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_slide_order_idx" ON "home_slide" USING btree ("_order");
  CREATE INDEX "home_slide_parent_id_idx" ON "home_slide" USING btree ("_parent_id");
  CREATE INDEX "home_slide_immagine_idx" ON "home_slide" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_slide_locales_locale_parent_id_unique" ON "home_slide_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_slide_locales_parent_id_idx" ON "home_slide_locales" USING btree ("_parent_id");
  CREATE INDEX "home_luoghi_order_idx" ON "home_luoghi" USING btree ("_order");
  CREATE INDEX "home_luoghi_parent_id_idx" ON "home_luoghi" USING btree ("_parent_id");
  CREATE INDEX "home_luoghi_immagine_idx" ON "home_luoghi" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_luoghi_locales_locale_parent_id_unique" ON "home_luoghi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_luoghi_locales_parent_id_idx" ON "home_luoghi_locales" USING btree ("_parent_id");
  CREATE INDEX "home_materia_schede_order_idx" ON "home_materia_schede" USING btree ("_order");
  CREATE INDEX "home_materia_schede_parent_id_idx" ON "home_materia_schede" USING btree ("_parent_id");
  CREATE INDEX "home_materia_schede_immagine_idx" ON "home_materia_schede" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_materia_schede_locales_locale_parent_id_unique" ON "home_materia_schede_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_materia_schede_locales_parent_id_idx" ON "home_materia_schede_locales" USING btree ("_parent_id");
  CREATE INDEX "home_materia_numeri_order_idx" ON "home_materia_numeri" USING btree ("_order");
  CREATE INDEX "home_materia_numeri_parent_id_idx" ON "home_materia_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_materia_numeri_locales_locale_parent_id_unique" ON "home_materia_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_materia_numeri_locales_parent_id_idx" ON "home_materia_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_designer_id_idx" ON "home_rels" USING btree ("designer_id");
  CREATE INDEX "home_rels_prodotti_id_idx" ON "home_rels" USING btree ("prodotti_id");
  CREATE INDEX "_home_v_version_slide_order_idx" ON "_home_v_version_slide" USING btree ("_order");
  CREATE INDEX "_home_v_version_slide_parent_id_idx" ON "_home_v_version_slide" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_slide_immagine_idx" ON "_home_v_version_slide" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_slide_locales_locale_parent_id_unique" ON "_home_v_version_slide_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_slide_locales_parent_id_idx" ON "_home_v_version_slide_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_luoghi_order_idx" ON "_home_v_version_luoghi" USING btree ("_order");
  CREATE INDEX "_home_v_version_luoghi_parent_id_idx" ON "_home_v_version_luoghi" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_luoghi_immagine_idx" ON "_home_v_version_luoghi" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_luoghi_locales_locale_parent_id_unique" ON "_home_v_version_luoghi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_luoghi_locales_parent_id_idx" ON "_home_v_version_luoghi_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_materia_schede_order_idx" ON "_home_v_version_materia_schede" USING btree ("_order");
  CREATE INDEX "_home_v_version_materia_schede_parent_id_idx" ON "_home_v_version_materia_schede" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_materia_schede_immagine_idx" ON "_home_v_version_materia_schede" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_materia_schede_locales_locale_parent_id_uniq" ON "_home_v_version_materia_schede_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_materia_schede_locales_parent_id_idx" ON "_home_v_version_materia_schede_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_materia_numeri_order_idx" ON "_home_v_version_materia_numeri" USING btree ("_order");
  CREATE INDEX "_home_v_version_materia_numeri_parent_id_idx" ON "_home_v_version_materia_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_materia_numeri_locales_locale_parent_id_uniq" ON "_home_v_version_materia_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_materia_numeri_locales_parent_id_idx" ON "_home_v_version_materia_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_designer_id_idx" ON "_home_v_rels" USING btree ("designer_id");
  CREATE INDEX "_home_v_rels_prodotti_id_idx" ON "_home_v_rels" USING btree ("prodotti_id");
  ALTER TABLE "home" ADD CONSTRAINT "home_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_banner_immagine_id_media_id_fk" FOREIGN KEY ("banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_citazione_immagine_id_media_id_fk" FOREIGN KEY ("citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_invito_immagine_id_media_id_fk" FOREIGN KEY ("invito_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_video_file_id_media_id_fk" FOREIGN KEY ("version_video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_video_poster_id_media_id_fk" FOREIGN KEY ("version_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_banner_immagine_id_media_id_fk" FOREIGN KEY ("version_banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_citazione_immagine_id_media_id_fk" FOREIGN KEY ("version_citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_invito_immagine_id_media_id_fk" FOREIGN KEY ("version_invito_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_video_video_file_idx" ON "home" USING btree ("video_file_id");
  CREATE INDEX "home_video_video_poster_idx" ON "home" USING btree ("video_poster_id");
  CREATE INDEX "home_banner_banner_immagine_idx" ON "home" USING btree ("banner_immagine_id");
  CREATE INDEX "home_citazione_citazione_immagine_idx" ON "home" USING btree ("citazione_immagine_id");
  CREATE INDEX "home_invito_invito_immagine_idx" ON "home" USING btree ("invito_immagine_id");
  CREATE INDEX "_home_v_version_video_version_video_file_idx" ON "_home_v" USING btree ("version_video_file_id");
  CREATE INDEX "_home_v_version_video_version_video_poster_idx" ON "_home_v" USING btree ("version_video_poster_id");
  CREATE INDEX "_home_v_version_banner_version_banner_immagine_idx" ON "_home_v" USING btree ("version_banner_immagine_id");
  CREATE INDEX "_home_v_version_citazione_version_citazione_immagine_idx" ON "_home_v" USING btree ("version_citazione_immagine_id");
  CREATE INDEX "_home_v_version_invito_version_invito_immagine_idx" ON "_home_v" USING btree ("version_invito_immagine_id");
  ALTER TABLE "home_collezioni_tessere" DROP COLUMN "scritta";
  ALTER TABLE "home" DROP COLUMN "hero_immagine_id";
  ALTER TABLE "home" DROP COLUMN "hero_video_id";
  ALTER TABLE "home" DROP COLUMN "hero_nota_video";
  ALTER TABLE "home" DROP COLUMN "hero_link1";
  ALTER TABLE "home" DROP COLUMN "hero_link2";
  ALTER TABLE "home" DROP COLUMN "chi_siamo_sfondo";
  ALTER TABLE "home" DROP COLUMN "chi_siamo_immagine_id";
  ALTER TABLE "home" DROP COLUMN "chi_siamo_link";
  ALTER TABLE "home" DROP COLUMN "installazioni_link";
  ALTER TABLE "home" DROP COLUMN "contract_immagine_id";
  ALTER TABLE "home" DROP COLUMN "catalogo_immagine_id";
  ALTER TABLE "home_locales" DROP COLUMN "hero_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "hero_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "hero_testo";
  ALTER TABLE "home_locales" DROP COLUMN "hero_link1_etichetta";
  ALTER TABLE "home_locales" DROP COLUMN "hero_link2_etichetta";
  ALTER TABLE "home_locales" DROP COLUMN "chi_siamo_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "chi_siamo_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "chi_siamo_testo";
  ALTER TABLE "home_locales" DROP COLUMN "chi_siamo_pulsante";
  ALTER TABLE "home_locales" DROP COLUMN "installazioni_sfondo";
  ALTER TABLE "home_locales" DROP COLUMN "installazioni_testo_sinistra";
  ALTER TABLE "home_locales" DROP COLUMN "installazioni_testo_destra";
  ALTER TABLE "home_locales" DROP COLUMN "installazioni_pulsante";
  ALTER TABLE "home_locales" DROP COLUMN "contract_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "contract_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "catalogo_kicker";
  ALTER TABLE "home_locales" DROP COLUMN "catalogo_titolo";
  ALTER TABLE "home_locales" DROP COLUMN "catalogo_testo";
  ALTER TABLE "home_locales" DROP COLUMN "catalogo_pulsante";
  ALTER TABLE "home_locales" DROP COLUMN "catalogo_grazie";
  ALTER TABLE "_home_v_version_collezioni_tessere" DROP COLUMN "scritta";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_immagine_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_video_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_nota_video";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_link1";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_link2";
  ALTER TABLE "_home_v" DROP COLUMN "version_chi_siamo_sfondo";
  ALTER TABLE "_home_v" DROP COLUMN "version_chi_siamo_immagine_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_chi_siamo_link";
  ALTER TABLE "_home_v" DROP COLUMN "version_installazioni_link";
  ALTER TABLE "_home_v" DROP COLUMN "version_contract_immagine_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_catalogo_immagine_id";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_hero_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_hero_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_hero_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_hero_link1_etichetta";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_hero_link2_etichetta";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_chi_siamo_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_chi_siamo_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_chi_siamo_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_chi_siamo_pulsante";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_installazioni_sfondo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_installazioni_testo_sinistra";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_installazioni_testo_destra";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_installazioni_pulsante";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_contract_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_contract_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_catalogo_kicker";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_catalogo_titolo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_catalogo_testo";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_catalogo_pulsante";
  ALTER TABLE "_home_v_locales" DROP COLUMN "version_catalogo_grazie";
  ALTER TABLE "impostazioni" DROP COLUMN "barra_link";
  ALTER TABLE "impostazioni_locales" DROP COLUMN "barra_testo";
  ALTER TABLE "impostazioni_locales" DROP COLUMN "barra_link_etichetta";
  DROP TYPE "public"."enum_home_installazioni_voci_categoria";
  DROP TYPE "public"."enum_home_installazioni_voci_formato";
  DROP TYPE "public"."enum_home_collezioni_tessere_scritta";
  DROP TYPE "public"."enum__home_v_version_installazioni_voci_categoria";
  DROP TYPE "public"."enum__home_v_version_installazioni_voci_formato";
  DROP TYPE "public"."enum__home_v_version_collezioni_tessere_scritta";`)
}
