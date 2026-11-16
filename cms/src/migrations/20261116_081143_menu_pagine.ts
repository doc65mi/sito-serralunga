import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pagine_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagine_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagine_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pagine_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__pagine_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__pagine_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pagine_v_published_locale" AS ENUM('it', 'en');
  CREATE TABLE "pagine_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagine_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagine_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagine_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagine_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagine_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagine_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagine_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"immagine_id" integer,
  	"modulo_mostra" boolean,
  	"mostra_contatti" boolean,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pagine_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pagine_locales" (
  	"titolo" varchar,
  	"kicker" varchar,
  	"intro" varchar,
  	"modulo_titolo" varchar,
  	"modulo_pulsante" varchar,
  	"modulo_grazie" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagine_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_pagine_v_version_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pagine_v_version_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagine_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__pagine_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__pagine_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__pagine_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__pagine_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagine_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagine_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagine_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__pagine_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_immagine_id" integer,
  	"version_modulo_mostra" boolean,
  	"version_mostra_contatti" boolean,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pagine_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pagine_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pagine_v_locales" (
  	"version_titolo" varchar,
  	"version_kicker" varchar,
  	"version_intro" varchar,
  	"version_modulo_titolo" varchar,
  	"version_modulo_pulsante" varchar,
  	"version_modulo_grazie" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagine_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "impostazioni_menu_superiore" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "impostazioni_menu_superiore_locales" (
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni_menu_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "impostazioni_menu_voci_locales" (
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pagine_id" integer;
  ALTER TABLE "pagine_paragrafi" ADD CONSTRAINT "pagine_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_paragrafi_locales" ADD CONSTRAINT "pagine_paragrafi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_testo" ADD CONSTRAINT "pagine_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_testo_locales" ADD CONSTRAINT "pagine_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_immagine_testo" ADD CONSTRAINT "pagine_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_blocks_immagine_testo" ADD CONSTRAINT "pagine_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_immagine_testo_locales" ADD CONSTRAINT "pagine_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_slider" ADD CONSTRAINT "pagine_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_slider_locales" ADD CONSTRAINT "pagine_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti_voci" ADD CONSTRAINT "pagine_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti_voci" ADD CONSTRAINT "pagine_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti_voci" ADD CONSTRAINT "pagine_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagine_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti" ADD CONSTRAINT "pagine_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_prodotti_locales" ADD CONSTRAINT "pagine_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_citazione" ADD CONSTRAINT "pagine_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_citazione_locales" ADD CONSTRAINT "pagine_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_domande_voci" ADD CONSTRAINT "pagine_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_domande_voci_locales" ADD CONSTRAINT "pagine_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_domande" ADD CONSTRAINT "pagine_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_domande_locales" ADD CONSTRAINT "pagine_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_invito" ADD CONSTRAINT "pagine_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_invito_locales" ADD CONSTRAINT "pagine_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine" ADD CONSTRAINT "pagine_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine" ADD CONSTRAINT "pagine_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_locales" ADD CONSTRAINT "pagine_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_rels" ADD CONSTRAINT "pagine_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_rels" ADD CONSTRAINT "pagine_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_version_paragrafi" ADD CONSTRAINT "_pagine_v_version_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_version_paragrafi_locales" ADD CONSTRAINT "_pagine_v_version_paragrafi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_version_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_testo" ADD CONSTRAINT "_pagine_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_testo_locales" ADD CONSTRAINT "_pagine_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_immagine_testo" ADD CONSTRAINT "_pagine_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_immagine_testo" ADD CONSTRAINT "_pagine_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_pagine_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_slider" ADD CONSTRAINT "_pagine_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_slider_locales" ADD CONSTRAINT "_pagine_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagine_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagine_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagine_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_pagine_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti" ADD CONSTRAINT "_pagine_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_prodotti_locales" ADD CONSTRAINT "_pagine_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_citazione" ADD CONSTRAINT "_pagine_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_citazione_locales" ADD CONSTRAINT "_pagine_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_domande_voci" ADD CONSTRAINT "_pagine_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_domande_voci_locales" ADD CONSTRAINT "_pagine_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_domande" ADD CONSTRAINT "_pagine_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_domande_locales" ADD CONSTRAINT "_pagine_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_invito" ADD CONSTRAINT "_pagine_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_invito_locales" ADD CONSTRAINT "_pagine_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v" ADD CONSTRAINT "_pagine_v_parent_id_pagine_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagine"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v" ADD CONSTRAINT "_pagine_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v" ADD CONSTRAINT "_pagine_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagine_v_locales" ADD CONSTRAINT "_pagine_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_rels" ADD CONSTRAINT "_pagine_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_rels" ADD CONSTRAINT "_pagine_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu_superiore" ADD CONSTRAINT "impostazioni_menu_superiore_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu_superiore_locales" ADD CONSTRAINT "impostazioni_menu_superiore_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_menu_superiore"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu_voci" ADD CONSTRAINT "impostazioni_menu_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu_voci_locales" ADD CONSTRAINT "impostazioni_menu_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_menu_voci"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pagine_paragrafi_order_idx" ON "pagine_paragrafi" USING btree ("_order");
  CREATE INDEX "pagine_paragrafi_parent_id_idx" ON "pagine_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_paragrafi_locales_locale_parent_id_unique" ON "pagine_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_paragrafi_locales_parent_id_idx" ON "pagine_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_testo_order_idx" ON "pagine_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagine_blocks_testo_parent_id_idx" ON "pagine_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_testo_path_idx" ON "pagine_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_testo_locales_locale_parent_id_unique" ON "pagine_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_testo_locales_parent_id_idx" ON "pagine_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_immagine_testo_order_idx" ON "pagine_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagine_blocks_immagine_testo_parent_id_idx" ON "pagine_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_immagine_testo_path_idx" ON "pagine_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagine_blocks_immagine_testo_immagine_idx" ON "pagine_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagine_blocks_immagine_testo_locales_locale_parent_id_unique" ON "pagine_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_immagine_testo_locales_parent_id_idx" ON "pagine_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_slider_order_idx" ON "pagine_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagine_blocks_slider_parent_id_idx" ON "pagine_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_slider_path_idx" ON "pagine_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_slider_locales_locale_parent_id_unique" ON "pagine_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_slider_locales_parent_id_idx" ON "pagine_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_voci_order_idx" ON "pagine_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagine_blocks_prodotti_voci_parent_id_idx" ON "pagine_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_voci_prodotto_idx" ON "pagine_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagine_blocks_prodotti_voci_immagine_idx" ON "pagine_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagine_blocks_prodotti_voci_locales_locale_parent_id_unique" ON "pagine_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_voci_locales_parent_id_idx" ON "pagine_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_order_idx" ON "pagine_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagine_blocks_prodotti_parent_id_idx" ON "pagine_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_path_idx" ON "pagine_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_prodotti_locales_locale_parent_id_unique" ON "pagine_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_prodotti_locales_parent_id_idx" ON "pagine_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_citazione_order_idx" ON "pagine_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagine_blocks_citazione_parent_id_idx" ON "pagine_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_citazione_path_idx" ON "pagine_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_citazione_locales_locale_parent_id_unique" ON "pagine_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_citazione_locales_parent_id_idx" ON "pagine_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_domande_voci_order_idx" ON "pagine_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagine_blocks_domande_voci_parent_id_idx" ON "pagine_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_blocks_domande_voci_locales_locale_parent_id_unique" ON "pagine_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_domande_voci_locales_parent_id_idx" ON "pagine_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_domande_order_idx" ON "pagine_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagine_blocks_domande_parent_id_idx" ON "pagine_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_domande_path_idx" ON "pagine_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_domande_locales_locale_parent_id_unique" ON "pagine_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_domande_locales_parent_id_idx" ON "pagine_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_invito_order_idx" ON "pagine_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagine_blocks_invito_parent_id_idx" ON "pagine_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_invito_path_idx" ON "pagine_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_invito_locales_locale_parent_id_unique" ON "pagine_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_invito_locales_parent_id_idx" ON "pagine_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_slug_idx" ON "pagine" USING btree ("slug");
  CREATE INDEX "pagine_immagine_idx" ON "pagine" USING btree ("immagine_id");
  CREATE INDEX "pagine_seo_seo_immagine_idx" ON "pagine" USING btree ("seo_immagine_id");
  CREATE INDEX "pagine_updated_at_idx" ON "pagine" USING btree ("updated_at");
  CREATE INDEX "pagine_created_at_idx" ON "pagine" USING btree ("created_at");
  CREATE INDEX "pagine__status_idx" ON "pagine" USING btree ("_status");
  CREATE UNIQUE INDEX "pagine_locales_locale_parent_id_unique" ON "pagine_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_locales_parent_id_idx" ON "pagine_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_rels_order_idx" ON "pagine_rels" USING btree ("order");
  CREATE INDEX "pagine_rels_parent_idx" ON "pagine_rels" USING btree ("parent_id");
  CREATE INDEX "pagine_rels_path_idx" ON "pagine_rels" USING btree ("path");
  CREATE INDEX "pagine_rels_media_id_idx" ON "pagine_rels" USING btree ("media_id");
  CREATE INDEX "_pagine_v_version_paragrafi_order_idx" ON "_pagine_v_version_paragrafi" USING btree ("_order");
  CREATE INDEX "_pagine_v_version_paragrafi_parent_id_idx" ON "_pagine_v_version_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pagine_v_version_paragrafi_locales_locale_parent_id_unique" ON "_pagine_v_version_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_version_paragrafi_locales_parent_id_idx" ON "_pagine_v_version_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_testo_order_idx" ON "_pagine_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_testo_parent_id_idx" ON "_pagine_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_testo_path_idx" ON "_pagine_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_testo_locales_locale_parent_id_unique" ON "_pagine_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_testo_locales_parent_id_idx" ON "_pagine_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_immagine_testo_order_idx" ON "_pagine_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_immagine_testo_parent_id_idx" ON "_pagine_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_immagine_testo_path_idx" ON "_pagine_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_pagine_v_blocks_immagine_testo_immagine_idx" ON "_pagine_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_pagine_v_blocks_immagine_testo_locales_locale_parent_id_uni" ON "_pagine_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_immagine_testo_locales_parent_id_idx" ON "_pagine_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_slider_order_idx" ON "_pagine_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_slider_parent_id_idx" ON "_pagine_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_slider_path_idx" ON "_pagine_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_slider_locales_locale_parent_id_unique" ON "_pagine_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_slider_locales_parent_id_idx" ON "_pagine_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_voci_order_idx" ON "_pagine_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_prodotti_voci_parent_id_idx" ON "_pagine_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_voci_prodotto_idx" ON "_pagine_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_voci_immagine_idx" ON "_pagine_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_pagine_v_blocks_prodotti_voci_locales_locale_parent_id_uniq" ON "_pagine_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_pagine_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_order_idx" ON "_pagine_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_prodotti_parent_id_idx" ON "_pagine_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_path_idx" ON "_pagine_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_pagine_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_prodotti_locales_parent_id_idx" ON "_pagine_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_citazione_order_idx" ON "_pagine_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_citazione_parent_id_idx" ON "_pagine_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_citazione_path_idx" ON "_pagine_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_citazione_locales_locale_parent_id_unique" ON "_pagine_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_citazione_locales_parent_id_idx" ON "_pagine_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_domande_voci_order_idx" ON "_pagine_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_domande_voci_parent_id_idx" ON "_pagine_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pagine_v_blocks_domande_voci_locales_locale_parent_id_uniqu" ON "_pagine_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_domande_voci_locales_parent_id_idx" ON "_pagine_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_domande_order_idx" ON "_pagine_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_domande_parent_id_idx" ON "_pagine_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_domande_path_idx" ON "_pagine_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_domande_locales_locale_parent_id_unique" ON "_pagine_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_domande_locales_parent_id_idx" ON "_pagine_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_invito_order_idx" ON "_pagine_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_invito_parent_id_idx" ON "_pagine_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_invito_path_idx" ON "_pagine_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_invito_locales_locale_parent_id_unique" ON "_pagine_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_invito_locales_parent_id_idx" ON "_pagine_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_parent_idx" ON "_pagine_v" USING btree ("parent_id");
  CREATE INDEX "_pagine_v_version_version_slug_idx" ON "_pagine_v" USING btree ("version_slug");
  CREATE INDEX "_pagine_v_version_version_immagine_idx" ON "_pagine_v" USING btree ("version_immagine_id");
  CREATE INDEX "_pagine_v_version_seo_version_seo_immagine_idx" ON "_pagine_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_pagine_v_version_version_updated_at_idx" ON "_pagine_v" USING btree ("version_updated_at");
  CREATE INDEX "_pagine_v_version_version_created_at_idx" ON "_pagine_v" USING btree ("version_created_at");
  CREATE INDEX "_pagine_v_version_version__status_idx" ON "_pagine_v" USING btree ("version__status");
  CREATE INDEX "_pagine_v_created_at_idx" ON "_pagine_v" USING btree ("created_at");
  CREATE INDEX "_pagine_v_updated_at_idx" ON "_pagine_v" USING btree ("updated_at");
  CREATE INDEX "_pagine_v_snapshot_idx" ON "_pagine_v" USING btree ("snapshot");
  CREATE INDEX "_pagine_v_published_locale_idx" ON "_pagine_v" USING btree ("published_locale");
  CREATE INDEX "_pagine_v_latest_idx" ON "_pagine_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pagine_v_locales_locale_parent_id_unique" ON "_pagine_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_locales_parent_id_idx" ON "_pagine_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_rels_order_idx" ON "_pagine_v_rels" USING btree ("order");
  CREATE INDEX "_pagine_v_rels_parent_idx" ON "_pagine_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pagine_v_rels_path_idx" ON "_pagine_v_rels" USING btree ("path");
  CREATE INDEX "_pagine_v_rels_media_id_idx" ON "_pagine_v_rels" USING btree ("media_id");
  CREATE INDEX "impostazioni_menu_superiore_order_idx" ON "impostazioni_menu_superiore" USING btree ("_order");
  CREATE INDEX "impostazioni_menu_superiore_parent_id_idx" ON "impostazioni_menu_superiore" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_menu_superiore_locales_locale_parent_id_unique" ON "impostazioni_menu_superiore_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_menu_superiore_locales_parent_id_idx" ON "impostazioni_menu_superiore_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_menu_voci_order_idx" ON "impostazioni_menu_voci" USING btree ("_order");
  CREATE INDEX "impostazioni_menu_voci_parent_id_idx" ON "impostazioni_menu_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_menu_voci_locales_locale_parent_id_unique" ON "impostazioni_menu_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_menu_voci_locales_parent_id_idx" ON "impostazioni_menu_voci_locales" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pagine_fk" FOREIGN KEY ("pagine_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pagine_id_idx" ON "payload_locked_documents_rels" USING btree ("pagine_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pagine_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_paragrafi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_version_paragrafi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_version_paragrafi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impostazioni_menu_superiore" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impostazioni_menu_superiore_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impostazioni_menu_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impostazioni_menu_voci_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pagine_paragrafi" CASCADE;
  DROP TABLE "pagine_paragrafi_locales" CASCADE;
  DROP TABLE "pagine_blocks_testo" CASCADE;
  DROP TABLE "pagine_blocks_testo_locales" CASCADE;
  DROP TABLE "pagine_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagine_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagine_blocks_slider" CASCADE;
  DROP TABLE "pagine_blocks_slider_locales" CASCADE;
  DROP TABLE "pagine_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagine_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagine_blocks_prodotti" CASCADE;
  DROP TABLE "pagine_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagine_blocks_citazione" CASCADE;
  DROP TABLE "pagine_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagine_blocks_domande_voci" CASCADE;
  DROP TABLE "pagine_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagine_blocks_domande" CASCADE;
  DROP TABLE "pagine_blocks_domande_locales" CASCADE;
  DROP TABLE "pagine_blocks_invito" CASCADE;
  DROP TABLE "pagine_blocks_invito_locales" CASCADE;
  DROP TABLE "pagine" CASCADE;
  DROP TABLE "pagine_locales" CASCADE;
  DROP TABLE "pagine_rels" CASCADE;
  DROP TABLE "_pagine_v_version_paragrafi" CASCADE;
  DROP TABLE "_pagine_v_version_paragrafi_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_testo" CASCADE;
  DROP TABLE "_pagine_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_pagine_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_slider" CASCADE;
  DROP TABLE "_pagine_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_pagine_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_prodotti" CASCADE;
  DROP TABLE "_pagine_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_citazione" CASCADE;
  DROP TABLE "_pagine_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_pagine_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_domande" CASCADE;
  DROP TABLE "_pagine_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_invito" CASCADE;
  DROP TABLE "_pagine_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_pagine_v" CASCADE;
  DROP TABLE "_pagine_v_locales" CASCADE;
  DROP TABLE "_pagine_v_rels" CASCADE;
  DROP TABLE "impostazioni_menu_superiore" CASCADE;
  DROP TABLE "impostazioni_menu_superiore_locales" CASCADE;
  DROP TABLE "impostazioni_menu_voci" CASCADE;
  DROP TABLE "impostazioni_menu_voci_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pagine_fk";
  
  DROP INDEX "payload_locked_documents_rels_pagine_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pagine_id";
  DROP TYPE "public"."enum_pagine_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagine_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_slider_formato";
  DROP TYPE "public"."enum_pagine_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagine_status";
  DROP TYPE "public"."enum__pagine_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__pagine_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_slider_formato";
  DROP TYPE "public"."enum__pagine_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__pagine_v_version_status";
  DROP TYPE "public"."enum__pagine_v_published_locale";`)
}
