import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contract_casi_categorie" AS ENUM('hotel', 'risto', 'spa', 'resid', 'urbano');
  CREATE TYPE "public"."enum_contract_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum_contract_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum_contract_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_sezione" AS ENUM('principale', 'hospitality', 'residenziale', 'urbano', 'cataloghi', 'area-riservata');
  CREATE TYPE "public"."enum_contract_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contract_v_version_casi_categorie" AS ENUM('hotel', 'risto', 'spa', 'resid', 'urbano');
  CREATE TYPE "public"."enum__contract_v_blocks_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_immagine_testo_lato" AS ENUM('sinistra', 'destra');
  CREATE TYPE "public"."enum__contract_v_blocks_immagine_testo_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_slider_formato" AS ENUM('largo', 'panoramico', 'classico');
  CREATE TYPE "public"."enum__contract_v_blocks_slider_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_prodotti_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_citazione_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_domande_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_invito_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_version_sezione" AS ENUM('principale', 'hospitality', 'residenziale', 'urbano', 'cataloghi', 'area-riservata');
  CREATE TYPE "public"."enum__contract_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contract_v_published_locale" AS ENUM('it', 'en');
  CREATE TABLE "contract_punti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contract_punti_voci_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_galleria_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "contract_galleria_voci_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_casi_categorie" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_contract_casi_categorie",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contract_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "contract_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_cataloghi_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"file" varchar
  );
  
  CREATE TABLE "contract_cataloghi_voci_locales" (
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_contract_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum_contract_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum_contract_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum_contract_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum_contract_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer
  );
  
  CREATE TABLE "contract_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_contract_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_contract_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contract_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sfondo" "enum_contract_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum_contract_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contract" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sezione" "enum_contract_sezione",
  	"ordine" numeric DEFAULT 10,
  	"immagine_id" integer,
  	"cataloghi_mostra" boolean DEFAULT false,
  	"accesso_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_contract_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "contract_locales" (
  	"nome" varchar,
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"estratto" varchar,
  	"punti_kicker" varchar,
  	"punti_titolo" varchar,
  	"galleria_kicker" varchar,
  	"galleria_titolo" varchar,
  	"casi_kicker" varchar,
  	"casi_titolo" varchar,
  	"prodotti_kicker" varchar,
  	"prodotti_titolo" varchar,
  	"prodotti_testo" varchar,
  	"cataloghi_kicker" varchar,
  	"cataloghi_titolo" varchar,
  	"cataloghi_testo" varchar,
  	"cataloghi_dopo_invio" varchar,
  	"accesso_kicker" varchar,
  	"accesso_titolo" varchar,
  	"accesso_testo" varchar,
  	"accesso_pulsante" varchar,
  	"accesso_nota" varchar,
  	"cta_kicker" varchar,
  	"cta_titolo" varchar,
  	"cta_testo" varchar,
  	"cta_pulsante" varchar,
  	"cta_grazie" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contract_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_contract_v_version_punti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_version_punti_voci_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_version_galleria_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_version_galleria_voci_locales" (
  	"didascalia" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_version_casi_categorie" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__contract_v_version_casi_categorie",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_contract_v_version_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_version_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_version_cataloghi_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"file" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_version_cataloghi_voci_locales" (
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__contract_v_blocks_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_immagine_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"lato" "enum__contract_v_blocks_immagine_testo_lato" DEFAULT 'sinistra',
  	"link" varchar,
  	"sfondo" "enum__contract_v_blocks_immagine_testo_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_immagine_testo_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lightbox" boolean DEFAULT true,
  	"formato" "enum__contract_v_blocks_slider_formato" DEFAULT 'largo',
  	"sfondo" "enum__contract_v_blocks_slider_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_slider_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_prodotti_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"url" varchar,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_prodotti_voci_locales" (
  	"nome" varchar,
  	"tipo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_prodotti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__contract_v_blocks_prodotti_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_prodotti_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_citazione" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__contract_v_blocks_citazione_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_citazione_locales" (
  	"testo" varchar,
  	"autore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_domande_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_domande_voci_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_domande" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sfondo" "enum__contract_v_blocks_domande_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_domande_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_invito" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"sfondo" "enum__contract_v_blocks_invito_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_invito_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"testo" varchar,
  	"pulsante" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_sezione" "enum__contract_v_version_sezione",
  	"version_ordine" numeric DEFAULT 10,
  	"version_immagine_id" integer,
  	"version_cataloghi_mostra" boolean DEFAULT false,
  	"version_accesso_link" varchar,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__contract_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contract_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_contract_v_locales" (
  	"version_nome" varchar,
  	"version_kicker" varchar,
  	"version_titolo" varchar,
  	"version_testo" varchar,
  	"version_estratto" varchar,
  	"version_punti_kicker" varchar,
  	"version_punti_titolo" varchar,
  	"version_galleria_kicker" varchar,
  	"version_galleria_titolo" varchar,
  	"version_casi_kicker" varchar,
  	"version_casi_titolo" varchar,
  	"version_prodotti_kicker" varchar,
  	"version_prodotti_titolo" varchar,
  	"version_prodotti_testo" varchar,
  	"version_cataloghi_kicker" varchar,
  	"version_cataloghi_titolo" varchar,
  	"version_cataloghi_testo" varchar,
  	"version_cataloghi_dopo_invio" varchar,
  	"version_accesso_kicker" varchar,
  	"version_accesso_titolo" varchar,
  	"version_accesso_testo" varchar,
  	"version_accesso_pulsante" varchar,
  	"version_accesso_nota" varchar,
  	"version_cta_kicker" varchar,
  	"version_cta_titolo" varchar,
  	"version_cta_testo" varchar,
  	"version_cta_pulsante" varchar,
  	"version_cta_grazie" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contract_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contract_id" integer;
  ALTER TABLE "contract_punti_voci" ADD CONSTRAINT "contract_punti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_punti_voci_locales" ADD CONSTRAINT "contract_punti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_punti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_galleria_voci" ADD CONSTRAINT "contract_galleria_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_galleria_voci" ADD CONSTRAINT "contract_galleria_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_galleria_voci_locales" ADD CONSTRAINT "contract_galleria_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_galleria_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_casi_categorie" ADD CONSTRAINT "contract_casi_categorie_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_prodotti_voci" ADD CONSTRAINT "contract_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_prodotti_voci" ADD CONSTRAINT "contract_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_prodotti_voci" ADD CONSTRAINT "contract_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_prodotti_voci_locales" ADD CONSTRAINT "contract_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_cataloghi_voci" ADD CONSTRAINT "contract_cataloghi_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_cataloghi_voci" ADD CONSTRAINT "contract_cataloghi_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_cataloghi_voci_locales" ADD CONSTRAINT "contract_cataloghi_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_cataloghi_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_testo" ADD CONSTRAINT "contract_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_testo_locales" ADD CONSTRAINT "contract_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_immagine_testo" ADD CONSTRAINT "contract_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_blocks_immagine_testo" ADD CONSTRAINT "contract_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_immagine_testo_locales" ADD CONSTRAINT "contract_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_slider" ADD CONSTRAINT "contract_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_slider_locales" ADD CONSTRAINT "contract_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti_voci" ADD CONSTRAINT "contract_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti_voci" ADD CONSTRAINT "contract_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti_voci" ADD CONSTRAINT "contract_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti_voci_locales" ADD CONSTRAINT "contract_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti" ADD CONSTRAINT "contract_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_prodotti_locales" ADD CONSTRAINT "contract_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_citazione" ADD CONSTRAINT "contract_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_citazione_locales" ADD CONSTRAINT "contract_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_domande_voci" ADD CONSTRAINT "contract_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_domande_voci_locales" ADD CONSTRAINT "contract_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_domande" ADD CONSTRAINT "contract_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_domande_locales" ADD CONSTRAINT "contract_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_invito" ADD CONSTRAINT "contract_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_invito_locales" ADD CONSTRAINT "contract_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract" ADD CONSTRAINT "contract_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract" ADD CONSTRAINT "contract_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contract_locales" ADD CONSTRAINT "contract_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_rels" ADD CONSTRAINT "contract_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_rels" ADD CONSTRAINT "contract_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_punti_voci" ADD CONSTRAINT "_contract_v_version_punti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_punti_voci_locales" ADD CONSTRAINT "_contract_v_version_punti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_version_punti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_galleria_voci" ADD CONSTRAINT "_contract_v_version_galleria_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_version_galleria_voci" ADD CONSTRAINT "_contract_v_version_galleria_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_galleria_voci_locales" ADD CONSTRAINT "_contract_v_version_galleria_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_version_galleria_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_casi_categorie" ADD CONSTRAINT "_contract_v_version_casi_categorie_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_prodotti_voci" ADD CONSTRAINT "_contract_v_version_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_version_prodotti_voci" ADD CONSTRAINT "_contract_v_version_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_version_prodotti_voci" ADD CONSTRAINT "_contract_v_version_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_prodotti_voci_locales" ADD CONSTRAINT "_contract_v_version_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_version_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_cataloghi_voci" ADD CONSTRAINT "_contract_v_version_cataloghi_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_version_cataloghi_voci" ADD CONSTRAINT "_contract_v_version_cataloghi_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_version_cataloghi_voci_locales" ADD CONSTRAINT "_contract_v_version_cataloghi_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_version_cataloghi_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_testo" ADD CONSTRAINT "_contract_v_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_testo_locales" ADD CONSTRAINT "_contract_v_blocks_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_immagine_testo" ADD CONSTRAINT "_contract_v_blocks_immagine_testo_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_immagine_testo" ADD CONSTRAINT "_contract_v_blocks_immagine_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_immagine_testo_locales" ADD CONSTRAINT "_contract_v_blocks_immagine_testo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_immagine_testo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_slider" ADD CONSTRAINT "_contract_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_slider_locales" ADD CONSTRAINT "_contract_v_blocks_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti_voci" ADD CONSTRAINT "_contract_v_blocks_prodotti_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti_voci" ADD CONSTRAINT "_contract_v_blocks_prodotti_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti_voci" ADD CONSTRAINT "_contract_v_blocks_prodotti_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti_voci_locales" ADD CONSTRAINT "_contract_v_blocks_prodotti_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_prodotti_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti" ADD CONSTRAINT "_contract_v_blocks_prodotti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_prodotti_locales" ADD CONSTRAINT "_contract_v_blocks_prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_citazione" ADD CONSTRAINT "_contract_v_blocks_citazione_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_citazione_locales" ADD CONSTRAINT "_contract_v_blocks_citazione_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_citazione"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_domande_voci" ADD CONSTRAINT "_contract_v_blocks_domande_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_domande_voci_locales" ADD CONSTRAINT "_contract_v_blocks_domande_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_domande_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_domande" ADD CONSTRAINT "_contract_v_blocks_domande_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_domande_locales" ADD CONSTRAINT "_contract_v_blocks_domande_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_domande"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_invito" ADD CONSTRAINT "_contract_v_blocks_invito_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_invito_locales" ADD CONSTRAINT "_contract_v_blocks_invito_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_invito"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v" ADD CONSTRAINT "_contract_v_parent_id_contract_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contract"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v" ADD CONSTRAINT "_contract_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v" ADD CONSTRAINT "_contract_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contract_v_locales" ADD CONSTRAINT "_contract_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_rels" ADD CONSTRAINT "_contract_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_rels" ADD CONSTRAINT "_contract_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contract_punti_voci_order_idx" ON "contract_punti_voci" USING btree ("_order");
  CREATE INDEX "contract_punti_voci_parent_id_idx" ON "contract_punti_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contract_punti_voci_locales_locale_parent_id_unique" ON "contract_punti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_punti_voci_locales_parent_id_idx" ON "contract_punti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_galleria_voci_order_idx" ON "contract_galleria_voci" USING btree ("_order");
  CREATE INDEX "contract_galleria_voci_parent_id_idx" ON "contract_galleria_voci" USING btree ("_parent_id");
  CREATE INDEX "contract_galleria_voci_immagine_idx" ON "contract_galleria_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "contract_galleria_voci_locales_locale_parent_id_unique" ON "contract_galleria_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_galleria_voci_locales_parent_id_idx" ON "contract_galleria_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_casi_categorie_order_idx" ON "contract_casi_categorie" USING btree ("order");
  CREATE INDEX "contract_casi_categorie_parent_idx" ON "contract_casi_categorie" USING btree ("parent_id");
  CREATE INDEX "contract_prodotti_voci_order_idx" ON "contract_prodotti_voci" USING btree ("_order");
  CREATE INDEX "contract_prodotti_voci_parent_id_idx" ON "contract_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "contract_prodotti_voci_prodotto_idx" ON "contract_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "contract_prodotti_voci_immagine_idx" ON "contract_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "contract_prodotti_voci_locales_locale_parent_id_unique" ON "contract_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_prodotti_voci_locales_parent_id_idx" ON "contract_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_cataloghi_voci_order_idx" ON "contract_cataloghi_voci" USING btree ("_order");
  CREATE INDEX "contract_cataloghi_voci_parent_id_idx" ON "contract_cataloghi_voci" USING btree ("_parent_id");
  CREATE INDEX "contract_cataloghi_voci_immagine_idx" ON "contract_cataloghi_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "contract_cataloghi_voci_locales_locale_parent_id_unique" ON "contract_cataloghi_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_cataloghi_voci_locales_parent_id_idx" ON "contract_cataloghi_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_testo_order_idx" ON "contract_blocks_testo" USING btree ("_order");
  CREATE INDEX "contract_blocks_testo_parent_id_idx" ON "contract_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_testo_path_idx" ON "contract_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_testo_locales_locale_parent_id_unique" ON "contract_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_testo_locales_parent_id_idx" ON "contract_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_immagine_testo_order_idx" ON "contract_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "contract_blocks_immagine_testo_parent_id_idx" ON "contract_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_immagine_testo_path_idx" ON "contract_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "contract_blocks_immagine_testo_immagine_idx" ON "contract_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "contract_blocks_immagine_testo_locales_locale_parent_id_uniq" ON "contract_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_immagine_testo_locales_parent_id_idx" ON "contract_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_slider_order_idx" ON "contract_blocks_slider" USING btree ("_order");
  CREATE INDEX "contract_blocks_slider_parent_id_idx" ON "contract_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_slider_path_idx" ON "contract_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_slider_locales_locale_parent_id_unique" ON "contract_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_slider_locales_parent_id_idx" ON "contract_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_prodotti_voci_order_idx" ON "contract_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "contract_blocks_prodotti_voci_parent_id_idx" ON "contract_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_prodotti_voci_prodotto_idx" ON "contract_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "contract_blocks_prodotti_voci_immagine_idx" ON "contract_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "contract_blocks_prodotti_voci_locales_locale_parent_id_uniqu" ON "contract_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_prodotti_voci_locales_parent_id_idx" ON "contract_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_prodotti_order_idx" ON "contract_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "contract_blocks_prodotti_parent_id_idx" ON "contract_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_prodotti_path_idx" ON "contract_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_prodotti_locales_locale_parent_id_unique" ON "contract_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_prodotti_locales_parent_id_idx" ON "contract_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_citazione_order_idx" ON "contract_blocks_citazione" USING btree ("_order");
  CREATE INDEX "contract_blocks_citazione_parent_id_idx" ON "contract_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_citazione_path_idx" ON "contract_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_citazione_locales_locale_parent_id_unique" ON "contract_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_citazione_locales_parent_id_idx" ON "contract_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_domande_voci_order_idx" ON "contract_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "contract_blocks_domande_voci_parent_id_idx" ON "contract_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contract_blocks_domande_voci_locales_locale_parent_id_unique" ON "contract_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_domande_voci_locales_parent_id_idx" ON "contract_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_domande_order_idx" ON "contract_blocks_domande" USING btree ("_order");
  CREATE INDEX "contract_blocks_domande_parent_id_idx" ON "contract_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_domande_path_idx" ON "contract_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_domande_locales_locale_parent_id_unique" ON "contract_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_domande_locales_parent_id_idx" ON "contract_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_invito_order_idx" ON "contract_blocks_invito" USING btree ("_order");
  CREATE INDEX "contract_blocks_invito_parent_id_idx" ON "contract_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_invito_path_idx" ON "contract_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_invito_locales_locale_parent_id_unique" ON "contract_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_invito_locales_parent_id_idx" ON "contract_blocks_invito_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contract_sezione_idx" ON "contract" USING btree ("sezione");
  CREATE INDEX "contract_immagine_idx" ON "contract" USING btree ("immagine_id");
  CREATE INDEX "contract_seo_seo_immagine_idx" ON "contract" USING btree ("seo_immagine_id");
  CREATE INDEX "contract_updated_at_idx" ON "contract" USING btree ("updated_at");
  CREATE INDEX "contract_created_at_idx" ON "contract" USING btree ("created_at");
  CREATE INDEX "contract__status_idx" ON "contract" USING btree ("_status");
  CREATE UNIQUE INDEX "contract_locales_locale_parent_id_unique" ON "contract_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_locales_parent_id_idx" ON "contract_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_rels_order_idx" ON "contract_rels" USING btree ("order");
  CREATE INDEX "contract_rels_parent_idx" ON "contract_rels" USING btree ("parent_id");
  CREATE INDEX "contract_rels_path_idx" ON "contract_rels" USING btree ("path");
  CREATE INDEX "contract_rels_media_id_idx" ON "contract_rels" USING btree ("media_id");
  CREATE INDEX "_contract_v_version_punti_voci_order_idx" ON "_contract_v_version_punti_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_version_punti_voci_parent_id_idx" ON "_contract_v_version_punti_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contract_v_version_punti_voci_locales_locale_parent_id_uniq" ON "_contract_v_version_punti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_version_punti_voci_locales_parent_id_idx" ON "_contract_v_version_punti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_galleria_voci_order_idx" ON "_contract_v_version_galleria_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_version_galleria_voci_parent_id_idx" ON "_contract_v_version_galleria_voci" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_galleria_voci_immagine_idx" ON "_contract_v_version_galleria_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_contract_v_version_galleria_voci_locales_locale_parent_id_u" ON "_contract_v_version_galleria_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_version_galleria_voci_locales_parent_id_idx" ON "_contract_v_version_galleria_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_casi_categorie_order_idx" ON "_contract_v_version_casi_categorie" USING btree ("order");
  CREATE INDEX "_contract_v_version_casi_categorie_parent_idx" ON "_contract_v_version_casi_categorie" USING btree ("parent_id");
  CREATE INDEX "_contract_v_version_prodotti_voci_order_idx" ON "_contract_v_version_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_version_prodotti_voci_parent_id_idx" ON "_contract_v_version_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_prodotti_voci_prodotto_idx" ON "_contract_v_version_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_contract_v_version_prodotti_voci_immagine_idx" ON "_contract_v_version_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_contract_v_version_prodotti_voci_locales_locale_parent_id_u" ON "_contract_v_version_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_version_prodotti_voci_locales_parent_id_idx" ON "_contract_v_version_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_cataloghi_voci_order_idx" ON "_contract_v_version_cataloghi_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_version_cataloghi_voci_parent_id_idx" ON "_contract_v_version_cataloghi_voci" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_version_cataloghi_voci_immagine_idx" ON "_contract_v_version_cataloghi_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_contract_v_version_cataloghi_voci_locales_locale_parent_id_" ON "_contract_v_version_cataloghi_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_version_cataloghi_voci_locales_parent_id_idx" ON "_contract_v_version_cataloghi_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_testo_order_idx" ON "_contract_v_blocks_testo" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_testo_parent_id_idx" ON "_contract_v_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_testo_path_idx" ON "_contract_v_blocks_testo" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_testo_locales_locale_parent_id_unique" ON "_contract_v_blocks_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_testo_locales_parent_id_idx" ON "_contract_v_blocks_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_immagine_testo_order_idx" ON "_contract_v_blocks_immagine_testo" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_immagine_testo_parent_id_idx" ON "_contract_v_blocks_immagine_testo" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_immagine_testo_path_idx" ON "_contract_v_blocks_immagine_testo" USING btree ("_path");
  CREATE INDEX "_contract_v_blocks_immagine_testo_immagine_idx" ON "_contract_v_blocks_immagine_testo" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_contract_v_blocks_immagine_testo_locales_locale_parent_id_u" ON "_contract_v_blocks_immagine_testo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_immagine_testo_locales_parent_id_idx" ON "_contract_v_blocks_immagine_testo_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_slider_order_idx" ON "_contract_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_slider_parent_id_idx" ON "_contract_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_slider_path_idx" ON "_contract_v_blocks_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_slider_locales_locale_parent_id_unique" ON "_contract_v_blocks_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_slider_locales_parent_id_idx" ON "_contract_v_blocks_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_voci_order_idx" ON "_contract_v_blocks_prodotti_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_prodotti_voci_parent_id_idx" ON "_contract_v_blocks_prodotti_voci" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_voci_prodotto_idx" ON "_contract_v_blocks_prodotti_voci" USING btree ("prodotto_id");
  CREATE INDEX "_contract_v_blocks_prodotti_voci_immagine_idx" ON "_contract_v_blocks_prodotti_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_contract_v_blocks_prodotti_voci_locales_locale_parent_id_un" ON "_contract_v_blocks_prodotti_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_voci_locales_parent_id_idx" ON "_contract_v_blocks_prodotti_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_order_idx" ON "_contract_v_blocks_prodotti" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_prodotti_parent_id_idx" ON "_contract_v_blocks_prodotti" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_path_idx" ON "_contract_v_blocks_prodotti" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_prodotti_locales_locale_parent_id_unique" ON "_contract_v_blocks_prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_prodotti_locales_parent_id_idx" ON "_contract_v_blocks_prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_citazione_order_idx" ON "_contract_v_blocks_citazione" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_citazione_parent_id_idx" ON "_contract_v_blocks_citazione" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_citazione_path_idx" ON "_contract_v_blocks_citazione" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_citazione_locales_locale_parent_id_unique" ON "_contract_v_blocks_citazione_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_citazione_locales_parent_id_idx" ON "_contract_v_blocks_citazione_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_domande_voci_order_idx" ON "_contract_v_blocks_domande_voci" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_domande_voci_parent_id_idx" ON "_contract_v_blocks_domande_voci" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contract_v_blocks_domande_voci_locales_locale_parent_id_uni" ON "_contract_v_blocks_domande_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_domande_voci_locales_parent_id_idx" ON "_contract_v_blocks_domande_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_domande_order_idx" ON "_contract_v_blocks_domande" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_domande_parent_id_idx" ON "_contract_v_blocks_domande" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_domande_path_idx" ON "_contract_v_blocks_domande" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_domande_locales_locale_parent_id_unique" ON "_contract_v_blocks_domande_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_domande_locales_parent_id_idx" ON "_contract_v_blocks_domande_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_invito_order_idx" ON "_contract_v_blocks_invito" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_invito_parent_id_idx" ON "_contract_v_blocks_invito" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_invito_path_idx" ON "_contract_v_blocks_invito" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_invito_locales_locale_parent_id_unique" ON "_contract_v_blocks_invito_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_invito_locales_parent_id_idx" ON "_contract_v_blocks_invito_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_parent_idx" ON "_contract_v" USING btree ("parent_id");
  CREATE INDEX "_contract_v_version_version_sezione_idx" ON "_contract_v" USING btree ("version_sezione");
  CREATE INDEX "_contract_v_version_version_immagine_idx" ON "_contract_v" USING btree ("version_immagine_id");
  CREATE INDEX "_contract_v_version_seo_version_seo_immagine_idx" ON "_contract_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_contract_v_version_version_updated_at_idx" ON "_contract_v" USING btree ("version_updated_at");
  CREATE INDEX "_contract_v_version_version_created_at_idx" ON "_contract_v" USING btree ("version_created_at");
  CREATE INDEX "_contract_v_version_version__status_idx" ON "_contract_v" USING btree ("version__status");
  CREATE INDEX "_contract_v_created_at_idx" ON "_contract_v" USING btree ("created_at");
  CREATE INDEX "_contract_v_updated_at_idx" ON "_contract_v" USING btree ("updated_at");
  CREATE INDEX "_contract_v_snapshot_idx" ON "_contract_v" USING btree ("snapshot");
  CREATE INDEX "_contract_v_published_locale_idx" ON "_contract_v" USING btree ("published_locale");
  CREATE INDEX "_contract_v_latest_idx" ON "_contract_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_contract_v_locales_locale_parent_id_unique" ON "_contract_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_locales_parent_id_idx" ON "_contract_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_rels_order_idx" ON "_contract_v_rels" USING btree ("order");
  CREATE INDEX "_contract_v_rels_parent_idx" ON "_contract_v_rels" USING btree ("parent_id");
  CREATE INDEX "_contract_v_rels_path_idx" ON "_contract_v_rels" USING btree ("path");
  CREATE INDEX "_contract_v_rels_media_id_idx" ON "_contract_v_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contract_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contract_id_idx" ON "payload_locked_documents_rels" USING btree ("contract_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contract_punti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_punti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_galleria_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_galleria_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_casi_categorie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_cataloghi_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_cataloghi_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_punti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_punti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_galleria_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_galleria_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_casi_categorie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_cataloghi_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_version_cataloghi_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_immagine_testo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_immagine_testo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_slider_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_prodotti_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_prodotti_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_prodotti" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_prodotti_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_citazione" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_citazione_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_domande_voci" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_domande_voci_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_domande" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_domande_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_invito" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_invito_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contract_punti_voci" CASCADE;
  DROP TABLE "contract_punti_voci_locales" CASCADE;
  DROP TABLE "contract_galleria_voci" CASCADE;
  DROP TABLE "contract_galleria_voci_locales" CASCADE;
  DROP TABLE "contract_casi_categorie" CASCADE;
  DROP TABLE "contract_prodotti_voci" CASCADE;
  DROP TABLE "contract_prodotti_voci_locales" CASCADE;
  DROP TABLE "contract_cataloghi_voci" CASCADE;
  DROP TABLE "contract_cataloghi_voci_locales" CASCADE;
  DROP TABLE "contract_blocks_testo" CASCADE;
  DROP TABLE "contract_blocks_testo_locales" CASCADE;
  DROP TABLE "contract_blocks_immagine_testo" CASCADE;
  DROP TABLE "contract_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "contract_blocks_slider" CASCADE;
  DROP TABLE "contract_blocks_slider_locales" CASCADE;
  DROP TABLE "contract_blocks_prodotti_voci" CASCADE;
  DROP TABLE "contract_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "contract_blocks_prodotti" CASCADE;
  DROP TABLE "contract_blocks_prodotti_locales" CASCADE;
  DROP TABLE "contract_blocks_citazione" CASCADE;
  DROP TABLE "contract_blocks_citazione_locales" CASCADE;
  DROP TABLE "contract_blocks_domande_voci" CASCADE;
  DROP TABLE "contract_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "contract_blocks_domande" CASCADE;
  DROP TABLE "contract_blocks_domande_locales" CASCADE;
  DROP TABLE "contract_blocks_invito" CASCADE;
  DROP TABLE "contract_blocks_invito_locales" CASCADE;
  DROP TABLE "contract" CASCADE;
  DROP TABLE "contract_locales" CASCADE;
  DROP TABLE "contract_rels" CASCADE;
  DROP TABLE "_contract_v_version_punti_voci" CASCADE;
  DROP TABLE "_contract_v_version_punti_voci_locales" CASCADE;
  DROP TABLE "_contract_v_version_galleria_voci" CASCADE;
  DROP TABLE "_contract_v_version_galleria_voci_locales" CASCADE;
  DROP TABLE "_contract_v_version_casi_categorie" CASCADE;
  DROP TABLE "_contract_v_version_prodotti_voci" CASCADE;
  DROP TABLE "_contract_v_version_prodotti_voci_locales" CASCADE;
  DROP TABLE "_contract_v_version_cataloghi_voci" CASCADE;
  DROP TABLE "_contract_v_version_cataloghi_voci_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_testo" CASCADE;
  DROP TABLE "_contract_v_blocks_testo_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_immagine_testo" CASCADE;
  DROP TABLE "_contract_v_blocks_immagine_testo_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_slider" CASCADE;
  DROP TABLE "_contract_v_blocks_slider_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_prodotti_voci" CASCADE;
  DROP TABLE "_contract_v_blocks_prodotti_voci_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_prodotti" CASCADE;
  DROP TABLE "_contract_v_blocks_prodotti_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_citazione" CASCADE;
  DROP TABLE "_contract_v_blocks_citazione_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_domande_voci" CASCADE;
  DROP TABLE "_contract_v_blocks_domande_voci_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_domande" CASCADE;
  DROP TABLE "_contract_v_blocks_domande_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_invito" CASCADE;
  DROP TABLE "_contract_v_blocks_invito_locales" CASCADE;
  DROP TABLE "_contract_v" CASCADE;
  DROP TABLE "_contract_v_locales" CASCADE;
  DROP TABLE "_contract_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contract_fk";
  
  DROP INDEX "payload_locked_documents_rels_contract_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contract_id";
  DROP TYPE "public"."enum_contract_casi_categorie";
  DROP TYPE "public"."enum_contract_blocks_testo_sfondo";
  DROP TYPE "public"."enum_contract_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum_contract_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum_contract_blocks_slider_formato";
  DROP TYPE "public"."enum_contract_blocks_slider_sfondo";
  DROP TYPE "public"."enum_contract_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum_contract_blocks_citazione_sfondo";
  DROP TYPE "public"."enum_contract_blocks_domande_sfondo";
  DROP TYPE "public"."enum_contract_blocks_invito_sfondo";
  DROP TYPE "public"."enum_contract_sezione";
  DROP TYPE "public"."enum_contract_status";
  DROP TYPE "public"."enum__contract_v_version_casi_categorie";
  DROP TYPE "public"."enum__contract_v_blocks_testo_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_immagine_testo_lato";
  DROP TYPE "public"."enum__contract_v_blocks_immagine_testo_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_slider_formato";
  DROP TYPE "public"."enum__contract_v_blocks_slider_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_prodotti_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_citazione_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_domande_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_invito_sfondo";
  DROP TYPE "public"."enum__contract_v_version_sezione";
  DROP TYPE "public"."enum__contract_v_version_status";
  DROP TYPE "public"."enum__contract_v_published_locale";`)
}
