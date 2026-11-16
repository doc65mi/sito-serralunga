import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_materiali_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_materiali_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_materiali_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__materiali_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__materiali_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__materiali_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__materiali_v_published_locale" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_colori_famiglia" AS ENUM('standard', 'laccato');
  CREATE TYPE "public"."enum_colori_finitura" AS ENUM('lucido', 'opaco');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TABLE "materiali_cifre" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "materiali_cifre_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_capitoli" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "materiali_capitoli_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "materiali_galleria_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_pezzi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar,
  	"fonte" varchar
  );
  
  CREATE TABLE "materiali_pezzi_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_materiali_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_materiali_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_materiali_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_materiali_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_materiali_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "materiali_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_materiali_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_materiali_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_materiali_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_materiali_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "materiali" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"immagine_id" integer,
  	"mostra_colori" boolean DEFAULT false,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_materiali_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "materiali_locales" (
  	"titolo" varchar,
  	"titolo_pagina" varchar,
  	"kicker" varchar,
  	"sottotitolo" varchar,
  	"intro" varchar,
  	"pezzi_titolo" varchar,
  	"colori_titolo" varchar,
  	"colori_nota" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "materiali_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_materiali_v_version_cifre" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_version_cifre_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_version_capitoli" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_version_capitoli_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_version_galleria_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_version_pezzi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar,
  	"fonte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_version_pezzi_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__materiali_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__materiali_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__materiali_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__materiali_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__materiali_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__materiali_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__materiali_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__materiali_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__materiali_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_immagine_id" integer,
  	"version_mostra_colori" boolean DEFAULT false,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__materiali_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__materiali_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_materiali_v_locales" (
  	"version_titolo" varchar,
  	"version_titolo_pagina" varchar,
  	"version_kicker" varchar,
  	"version_sottotitolo" varchar,
  	"version_intro" varchar,
  	"version_pezzi_titolo" varchar,
  	"version_colori_titolo" varchar,
  	"version_colori_nota" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_materiali_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "colori" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"codice" varchar NOT NULL,
  	"famiglia" "enum_colori_famiglia" DEFAULT 'standard' NOT NULL,
  	"finitura" "enum_colori_finitura",
  	"metallizzato" boolean DEFAULT false,
  	"campione_id" integer,
  	"ordine" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "colori_locales" (
  	"nome" varchar NOT NULL,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_materiali_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_materiali_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_materiali_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_materiali_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_materiali_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_materiali_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_materiali_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_materiali_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_materiali_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_materiali_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_materiali_locales" (
  	"kicker" varchar DEFAULT 'Materiali',
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
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
  
  CREATE TABLE "pagina_materiali_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "materiali_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "colori_id" integer;
  ALTER TABLE "materiali_cifre" ADD CONSTRAINT "materiali_cifre_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_cifre_locales" ADD CONSTRAINT "materiali_cifre_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_cifre"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_capitoli" ADD CONSTRAINT "materiali_capitoli_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_capitoli" ADD CONSTRAINT "materiali_capitoli_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_capitoli_locales" ADD CONSTRAINT "materiali_capitoli_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_capitoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_galleria" ADD CONSTRAINT "materiali_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_galleria" ADD CONSTRAINT "materiali_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_galleria_locales" ADD CONSTRAINT "materiali_galleria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_galleria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_pezzi" ADD CONSTRAINT "materiali_pezzi_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_pezzi" ADD CONSTRAINT "materiali_pezzi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_pezzi_locales" ADD CONSTRAINT "materiali_pezzi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_pezzi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_testo" ADD CONSTRAINT "materiali_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_testo_locales" ADD CONSTRAINT "materiali_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_immagine_testo" ADD CONSTRAINT "materiali_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_blocks_immagine_testo" ADD CONSTRAINT "materiali_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_immagine_testo_locales" ADD CONSTRAINT "materiali_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_slider" ADD CONSTRAINT "materiali_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_slider_locales" ADD CONSTRAINT "materiali_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti_voci" ADD CONSTRAINT "materiali_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti_voci" ADD CONSTRAINT "materiali_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti_voci" ADD CONSTRAINT "materiali_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti_voci_locales" ADD CONSTRAINT "materiali_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti" ADD CONSTRAINT "materiali_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_prodotti_locales" ADD CONSTRAINT "materiali_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_citazione" ADD CONSTRAINT "materiali_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_citazione_locales" ADD CONSTRAINT "materiali_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_domande_voci" ADD CONSTRAINT "materiali_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_domande_voci_locales" ADD CONSTRAINT "materiali_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_domande" ADD CONSTRAINT "materiali_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_domande_locales" ADD CONSTRAINT "materiali_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_invito" ADD CONSTRAINT "materiali_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_invito_locales" ADD CONSTRAINT "materiali_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali" ADD CONSTRAINT "materiali_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali" ADD CONSTRAINT "materiali_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiali_locales" ADD CONSTRAINT "materiali_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_rels" ADD CONSTRAINT "materiali_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_rels" ADD CONSTRAINT "materiali_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_cifre" ADD CONSTRAINT "_materiali_v_version_cifre_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_cifre_locales" ADD CONSTRAINT "_materiali_v_version_cifre_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_version_cifre"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_capitoli" ADD CONSTRAINT "_materiali_v_version_capitoli_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_capitoli" ADD CONSTRAINT "_materiali_v_version_capitoli_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_capitoli_locales" ADD CONSTRAINT "_materiali_v_version_capitoli_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_version_capitoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_galleria" ADD CONSTRAINT "_materiali_v_version_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_galleria" ADD CONSTRAINT "_materiali_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_galleria_locales" ADD CONSTRAINT "_materiali_v_version_galleria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_version_galleria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_pezzi" ADD CONSTRAINT "_materiali_v_version_pezzi_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_pezzi" ADD CONSTRAINT "_materiali_v_version_pezzi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_version_pezzi_locales" ADD CONSTRAINT "_materiali_v_version_pezzi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_version_pezzi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_testo" ADD CONSTRAINT "_materiali_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_testo_locales" ADD CONSTRAINT "_materiali_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_immagine_testo" ADD CONSTRAINT "_materiali_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_immagine_testo" ADD CONSTRAINT "_materiali_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_materiali_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_slider" ADD CONSTRAINT "_materiali_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_slider_locales" ADD CONSTRAINT "_materiali_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci" ADD CONSTRAINT "_materiali_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci" ADD CONSTRAINT "_materiali_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci" ADD CONSTRAINT "_materiali_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_materiali_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti" ADD CONSTRAINT "_materiali_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_prodotti_locales" ADD CONSTRAINT "_materiali_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_citazione" ADD CONSTRAINT "_materiali_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_citazione_locales" ADD CONSTRAINT "_materiali_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_domande_voci" ADD CONSTRAINT "_materiali_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_domande_voci_locales" ADD CONSTRAINT "_materiali_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_domande" ADD CONSTRAINT "_materiali_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_domande_locales" ADD CONSTRAINT "_materiali_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_invito" ADD CONSTRAINT "_materiali_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_invito_locales" ADD CONSTRAINT "_materiali_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v" ADD CONSTRAINT "_materiali_v_parent_id_materiali_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."materiali"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v" ADD CONSTRAINT "_materiali_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v" ADD CONSTRAINT "_materiali_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_materiali_v_locales" ADD CONSTRAINT "_materiali_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_rels" ADD CONSTRAINT "_materiali_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_rels" ADD CONSTRAINT "_materiali_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "colori" ADD CONSTRAINT "colori_campione_id_media_id_fk" FOREIGN KEY ("campione_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "colori_locales" ADD CONSTRAINT "colori_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."colori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_testo" ADD CONSTRAINT "pagina_materiali_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_testo_locales" ADD CONSTRAINT "pagina_materiali_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_immagine_testo" ADD CONSTRAINT "pagina_materiali_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_immagine_testo" ADD CONSTRAINT "pagina_materiali_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_materiali_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_slider" ADD CONSTRAINT "pagina_materiali_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_slider_locales" ADD CONSTRAINT "pagina_materiali_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_prodotti_locales" ADD CONSTRAINT "pagina_materiali_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_citazione" ADD CONSTRAINT "pagina_materiali_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_citazione_locales" ADD CONSTRAINT "pagina_materiali_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_domande_voci" ADD CONSTRAINT "pagina_materiali_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_materiali_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_domande" ADD CONSTRAINT "pagina_materiali_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_domande_locales" ADD CONSTRAINT "pagina_materiali_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_invito" ADD CONSTRAINT "pagina_materiali_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_invito_locales" ADD CONSTRAINT "pagina_materiali_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali" ADD CONSTRAINT "pagina_materiali_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_materiali" ADD CONSTRAINT "pagina_materiali_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_materiali_locales" ADD CONSTRAINT "pagina_materiali_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_rels" ADD CONSTRAINT "pagina_materiali_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_rels" ADD CONSTRAINT "pagina_materiali_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "materiali_cifre_order_idx" ON "materiali_cifre" USING btree ("_order");
  CREATE INDEX "materiali_cifre_parent_id_idx" ON "materiali_cifre" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "materiali_cifre_locales_locale_parent_id_unique" ON "materiali_cifre_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_cifre_locales_parent_id_idx" ON "materiali_cifre_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_capitoli_order_idx" ON "materiali_capitoli" USING btree ("_order");
  CREATE INDEX "materiali_capitoli_parent_id_idx" ON "materiali_capitoli" USING btree ("_parent_id");
  CREATE INDEX "materiali_capitoli_immagine_idx" ON "materiali_capitoli" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "materiali_capitoli_locales_locale_parent_id_unique" ON "materiali_capitoli_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_capitoli_locales_parent_id_idx" ON "materiali_capitoli_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_galleria_order_idx" ON "materiali_galleria" USING btree ("_order");
  CREATE INDEX "materiali_galleria_parent_id_idx" ON "materiali_galleria" USING btree ("_parent_id");
  CREATE INDEX "materiali_galleria_immagine_idx" ON "materiali_galleria" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "materiali_galleria_locales_locale_parent_id_unique" ON "materiali_galleria_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_galleria_locales_parent_id_idx" ON "materiali_galleria_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_pezzi_order_idx" ON "materiali_pezzi" USING btree ("_order");
  CREATE INDEX "materiali_pezzi_parent_id_idx" ON "materiali_pezzi" USING btree ("_parent_id");
  CREATE INDEX "materiali_pezzi_immagine_idx" ON "materiali_pezzi" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "materiali_pezzi_locales_locale_parent_id_unique" ON "materiali_pezzi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_pezzi_locales_parent_id_idx" ON "materiali_pezzi_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_testo_order_idx" ON "materiali_blocks_testo" USING btree ("_order");
  CREATE INDEX "materiali_blocks_testo_parent_id_idx" ON "materiali_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_testo_path_idx" ON "materiali_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_testo_locales_locale_parent_id_unique" ON "materiali_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_testo_locales_parent_id_idx" ON "materiali_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_immagine_testo_order_idx" ON "materiali_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "materiali_blocks_immagine_testo_parent_id_idx" ON "materiali_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_immagine_testo_path_idx" ON "materiali_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "materiali_blocks_immagine_testo_immagine_idx" ON "materiali_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "materiali_blocks_immagine_testo_locales_locale_parent_id_uni" ON "materiali_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_immagine_testo_locales_parent_id_idx" ON "materiali_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_slider_order_idx" ON "materiali_blocks_slider" USING btree ("_order");
  CREATE INDEX "materiali_blocks_slider_parent_id_idx" ON "materiali_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_slider_path_idx" ON "materiali_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_slider_locales_locale_parent_id_unique" ON "materiali_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_slider_locales_parent_id_idx" ON "materiali_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_voci_order_idx" ON "materiali_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "materiali_blocks_prodotti_voci_parent_id_idx" ON "materiali_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_voci_prodotto_idx" ON "materiali_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "materiali_blocks_prodotti_voci_immagine_idx" ON "materiali_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "materiali_blocks_prodotti_voci_locales_locale_parent_id_uniq" ON "materiali_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_voci_locales_parent_id_idx" ON "materiali_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_order_idx" ON "materiali_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "materiali_blocks_prodotti_parent_id_idx" ON "materiali_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_path_idx" ON "materiali_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_prodotti_locales_locale_parent_id_unique" ON "materiali_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_prodotti_locales_parent_id_idx" ON "materiali_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_citazione_order_idx" ON "materiali_blocks_citazione" USING btree ("_order");
  CREATE INDEX "materiali_blocks_citazione_parent_id_idx" ON "materiali_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_citazione_path_idx" ON "materiali_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_citazione_locales_locale_parent_id_unique" ON "materiali_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_citazione_locales_parent_id_idx" ON "materiali_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_domande_voci_order_idx" ON "materiali_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "materiali_blocks_domande_voci_parent_id_idx" ON "materiali_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "materiali_blocks_domande_voci_locales_locale_parent_id_uniqu" ON "materiali_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_domande_voci_locales_parent_id_idx" ON "materiali_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_domande_order_idx" ON "materiali_blocks_domande" USING btree ("_order");
  CREATE INDEX "materiali_blocks_domande_parent_id_idx" ON "materiali_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_domande_path_idx" ON "materiali_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_domande_locales_locale_parent_id_unique" ON "materiali_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_domande_locales_parent_id_idx" ON "materiali_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_invito_order_idx" ON "materiali_blocks_invito" USING btree ("_order");
  CREATE INDEX "materiali_blocks_invito_parent_id_idx" ON "materiali_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_invito_path_idx" ON "materiali_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_invito_locales_locale_parent_id_unique" ON "materiali_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_invito_locales_parent_id_idx" ON "materiali_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "materiali_slug_idx" ON "materiali" USING btree ("slug");
  CREATE INDEX "materiali_immagine_idx" ON "materiali" USING btree ("immagine_id");
  CREATE INDEX "materiali_seo_seo_immagine_idx" ON "materiali" USING btree ("seo_immagine_id");
  CREATE INDEX "materiali_updated_at_idx" ON "materiali" USING btree ("updated_at");
  CREATE INDEX "materiali_created_at_idx" ON "materiali" USING btree ("created_at");
  CREATE INDEX "materiali__status_idx" ON "materiali" USING btree ("_status");
  CREATE UNIQUE INDEX "materiali_locales_locale_parent_id_unique" ON "materiali_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_locales_parent_id_idx" ON "materiali_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_rels_order_idx" ON "materiali_rels" USING btree ("order");
  CREATE INDEX "materiali_rels_parent_idx" ON "materiali_rels" USING btree ("parent_id");
  CREATE INDEX "materiali_rels_path_idx" ON "materiali_rels" USING btree ("path");
  CREATE INDEX "materiali_rels_media_id_idx" ON "materiali_rels" USING btree ("media_id");
  CREATE INDEX "_materiali_v_version_cifre_order_idx" ON "_materiali_v_version_cifre" USING btree ("_order");
  CREATE INDEX "_materiali_v_version_cifre_parent_id_idx" ON "_materiali_v_version_cifre" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_materiali_v_version_cifre_locales_locale_parent_id_unique" ON "_materiali_v_version_cifre_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_version_cifre_locales_parent_id_idx" ON "_materiali_v_version_cifre_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_capitoli_order_idx" ON "_materiali_v_version_capitoli" USING btree ("_order");
  CREATE INDEX "_materiali_v_version_capitoli_parent_id_idx" ON "_materiali_v_version_capitoli" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_capitoli_immagine_idx" ON "_materiali_v_version_capitoli" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_materiali_v_version_capitoli_locales_locale_parent_id_uniqu" ON "_materiali_v_version_capitoli_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_version_capitoli_locales_parent_id_idx" ON "_materiali_v_version_capitoli_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_galleria_order_idx" ON "_materiali_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_materiali_v_version_galleria_parent_id_idx" ON "_materiali_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_galleria_immagine_idx" ON "_materiali_v_version_galleria" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_materiali_v_version_galleria_locales_locale_parent_id_uniqu" ON "_materiali_v_version_galleria_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_version_galleria_locales_parent_id_idx" ON "_materiali_v_version_galleria_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_pezzi_order_idx" ON "_materiali_v_version_pezzi" USING btree ("_order");
  CREATE INDEX "_materiali_v_version_pezzi_parent_id_idx" ON "_materiali_v_version_pezzi" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_version_pezzi_immagine_idx" ON "_materiali_v_version_pezzi" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_materiali_v_version_pezzi_locales_locale_parent_id_unique" ON "_materiali_v_version_pezzi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_version_pezzi_locales_parent_id_idx" ON "_materiali_v_version_pezzi_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_testo_order_idx" ON "_materiali_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_testo_parent_id_idx" ON "_materiali_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_testo_path_idx" ON "_materiali_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_testo_locales_locale_parent_id_unique" ON "_materiali_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_testo_locales_parent_id_idx" ON "_materiali_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_immagine_testo_order_idx" ON "_materiali_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_immagine_testo_parent_id_idx" ON "_materiali_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_immagine_testo_path_idx" ON "_materiali_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_materiali_v_blocks_immagine_testo_immagine_idx" ON "_materiali_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_materiali_v_blocks_immagine_testo_locales_locale_parent_id_" ON "_materiali_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_immagine_testo_locales_parent_id_idx" ON "_materiali_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_slider_order_idx" ON "_materiali_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_slider_parent_id_idx" ON "_materiali_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_slider_path_idx" ON "_materiali_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_slider_locales_locale_parent_id_unique" ON "_materiali_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_slider_locales_parent_id_idx" ON "_materiali_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_voci_order_idx" ON "_materiali_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_prodotti_voci_parent_id_idx" ON "_materiali_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_voci_prodotto_idx" ON "_materiali_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_voci_immagine_idx" ON "_materiali_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_materiali_v_blocks_prodotti_voci_locales_locale_parent_id_u" ON "_materiali_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_materiali_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_order_idx" ON "_materiali_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_prodotti_parent_id_idx" ON "_materiali_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_path_idx" ON "_materiali_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_materiali_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_prodotti_locales_parent_id_idx" ON "_materiali_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_citazione_order_idx" ON "_materiali_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_citazione_parent_id_idx" ON "_materiali_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_citazione_path_idx" ON "_materiali_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_citazione_locales_locale_parent_id_uniqu" ON "_materiali_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_citazione_locales_parent_id_idx" ON "_materiali_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_domande_voci_order_idx" ON "_materiali_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_domande_voci_parent_id_idx" ON "_materiali_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_materiali_v_blocks_domande_voci_locales_locale_parent_id_un" ON "_materiali_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_domande_voci_locales_parent_id_idx" ON "_materiali_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_domande_order_idx" ON "_materiali_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_domande_parent_id_idx" ON "_materiali_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_domande_path_idx" ON "_materiali_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_domande_locales_locale_parent_id_unique" ON "_materiali_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_domande_locales_parent_id_idx" ON "_materiali_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_invito_order_idx" ON "_materiali_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_invito_parent_id_idx" ON "_materiali_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_invito_path_idx" ON "_materiali_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_invito_locales_locale_parent_id_unique" ON "_materiali_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_invito_locales_parent_id_idx" ON "_materiali_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_parent_idx" ON "_materiali_v" USING btree ("parent_id");
  CREATE INDEX "_materiali_v_version_version_slug_idx" ON "_materiali_v" USING btree ("version_slug");
  CREATE INDEX "_materiali_v_version_version_immagine_idx" ON "_materiali_v" USING btree ("version_immagine_id");
  CREATE INDEX "_materiali_v_version_seo_version_seo_immagine_idx" ON "_materiali_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_materiali_v_version_version_updated_at_idx" ON "_materiali_v" USING btree ("version_updated_at");
  CREATE INDEX "_materiali_v_version_version_created_at_idx" ON "_materiali_v" USING btree ("version_created_at");
  CREATE INDEX "_materiali_v_version_version__status_idx" ON "_materiali_v" USING btree ("version__status");
  CREATE INDEX "_materiali_v_created_at_idx" ON "_materiali_v" USING btree ("created_at");
  CREATE INDEX "_materiali_v_updated_at_idx" ON "_materiali_v" USING btree ("updated_at");
  CREATE INDEX "_materiali_v_snapshot_idx" ON "_materiali_v" USING btree ("snapshot");
  CREATE INDEX "_materiali_v_published_locale_idx" ON "_materiali_v" USING btree ("published_locale");
  CREATE INDEX "_materiali_v_latest_idx" ON "_materiali_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_materiali_v_locales_locale_parent_id_unique" ON "_materiali_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_locales_parent_id_idx" ON "_materiali_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_rels_order_idx" ON "_materiali_v_rels" USING btree ("order");
  CREATE INDEX "_materiali_v_rels_parent_idx" ON "_materiali_v_rels" USING btree ("parent_id");
  CREATE INDEX "_materiali_v_rels_path_idx" ON "_materiali_v_rels" USING btree ("path");
  CREATE INDEX "_materiali_v_rels_media_id_idx" ON "_materiali_v_rels" USING btree ("media_id");
  CREATE INDEX "colori_codice_idx" ON "colori" USING btree ("codice");
  CREATE INDEX "colori_campione_idx" ON "colori" USING btree ("campione_id");
  CREATE INDEX "colori_updated_at_idx" ON "colori" USING btree ("updated_at");
  CREATE INDEX "colori_created_at_idx" ON "colori" USING btree ("created_at");
  CREATE UNIQUE INDEX "colori_locales_locale_parent_id_unique" ON "colori_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "colori_locales_parent_id_idx" ON "colori_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_testo_order_idx" ON "pagina_materiali_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_testo_parent_id_idx" ON "pagina_materiali_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_testo_path_idx" ON "pagina_materiali_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_testo_locales_locale_parent_id_uniqu" ON "pagina_materiali_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_testo_locales_parent_id_idx" ON "pagina_materiali_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_immagine_testo_order_idx" ON "pagina_materiali_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_immagine_testo_parent_id_idx" ON "pagina_materiali_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_immagine_testo_path_idx" ON "pagina_materiali_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_materiali_blocks_immagine_testo_immagine_idx" ON "pagina_materiali_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_immagine_testo_locales_locale_parent" ON "pagina_materiali_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_materiali_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_slider_order_idx" ON "pagina_materiali_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_slider_parent_id_idx" ON "pagina_materiali_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_slider_path_idx" ON "pagina_materiali_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_slider_locales_locale_parent_id_uniq" ON "pagina_materiali_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_slider_locales_parent_id_idx" ON "pagina_materiali_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_voci_order_idx" ON "pagina_materiali_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_prodotti_voci_parent_id_idx" ON "pagina_materiali_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_voci_prodotto_idx" ON "pagina_materiali_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_voci_immagine_idx" ON "pagina_materiali_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_prodotti_voci_locales_locale_parent_" ON "pagina_materiali_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_materiali_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_order_idx" ON "pagina_materiali_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_prodotti_parent_id_idx" ON "pagina_materiali_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_path_idx" ON "pagina_materiali_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_prodotti_locales_locale_parent_id_un" ON "pagina_materiali_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_prodotti_locales_parent_id_idx" ON "pagina_materiali_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_citazione_order_idx" ON "pagina_materiali_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_citazione_parent_id_idx" ON "pagina_materiali_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_citazione_path_idx" ON "pagina_materiali_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_citazione_locales_locale_parent_id_u" ON "pagina_materiali_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_citazione_locales_parent_id_idx" ON "pagina_materiali_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_domande_voci_order_idx" ON "pagina_materiali_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_domande_voci_parent_id_idx" ON "pagina_materiali_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_domande_voci_locales_locale_parent_i" ON "pagina_materiali_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_domande_voci_locales_parent_id_idx" ON "pagina_materiali_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_domande_order_idx" ON "pagina_materiali_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_domande_parent_id_idx" ON "pagina_materiali_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_domande_path_idx" ON "pagina_materiali_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_domande_locales_locale_parent_id_uni" ON "pagina_materiali_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_domande_locales_parent_id_idx" ON "pagina_materiali_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_invito_order_idx" ON "pagina_materiali_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_invito_parent_id_idx" ON "pagina_materiali_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_invito_path_idx" ON "pagina_materiali_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_invito_locales_locale_parent_id_uniq" ON "pagina_materiali_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_invito_locales_parent_id_idx" ON "pagina_materiali_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_immagine_idx" ON "pagina_materiali" USING btree ("immagine_id");
  CREATE INDEX "pagina_materiali_seo_seo_immagine_idx" ON "pagina_materiali" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_materiali_locales_locale_parent_id_unique" ON "pagina_materiali_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_locales_parent_id_idx" ON "pagina_materiali_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_rels_order_idx" ON "pagina_materiali_rels" USING btree ("order");
  CREATE INDEX "pagina_materiali_rels_parent_idx" ON "pagina_materiali_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_materiali_rels_path_idx" ON "pagina_materiali_rels" USING btree ("path");
  CREATE INDEX "pagina_materiali_rels_media_id_idx" ON "pagina_materiali_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_materiali_fk" FOREIGN KEY ("materiali_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_colori_fk" FOREIGN KEY ("colori_id") REFERENCES "public"."colori"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_materiali_id_idx" ON "payload_locked_documents_rels" USING btree ("materiali_id");
  CREATE INDEX "payload_locked_documents_rels_colori_id_idx" ON "payload_locked_documents_rels" USING btree ("colori_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "materiali_cifre" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_cifre_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_capitoli" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_capitoli_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_galleria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_galleria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_pezzi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_pezzi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_cifre" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_cifre_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_capitoli" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_capitoli_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_galleria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_galleria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_pezzi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_version_pezzi_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "colori" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "colori_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "materiali_cifre" CASCADE;
  DROP TABLE "materiali_cifre_locales" CASCADE;
  DROP TABLE "materiali_capitoli" CASCADE;
  DROP TABLE "materiali_capitoli_locales" CASCADE;
  DROP TABLE "materiali_galleria" CASCADE;
  DROP TABLE "materiali_galleria_locales" CASCADE;
  DROP TABLE "materiali_pezzi" CASCADE;
  DROP TABLE "materiali_pezzi_locales" CASCADE;
  DROP TABLE "materiali_blocks_testo" CASCADE;
  DROP TABLE "materiali_blocks_testo_locales" CASCADE;
  DROP TABLE "materiali_blocks_immagine_testo" CASCADE;
  DROP TABLE "materiali_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "materiali_blocks_slider" CASCADE;
  DROP TABLE "materiali_blocks_slider_locales" CASCADE;
  DROP TABLE "materiali_blocks_prodotti_voci" CASCADE;
  DROP TABLE "materiali_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "materiali_blocks_prodotti" CASCADE;
  DROP TABLE "materiali_blocks_prodotti_locales" CASCADE;
  DROP TABLE "materiali_blocks_citazione" CASCADE;
  DROP TABLE "materiali_blocks_citazione_locales" CASCADE;
  DROP TABLE "materiali_blocks_domande_voci" CASCADE;
  DROP TABLE "materiali_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "materiali_blocks_domande" CASCADE;
  DROP TABLE "materiali_blocks_domande_locales" CASCADE;
  DROP TABLE "materiali_blocks_invito" CASCADE;
  DROP TABLE "materiali_blocks_invito_locales" CASCADE;
  DROP TABLE "materiali" CASCADE;
  DROP TABLE "materiali_locales" CASCADE;
  DROP TABLE "materiali_rels" CASCADE;
  DROP TABLE "_materiali_v_version_cifre" CASCADE;
  DROP TABLE "_materiali_v_version_cifre_locales" CASCADE;
  DROP TABLE "_materiali_v_version_capitoli" CASCADE;
  DROP TABLE "_materiali_v_version_capitoli_locales" CASCADE;
  DROP TABLE "_materiali_v_version_galleria" CASCADE;
  DROP TABLE "_materiali_v_version_galleria_locales" CASCADE;
  DROP TABLE "_materiali_v_version_pezzi" CASCADE;
  DROP TABLE "_materiali_v_version_pezzi_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_testo" CASCADE;
  DROP TABLE "_materiali_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_materiali_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_slider" CASCADE;
  DROP TABLE "_materiali_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_materiali_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_prodotti" CASCADE;
  DROP TABLE "_materiali_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_citazione" CASCADE;
  DROP TABLE "_materiali_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_materiali_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_domande" CASCADE;
  DROP TABLE "_materiali_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_invito" CASCADE;
  DROP TABLE "_materiali_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_materiali_v" CASCADE;
  DROP TABLE "_materiali_v_locales" CASCADE;
  DROP TABLE "_materiali_v_rels" CASCADE;
  DROP TABLE "colori" CASCADE;
  DROP TABLE "colori_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_testo" CASCADE;
  DROP TABLE "pagina_materiali_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_materiali_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_slider" CASCADE;
  DROP TABLE "pagina_materiali_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_materiali_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_materiali_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_citazione" CASCADE;
  DROP TABLE "pagina_materiali_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_materiali_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_domande" CASCADE;
  DROP TABLE "pagina_materiali_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_invito" CASCADE;
  DROP TABLE "pagina_materiali_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_materiali" CASCADE;
  DROP TABLE "pagina_materiali_locales" CASCADE;
  DROP TABLE "pagina_materiali_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_materiali_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_colori_fk";
  
  DROP INDEX "payload_locked_documents_rels_materiali_id_idx";
  DROP INDEX "payload_locked_documents_rels_colori_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "materiali_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "colori_id";
  DROP TYPE "public"."enum_materiali_blocks_testo_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_materiali_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_slider_formato";
  DROP TYPE "public"."enum_materiali_blocks_slider_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_domande_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_invito_sfondo";
  DROP TYPE "public"."enum_materiali_status";
  DROP TYPE "public"."enum__materiali_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__materiali_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_slider_formato";
  DROP TYPE "public"."enum__materiali_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__materiali_v_version_status";
  DROP TYPE "public"."enum__materiali_v_published_locale";
  DROP TYPE "public"."enum_colori_famiglia";
  DROP TYPE "public"."enum_colori_finitura";
  DROP TYPE "public"."enum_pagina_materiali_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_materiali_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_materiali_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_invito_sfondo";`)
}
