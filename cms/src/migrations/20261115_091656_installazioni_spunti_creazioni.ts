import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_case_history_categoria" AS ENUM('hotel', 'risto', 'spa', 'resid', 'urbano');
  CREATE TYPE "public"."enum__case_history_v_version_categoria" AS ENUM('hotel', 'risto', 'spa', 'resid', 'urbano');
  CREATE TYPE "public"."enum_spunti_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__spunti_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__spunti_v_published_locale" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_pagina_installazioni_sezioni_categoria" AS ENUM('hotel', 'risto', 'spa', 'resid', 'urbano');
  CREATE TABLE "spunti_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "spunti_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "spunti_galleria_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"immagine_id" integer,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_spunti_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "spunti_locales" (
  	"titolo" varchar,
  	"ambito" varchar,
  	"estratto" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "spunti_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"designer_id" integer
  );
  
  CREATE TABLE "_spunti_v_version_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spunti_v_version_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spunti_v_version_galleria_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__spunti_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__spunti_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_spunti_v_locales" (
  	"version_titolo" varchar,
  	"version_ambito" varchar,
  	"version_estratto" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"designer_id" integer
  );
  
  CREATE TABLE "designer_creazioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"ambientata" boolean DEFAULT false,
  	"fonte" varchar
  );
  
  CREATE TABLE "designer_creazioni_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_designer_v_version_creazioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"ambientata" boolean DEFAULT false,
  	"fonte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_version_creazioni_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_sezioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"categoria" "enum_pagina_installazioni_sezioni_categoria" NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_installazioni_sezioni_locales" (
  	"kicker" varchar,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_installazioni_locales" (
  	"kicker" varchar DEFAULT 'Installazioni',
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"nota_vuota" varchar DEFAULT 'Case history in preparazione.',
  	"cta_kicker" varchar,
  	"cta_titolo" varchar,
  	"cta_testo" varchar,
  	"cta_pulsante" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_spunti" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_spunti_locales" (
  	"kicker" varchar DEFAULT 'Spunti e idee',
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"nota_vuota" varchar,
  	"cta_kicker" varchar,
  	"cta_titolo" varchar,
  	"cta_testo" varchar,
  	"cta_pulsante" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "case_history" ADD COLUMN "categoria" "enum_case_history_categoria";
  ALTER TABLE "_case_history_v" ADD COLUMN "version_categoria" "enum__case_history_v_version_categoria";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "spunti_id" integer;
  ALTER TABLE "spunti_paragrafi" ADD CONSTRAINT "spunti_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_paragrafi_locales" ADD CONSTRAINT "spunti_paragrafi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_galleria" ADD CONSTRAINT "spunti_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti_galleria" ADD CONSTRAINT "spunti_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_galleria_locales" ADD CONSTRAINT "spunti_galleria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_galleria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti" ADD CONSTRAINT "spunti_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti" ADD CONSTRAINT "spunti_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti_locales" ADD CONSTRAINT "spunti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_rels" ADD CONSTRAINT "spunti_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_rels" ADD CONSTRAINT "spunti_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_rels" ADD CONSTRAINT "spunti_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_version_paragrafi" ADD CONSTRAINT "_spunti_v_version_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_version_paragrafi_locales" ADD CONSTRAINT "_spunti_v_version_paragrafi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_version_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_version_galleria" ADD CONSTRAINT "_spunti_v_version_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v_version_galleria" ADD CONSTRAINT "_spunti_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_version_galleria_locales" ADD CONSTRAINT "_spunti_v_version_galleria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_version_galleria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v" ADD CONSTRAINT "_spunti_v_parent_id_spunti_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spunti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v" ADD CONSTRAINT "_spunti_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v" ADD CONSTRAINT "_spunti_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v_locales" ADD CONSTRAINT "_spunti_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_rels" ADD CONSTRAINT "_spunti_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_rels" ADD CONSTRAINT "_spunti_v_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_rels" ADD CONSTRAINT "_spunti_v_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_creazioni" ADD CONSTRAINT "designer_creazioni_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer_creazioni" ADD CONSTRAINT "designer_creazioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_creazioni_locales" ADD CONSTRAINT "designer_creazioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_creazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_creazioni" ADD CONSTRAINT "_designer_v_version_creazioni_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v_version_creazioni" ADD CONSTRAINT "_designer_v_version_creazioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_creazioni_locales" ADD CONSTRAINT "_designer_v_version_creazioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_version_creazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_sezioni" ADD CONSTRAINT "pagina_installazioni_sezioni_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_sezioni" ADD CONSTRAINT "pagina_installazioni_sezioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_sezioni_locales" ADD CONSTRAINT "pagina_installazioni_sezioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_sezioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni" ADD CONSTRAINT "pagina_installazioni_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni" ADD CONSTRAINT "pagina_installazioni_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_locales" ADD CONSTRAINT "pagina_installazioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti" ADD CONSTRAINT "pagina_spunti_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_spunti_locales" ADD CONSTRAINT "pagina_spunti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "spunti_paragrafi_order_idx" ON "spunti_paragrafi" USING btree ("_order");
  CREATE INDEX "spunti_paragrafi_parent_id_idx" ON "spunti_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "spunti_paragrafi_locales_locale_parent_id_unique" ON "spunti_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_paragrafi_locales_parent_id_idx" ON "spunti_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_galleria_order_idx" ON "spunti_galleria" USING btree ("_order");
  CREATE INDEX "spunti_galleria_parent_id_idx" ON "spunti_galleria" USING btree ("_parent_id");
  CREATE INDEX "spunti_galleria_immagine_idx" ON "spunti_galleria" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "spunti_galleria_locales_locale_parent_id_unique" ON "spunti_galleria_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_galleria_locales_parent_id_idx" ON "spunti_galleria_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "spunti_slug_idx" ON "spunti" USING btree ("slug");
  CREATE INDEX "spunti_immagine_idx" ON "spunti" USING btree ("immagine_id");
  CREATE INDEX "spunti_seo_seo_immagine_idx" ON "spunti" USING btree ("seo_immagine_id");
  CREATE INDEX "spunti_updated_at_idx" ON "spunti" USING btree ("updated_at");
  CREATE INDEX "spunti_created_at_idx" ON "spunti" USING btree ("created_at");
  CREATE INDEX "spunti__status_idx" ON "spunti" USING btree ("_status");
  CREATE UNIQUE INDEX "spunti_locales_locale_parent_id_unique" ON "spunti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_locales_parent_id_idx" ON "spunti_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_rels_order_idx" ON "spunti_rels" USING btree ("order");
  CREATE INDEX "spunti_rels_parent_idx" ON "spunti_rels" USING btree ("parent_id");
  CREATE INDEX "spunti_rels_path_idx" ON "spunti_rels" USING btree ("path");
  CREATE INDEX "spunti_rels_prodotti_id_idx" ON "spunti_rels" USING btree ("prodotti_id");
  CREATE INDEX "spunti_rels_designer_id_idx" ON "spunti_rels" USING btree ("designer_id");
  CREATE INDEX "_spunti_v_version_paragrafi_order_idx" ON "_spunti_v_version_paragrafi" USING btree ("_order");
  CREATE INDEX "_spunti_v_version_paragrafi_parent_id_idx" ON "_spunti_v_version_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_spunti_v_version_paragrafi_locales_locale_parent_id_unique" ON "_spunti_v_version_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_version_paragrafi_locales_parent_id_idx" ON "_spunti_v_version_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_version_galleria_order_idx" ON "_spunti_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_spunti_v_version_galleria_parent_id_idx" ON "_spunti_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_version_galleria_immagine_idx" ON "_spunti_v_version_galleria" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_spunti_v_version_galleria_locales_locale_parent_id_unique" ON "_spunti_v_version_galleria_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_version_galleria_locales_parent_id_idx" ON "_spunti_v_version_galleria_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_parent_idx" ON "_spunti_v" USING btree ("parent_id");
  CREATE INDEX "_spunti_v_version_version_slug_idx" ON "_spunti_v" USING btree ("version_slug");
  CREATE INDEX "_spunti_v_version_version_immagine_idx" ON "_spunti_v" USING btree ("version_immagine_id");
  CREATE INDEX "_spunti_v_version_seo_version_seo_immagine_idx" ON "_spunti_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_spunti_v_version_version_updated_at_idx" ON "_spunti_v" USING btree ("version_updated_at");
  CREATE INDEX "_spunti_v_version_version_created_at_idx" ON "_spunti_v" USING btree ("version_created_at");
  CREATE INDEX "_spunti_v_version_version__status_idx" ON "_spunti_v" USING btree ("version__status");
  CREATE INDEX "_spunti_v_created_at_idx" ON "_spunti_v" USING btree ("created_at");
  CREATE INDEX "_spunti_v_updated_at_idx" ON "_spunti_v" USING btree ("updated_at");
  CREATE INDEX "_spunti_v_snapshot_idx" ON "_spunti_v" USING btree ("snapshot");
  CREATE INDEX "_spunti_v_published_locale_idx" ON "_spunti_v" USING btree ("published_locale");
  CREATE INDEX "_spunti_v_latest_idx" ON "_spunti_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_spunti_v_locales_locale_parent_id_unique" ON "_spunti_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_locales_parent_id_idx" ON "_spunti_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_rels_order_idx" ON "_spunti_v_rels" USING btree ("order");
  CREATE INDEX "_spunti_v_rels_parent_idx" ON "_spunti_v_rels" USING btree ("parent_id");
  CREATE INDEX "_spunti_v_rels_path_idx" ON "_spunti_v_rels" USING btree ("path");
  CREATE INDEX "_spunti_v_rels_prodotti_id_idx" ON "_spunti_v_rels" USING btree ("prodotti_id");
  CREATE INDEX "_spunti_v_rels_designer_id_idx" ON "_spunti_v_rels" USING btree ("designer_id");
  CREATE INDEX "designer_creazioni_order_idx" ON "designer_creazioni" USING btree ("_order");
  CREATE INDEX "designer_creazioni_parent_id_idx" ON "designer_creazioni" USING btree ("_parent_id");
  CREATE INDEX "designer_creazioni_immagine_idx" ON "designer_creazioni" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "designer_creazioni_locales_locale_parent_id_unique" ON "designer_creazioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_creazioni_locales_parent_id_idx" ON "designer_creazioni_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_version_creazioni_order_idx" ON "_designer_v_version_creazioni" USING btree ("_order");
  CREATE INDEX "_designer_v_version_creazioni_parent_id_idx" ON "_designer_v_version_creazioni" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_version_creazioni_immagine_idx" ON "_designer_v_version_creazioni" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_designer_v_version_creazioni_locales_locale_parent_id_uniqu" ON "_designer_v_version_creazioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_version_creazioni_locales_parent_id_idx" ON "_designer_v_version_creazioni_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_sezioni_order_idx" ON "pagina_installazioni_sezioni" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_sezioni_parent_id_idx" ON "pagina_installazioni_sezioni" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_sezioni_immagine_idx" ON "pagina_installazioni_sezioni" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_installazioni_sezioni_locales_locale_parent_id_unique" ON "pagina_installazioni_sezioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_sezioni_locales_parent_id_idx" ON "pagina_installazioni_sezioni_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_immagine_idx" ON "pagina_installazioni" USING btree ("immagine_id");
  CREATE INDEX "pagina_installazioni_seo_seo_immagine_idx" ON "pagina_installazioni" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_installazioni_locales_locale_parent_id_unique" ON "pagina_installazioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_locales_parent_id_idx" ON "pagina_installazioni_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_seo_seo_immagine_idx" ON "pagina_spunti" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_spunti_locales_locale_parent_id_unique" ON "pagina_spunti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_locales_parent_id_idx" ON "pagina_spunti_locales" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spunti_fk" FOREIGN KEY ("spunti_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_spunti_id_idx" ON "payload_locked_documents_rels" USING btree ("spunti_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "spunti_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_paragrafi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_galleria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_galleria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_version_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_version_paragrafi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_version_galleria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_version_galleria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_creazioni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_creazioni_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_version_creazioni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_version_creazioni_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_sezioni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_sezioni_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "spunti_paragrafi" CASCADE;
  DROP TABLE "spunti_paragrafi_locales" CASCADE;
  DROP TABLE "spunti_galleria" CASCADE;
  DROP TABLE "spunti_galleria_locales" CASCADE;
  DROP TABLE "spunti" CASCADE;
  DROP TABLE "spunti_locales" CASCADE;
  DROP TABLE "spunti_rels" CASCADE;
  DROP TABLE "_spunti_v_version_paragrafi" CASCADE;
  DROP TABLE "_spunti_v_version_paragrafi_locales" CASCADE;
  DROP TABLE "_spunti_v_version_galleria" CASCADE;
  DROP TABLE "_spunti_v_version_galleria_locales" CASCADE;
  DROP TABLE "_spunti_v" CASCADE;
  DROP TABLE "_spunti_v_locales" CASCADE;
  DROP TABLE "_spunti_v_rels" CASCADE;
  DROP TABLE "designer_creazioni" CASCADE;
  DROP TABLE "designer_creazioni_locales" CASCADE;
  DROP TABLE "_designer_v_version_creazioni" CASCADE;
  DROP TABLE "_designer_v_version_creazioni_locales" CASCADE;
  DROP TABLE "pagina_installazioni_sezioni" CASCADE;
  DROP TABLE "pagina_installazioni_sezioni_locales" CASCADE;
  DROP TABLE "pagina_installazioni" CASCADE;
  DROP TABLE "pagina_installazioni_locales" CASCADE;
  DROP TABLE "pagina_spunti" CASCADE;
  DROP TABLE "pagina_spunti_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_spunti_fk";
  
  DROP INDEX "payload_locked_documents_rels_spunti_id_idx";
  ALTER TABLE "case_history" DROP COLUMN "categoria";
  ALTER TABLE "_case_history_v" DROP COLUMN "version_categoria";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "spunti_id";
  DROP TYPE "public"."enum_case_history_categoria";
  DROP TYPE "public"."enum__case_history_v_version_categoria";
  DROP TYPE "public"."enum_spunti_status";
  DROP TYPE "public"."enum__spunti_v_version_status";
  DROP TYPE "public"."enum__spunti_v_published_locale";
  DROP TYPE "public"."enum_pagina_installazioni_sezioni_categoria";`)
}
