import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pagine_heritage_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TABLE "pagine_heritage_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_numeri_locales" (
  	"valore" varchar NOT NULL,
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_capitoli" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pagine_heritage_capitoli_locales" (
  	"kicker" varchar,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_punti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_punti_voci_locales" (
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_heritage_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagine_heritage_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagine_heritage_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagine_heritage_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagine_heritage_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagine_heritage_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_heritage_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_heritage_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagine_heritage_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagine_heritage_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagine_heritage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"ordine" numeric DEFAULT 10,
  	"immagine_id" integer,
  	"citazione_immagine_id" integer,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_locales" (
  	"titolo" varchar NOT NULL,
  	"nome_menu" varchar,
  	"kicker" varchar,
  	"testo" varchar,
  	"punti_kicker" varchar,
  	"punti_titolo" varchar,
  	"citazione_testo" varchar,
  	"citazione_autore" varchar,
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
  
  CREATE TABLE "pagine_heritage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pagina_heritage_pulsanti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "pagina_heritage_pulsanti_locales" (
  	"testo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_numeri_locales" (
  	"valore" varchar NOT NULL,
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_timeline_tappe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_heritage_timeline_tappe_locales" (
  	"anno" varchar NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_primati_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_primati_voci_locales" (
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_qualita_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_qualita_voci_locales" (
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_produzione_punti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_produzione_punti_locales" (
  	"testo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_collezioni_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pagina_heritage_collezioni_voci_locales" (
  	"titolo" varchar NOT NULL,
  	"sottotitolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_cta_pulsanti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "pagina_heritage_cta_pulsanti_locales" (
  	"testo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_heritage_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_pagina_heritage_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_pagina_heritage_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_pagina_heritage_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_heritage_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "pagina_heritage_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_heritage_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_heritage_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_citazione_locales" (
  	"testo" varchar NOT NULL,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_domande_voci_locales" (
  	"domanda" varchar NOT NULL,
  	"risposta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_pagina_heritage_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_pagina_heritage_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_heritage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"qualita_immagine_id" integer,
  	"citazione_immagine_id" integer,
  	"produzione_immagine_id" integer,
  	"produzione_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_heritage_locales" (
  	"kicker" varchar,
  	"titolo" varchar NOT NULL,
  	"sottotitolo" varchar,
  	"testo" varchar,
  	"timeline_kicker" varchar,
  	"timeline_titolo" varchar,
  	"timeline_testo" varchar,
  	"primati_kicker" varchar,
  	"primati_titolo" varchar,
  	"designer_kicker" varchar,
  	"designer_titolo" varchar,
  	"designer_testo" varchar,
  	"designer_pulsante" varchar,
  	"qualita_kicker" varchar,
  	"qualita_titolo" varchar,
  	"qualita_testo" varchar,
  	"citazione_testo" varchar,
  	"citazione_autore" varchar,
  	"produzione_kicker" varchar,
  	"produzione_titolo" varchar,
  	"produzione_testo" varchar,
  	"produzione_pulsante" varchar,
  	"sottopagine_kicker" varchar,
  	"sottopagine_titolo" varchar,
  	"collezioni_kicker" varchar,
  	"collezioni_titolo" varchar,
  	"cta_kicker" varchar,
  	"cta_titolo" varchar,
  	"cta_testo" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pagine_heritage_id" integer;
  ALTER TABLE "pagine_heritage_numeri" ADD CONSTRAINT "pagine_heritage_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_numeri_locales" ADD CONSTRAINT "pagine_heritage_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_capitoli" ADD CONSTRAINT "pagine_heritage_capitoli_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage_capitoli" ADD CONSTRAINT "pagine_heritage_capitoli_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_capitoli_locales" ADD CONSTRAINT "pagine_heritage_capitoli_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_capitoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_punti_voci" ADD CONSTRAINT "pagine_heritage_punti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_punti_voci_locales" ADD CONSTRAINT "pagine_heritage_punti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_punti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_testo" ADD CONSTRAINT "pagine_heritage_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_testo_locales" ADD CONSTRAINT "pagine_heritage_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_immagine_testo" ADD CONSTRAINT "pagine_heritage_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_immagine_testo" ADD CONSTRAINT "pagine_heritage_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_immagine_testo_locales" ADD CONSTRAINT "pagine_heritage_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_slider" ADD CONSTRAINT "pagine_heritage_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_slider_locales" ADD CONSTRAINT "pagine_heritage_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_prodotti_locales" ADD CONSTRAINT "pagine_heritage_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_citazione" ADD CONSTRAINT "pagine_heritage_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_citazione_locales" ADD CONSTRAINT "pagine_heritage_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_domande_voci" ADD CONSTRAINT "pagine_heritage_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_domande_voci_locales" ADD CONSTRAINT "pagine_heritage_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_domande" ADD CONSTRAINT "pagine_heritage_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_domande_locales" ADD CONSTRAINT "pagine_heritage_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_invito" ADD CONSTRAINT "pagine_heritage_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_invito_locales" ADD CONSTRAINT "pagine_heritage_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage" ADD CONSTRAINT "pagine_heritage_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage" ADD CONSTRAINT "pagine_heritage_citazione_immagine_id_media_id_fk" FOREIGN KEY ("citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage" ADD CONSTRAINT "pagine_heritage_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_heritage_locales" ADD CONSTRAINT "pagine_heritage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_rels" ADD CONSTRAINT "pagine_heritage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_rels" ADD CONSTRAINT "pagine_heritage_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_pulsanti" ADD CONSTRAINT "pagina_heritage_pulsanti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_pulsanti_locales" ADD CONSTRAINT "pagina_heritage_pulsanti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_pulsanti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_numeri" ADD CONSTRAINT "pagina_heritage_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_numeri_locales" ADD CONSTRAINT "pagina_heritage_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_timeline_tappe" ADD CONSTRAINT "pagina_heritage_timeline_tappe_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_timeline_tappe" ADD CONSTRAINT "pagina_heritage_timeline_tappe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_timeline_tappe_locales" ADD CONSTRAINT "pagina_heritage_timeline_tappe_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_timeline_tappe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_primati_voci" ADD CONSTRAINT "pagina_heritage_primati_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_primati_voci_locales" ADD CONSTRAINT "pagina_heritage_primati_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_primati_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_qualita_voci" ADD CONSTRAINT "pagina_heritage_qualita_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_qualita_voci_locales" ADD CONSTRAINT "pagina_heritage_qualita_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_qualita_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_produzione_punti" ADD CONSTRAINT "pagina_heritage_produzione_punti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_produzione_punti_locales" ADD CONSTRAINT "pagina_heritage_produzione_punti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_produzione_punti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_collezioni_voci" ADD CONSTRAINT "pagina_heritage_collezioni_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_collezioni_voci" ADD CONSTRAINT "pagina_heritage_collezioni_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_collezioni_voci_locales" ADD CONSTRAINT "pagina_heritage_collezioni_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_collezioni_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_cta_pulsanti" ADD CONSTRAINT "pagina_heritage_cta_pulsanti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_cta_pulsanti_locales" ADD CONSTRAINT "pagina_heritage_cta_pulsanti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_cta_pulsanti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_testo" ADD CONSTRAINT "pagina_heritage_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_testo_locales" ADD CONSTRAINT "pagina_heritage_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_immagine_testo" ADD CONSTRAINT "pagina_heritage_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_immagine_testo" ADD CONSTRAINT "pagina_heritage_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_immagine_testo_locales" ADD CONSTRAINT "pagina_heritage_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_slider" ADD CONSTRAINT "pagina_heritage_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_slider_locales" ADD CONSTRAINT "pagina_heritage_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci_locales" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_prodotti_locales" ADD CONSTRAINT "pagina_heritage_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_citazione" ADD CONSTRAINT "pagina_heritage_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_citazione_locales" ADD CONSTRAINT "pagina_heritage_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_domande_voci" ADD CONSTRAINT "pagina_heritage_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_domande_voci_locales" ADD CONSTRAINT "pagina_heritage_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_domande" ADD CONSTRAINT "pagina_heritage_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_domande_locales" ADD CONSTRAINT "pagina_heritage_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_invito" ADD CONSTRAINT "pagina_heritage_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_invito_locales" ADD CONSTRAINT "pagina_heritage_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage" ADD CONSTRAINT "pagina_heritage_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage" ADD CONSTRAINT "pagina_heritage_qualita_immagine_id_media_id_fk" FOREIGN KEY ("qualita_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage" ADD CONSTRAINT "pagina_heritage_citazione_immagine_id_media_id_fk" FOREIGN KEY ("citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage" ADD CONSTRAINT "pagina_heritage_produzione_immagine_id_media_id_fk" FOREIGN KEY ("produzione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage" ADD CONSTRAINT "pagina_heritage_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_heritage_locales" ADD CONSTRAINT "pagina_heritage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_rels" ADD CONSTRAINT "pagina_heritage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_rels" ADD CONSTRAINT "pagina_heritage_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pagine_heritage_numeri_order_idx" ON "pagine_heritage_numeri" USING btree ("_order");
  CREATE INDEX "pagine_heritage_numeri_parent_id_idx" ON "pagine_heritage_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_heritage_numeri_locales_locale_parent_id_unique" ON "pagine_heritage_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_numeri_locales_parent_id_idx" ON "pagine_heritage_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_capitoli_order_idx" ON "pagine_heritage_capitoli" USING btree ("_order");
  CREATE INDEX "pagine_heritage_capitoli_parent_id_idx" ON "pagine_heritage_capitoli" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_capitoli_immagine_idx" ON "pagine_heritage_capitoli" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagine_heritage_capitoli_locales_locale_parent_id_unique" ON "pagine_heritage_capitoli_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_capitoli_locales_parent_id_idx" ON "pagine_heritage_capitoli_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_punti_voci_order_idx" ON "pagine_heritage_punti_voci" USING btree ("_order");
  CREATE INDEX "pagine_heritage_punti_voci_parent_id_idx" ON "pagine_heritage_punti_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_heritage_punti_voci_locales_locale_parent_id_unique" ON "pagine_heritage_punti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_punti_voci_locales_parent_id_idx" ON "pagine_heritage_punti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_testo_order_idx" ON "pagine_heritage_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_testo_parent_id_idx" ON "pagine_heritage_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_testo_path_idx" ON "pagine_heritage_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_testo_locales_locale_parent_id_unique" ON "pagine_heritage_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_testo_locales_parent_id_idx" ON "pagine_heritage_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_immagine_testo_order_idx" ON "pagine_heritage_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_immagine_testo_parent_id_idx" ON "pagine_heritage_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_immagine_testo_path_idx" ON "pagine_heritage_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagine_heritage_blocks_immagine_testo_immagine_idx" ON "pagine_heritage_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_immagine_testo_locales_locale_parent_" ON "pagine_heritage_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_immagine_testo_locales_parent_id_idx" ON "pagine_heritage_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_slider_order_idx" ON "pagine_heritage_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_slider_parent_id_idx" ON "pagine_heritage_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_slider_path_idx" ON "pagine_heritage_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_slider_locales_locale_parent_id_uniqu" ON "pagine_heritage_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_slider_locales_parent_id_idx" ON "pagine_heritage_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_voci_order_idx" ON "pagine_heritage_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_prodotti_voci_parent_id_idx" ON "pagine_heritage_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_voci_prodotto_idx" ON "pagine_heritage_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_voci_immagine_idx" ON "pagine_heritage_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_prodotti_voci_locales_locale_parent_i" ON "pagine_heritage_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_voci_locales_parent_id_idx" ON "pagine_heritage_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_order_idx" ON "pagine_heritage_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_prodotti_parent_id_idx" ON "pagine_heritage_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_path_idx" ON "pagine_heritage_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_prodotti_locales_locale_parent_id_uni" ON "pagine_heritage_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_prodotti_locales_parent_id_idx" ON "pagine_heritage_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_citazione_order_idx" ON "pagine_heritage_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_citazione_parent_id_idx" ON "pagine_heritage_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_citazione_path_idx" ON "pagine_heritage_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_citazione_locales_locale_parent_id_un" ON "pagine_heritage_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_citazione_locales_parent_id_idx" ON "pagine_heritage_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_domande_voci_order_idx" ON "pagine_heritage_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_domande_voci_parent_id_idx" ON "pagine_heritage_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_domande_voci_locales_locale_parent_id" ON "pagine_heritage_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_domande_voci_locales_parent_id_idx" ON "pagine_heritage_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_domande_order_idx" ON "pagine_heritage_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_domande_parent_id_idx" ON "pagine_heritage_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_domande_path_idx" ON "pagine_heritage_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_domande_locales_locale_parent_id_uniq" ON "pagine_heritage_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_domande_locales_parent_id_idx" ON "pagine_heritage_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_invito_order_idx" ON "pagine_heritage_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_invito_parent_id_idx" ON "pagine_heritage_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_invito_path_idx" ON "pagine_heritage_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_invito_locales_locale_parent_id_uniqu" ON "pagine_heritage_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_invito_locales_parent_id_idx" ON "pagine_heritage_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagine_heritage_slug_idx" ON "pagine_heritage" USING btree ("slug");
  CREATE INDEX "pagine_heritage_immagine_idx" ON "pagine_heritage" USING btree ("immagine_id");
  CREATE INDEX "pagine_heritage_citazione_citazione_immagine_idx" ON "pagine_heritage" USING btree ("citazione_immagine_id");
  CREATE INDEX "pagine_heritage_seo_seo_immagine_idx" ON "pagine_heritage" USING btree ("seo_immagine_id");
  CREATE INDEX "pagine_heritage_updated_at_idx" ON "pagine_heritage" USING btree ("updated_at");
  CREATE INDEX "pagine_heritage_created_at_idx" ON "pagine_heritage" USING btree ("created_at");
  CREATE UNIQUE INDEX "pagine_heritage_locales_locale_parent_id_unique" ON "pagine_heritage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_locales_parent_id_idx" ON "pagine_heritage_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_rels_order_idx" ON "pagine_heritage_rels" USING btree ("order");
  CREATE INDEX "pagine_heritage_rels_parent_idx" ON "pagine_heritage_rels" USING btree ("parent_id");
  CREATE INDEX "pagine_heritage_rels_path_idx" ON "pagine_heritage_rels" USING btree ("path");
  CREATE INDEX "pagine_heritage_rels_media_id_idx" ON "pagine_heritage_rels" USING btree ("media_id");
  CREATE INDEX "pagina_heritage_pulsanti_order_idx" ON "pagina_heritage_pulsanti" USING btree ("_order");
  CREATE INDEX "pagina_heritage_pulsanti_parent_id_idx" ON "pagina_heritage_pulsanti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_pulsanti_locales_locale_parent_id_unique" ON "pagina_heritage_pulsanti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_pulsanti_locales_parent_id_idx" ON "pagina_heritage_pulsanti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_numeri_order_idx" ON "pagina_heritage_numeri" USING btree ("_order");
  CREATE INDEX "pagina_heritage_numeri_parent_id_idx" ON "pagina_heritage_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_numeri_locales_locale_parent_id_unique" ON "pagina_heritage_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_numeri_locales_parent_id_idx" ON "pagina_heritage_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_timeline_tappe_order_idx" ON "pagina_heritage_timeline_tappe" USING btree ("_order");
  CREATE INDEX "pagina_heritage_timeline_tappe_parent_id_idx" ON "pagina_heritage_timeline_tappe" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_timeline_tappe_immagine_idx" ON "pagina_heritage_timeline_tappe" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_heritage_timeline_tappe_locales_locale_parent_id_uniq" ON "pagina_heritage_timeline_tappe_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_timeline_tappe_locales_parent_id_idx" ON "pagina_heritage_timeline_tappe_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_primati_voci_order_idx" ON "pagina_heritage_primati_voci" USING btree ("_order");
  CREATE INDEX "pagina_heritage_primati_voci_parent_id_idx" ON "pagina_heritage_primati_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_primati_voci_locales_locale_parent_id_unique" ON "pagina_heritage_primati_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_primati_voci_locales_parent_id_idx" ON "pagina_heritage_primati_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_qualita_voci_order_idx" ON "pagina_heritage_qualita_voci" USING btree ("_order");
  CREATE INDEX "pagina_heritage_qualita_voci_parent_id_idx" ON "pagina_heritage_qualita_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_qualita_voci_locales_locale_parent_id_unique" ON "pagina_heritage_qualita_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_qualita_voci_locales_parent_id_idx" ON "pagina_heritage_qualita_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_produzione_punti_order_idx" ON "pagina_heritage_produzione_punti" USING btree ("_order");
  CREATE INDEX "pagina_heritage_produzione_punti_parent_id_idx" ON "pagina_heritage_produzione_punti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_produzione_punti_locales_locale_parent_id_un" ON "pagina_heritage_produzione_punti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_produzione_punti_locales_parent_id_idx" ON "pagina_heritage_produzione_punti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_collezioni_voci_order_idx" ON "pagina_heritage_collezioni_voci" USING btree ("_order");
  CREATE INDEX "pagina_heritage_collezioni_voci_parent_id_idx" ON "pagina_heritage_collezioni_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_collezioni_voci_immagine_idx" ON "pagina_heritage_collezioni_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_heritage_collezioni_voci_locales_locale_parent_id_uni" ON "pagina_heritage_collezioni_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_collezioni_voci_locales_parent_id_idx" ON "pagina_heritage_collezioni_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_cta_pulsanti_order_idx" ON "pagina_heritage_cta_pulsanti" USING btree ("_order");
  CREATE INDEX "pagina_heritage_cta_pulsanti_parent_id_idx" ON "pagina_heritage_cta_pulsanti" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_cta_pulsanti_locales_locale_parent_id_unique" ON "pagina_heritage_cta_pulsanti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_cta_pulsanti_locales_parent_id_idx" ON "pagina_heritage_cta_pulsanti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_testo_order_idx" ON "pagina_heritage_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_testo_parent_id_idx" ON "pagina_heritage_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_testo_path_idx" ON "pagina_heritage_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_testo_locales_locale_parent_id_unique" ON "pagina_heritage_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_testo_locales_parent_id_idx" ON "pagina_heritage_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_immagine_testo_order_idx" ON "pagina_heritage_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_immagine_testo_parent_id_idx" ON "pagina_heritage_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_immagine_testo_path_idx" ON "pagina_heritage_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "pagina_heritage_blocks_immagine_testo_immagine_idx" ON "pagina_heritage_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_immagine_testo_locales_locale_parent_" ON "pagina_heritage_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_immagine_testo_locales_parent_id_idx" ON "pagina_heritage_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_slider_order_idx" ON "pagina_heritage_blocks_slider" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_slider_parent_id_idx" ON "pagina_heritage_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_slider_path_idx" ON "pagina_heritage_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_slider_locales_locale_parent_id_uniqu" ON "pagina_heritage_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_slider_locales_parent_id_idx" ON "pagina_heritage_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_voci_order_idx" ON "pagina_heritage_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_prodotti_voci_parent_id_idx" ON "pagina_heritage_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_voci_prodotto_idx" ON "pagina_heritage_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_voci_immagine_idx" ON "pagina_heritage_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_prodotti_voci_locales_locale_parent_i" ON "pagina_heritage_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_voci_locales_parent_id_idx" ON "pagina_heritage_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_order_idx" ON "pagina_heritage_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_prodotti_parent_id_idx" ON "pagina_heritage_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_path_idx" ON "pagina_heritage_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_prodotti_locales_locale_parent_id_uni" ON "pagina_heritage_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_prodotti_locales_parent_id_idx" ON "pagina_heritage_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_citazione_order_idx" ON "pagina_heritage_blocks_citazione" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_citazione_parent_id_idx" ON "pagina_heritage_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_citazione_path_idx" ON "pagina_heritage_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_citazione_locales_locale_parent_id_un" ON "pagina_heritage_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_citazione_locales_parent_id_idx" ON "pagina_heritage_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_domande_voci_order_idx" ON "pagina_heritage_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_domande_voci_parent_id_idx" ON "pagina_heritage_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_domande_voci_locales_locale_parent_id" ON "pagina_heritage_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_domande_voci_locales_parent_id_idx" ON "pagina_heritage_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_domande_order_idx" ON "pagina_heritage_blocks_domande" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_domande_parent_id_idx" ON "pagina_heritage_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_domande_path_idx" ON "pagina_heritage_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_domande_locales_locale_parent_id_uniq" ON "pagina_heritage_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_domande_locales_parent_id_idx" ON "pagina_heritage_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_invito_order_idx" ON "pagina_heritage_blocks_invito" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_invito_parent_id_idx" ON "pagina_heritage_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_invito_path_idx" ON "pagina_heritage_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_invito_locales_locale_parent_id_uniqu" ON "pagina_heritage_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_invito_locales_parent_id_idx" ON "pagina_heritage_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_immagine_idx" ON "pagina_heritage" USING btree ("immagine_id");
  CREATE INDEX "pagina_heritage_qualita_qualita_immagine_idx" ON "pagina_heritage" USING btree ("qualita_immagine_id");
  CREATE INDEX "pagina_heritage_citazione_citazione_immagine_idx" ON "pagina_heritage" USING btree ("citazione_immagine_id");
  CREATE INDEX "pagina_heritage_produzione_produzione_immagine_idx" ON "pagina_heritage" USING btree ("produzione_immagine_id");
  CREATE INDEX "pagina_heritage_seo_seo_immagine_idx" ON "pagina_heritage" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_heritage_locales_locale_parent_id_unique" ON "pagina_heritage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_locales_parent_id_idx" ON "pagina_heritage_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_rels_order_idx" ON "pagina_heritage_rels" USING btree ("order");
  CREATE INDEX "pagina_heritage_rels_parent_idx" ON "pagina_heritage_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_heritage_rels_path_idx" ON "pagina_heritage_rels" USING btree ("path");
  CREATE INDEX "pagina_heritage_rels_media_id_idx" ON "pagina_heritage_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pagine_heritage_fk" FOREIGN KEY ("pagine_heritage_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pagine_heritage_id_idx" ON "payload_locked_documents_rels" USING btree ("pagine_heritage_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pagine_heritage_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_capitoli" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_capitoli_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_punti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_punti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_pulsanti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_pulsanti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_numeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_numeri_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_timeline_tappe" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_timeline_tappe_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_primati_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_primati_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_qualita_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_qualita_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_produzione_punti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_produzione_punti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_collezioni_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_collezioni_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_cta_pulsanti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_cta_pulsanti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pagine_heritage_numeri" CASCADE;
  DROP TABLE "pagine_heritage_numeri_locales" CASCADE;
  DROP TABLE "pagine_heritage_capitoli" CASCADE;
  DROP TABLE "pagine_heritage_capitoli_locales" CASCADE;
  DROP TABLE "pagine_heritage_punti_voci" CASCADE;
  DROP TABLE "pagine_heritage_punti_voci_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_testo" CASCADE;
  DROP TABLE "pagine_heritage_blocks_testo_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagine_heritage_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_slider" CASCADE;
  DROP TABLE "pagine_heritage_blocks_slider_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagine_heritage_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_prodotti" CASCADE;
  DROP TABLE "pagine_heritage_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_citazione" CASCADE;
  DROP TABLE "pagine_heritage_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_domande_voci" CASCADE;
  DROP TABLE "pagine_heritage_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_domande" CASCADE;
  DROP TABLE "pagine_heritage_blocks_domande_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_invito" CASCADE;
  DROP TABLE "pagine_heritage_blocks_invito_locales" CASCADE;
  DROP TABLE "pagine_heritage" CASCADE;
  DROP TABLE "pagine_heritage_locales" CASCADE;
  DROP TABLE "pagine_heritage_rels" CASCADE;
  DROP TABLE "pagina_heritage_pulsanti" CASCADE;
  DROP TABLE "pagina_heritage_pulsanti_locales" CASCADE;
  DROP TABLE "pagina_heritage_numeri" CASCADE;
  DROP TABLE "pagina_heritage_numeri_locales" CASCADE;
  DROP TABLE "pagina_heritage_timeline_tappe" CASCADE;
  DROP TABLE "pagina_heritage_timeline_tappe_locales" CASCADE;
  DROP TABLE "pagina_heritage_primati_voci" CASCADE;
  DROP TABLE "pagina_heritage_primati_voci_locales" CASCADE;
  DROP TABLE "pagina_heritage_qualita_voci" CASCADE;
  DROP TABLE "pagina_heritage_qualita_voci_locales" CASCADE;
  DROP TABLE "pagina_heritage_produzione_punti" CASCADE;
  DROP TABLE "pagina_heritage_produzione_punti_locales" CASCADE;
  DROP TABLE "pagina_heritage_collezioni_voci" CASCADE;
  DROP TABLE "pagina_heritage_collezioni_voci_locales" CASCADE;
  DROP TABLE "pagina_heritage_cta_pulsanti" CASCADE;
  DROP TABLE "pagina_heritage_cta_pulsanti_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_testo" CASCADE;
  DROP TABLE "pagina_heritage_blocks_testo_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_immagine_testo" CASCADE;
  DROP TABLE "pagina_heritage_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_slider" CASCADE;
  DROP TABLE "pagina_heritage_blocks_slider_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_prodotti_voci" CASCADE;
  DROP TABLE "pagina_heritage_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_prodotti" CASCADE;
  DROP TABLE "pagina_heritage_blocks_prodotti_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_citazione" CASCADE;
  DROP TABLE "pagina_heritage_blocks_citazione_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_domande_voci" CASCADE;
  DROP TABLE "pagina_heritage_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_domande" CASCADE;
  DROP TABLE "pagina_heritage_blocks_domande_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_invito" CASCADE;
  DROP TABLE "pagina_heritage_blocks_invito_locales" CASCADE;
  DROP TABLE "pagina_heritage" CASCADE;
  DROP TABLE "pagina_heritage_locales" CASCADE;
  DROP TABLE "pagina_heritage_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pagine_heritage_fk";
  
  DROP INDEX "payload_locked_documents_rels_pagine_heritage_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pagine_heritage_id";
  DROP TYPE "public"."enum_pagine_heritage_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagine_heritage_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_slider_formato";
  DROP TYPE "public"."enum_pagine_heritage_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_invito_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_testo_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_pagina_heritage_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_slider_formato";
  DROP TYPE "public"."enum_pagina_heritage_blocks_slider_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_domande_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_invito_sfondo";`)
}
