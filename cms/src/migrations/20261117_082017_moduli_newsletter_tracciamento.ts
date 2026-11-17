import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_richieste_lingua" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_iscritti_newsletter_stato" AS ENUM('attesa', 'iscritto', 'disiscritto');
  CREATE TYPE "public"."enum_iscritti_newsletter_lingua" AS ENUM('it', 'en');
  CREATE TYPE "public"."enum_impostazioni_recaptcha_tipo" AS ENUM('v3', 'v2');
  CREATE TABLE "iscritti_newsletter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"nome" varchar,
  	"azienda" varchar,
  	"stato" "enum_iscritti_newsletter_stato" DEFAULT 'attesa',
  	"lingua" "enum_iscritti_newsletter_lingua" DEFAULT 'it',
  	"fonte" varchar,
  	"consenso_il" timestamp(3) with time zone,
  	"confermato_il" timestamp(3) with time zone,
  	"ip" varchar,
  	"disiscritto_il" timestamp(3) with time zone,
  	"token" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "impostazioni_altre_verifiche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"valore" varchar NOT NULL
  );
  
  CREATE TABLE "moduli" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"privacy_link" varchar,
  	"newsletter_nei_moduli" boolean DEFAULT true,
  	"newsletter_attiva" boolean DEFAULT true,
  	"doppia_conferma" boolean DEFAULT true,
  	"email_cliente" boolean DEFAULT true,
  	"notifiche_a" varchar,
  	"mittente_nome" varchar DEFAULT 'Serralunga',
  	"mittente_email" varchar,
  	"smtp_host" varchar,
  	"smtp_porta" numeric DEFAULT 587,
  	"smtp_utente" varchar,
  	"smtp_password" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "moduli_locales" (
  	"privacy_etichetta" varchar,
  	"newsletter_etichetta" varchar,
  	"privacy_newsletter" varchar,
  	"newsletter_link" varchar,
  	"newsletter_titolo" varchar,
  	"newsletter_testo" varchar,
  	"newsletter_pulsante" varchar,
  	"newsletter_grazie" varchar,
  	"oggetto_richiesta" varchar,
  	"testo_richiesta" varchar,
  	"firma" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "richieste" ADD COLUMN "lingua" "enum_richieste_lingua" DEFAULT 'it';
  ALTER TABLE "richieste" ADD COLUMN "privacy_il" timestamp(3) with time zone;
  ALTER TABLE "richieste" ADD COLUMN "newsletter" boolean;
  ALTER TABLE "richieste" ADD COLUMN "email_cliente" boolean;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "iscritti_newsletter_id" integer;
  ALTER TABLE "impostazioni" ADD COLUMN "recaptcha_attivo" boolean DEFAULT false;
  ALTER TABLE "impostazioni" ADD COLUMN "recaptcha_tipo" "enum_impostazioni_recaptcha_tipo" DEFAULT 'v3';
  ALTER TABLE "impostazioni" ADD COLUMN "recaptcha_soglia" numeric DEFAULT 0.5;
  ALTER TABLE "impostazioni" ADD COLUMN "recaptcha_chiave_sito" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "recaptcha_chiave_segreta" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "google_search_console" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "bing_webmaster" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "google_analytics" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "google_tag_manager" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "microsoft_clarity" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "google_ads" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "google_ads_conversione" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "meta_pixel" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "linkedin_insight" varchar;
  ALTER TABLE "impostazioni" ADD COLUMN "cookie_link" varchar;
  ALTER TABLE "impostazioni_locales" ADD COLUMN "cookie_testo" varchar;
  ALTER TABLE "impostazioni_altre_verifiche" ADD CONSTRAINT "impostazioni_altre_verifiche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "moduli_locales" ADD CONSTRAINT "moduli_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."moduli"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "iscritti_newsletter_email_idx" ON "iscritti_newsletter" USING btree ("email");
  CREATE INDEX "iscritti_newsletter_token_idx" ON "iscritti_newsletter" USING btree ("token");
  CREATE INDEX "iscritti_newsletter_updated_at_idx" ON "iscritti_newsletter" USING btree ("updated_at");
  CREATE INDEX "iscritti_newsletter_created_at_idx" ON "iscritti_newsletter" USING btree ("created_at");
  CREATE INDEX "impostazioni_altre_verifiche_order_idx" ON "impostazioni_altre_verifiche" USING btree ("_order");
  CREATE INDEX "impostazioni_altre_verifiche_parent_id_idx" ON "impostazioni_altre_verifiche" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "moduli_locales_locale_parent_id_unique" ON "moduli_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "moduli_locales_parent_id_idx" ON "moduli_locales" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_iscritti_newsletter_fk" FOREIGN KEY ("iscritti_newsletter_id") REFERENCES "public"."iscritti_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_iscritti_newsletter_id_idx" ON "payload_locked_documents_rels" USING btree ("iscritti_newsletter_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "iscritti_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impostazioni_altre_verifiche" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "moduli" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "moduli_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "iscritti_newsletter" CASCADE;
  DROP TABLE "impostazioni_altre_verifiche" CASCADE;
  DROP TABLE "moduli" CASCADE;
  DROP TABLE "moduli_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_iscritti_newsletter_fk";
  
  DROP INDEX "payload_locked_documents_rels_iscritti_newsletter_id_idx";
  ALTER TABLE "richieste" DROP COLUMN "lingua";
  ALTER TABLE "richieste" DROP COLUMN "privacy_il";
  ALTER TABLE "richieste" DROP COLUMN "newsletter";
  ALTER TABLE "richieste" DROP COLUMN "email_cliente";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "iscritti_newsletter_id";
  ALTER TABLE "impostazioni" DROP COLUMN "recaptcha_attivo";
  ALTER TABLE "impostazioni" DROP COLUMN "recaptcha_tipo";
  ALTER TABLE "impostazioni" DROP COLUMN "recaptcha_soglia";
  ALTER TABLE "impostazioni" DROP COLUMN "recaptcha_chiave_sito";
  ALTER TABLE "impostazioni" DROP COLUMN "recaptcha_chiave_segreta";
  ALTER TABLE "impostazioni" DROP COLUMN "google_search_console";
  ALTER TABLE "impostazioni" DROP COLUMN "bing_webmaster";
  ALTER TABLE "impostazioni" DROP COLUMN "google_analytics";
  ALTER TABLE "impostazioni" DROP COLUMN "google_tag_manager";
  ALTER TABLE "impostazioni" DROP COLUMN "microsoft_clarity";
  ALTER TABLE "impostazioni" DROP COLUMN "google_ads";
  ALTER TABLE "impostazioni" DROP COLUMN "google_ads_conversione";
  ALTER TABLE "impostazioni" DROP COLUMN "meta_pixel";
  ALTER TABLE "impostazioni" DROP COLUMN "linkedin_insight";
  ALTER TABLE "impostazioni" DROP COLUMN "cookie_link";
  ALTER TABLE "impostazioni_locales" DROP COLUMN "cookie_testo";
  DROP TYPE "public"."enum_richieste_lingua";
  DROP TYPE "public"."enum_iscritti_newsletter_stato";
  DROP TYPE "public"."enum_iscritti_newsletter_lingua";
  DROP TYPE "public"."enum_impostazioni_recaptcha_tipo";`)
}
