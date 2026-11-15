import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prodotti_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_prodotti_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_prodotti_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_prodotti_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__prodotti_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__prodotti_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_case_history_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_case_history_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__case_history_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__case_history_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_spunti_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_spunti_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__spunti_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__spunti_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_articoli_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_articoli_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_categoria" AS ENUM('storie', 'guide', 'designer', 'progetti');
  CREATE TYPE "public"."enum_articoli_origine" AS ENUM('redazione', 'esterna');
  CREATE TYPE "public"."enum_articoli_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articoli_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__articoli_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__articoli_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_version_categoria" AS ENUM('storie', 'guide', 'designer', 'progetti');
  CREATE TYPE "public"."enum__articoli_v_version_origine" AS ENUM('redazione', 'esterna');
  CREATE TYPE "public"."enum__articoli_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articoli_v_published_locale" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_designer_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_designer_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_designer_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__designer_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__designer_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_home_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_home_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_home_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__home_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__home_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_designer_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_designer_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_journal_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_journal_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pagina_journal_v_published_locale" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_ai_fornitore_testi" AS ENUM('openai', 'openrouter', 'gemini');
  CREATE TYPE "public"."enum_ai_fornitore_immagini" AS ENUM('openai', 'openrouter', 'gemini');
  CREATE TYPE "public"."enum_ai_lingue_articoli" AS ENUM('it', 'en');
  CREATE TABLE "prodotti_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_prodotti_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_prodotti_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_prodotti_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_prodotti_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_prodotti_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "prodotti_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_prodotti_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_prodotti_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_prodotti_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_prodotti_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__prodotti_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__prodotti_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__prodotti_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__prodotti_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__prodotti_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__prodotti_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__prodotti_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__prodotti_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__prodotti_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_case_history_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_case_history_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_case_history_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_case_history_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_case_history_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "case_history_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_case_history_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_case_history_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_case_history_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_case_history_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_case_history_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__case_history_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__case_history_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__case_history_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__case_history_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__case_history_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__case_history_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__case_history_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__case_history_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__case_history_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "spunti_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_spunti_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_spunti_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_spunti_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_spunti_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_spunti_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "spunti_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_spunti_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_spunti_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_spunti_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_spunti_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__spunti_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__spunti_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__spunti_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__spunti_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__spunti_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__spunti_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__spunti_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__spunti_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__spunti_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articoli_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articoli_domande_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_articoli_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_articoli_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_articoli_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_articoli_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_articoli_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "articoli_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_articoli_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_articoli_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_articoli_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_articoli_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articoli" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"categoria" "enum_articoli_categoria" DEFAULT 'storie',
  	"data" timestamp(3) with time zone,
  	"autore" varchar,
  	"origine" "enum_articoli_origine" DEFAULT 'redazione',
  	"immagine_id" integer,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articoli_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articoli_locales" (
  	"titolo" varchar,
  	"estratto" varchar,
  	"corpo" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articoli_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"designer_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_articoli_v_version_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articoli_v_version_domande_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__articoli_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__articoli_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__articoli_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__articoli_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__articoli_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__articoli_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__articoli_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__articoli_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__articoli_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_categoria" "enum__articoli_v_version_categoria" DEFAULT 'storie',
  	"version_data" timestamp(3) with time zone,
  	"version_autore" varchar,
  	"version_origine" "enum__articoli_v_version_origine" DEFAULT 'redazione',
  	"version_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articoli_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articoli_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_articoli_v_locales" (
  	"version_titolo" varchar,
  	"version_estratto" varchar,
  	"version_corpo" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articoli_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"designer_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "designer_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_designer_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_designer_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_designer_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_designer_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_designer_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "designer_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_designer_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_designer_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "designer_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_designer_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_designer_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_designer_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__designer_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__designer_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__designer_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__designer_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__designer_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__designer_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__designer_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__designer_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__designer_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "spazi_foto" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"chiave" varchar NOT NULL,
  	"documento" varchar,
  	"lightbox" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "spazi_foto_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "home_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_home_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_home_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_home_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_home_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_home_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "home_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_home_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_home_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_home_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_home_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_home_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__home_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__home_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__home_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__home_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__home_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__home_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__home_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__home_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__home_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_designer_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_designer_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_designer_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_designer_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_designer_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_designer_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_designer_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_designer_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_designer_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_designer_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_designer_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_installazioni_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_installazioni_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_installazioni_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_installazioni_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_installazioni_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_installazioni_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_installazioni_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_installazioni_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_installazioni_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_installazioni_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_installazioni_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_spunti_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_spunti_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_spunti_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_spunti_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_spunti_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_spunti_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_spunti_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_spunti_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_spunti_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_spunti_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_spunti_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_journal_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_journal_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_journal_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_journal_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_journal_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_journal_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_journal_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_journal_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_journal_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_journal_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_journal_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_immagine_id" integer,
  	"_status" "enum_pagina_journal_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_journal_locales" (
  	"kicker" varchar DEFAULT 'Journal',
  	"titolo" varchar,
  	"testo" varchar,
  	"nota_vuota" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_journal_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagina_journal_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__pagina_journal_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__pagina_journal_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__pagina_journal_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__pagina_journal_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagina_journal_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagina_journal_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__pagina_journal_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__pagina_journal_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_immagine_id" integer,
  	"version__status" "enum__pagina_journal_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pagina_journal_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pagina_journal_v_locales" (
  	"version_kicker" varchar DEFAULT 'Journal',
  	"version_titolo" varchar,
  	"version_testo" varchar,
  	"version_nota_vuota" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "ai" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"attiva" boolean DEFAULT false,
  	"fornitore_testi" "enum_ai_fornitore_testi" DEFAULT 'openai',
  	"fornitore_immagini" "enum_ai_fornitore_immagini" DEFAULT 'openai',
  	"direttive" varchar DEFAULT 'Pubblico: architetti, progettisti, contractor e buyer del settore hospitality (B2B).
  Tono professionale e competente, frasi concrete. Niente punti esclamativi, niente maiuscole per enfasi.
  I designer si citano sempre con nome e cognome.
  Non inventare dati, misure, premi, clienti, prezzi o tempi di consegna: usa solo ciò che è nel testo fornito.',
  	"chiave_openai" varchar,
  	"modello_openai" varchar DEFAULT 'gpt-4o-mini',
  	"modello_immagini_openai" varchar DEFAULT 'gpt-image-1',
  	"chiave_openrouter" varchar,
  	"modello_openrouter" varchar DEFAULT 'openai/gpt-4o-mini',
  	"modello_immagini_openrouter" varchar DEFAULT 'google/gemini-2.5-flash-image',
  	"chiave_gemini" varchar,
  	"modello_gemini" varchar DEFAULT 'gemini-2.5-flash',
  	"modello_immagini_gemini" varchar DEFAULT 'gemini-2.5-flash-image',
  	"articoli_attivi" boolean DEFAULT false,
  	"token_articoli" varchar,
  	"lingue_articoli" "enum_ai_lingue_articoli" DEFAULT 'it',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "prodotti_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_prodotti_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "spunti_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_spunti_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articoli_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "spazi_foto_id" integer;
  ALTER TABLE "prodotti_blocks_testo" ADD CONSTRAINT "prodotti_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_testo_locales" ADD CONSTRAINT "prodotti_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_immagine_testo" ADD CONSTRAINT "prodotti_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_immagine_testo" ADD CONSTRAINT "prodotti_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_immagine_testo_locales" ADD CONSTRAINT "prodotti_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_slider" ADD CONSTRAINT "prodotti_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_slider_locales" ADD CONSTRAINT "prodotti_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti_voci" ADD CONSTRAINT "prodotti_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti_voci" ADD CONSTRAINT "prodotti_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti_voci" ADD CONSTRAINT "prodotti_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti_voci_locales" ADD CONSTRAINT "prodotti_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti" ADD CONSTRAINT "prodotti_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_prodotti_locales" ADD CONSTRAINT "prodotti_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_citazione" ADD CONSTRAINT "prodotti_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_citazione_locales" ADD CONSTRAINT "prodotti_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_domande_voci" ADD CONSTRAINT "prodotti_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_domande_voci_locales" ADD CONSTRAINT "prodotti_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_domande" ADD CONSTRAINT "prodotti_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_domande_locales" ADD CONSTRAINT "prodotti_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_invito" ADD CONSTRAINT "prodotti_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_invito_locales" ADD CONSTRAINT "prodotti_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_testo" ADD CONSTRAINT "_prodotti_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_testo_locales" ADD CONSTRAINT "_prodotti_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_immagine_testo" ADD CONSTRAINT "_prodotti_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_immagine_testo" ADD CONSTRAINT "_prodotti_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_prodotti_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_slider" ADD CONSTRAINT "_prodotti_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_slider_locales" ADD CONSTRAINT "_prodotti_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_prodotti_locales" ADD CONSTRAINT "_prodotti_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_citazione" ADD CONSTRAINT "_prodotti_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_citazione_locales" ADD CONSTRAINT "_prodotti_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_domande_voci" ADD CONSTRAINT "_prodotti_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_domande_voci_locales" ADD CONSTRAINT "_prodotti_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_domande" ADD CONSTRAINT "_prodotti_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_domande_locales" ADD CONSTRAINT "_prodotti_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_invito" ADD CONSTRAINT "_prodotti_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_invito_locales" ADD CONSTRAINT "_prodotti_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_testo" ADD CONSTRAINT "case_history_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_testo_locales" ADD CONSTRAINT "case_history_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_immagine_testo" ADD CONSTRAINT "case_history_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_blocks_immagine_testo" ADD CONSTRAINT "case_history_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_immagine_testo_locales" ADD CONSTRAINT "case_history_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_slider" ADD CONSTRAINT "case_history_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_slider_locales" ADD CONSTRAINT "case_history_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti_voci" ADD CONSTRAINT "case_history_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti_voci" ADD CONSTRAINT "case_history_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti_voci" ADD CONSTRAINT "case_history_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti_voci_locales" ADD CONSTRAINT "case_history_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti" ADD CONSTRAINT "case_history_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_prodotti_locales" ADD CONSTRAINT "case_history_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_citazione" ADD CONSTRAINT "case_history_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_citazione_locales" ADD CONSTRAINT "case_history_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_domande_voci" ADD CONSTRAINT "case_history_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_domande_voci_locales" ADD CONSTRAINT "case_history_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_domande" ADD CONSTRAINT "case_history_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_domande_locales" ADD CONSTRAINT "case_history_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_invito" ADD CONSTRAINT "case_history_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_invito_locales" ADD CONSTRAINT "case_history_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_rels" ADD CONSTRAINT "case_history_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_rels" ADD CONSTRAINT "case_history_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_testo" ADD CONSTRAINT "_case_history_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_testo_locales" ADD CONSTRAINT "_case_history_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_immagine_testo" ADD CONSTRAINT "_case_history_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_immagine_testo" ADD CONSTRAINT "_case_history_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_case_history_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_slider" ADD CONSTRAINT "_case_history_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_slider_locales" ADD CONSTRAINT "_case_history_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci" ADD CONSTRAINT "_case_history_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci" ADD CONSTRAINT "_case_history_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci" ADD CONSTRAINT "_case_history_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_case_history_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti" ADD CONSTRAINT "_case_history_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_prodotti_locales" ADD CONSTRAINT "_case_history_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_citazione" ADD CONSTRAINT "_case_history_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_citazione_locales" ADD CONSTRAINT "_case_history_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_domande_voci" ADD CONSTRAINT "_case_history_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_domande_voci_locales" ADD CONSTRAINT "_case_history_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_domande" ADD CONSTRAINT "_case_history_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_domande_locales" ADD CONSTRAINT "_case_history_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_invito" ADD CONSTRAINT "_case_history_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_invito_locales" ADD CONSTRAINT "_case_history_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_rels" ADD CONSTRAINT "_case_history_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_rels" ADD CONSTRAINT "_case_history_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_testo" ADD CONSTRAINT "spunti_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_testo_locales" ADD CONSTRAINT "spunti_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_immagine_testo" ADD CONSTRAINT "spunti_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti_blocks_immagine_testo" ADD CONSTRAINT "spunti_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_immagine_testo_locales" ADD CONSTRAINT "spunti_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_slider" ADD CONSTRAINT "spunti_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_slider_locales" ADD CONSTRAINT "spunti_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti_voci" ADD CONSTRAINT "spunti_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti_voci" ADD CONSTRAINT "spunti_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti_voci" ADD CONSTRAINT "spunti_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti_voci_locales" ADD CONSTRAINT "spunti_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti" ADD CONSTRAINT "spunti_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_prodotti_locales" ADD CONSTRAINT "spunti_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_citazione" ADD CONSTRAINT "spunti_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_citazione_locales" ADD CONSTRAINT "spunti_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_domande_voci" ADD CONSTRAINT "spunti_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_domande_voci_locales" ADD CONSTRAINT "spunti_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_domande" ADD CONSTRAINT "spunti_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_domande_locales" ADD CONSTRAINT "spunti_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_invito" ADD CONSTRAINT "spunti_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_invito_locales" ADD CONSTRAINT "spunti_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_testo" ADD CONSTRAINT "_spunti_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_testo_locales" ADD CONSTRAINT "_spunti_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_immagine_testo" ADD CONSTRAINT "_spunti_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_immagine_testo" ADD CONSTRAINT "_spunti_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_spunti_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_slider" ADD CONSTRAINT "_spunti_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_slider_locales" ADD CONSTRAINT "_spunti_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci" ADD CONSTRAINT "_spunti_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci" ADD CONSTRAINT "_spunti_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci" ADD CONSTRAINT "_spunti_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_spunti_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti" ADD CONSTRAINT "_spunti_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_prodotti_locales" ADD CONSTRAINT "_spunti_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_citazione" ADD CONSTRAINT "_spunti_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_citazione_locales" ADD CONSTRAINT "_spunti_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_domande_voci" ADD CONSTRAINT "_spunti_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_domande_voci_locales" ADD CONSTRAINT "_spunti_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_domande" ADD CONSTRAINT "_spunti_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_domande_locales" ADD CONSTRAINT "_spunti_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_invito" ADD CONSTRAINT "_spunti_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_invito_locales" ADD CONSTRAINT "_spunti_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_domande" ADD CONSTRAINT "articoli_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_domande_locales" ADD CONSTRAINT "articoli_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_testo" ADD CONSTRAINT "articoli_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_testo_locales" ADD CONSTRAINT "articoli_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_immagine_testo" ADD CONSTRAINT "articoli_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articoli_blocks_immagine_testo" ADD CONSTRAINT "articoli_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_immagine_testo_locales" ADD CONSTRAINT "articoli_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_slider" ADD CONSTRAINT "articoli_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_slider_locales" ADD CONSTRAINT "articoli_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti_voci" ADD CONSTRAINT "articoli_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti_voci" ADD CONSTRAINT "articoli_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti_voci" ADD CONSTRAINT "articoli_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti_voci_locales" ADD CONSTRAINT "articoli_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti" ADD CONSTRAINT "articoli_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_prodotti_locales" ADD CONSTRAINT "articoli_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_citazione" ADD CONSTRAINT "articoli_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_citazione_locales" ADD CONSTRAINT "articoli_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_domande_voci" ADD CONSTRAINT "articoli_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_domande_voci_locales" ADD CONSTRAINT "articoli_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_domande" ADD CONSTRAINT "articoli_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_domande_locales" ADD CONSTRAINT "articoli_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_invito" ADD CONSTRAINT "articoli_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_invito_locales" ADD CONSTRAINT "articoli_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli" ADD CONSTRAINT "articoli_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articoli" ADD CONSTRAINT "articoli_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articoli_locales" ADD CONSTRAINT "articoli_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_rels" ADD CONSTRAINT "articoli_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_rels" ADD CONSTRAINT "articoli_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_rels" ADD CONSTRAINT "articoli_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_rels" ADD CONSTRAINT "articoli_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_version_domande" ADD CONSTRAINT "_articoli_v_version_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_version_domande_locales" ADD CONSTRAINT "_articoli_v_version_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_version_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_testo" ADD CONSTRAINT "_articoli_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_testo_locales" ADD CONSTRAINT "_articoli_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_immagine_testo" ADD CONSTRAINT "_articoli_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_immagine_testo" ADD CONSTRAINT "_articoli_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_articoli_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_slider" ADD CONSTRAINT "_articoli_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_slider_locales" ADD CONSTRAINT "_articoli_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci" ADD CONSTRAINT "_articoli_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci" ADD CONSTRAINT "_articoli_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci" ADD CONSTRAINT "_articoli_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_articoli_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti" ADD CONSTRAINT "_articoli_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_prodotti_locales" ADD CONSTRAINT "_articoli_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_citazione" ADD CONSTRAINT "_articoli_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_citazione_locales" ADD CONSTRAINT "_articoli_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_domande_voci" ADD CONSTRAINT "_articoli_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_domande_voci_locales" ADD CONSTRAINT "_articoli_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_domande" ADD CONSTRAINT "_articoli_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_domande_locales" ADD CONSTRAINT "_articoli_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_invito" ADD CONSTRAINT "_articoli_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_invito_locales" ADD CONSTRAINT "_articoli_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v" ADD CONSTRAINT "_articoli_v_parent_id_articoli_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articoli"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v" ADD CONSTRAINT "_articoli_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v" ADD CONSTRAINT "_articoli_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articoli_v_locales" ADD CONSTRAINT "_articoli_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_rels" ADD CONSTRAINT "_articoli_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_rels" ADD CONSTRAINT "_articoli_v_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_rels" ADD CONSTRAINT "_articoli_v_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_rels" ADD CONSTRAINT "_articoli_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_testo" ADD CONSTRAINT "designer_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_testo_locales" ADD CONSTRAINT "designer_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_immagine_testo" ADD CONSTRAINT "designer_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer_blocks_immagine_testo" ADD CONSTRAINT "designer_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_immagine_testo_locales" ADD CONSTRAINT "designer_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_slider" ADD CONSTRAINT "designer_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_slider_locales" ADD CONSTRAINT "designer_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti_voci" ADD CONSTRAINT "designer_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti_voci" ADD CONSTRAINT "designer_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti_voci" ADD CONSTRAINT "designer_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti_voci_locales" ADD CONSTRAINT "designer_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti" ADD CONSTRAINT "designer_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_prodotti_locales" ADD CONSTRAINT "designer_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_citazione" ADD CONSTRAINT "designer_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_citazione_locales" ADD CONSTRAINT "designer_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_domande_voci" ADD CONSTRAINT "designer_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_domande_voci_locales" ADD CONSTRAINT "designer_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_domande" ADD CONSTRAINT "designer_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_domande_locales" ADD CONSTRAINT "designer_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_invito" ADD CONSTRAINT "designer_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_invito_locales" ADD CONSTRAINT "designer_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_rels" ADD CONSTRAINT "designer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_rels" ADD CONSTRAINT "designer_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_testo" ADD CONSTRAINT "_designer_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_testo_locales" ADD CONSTRAINT "_designer_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_immagine_testo" ADD CONSTRAINT "_designer_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_immagine_testo" ADD CONSTRAINT "_designer_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_designer_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_slider" ADD CONSTRAINT "_designer_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_slider_locales" ADD CONSTRAINT "_designer_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti_voci" ADD CONSTRAINT "_designer_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti_voci" ADD CONSTRAINT "_designer_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti_voci" ADD CONSTRAINT "_designer_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_designer_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti" ADD CONSTRAINT "_designer_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_prodotti_locales" ADD CONSTRAINT "_designer_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_citazione" ADD CONSTRAINT "_designer_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_citazione_locales" ADD CONSTRAINT "_designer_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_domande_voci" ADD CONSTRAINT "_designer_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_domande_voci_locales" ADD CONSTRAINT "_designer_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_domande" ADD CONSTRAINT "_designer_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_domande_locales" ADD CONSTRAINT "_designer_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_invito" ADD CONSTRAINT "_designer_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_invito_locales" ADD CONSTRAINT "_designer_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_rels" ADD CONSTRAINT "_designer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_rels" ADD CONSTRAINT "_designer_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spazi_foto_rels" ADD CONSTRAINT "spazi_foto_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spazi_foto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spazi_foto_rels" ADD CONSTRAINT "spazi_foto_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testo" ADD CONSTRAINT "home_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testo_locales" ADD CONSTRAINT "home_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_immagine_testo" ADD CONSTRAINT "home_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_immagine_testo" ADD CONSTRAINT "home_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_immagine_testo_locales" ADD CONSTRAINT "home_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_slider" ADD CONSTRAINT "home_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_slider_locales" ADD CONSTRAINT "home_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti_voci" ADD CONSTRAINT "home_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti_voci" ADD CONSTRAINT "home_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti_voci" ADD CONSTRAINT "home_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti_voci_locales" ADD CONSTRAINT "home_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti" ADD CONSTRAINT "home_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_prodotti_locales" ADD CONSTRAINT "home_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_citazione" ADD CONSTRAINT "home_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_citazione_locales" ADD CONSTRAINT "home_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_domande_voci" ADD CONSTRAINT "home_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_domande_voci_locales" ADD CONSTRAINT "home_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_domande" ADD CONSTRAINT "home_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_domande_locales" ADD CONSTRAINT "home_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_invito" ADD CONSTRAINT "home_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_invito_locales" ADD CONSTRAINT "home_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_testo" ADD CONSTRAINT "_home_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_testo_locales" ADD CONSTRAINT "_home_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_immagine_testo" ADD CONSTRAINT "_home_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_immagine_testo" ADD CONSTRAINT "_home_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_home_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_slider" ADD CONSTRAINT "_home_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_slider_locales" ADD CONSTRAINT "_home_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti_voci" ADD CONSTRAINT "_home_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti_voci" ADD CONSTRAINT "_home_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti_voci" ADD CONSTRAINT "_home_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_home_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti" ADD CONSTRAINT "_home_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_prodotti_locales" ADD CONSTRAINT "_home_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_citazione" ADD CONSTRAINT "_home_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_citazione_locales" ADD CONSTRAINT "_home_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_domande_voci" ADD CONSTRAINT "_home_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_domande_voci_locales" ADD CONSTRAINT "_home_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_domande" ADD CONSTRAINT "_home_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_domande_locales" ADD CONSTRAINT "_home_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_invito" ADD CONSTRAINT "_home_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_invito_locales" ADD CONSTRAINT "_home_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_testo" ADD CONSTRAINT "pagina_designer_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_testo_locales" ADD CONSTRAINT "pagina_designer_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_immagine_testo" ADD CONSTRAINT "pagina_designer_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_immagine_testo" ADD CONSTRAINT "pagina_designer_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_designer_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_slider" ADD CONSTRAINT "pagina_designer_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_slider_locales" ADD CONSTRAINT "pagina_designer_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci" ADD CONSTRAINT "pagina_designer_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci" ADD CONSTRAINT "pagina_designer_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci" ADD CONSTRAINT "pagina_designer_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_designer_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti" ADD CONSTRAINT "pagina_designer_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_prodotti_locales" ADD CONSTRAINT "pagina_designer_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_citazione" ADD CONSTRAINT "pagina_designer_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_citazione_locales" ADD CONSTRAINT "pagina_designer_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_domande_voci" ADD CONSTRAINT "pagina_designer_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_designer_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_domande" ADD CONSTRAINT "pagina_designer_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_domande_locales" ADD CONSTRAINT "pagina_designer_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_invito" ADD CONSTRAINT "pagina_designer_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_invito_locales" ADD CONSTRAINT "pagina_designer_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_rels" ADD CONSTRAINT "pagina_designer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_rels" ADD CONSTRAINT "pagina_designer_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_testo" ADD CONSTRAINT "pagina_installazioni_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_testo_locales" ADD CONSTRAINT "pagina_installazioni_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_immagine_testo" ADD CONSTRAINT "pagina_installazioni_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_immagine_testo" ADD CONSTRAINT "pagina_installazioni_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_installazioni_blocks_immagine_testo_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_slider" ADD CONSTRAINT "pagina_installazioni_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_slider_locales" ADD CONSTRAINT "pagina_installazioni_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_voci_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_locales" ADD CONSTRAINT "pagina_installazioni_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_citazione" ADD CONSTRAINT "pagina_installazioni_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_citazione_locales" ADD CONSTRAINT "pagina_installazioni_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_domande_voci" ADD CONSTRAINT "pagina_installazioni_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_installazioni_blocks_domande_voci_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_domande" ADD CONSTRAINT "pagina_installazioni_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_domande_locales" ADD CONSTRAINT "pagina_installazioni_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_invito" ADD CONSTRAINT "pagina_installazioni_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_invito_locales" ADD CONSTRAINT "pagina_installazioni_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_rels" ADD CONSTRAINT "pagina_installazioni_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_rels" ADD CONSTRAINT "pagina_installazioni_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_testo" ADD CONSTRAINT "pagina_spunti_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_testo_locales" ADD CONSTRAINT "pagina_spunti_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_immagine_testo" ADD CONSTRAINT "pagina_spunti_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_immagine_testo" ADD CONSTRAINT "pagina_spunti_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_spunti_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_slider" ADD CONSTRAINT "pagina_spunti_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_slider_locales" ADD CONSTRAINT "pagina_spunti_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_prodotti_locales" ADD CONSTRAINT "pagina_spunti_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_citazione" ADD CONSTRAINT "pagina_spunti_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_citazione_locales" ADD CONSTRAINT "pagina_spunti_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_domande_voci" ADD CONSTRAINT "pagina_spunti_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_spunti_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_domande" ADD CONSTRAINT "pagina_spunti_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_domande_locales" ADD CONSTRAINT "pagina_spunti_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_invito" ADD CONSTRAINT "pagina_spunti_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_invito_locales" ADD CONSTRAINT "pagina_spunti_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_rels" ADD CONSTRAINT "pagina_spunti_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_rels" ADD CONSTRAINT "pagina_spunti_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_testo" ADD CONSTRAINT "pagina_journal_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_testo_locales" ADD CONSTRAINT "pagina_journal_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_immagine_testo" ADD CONSTRAINT "pagina_journal_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_immagine_testo" ADD CONSTRAINT "pagina_journal_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_journal_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_slider" ADD CONSTRAINT "pagina_journal_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_slider_locales" ADD CONSTRAINT "pagina_journal_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci" ADD CONSTRAINT "pagina_journal_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci" ADD CONSTRAINT "pagina_journal_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci" ADD CONSTRAINT "pagina_journal_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_journal_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti" ADD CONSTRAINT "pagina_journal_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_prodotti_locales" ADD CONSTRAINT "pagina_journal_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_citazione" ADD CONSTRAINT "pagina_journal_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_citazione_locales" ADD CONSTRAINT "pagina_journal_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_domande_voci" ADD CONSTRAINT "pagina_journal_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_journal_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_domande" ADD CONSTRAINT "pagina_journal_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_domande_locales" ADD CONSTRAINT "pagina_journal_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_invito" ADD CONSTRAINT "pagina_journal_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_invito_locales" ADD CONSTRAINT "pagina_journal_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal" ADD CONSTRAINT "pagina_journal_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_journal_locales" ADD CONSTRAINT "pagina_journal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_rels" ADD CONSTRAINT "pagina_journal_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_rels" ADD CONSTRAINT "pagina_journal_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_testo" ADD CONSTRAINT "_pagina_journal_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_testo_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_immagine_testo" ADD CONSTRAINT "_pagina_journal_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_immagine_testo" ADD CONSTRAINT "_pagina_journal_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_slider" ADD CONSTRAINT "_pagina_journal_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_slider_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_citazione" ADD CONSTRAINT "_pagina_journal_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_citazione_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_domande_voci" ADD CONSTRAINT "_pagina_journal_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_domande_voci_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_domande" ADD CONSTRAINT "_pagina_journal_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_domande_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_invito" ADD CONSTRAINT "_pagina_journal_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_invito_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v" ADD CONSTRAINT "_pagina_journal_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_locales" ADD CONSTRAINT "_pagina_journal_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_rels" ADD CONSTRAINT "_pagina_journal_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_rels" ADD CONSTRAINT "_pagina_journal_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_blocks_testo_order_idx" ON "prodotti_blocks_testo" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_testo_parent_id_idx" ON "prodotti_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_testo_path_idx" ON "prodotti_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_testo_locales_locale_parent_id_unique" ON "prodotti_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_testo_locales_parent_id_idx" ON "prodotti_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_immagine_testo_order_idx" ON "prodotti_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_immagine_testo_parent_id_idx" ON "prodotti_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_immagine_testo_path_idx" ON "prodotti_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "prodotti_blocks_immagine_testo_immagine_idx" ON "prodotti_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "prodotti_blocks_immagine_testo_locales_locale_parent_id_uniq" ON "prodotti_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_immagine_testo_locales_parent_id_idx" ON "prodotti_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_slider_order_idx" ON "prodotti_blocks_slider" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_slider_parent_id_idx" ON "prodotti_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_slider_path_idx" ON "prodotti_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_slider_locales_locale_parent_id_unique" ON "prodotti_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_slider_locales_parent_id_idx" ON "prodotti_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_voci_order_idx" ON "prodotti_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_prodotti_voci_parent_id_idx" ON "prodotti_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_voci_prodotto_idx" ON "prodotti_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "prodotti_blocks_prodotti_voci_immagine_idx" ON "prodotti_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "prodotti_blocks_prodotti_voci_locales_locale_parent_id_uniqu" ON "prodotti_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_voci_locales_parent_id_idx" ON "prodotti_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_order_idx" ON "prodotti_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_prodotti_parent_id_idx" ON "prodotti_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_path_idx" ON "prodotti_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_prodotti_locales_locale_parent_id_unique" ON "prodotti_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_prodotti_locales_parent_id_idx" ON "prodotti_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_citazione_order_idx" ON "prodotti_blocks_citazione" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_citazione_parent_id_idx" ON "prodotti_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_citazione_path_idx" ON "prodotti_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_citazione_locales_locale_parent_id_unique" ON "prodotti_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_citazione_locales_parent_id_idx" ON "prodotti_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_domande_voci_order_idx" ON "prodotti_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_domande_voci_parent_id_idx" ON "prodotti_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_blocks_domande_voci_locales_locale_parent_id_unique" ON "prodotti_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_domande_voci_locales_parent_id_idx" ON "prodotti_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_domande_order_idx" ON "prodotti_blocks_domande" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_domande_parent_id_idx" ON "prodotti_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_domande_path_idx" ON "prodotti_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_domande_locales_locale_parent_id_unique" ON "prodotti_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_domande_locales_parent_id_idx" ON "prodotti_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_invito_order_idx" ON "prodotti_blocks_invito" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_invito_parent_id_idx" ON "prodotti_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_invito_path_idx" ON "prodotti_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_invito_locales_locale_parent_id_unique" ON "prodotti_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_invito_locales_parent_id_idx" ON "prodotti_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_testo_order_idx" ON "_prodotti_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_testo_parent_id_idx" ON "_prodotti_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_testo_path_idx" ON "_prodotti_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_testo_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_testo_locales_parent_id_idx" ON "_prodotti_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_immagine_testo_order_idx" ON "_prodotti_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_immagine_testo_parent_id_idx" ON "_prodotti_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_immagine_testo_path_idx" ON "_prodotti_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_prodotti_v_blocks_immagine_testo_immagine_idx" ON "_prodotti_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_immagine_testo_locales_locale_parent_id_u" ON "_prodotti_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_immagine_testo_locales_parent_id_idx" ON "_prodotti_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_slider_order_idx" ON "_prodotti_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_slider_parent_id_idx" ON "_prodotti_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_slider_path_idx" ON "_prodotti_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_slider_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_slider_locales_parent_id_idx" ON "_prodotti_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_voci_order_idx" ON "_prodotti_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_prodotti_voci_parent_id_idx" ON "_prodotti_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_voci_prodotto_idx" ON "_prodotti_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_voci_immagine_idx" ON "_prodotti_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_prodotti_voci_locales_locale_parent_id_un" ON "_prodotti_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_prodotti_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_order_idx" ON "_prodotti_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_prodotti_parent_id_idx" ON "_prodotti_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_path_idx" ON "_prodotti_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_prodotti_locales_parent_id_idx" ON "_prodotti_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_citazione_order_idx" ON "_prodotti_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_citazione_parent_id_idx" ON "_prodotti_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_citazione_path_idx" ON "_prodotti_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_citazione_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_citazione_locales_parent_id_idx" ON "_prodotti_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_domande_voci_order_idx" ON "_prodotti_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_domande_voci_parent_id_idx" ON "_prodotti_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_domande_voci_locales_locale_parent_id_uni" ON "_prodotti_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_domande_voci_locales_parent_id_idx" ON "_prodotti_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_domande_order_idx" ON "_prodotti_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_domande_parent_id_idx" ON "_prodotti_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_domande_path_idx" ON "_prodotti_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_domande_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_domande_locales_parent_id_idx" ON "_prodotti_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_invito_order_idx" ON "_prodotti_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_invito_parent_id_idx" ON "_prodotti_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_invito_path_idx" ON "_prodotti_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_invito_locales_locale_parent_id_unique" ON "_prodotti_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_invito_locales_parent_id_idx" ON "_prodotti_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_testo_order_idx" ON "case_history_blocks_testo" USING btree ("_order");
  CREATE INDEX "case_history_blocks_testo_parent_id_idx" ON "case_history_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_testo_path_idx" ON "case_history_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_testo_locales_locale_parent_id_unique" ON "case_history_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_testo_locales_parent_id_idx" ON "case_history_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_immagine_testo_order_idx" ON "case_history_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "case_history_blocks_immagine_testo_parent_id_idx" ON "case_history_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_immagine_testo_path_idx" ON "case_history_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "case_history_blocks_immagine_testo_immagine_idx" ON "case_history_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "case_history_blocks_immagine_testo_locales_locale_parent_id_" ON "case_history_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_immagine_testo_locales_parent_id_idx" ON "case_history_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_slider_order_idx" ON "case_history_blocks_slider" USING btree ("_order");
  CREATE INDEX "case_history_blocks_slider_parent_id_idx" ON "case_history_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_slider_path_idx" ON "case_history_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_slider_locales_locale_parent_id_unique" ON "case_history_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_slider_locales_parent_id_idx" ON "case_history_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_voci_order_idx" ON "case_history_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "case_history_blocks_prodotti_voci_parent_id_idx" ON "case_history_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_voci_prodotto_idx" ON "case_history_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "case_history_blocks_prodotti_voci_immagine_idx" ON "case_history_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "case_history_blocks_prodotti_voci_locales_locale_parent_id_u" ON "case_history_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_voci_locales_parent_id_idx" ON "case_history_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_order_idx" ON "case_history_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "case_history_blocks_prodotti_parent_id_idx" ON "case_history_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_path_idx" ON "case_history_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_prodotti_locales_locale_parent_id_unique" ON "case_history_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_prodotti_locales_parent_id_idx" ON "case_history_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_citazione_order_idx" ON "case_history_blocks_citazione" USING btree ("_order");
  CREATE INDEX "case_history_blocks_citazione_parent_id_idx" ON "case_history_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_citazione_path_idx" ON "case_history_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_citazione_locales_locale_parent_id_uniqu" ON "case_history_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_citazione_locales_parent_id_idx" ON "case_history_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_domande_voci_order_idx" ON "case_history_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "case_history_blocks_domande_voci_parent_id_idx" ON "case_history_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_blocks_domande_voci_locales_locale_parent_id_un" ON "case_history_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_domande_voci_locales_parent_id_idx" ON "case_history_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_domande_order_idx" ON "case_history_blocks_domande" USING btree ("_order");
  CREATE INDEX "case_history_blocks_domande_parent_id_idx" ON "case_history_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_domande_path_idx" ON "case_history_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_domande_locales_locale_parent_id_unique" ON "case_history_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_domande_locales_parent_id_idx" ON "case_history_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_invito_order_idx" ON "case_history_blocks_invito" USING btree ("_order");
  CREATE INDEX "case_history_blocks_invito_parent_id_idx" ON "case_history_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_invito_path_idx" ON "case_history_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_invito_locales_locale_parent_id_unique" ON "case_history_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_invito_locales_parent_id_idx" ON "case_history_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_rels_order_idx" ON "case_history_rels" USING btree ("order");
  CREATE INDEX "case_history_rels_parent_idx" ON "case_history_rels" USING btree ("parent_id");
  CREATE INDEX "case_history_rels_path_idx" ON "case_history_rels" USING btree ("path");
  CREATE INDEX "case_history_rels_media_id_idx" ON "case_history_rels" USING btree ("media_id");
  CREATE INDEX "_case_history_v_blocks_testo_order_idx" ON "_case_history_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_testo_parent_id_idx" ON "_case_history_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_testo_path_idx" ON "_case_history_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_testo_locales_locale_parent_id_unique" ON "_case_history_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_testo_locales_parent_id_idx" ON "_case_history_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_immagine_testo_order_idx" ON "_case_history_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_immagine_testo_parent_id_idx" ON "_case_history_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_immagine_testo_path_idx" ON "_case_history_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_case_history_v_blocks_immagine_testo_immagine_idx" ON "_case_history_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_case_history_v_blocks_immagine_testo_locales_locale_parent_" ON "_case_history_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_immagine_testo_locales_parent_id_idx" ON "_case_history_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_slider_order_idx" ON "_case_history_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_slider_parent_id_idx" ON "_case_history_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_slider_path_idx" ON "_case_history_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_slider_locales_locale_parent_id_uniqu" ON "_case_history_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_slider_locales_parent_id_idx" ON "_case_history_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_voci_order_idx" ON "_case_history_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_prodotti_voci_parent_id_idx" ON "_case_history_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_voci_prodotto_idx" ON "_case_history_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_voci_immagine_idx" ON "_case_history_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_case_history_v_blocks_prodotti_voci_locales_locale_parent_i" ON "_case_history_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_case_history_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_order_idx" ON "_case_history_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_prodotti_parent_id_idx" ON "_case_history_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_path_idx" ON "_case_history_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_prodotti_locales_locale_parent_id_uni" ON "_case_history_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_prodotti_locales_parent_id_idx" ON "_case_history_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_citazione_order_idx" ON "_case_history_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_citazione_parent_id_idx" ON "_case_history_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_citazione_path_idx" ON "_case_history_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_citazione_locales_locale_parent_id_un" ON "_case_history_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_citazione_locales_parent_id_idx" ON "_case_history_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_domande_voci_order_idx" ON "_case_history_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_domande_voci_parent_id_idx" ON "_case_history_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_case_history_v_blocks_domande_voci_locales_locale_parent_id" ON "_case_history_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_domande_voci_locales_parent_id_idx" ON "_case_history_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_domande_order_idx" ON "_case_history_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_domande_parent_id_idx" ON "_case_history_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_domande_path_idx" ON "_case_history_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_domande_locales_locale_parent_id_uniq" ON "_case_history_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_domande_locales_parent_id_idx" ON "_case_history_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_invito_order_idx" ON "_case_history_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_invito_parent_id_idx" ON "_case_history_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_invito_path_idx" ON "_case_history_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_invito_locales_locale_parent_id_uniqu" ON "_case_history_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_invito_locales_parent_id_idx" ON "_case_history_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_rels_order_idx" ON "_case_history_v_rels" USING btree ("order");
  CREATE INDEX "_case_history_v_rels_parent_idx" ON "_case_history_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_history_v_rels_path_idx" ON "_case_history_v_rels" USING btree ("path");
  CREATE INDEX "_case_history_v_rels_media_id_idx" ON "_case_history_v_rels" USING btree ("media_id");
  CREATE INDEX "spunti_blocks_testo_order_idx" ON "spunti_blocks_testo" USING btree ("_order");
  CREATE INDEX "spunti_blocks_testo_parent_id_idx" ON "spunti_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_testo_path_idx" ON "spunti_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_testo_locales_locale_parent_id_unique" ON "spunti_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_testo_locales_parent_id_idx" ON "spunti_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_immagine_testo_order_idx" ON "spunti_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "spunti_blocks_immagine_testo_parent_id_idx" ON "spunti_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_immagine_testo_path_idx" ON "spunti_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "spunti_blocks_immagine_testo_immagine_idx" ON "spunti_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "spunti_blocks_immagine_testo_locales_locale_parent_id_unique" ON "spunti_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_immagine_testo_locales_parent_id_idx" ON "spunti_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_slider_order_idx" ON "spunti_blocks_slider" USING btree ("_order");
  CREATE INDEX "spunti_blocks_slider_parent_id_idx" ON "spunti_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_slider_path_idx" ON "spunti_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_slider_locales_locale_parent_id_unique" ON "spunti_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_slider_locales_parent_id_idx" ON "spunti_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_voci_order_idx" ON "spunti_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "spunti_blocks_prodotti_voci_parent_id_idx" ON "spunti_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_voci_prodotto_idx" ON "spunti_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "spunti_blocks_prodotti_voci_immagine_idx" ON "spunti_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "spunti_blocks_prodotti_voci_locales_locale_parent_id_unique" ON "spunti_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_voci_locales_parent_id_idx" ON "spunti_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_order_idx" ON "spunti_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "spunti_blocks_prodotti_parent_id_idx" ON "spunti_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_path_idx" ON "spunti_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_prodotti_locales_locale_parent_id_unique" ON "spunti_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_prodotti_locales_parent_id_idx" ON "spunti_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_citazione_order_idx" ON "spunti_blocks_citazione" USING btree ("_order");
  CREATE INDEX "spunti_blocks_citazione_parent_id_idx" ON "spunti_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_citazione_path_idx" ON "spunti_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_citazione_locales_locale_parent_id_unique" ON "spunti_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_citazione_locales_parent_id_idx" ON "spunti_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_domande_voci_order_idx" ON "spunti_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "spunti_blocks_domande_voci_parent_id_idx" ON "spunti_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "spunti_blocks_domande_voci_locales_locale_parent_id_unique" ON "spunti_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_domande_voci_locales_parent_id_idx" ON "spunti_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_domande_order_idx" ON "spunti_blocks_domande" USING btree ("_order");
  CREATE INDEX "spunti_blocks_domande_parent_id_idx" ON "spunti_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_domande_path_idx" ON "spunti_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_domande_locales_locale_parent_id_unique" ON "spunti_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_domande_locales_parent_id_idx" ON "spunti_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_invito_order_idx" ON "spunti_blocks_invito" USING btree ("_order");
  CREATE INDEX "spunti_blocks_invito_parent_id_idx" ON "spunti_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_invito_path_idx" ON "spunti_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_invito_locales_locale_parent_id_unique" ON "spunti_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_invito_locales_parent_id_idx" ON "spunti_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_testo_order_idx" ON "_spunti_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_testo_parent_id_idx" ON "_spunti_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_testo_path_idx" ON "_spunti_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_testo_locales_locale_parent_id_unique" ON "_spunti_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_testo_locales_parent_id_idx" ON "_spunti_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_immagine_testo_order_idx" ON "_spunti_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_immagine_testo_parent_id_idx" ON "_spunti_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_immagine_testo_path_idx" ON "_spunti_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_spunti_v_blocks_immagine_testo_immagine_idx" ON "_spunti_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_spunti_v_blocks_immagine_testo_locales_locale_parent_id_uni" ON "_spunti_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_immagine_testo_locales_parent_id_idx" ON "_spunti_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_slider_order_idx" ON "_spunti_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_slider_parent_id_idx" ON "_spunti_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_slider_path_idx" ON "_spunti_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_slider_locales_locale_parent_id_unique" ON "_spunti_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_slider_locales_parent_id_idx" ON "_spunti_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_voci_order_idx" ON "_spunti_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_prodotti_voci_parent_id_idx" ON "_spunti_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_voci_prodotto_idx" ON "_spunti_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_voci_immagine_idx" ON "_spunti_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_spunti_v_blocks_prodotti_voci_locales_locale_parent_id_uniq" ON "_spunti_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_spunti_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_order_idx" ON "_spunti_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_prodotti_parent_id_idx" ON "_spunti_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_path_idx" ON "_spunti_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_spunti_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_prodotti_locales_parent_id_idx" ON "_spunti_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_citazione_order_idx" ON "_spunti_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_citazione_parent_id_idx" ON "_spunti_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_citazione_path_idx" ON "_spunti_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_citazione_locales_locale_parent_id_unique" ON "_spunti_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_citazione_locales_parent_id_idx" ON "_spunti_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_domande_voci_order_idx" ON "_spunti_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_domande_voci_parent_id_idx" ON "_spunti_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_spunti_v_blocks_domande_voci_locales_locale_parent_id_uniqu" ON "_spunti_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_domande_voci_locales_parent_id_idx" ON "_spunti_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_domande_order_idx" ON "_spunti_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_domande_parent_id_idx" ON "_spunti_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_domande_path_idx" ON "_spunti_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_domande_locales_locale_parent_id_unique" ON "_spunti_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_domande_locales_parent_id_idx" ON "_spunti_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_invito_order_idx" ON "_spunti_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_invito_parent_id_idx" ON "_spunti_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_invito_path_idx" ON "_spunti_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_invito_locales_locale_parent_id_unique" ON "_spunti_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_invito_locales_parent_id_idx" ON "_spunti_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_domande_order_idx" ON "articoli_domande" USING btree ("_order");
  CREATE INDEX "articoli_domande_parent_id_idx" ON "articoli_domande" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articoli_domande_locales_locale_parent_id_unique" ON "articoli_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_domande_locales_parent_id_idx" ON "articoli_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_testo_order_idx" ON "articoli_blocks_testo" USING btree ("_order");
  CREATE INDEX "articoli_blocks_testo_parent_id_idx" ON "articoli_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_testo_path_idx" ON "articoli_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_testo_locales_locale_parent_id_unique" ON "articoli_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_testo_locales_parent_id_idx" ON "articoli_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_immagine_testo_order_idx" ON "articoli_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "articoli_blocks_immagine_testo_parent_id_idx" ON "articoli_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_immagine_testo_path_idx" ON "articoli_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "articoli_blocks_immagine_testo_immagine_idx" ON "articoli_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "articoli_blocks_immagine_testo_locales_locale_parent_id_uniq" ON "articoli_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_immagine_testo_locales_parent_id_idx" ON "articoli_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_slider_order_idx" ON "articoli_blocks_slider" USING btree ("_order");
  CREATE INDEX "articoli_blocks_slider_parent_id_idx" ON "articoli_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_slider_path_idx" ON "articoli_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_slider_locales_locale_parent_id_unique" ON "articoli_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_slider_locales_parent_id_idx" ON "articoli_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_voci_order_idx" ON "articoli_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "articoli_blocks_prodotti_voci_parent_id_idx" ON "articoli_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_voci_prodotto_idx" ON "articoli_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "articoli_blocks_prodotti_voci_immagine_idx" ON "articoli_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "articoli_blocks_prodotti_voci_locales_locale_parent_id_uniqu" ON "articoli_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_voci_locales_parent_id_idx" ON "articoli_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_order_idx" ON "articoli_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "articoli_blocks_prodotti_parent_id_idx" ON "articoli_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_path_idx" ON "articoli_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_prodotti_locales_locale_parent_id_unique" ON "articoli_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_prodotti_locales_parent_id_idx" ON "articoli_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_citazione_order_idx" ON "articoli_blocks_citazione" USING btree ("_order");
  CREATE INDEX "articoli_blocks_citazione_parent_id_idx" ON "articoli_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_citazione_path_idx" ON "articoli_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_citazione_locales_locale_parent_id_unique" ON "articoli_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_citazione_locales_parent_id_idx" ON "articoli_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_domande_voci_order_idx" ON "articoli_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "articoli_blocks_domande_voci_parent_id_idx" ON "articoli_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articoli_blocks_domande_voci_locales_locale_parent_id_unique" ON "articoli_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_domande_voci_locales_parent_id_idx" ON "articoli_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_domande_order_idx" ON "articoli_blocks_domande" USING btree ("_order");
  CREATE INDEX "articoli_blocks_domande_parent_id_idx" ON "articoli_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_domande_path_idx" ON "articoli_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_domande_locales_locale_parent_id_unique" ON "articoli_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_domande_locales_parent_id_idx" ON "articoli_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_invito_order_idx" ON "articoli_blocks_invito" USING btree ("_order");
  CREATE INDEX "articoli_blocks_invito_parent_id_idx" ON "articoli_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_invito_path_idx" ON "articoli_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_invito_locales_locale_parent_id_unique" ON "articoli_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_invito_locales_parent_id_idx" ON "articoli_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articoli_slug_idx" ON "articoli" USING btree ("slug");
  CREATE INDEX "articoli_immagine_idx" ON "articoli" USING btree ("immagine_id");
  CREATE INDEX "articoli_seo_seo_immagine_idx" ON "articoli" USING btree ("seo_immagine_id");
  CREATE INDEX "articoli_updated_at_idx" ON "articoli" USING btree ("updated_at");
  CREATE INDEX "articoli_created_at_idx" ON "articoli" USING btree ("created_at");
  CREATE INDEX "articoli__status_idx" ON "articoli" USING btree ("_status");
  CREATE UNIQUE INDEX "articoli_locales_locale_parent_id_unique" ON "articoli_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_locales_parent_id_idx" ON "articoli_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_rels_order_idx" ON "articoli_rels" USING btree ("order");
  CREATE INDEX "articoli_rels_parent_idx" ON "articoli_rels" USING btree ("parent_id");
  CREATE INDEX "articoli_rels_path_idx" ON "articoli_rels" USING btree ("path");
  CREATE INDEX "articoli_rels_prodotti_id_idx" ON "articoli_rels" USING btree ("prodotti_id");
  CREATE INDEX "articoli_rels_designer_id_idx" ON "articoli_rels" USING btree ("designer_id");
  CREATE INDEX "articoli_rels_media_id_idx" ON "articoli_rels" USING btree ("media_id");
  CREATE INDEX "_articoli_v_version_domande_order_idx" ON "_articoli_v_version_domande" USING btree ("_order");
  CREATE INDEX "_articoli_v_version_domande_parent_id_idx" ON "_articoli_v_version_domande" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articoli_v_version_domande_locales_locale_parent_id_unique" ON "_articoli_v_version_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_version_domande_locales_parent_id_idx" ON "_articoli_v_version_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_testo_order_idx" ON "_articoli_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_testo_parent_id_idx" ON "_articoli_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_testo_path_idx" ON "_articoli_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_testo_locales_locale_parent_id_unique" ON "_articoli_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_testo_locales_parent_id_idx" ON "_articoli_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_immagine_testo_order_idx" ON "_articoli_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_immagine_testo_parent_id_idx" ON "_articoli_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_immagine_testo_path_idx" ON "_articoli_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_articoli_v_blocks_immagine_testo_immagine_idx" ON "_articoli_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_articoli_v_blocks_immagine_testo_locales_locale_parent_id_u" ON "_articoli_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_immagine_testo_locales_parent_id_idx" ON "_articoli_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_slider_order_idx" ON "_articoli_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_slider_parent_id_idx" ON "_articoli_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_slider_path_idx" ON "_articoli_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_slider_locales_locale_parent_id_unique" ON "_articoli_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_slider_locales_parent_id_idx" ON "_articoli_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_voci_order_idx" ON "_articoli_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_prodotti_voci_parent_id_idx" ON "_articoli_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_voci_prodotto_idx" ON "_articoli_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_voci_immagine_idx" ON "_articoli_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_articoli_v_blocks_prodotti_voci_locales_locale_parent_id_un" ON "_articoli_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_articoli_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_order_idx" ON "_articoli_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_prodotti_parent_id_idx" ON "_articoli_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_path_idx" ON "_articoli_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_articoli_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_prodotti_locales_parent_id_idx" ON "_articoli_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_citazione_order_idx" ON "_articoli_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_citazione_parent_id_idx" ON "_articoli_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_citazione_path_idx" ON "_articoli_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_citazione_locales_locale_parent_id_unique" ON "_articoli_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_citazione_locales_parent_id_idx" ON "_articoli_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_domande_voci_order_idx" ON "_articoli_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_domande_voci_parent_id_idx" ON "_articoli_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articoli_v_blocks_domande_voci_locales_locale_parent_id_uni" ON "_articoli_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_domande_voci_locales_parent_id_idx" ON "_articoli_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_domande_order_idx" ON "_articoli_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_domande_parent_id_idx" ON "_articoli_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_domande_path_idx" ON "_articoli_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_domande_locales_locale_parent_id_unique" ON "_articoli_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_domande_locales_parent_id_idx" ON "_articoli_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_invito_order_idx" ON "_articoli_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_invito_parent_id_idx" ON "_articoli_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_invito_path_idx" ON "_articoli_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_invito_locales_locale_parent_id_unique" ON "_articoli_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_invito_locales_parent_id_idx" ON "_articoli_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_parent_idx" ON "_articoli_v" USING btree ("parent_id");
  CREATE INDEX "_articoli_v_version_version_slug_idx" ON "_articoli_v" USING btree ("version_slug");
  CREATE INDEX "_articoli_v_version_version_immagine_idx" ON "_articoli_v" USING btree ("version_immagine_id");
  CREATE INDEX "_articoli_v_version_seo_version_seo_immagine_idx" ON "_articoli_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_articoli_v_version_version_updated_at_idx" ON "_articoli_v" USING btree ("version_updated_at");
  CREATE INDEX "_articoli_v_version_version_created_at_idx" ON "_articoli_v" USING btree ("version_created_at");
  CREATE INDEX "_articoli_v_version_version__status_idx" ON "_articoli_v" USING btree ("version__status");
  CREATE INDEX "_articoli_v_created_at_idx" ON "_articoli_v" USING btree ("created_at");
  CREATE INDEX "_articoli_v_updated_at_idx" ON "_articoli_v" USING btree ("updated_at");
  CREATE INDEX "_articoli_v_snapshot_idx" ON "_articoli_v" USING btree ("snapshot");
  CREATE INDEX "_articoli_v_published_locale_idx" ON "_articoli_v" USING btree ("published_locale");
  CREATE INDEX "_articoli_v_latest_idx" ON "_articoli_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_articoli_v_locales_locale_parent_id_unique" ON "_articoli_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_locales_parent_id_idx" ON "_articoli_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_rels_order_idx" ON "_articoli_v_rels" USING btree ("order");
  CREATE INDEX "_articoli_v_rels_parent_idx" ON "_articoli_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articoli_v_rels_path_idx" ON "_articoli_v_rels" USING btree ("path");
  CREATE INDEX "_articoli_v_rels_prodotti_id_idx" ON "_articoli_v_rels" USING btree ("prodotti_id");
  CREATE INDEX "_articoli_v_rels_designer_id_idx" ON "_articoli_v_rels" USING btree ("designer_id");
  CREATE INDEX "_articoli_v_rels_media_id_idx" ON "_articoli_v_rels" USING btree ("media_id");
  CREATE INDEX "designer_blocks_testo_order_idx" ON "designer_blocks_testo" USING btree ("_order");
  CREATE INDEX "designer_blocks_testo_parent_id_idx" ON "designer_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_testo_path_idx" ON "designer_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_testo_locales_locale_parent_id_unique" ON "designer_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_testo_locales_parent_id_idx" ON "designer_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_immagine_testo_order_idx" ON "designer_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "designer_blocks_immagine_testo_parent_id_idx" ON "designer_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_immagine_testo_path_idx" ON "designer_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "designer_blocks_immagine_testo_immagine_idx" ON "designer_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "designer_blocks_immagine_testo_locales_locale_parent_id_uniq" ON "designer_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_immagine_testo_locales_parent_id_idx" ON "designer_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_slider_order_idx" ON "designer_blocks_slider" USING btree ("_order");
  CREATE INDEX "designer_blocks_slider_parent_id_idx" ON "designer_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_slider_path_idx" ON "designer_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_slider_locales_locale_parent_id_unique" ON "designer_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_slider_locales_parent_id_idx" ON "designer_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_prodotti_voci_order_idx" ON "designer_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "designer_blocks_prodotti_voci_parent_id_idx" ON "designer_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_prodotti_voci_prodotto_idx" ON "designer_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "designer_blocks_prodotti_voci_immagine_idx" ON "designer_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "designer_blocks_prodotti_voci_locales_locale_parent_id_uniqu" ON "designer_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_prodotti_voci_locales_parent_id_idx" ON "designer_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_prodotti_order_idx" ON "designer_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "designer_blocks_prodotti_parent_id_idx" ON "designer_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_prodotti_path_idx" ON "designer_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_prodotti_locales_locale_parent_id_unique" ON "designer_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_prodotti_locales_parent_id_idx" ON "designer_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_citazione_order_idx" ON "designer_blocks_citazione" USING btree ("_order");
  CREATE INDEX "designer_blocks_citazione_parent_id_idx" ON "designer_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_citazione_path_idx" ON "designer_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_citazione_locales_locale_parent_id_unique" ON "designer_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_citazione_locales_parent_id_idx" ON "designer_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_domande_voci_order_idx" ON "designer_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "designer_blocks_domande_voci_parent_id_idx" ON "designer_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "designer_blocks_domande_voci_locales_locale_parent_id_unique" ON "designer_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_domande_voci_locales_parent_id_idx" ON "designer_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_domande_order_idx" ON "designer_blocks_domande" USING btree ("_order");
  CREATE INDEX "designer_blocks_domande_parent_id_idx" ON "designer_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_domande_path_idx" ON "designer_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_domande_locales_locale_parent_id_unique" ON "designer_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_domande_locales_parent_id_idx" ON "designer_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_invito_order_idx" ON "designer_blocks_invito" USING btree ("_order");
  CREATE INDEX "designer_blocks_invito_parent_id_idx" ON "designer_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_invito_path_idx" ON "designer_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_invito_locales_locale_parent_id_unique" ON "designer_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_invito_locales_parent_id_idx" ON "designer_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_rels_order_idx" ON "designer_rels" USING btree ("order");
  CREATE INDEX "designer_rels_parent_idx" ON "designer_rels" USING btree ("parent_id");
  CREATE INDEX "designer_rels_path_idx" ON "designer_rels" USING btree ("path");
  CREATE INDEX "designer_rels_media_id_idx" ON "designer_rels" USING btree ("media_id");
  CREATE INDEX "_designer_v_blocks_testo_order_idx" ON "_designer_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_testo_parent_id_idx" ON "_designer_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_testo_path_idx" ON "_designer_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_testo_locales_locale_parent_id_unique" ON "_designer_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_testo_locales_parent_id_idx" ON "_designer_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_immagine_testo_order_idx" ON "_designer_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_immagine_testo_parent_id_idx" ON "_designer_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_immagine_testo_path_idx" ON "_designer_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_designer_v_blocks_immagine_testo_immagine_idx" ON "_designer_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_designer_v_blocks_immagine_testo_locales_locale_parent_id_u" ON "_designer_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_immagine_testo_locales_parent_id_idx" ON "_designer_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_slider_order_idx" ON "_designer_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_slider_parent_id_idx" ON "_designer_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_slider_path_idx" ON "_designer_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_slider_locales_locale_parent_id_unique" ON "_designer_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_slider_locales_parent_id_idx" ON "_designer_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_voci_order_idx" ON "_designer_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_prodotti_voci_parent_id_idx" ON "_designer_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_voci_prodotto_idx" ON "_designer_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_designer_v_blocks_prodotti_voci_immagine_idx" ON "_designer_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_designer_v_blocks_prodotti_voci_locales_locale_parent_id_un" ON "_designer_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_designer_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_order_idx" ON "_designer_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_prodotti_parent_id_idx" ON "_designer_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_path_idx" ON "_designer_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_designer_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_prodotti_locales_parent_id_idx" ON "_designer_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_citazione_order_idx" ON "_designer_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_citazione_parent_id_idx" ON "_designer_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_citazione_path_idx" ON "_designer_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_citazione_locales_locale_parent_id_unique" ON "_designer_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_citazione_locales_parent_id_idx" ON "_designer_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_domande_voci_order_idx" ON "_designer_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_domande_voci_parent_id_idx" ON "_designer_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_designer_v_blocks_domande_voci_locales_locale_parent_id_uni" ON "_designer_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_domande_voci_locales_parent_id_idx" ON "_designer_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_domande_order_idx" ON "_designer_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_domande_parent_id_idx" ON "_designer_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_domande_path_idx" ON "_designer_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_domande_locales_locale_parent_id_unique" ON "_designer_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_domande_locales_parent_id_idx" ON "_designer_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_invito_order_idx" ON "_designer_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_invito_parent_id_idx" ON "_designer_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_invito_path_idx" ON "_designer_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_invito_locales_locale_parent_id_unique" ON "_designer_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_invito_locales_parent_id_idx" ON "_designer_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_rels_order_idx" ON "_designer_v_rels" USING btree ("order");
  CREATE INDEX "_designer_v_rels_parent_idx" ON "_designer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_designer_v_rels_path_idx" ON "_designer_v_rels" USING btree ("path");
  CREATE INDEX "_designer_v_rels_media_id_idx" ON "_designer_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "spazi_foto_chiave_idx" ON "spazi_foto" USING btree ("chiave");
  CREATE INDEX "spazi_foto_documento_idx" ON "spazi_foto" USING btree ("documento");
  CREATE INDEX "spazi_foto_updated_at_idx" ON "spazi_foto" USING btree ("updated_at");
  CREATE INDEX "spazi_foto_created_at_idx" ON "spazi_foto" USING btree ("created_at");
  CREATE INDEX "spazi_foto_rels_order_idx" ON "spazi_foto_rels" USING btree ("order");
  CREATE INDEX "spazi_foto_rels_parent_idx" ON "spazi_foto_rels" USING btree ("parent_id");
  CREATE INDEX "spazi_foto_rels_path_idx" ON "spazi_foto_rels" USING btree ("path");
  CREATE INDEX "spazi_foto_rels_media_id_idx" ON "spazi_foto_rels" USING btree ("media_id");
  CREATE INDEX "home_blocks_testo_order_idx" ON "home_blocks_testo" USING btree ("_order");
  CREATE INDEX "home_blocks_testo_parent_id_idx" ON "home_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_testo_path_idx" ON "home_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_testo_locales_locale_parent_id_unique" ON "home_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_testo_locales_parent_id_idx" ON "home_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_immagine_testo_order_idx" ON "home_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "home_blocks_immagine_testo_parent_id_idx" ON "home_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_immagine_testo_path_idx" ON "home_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "home_blocks_immagine_testo_immagine_idx" ON "home_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_blocks_immagine_testo_locales_locale_parent_id_unique" ON "home_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_immagine_testo_locales_parent_id_idx" ON "home_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_slider_order_idx" ON "home_blocks_slider" USING btree ("_order");
  CREATE INDEX "home_blocks_slider_parent_id_idx" ON "home_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_slider_path_idx" ON "home_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_slider_locales_locale_parent_id_unique" ON "home_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_slider_locales_parent_id_idx" ON "home_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_prodotti_voci_order_idx" ON "home_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "home_blocks_prodotti_voci_parent_id_idx" ON "home_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_prodotti_voci_prodotto_idx" ON "home_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "home_blocks_prodotti_voci_immagine_idx" ON "home_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_blocks_prodotti_voci_locales_locale_parent_id_unique" ON "home_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_prodotti_voci_locales_parent_id_idx" ON "home_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_prodotti_order_idx" ON "home_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "home_blocks_prodotti_parent_id_idx" ON "home_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_prodotti_path_idx" ON "home_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_prodotti_locales_locale_parent_id_unique" ON "home_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_prodotti_locales_parent_id_idx" ON "home_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_citazione_order_idx" ON "home_blocks_citazione" USING btree ("_order");
  CREATE INDEX "home_blocks_citazione_parent_id_idx" ON "home_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_citazione_path_idx" ON "home_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_citazione_locales_locale_parent_id_unique" ON "home_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_citazione_locales_parent_id_idx" ON "home_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_domande_voci_order_idx" ON "home_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "home_blocks_domande_voci_parent_id_idx" ON "home_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_blocks_domande_voci_locales_locale_parent_id_unique" ON "home_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_domande_voci_locales_parent_id_idx" ON "home_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_domande_order_idx" ON "home_blocks_domande" USING btree ("_order");
  CREATE INDEX "home_blocks_domande_parent_id_idx" ON "home_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_domande_path_idx" ON "home_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_domande_locales_locale_parent_id_unique" ON "home_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_domande_locales_parent_id_idx" ON "home_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_invito_order_idx" ON "home_blocks_invito" USING btree ("_order");
  CREATE INDEX "home_blocks_invito_parent_id_idx" ON "home_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_invito_path_idx" ON "home_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_invito_locales_locale_parent_id_unique" ON "home_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_invito_locales_parent_id_idx" ON "home_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "_home_v_blocks_testo_order_idx" ON "_home_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_testo_parent_id_idx" ON "_home_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_testo_path_idx" ON "_home_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_testo_locales_locale_parent_id_unique" ON "_home_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_testo_locales_parent_id_idx" ON "_home_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_immagine_testo_order_idx" ON "_home_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_immagine_testo_parent_id_idx" ON "_home_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_immagine_testo_path_idx" ON "_home_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_immagine_testo_immagine_idx" ON "_home_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_blocks_immagine_testo_locales_locale_parent_id_uniqu" ON "_home_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_immagine_testo_locales_parent_id_idx" ON "_home_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_slider_order_idx" ON "_home_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_slider_parent_id_idx" ON "_home_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_slider_path_idx" ON "_home_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_slider_locales_locale_parent_id_unique" ON "_home_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_slider_locales_parent_id_idx" ON "_home_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_voci_order_idx" ON "_home_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_prodotti_voci_parent_id_idx" ON "_home_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_voci_prodotto_idx" ON "_home_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_home_v_blocks_prodotti_voci_immagine_idx" ON "_home_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_blocks_prodotti_voci_locales_locale_parent_id_unique" ON "_home_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_home_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_order_idx" ON "_home_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_prodotti_parent_id_idx" ON "_home_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_path_idx" ON "_home_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_home_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_prodotti_locales_parent_id_idx" ON "_home_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_citazione_order_idx" ON "_home_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_citazione_parent_id_idx" ON "_home_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_citazione_path_idx" ON "_home_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_citazione_locales_locale_parent_id_unique" ON "_home_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_citazione_locales_parent_id_idx" ON "_home_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_domande_voci_order_idx" ON "_home_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_domande_voci_parent_id_idx" ON "_home_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_blocks_domande_voci_locales_locale_parent_id_unique" ON "_home_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_domande_voci_locales_parent_id_idx" ON "_home_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_domande_order_idx" ON "_home_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_domande_parent_id_idx" ON "_home_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_domande_path_idx" ON "_home_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_domande_locales_locale_parent_id_unique" ON "_home_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_domande_locales_parent_id_idx" ON "_home_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_invito_order_idx" ON "_home_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_invito_parent_id_idx" ON "_home_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_invito_path_idx" ON "_home_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_invito_locales_locale_parent_id_unique" ON "_home_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_invito_locales_parent_id_idx" ON "_home_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_media_id_idx" ON "_home_v_rels" USING btree ("media_id");
  CREATE INDEX "pagina_designer_blocks_testo_order_idx" ON "pagina_designer_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_testo_parent_id_idx" ON "pagina_designer_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_testo_path_idx" ON "pagina_designer_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_testo_locales_locale_parent_id_unique" ON "pagina_designer_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_testo_locales_parent_id_idx" ON "pagina_designer_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_immagine_testo_order_idx" ON "pagina_designer_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_immagine_testo_parent_id_idx" ON "pagina_designer_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_immagine_testo_path_idx" ON "pagina_designer_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_designer_blocks_immagine_testo_immagine_idx" ON "pagina_designer_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_designer_blocks_immagine_testo_locales_locale_parent_" ON "pagina_designer_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_designer_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_slider_order_idx" ON "pagina_designer_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_slider_parent_id_idx" ON "pagina_designer_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_slider_path_idx" ON "pagina_designer_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_slider_locales_locale_parent_id_uniqu" ON "pagina_designer_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_slider_locales_parent_id_idx" ON "pagina_designer_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_voci_order_idx" ON "pagina_designer_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_prodotti_voci_parent_id_idx" ON "pagina_designer_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_voci_prodotto_idx" ON "pagina_designer_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_voci_immagine_idx" ON "pagina_designer_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_designer_blocks_prodotti_voci_locales_locale_parent_i" ON "pagina_designer_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_designer_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_order_idx" ON "pagina_designer_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_prodotti_parent_id_idx" ON "pagina_designer_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_path_idx" ON "pagina_designer_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_prodotti_locales_locale_parent_id_uni" ON "pagina_designer_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_prodotti_locales_parent_id_idx" ON "pagina_designer_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_citazione_order_idx" ON "pagina_designer_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_citazione_parent_id_idx" ON "pagina_designer_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_citazione_path_idx" ON "pagina_designer_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_citazione_locales_locale_parent_id_un" ON "pagina_designer_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_citazione_locales_parent_id_idx" ON "pagina_designer_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_domande_voci_order_idx" ON "pagina_designer_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_domande_voci_parent_id_idx" ON "pagina_designer_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_designer_blocks_domande_voci_locales_locale_parent_id" ON "pagina_designer_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_domande_voci_locales_parent_id_idx" ON "pagina_designer_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_domande_order_idx" ON "pagina_designer_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_domande_parent_id_idx" ON "pagina_designer_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_domande_path_idx" ON "pagina_designer_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_domande_locales_locale_parent_id_uniq" ON "pagina_designer_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_domande_locales_parent_id_idx" ON "pagina_designer_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_invito_order_idx" ON "pagina_designer_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_invito_parent_id_idx" ON "pagina_designer_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_invito_path_idx" ON "pagina_designer_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_invito_locales_locale_parent_id_uniqu" ON "pagina_designer_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_invito_locales_parent_id_idx" ON "pagina_designer_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_rels_order_idx" ON "pagina_designer_rels" USING btree ("order");
  CREATE INDEX "pagina_designer_rels_parent_idx" ON "pagina_designer_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_designer_rels_path_idx" ON "pagina_designer_rels" USING btree ("path");
  CREATE INDEX "pagina_designer_rels_media_id_idx" ON "pagina_designer_rels" USING btree ("media_id");
  CREATE INDEX "pagina_installazioni_blocks_testo_order_idx" ON "pagina_installazioni_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_testo_parent_id_idx" ON "pagina_installazioni_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_testo_path_idx" ON "pagina_installazioni_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_testo_locales_locale_parent_id_u" ON "pagina_installazioni_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_testo_locales_parent_id_idx" ON "pagina_installazioni_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_immagine_testo_order_idx" ON "pagina_installazioni_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_immagine_testo_parent_id_idx" ON "pagina_installazioni_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_immagine_testo_path_idx" ON "pagina_installazioni_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_installazioni_blocks_immagine_testo_immagine_idx" ON "pagina_installazioni_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_immagine_testo_locales_locale_pa" ON "pagina_installazioni_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_immagine_testo_locales_paren_idx" ON "pagina_installazioni_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_slider_order_idx" ON "pagina_installazioni_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_slider_parent_id_idx" ON "pagina_installazioni_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_slider_path_idx" ON "pagina_installazioni_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_slider_locales_locale_parent_id_" ON "pagina_installazioni_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_slider_locales_parent_id_idx" ON "pagina_installazioni_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_voci_order_idx" ON "pagina_installazioni_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_voci_parent_id_idx" ON "pagina_installazioni_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_voci_prodotto_idx" ON "pagina_installazioni_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_voci_immagine_idx" ON "pagina_installazioni_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_prodotti_voci_locales_locale_par" ON "pagina_installazioni_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_voci_locales_parent_idx" ON "pagina_installazioni_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_order_idx" ON "pagina_installazioni_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_parent_id_idx" ON "pagina_installazioni_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_path_idx" ON "pagina_installazioni_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_prodotti_locales_locale_parent_i" ON "pagina_installazioni_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_prodotti_locales_parent_id_idx" ON "pagina_installazioni_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_citazione_order_idx" ON "pagina_installazioni_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_citazione_parent_id_idx" ON "pagina_installazioni_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_citazione_path_idx" ON "pagina_installazioni_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_citazione_locales_locale_parent_" ON "pagina_installazioni_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_citazione_locales_parent_id_idx" ON "pagina_installazioni_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_domande_voci_order_idx" ON "pagina_installazioni_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_domande_voci_parent_id_idx" ON "pagina_installazioni_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_domande_voci_locales_locale_pare" ON "pagina_installazioni_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_domande_voci_locales_parent__idx" ON "pagina_installazioni_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_domande_order_idx" ON "pagina_installazioni_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_domande_parent_id_idx" ON "pagina_installazioni_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_domande_path_idx" ON "pagina_installazioni_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_domande_locales_locale_parent_id" ON "pagina_installazioni_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_domande_locales_parent_id_idx" ON "pagina_installazioni_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_invito_order_idx" ON "pagina_installazioni_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_invito_parent_id_idx" ON "pagina_installazioni_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_invito_path_idx" ON "pagina_installazioni_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_invito_locales_locale_parent_id_" ON "pagina_installazioni_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_invito_locales_parent_id_idx" ON "pagina_installazioni_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_rels_order_idx" ON "pagina_installazioni_rels" USING btree ("order");
  CREATE INDEX "pagina_installazioni_rels_parent_idx" ON "pagina_installazioni_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_installazioni_rels_path_idx" ON "pagina_installazioni_rels" USING btree ("path");
  CREATE INDEX "pagina_installazioni_rels_media_id_idx" ON "pagina_installazioni_rels" USING btree ("media_id");
  CREATE INDEX "pagina_spunti_blocks_testo_order_idx" ON "pagina_spunti_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_testo_parent_id_idx" ON "pagina_spunti_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_testo_path_idx" ON "pagina_spunti_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_testo_locales_locale_parent_id_unique" ON "pagina_spunti_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_testo_locales_parent_id_idx" ON "pagina_spunti_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_immagine_testo_order_idx" ON "pagina_spunti_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_immagine_testo_parent_id_idx" ON "pagina_spunti_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_immagine_testo_path_idx" ON "pagina_spunti_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_spunti_blocks_immagine_testo_immagine_idx" ON "pagina_spunti_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_immagine_testo_locales_locale_parent_id" ON "pagina_spunti_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_spunti_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_slider_order_idx" ON "pagina_spunti_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_slider_parent_id_idx" ON "pagina_spunti_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_slider_path_idx" ON "pagina_spunti_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_slider_locales_locale_parent_id_unique" ON "pagina_spunti_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_slider_locales_parent_id_idx" ON "pagina_spunti_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_voci_order_idx" ON "pagina_spunti_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_prodotti_voci_parent_id_idx" ON "pagina_spunti_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_voci_prodotto_idx" ON "pagina_spunti_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_voci_immagine_idx" ON "pagina_spunti_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_prodotti_voci_locales_locale_parent_id_" ON "pagina_spunti_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_spunti_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_order_idx" ON "pagina_spunti_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_prodotti_parent_id_idx" ON "pagina_spunti_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_path_idx" ON "pagina_spunti_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_prodotti_locales_locale_parent_id_uniqu" ON "pagina_spunti_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_prodotti_locales_parent_id_idx" ON "pagina_spunti_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_citazione_order_idx" ON "pagina_spunti_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_citazione_parent_id_idx" ON "pagina_spunti_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_citazione_path_idx" ON "pagina_spunti_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_citazione_locales_locale_parent_id_uniq" ON "pagina_spunti_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_citazione_locales_parent_id_idx" ON "pagina_spunti_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_domande_voci_order_idx" ON "pagina_spunti_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_domande_voci_parent_id_idx" ON "pagina_spunti_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_domande_voci_locales_locale_parent_id_u" ON "pagina_spunti_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_domande_voci_locales_parent_id_idx" ON "pagina_spunti_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_domande_order_idx" ON "pagina_spunti_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_domande_parent_id_idx" ON "pagina_spunti_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_domande_path_idx" ON "pagina_spunti_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_domande_locales_locale_parent_id_unique" ON "pagina_spunti_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_domande_locales_parent_id_idx" ON "pagina_spunti_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_invito_order_idx" ON "pagina_spunti_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_invito_parent_id_idx" ON "pagina_spunti_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_invito_path_idx" ON "pagina_spunti_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_invito_locales_locale_parent_id_unique" ON "pagina_spunti_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_invito_locales_parent_id_idx" ON "pagina_spunti_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_rels_order_idx" ON "pagina_spunti_rels" USING btree ("order");
  CREATE INDEX "pagina_spunti_rels_parent_idx" ON "pagina_spunti_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_spunti_rels_path_idx" ON "pagina_spunti_rels" USING btree ("path");
  CREATE INDEX "pagina_spunti_rels_media_id_idx" ON "pagina_spunti_rels" USING btree ("media_id");
  CREATE INDEX "pagina_journal_blocks_testo_order_idx" ON "pagina_journal_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_testo_parent_id_idx" ON "pagina_journal_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_testo_path_idx" ON "pagina_journal_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_testo_locales_locale_parent_id_unique" ON "pagina_journal_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_testo_locales_parent_id_idx" ON "pagina_journal_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_immagine_testo_order_idx" ON "pagina_journal_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_immagine_testo_parent_id_idx" ON "pagina_journal_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_immagine_testo_path_idx" ON "pagina_journal_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_journal_blocks_immagine_testo_immagine_idx" ON "pagina_journal_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_journal_blocks_immagine_testo_locales_locale_parent_i" ON "pagina_journal_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_journal_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_slider_order_idx" ON "pagina_journal_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_slider_parent_id_idx" ON "pagina_journal_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_slider_path_idx" ON "pagina_journal_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_slider_locales_locale_parent_id_unique" ON "pagina_journal_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_slider_locales_parent_id_idx" ON "pagina_journal_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_voci_order_idx" ON "pagina_journal_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_prodotti_voci_parent_id_idx" ON "pagina_journal_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_voci_prodotto_idx" ON "pagina_journal_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_voci_immagine_idx" ON "pagina_journal_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_journal_blocks_prodotti_voci_locales_locale_parent_id" ON "pagina_journal_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_journal_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_order_idx" ON "pagina_journal_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_prodotti_parent_id_idx" ON "pagina_journal_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_path_idx" ON "pagina_journal_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_prodotti_locales_locale_parent_id_uniq" ON "pagina_journal_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_prodotti_locales_parent_id_idx" ON "pagina_journal_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_citazione_order_idx" ON "pagina_journal_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_citazione_parent_id_idx" ON "pagina_journal_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_citazione_path_idx" ON "pagina_journal_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_citazione_locales_locale_parent_id_uni" ON "pagina_journal_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_citazione_locales_parent_id_idx" ON "pagina_journal_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_domande_voci_order_idx" ON "pagina_journal_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_domande_voci_parent_id_idx" ON "pagina_journal_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_journal_blocks_domande_voci_locales_locale_parent_id_" ON "pagina_journal_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_domande_voci_locales_parent_id_idx" ON "pagina_journal_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_domande_order_idx" ON "pagina_journal_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_domande_parent_id_idx" ON "pagina_journal_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_domande_path_idx" ON "pagina_journal_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_domande_locales_locale_parent_id_uniqu" ON "pagina_journal_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_domande_locales_parent_id_idx" ON "pagina_journal_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_invito_order_idx" ON "pagina_journal_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_invito_parent_id_idx" ON "pagina_journal_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_invito_path_idx" ON "pagina_journal_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_invito_locales_locale_parent_id_unique" ON "pagina_journal_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_invito_locales_parent_id_idx" ON "pagina_journal_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_seo_seo_immagine_idx" ON "pagina_journal" USING btree ("seo_immagine_id");
  CREATE INDEX "pagina_journal__status_idx" ON "pagina_journal" USING btree ("_status");
  CREATE UNIQUE INDEX "pagina_journal_locales_locale_parent_id_unique" ON "pagina_journal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_locales_parent_id_idx" ON "pagina_journal_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_rels_order_idx" ON "pagina_journal_rels" USING btree ("order");
  CREATE INDEX "pagina_journal_rels_parent_idx" ON "pagina_journal_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_journal_rels_path_idx" ON "pagina_journal_rels" USING btree ("path");
  CREATE INDEX "pagina_journal_rels_media_id_idx" ON "pagina_journal_rels" USING btree ("media_id");
  CREATE INDEX "_pagina_journal_v_blocks_testo_order_idx" ON "_pagina_journal_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_testo_parent_id_idx" ON "_pagina_journal_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_testo_path_idx" ON "_pagina_journal_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_testo_locales_locale_parent_id_uniq" ON "_pagina_journal_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_testo_locales_parent_id_idx" ON "_pagina_journal_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_immagine_testo_order_idx" ON "_pagina_journal_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_immagine_testo_parent_id_idx" ON "_pagina_journal_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_immagine_testo_path_idx" ON "_pagina_journal_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_pagina_journal_v_blocks_immagine_testo_immagine_idx" ON "_pagina_journal_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_immagine_testo_locales_locale_paren" ON "_pagina_journal_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_immagine_testo_locales_parent_i_idx" ON "_pagina_journal_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_slider_order_idx" ON "_pagina_journal_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_slider_parent_id_idx" ON "_pagina_journal_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_slider_path_idx" ON "_pagina_journal_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_slider_locales_locale_parent_id_uni" ON "_pagina_journal_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_slider_locales_parent_id_idx" ON "_pagina_journal_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_voci_order_idx" ON "_pagina_journal_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_voci_parent_id_idx" ON "_pagina_journal_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_voci_prodotto_idx" ON "_pagina_journal_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_voci_immagine_idx" ON "_pagina_journal_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_prodotti_voci_locales_locale_parent" ON "_pagina_journal_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_pagina_journal_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_order_idx" ON "_pagina_journal_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_parent_id_idx" ON "_pagina_journal_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_path_idx" ON "_pagina_journal_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_prodotti_locales_locale_parent_id_u" ON "_pagina_journal_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_prodotti_locales_parent_id_idx" ON "_pagina_journal_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_citazione_order_idx" ON "_pagina_journal_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_citazione_parent_id_idx" ON "_pagina_journal_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_citazione_path_idx" ON "_pagina_journal_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_citazione_locales_locale_parent_id_" ON "_pagina_journal_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_citazione_locales_parent_id_idx" ON "_pagina_journal_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_domande_voci_order_idx" ON "_pagina_journal_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_domande_voci_parent_id_idx" ON "_pagina_journal_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_domande_voci_locales_locale_parent_" ON "_pagina_journal_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_domande_voci_locales_parent_id_idx" ON "_pagina_journal_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_domande_order_idx" ON "_pagina_journal_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_domande_parent_id_idx" ON "_pagina_journal_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_domande_path_idx" ON "_pagina_journal_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_domande_locales_locale_parent_id_un" ON "_pagina_journal_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_domande_locales_parent_id_idx" ON "_pagina_journal_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_invito_order_idx" ON "_pagina_journal_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_invito_parent_id_idx" ON "_pagina_journal_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_invito_path_idx" ON "_pagina_journal_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_invito_locales_locale_parent_id_uni" ON "_pagina_journal_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_invito_locales_parent_id_idx" ON "_pagina_journal_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_version_seo_version_seo_immagine_idx" ON "_pagina_journal_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_pagina_journal_v_version_version__status_idx" ON "_pagina_journal_v" USING btree ("version__status");
  CREATE INDEX "_pagina_journal_v_created_at_idx" ON "_pagina_journal_v" USING btree ("created_at");
  CREATE INDEX "_pagina_journal_v_updated_at_idx" ON "_pagina_journal_v" USING btree ("updated_at");
  CREATE INDEX "_pagina_journal_v_snapshot_idx" ON "_pagina_journal_v" USING btree ("snapshot");
  CREATE INDEX "_pagina_journal_v_published_locale_idx" ON "_pagina_journal_v" USING btree ("published_locale");
  CREATE INDEX "_pagina_journal_v_latest_idx" ON "_pagina_journal_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pagina_journal_v_locales_locale_parent_id_unique" ON "_pagina_journal_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_locales_parent_id_idx" ON "_pagina_journal_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_rels_order_idx" ON "_pagina_journal_v_rels" USING btree ("order");
  CREATE INDEX "_pagina_journal_v_rels_parent_idx" ON "_pagina_journal_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pagina_journal_v_rels_path_idx" ON "_pagina_journal_v_rels" USING btree ("path");
  CREATE INDEX "_pagina_journal_v_rels_media_id_idx" ON "_pagina_journal_v_rels" USING btree ("media_id");
  ALTER TABLE "prodotti_rels" ADD CONSTRAINT "prodotti_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_rels" ADD CONSTRAINT "_prodotti_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_rels" ADD CONSTRAINT "spunti_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_rels" ADD CONSTRAINT "_spunti_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articoli_fk" FOREIGN KEY ("articoli_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spazi_foto_fk" FOREIGN KEY ("spazi_foto_id") REFERENCES "public"."spazi_foto"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_rels_media_id_idx" ON "prodotti_rels" USING btree ("media_id");
  CREATE INDEX "_prodotti_v_rels_media_id_idx" ON "_prodotti_v_rels" USING btree ("media_id");
  CREATE INDEX "spunti_rels_media_id_idx" ON "spunti_rels" USING btree ("media_id");
  CREATE INDEX "_spunti_v_rels_media_id_idx" ON "_spunti_v_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_articoli_id_idx" ON "payload_locked_documents_rels" USING btree ("articoli_id");
  CREATE INDEX "payload_locked_documents_rels_spazi_foto_id_idx" ON "payload_locked_documents_rels" USING btree ("spazi_foto_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodotti_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_version_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_version_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spazi_foto" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spazi_foto_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ai" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prodotti_blocks_testo" CASCADE;
  DROP TABLE "prodotti_blocks_testo_locales" CASCADE;
  DROP TABLE "prodotti_blocks_immagine_testo" CASCADE;
  DROP TABLE "prodotti_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "prodotti_blocks_slider" CASCADE;
  DROP TABLE "prodotti_blocks_slider_locales" CASCADE;
  DROP TABLE "prodotti_blocks_prodotti_voci" CASCADE;
  DROP TABLE "prodotti_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "prodotti_blocks_prodotti" CASCADE;
  DROP TABLE "prodotti_blocks_prodotti_locales" CASCADE;
  DROP TABLE "prodotti_blocks_citazione" CASCADE;
  DROP TABLE "prodotti_blocks_citazione_locales" CASCADE;
  DROP TABLE "prodotti_blocks_domande_voci" CASCADE;
  DROP TABLE "prodotti_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "prodotti_blocks_domande" CASCADE;
  DROP TABLE "prodotti_blocks_domande_locales" CASCADE;
  DROP TABLE "prodotti_blocks_invito" CASCADE;
  DROP TABLE "prodotti_blocks_invito_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_testo" CASCADE;
  DROP TABLE "_prodotti_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_prodotti_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_slider" CASCADE;
  DROP TABLE "_prodotti_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_prodotti_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_prodotti" CASCADE;
  DROP TABLE "_prodotti_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_citazione" CASCADE;
  DROP TABLE "_prodotti_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_prodotti_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_domande" CASCADE;
  DROP TABLE "_prodotti_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_invito" CASCADE;
  DROP TABLE "_prodotti_v_blocks_invito_locales" CASCADE;
  DROP TABLE "case_history_blocks_testo" CASCADE;
  DROP TABLE "case_history_blocks_testo_locales" CASCADE;
  DROP TABLE "case_history_blocks_immagine_testo" CASCADE;
  DROP TABLE "case_history_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "case_history_blocks_slider" CASCADE;
  DROP TABLE "case_history_blocks_slider_locales" CASCADE;
  DROP TABLE "case_history_blocks_prodotti_voci" CASCADE;
  DROP TABLE "case_history_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "case_history_blocks_prodotti" CASCADE;
  DROP TABLE "case_history_blocks_prodotti_locales" CASCADE;
  DROP TABLE "case_history_blocks_citazione" CASCADE;
  DROP TABLE "case_history_blocks_citazione_locales" CASCADE;
  DROP TABLE "case_history_blocks_domande_voci" CASCADE;
  DROP TABLE "case_history_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "case_history_blocks_domande" CASCADE;
  DROP TABLE "case_history_blocks_domande_locales" CASCADE;
  DROP TABLE "case_history_blocks_invito" CASCADE;
  DROP TABLE "case_history_blocks_invito_locales" CASCADE;
  DROP TABLE "case_history_rels" CASCADE;
  DROP TABLE "_case_history_v_blocks_testo" CASCADE;
  DROP TABLE "_case_history_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_case_history_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_slider" CASCADE;
  DROP TABLE "_case_history_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_case_history_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_prodotti" CASCADE;
  DROP TABLE "_case_history_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_citazione" CASCADE;
  DROP TABLE "_case_history_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_case_history_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_domande" CASCADE;
  DROP TABLE "_case_history_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_invito" CASCADE;
  DROP TABLE "_case_history_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_case_history_v_rels" CASCADE;
  DROP TABLE "spunti_blocks_testo" CASCADE;
  DROP TABLE "spunti_blocks_testo_locales" CASCADE;
  DROP TABLE "spunti_blocks_immagine_testo" CASCADE;
  DROP TABLE "spunti_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "spunti_blocks_slider" CASCADE;
  DROP TABLE "spunti_blocks_slider_locales" CASCADE;
  DROP TABLE "spunti_blocks_prodotti_voci" CASCADE;
  DROP TABLE "spunti_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "spunti_blocks_prodotti" CASCADE;
  DROP TABLE "spunti_blocks_prodotti_locales" CASCADE;
  DROP TABLE "spunti_blocks_citazione" CASCADE;
  DROP TABLE "spunti_blocks_citazione_locales" CASCADE;
  DROP TABLE "spunti_blocks_domande_voci" CASCADE;
  DROP TABLE "spunti_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "spunti_blocks_domande" CASCADE;
  DROP TABLE "spunti_blocks_domande_locales" CASCADE;
  DROP TABLE "spunti_blocks_invito" CASCADE;
  DROP TABLE "spunti_blocks_invito_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_testo" CASCADE;
  DROP TABLE "_spunti_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_spunti_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_slider" CASCADE;
  DROP TABLE "_spunti_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_spunti_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_prodotti" CASCADE;
  DROP TABLE "_spunti_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_citazione" CASCADE;
  DROP TABLE "_spunti_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_spunti_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_domande" CASCADE;
  DROP TABLE "_spunti_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_invito" CASCADE;
  DROP TABLE "_spunti_v_blocks_invito_locales" CASCADE;
  DROP TABLE "articoli_domande" CASCADE;
  DROP TABLE "articoli_domande_locales" CASCADE;
  DROP TABLE "articoli_blocks_testo" CASCADE;
  DROP TABLE "articoli_blocks_testo_locales" CASCADE;
  DROP TABLE "articoli_blocks_immagine_testo" CASCADE;
  DROP TABLE "articoli_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "articoli_blocks_slider" CASCADE;
  DROP TABLE "articoli_blocks_slider_locales" CASCADE;
  DROP TABLE "articoli_blocks_prodotti_voci" CASCADE;
  DROP TABLE "articoli_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "articoli_blocks_prodotti" CASCADE;
  DROP TABLE "articoli_blocks_prodotti_locales" CASCADE;
  DROP TABLE "articoli_blocks_citazione" CASCADE;
  DROP TABLE "articoli_blocks_citazione_locales" CASCADE;
  DROP TABLE "articoli_blocks_domande_voci" CASCADE;
  DROP TABLE "articoli_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "articoli_blocks_domande" CASCADE;
  DROP TABLE "articoli_blocks_domande_locales" CASCADE;
  DROP TABLE "articoli_blocks_invito" CASCADE;
  DROP TABLE "articoli_blocks_invito_locales" CASCADE;
  DROP TABLE "articoli" CASCADE;
  DROP TABLE "articoli_locales" CASCADE;
  DROP TABLE "articoli_rels" CASCADE;
  DROP TABLE "_articoli_v_version_domande" CASCADE;
  DROP TABLE "_articoli_v_version_domande_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_testo" CASCADE;
  DROP TABLE "_articoli_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_articoli_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_slider" CASCADE;
  DROP TABLE "_articoli_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_articoli_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_prodotti" CASCADE;
  DROP TABLE "_articoli_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_citazione" CASCADE;
  DROP TABLE "_articoli_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_articoli_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_domande" CASCADE;
  DROP TABLE "_articoli_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_invito" CASCADE;
  DROP TABLE "_articoli_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_articoli_v" CASCADE;
  DROP TABLE "_articoli_v_locales" CASCADE;
  DROP TABLE "_articoli_v_rels" CASCADE;
  DROP TABLE "designer_blocks_testo" CASCADE;
  DROP TABLE "designer_blocks_testo_locales" CASCADE;
  DROP TABLE "designer_blocks_immagine_testo" CASCADE;
  DROP TABLE "designer_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "designer_blocks_slider" CASCADE;
  DROP TABLE "designer_blocks_slider_locales" CASCADE;
  DROP TABLE "designer_blocks_prodotti_voci" CASCADE;
  DROP TABLE "designer_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "designer_blocks_prodotti" CASCADE;
  DROP TABLE "designer_blocks_prodotti_locales" CASCADE;
  DROP TABLE "designer_blocks_citazione" CASCADE;
  DROP TABLE "designer_blocks_citazione_locales" CASCADE;
  DROP TABLE "designer_blocks_domande_voci" CASCADE;
  DROP TABLE "designer_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "designer_blocks_domande" CASCADE;
  DROP TABLE "designer_blocks_domande_locales" CASCADE;
  DROP TABLE "designer_blocks_invito" CASCADE;
  DROP TABLE "designer_blocks_invito_locales" CASCADE;
  DROP TABLE "designer_rels" CASCADE;
  DROP TABLE "_designer_v_blocks_testo" CASCADE;
  DROP TABLE "_designer_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_designer_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_slider" CASCADE;
  DROP TABLE "_designer_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_designer_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_prodotti" CASCADE;
  DROP TABLE "_designer_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_citazione" CASCADE;
  DROP TABLE "_designer_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_designer_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_domande" CASCADE;
  DROP TABLE "_designer_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_invito" CASCADE;
  DROP TABLE "_designer_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_designer_v_rels" CASCADE;
  DROP TABLE "spazi_foto" CASCADE;
  DROP TABLE "spazi_foto_rels" CASCADE;
  DROP TABLE "home_blocks_testo" CASCADE;
  DROP TABLE "home_blocks_testo_locales" CASCADE;
  DROP TABLE "home_blocks_immagine_testo" CASCADE;
  DROP TABLE "home_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "home_blocks_slider" CASCADE;
  DROP TABLE "home_blocks_slider_locales" CASCADE;
  DROP TABLE "home_blocks_prodotti_voci" CASCADE;
  DROP TABLE "home_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "home_blocks_prodotti" CASCADE;
  DROP TABLE "home_blocks_prodotti_locales" CASCADE;
  DROP TABLE "home_blocks_citazione" CASCADE;
  DROP TABLE "home_blocks_citazione_locales" CASCADE;
  DROP TABLE "home_blocks_domande_voci" CASCADE;
  DROP TABLE "home_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "home_blocks_domande" CASCADE;
  DROP TABLE "home_blocks_domande_locales" CASCADE;
  DROP TABLE "home_blocks_invito" CASCADE;
  DROP TABLE "home_blocks_invito_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_blocks_testo" CASCADE;
  DROP TABLE "_home_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_home_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_home_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_home_v_blocks_slider" CASCADE;
  DROP TABLE "_home_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_home_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_home_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_home_v_blocks_prodotti" CASCADE;
  DROP TABLE "_home_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_home_v_blocks_citazione" CASCADE;
  DROP TABLE "_home_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_home_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_home_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_home_v_blocks_domande" CASCADE;
  DROP TABLE "_home_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_home_v_blocks_invito" CASCADE;
  DROP TABLE "_home_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "pagina_designer_blocks_testo" CASCADE;
  DROP TABLE "pagina_designer_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_designer_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_slider" CASCADE;
  DROP TABLE "pagina_designer_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_designer_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_designer_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_citazione" CASCADE;
  DROP TABLE "pagina_designer_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_designer_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_domande" CASCADE;
  DROP TABLE "pagina_designer_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_invito" CASCADE;
  DROP TABLE "pagina_designer_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_designer_rels" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_testo" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_slider" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_citazione" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_domande" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_invito" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_installazioni_rels" CASCADE;
  DROP TABLE "pagina_spunti_blocks_testo" CASCADE;
  DROP TABLE "pagina_spunti_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_spunti_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_slider" CASCADE;
  DROP TABLE "pagina_spunti_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_spunti_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_spunti_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_citazione" CASCADE;
  DROP TABLE "pagina_spunti_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_spunti_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_domande" CASCADE;
  DROP TABLE "pagina_spunti_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_invito" CASCADE;
  DROP TABLE "pagina_spunti_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_spunti_rels" CASCADE;
  DROP TABLE "pagina_journal_blocks_testo" CASCADE;
  DROP TABLE "pagina_journal_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_journal_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_slider" CASCADE;
  DROP TABLE "pagina_journal_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_journal_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_journal_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_citazione" CASCADE;
  DROP TABLE "pagina_journal_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_journal_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_domande" CASCADE;
  DROP TABLE "pagina_journal_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_invito" CASCADE;
  DROP TABLE "pagina_journal_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_journal" CASCADE;
  DROP TABLE "pagina_journal_locales" CASCADE;
  DROP TABLE "pagina_journal_rels" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_testo" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_slider" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_prodotti" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_citazione" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_domande" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_invito" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_pagina_journal_v" CASCADE;
  DROP TABLE "_pagina_journal_v_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_rels" CASCADE;
  DROP TABLE "ai" CASCADE;
  ALTER TABLE "prodotti_rels" DROP CONSTRAINT "prodotti_rels_media_fk";
  
  ALTER TABLE "_prodotti_v_rels" DROP CONSTRAINT "_prodotti_v_rels_media_fk";
  
  ALTER TABLE "spunti_rels" DROP CONSTRAINT "spunti_rels_media_fk";
  
  ALTER TABLE "_spunti_v_rels" DROP CONSTRAINT "_spunti_v_rels_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articoli_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_spazi_foto_fk";
  
  DROP INDEX "prodotti_rels_media_id_idx";
  DROP INDEX "_prodotti_v_rels_media_id_idx";
  DROP INDEX "spunti_rels_media_id_idx";
  DROP INDEX "_spunti_v_rels_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_articoli_id_idx";
  DROP INDEX "payload_locked_documents_rels_spazi_foto_id_idx";
  ALTER TABLE "prodotti_rels" DROP COLUMN "media_id";
  ALTER TABLE "_prodotti_v_rels" DROP COLUMN "media_id";
  ALTER TABLE "spunti_rels" DROP COLUMN "media_id";
  ALTER TABLE "_spunti_v_rels" DROP COLUMN "media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articoli_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "spazi_foto_id";
  DROP TYPE "public"."enum_prodotti_blocks_testo_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_prodotti_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_slider_formato";
  DROP TYPE "public"."enum_prodotti_blocks_slider_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_domande_sfondo";
  DROP TYPE "public"."enum_prodotti_blocks_invito_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__prodotti_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_slider_formato";
  DROP TYPE "public"."enum__prodotti_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_testo_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_case_history_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_slider_formato";
  DROP TYPE "public"."enum_case_history_blocks_slider_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_domande_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_invito_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__case_history_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_slider_formato";
  DROP TYPE "public"."enum__case_history_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_testo_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_spunti_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_slider_formato";
  DROP TYPE "public"."enum_spunti_blocks_slider_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_domande_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_invito_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__spunti_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_slider_formato";
  DROP TYPE "public"."enum__spunti_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_testo_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_articoli_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_slider_formato";
  DROP TYPE "public"."enum_articoli_blocks_slider_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_domande_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_invito_sfondo";
  DROP TYPE "public"."enum_articoli_categoria";
  DROP TYPE "public"."enum_articoli_origine";
  DROP TYPE "public"."enum_articoli_status";
  DROP TYPE "public"."enum__articoli_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__articoli_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_slider_formato";
  DROP TYPE "public"."enum__articoli_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__articoli_v_version_categoria";
  DROP TYPE "public"."enum__articoli_v_version_origine";
  DROP TYPE "public"."enum__articoli_v_version_status";
  DROP TYPE "public"."enum__articoli_v_published_locale";
  DROP TYPE "public"."enum_designer_blocks_testo_sfondo";
  DROP TYPE "public"."enum_designer_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_designer_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_designer_blocks_slider_formato";
  DROP TYPE "public"."enum_designer_blocks_slider_sfondo";
  DROP TYPE "public"."enum_designer_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_designer_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_designer_blocks_domande_sfondo";
  DROP TYPE "public"."enum_designer_blocks_invito_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__designer_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_slider_formato";
  DROP TYPE "public"."enum__designer_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum_home_blocks_testo_sfondo";
  DROP TYPE "public"."enum_home_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_home_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_home_blocks_slider_formato";
  DROP TYPE "public"."enum_home_blocks_slider_sfondo";
  DROP TYPE "public"."enum_home_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_home_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_home_blocks_domande_sfondo";
  DROP TYPE "public"."enum_home_blocks_invito_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__home_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_slider_formato";
  DROP TYPE "public"."enum__home_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_designer_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_designer_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_spunti_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_spunti_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_journal_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_journal_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_journal_status";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_slider_formato";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_version_status";
  DROP TYPE "public"."enum__pagina_journal_v_published_locale";
  DROP TYPE "public"."enum_ai_fornitore_testi";
  DROP TYPE "public"."enum_ai_fornitore_immagini";
  DROP TYPE "public"."enum_ai_lingue_articoli";`)
}
