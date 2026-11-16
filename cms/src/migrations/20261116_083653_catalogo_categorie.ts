import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prodotti_materiali" AS ENUM('polietilene', 'moleskin', 'corten', 'laccato', 'vellutato', 'decorato');
  CREATE TYPE "public"."enum__prodotti_v_version_materiali" AS ENUM('polietilene', 'moleskin', 'corten', 'laccato', 'vellutato', 'decorato');
  CREATE TYPE "public"."enum_categorie_filtri" AS ENUM('tipologia', 'designer', 'materiale', 'luce');
  CREATE TYPE "public"."enum_categorie_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_categorie_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_categorie_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_tipo" AS ENUM('automatica', 'curata');
  CREATE TYPE "public"."enum_categorie_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categorie_v_version_filtri" AS ENUM('tipologia', 'designer', 'materiale', 'luce');
  CREATE TYPE "public"."enum__categorie_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__categorie_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__categorie_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_version_tipo" AS ENUM('automatica', 'curata');
  CREATE TYPE "public"."enum__categorie_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categorie_v_published_locale" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TABLE "prodotti_materiali" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_prodotti_materiali",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_finiture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"codice" varchar
  );
  
  CREATE TABLE "prodotti_finiture_locales" (
  	"nome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_materiali" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__prodotti_v_version_materiali",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_finiture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"codice" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_finiture_locales" (
  	"nome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categorie_filtri" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_categorie_filtri",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "categorie_fonti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"handle" varchar
  );
  
  CREATE TABLE "categorie_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_categorie_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_categorie_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_categorie_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_categorie_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_categorie_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "categorie_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_categorie_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_categorie_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_categorie_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_categorie_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categorie" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"padre_id" integer,
  	"tipo" "enum_categorie_tipo" DEFAULT 'automatica',
  	"in_evidenza" boolean DEFAULT true,
  	"immagine_id" integer,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_categorie_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "categorie_locales" (
  	"nome" varchar,
  	"kicker" varchar,
  	"intro" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categorie_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_categorie_v_version_filtri" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__categorie_v_version_filtri",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_categorie_v_version_fonti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"handle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__categorie_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__categorie_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__categorie_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__categorie_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__categorie_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__categorie_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__categorie_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__categorie_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__categorie_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_padre_id" integer,
  	"version_tipo" "enum__categorie_v_version_tipo" DEFAULT 'automatica',
  	"version_in_evidenza" boolean DEFAULT true,
  	"version_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categorie_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__categorie_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_categorie_v_locales" (
  	"version_nome" varchar,
  	"version_kicker" varchar,
  	"version_intro" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categorie_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_catalogo_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_catalogo_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_catalogo_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_catalogo_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_catalogo_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_catalogo_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_catalogo_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_catalogo_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_catalogo_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_catalogo_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_catalogo_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_catalogo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
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
  
  CREATE TABLE "pagina_catalogo_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "prodotti" ADD COLUMN "categoria_principale_id" integer;
  ALTER TABLE "prodotti" ADD COLUMN "luce" boolean DEFAULT false;
  ALTER TABLE "prodotti" ADD COLUMN "fonte_shopify" varchar;
  ALTER TABLE "prodotti" ADD COLUMN "data_catalogo" timestamp(3) with time zone;
  ALTER TABLE "prodotti_locales" ADD COLUMN "tipologia" varchar;
  ALTER TABLE "prodotti_rels" ADD COLUMN "categorie_id" integer;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_categoria_principale_id" integer;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_luce" boolean DEFAULT false;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_fonte_shopify" varchar;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_data_catalogo" timestamp(3) with time zone;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_tipologia" varchar;
  ALTER TABLE "_prodotti_v_rels" ADD COLUMN "categorie_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categorie_id" integer;
  ALTER TABLE "prodotti_materiali" ADD CONSTRAINT "prodotti_materiali_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_finiture" ADD CONSTRAINT "prodotti_finiture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_finiture_locales" ADD CONSTRAINT "prodotti_finiture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_finiture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_materiali" ADD CONSTRAINT "_prodotti_v_version_materiali_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_finiture" ADD CONSTRAINT "_prodotti_v_version_finiture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_finiture_locales" ADD CONSTRAINT "_prodotti_v_version_finiture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_finiture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_filtri" ADD CONSTRAINT "categorie_filtri_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_fonti" ADD CONSTRAINT "categorie_fonti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_testo" ADD CONSTRAINT "categorie_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_testo_locales" ADD CONSTRAINT "categorie_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_immagine_testo" ADD CONSTRAINT "categorie_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie_blocks_immagine_testo" ADD CONSTRAINT "categorie_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_immagine_testo_locales" ADD CONSTRAINT "categorie_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_slider" ADD CONSTRAINT "categorie_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_slider_locales" ADD CONSTRAINT "categorie_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti_voci" ADD CONSTRAINT "categorie_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti_voci" ADD CONSTRAINT "categorie_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti_voci" ADD CONSTRAINT "categorie_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti_voci_locales" ADD CONSTRAINT "categorie_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti" ADD CONSTRAINT "categorie_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_prodotti_locales" ADD CONSTRAINT "categorie_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_citazione" ADD CONSTRAINT "categorie_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_citazione_locales" ADD CONSTRAINT "categorie_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_domande_voci" ADD CONSTRAINT "categorie_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_domande_voci_locales" ADD CONSTRAINT "categorie_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_domande" ADD CONSTRAINT "categorie_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_domande_locales" ADD CONSTRAINT "categorie_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_invito" ADD CONSTRAINT "categorie_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_invito_locales" ADD CONSTRAINT "categorie_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie" ADD CONSTRAINT "categorie_padre_id_categorie_id_fk" FOREIGN KEY ("padre_id") REFERENCES "public"."categorie"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie" ADD CONSTRAINT "categorie_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie" ADD CONSTRAINT "categorie_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categorie_locales" ADD CONSTRAINT "categorie_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_rels" ADD CONSTRAINT "categorie_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_rels" ADD CONSTRAINT "categorie_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_rels" ADD CONSTRAINT "categorie_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_version_filtri" ADD CONSTRAINT "_categorie_v_version_filtri_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_version_fonti" ADD CONSTRAINT "_categorie_v_version_fonti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_testo" ADD CONSTRAINT "_categorie_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_testo_locales" ADD CONSTRAINT "_categorie_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_immagine_testo" ADD CONSTRAINT "_categorie_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_immagine_testo" ADD CONSTRAINT "_categorie_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_categorie_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_slider" ADD CONSTRAINT "_categorie_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_slider_locales" ADD CONSTRAINT "_categorie_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci" ADD CONSTRAINT "_categorie_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci" ADD CONSTRAINT "_categorie_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci" ADD CONSTRAINT "_categorie_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_categorie_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti" ADD CONSTRAINT "_categorie_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_prodotti_locales" ADD CONSTRAINT "_categorie_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_citazione" ADD CONSTRAINT "_categorie_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_citazione_locales" ADD CONSTRAINT "_categorie_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_domande_voci" ADD CONSTRAINT "_categorie_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_domande_voci_locales" ADD CONSTRAINT "_categorie_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_domande" ADD CONSTRAINT "_categorie_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_domande_locales" ADD CONSTRAINT "_categorie_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_invito" ADD CONSTRAINT "_categorie_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_invito_locales" ADD CONSTRAINT "_categorie_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v" ADD CONSTRAINT "_categorie_v_parent_id_categorie_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categorie"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v" ADD CONSTRAINT "_categorie_v_version_padre_id_categorie_id_fk" FOREIGN KEY ("version_padre_id") REFERENCES "public"."categorie"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v" ADD CONSTRAINT "_categorie_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v" ADD CONSTRAINT "_categorie_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categorie_v_locales" ADD CONSTRAINT "_categorie_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_rels" ADD CONSTRAINT "_categorie_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_rels" ADD CONSTRAINT "_categorie_v_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_rels" ADD CONSTRAINT "_categorie_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_testo" ADD CONSTRAINT "pagina_catalogo_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_testo_locales" ADD CONSTRAINT "pagina_catalogo_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_immagine_testo" ADD CONSTRAINT "pagina_catalogo_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_immagine_testo" ADD CONSTRAINT "pagina_catalogo_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_catalogo_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_slider" ADD CONSTRAINT "pagina_catalogo_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_slider_locales" ADD CONSTRAINT "pagina_catalogo_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_locales" ADD CONSTRAINT "pagina_catalogo_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_citazione" ADD CONSTRAINT "pagina_catalogo_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_citazione_locales" ADD CONSTRAINT "pagina_catalogo_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_domande_voci" ADD CONSTRAINT "pagina_catalogo_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_catalogo_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_domande" ADD CONSTRAINT "pagina_catalogo_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_domande_locales" ADD CONSTRAINT "pagina_catalogo_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_invito" ADD CONSTRAINT "pagina_catalogo_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_invito_locales" ADD CONSTRAINT "pagina_catalogo_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo" ADD CONSTRAINT "pagina_catalogo_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_locales" ADD CONSTRAINT "pagina_catalogo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_rels" ADD CONSTRAINT "pagina_catalogo_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_rels" ADD CONSTRAINT "pagina_catalogo_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_materiali_order_idx" ON "prodotti_materiali" USING btree ("order");
  CREATE INDEX "prodotti_materiali_parent_idx" ON "prodotti_materiali" USING btree ("parent_id");
  CREATE INDEX "prodotti_finiture_order_idx" ON "prodotti_finiture" USING btree ("_order");
  CREATE INDEX "prodotti_finiture_parent_id_idx" ON "prodotti_finiture" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_finiture_locales_locale_parent_id_unique" ON "prodotti_finiture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_finiture_locales_parent_id_idx" ON "prodotti_finiture_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_materiali_order_idx" ON "_prodotti_v_version_materiali" USING btree ("order");
  CREATE INDEX "_prodotti_v_version_materiali_parent_idx" ON "_prodotti_v_version_materiali" USING btree ("parent_id");
  CREATE INDEX "_prodotti_v_version_finiture_order_idx" ON "_prodotti_v_version_finiture" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_finiture_parent_id_idx" ON "_prodotti_v_version_finiture" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_finiture_locales_locale_parent_id_unique" ON "_prodotti_v_version_finiture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_finiture_locales_parent_id_idx" ON "_prodotti_v_version_finiture_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_filtri_order_idx" ON "categorie_filtri" USING btree ("order");
  CREATE INDEX "categorie_filtri_parent_idx" ON "categorie_filtri" USING btree ("parent_id");
  CREATE INDEX "categorie_fonti_order_idx" ON "categorie_fonti" USING btree ("_order");
  CREATE INDEX "categorie_fonti_parent_id_idx" ON "categorie_fonti" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_testo_order_idx" ON "categorie_blocks_testo" USING btree ("_order");
  CREATE INDEX "categorie_blocks_testo_parent_id_idx" ON "categorie_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_testo_path_idx" ON "categorie_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_testo_locales_locale_parent_id_unique" ON "categorie_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_testo_locales_parent_id_idx" ON "categorie_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_immagine_testo_order_idx" ON "categorie_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "categorie_blocks_immagine_testo_parent_id_idx" ON "categorie_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_immagine_testo_path_idx" ON "categorie_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "categorie_blocks_immagine_testo_immagine_idx" ON "categorie_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "categorie_blocks_immagine_testo_locales_locale_parent_id_uni" ON "categorie_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_immagine_testo_locales_parent_id_idx" ON "categorie_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_slider_order_idx" ON "categorie_blocks_slider" USING btree ("_order");
  CREATE INDEX "categorie_blocks_slider_parent_id_idx" ON "categorie_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_slider_path_idx" ON "categorie_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_slider_locales_locale_parent_id_unique" ON "categorie_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_slider_locales_parent_id_idx" ON "categorie_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_voci_order_idx" ON "categorie_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "categorie_blocks_prodotti_voci_parent_id_idx" ON "categorie_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_voci_prodotto_idx" ON "categorie_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "categorie_blocks_prodotti_voci_immagine_idx" ON "categorie_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "categorie_blocks_prodotti_voci_locales_locale_parent_id_uniq" ON "categorie_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_voci_locales_parent_id_idx" ON "categorie_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_order_idx" ON "categorie_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "categorie_blocks_prodotti_parent_id_idx" ON "categorie_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_path_idx" ON "categorie_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_prodotti_locales_locale_parent_id_unique" ON "categorie_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_prodotti_locales_parent_id_idx" ON "categorie_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_citazione_order_idx" ON "categorie_blocks_citazione" USING btree ("_order");
  CREATE INDEX "categorie_blocks_citazione_parent_id_idx" ON "categorie_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_citazione_path_idx" ON "categorie_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_citazione_locales_locale_parent_id_unique" ON "categorie_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_citazione_locales_parent_id_idx" ON "categorie_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_domande_voci_order_idx" ON "categorie_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "categorie_blocks_domande_voci_parent_id_idx" ON "categorie_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "categorie_blocks_domande_voci_locales_locale_parent_id_uniqu" ON "categorie_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_domande_voci_locales_parent_id_idx" ON "categorie_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_domande_order_idx" ON "categorie_blocks_domande" USING btree ("_order");
  CREATE INDEX "categorie_blocks_domande_parent_id_idx" ON "categorie_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_domande_path_idx" ON "categorie_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_domande_locales_locale_parent_id_unique" ON "categorie_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_domande_locales_parent_id_idx" ON "categorie_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_invito_order_idx" ON "categorie_blocks_invito" USING btree ("_order");
  CREATE INDEX "categorie_blocks_invito_parent_id_idx" ON "categorie_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_invito_path_idx" ON "categorie_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_invito_locales_locale_parent_id_unique" ON "categorie_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_invito_locales_parent_id_idx" ON "categorie_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "categorie_slug_idx" ON "categorie" USING btree ("slug");
  CREATE INDEX "categorie_padre_idx" ON "categorie" USING btree ("padre_id");
  CREATE INDEX "categorie_immagine_idx" ON "categorie" USING btree ("immagine_id");
  CREATE INDEX "categorie_seo_seo_immagine_idx" ON "categorie" USING btree ("seo_immagine_id");
  CREATE INDEX "categorie_updated_at_idx" ON "categorie" USING btree ("updated_at");
  CREATE INDEX "categorie_created_at_idx" ON "categorie" USING btree ("created_at");
  CREATE INDEX "categorie__status_idx" ON "categorie" USING btree ("_status");
  CREATE UNIQUE INDEX "categorie_locales_locale_parent_id_unique" ON "categorie_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_locales_parent_id_idx" ON "categorie_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_rels_order_idx" ON "categorie_rels" USING btree ("order");
  CREATE INDEX "categorie_rels_parent_idx" ON "categorie_rels" USING btree ("parent_id");
  CREATE INDEX "categorie_rels_path_idx" ON "categorie_rels" USING btree ("path");
  CREATE INDEX "categorie_rels_prodotti_id_idx" ON "categorie_rels" USING btree ("prodotti_id");
  CREATE INDEX "categorie_rels_media_id_idx" ON "categorie_rels" USING btree ("media_id");
  CREATE INDEX "_categorie_v_version_filtri_order_idx" ON "_categorie_v_version_filtri" USING btree ("order");
  CREATE INDEX "_categorie_v_version_filtri_parent_idx" ON "_categorie_v_version_filtri" USING btree ("parent_id");
  CREATE INDEX "_categorie_v_version_fonti_order_idx" ON "_categorie_v_version_fonti" USING btree ("_order");
  CREATE INDEX "_categorie_v_version_fonti_parent_id_idx" ON "_categorie_v_version_fonti" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_testo_order_idx" ON "_categorie_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_testo_parent_id_idx" ON "_categorie_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_testo_path_idx" ON "_categorie_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_testo_locales_locale_parent_id_unique" ON "_categorie_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_testo_locales_parent_id_idx" ON "_categorie_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_immagine_testo_order_idx" ON "_categorie_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_immagine_testo_parent_id_idx" ON "_categorie_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_immagine_testo_path_idx" ON "_categorie_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_categorie_v_blocks_immagine_testo_immagine_idx" ON "_categorie_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_categorie_v_blocks_immagine_testo_locales_locale_parent_id_" ON "_categorie_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_immagine_testo_locales_parent_id_idx" ON "_categorie_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_slider_order_idx" ON "_categorie_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_slider_parent_id_idx" ON "_categorie_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_slider_path_idx" ON "_categorie_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_slider_locales_locale_parent_id_unique" ON "_categorie_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_slider_locales_parent_id_idx" ON "_categorie_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_voci_order_idx" ON "_categorie_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_prodotti_voci_parent_id_idx" ON "_categorie_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_voci_prodotto_idx" ON "_categorie_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_voci_immagine_idx" ON "_categorie_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_categorie_v_blocks_prodotti_voci_locales_locale_parent_id_u" ON "_categorie_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_categorie_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_order_idx" ON "_categorie_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_prodotti_parent_id_idx" ON "_categorie_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_path_idx" ON "_categorie_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_categorie_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_prodotti_locales_parent_id_idx" ON "_categorie_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_citazione_order_idx" ON "_categorie_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_citazione_parent_id_idx" ON "_categorie_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_citazione_path_idx" ON "_categorie_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_citazione_locales_locale_parent_id_uniqu" ON "_categorie_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_citazione_locales_parent_id_idx" ON "_categorie_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_domande_voci_order_idx" ON "_categorie_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_domande_voci_parent_id_idx" ON "_categorie_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_categorie_v_blocks_domande_voci_locales_locale_parent_id_un" ON "_categorie_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_domande_voci_locales_parent_id_idx" ON "_categorie_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_domande_order_idx" ON "_categorie_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_domande_parent_id_idx" ON "_categorie_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_domande_path_idx" ON "_categorie_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_domande_locales_locale_parent_id_unique" ON "_categorie_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_domande_locales_parent_id_idx" ON "_categorie_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_invito_order_idx" ON "_categorie_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_invito_parent_id_idx" ON "_categorie_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_invito_path_idx" ON "_categorie_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_invito_locales_locale_parent_id_unique" ON "_categorie_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_invito_locales_parent_id_idx" ON "_categorie_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_parent_idx" ON "_categorie_v" USING btree ("parent_id");
  CREATE INDEX "_categorie_v_version_version_slug_idx" ON "_categorie_v" USING btree ("version_slug");
  CREATE INDEX "_categorie_v_version_version_padre_idx" ON "_categorie_v" USING btree ("version_padre_id");
  CREATE INDEX "_categorie_v_version_version_immagine_idx" ON "_categorie_v" USING btree ("version_immagine_id");
  CREATE INDEX "_categorie_v_version_seo_version_seo_immagine_idx" ON "_categorie_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_categorie_v_version_version_updated_at_idx" ON "_categorie_v" USING btree ("version_updated_at");
  CREATE INDEX "_categorie_v_version_version_created_at_idx" ON "_categorie_v" USING btree ("version_created_at");
  CREATE INDEX "_categorie_v_version_version__status_idx" ON "_categorie_v" USING btree ("version__status");
  CREATE INDEX "_categorie_v_created_at_idx" ON "_categorie_v" USING btree ("created_at");
  CREATE INDEX "_categorie_v_updated_at_idx" ON "_categorie_v" USING btree ("updated_at");
  CREATE INDEX "_categorie_v_snapshot_idx" ON "_categorie_v" USING btree ("snapshot");
  CREATE INDEX "_categorie_v_published_locale_idx" ON "_categorie_v" USING btree ("published_locale");
  CREATE INDEX "_categorie_v_latest_idx" ON "_categorie_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_categorie_v_locales_locale_parent_id_unique" ON "_categorie_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_locales_parent_id_idx" ON "_categorie_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_rels_order_idx" ON "_categorie_v_rels" USING btree ("order");
  CREATE INDEX "_categorie_v_rels_parent_idx" ON "_categorie_v_rels" USING btree ("parent_id");
  CREATE INDEX "_categorie_v_rels_path_idx" ON "_categorie_v_rels" USING btree ("path");
  CREATE INDEX "_categorie_v_rels_prodotti_id_idx" ON "_categorie_v_rels" USING btree ("prodotti_id");
  CREATE INDEX "_categorie_v_rels_media_id_idx" ON "_categorie_v_rels" USING btree ("media_id");
  CREATE INDEX "pagina_catalogo_blocks_testo_order_idx" ON "pagina_catalogo_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_testo_parent_id_idx" ON "pagina_catalogo_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_testo_path_idx" ON "pagina_catalogo_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_testo_locales_locale_parent_id_unique" ON "pagina_catalogo_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_testo_locales_parent_id_idx" ON "pagina_catalogo_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_immagine_testo_order_idx" ON "pagina_catalogo_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_immagine_testo_parent_id_idx" ON "pagina_catalogo_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_immagine_testo_path_idx" ON "pagina_catalogo_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_catalogo_blocks_immagine_testo_immagine_idx" ON "pagina_catalogo_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_immagine_testo_locales_locale_parent_" ON "pagina_catalogo_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_catalogo_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_slider_order_idx" ON "pagina_catalogo_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_slider_parent_id_idx" ON "pagina_catalogo_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_slider_path_idx" ON "pagina_catalogo_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_slider_locales_locale_parent_id_uniqu" ON "pagina_catalogo_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_slider_locales_parent_id_idx" ON "pagina_catalogo_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_voci_order_idx" ON "pagina_catalogo_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_voci_parent_id_idx" ON "pagina_catalogo_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_voci_prodotto_idx" ON "pagina_catalogo_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_voci_immagine_idx" ON "pagina_catalogo_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_prodotti_voci_locales_locale_parent_i" ON "pagina_catalogo_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_catalogo_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_order_idx" ON "pagina_catalogo_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_parent_id_idx" ON "pagina_catalogo_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_path_idx" ON "pagina_catalogo_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_prodotti_locales_locale_parent_id_uni" ON "pagina_catalogo_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_prodotti_locales_parent_id_idx" ON "pagina_catalogo_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_citazione_order_idx" ON "pagina_catalogo_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_citazione_parent_id_idx" ON "pagina_catalogo_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_citazione_path_idx" ON "pagina_catalogo_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_citazione_locales_locale_parent_id_un" ON "pagina_catalogo_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_citazione_locales_parent_id_idx" ON "pagina_catalogo_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_domande_voci_order_idx" ON "pagina_catalogo_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_domande_voci_parent_id_idx" ON "pagina_catalogo_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_domande_voci_locales_locale_parent_id" ON "pagina_catalogo_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_domande_voci_locales_parent_id_idx" ON "pagina_catalogo_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_domande_order_idx" ON "pagina_catalogo_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_domande_parent_id_idx" ON "pagina_catalogo_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_domande_path_idx" ON "pagina_catalogo_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_domande_locales_locale_parent_id_uniq" ON "pagina_catalogo_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_domande_locales_parent_id_idx" ON "pagina_catalogo_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_invito_order_idx" ON "pagina_catalogo_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_invito_parent_id_idx" ON "pagina_catalogo_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_invito_path_idx" ON "pagina_catalogo_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_invito_locales_locale_parent_id_uniqu" ON "pagina_catalogo_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_invito_locales_parent_id_idx" ON "pagina_catalogo_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_seo_seo_immagine_idx" ON "pagina_catalogo" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_catalogo_locales_locale_parent_id_unique" ON "pagina_catalogo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_locales_parent_id_idx" ON "pagina_catalogo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_rels_order_idx" ON "pagina_catalogo_rels" USING btree ("order");
  CREATE INDEX "pagina_catalogo_rels_parent_idx" ON "pagina_catalogo_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_catalogo_rels_path_idx" ON "pagina_catalogo_rels" USING btree ("path");
  CREATE INDEX "pagina_catalogo_rels_media_id_idx" ON "pagina_catalogo_rels" USING btree ("media_id");
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_categoria_principale_id_categorie_id_fk" FOREIGN KEY ("categoria_principale_id") REFERENCES "public"."categorie"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_rels" ADD CONSTRAINT "prodotti_rels_categorie_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_categoria_principale_id_categorie_id_fk" FOREIGN KEY ("version_categoria_principale_id") REFERENCES "public"."categorie"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_rels" ADD CONSTRAINT "_prodotti_v_rels_categorie_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categorie_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_categoria_principale_idx" ON "prodotti" USING btree ("categoria_principale_id");
  CREATE INDEX "prodotti_fonte_shopify_idx" ON "prodotti" USING btree ("fonte_shopify");
  CREATE INDEX "prodotti_rels_categorie_id_idx" ON "prodotti_rels" USING btree ("categorie_id");
  CREATE INDEX "_prodotti_v_version_version_categoria_principale_idx" ON "_prodotti_v" USING btree ("version_categoria_principale_id");
  CREATE INDEX "_prodotti_v_version_version_fonte_shopify_idx" ON "_prodotti_v" USING btree ("version_fonte_shopify");
  CREATE INDEX "_prodotti_v_rels_categorie_id_idx" ON "_prodotti_v_rels" USING btree ("categorie_id");
  CREATE INDEX "payload_locked_documents_rels_categorie_id_idx" ON "payload_locked_documents_rels" USING btree ("categorie_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodotti_materiali" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_finiture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_finiture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_version_materiali" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_version_finiture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_version_finiture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_filtri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_fonti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_version_filtri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_version_fonti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prodotti_materiali" CASCADE;
  DROP TABLE "prodotti_finiture" CASCADE;
  DROP TABLE "prodotti_finiture_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_materiali" CASCADE;
  DROP TABLE "_prodotti_v_version_finiture" CASCADE;
  DROP TABLE "_prodotti_v_version_finiture_locales" CASCADE;
  DROP TABLE "categorie_filtri" CASCADE;
  DROP TABLE "categorie_fonti" CASCADE;
  DROP TABLE "categorie_blocks_testo" CASCADE;
  DROP TABLE "categorie_blocks_testo_locales" CASCADE;
  DROP TABLE "categorie_blocks_immagine_testo" CASCADE;
  DROP TABLE "categorie_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "categorie_blocks_slider" CASCADE;
  DROP TABLE "categorie_blocks_slider_locales" CASCADE;
  DROP TABLE "categorie_blocks_prodotti_voci" CASCADE;
  DROP TABLE "categorie_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "categorie_blocks_prodotti" CASCADE;
  DROP TABLE "categorie_blocks_prodotti_locales" CASCADE;
  DROP TABLE "categorie_blocks_citazione" CASCADE;
  DROP TABLE "categorie_blocks_citazione_locales" CASCADE;
  DROP TABLE "categorie_blocks_domande_voci" CASCADE;
  DROP TABLE "categorie_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "categorie_blocks_domande" CASCADE;
  DROP TABLE "categorie_blocks_domande_locales" CASCADE;
  DROP TABLE "categorie_blocks_invito" CASCADE;
  DROP TABLE "categorie_blocks_invito_locales" CASCADE;
  DROP TABLE "categorie" CASCADE;
  DROP TABLE "categorie_locales" CASCADE;
  DROP TABLE "categorie_rels" CASCADE;
  DROP TABLE "_categorie_v_version_filtri" CASCADE;
  DROP TABLE "_categorie_v_version_fonti" CASCADE;
  DROP TABLE "_categorie_v_blocks_testo" CASCADE;
  DROP TABLE "_categorie_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_categorie_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_slider" CASCADE;
  DROP TABLE "_categorie_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_categorie_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_prodotti" CASCADE;
  DROP TABLE "_categorie_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_citazione" CASCADE;
  DROP TABLE "_categorie_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_categorie_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_domande" CASCADE;
  DROP TABLE "_categorie_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_invito" CASCADE;
  DROP TABLE "_categorie_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_categorie_v" CASCADE;
  DROP TABLE "_categorie_v_locales" CASCADE;
  DROP TABLE "_categorie_v_rels" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_testo" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_slider" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_citazione" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_domande" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_invito" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_catalogo" CASCADE;
  DROP TABLE "pagina_catalogo_locales" CASCADE;
  DROP TABLE "pagina_catalogo_rels" CASCADE;
  ALTER TABLE "prodotti" DROP CONSTRAINT "prodotti_categoria_principale_id_categorie_id_fk";
  
  ALTER TABLE "prodotti_rels" DROP CONSTRAINT "prodotti_rels_categorie_fk";
  
  ALTER TABLE "_prodotti_v" DROP CONSTRAINT "_prodotti_v_version_categoria_principale_id_categorie_id_fk";
  
  ALTER TABLE "_prodotti_v_rels" DROP CONSTRAINT "_prodotti_v_rels_categorie_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categorie_fk";
  
  DROP INDEX "prodotti_categoria_principale_idx";
  DROP INDEX "prodotti_fonte_shopify_idx";
  DROP INDEX "prodotti_rels_categorie_id_idx";
  DROP INDEX "_prodotti_v_version_version_categoria_principale_idx";
  DROP INDEX "_prodotti_v_version_version_fonte_shopify_idx";
  DROP INDEX "_prodotti_v_rels_categorie_id_idx";
  DROP INDEX "payload_locked_documents_rels_categorie_id_idx";
  ALTER TABLE "prodotti" DROP COLUMN "categoria_principale_id";
  ALTER TABLE "prodotti" DROP COLUMN "luce";
  ALTER TABLE "prodotti" DROP COLUMN "fonte_shopify";
  ALTER TABLE "prodotti" DROP COLUMN "data_catalogo";
  ALTER TABLE "prodotti_locales" DROP COLUMN "tipologia";
  ALTER TABLE "prodotti_rels" DROP COLUMN "categorie_id";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_categoria_principale_id";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_luce";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_fonte_shopify";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_data_catalogo";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_tipologia";
  ALTER TABLE "_prodotti_v_rels" DROP COLUMN "categorie_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categorie_id";
  DROP TYPE "public"."enum_prodotti_materiali";
  DROP TYPE "public"."enum__prodotti_v_version_materiali";
  DROP TYPE "public"."enum_categorie_filtri";
  DROP TYPE "public"."enum_categorie_blocks_testo_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_categorie_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_slider_formato";
  DROP TYPE "public"."enum_categorie_blocks_slider_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_domande_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_invito_sfondo";
  DROP TYPE "public"."enum_categorie_tipo";
  DROP TYPE "public"."enum_categorie_status";
  DROP TYPE "public"."enum__categorie_v_version_filtri";
  DROP TYPE "public"."enum__categorie_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__categorie_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_slider_formato";
  DROP TYPE "public"."enum__categorie_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__categorie_v_version_tipo";
  DROP TYPE "public"."enum__categorie_v_version_status";
  DROP TYPE "public"."enum__categorie_v_published_locale";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_invito_sfondo";`)
}
