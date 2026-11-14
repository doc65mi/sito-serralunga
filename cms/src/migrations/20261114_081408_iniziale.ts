import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('it');
  CREATE TYPE "public"."enum_prodotti_famiglia" AS ENUM('vasi', 'arredo', 'illuminazione', 'accessori');
  CREATE TYPE "public"."enum_prodotti_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__prodotti_v_version_famiglia" AS ENUM('vasi', 'arredo', 'illuminazione', 'accessori');
  CREATE TYPE "public"."enum__prodotti_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__prodotti_v_published_locale" AS ENUM('it');
  CREATE TYPE "public"."enum_case_history_coppia_immagini_allineamento" AS ENUM('centro', 'alto', 'basso');
  CREATE TYPE "public"."enum_case_history_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_history_v_version_coppia_immagini_allineamento" AS ENUM('centro', 'alto', 'basso');
  CREATE TYPE "public"."enum__case_history_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_history_v_published_locale" AS ENUM('it');
  CREATE TYPE "public"."enum_designer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__designer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__designer_v_published_locale" AS ENUM('it');
  CREATE TYPE "public"."enum_richieste_stato" AS ENUM('nuova', 'lavorazione', 'gestita');
  CREATE TYPE "public"."enum_home_tipo_apertura" AS ENUM('slide', 'video');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_tipo_apertura" AS ENUM('slide', 'video');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('it');
  CREATE TYPE "public"."enum_impostazioni_accento" AS ENUM('#A08A5F', '#8C8B7A', '#7C6A4E', '#B4553B');
  CREATE TABLE "prodotti_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "prodotti_colori" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hex" varchar
  );
  
  CREATE TABLE "prodotti_colori_locales" (
  	"nome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_dimensioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_dimensioni_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_specifiche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_specifiche_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_ambiente_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "prodotti_firma_progetto_testi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_firma_progetto_testi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_case_segnaposto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "prodotti_case_segnaposto_locales" (
  	"etichetta" varchar,
  	"titolo" varchar,
  	"nota" varchar DEFAULT 'progetto e foto da fornire',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti_correlati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "prodotti_correlati_locales" (
  	"nome" varchar,
  	"sottotitolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "prodotti" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"scheda_pubblicata" boolean DEFAULT true,
  	"famiglia" "enum_prodotti_famiglia",
  	"designer_id" integer,
  	"immagine_id" integer,
  	"disegno_immagine_id" integer,
  	"disegno_file_id" integer,
  	"ambiente_immagine_grande_id" integer,
  	"richiesta_immagine_id" integer,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_prodotti_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "prodotti_locales" (
  	"nome" varchar,
  	"etichetta_card" varchar,
  	"categoria" varchar,
  	"firma" varchar,
  	"descrizione" varchar,
  	"nota_colori" varchar,
  	"pulsante" varchar DEFAULT 'Richiedi scheda e campionatura',
  	"disegno_titolo" varchar DEFAULT 'Disegno
  e proporzioni',
  	"disegno_testo" varchar,
  	"ambiente_titolo" varchar DEFAULT 'In ambiente',
  	"ambiente_testo" varchar,
  	"firma_progetto_kicker" varchar DEFAULT 'La firma del progetto',
  	"correlati_testo" varchar,
  	"richiesta_kicker" varchar DEFAULT 'Documentazione contract',
  	"richiesta_titolo" varchar DEFAULT 'Scheda tecnica,
  disegni e campioni',
  	"richiesta_testo" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "prodotti_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_history_id" integer
  );
  
  CREATE TABLE "_prodotti_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_colori" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hex" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_colori_locales" (
  	"nome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_dimensioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_dimensioni_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_specifiche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_specifiche_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_ambiente_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_firma_progetto_testi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_firma_progetto_testi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_case_segnaposto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_case_segnaposto_locales" (
  	"etichetta" varchar,
  	"titolo" varchar,
  	"nota" varchar DEFAULT 'progetto e foto da fornire',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_correlati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"immagine_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_correlati_locales" (
  	"nome" varchar,
  	"sottotitolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_scheda_pubblicata" boolean DEFAULT true,
  	"version_famiglia" "enum__prodotti_v_version_famiglia",
  	"version_designer_id" integer,
  	"version_immagine_id" integer,
  	"version_disegno_immagine_id" integer,
  	"version_disegno_file_id" integer,
  	"version_ambiente_immagine_grande_id" integer,
  	"version_richiesta_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__prodotti_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__prodotti_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_prodotti_v_locales" (
  	"version_nome" varchar,
  	"version_etichetta_card" varchar,
  	"version_categoria" varchar,
  	"version_firma" varchar,
  	"version_descrizione" varchar,
  	"version_nota_colori" varchar,
  	"version_pulsante" varchar DEFAULT 'Richiedi scheda e campionatura',
  	"version_disegno_titolo" varchar DEFAULT 'Disegno
  e proporzioni',
  	"version_disegno_testo" varchar,
  	"version_ambiente_titolo" varchar DEFAULT 'In ambiente',
  	"version_ambiente_testo" varchar,
  	"version_firma_progetto_kicker" varchar DEFAULT 'La firma del progetto',
  	"version_correlati_testo" varchar,
  	"version_richiesta_kicker" varchar DEFAULT 'Documentazione contract',
  	"version_richiesta_titolo" varchar DEFAULT 'Scheda tecnica,
  disegni e campioni',
  	"version_richiesta_testo" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_history_id" integer
  );
  
  CREATE TABLE "case_history_progetto_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_history_progetto_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_progetto_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_history_progetto_scheda_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_history_passi_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_coppia_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"allineamento" "enum_case_history_coppia_immagini_allineamento" DEFAULT 'centro'
  );
  
  CREATE TABLE "case_history_protagonista_dati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_history_protagonista_dati_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history_diario_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer
  );
  
  CREATE TABLE "case_history_prodotti_usati_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"immagine_id" integer
  );
  
  CREATE TABLE "case_history_prodotti_usati_voci_locales" (
  	"nome" varchar,
  	"sottotitolo" varchar,
  	"nota" varchar,
  	"segnaposto_immagine" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_history" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"immagine_id" integer,
  	"card_immagine_id" integer,
  	"citazione_immagine_id" integer,
  	"protagonista_immagine_id" integer,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_history_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_history_locales" (
  	"nome" varchar,
  	"kicker" varchar,
  	"titolo" varchar,
  	"introduzione" varchar,
  	"etichetta" varchar,
  	"card_etichetta" varchar,
  	"card_titolo" varchar,
  	"progetto_kicker" varchar DEFAULT 'Il progetto',
  	"progetto_titolo" varchar,
  	"citazione_testo" varchar,
  	"protagonista_kicker" varchar DEFAULT 'Il pezzo protagonista',
  	"protagonista_titolo" varchar,
  	"protagonista_testo" varchar,
  	"diario_titolo" varchar DEFAULT 'Il diario
  della stagione',
  	"diario_testo" varchar,
  	"diario_segnaposto" varchar DEFAULT 'altri scatti
  in alta risoluzione',
  	"prodotti_usati_kicker" varchar DEFAULT 'Prodotti utilizzati',
  	"prodotti_usati_titolo" varchar,
  	"prodotti_usati_testo" varchar,
  	"contatto_kicker" varchar DEFAULT 'Il prossimo progetto',
  	"contatto_titolo" varchar,
  	"contatto_testo" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_version_progetto_paragrafi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_progetto_paragrafi_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_version_progetto_scheda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_progetto_scheda_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_version_passi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_passi_locales" (
  	"titolo" varchar,
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_version_coppia_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"allineamento" "enum__case_history_v_version_coppia_immagini_allineamento" DEFAULT 'centro',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_protagonista_dati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_protagonista_dati_locales" (
  	"etichetta" varchar,
  	"valore" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v_version_diario_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_prodotti_usati_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prodotto_id" integer,
  	"immagine_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_history_v_version_prodotti_usati_voci_locales" (
  	"nome" varchar,
  	"sottotitolo" varchar,
  	"nota" varchar,
  	"segnaposto_immagine" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_case_history_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_immagine_id" integer,
  	"version_card_immagine_id" integer,
  	"version_citazione_immagine_id" integer,
  	"version_protagonista_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_history_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__case_history_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_case_history_v_locales" (
  	"version_nome" varchar,
  	"version_kicker" varchar,
  	"version_titolo" varchar,
  	"version_introduzione" varchar,
  	"version_etichetta" varchar,
  	"version_card_etichetta" varchar,
  	"version_card_titolo" varchar,
  	"version_progetto_kicker" varchar DEFAULT 'Il progetto',
  	"version_progetto_titolo" varchar,
  	"version_citazione_testo" varchar,
  	"version_protagonista_kicker" varchar DEFAULT 'Il pezzo protagonista',
  	"version_protagonista_titolo" varchar,
  	"version_protagonista_testo" varchar,
  	"version_diario_titolo" varchar DEFAULT 'Il diario
  della stagione',
  	"version_diario_testo" varchar,
  	"version_diario_segnaposto" varchar DEFAULT 'altri scatti
  in alta risoluzione',
  	"version_prodotti_usati_kicker" varchar DEFAULT 'Prodotti utilizzati',
  	"version_prodotti_usati_titolo" varchar,
  	"version_prodotti_usati_testo" varchar,
  	"version_contatto_kicker" varchar DEFAULT 'Il prossimo progetto',
  	"version_contatto_titolo" varchar,
  	"version_contatto_testo" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "designer_biografia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "designer_biografia_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "designer_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_premi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "designer_premi_locales" (
  	"anno" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"ordine" numeric DEFAULT 10,
  	"scheda_pubblicata" boolean DEFAULT true,
  	"ritratto_id" integer,
  	"ritratto_provvisorio" boolean DEFAULT false,
  	"banner_immagine_id" integer,
  	"pezzi_segnaposto" numeric DEFAULT 0,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_designer_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "designer_locales" (
  	"nome" varchar,
  	"ruolo" varchar,
  	"provenienza" varchar,
  	"estratto" varchar,
  	"estratto_home" varchar,
  	"citazione" varchar,
  	"banner_frase" varchar,
  	"titolo_pezzi" varchar DEFAULT 'I pezzi
  per Serralunga',
  	"cta_kicker" varchar DEFAULT 'Progetti su misura',
  	"cta_titolo" varchar DEFAULT 'Lavoriamo con i designer,
  per il vostro luogo',
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_version_biografia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_version_biografia_locales" (
  	"testo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_version_numeri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_version_numeri_locales" (
  	"valore" varchar,
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v_version_premi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_designer_v_version_premi_locales" (
  	"anno" varchar,
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_designer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_ordine" numeric DEFAULT 10,
  	"version_scheda_pubblicata" boolean DEFAULT true,
  	"version_ritratto_id" integer,
  	"version_ritratto_provvisorio" boolean DEFAULT false,
  	"version_banner_immagine_id" integer,
  	"version_pezzi_segnaposto" numeric DEFAULT 0,
  	"version_seo_immagine_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__designer_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__designer_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_designer_v_locales" (
  	"version_nome" varchar,
  	"version_ruolo" varchar,
  	"version_provenienza" varchar,
  	"version_estratto" varchar,
  	"version_estratto_home" varchar,
  	"version_citazione" varchar,
  	"version_banner_frase" varchar,
  	"version_titolo_pezzi" varchar DEFAULT 'I pezzi
  per Serralunga',
  	"version_cta_kicker" varchar DEFAULT 'Progetti su misura',
  	"version_cta_titolo" varchar DEFAULT 'Lavoriamo con i designer,
  per il vostro luogo',
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credito" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_mini_url" varchar,
  	"sizes_mini_width" numeric,
  	"sizes_mini_height" numeric,
  	"sizes_mini_mime_type" varchar,
  	"sizes_mini_filesize" numeric,
  	"sizes_mini_filename" varchar,
  	"sizes_scheda_url" varchar,
  	"sizes_scheda_width" numeric,
  	"sizes_scheda_height" numeric,
  	"sizes_scheda_mime_type" varchar,
  	"sizes_scheda_filesize" numeric,
  	"sizes_scheda_filename" varchar,
  	"sizes_grande_url" varchar,
  	"sizes_grande_width" numeric,
  	"sizes_grande_height" numeric,
  	"sizes_grande_mime_type" varchar,
  	"sizes_grande_filesize" numeric,
  	"sizes_grande_filename" varchar,
  	"sizes_pieno_url" varchar,
  	"sizes_pieno_width" numeric,
  	"sizes_pieno_height" numeric,
  	"sizes_pieno_mime_type" varchar,
  	"sizes_pieno_filesize" numeric,
  	"sizes_pieno_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "richieste" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"struttura" varchar,
  	"referente" varchar,
  	"email" varchar NOT NULL,
  	"citta" varchar,
  	"messaggio" varchar,
  	"pagina" varchar,
  	"stato" "enum_richieste_stato" DEFAULT 'nuova',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"prodotti_id" integer,
  	"case_history_id" integer,
  	"designer_id" integer,
  	"media_id" integer,
  	"richieste_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  
  CREATE TABLE "home_collezioni_tessere" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "home_collezioni_tessere_locales" (
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tipo_apertura" "enum_home_tipo_apertura" DEFAULT 'slide',
  	"video_file_id" integer,
  	"video_poster_id" integer,
  	"video_link" varchar,
  	"banner_immagine_id" integer,
  	"designer_segnaposto" numeric DEFAULT 0,
  	"citazione_immagine_id" integer,
  	"invito_immagine_id" integer,
  	"seo_immagine_id" integer,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"h1" varchar,
  	"video_kicker" varchar,
  	"video_titolo" varchar,
  	"video_testo" varchar,
  	"video_link_etichetta" varchar,
  	"manifesto_kicker" varchar,
  	"manifesto_testo" varchar,
  	"banner_numero" varchar,
  	"banner_kicker" varchar,
  	"banner_titolo" varchar,
  	"banner_testo" varchar,
  	"materia_kicker" varchar,
  	"materia_titolo" varchar,
  	"materia_testo" varchar,
  	"designer_kicker" varchar,
  	"designer_titolo" varchar,
  	"designer_testo" varchar,
  	"collezioni_titolo" varchar,
  	"collezioni_testo" varchar,
  	"portfolio_kicker" varchar,
  	"portfolio_titolo" varchar,
  	"portfolio_testo" varchar,
  	"citazione_testo" varchar,
  	"citazione_firma" varchar,
  	"invito_kicker" varchar,
  	"invito_titolo" varchar,
  	"invito_testo" varchar,
  	"invito_pulsante" varchar DEFAULT 'Richiedi il volume',
  	"invito_grazie" varchar DEFAULT 'Grazie: vi ricontatteremo a breve con il volume Serralunga.',
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "_home_v_version_collezioni_tessere" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_collezioni_tessere_locales" (
  	"etichetta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_tipo_apertura" "enum__home_v_version_tipo_apertura" DEFAULT 'slide',
  	"version_video_file_id" integer,
  	"version_video_poster_id" integer,
  	"version_video_link" varchar,
  	"version_banner_immagine_id" integer,
  	"version_designer_segnaposto" numeric DEFAULT 0,
  	"version_citazione_immagine_id" integer,
  	"version_invito_immagine_id" integer,
  	"version_seo_immagine_id" integer,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_h1" varchar,
  	"version_video_kicker" varchar,
  	"version_video_titolo" varchar,
  	"version_video_testo" varchar,
  	"version_video_link_etichetta" varchar,
  	"version_manifesto_kicker" varchar,
  	"version_manifesto_testo" varchar,
  	"version_banner_numero" varchar,
  	"version_banner_kicker" varchar,
  	"version_banner_titolo" varchar,
  	"version_banner_testo" varchar,
  	"version_materia_kicker" varchar,
  	"version_materia_titolo" varchar,
  	"version_materia_testo" varchar,
  	"version_designer_kicker" varchar,
  	"version_designer_titolo" varchar,
  	"version_designer_testo" varchar,
  	"version_collezioni_titolo" varchar,
  	"version_collezioni_testo" varchar,
  	"version_portfolio_kicker" varchar,
  	"version_portfolio_titolo" varchar,
  	"version_portfolio_testo" varchar,
  	"version_citazione_testo" varchar,
  	"version_citazione_firma" varchar,
  	"version_invito_kicker" varchar,
  	"version_invito_titolo" varchar,
  	"version_invito_testo" varchar,
  	"version_invito_pulsante" varchar DEFAULT 'Richiedi il volume',
  	"version_invito_grazie" varchar DEFAULT 'Grazie: vi ricontatteremo a breve con il volume Serralunga.',
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
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
  
  CREATE TABLE "pagina_designer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"segnaposto" numeric DEFAULT 0,
  	"cta_link" varchar,
  	"seo_immagine_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_designer_locales" (
  	"kicker" varchar DEFAULT 'Le firme',
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
  
  CREATE TABLE "impostazioni_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"evidenza" boolean
  );
  
  CREATE TABLE "impostazioni_menu_locales" (
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni_colonne_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "impostazioni_colonne_link_locales" (
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni_colonne" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "impostazioni_colonne_locales" (
  	"titolo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni_legali" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "impostazioni_legali_locales" (
  	"etichetta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"accento" "enum_impostazioni_accento" DEFAULT '#A08A5F',
  	"rivela_allo_scorrimento" boolean DEFAULT true,
  	"mostra_didascalie" boolean DEFAULT true,
  	"azienda_email" varchar,
  	"azienda_sito_ufficiale" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impostazioni_locales" (
  	"nome_sito" varchar DEFAULT 'Serralunga',
  	"descrizione" varchar,
  	"copyright" varchar DEFAULT '© {anno} Serralunga',
  	"azienda_ragione_sociale" varchar,
  	"azienda_marchio" varchar,
  	"azienda_indirizzo" varchar,
  	"azienda_cap" varchar,
  	"azienda_citta" varchar,
  	"azienda_provincia" varchar,
  	"azienda_paese" varchar,
  	"azienda_telefono" varchar,
  	"azienda_piva" varchar,
  	"azienda_rea" varchar,
  	"azienda_fondazione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "prodotti_galleria" ADD CONSTRAINT "prodotti_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_galleria" ADD CONSTRAINT "prodotti_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_colori" ADD CONSTRAINT "prodotti_colori_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_colori_locales" ADD CONSTRAINT "prodotti_colori_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_colori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_dimensioni" ADD CONSTRAINT "prodotti_dimensioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_dimensioni_locales" ADD CONSTRAINT "prodotti_dimensioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_dimensioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_specifiche" ADD CONSTRAINT "prodotti_specifiche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_specifiche_locales" ADD CONSTRAINT "prodotti_specifiche_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_specifiche"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_ambiente_immagini" ADD CONSTRAINT "prodotti_ambiente_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_ambiente_immagini" ADD CONSTRAINT "prodotti_ambiente_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_firma_progetto_testi" ADD CONSTRAINT "prodotti_firma_progetto_testi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_firma_progetto_testi_locales" ADD CONSTRAINT "prodotti_firma_progetto_testi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_firma_progetto_testi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_case_segnaposto" ADD CONSTRAINT "prodotti_case_segnaposto_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_case_segnaposto" ADD CONSTRAINT "prodotti_case_segnaposto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_case_segnaposto_locales" ADD CONSTRAINT "prodotti_case_segnaposto_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_case_segnaposto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_correlati" ADD CONSTRAINT "prodotti_correlati_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_correlati" ADD CONSTRAINT "prodotti_correlati_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_correlati" ADD CONSTRAINT "prodotti_correlati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_correlati_locales" ADD CONSTRAINT "prodotti_correlati_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_correlati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_designer_id_designer_id_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_disegno_immagine_id_media_id_fk" FOREIGN KEY ("disegno_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_disegno_file_id_media_id_fk" FOREIGN KEY ("disegno_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_ambiente_immagine_grande_id_media_id_fk" FOREIGN KEY ("ambiente_immagine_grande_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_richiesta_immagine_id_media_id_fk" FOREIGN KEY ("richiesta_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti" ADD CONSTRAINT "prodotti_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodotti_locales" ADD CONSTRAINT "prodotti_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_rels" ADD CONSTRAINT "prodotti_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_rels" ADD CONSTRAINT "prodotti_rels_case_history_fk" FOREIGN KEY ("case_history_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_galleria" ADD CONSTRAINT "_prodotti_v_version_galleria_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_galleria" ADD CONSTRAINT "_prodotti_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_colori" ADD CONSTRAINT "_prodotti_v_version_colori_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_colori_locales" ADD CONSTRAINT "_prodotti_v_version_colori_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_colori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_dimensioni" ADD CONSTRAINT "_prodotti_v_version_dimensioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_dimensioni_locales" ADD CONSTRAINT "_prodotti_v_version_dimensioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_dimensioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_specifiche" ADD CONSTRAINT "_prodotti_v_version_specifiche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_specifiche_locales" ADD CONSTRAINT "_prodotti_v_version_specifiche_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_specifiche"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_ambiente_immagini" ADD CONSTRAINT "_prodotti_v_version_ambiente_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_ambiente_immagini" ADD CONSTRAINT "_prodotti_v_version_ambiente_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_firma_progetto_testi" ADD CONSTRAINT "_prodotti_v_version_firma_progetto_testi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_firma_progetto_testi_locales" ADD CONSTRAINT "_prodotti_v_version_firma_progetto_testi_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_firma_progetto_testi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_case_segnaposto" ADD CONSTRAINT "_prodotti_v_version_case_segnaposto_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_case_segnaposto" ADD CONSTRAINT "_prodotti_v_version_case_segnaposto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_case_segnaposto_locales" ADD CONSTRAINT "_prodotti_v_version_case_segnaposto_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_case_segnaposto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_correlati" ADD CONSTRAINT "_prodotti_v_version_correlati_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_correlati" ADD CONSTRAINT "_prodotti_v_version_correlati_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_correlati" ADD CONSTRAINT "_prodotti_v_version_correlati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_correlati_locales" ADD CONSTRAINT "_prodotti_v_version_correlati_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_correlati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_parent_id_prodotti_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_designer_id_designer_id_fk" FOREIGN KEY ("version_designer_id") REFERENCES "public"."designer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_disegno_immagine_id_media_id_fk" FOREIGN KEY ("version_disegno_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_disegno_file_id_media_id_fk" FOREIGN KEY ("version_disegno_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_ambiente_immagine_grande_id_media_id_fk" FOREIGN KEY ("version_ambiente_immagine_grande_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_richiesta_immagine_id_media_id_fk" FOREIGN KEY ("version_richiesta_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v" ADD CONSTRAINT "_prodotti_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodotti_v_locales" ADD CONSTRAINT "_prodotti_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_rels" ADD CONSTRAINT "_prodotti_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_rels" ADD CONSTRAINT "_prodotti_v_rels_case_history_fk" FOREIGN KEY ("case_history_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_progetto_paragrafi" ADD CONSTRAINT "case_history_progetto_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_progetto_paragrafi_locales" ADD CONSTRAINT "case_history_progetto_paragrafi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_progetto_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_progetto_scheda" ADD CONSTRAINT "case_history_progetto_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_progetto_scheda_locales" ADD CONSTRAINT "case_history_progetto_scheda_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_progetto_scheda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_passi" ADD CONSTRAINT "case_history_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_passi_locales" ADD CONSTRAINT "case_history_passi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_passi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_coppia_immagini" ADD CONSTRAINT "case_history_coppia_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_coppia_immagini" ADD CONSTRAINT "case_history_coppia_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_protagonista_dati" ADD CONSTRAINT "case_history_protagonista_dati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_protagonista_dati_locales" ADD CONSTRAINT "case_history_protagonista_dati_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_protagonista_dati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_diario_immagini" ADD CONSTRAINT "case_history_diario_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_diario_immagini" ADD CONSTRAINT "case_history_diario_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_prodotti_usati_voci" ADD CONSTRAINT "case_history_prodotti_usati_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_prodotti_usati_voci" ADD CONSTRAINT "case_history_prodotti_usati_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_prodotti_usati_voci" ADD CONSTRAINT "case_history_prodotti_usati_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_prodotti_usati_voci_locales" ADD CONSTRAINT "case_history_prodotti_usati_voci_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_prodotti_usati_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history" ADD CONSTRAINT "case_history_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history" ADD CONSTRAINT "case_history_card_immagine_id_media_id_fk" FOREIGN KEY ("card_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history" ADD CONSTRAINT "case_history_citazione_immagine_id_media_id_fk" FOREIGN KEY ("citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history" ADD CONSTRAINT "case_history_protagonista_immagine_id_media_id_fk" FOREIGN KEY ("protagonista_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history" ADD CONSTRAINT "case_history_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_history_locales" ADD CONSTRAINT "case_history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_progetto_paragrafi" ADD CONSTRAINT "_case_history_v_version_progetto_paragrafi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_progetto_paragrafi_locales" ADD CONSTRAINT "_case_history_v_version_progetto_paragrafi_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_version_progetto_paragrafi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_progetto_scheda" ADD CONSTRAINT "_case_history_v_version_progetto_scheda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_progetto_scheda_locales" ADD CONSTRAINT "_case_history_v_version_progetto_scheda_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_version_progetto_scheda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_passi" ADD CONSTRAINT "_case_history_v_version_passi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_passi_locales" ADD CONSTRAINT "_case_history_v_version_passi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_version_passi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_coppia_immagini" ADD CONSTRAINT "_case_history_v_version_coppia_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_coppia_immagini" ADD CONSTRAINT "_case_history_v_version_coppia_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_protagonista_dati" ADD CONSTRAINT "_case_history_v_version_protagonista_dati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_protagonista_dati_locales" ADD CONSTRAINT "_case_history_v_version_protagonista_dati_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_version_protagonista_dati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_diario_immagini" ADD CONSTRAINT "_case_history_v_version_diario_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_diario_immagini" ADD CONSTRAINT "_case_history_v_version_diario_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci" ADD CONSTRAINT "_case_history_v_version_prodotti_usati_voci_prodotto_id_prodotti_id_fk" FOREIGN KEY ("prodotto_id") REFERENCES "public"."prodotti"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci" ADD CONSTRAINT "_case_history_v_version_prodotti_usati_voci_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci" ADD CONSTRAINT "_case_history_v_version_prodotti_usati_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_version_prodotti_usati_voci_locales" ADD CONSTRAINT "_case_history_v_version_prodotti_usati_voci_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_version_prodotti_usati_voci"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_parent_id_case_history_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_history"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_version_immagine_id_media_id_fk" FOREIGN KEY ("version_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_version_card_immagine_id_media_id_fk" FOREIGN KEY ("version_card_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_version_citazione_immagine_id_media_id_fk" FOREIGN KEY ("version_citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_version_protagonista_immagine_id_media_id_fk" FOREIGN KEY ("version_protagonista_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v" ADD CONSTRAINT "_case_history_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_history_v_locales" ADD CONSTRAINT "_case_history_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_biografia" ADD CONSTRAINT "designer_biografia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_biografia_locales" ADD CONSTRAINT "designer_biografia_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_biografia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_numeri" ADD CONSTRAINT "designer_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_numeri_locales" ADD CONSTRAINT "designer_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_premi" ADD CONSTRAINT "designer_premi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_premi_locales" ADD CONSTRAINT "designer_premi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_premi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer" ADD CONSTRAINT "designer_ritratto_id_media_id_fk" FOREIGN KEY ("ritratto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer" ADD CONSTRAINT "designer_banner_immagine_id_media_id_fk" FOREIGN KEY ("banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer" ADD CONSTRAINT "designer_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designer_locales" ADD CONSTRAINT "designer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_biografia" ADD CONSTRAINT "_designer_v_version_biografia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_biografia_locales" ADD CONSTRAINT "_designer_v_version_biografia_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_version_biografia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_numeri" ADD CONSTRAINT "_designer_v_version_numeri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_numeri_locales" ADD CONSTRAINT "_designer_v_version_numeri_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_version_numeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_premi" ADD CONSTRAINT "_designer_v_version_premi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_version_premi_locales" ADD CONSTRAINT "_designer_v_version_premi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_version_premi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v" ADD CONSTRAINT "_designer_v_parent_id_designer_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."designer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v" ADD CONSTRAINT "_designer_v_version_ritratto_id_media_id_fk" FOREIGN KEY ("version_ritratto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v" ADD CONSTRAINT "_designer_v_version_banner_immagine_id_media_id_fk" FOREIGN KEY ("version_banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v" ADD CONSTRAINT "_designer_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_designer_v_locales" ADD CONSTRAINT "_designer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_history_fk" FOREIGN KEY ("case_history_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_richieste_fk" FOREIGN KEY ("richieste_id") REFERENCES "public"."richieste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "home_collezioni_tessere" ADD CONSTRAINT "home_collezioni_tessere_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_collezioni_tessere" ADD CONSTRAINT "home_collezioni_tessere_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_collezioni_tessere_locales" ADD CONSTRAINT "home_collezioni_tessere_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_collezioni_tessere"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_banner_immagine_id_media_id_fk" FOREIGN KEY ("banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_citazione_immagine_id_media_id_fk" FOREIGN KEY ("citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_invito_immagine_id_media_id_fk" FOREIGN KEY ("invito_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_home_v_version_collezioni_tessere" ADD CONSTRAINT "_home_v_version_collezioni_tessere_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_collezioni_tessere" ADD CONSTRAINT "_home_v_version_collezioni_tessere_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_collezioni_tessere_locales" ADD CONSTRAINT "_home_v_version_collezioni_tessere_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_collezioni_tessere"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_video_file_id_media_id_fk" FOREIGN KEY ("version_video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_video_poster_id_media_id_fk" FOREIGN KEY ("version_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_banner_immagine_id_media_id_fk" FOREIGN KEY ("version_banner_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_citazione_immagine_id_media_id_fk" FOREIGN KEY ("version_citazione_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_invito_immagine_id_media_id_fk" FOREIGN KEY ("version_invito_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_seo_immagine_id_media_id_fk" FOREIGN KEY ("version_seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_designer_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_prodotti_fk" FOREIGN KEY ("prodotti_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer" ADD CONSTRAINT "pagina_designer_seo_immagine_id_media_id_fk" FOREIGN KEY ("seo_immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_designer_locales" ADD CONSTRAINT "pagina_designer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu" ADD CONSTRAINT "impostazioni_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_menu_locales" ADD CONSTRAINT "impostazioni_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_colonne_link" ADD CONSTRAINT "impostazioni_colonne_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_colonne"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_colonne_link_locales" ADD CONSTRAINT "impostazioni_colonne_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_colonne_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_colonne" ADD CONSTRAINT "impostazioni_colonne_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_colonne_locales" ADD CONSTRAINT "impostazioni_colonne_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_colonne"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_legali" ADD CONSTRAINT "impostazioni_legali_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_legali_locales" ADD CONSTRAINT "impostazioni_legali_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni_legali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni" ADD CONSTRAINT "impostazioni_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impostazioni_locales" ADD CONSTRAINT "impostazioni_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_galleria_order_idx" ON "prodotti_galleria" USING btree ("_order");
  CREATE INDEX "prodotti_galleria_parent_id_idx" ON "prodotti_galleria" USING btree ("_parent_id");
  CREATE INDEX "prodotti_galleria_immagine_idx" ON "prodotti_galleria" USING btree ("immagine_id");
  CREATE INDEX "prodotti_colori_order_idx" ON "prodotti_colori" USING btree ("_order");
  CREATE INDEX "prodotti_colori_parent_id_idx" ON "prodotti_colori" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_colori_locales_locale_parent_id_unique" ON "prodotti_colori_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_colori_locales_parent_id_idx" ON "prodotti_colori_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_dimensioni_order_idx" ON "prodotti_dimensioni" USING btree ("_order");
  CREATE INDEX "prodotti_dimensioni_parent_id_idx" ON "prodotti_dimensioni" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_dimensioni_locales_locale_parent_id_unique" ON "prodotti_dimensioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_dimensioni_locales_parent_id_idx" ON "prodotti_dimensioni_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_specifiche_order_idx" ON "prodotti_specifiche" USING btree ("_order");
  CREATE INDEX "prodotti_specifiche_parent_id_idx" ON "prodotti_specifiche" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_specifiche_locales_locale_parent_id_unique" ON "prodotti_specifiche_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_specifiche_locales_parent_id_idx" ON "prodotti_specifiche_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_ambiente_immagini_order_idx" ON "prodotti_ambiente_immagini" USING btree ("_order");
  CREATE INDEX "prodotti_ambiente_immagini_parent_id_idx" ON "prodotti_ambiente_immagini" USING btree ("_parent_id");
  CREATE INDEX "prodotti_ambiente_immagini_immagine_idx" ON "prodotti_ambiente_immagini" USING btree ("immagine_id");
  CREATE INDEX "prodotti_firma_progetto_testi_order_idx" ON "prodotti_firma_progetto_testi" USING btree ("_order");
  CREATE INDEX "prodotti_firma_progetto_testi_parent_id_idx" ON "prodotti_firma_progetto_testi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_firma_progetto_testi_locales_locale_parent_id_uniqu" ON "prodotti_firma_progetto_testi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_firma_progetto_testi_locales_parent_id_idx" ON "prodotti_firma_progetto_testi_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_case_segnaposto_order_idx" ON "prodotti_case_segnaposto" USING btree ("_order");
  CREATE INDEX "prodotti_case_segnaposto_parent_id_idx" ON "prodotti_case_segnaposto" USING btree ("_parent_id");
  CREATE INDEX "prodotti_case_segnaposto_immagine_idx" ON "prodotti_case_segnaposto" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "prodotti_case_segnaposto_locales_locale_parent_id_unique" ON "prodotti_case_segnaposto_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_case_segnaposto_locales_parent_id_idx" ON "prodotti_case_segnaposto_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_correlati_order_idx" ON "prodotti_correlati" USING btree ("_order");
  CREATE INDEX "prodotti_correlati_parent_id_idx" ON "prodotti_correlati" USING btree ("_parent_id");
  CREATE INDEX "prodotti_correlati_prodotto_idx" ON "prodotti_correlati" USING btree ("prodotto_id");
  CREATE INDEX "prodotti_correlati_immagine_idx" ON "prodotti_correlati" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "prodotti_correlati_locales_locale_parent_id_unique" ON "prodotti_correlati_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_correlati_locales_parent_id_idx" ON "prodotti_correlati_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_slug_idx" ON "prodotti" USING btree ("slug");
  CREATE INDEX "prodotti_designer_idx" ON "prodotti" USING btree ("designer_id");
  CREATE INDEX "prodotti_immagine_idx" ON "prodotti" USING btree ("immagine_id");
  CREATE INDEX "prodotti_disegno_disegno_immagine_idx" ON "prodotti" USING btree ("disegno_immagine_id");
  CREATE INDEX "prodotti_disegno_disegno_file_idx" ON "prodotti" USING btree ("disegno_file_id");
  CREATE INDEX "prodotti_ambiente_ambiente_immagine_grande_idx" ON "prodotti" USING btree ("ambiente_immagine_grande_id");
  CREATE INDEX "prodotti_richiesta_richiesta_immagine_idx" ON "prodotti" USING btree ("richiesta_immagine_id");
  CREATE INDEX "prodotti_seo_seo_immagine_idx" ON "prodotti" USING btree ("seo_immagine_id");
  CREATE INDEX "prodotti_updated_at_idx" ON "prodotti" USING btree ("updated_at");
  CREATE INDEX "prodotti_created_at_idx" ON "prodotti" USING btree ("created_at");
  CREATE INDEX "prodotti__status_idx" ON "prodotti" USING btree ("_status");
  CREATE UNIQUE INDEX "prodotti_locales_locale_parent_id_unique" ON "prodotti_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_locales_parent_id_idx" ON "prodotti_locales" USING btree ("_parent_id");
  CREATE INDEX "prodotti_rels_order_idx" ON "prodotti_rels" USING btree ("order");
  CREATE INDEX "prodotti_rels_parent_idx" ON "prodotti_rels" USING btree ("parent_id");
  CREATE INDEX "prodotti_rels_path_idx" ON "prodotti_rels" USING btree ("path");
  CREATE INDEX "prodotti_rels_case_history_id_idx" ON "prodotti_rels" USING btree ("case_history_id");
  CREATE INDEX "_prodotti_v_version_galleria_order_idx" ON "_prodotti_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_galleria_parent_id_idx" ON "_prodotti_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_galleria_immagine_idx" ON "_prodotti_v_version_galleria" USING btree ("immagine_id");
  CREATE INDEX "_prodotti_v_version_colori_order_idx" ON "_prodotti_v_version_colori" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_colori_parent_id_idx" ON "_prodotti_v_version_colori" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_colori_locales_locale_parent_id_unique" ON "_prodotti_v_version_colori_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_colori_locales_parent_id_idx" ON "_prodotti_v_version_colori_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_dimensioni_order_idx" ON "_prodotti_v_version_dimensioni" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_dimensioni_parent_id_idx" ON "_prodotti_v_version_dimensioni" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_dimensioni_locales_locale_parent_id_uniq" ON "_prodotti_v_version_dimensioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_dimensioni_locales_parent_id_idx" ON "_prodotti_v_version_dimensioni_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_specifiche_order_idx" ON "_prodotti_v_version_specifiche" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_specifiche_parent_id_idx" ON "_prodotti_v_version_specifiche" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_specifiche_locales_locale_parent_id_uniq" ON "_prodotti_v_version_specifiche_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_specifiche_locales_parent_id_idx" ON "_prodotti_v_version_specifiche_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_ambiente_immagini_order_idx" ON "_prodotti_v_version_ambiente_immagini" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_ambiente_immagini_parent_id_idx" ON "_prodotti_v_version_ambiente_immagini" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_ambiente_immagini_immagine_idx" ON "_prodotti_v_version_ambiente_immagini" USING btree ("immagine_id");
  CREATE INDEX "_prodotti_v_version_firma_progetto_testi_order_idx" ON "_prodotti_v_version_firma_progetto_testi" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_firma_progetto_testi_parent_id_idx" ON "_prodotti_v_version_firma_progetto_testi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_firma_progetto_testi_locales_locale_pare" ON "_prodotti_v_version_firma_progetto_testi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_firma_progetto_testi_locales_parent__idx" ON "_prodotti_v_version_firma_progetto_testi_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_case_segnaposto_order_idx" ON "_prodotti_v_version_case_segnaposto" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_case_segnaposto_parent_id_idx" ON "_prodotti_v_version_case_segnaposto" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_case_segnaposto_immagine_idx" ON "_prodotti_v_version_case_segnaposto" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_case_segnaposto_locales_locale_parent_id" ON "_prodotti_v_version_case_segnaposto_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_case_segnaposto_locales_parent_id_idx" ON "_prodotti_v_version_case_segnaposto_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_correlati_order_idx" ON "_prodotti_v_version_correlati" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_correlati_parent_id_idx" ON "_prodotti_v_version_correlati" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_correlati_prodotto_idx" ON "_prodotti_v_version_correlati" USING btree ("prodotto_id");
  CREATE INDEX "_prodotti_v_version_correlati_immagine_idx" ON "_prodotti_v_version_correlati" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_correlati_locales_locale_parent_id_uniqu" ON "_prodotti_v_version_correlati_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_correlati_locales_parent_id_idx" ON "_prodotti_v_version_correlati_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_parent_idx" ON "_prodotti_v" USING btree ("parent_id");
  CREATE INDEX "_prodotti_v_version_version_slug_idx" ON "_prodotti_v" USING btree ("version_slug");
  CREATE INDEX "_prodotti_v_version_version_designer_idx" ON "_prodotti_v" USING btree ("version_designer_id");
  CREATE INDEX "_prodotti_v_version_version_immagine_idx" ON "_prodotti_v" USING btree ("version_immagine_id");
  CREATE INDEX "_prodotti_v_version_disegno_version_disegno_immagine_idx" ON "_prodotti_v" USING btree ("version_disegno_immagine_id");
  CREATE INDEX "_prodotti_v_version_disegno_version_disegno_file_idx" ON "_prodotti_v" USING btree ("version_disegno_file_id");
  CREATE INDEX "_prodotti_v_version_ambiente_version_ambiente_immagine_g_idx" ON "_prodotti_v" USING btree ("version_ambiente_immagine_grande_id");
  CREATE INDEX "_prodotti_v_version_richiesta_version_richiesta_immagine_idx" ON "_prodotti_v" USING btree ("version_richiesta_immagine_id");
  CREATE INDEX "_prodotti_v_version_seo_version_seo_immagine_idx" ON "_prodotti_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_prodotti_v_version_version_updated_at_idx" ON "_prodotti_v" USING btree ("version_updated_at");
  CREATE INDEX "_prodotti_v_version_version_created_at_idx" ON "_prodotti_v" USING btree ("version_created_at");
  CREATE INDEX "_prodotti_v_version_version__status_idx" ON "_prodotti_v" USING btree ("version__status");
  CREATE INDEX "_prodotti_v_created_at_idx" ON "_prodotti_v" USING btree ("created_at");
  CREATE INDEX "_prodotti_v_updated_at_idx" ON "_prodotti_v" USING btree ("updated_at");
  CREATE INDEX "_prodotti_v_snapshot_idx" ON "_prodotti_v" USING btree ("snapshot");
  CREATE INDEX "_prodotti_v_published_locale_idx" ON "_prodotti_v" USING btree ("published_locale");
  CREATE INDEX "_prodotti_v_latest_idx" ON "_prodotti_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_prodotti_v_locales_locale_parent_id_unique" ON "_prodotti_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_locales_parent_id_idx" ON "_prodotti_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_rels_order_idx" ON "_prodotti_v_rels" USING btree ("order");
  CREATE INDEX "_prodotti_v_rels_parent_idx" ON "_prodotti_v_rels" USING btree ("parent_id");
  CREATE INDEX "_prodotti_v_rels_path_idx" ON "_prodotti_v_rels" USING btree ("path");
  CREATE INDEX "_prodotti_v_rels_case_history_id_idx" ON "_prodotti_v_rels" USING btree ("case_history_id");
  CREATE INDEX "case_history_progetto_paragrafi_order_idx" ON "case_history_progetto_paragrafi" USING btree ("_order");
  CREATE INDEX "case_history_progetto_paragrafi_parent_id_idx" ON "case_history_progetto_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_progetto_paragrafi_locales_locale_parent_id_uni" ON "case_history_progetto_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_progetto_paragrafi_locales_parent_id_idx" ON "case_history_progetto_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_progetto_scheda_order_idx" ON "case_history_progetto_scheda" USING btree ("_order");
  CREATE INDEX "case_history_progetto_scheda_parent_id_idx" ON "case_history_progetto_scheda" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_progetto_scheda_locales_locale_parent_id_unique" ON "case_history_progetto_scheda_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_progetto_scheda_locales_parent_id_idx" ON "case_history_progetto_scheda_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_passi_order_idx" ON "case_history_passi" USING btree ("_order");
  CREATE INDEX "case_history_passi_parent_id_idx" ON "case_history_passi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_passi_locales_locale_parent_id_unique" ON "case_history_passi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_passi_locales_parent_id_idx" ON "case_history_passi_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_coppia_immagini_order_idx" ON "case_history_coppia_immagini" USING btree ("_order");
  CREATE INDEX "case_history_coppia_immagini_parent_id_idx" ON "case_history_coppia_immagini" USING btree ("_parent_id");
  CREATE INDEX "case_history_coppia_immagini_immagine_idx" ON "case_history_coppia_immagini" USING btree ("immagine_id");
  CREATE INDEX "case_history_protagonista_dati_order_idx" ON "case_history_protagonista_dati" USING btree ("_order");
  CREATE INDEX "case_history_protagonista_dati_parent_id_idx" ON "case_history_protagonista_dati" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_protagonista_dati_locales_locale_parent_id_uniq" ON "case_history_protagonista_dati_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_protagonista_dati_locales_parent_id_idx" ON "case_history_protagonista_dati_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_diario_immagini_order_idx" ON "case_history_diario_immagini" USING btree ("_order");
  CREATE INDEX "case_history_diario_immagini_parent_id_idx" ON "case_history_diario_immagini" USING btree ("_parent_id");
  CREATE INDEX "case_history_diario_immagini_immagine_idx" ON "case_history_diario_immagini" USING btree ("immagine_id");
  CREATE INDEX "case_history_prodotti_usati_voci_order_idx" ON "case_history_prodotti_usati_voci" USING btree ("_order");
  CREATE INDEX "case_history_prodotti_usati_voci_parent_id_idx" ON "case_history_prodotti_usati_voci" USING btree ("_parent_id");
  CREATE INDEX "case_history_prodotti_usati_voci_prodotto_idx" ON "case_history_prodotti_usati_voci" USING btree ("prodotto_id");
  CREATE INDEX "case_history_prodotti_usati_voci_immagine_idx" ON "case_history_prodotti_usati_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "case_history_prodotti_usati_voci_locales_locale_parent_id_un" ON "case_history_prodotti_usati_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_prodotti_usati_voci_locales_parent_id_idx" ON "case_history_prodotti_usati_voci_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_history_slug_idx" ON "case_history" USING btree ("slug");
  CREATE INDEX "case_history_immagine_idx" ON "case_history" USING btree ("immagine_id");
  CREATE INDEX "case_history_card_card_immagine_idx" ON "case_history" USING btree ("card_immagine_id");
  CREATE INDEX "case_history_citazione_citazione_immagine_idx" ON "case_history" USING btree ("citazione_immagine_id");
  CREATE INDEX "case_history_protagonista_protagonista_immagine_idx" ON "case_history" USING btree ("protagonista_immagine_id");
  CREATE INDEX "case_history_seo_seo_immagine_idx" ON "case_history" USING btree ("seo_immagine_id");
  CREATE INDEX "case_history_updated_at_idx" ON "case_history" USING btree ("updated_at");
  CREATE INDEX "case_history_created_at_idx" ON "case_history" USING btree ("created_at");
  CREATE INDEX "case_history__status_idx" ON "case_history" USING btree ("_status");
  CREATE UNIQUE INDEX "case_history_locales_locale_parent_id_unique" ON "case_history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_locales_parent_id_idx" ON "case_history_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_progetto_paragrafi_order_idx" ON "_case_history_v_version_progetto_paragrafi" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_progetto_paragrafi_parent_id_idx" ON "_case_history_v_version_progetto_paragrafi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_case_history_v_version_progetto_paragrafi_locales_locale_pa" ON "_case_history_v_version_progetto_paragrafi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_version_progetto_paragrafi_locales_paren_idx" ON "_case_history_v_version_progetto_paragrafi_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_progetto_scheda_order_idx" ON "_case_history_v_version_progetto_scheda" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_progetto_scheda_parent_id_idx" ON "_case_history_v_version_progetto_scheda" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_case_history_v_version_progetto_scheda_locales_locale_paren" ON "_case_history_v_version_progetto_scheda_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_version_progetto_scheda_locales_parent_i_idx" ON "_case_history_v_version_progetto_scheda_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_passi_order_idx" ON "_case_history_v_version_passi" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_passi_parent_id_idx" ON "_case_history_v_version_passi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_case_history_v_version_passi_locales_locale_parent_id_uniqu" ON "_case_history_v_version_passi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_version_passi_locales_parent_id_idx" ON "_case_history_v_version_passi_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_coppia_immagini_order_idx" ON "_case_history_v_version_coppia_immagini" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_coppia_immagini_parent_id_idx" ON "_case_history_v_version_coppia_immagini" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_coppia_immagini_immagine_idx" ON "_case_history_v_version_coppia_immagini" USING btree ("immagine_id");
  CREATE INDEX "_case_history_v_version_protagonista_dati_order_idx" ON "_case_history_v_version_protagonista_dati" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_protagonista_dati_parent_id_idx" ON "_case_history_v_version_protagonista_dati" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_case_history_v_version_protagonista_dati_locales_locale_par" ON "_case_history_v_version_protagonista_dati_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_version_protagonista_dati_locales_parent_idx" ON "_case_history_v_version_protagonista_dati_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_diario_immagini_order_idx" ON "_case_history_v_version_diario_immagini" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_diario_immagini_parent_id_idx" ON "_case_history_v_version_diario_immagini" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_diario_immagini_immagine_idx" ON "_case_history_v_version_diario_immagini" USING btree ("immagine_id");
  CREATE INDEX "_case_history_v_version_prodotti_usati_voci_order_idx" ON "_case_history_v_version_prodotti_usati_voci" USING btree ("_order");
  CREATE INDEX "_case_history_v_version_prodotti_usati_voci_parent_id_idx" ON "_case_history_v_version_prodotti_usati_voci" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_version_prodotti_usati_voci_prodotto_idx" ON "_case_history_v_version_prodotti_usati_voci" USING btree ("prodotto_id");
  CREATE INDEX "_case_history_v_version_prodotti_usati_voci_immagine_idx" ON "_case_history_v_version_prodotti_usati_voci" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_case_history_v_version_prodotti_usati_voci_locales_locale_p" ON "_case_history_v_version_prodotti_usati_voci_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_version_prodotti_usati_voci_locales_pare_idx" ON "_case_history_v_version_prodotti_usati_voci_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_parent_idx" ON "_case_history_v" USING btree ("parent_id");
  CREATE INDEX "_case_history_v_version_version_slug_idx" ON "_case_history_v" USING btree ("version_slug");
  CREATE INDEX "_case_history_v_version_version_immagine_idx" ON "_case_history_v" USING btree ("version_immagine_id");
  CREATE INDEX "_case_history_v_version_card_version_card_immagine_idx" ON "_case_history_v" USING btree ("version_card_immagine_id");
  CREATE INDEX "_case_history_v_version_citazione_version_citazione_imma_idx" ON "_case_history_v" USING btree ("version_citazione_immagine_id");
  CREATE INDEX "_case_history_v_version_protagonista_version_protagonist_idx" ON "_case_history_v" USING btree ("version_protagonista_immagine_id");
  CREATE INDEX "_case_history_v_version_seo_version_seo_immagine_idx" ON "_case_history_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_case_history_v_version_version_updated_at_idx" ON "_case_history_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_history_v_version_version_created_at_idx" ON "_case_history_v" USING btree ("version_created_at");
  CREATE INDEX "_case_history_v_version_version__status_idx" ON "_case_history_v" USING btree ("version__status");
  CREATE INDEX "_case_history_v_created_at_idx" ON "_case_history_v" USING btree ("created_at");
  CREATE INDEX "_case_history_v_updated_at_idx" ON "_case_history_v" USING btree ("updated_at");
  CREATE INDEX "_case_history_v_snapshot_idx" ON "_case_history_v" USING btree ("snapshot");
  CREATE INDEX "_case_history_v_published_locale_idx" ON "_case_history_v" USING btree ("published_locale");
  CREATE INDEX "_case_history_v_latest_idx" ON "_case_history_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_case_history_v_locales_locale_parent_id_unique" ON "_case_history_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_locales_parent_id_idx" ON "_case_history_v_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_biografia_order_idx" ON "designer_biografia" USING btree ("_order");
  CREATE INDEX "designer_biografia_parent_id_idx" ON "designer_biografia" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "designer_biografia_locales_locale_parent_id_unique" ON "designer_biografia_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_biografia_locales_parent_id_idx" ON "designer_biografia_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_numeri_order_idx" ON "designer_numeri" USING btree ("_order");
  CREATE INDEX "designer_numeri_parent_id_idx" ON "designer_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "designer_numeri_locales_locale_parent_id_unique" ON "designer_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_numeri_locales_parent_id_idx" ON "designer_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_premi_order_idx" ON "designer_premi" USING btree ("_order");
  CREATE INDEX "designer_premi_parent_id_idx" ON "designer_premi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "designer_premi_locales_locale_parent_id_unique" ON "designer_premi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_premi_locales_parent_id_idx" ON "designer_premi_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "designer_slug_idx" ON "designer" USING btree ("slug");
  CREATE INDEX "designer_ritratto_idx" ON "designer" USING btree ("ritratto_id");
  CREATE INDEX "designer_banner_banner_immagine_idx" ON "designer" USING btree ("banner_immagine_id");
  CREATE INDEX "designer_seo_seo_immagine_idx" ON "designer" USING btree ("seo_immagine_id");
  CREATE INDEX "designer_updated_at_idx" ON "designer" USING btree ("updated_at");
  CREATE INDEX "designer_created_at_idx" ON "designer" USING btree ("created_at");
  CREATE INDEX "designer__status_idx" ON "designer" USING btree ("_status");
  CREATE UNIQUE INDEX "designer_locales_locale_parent_id_unique" ON "designer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_locales_parent_id_idx" ON "designer_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_version_biografia_order_idx" ON "_designer_v_version_biografia" USING btree ("_order");
  CREATE INDEX "_designer_v_version_biografia_parent_id_idx" ON "_designer_v_version_biografia" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_designer_v_version_biografia_locales_locale_parent_id_uniqu" ON "_designer_v_version_biografia_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_version_biografia_locales_parent_id_idx" ON "_designer_v_version_biografia_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_version_numeri_order_idx" ON "_designer_v_version_numeri" USING btree ("_order");
  CREATE INDEX "_designer_v_version_numeri_parent_id_idx" ON "_designer_v_version_numeri" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_designer_v_version_numeri_locales_locale_parent_id_unique" ON "_designer_v_version_numeri_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_version_numeri_locales_parent_id_idx" ON "_designer_v_version_numeri_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_version_premi_order_idx" ON "_designer_v_version_premi" USING btree ("_order");
  CREATE INDEX "_designer_v_version_premi_parent_id_idx" ON "_designer_v_version_premi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_designer_v_version_premi_locales_locale_parent_id_unique" ON "_designer_v_version_premi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_version_premi_locales_parent_id_idx" ON "_designer_v_version_premi_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_parent_idx" ON "_designer_v" USING btree ("parent_id");
  CREATE INDEX "_designer_v_version_version_slug_idx" ON "_designer_v" USING btree ("version_slug");
  CREATE INDEX "_designer_v_version_version_ritratto_idx" ON "_designer_v" USING btree ("version_ritratto_id");
  CREATE INDEX "_designer_v_version_banner_version_banner_immagine_idx" ON "_designer_v" USING btree ("version_banner_immagine_id");
  CREATE INDEX "_designer_v_version_seo_version_seo_immagine_idx" ON "_designer_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_designer_v_version_version_updated_at_idx" ON "_designer_v" USING btree ("version_updated_at");
  CREATE INDEX "_designer_v_version_version_created_at_idx" ON "_designer_v" USING btree ("version_created_at");
  CREATE INDEX "_designer_v_version_version__status_idx" ON "_designer_v" USING btree ("version__status");
  CREATE INDEX "_designer_v_created_at_idx" ON "_designer_v" USING btree ("created_at");
  CREATE INDEX "_designer_v_updated_at_idx" ON "_designer_v" USING btree ("updated_at");
  CREATE INDEX "_designer_v_snapshot_idx" ON "_designer_v" USING btree ("snapshot");
  CREATE INDEX "_designer_v_published_locale_idx" ON "_designer_v" USING btree ("published_locale");
  CREATE INDEX "_designer_v_latest_idx" ON "_designer_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_designer_v_locales_locale_parent_id_unique" ON "_designer_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_locales_parent_id_idx" ON "_designer_v_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_mini_sizes_mini_filename_idx" ON "media" USING btree ("sizes_mini_filename");
  CREATE INDEX "media_sizes_scheda_sizes_scheda_filename_idx" ON "media" USING btree ("sizes_scheda_filename");
  CREATE INDEX "media_sizes_grande_sizes_grande_filename_idx" ON "media" USING btree ("sizes_grande_filename");
  CREATE INDEX "media_sizes_pieno_sizes_pieno_filename_idx" ON "media" USING btree ("sizes_pieno_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "richieste_updated_at_idx" ON "richieste" USING btree ("updated_at");
  CREATE INDEX "richieste_created_at_idx" ON "richieste" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_prodotti_id_idx" ON "payload_locked_documents_rels" USING btree ("prodotti_id");
  CREATE INDEX "payload_locked_documents_rels_case_history_id_idx" ON "payload_locked_documents_rels" USING btree ("case_history_id");
  CREATE INDEX "payload_locked_documents_rels_designer_id_idx" ON "payload_locked_documents_rels" USING btree ("designer_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_richieste_id_idx" ON "payload_locked_documents_rels" USING btree ("richieste_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
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
  CREATE INDEX "home_collezioni_tessere_order_idx" ON "home_collezioni_tessere" USING btree ("_order");
  CREATE INDEX "home_collezioni_tessere_parent_id_idx" ON "home_collezioni_tessere" USING btree ("_parent_id");
  CREATE INDEX "home_collezioni_tessere_immagine_idx" ON "home_collezioni_tessere" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_collezioni_tessere_locales_locale_parent_id_unique" ON "home_collezioni_tessere_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_collezioni_tessere_locales_parent_id_idx" ON "home_collezioni_tessere_locales" USING btree ("_parent_id");
  CREATE INDEX "home_video_video_file_idx" ON "home" USING btree ("video_file_id");
  CREATE INDEX "home_video_video_poster_idx" ON "home" USING btree ("video_poster_id");
  CREATE INDEX "home_banner_banner_immagine_idx" ON "home" USING btree ("banner_immagine_id");
  CREATE INDEX "home_citazione_citazione_immagine_idx" ON "home" USING btree ("citazione_immagine_id");
  CREATE INDEX "home_invito_invito_immagine_idx" ON "home" USING btree ("invito_immagine_id");
  CREATE INDEX "home_seo_seo_immagine_idx" ON "home" USING btree ("seo_immagine_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_locales_parent_id_idx" ON "home_locales" USING btree ("_parent_id");
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
  CREATE INDEX "_home_v_version_collezioni_tessere_order_idx" ON "_home_v_version_collezioni_tessere" USING btree ("_order");
  CREATE INDEX "_home_v_version_collezioni_tessere_parent_id_idx" ON "_home_v_version_collezioni_tessere" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_collezioni_tessere_immagine_idx" ON "_home_v_version_collezioni_tessere" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_collezioni_tessere_locales_locale_parent_id_" ON "_home_v_version_collezioni_tessere_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_collezioni_tessere_locales_parent_id_idx" ON "_home_v_version_collezioni_tessere_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_video_version_video_file_idx" ON "_home_v" USING btree ("version_video_file_id");
  CREATE INDEX "_home_v_version_video_version_video_poster_idx" ON "_home_v" USING btree ("version_video_poster_id");
  CREATE INDEX "_home_v_version_banner_version_banner_immagine_idx" ON "_home_v" USING btree ("version_banner_immagine_id");
  CREATE INDEX "_home_v_version_citazione_version_citazione_immagine_idx" ON "_home_v" USING btree ("version_citazione_immagine_id");
  CREATE INDEX "_home_v_version_invito_version_invito_immagine_idx" ON "_home_v" USING btree ("version_invito_immagine_id");
  CREATE INDEX "_home_v_version_seo_version_seo_immagine_idx" ON "_home_v" USING btree ("version_seo_immagine_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_locales_parent_id_idx" ON "_home_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_designer_id_idx" ON "_home_v_rels" USING btree ("designer_id");
  CREATE INDEX "_home_v_rels_prodotti_id_idx" ON "_home_v_rels" USING btree ("prodotti_id");
  CREATE INDEX "pagina_designer_seo_seo_immagine_idx" ON "pagina_designer" USING btree ("seo_immagine_id");
  CREATE UNIQUE INDEX "pagina_designer_locales_locale_parent_id_unique" ON "pagina_designer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_locales_parent_id_idx" ON "pagina_designer_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_menu_order_idx" ON "impostazioni_menu" USING btree ("_order");
  CREATE INDEX "impostazioni_menu_parent_id_idx" ON "impostazioni_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_menu_locales_locale_parent_id_unique" ON "impostazioni_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_menu_locales_parent_id_idx" ON "impostazioni_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_colonne_link_order_idx" ON "impostazioni_colonne_link" USING btree ("_order");
  CREATE INDEX "impostazioni_colonne_link_parent_id_idx" ON "impostazioni_colonne_link" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_colonne_link_locales_locale_parent_id_unique" ON "impostazioni_colonne_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_colonne_link_locales_parent_id_idx" ON "impostazioni_colonne_link_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_colonne_order_idx" ON "impostazioni_colonne" USING btree ("_order");
  CREATE INDEX "impostazioni_colonne_parent_id_idx" ON "impostazioni_colonne" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_colonne_locales_locale_parent_id_unique" ON "impostazioni_colonne_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_colonne_locales_parent_id_idx" ON "impostazioni_colonne_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_legali_order_idx" ON "impostazioni_legali" USING btree ("_order");
  CREATE INDEX "impostazioni_legali_parent_id_idx" ON "impostazioni_legali" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impostazioni_legali_locales_locale_parent_id_unique" ON "impostazioni_legali_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_legali_locales_parent_id_idx" ON "impostazioni_legali_locales" USING btree ("_parent_id");
  CREATE INDEX "impostazioni_logo_idx" ON "impostazioni" USING btree ("logo_id");
  CREATE UNIQUE INDEX "impostazioni_locales_locale_parent_id_unique" ON "impostazioni_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impostazioni_locales_parent_id_idx" ON "impostazioni_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "prodotti_galleria" CASCADE;
  DROP TABLE "prodotti_colori" CASCADE;
  DROP TABLE "prodotti_colori_locales" CASCADE;
  DROP TABLE "prodotti_dimensioni" CASCADE;
  DROP TABLE "prodotti_dimensioni_locales" CASCADE;
  DROP TABLE "prodotti_specifiche" CASCADE;
  DROP TABLE "prodotti_specifiche_locales" CASCADE;
  DROP TABLE "prodotti_ambiente_immagini" CASCADE;
  DROP TABLE "prodotti_firma_progetto_testi" CASCADE;
  DROP TABLE "prodotti_firma_progetto_testi_locales" CASCADE;
  DROP TABLE "prodotti_case_segnaposto" CASCADE;
  DROP TABLE "prodotti_case_segnaposto_locales" CASCADE;
  DROP TABLE "prodotti_correlati" CASCADE;
  DROP TABLE "prodotti_correlati_locales" CASCADE;
  DROP TABLE "prodotti" CASCADE;
  DROP TABLE "prodotti_locales" CASCADE;
  DROP TABLE "prodotti_rels" CASCADE;
  DROP TABLE "_prodotti_v_version_galleria" CASCADE;
  DROP TABLE "_prodotti_v_version_colori" CASCADE;
  DROP TABLE "_prodotti_v_version_colori_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_dimensioni" CASCADE;
  DROP TABLE "_prodotti_v_version_dimensioni_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_specifiche" CASCADE;
  DROP TABLE "_prodotti_v_version_specifiche_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_ambiente_immagini" CASCADE;
  DROP TABLE "_prodotti_v_version_firma_progetto_testi" CASCADE;
  DROP TABLE "_prodotti_v_version_firma_progetto_testi_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_case_segnaposto" CASCADE;
  DROP TABLE "_prodotti_v_version_case_segnaposto_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_correlati" CASCADE;
  DROP TABLE "_prodotti_v_version_correlati_locales" CASCADE;
  DROP TABLE "_prodotti_v" CASCADE;
  DROP TABLE "_prodotti_v_locales" CASCADE;
  DROP TABLE "_prodotti_v_rels" CASCADE;
  DROP TABLE "case_history_progetto_paragrafi" CASCADE;
  DROP TABLE "case_history_progetto_paragrafi_locales" CASCADE;
  DROP TABLE "case_history_progetto_scheda" CASCADE;
  DROP TABLE "case_history_progetto_scheda_locales" CASCADE;
  DROP TABLE "case_history_passi" CASCADE;
  DROP TABLE "case_history_passi_locales" CASCADE;
  DROP TABLE "case_history_coppia_immagini" CASCADE;
  DROP TABLE "case_history_protagonista_dati" CASCADE;
  DROP TABLE "case_history_protagonista_dati_locales" CASCADE;
  DROP TABLE "case_history_diario_immagini" CASCADE;
  DROP TABLE "case_history_prodotti_usati_voci" CASCADE;
  DROP TABLE "case_history_prodotti_usati_voci_locales" CASCADE;
  DROP TABLE "case_history" CASCADE;
  DROP TABLE "case_history_locales" CASCADE;
  DROP TABLE "_case_history_v_version_progetto_paragrafi" CASCADE;
  DROP TABLE "_case_history_v_version_progetto_paragrafi_locales" CASCADE;
  DROP TABLE "_case_history_v_version_progetto_scheda" CASCADE;
  DROP TABLE "_case_history_v_version_progetto_scheda_locales" CASCADE;
  DROP TABLE "_case_history_v_version_passi" CASCADE;
  DROP TABLE "_case_history_v_version_passi_locales" CASCADE;
  DROP TABLE "_case_history_v_version_coppia_immagini" CASCADE;
  DROP TABLE "_case_history_v_version_protagonista_dati" CASCADE;
  DROP TABLE "_case_history_v_version_protagonista_dati_locales" CASCADE;
  DROP TABLE "_case_history_v_version_diario_immagini" CASCADE;
  DROP TABLE "_case_history_v_version_prodotti_usati_voci" CASCADE;
  DROP TABLE "_case_history_v_version_prodotti_usati_voci_locales" CASCADE;
  DROP TABLE "_case_history_v" CASCADE;
  DROP TABLE "_case_history_v_locales" CASCADE;
  DROP TABLE "designer_biografia" CASCADE;
  DROP TABLE "designer_biografia_locales" CASCADE;
  DROP TABLE "designer_numeri" CASCADE;
  DROP TABLE "designer_numeri_locales" CASCADE;
  DROP TABLE "designer_premi" CASCADE;
  DROP TABLE "designer_premi_locales" CASCADE;
  DROP TABLE "designer" CASCADE;
  DROP TABLE "designer_locales" CASCADE;
  DROP TABLE "_designer_v_version_biografia" CASCADE;
  DROP TABLE "_designer_v_version_biografia_locales" CASCADE;
  DROP TABLE "_designer_v_version_numeri" CASCADE;
  DROP TABLE "_designer_v_version_numeri_locales" CASCADE;
  DROP TABLE "_designer_v_version_premi" CASCADE;
  DROP TABLE "_designer_v_version_premi_locales" CASCADE;
  DROP TABLE "_designer_v" CASCADE;
  DROP TABLE "_designer_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "richieste" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_slide" CASCADE;
  DROP TABLE "home_slide_locales" CASCADE;
  DROP TABLE "home_luoghi" CASCADE;
  DROP TABLE "home_luoghi_locales" CASCADE;
  DROP TABLE "home_materia_schede" CASCADE;
  DROP TABLE "home_materia_schede_locales" CASCADE;
  DROP TABLE "home_materia_numeri" CASCADE;
  DROP TABLE "home_materia_numeri_locales" CASCADE;
  DROP TABLE "home_collezioni_tessere" CASCADE;
  DROP TABLE "home_collezioni_tessere_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_slide" CASCADE;
  DROP TABLE "_home_v_version_slide_locales" CASCADE;
  DROP TABLE "_home_v_version_luoghi" CASCADE;
  DROP TABLE "_home_v_version_luoghi_locales" CASCADE;
  DROP TABLE "_home_v_version_materia_schede" CASCADE;
  DROP TABLE "_home_v_version_materia_schede_locales" CASCADE;
  DROP TABLE "_home_v_version_materia_numeri" CASCADE;
  DROP TABLE "_home_v_version_materia_numeri_locales" CASCADE;
  DROP TABLE "_home_v_version_collezioni_tessere" CASCADE;
  DROP TABLE "_home_v_version_collezioni_tessere_locales" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "pagina_designer" CASCADE;
  DROP TABLE "pagina_designer_locales" CASCADE;
  DROP TABLE "impostazioni_menu" CASCADE;
  DROP TABLE "impostazioni_menu_locales" CASCADE;
  DROP TABLE "impostazioni_colonne_link" CASCADE;
  DROP TABLE "impostazioni_colonne_link_locales" CASCADE;
  DROP TABLE "impostazioni_colonne" CASCADE;
  DROP TABLE "impostazioni_colonne_locales" CASCADE;
  DROP TABLE "impostazioni_legali" CASCADE;
  DROP TABLE "impostazioni_legali_locales" CASCADE;
  DROP TABLE "impostazioni" CASCADE;
  DROP TABLE "impostazioni_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_prodotti_famiglia";
  DROP TYPE "public"."enum_prodotti_status";
  DROP TYPE "public"."enum__prodotti_v_version_famiglia";
  DROP TYPE "public"."enum__prodotti_v_version_status";
  DROP TYPE "public"."enum__prodotti_v_published_locale";
  DROP TYPE "public"."enum_case_history_coppia_immagini_allineamento";
  DROP TYPE "public"."enum_case_history_status";
  DROP TYPE "public"."enum__case_history_v_version_coppia_immagini_allineamento";
  DROP TYPE "public"."enum__case_history_v_version_status";
  DROP TYPE "public"."enum__case_history_v_published_locale";
  DROP TYPE "public"."enum_designer_status";
  DROP TYPE "public"."enum__designer_v_version_status";
  DROP TYPE "public"."enum__designer_v_published_locale";
  DROP TYPE "public"."enum_richieste_stato";
  DROP TYPE "public"."enum_home_tipo_apertura";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_tipo_apertura";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";
  DROP TYPE "public"."enum_impostazioni_accento";`)
}
