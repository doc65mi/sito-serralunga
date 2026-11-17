import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prodotti_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_prodotti_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__prodotti_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__prodotti_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_categorie_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_categorie_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__categorie_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__categorie_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_case_history_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_case_history_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__case_history_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__case_history_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_spunti_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_spunti_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__spunti_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__spunti_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_materiali_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_materiali_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__materiali_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__materiali_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_articoli_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_articoli_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__articoli_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__articoli_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagine_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagine_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__pagine_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_contract_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_contract_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__contract_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__contract_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagine_heritage_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_designer_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_designer_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__designer_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__designer_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_registro_consensi_azione" AS ENUM('accept_all', 'reject_all', 'close_x', 'custom', 'revoke');
  CREATE TYPE "public"."enum_home_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_home_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__home_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__home_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_catalogo_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_designer_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_designer_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_installazioni_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_spunti_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_materiali_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_journal_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_journal_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum__pagina_journal_v_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_incorporato_formato" AS ENUM('largo', 'classico', 'panoramico');
  CREATE TYPE "public"."enum_pagina_heritage_blocks_incorporato_sfondo" AS ENUM('chiaro', 'carta', 'scuro');
  CREATE TYPE "public"."enum_privacy_cookies_incorporati" AS ENUM('youtube', 'vimeo', 'maps');
  CREATE TYPE "public"."enum_privacy_cookies_fornitori_categoria" AS ENUM('necessari', 'preferenze', 'statistiche', 'marketing');
  CREATE TYPE "public"."enum_privacy_cookies_script_categoria" AS ENUM('preferenze', 'statistiche', 'marketing');
  CREATE TYPE "public"."enum_privacy_cookies_quando_banner" AS ENUM('auto', 'sempre');
  CREATE TABLE "prodotti_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_prodotti_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_prodotti_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "prodotti_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__prodotti_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__prodotti_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodotti_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categorie_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_categorie_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_categorie_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "categorie_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_categorie_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__categorie_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__categorie_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categorie_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "case_history_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_case_history_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_case_history_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_history_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_case_history_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__case_history_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__case_history_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_history_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "spunti_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_spunti_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_spunti_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "spunti_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_spunti_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__spunti_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__spunti_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_spunti_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "materiali_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_materiali_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_materiali_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "materiali_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_materiali_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__materiali_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__materiali_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_materiali_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articoli_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_articoli_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_articoli_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "articoli_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_articoli_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__articoli_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__articoli_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articoli_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagine_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagine_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pagine_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__pagine_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__pagine_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagine_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contract_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_contract_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_contract_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "contract_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_contract_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__contract_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__contract_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_contract_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagine_heritage_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagine_heritage_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagine_heritage_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_heritage_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "designer_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_designer_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_designer_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "designer_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_designer_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__designer_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__designer_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_designer_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "registro_consensi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"consent_uuid" varchar NOT NULL,
  	"azione" "enum_registro_consensi_azione" NOT NULL,
  	"policy_versione" varchar,
  	"stato" jsonb,
  	"fonte_url" varchar,
  	"lingua" varchar,
  	"ip_hash" varchar,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_home_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_home_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_home_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__home_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__home_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_catalogo_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_catalogo_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_catalogo_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_catalogo_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_designer_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_designer_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_designer_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_designer_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_installazioni_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_installazioni_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_installazioni_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_installazioni_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_spunti_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_spunti_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_spunti_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_spunti_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_materiali_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_materiali_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_materiali_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_materiali_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pagina_journal_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_journal_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_journal_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_journal_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum__pagina_journal_v_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum__pagina_journal_v_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pagina_journal_v_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_heritage_blocks_incorporato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"formato" "enum_pagina_heritage_blocks_incorporato_formato" DEFAULT 'largo',
  	"sfondo" "enum_pagina_heritage_blocks_incorporato_sfondo" DEFAULT 'chiaro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pagina_heritage_blocks_incorporato_locales" (
  	"kicker" varchar,
  	"titolo" varchar,
  	"descrizione" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_cookies_incorporati" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_privacy_cookies_incorporati",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "privacy_cookies_fornitori_cookie" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"dominio" varchar
  );
  
  CREATE TABLE "privacy_cookies_fornitori_cookie_locales" (
  	"durata" varchar,
  	"finalita" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_cookies_fornitori" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"societa" varchar,
  	"categoria" "enum_privacy_cookies_fornitori_categoria" DEFAULT 'marketing' NOT NULL,
  	"privacy" varchar
  );
  
  CREATE TABLE "privacy_cookies_fornitori_locales" (
  	"finalita" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_cookies_script" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"categoria" "enum_privacy_cookies_script_categoria" DEFAULT 'marketing' NOT NULL,
  	"attivo" boolean DEFAULT true,
  	"src" varchar,
  	"codice" varchar
  );
  
  CREATE TABLE "privacy_cookies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quando_banner" "enum_privacy_cookies_quando_banner" DEFAULT 'auto',
  	"versione_policy" varchar DEFAULT '1.00',
  	"durata_giorni" numeric DEFAULT 180,
  	"privacy_link" varchar,
  	"cookie_link" varchar,
  	"google_avanzata" boolean DEFAULT false,
  	"meta_ldu" boolean DEFAULT false,
  	"conserva_mesi" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_cookies_locales" (
  	"testi_titolo" varchar,
  	"testi_testo" varchar,
  	"testi_pannello" varchar,
  	"testi_necessari" varchar,
  	"testi_preferenze" varchar,
  	"testi_statistiche" varchar,
  	"testi_marketing" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "registro_consensi_id" integer;
  ALTER TABLE "prodotti_blocks_incorporato" ADD CONSTRAINT "prodotti_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_blocks_incorporato_locales" ADD CONSTRAINT "prodotti_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_incorporato" ADD CONSTRAINT "_prodotti_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_blocks_incorporato_locales" ADD CONSTRAINT "_prodotti_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_incorporato" ADD CONSTRAINT "categorie_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorie_blocks_incorporato_locales" ADD CONSTRAINT "categorie_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categorie_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_incorporato" ADD CONSTRAINT "_categorie_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categorie_v_blocks_incorporato_locales" ADD CONSTRAINT "_categorie_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categorie_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_incorporato" ADD CONSTRAINT "case_history_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_history_blocks_incorporato_locales" ADD CONSTRAINT "case_history_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_history_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_incorporato" ADD CONSTRAINT "_case_history_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_history_v_blocks_incorporato_locales" ADD CONSTRAINT "_case_history_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_history_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_incorporato" ADD CONSTRAINT "spunti_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spunti_blocks_incorporato_locales" ADD CONSTRAINT "spunti_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spunti_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_incorporato" ADD CONSTRAINT "_spunti_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spunti_v_blocks_incorporato_locales" ADD CONSTRAINT "_spunti_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spunti_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_incorporato" ADD CONSTRAINT "materiali_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "materiali_blocks_incorporato_locales" ADD CONSTRAINT "materiali_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiali_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_incorporato" ADD CONSTRAINT "_materiali_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_materiali_v_blocks_incorporato_locales" ADD CONSTRAINT "_materiali_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_materiali_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_incorporato" ADD CONSTRAINT "articoli_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articoli_blocks_incorporato_locales" ADD CONSTRAINT "articoli_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articoli_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_incorporato" ADD CONSTRAINT "_articoli_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articoli_v_blocks_incorporato_locales" ADD CONSTRAINT "_articoli_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articoli_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_incorporato" ADD CONSTRAINT "pagine_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_incorporato_locales" ADD CONSTRAINT "pagine_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_incorporato" ADD CONSTRAINT "_pagine_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagine_v_blocks_incorporato_locales" ADD CONSTRAINT "_pagine_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagine_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_incorporato" ADD CONSTRAINT "contract_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contract_blocks_incorporato_locales" ADD CONSTRAINT "contract_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contract_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_incorporato" ADD CONSTRAINT "_contract_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contract_v_blocks_incorporato_locales" ADD CONSTRAINT "_contract_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contract_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_incorporato" ADD CONSTRAINT "pagine_heritage_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_heritage_blocks_incorporato_locales" ADD CONSTRAINT "pagine_heritage_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_heritage_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_incorporato" ADD CONSTRAINT "designer_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designer_blocks_incorporato_locales" ADD CONSTRAINT "designer_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designer_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_incorporato" ADD CONSTRAINT "_designer_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_designer_v_blocks_incorporato_locales" ADD CONSTRAINT "_designer_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_designer_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_incorporato" ADD CONSTRAINT "home_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_incorporato_locales" ADD CONSTRAINT "home_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_incorporato" ADD CONSTRAINT "_home_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_incorporato_locales" ADD CONSTRAINT "_home_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_incorporato" ADD CONSTRAINT "pagina_catalogo_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_catalogo_blocks_incorporato_locales" ADD CONSTRAINT "pagina_catalogo_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_catalogo_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_incorporato" ADD CONSTRAINT "pagina_designer_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_designer_blocks_incorporato_locales" ADD CONSTRAINT "pagina_designer_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_designer_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_incorporato" ADD CONSTRAINT "pagina_installazioni_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_installazioni_blocks_incorporato_locales" ADD CONSTRAINT "pagina_installazioni_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_installazioni_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_incorporato" ADD CONSTRAINT "pagina_spunti_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_spunti_blocks_incorporato_locales" ADD CONSTRAINT "pagina_spunti_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_spunti_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_incorporato" ADD CONSTRAINT "pagina_materiali_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_materiali_blocks_incorporato_locales" ADD CONSTRAINT "pagina_materiali_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_materiali_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_incorporato" ADD CONSTRAINT "pagina_journal_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_journal_blocks_incorporato_locales" ADD CONSTRAINT "pagina_journal_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_journal_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_incorporato" ADD CONSTRAINT "_pagina_journal_v_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pagina_journal_v_blocks_incorporato_locales" ADD CONSTRAINT "_pagina_journal_v_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pagina_journal_v_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_incorporato" ADD CONSTRAINT "pagina_heritage_blocks_incorporato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_heritage_blocks_incorporato_locales" ADD CONSTRAINT "pagina_heritage_blocks_incorporato_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_heritage_blocks_incorporato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_incorporati" ADD CONSTRAINT "privacy_cookies_incorporati_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."privacy_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_fornitori_cookie" ADD CONSTRAINT "privacy_cookies_fornitori_cookie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies_fornitori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_fornitori_cookie_locales" ADD CONSTRAINT "privacy_cookies_fornitori_cookie_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies_fornitori_cookie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_fornitori" ADD CONSTRAINT "privacy_cookies_fornitori_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_fornitori_locales" ADD CONSTRAINT "privacy_cookies_fornitori_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies_fornitori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_script" ADD CONSTRAINT "privacy_cookies_script_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_cookies_locales" ADD CONSTRAINT "privacy_cookies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_cookies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_blocks_incorporato_order_idx" ON "prodotti_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "prodotti_blocks_incorporato_parent_id_idx" ON "prodotti_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "prodotti_blocks_incorporato_path_idx" ON "prodotti_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "prodotti_blocks_incorporato_locales_locale_parent_id_unique" ON "prodotti_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_blocks_incorporato_locales_parent_id_idx" ON "prodotti_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_incorporato_order_idx" ON "_prodotti_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_prodotti_v_blocks_incorporato_parent_id_idx" ON "_prodotti_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_blocks_incorporato_path_idx" ON "_prodotti_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_prodotti_v_blocks_incorporato_locales_locale_parent_id_uniq" ON "_prodotti_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_blocks_incorporato_locales_parent_id_idx" ON "_prodotti_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_incorporato_order_idx" ON "categorie_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "categorie_blocks_incorporato_parent_id_idx" ON "categorie_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "categorie_blocks_incorporato_path_idx" ON "categorie_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "categorie_blocks_incorporato_locales_locale_parent_id_unique" ON "categorie_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categorie_blocks_incorporato_locales_parent_id_idx" ON "categorie_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_incorporato_order_idx" ON "_categorie_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_categorie_v_blocks_incorporato_parent_id_idx" ON "_categorie_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_categorie_v_blocks_incorporato_path_idx" ON "_categorie_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_categorie_v_blocks_incorporato_locales_locale_parent_id_uni" ON "_categorie_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categorie_v_blocks_incorporato_locales_parent_id_idx" ON "_categorie_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_incorporato_order_idx" ON "case_history_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "case_history_blocks_incorporato_parent_id_idx" ON "case_history_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "case_history_blocks_incorporato_path_idx" ON "case_history_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "case_history_blocks_incorporato_locales_locale_parent_id_uni" ON "case_history_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_history_blocks_incorporato_locales_parent_id_idx" ON "case_history_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_incorporato_order_idx" ON "_case_history_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_case_history_v_blocks_incorporato_parent_id_idx" ON "_case_history_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_case_history_v_blocks_incorporato_path_idx" ON "_case_history_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_case_history_v_blocks_incorporato_locales_locale_parent_id_" ON "_case_history_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_case_history_v_blocks_incorporato_locales_parent_id_idx" ON "_case_history_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_incorporato_order_idx" ON "spunti_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "spunti_blocks_incorporato_parent_id_idx" ON "spunti_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "spunti_blocks_incorporato_path_idx" ON "spunti_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "spunti_blocks_incorporato_locales_locale_parent_id_unique" ON "spunti_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "spunti_blocks_incorporato_locales_parent_id_idx" ON "spunti_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_incorporato_order_idx" ON "_spunti_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_spunti_v_blocks_incorporato_parent_id_idx" ON "_spunti_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_spunti_v_blocks_incorporato_path_idx" ON "_spunti_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_spunti_v_blocks_incorporato_locales_locale_parent_id_unique" ON "_spunti_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_spunti_v_blocks_incorporato_locales_parent_id_idx" ON "_spunti_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_incorporato_order_idx" ON "materiali_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "materiali_blocks_incorporato_parent_id_idx" ON "materiali_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "materiali_blocks_incorporato_path_idx" ON "materiali_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "materiali_blocks_incorporato_locales_locale_parent_id_unique" ON "materiali_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "materiali_blocks_incorporato_locales_parent_id_idx" ON "materiali_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_incorporato_order_idx" ON "_materiali_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_materiali_v_blocks_incorporato_parent_id_idx" ON "_materiali_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_materiali_v_blocks_incorporato_path_idx" ON "_materiali_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_materiali_v_blocks_incorporato_locales_locale_parent_id_uni" ON "_materiali_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_materiali_v_blocks_incorporato_locales_parent_id_idx" ON "_materiali_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_incorporato_order_idx" ON "articoli_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "articoli_blocks_incorporato_parent_id_idx" ON "articoli_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "articoli_blocks_incorporato_path_idx" ON "articoli_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "articoli_blocks_incorporato_locales_locale_parent_id_unique" ON "articoli_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articoli_blocks_incorporato_locales_parent_id_idx" ON "articoli_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_incorporato_order_idx" ON "_articoli_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_articoli_v_blocks_incorporato_parent_id_idx" ON "_articoli_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_articoli_v_blocks_incorporato_path_idx" ON "_articoli_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_articoli_v_blocks_incorporato_locales_locale_parent_id_uniq" ON "_articoli_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articoli_v_blocks_incorporato_locales_parent_id_idx" ON "_articoli_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_incorporato_order_idx" ON "pagine_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagine_blocks_incorporato_parent_id_idx" ON "pagine_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_incorporato_path_idx" ON "pagine_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_blocks_incorporato_locales_locale_parent_id_unique" ON "pagine_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_blocks_incorporato_locales_parent_id_idx" ON "pagine_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_incorporato_order_idx" ON "_pagine_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_pagine_v_blocks_incorporato_parent_id_idx" ON "_pagine_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_pagine_v_blocks_incorporato_path_idx" ON "_pagine_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagine_v_blocks_incorporato_locales_locale_parent_id_unique" ON "_pagine_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagine_v_blocks_incorporato_locales_parent_id_idx" ON "_pagine_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_incorporato_order_idx" ON "contract_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "contract_blocks_incorporato_parent_id_idx" ON "contract_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "contract_blocks_incorporato_path_idx" ON "contract_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "contract_blocks_incorporato_locales_locale_parent_id_unique" ON "contract_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contract_blocks_incorporato_locales_parent_id_idx" ON "contract_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_incorporato_order_idx" ON "_contract_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_contract_v_blocks_incorporato_parent_id_idx" ON "_contract_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_contract_v_blocks_incorporato_path_idx" ON "_contract_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_contract_v_blocks_incorporato_locales_locale_parent_id_uniq" ON "_contract_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contract_v_blocks_incorporato_locales_parent_id_idx" ON "_contract_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_incorporato_order_idx" ON "pagine_heritage_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagine_heritage_blocks_incorporato_parent_id_idx" ON "pagine_heritage_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagine_heritage_blocks_incorporato_path_idx" ON "pagine_heritage_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagine_heritage_blocks_incorporato_locales_locale_parent_id_" ON "pagine_heritage_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagine_heritage_blocks_incorporato_locales_parent_id_idx" ON "pagine_heritage_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_incorporato_order_idx" ON "designer_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "designer_blocks_incorporato_parent_id_idx" ON "designer_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "designer_blocks_incorporato_path_idx" ON "designer_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "designer_blocks_incorporato_locales_locale_parent_id_unique" ON "designer_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designer_blocks_incorporato_locales_parent_id_idx" ON "designer_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_incorporato_order_idx" ON "_designer_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_designer_v_blocks_incorporato_parent_id_idx" ON "_designer_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_designer_v_blocks_incorporato_path_idx" ON "_designer_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_designer_v_blocks_incorporato_locales_locale_parent_id_uniq" ON "_designer_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_designer_v_blocks_incorporato_locales_parent_id_idx" ON "_designer_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "registro_consensi_consent_uuid_idx" ON "registro_consensi" USING btree ("consent_uuid");
  CREATE INDEX "registro_consensi_azione_idx" ON "registro_consensi" USING btree ("azione");
  CREATE INDEX "registro_consensi_updated_at_idx" ON "registro_consensi" USING btree ("updated_at");
  CREATE INDEX "registro_consensi_created_at_idx" ON "registro_consensi" USING btree ("created_at");
  CREATE INDEX "home_blocks_incorporato_order_idx" ON "home_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "home_blocks_incorporato_parent_id_idx" ON "home_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_incorporato_path_idx" ON "home_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_incorporato_locales_locale_parent_id_unique" ON "home_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_incorporato_locales_parent_id_idx" ON "home_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_incorporato_order_idx" ON "_home_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_incorporato_parent_id_idx" ON "_home_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_incorporato_path_idx" ON "_home_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_v_blocks_incorporato_locales_locale_parent_id_unique" ON "_home_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_blocks_incorporato_locales_parent_id_idx" ON "_home_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_incorporato_order_idx" ON "pagina_catalogo_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_catalogo_blocks_incorporato_parent_id_idx" ON "pagina_catalogo_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_incorporato_path_idx" ON "pagina_catalogo_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_catalogo_blocks_incorporato_locales_locale_parent_id_" ON "pagina_catalogo_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_catalogo_blocks_incorporato_locales_parent_id_idx" ON "pagina_catalogo_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_incorporato_order_idx" ON "pagina_designer_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_designer_blocks_incorporato_parent_id_idx" ON "pagina_designer_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_designer_blocks_incorporato_path_idx" ON "pagina_designer_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_designer_blocks_incorporato_locales_locale_parent_id_" ON "pagina_designer_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_designer_blocks_incorporato_locales_parent_id_idx" ON "pagina_designer_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_incorporato_order_idx" ON "pagina_installazioni_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_installazioni_blocks_incorporato_parent_id_idx" ON "pagina_installazioni_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_incorporato_path_idx" ON "pagina_installazioni_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_installazioni_blocks_incorporato_locales_locale_paren" ON "pagina_installazioni_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_installazioni_blocks_incorporato_locales_parent_i_idx" ON "pagina_installazioni_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_incorporato_order_idx" ON "pagina_spunti_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_spunti_blocks_incorporato_parent_id_idx" ON "pagina_spunti_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_spunti_blocks_incorporato_path_idx" ON "pagina_spunti_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_spunti_blocks_incorporato_locales_locale_parent_id_un" ON "pagina_spunti_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_spunti_blocks_incorporato_locales_parent_id_idx" ON "pagina_spunti_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_incorporato_order_idx" ON "pagina_materiali_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_materiali_blocks_incorporato_parent_id_idx" ON "pagina_materiali_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_materiali_blocks_incorporato_path_idx" ON "pagina_materiali_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_materiali_blocks_incorporato_locales_locale_parent_id" ON "pagina_materiali_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_materiali_blocks_incorporato_locales_parent_id_idx" ON "pagina_materiali_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_incorporato_order_idx" ON "pagina_journal_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_journal_blocks_incorporato_parent_id_idx" ON "pagina_journal_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_journal_blocks_incorporato_path_idx" ON "pagina_journal_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_journal_blocks_incorporato_locales_locale_parent_id_u" ON "pagina_journal_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_journal_blocks_incorporato_locales_parent_id_idx" ON "pagina_journal_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_incorporato_order_idx" ON "_pagina_journal_v_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "_pagina_journal_v_blocks_incorporato_parent_id_idx" ON "_pagina_journal_v_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_incorporato_path_idx" ON "_pagina_journal_v_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "_pagina_journal_v_blocks_incorporato_locales_locale_parent_i" ON "_pagina_journal_v_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pagina_journal_v_blocks_incorporato_locales_parent_id_idx" ON "_pagina_journal_v_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_incorporato_order_idx" ON "pagina_heritage_blocks_incorporato" USING btree ("_order");
  CREATE INDEX "pagina_heritage_blocks_incorporato_parent_id_idx" ON "pagina_heritage_blocks_incorporato" USING btree ("_parent_id");
  CREATE INDEX "pagina_heritage_blocks_incorporato_path_idx" ON "pagina_heritage_blocks_incorporato" USING btree ("_path");
  CREATE UNIQUE INDEX "pagina_heritage_blocks_incorporato_locales_locale_parent_id_" ON "pagina_heritage_blocks_incorporato_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pagina_heritage_blocks_incorporato_locales_parent_id_idx" ON "pagina_heritage_blocks_incorporato_locales" USING btree ("_parent_id");
  CREATE INDEX "privacy_cookies_incorporati_order_idx" ON "privacy_cookies_incorporati" USING btree ("order");
  CREATE INDEX "privacy_cookies_incorporati_parent_idx" ON "privacy_cookies_incorporati" USING btree ("parent_id");
  CREATE INDEX "privacy_cookies_fornitori_cookie_order_idx" ON "privacy_cookies_fornitori_cookie" USING btree ("_order");
  CREATE INDEX "privacy_cookies_fornitori_cookie_parent_id_idx" ON "privacy_cookies_fornitori_cookie" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_cookies_fornitori_cookie_locales_locale_parent_id_un" ON "privacy_cookies_fornitori_cookie_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_cookies_fornitori_cookie_locales_parent_id_idx" ON "privacy_cookies_fornitori_cookie_locales" USING btree ("_parent_id");
  CREATE INDEX "privacy_cookies_fornitori_order_idx" ON "privacy_cookies_fornitori" USING btree ("_order");
  CREATE INDEX "privacy_cookies_fornitori_parent_id_idx" ON "privacy_cookies_fornitori" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_cookies_fornitori_locales_locale_parent_id_unique" ON "privacy_cookies_fornitori_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_cookies_fornitori_locales_parent_id_idx" ON "privacy_cookies_fornitori_locales" USING btree ("_parent_id");
  CREATE INDEX "privacy_cookies_script_order_idx" ON "privacy_cookies_script" USING btree ("_order");
  CREATE INDEX "privacy_cookies_script_parent_id_idx" ON "privacy_cookies_script" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_cookies_locales_locale_parent_id_unique" ON "privacy_cookies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_cookies_locales_parent_id_idx" ON "privacy_cookies_locales" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registro_consensi_fk" FOREIGN KEY ("registro_consensi_id") REFERENCES "public"."registro_consensi"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_registro_consensi_id_idx" ON "payload_locked_documents_rels" USING btree ("registro_consensi_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodotti_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "prodotti_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_prodotti_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categorie_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categorie_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_history_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_history_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spunti_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spunti_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "materiali_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_materiali_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articoli_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articoli_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagine_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contract_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contract_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagine_heritage_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "designer_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_designer_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "registro_consensi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_catalogo_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_designer_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_installazioni_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_spunti_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_materiali_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_journal_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pagina_journal_v_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_incorporato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pagina_heritage_blocks_incorporato_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_incorporati" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_fornitori_cookie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_fornitori_cookie_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_fornitori" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_fornitori_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_script" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_cookies_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prodotti_blocks_incorporato" CASCADE;
  DROP TABLE "prodotti_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_prodotti_v_blocks_incorporato" CASCADE;
  DROP TABLE "_prodotti_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "categorie_blocks_incorporato" CASCADE;
  DROP TABLE "categorie_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_categorie_v_blocks_incorporato" CASCADE;
  DROP TABLE "_categorie_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "case_history_blocks_incorporato" CASCADE;
  DROP TABLE "case_history_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_case_history_v_blocks_incorporato" CASCADE;
  DROP TABLE "_case_history_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "spunti_blocks_incorporato" CASCADE;
  DROP TABLE "spunti_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_spunti_v_blocks_incorporato" CASCADE;
  DROP TABLE "_spunti_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "materiali_blocks_incorporato" CASCADE;
  DROP TABLE "materiali_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_materiali_v_blocks_incorporato" CASCADE;
  DROP TABLE "_materiali_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "articoli_blocks_incorporato" CASCADE;
  DROP TABLE "articoli_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_articoli_v_blocks_incorporato" CASCADE;
  DROP TABLE "_articoli_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagine_blocks_incorporato" CASCADE;
  DROP TABLE "pagine_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_pagine_v_blocks_incorporato" CASCADE;
  DROP TABLE "_pagine_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "contract_blocks_incorporato" CASCADE;
  DROP TABLE "contract_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_contract_v_blocks_incorporato" CASCADE;
  DROP TABLE "_contract_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagine_heritage_blocks_incorporato" CASCADE;
  DROP TABLE "pagine_heritage_blocks_incorporato_locales" CASCADE;
  DROP TABLE "designer_blocks_incorporato" CASCADE;
  DROP TABLE "designer_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_designer_v_blocks_incorporato" CASCADE;
  DROP TABLE "_designer_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "registro_consensi" CASCADE;
  DROP TABLE "home_blocks_incorporato" CASCADE;
  DROP TABLE "home_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_home_v_blocks_incorporato" CASCADE;
  DROP TABLE "_home_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_catalogo_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_designer_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_designer_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_installazioni_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_spunti_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_spunti_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_materiali_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_materiali_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_journal_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_journal_blocks_incorporato_locales" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_incorporato" CASCADE;
  DROP TABLE "_pagina_journal_v_blocks_incorporato_locales" CASCADE;
  DROP TABLE "pagina_heritage_blocks_incorporato" CASCADE;
  DROP TABLE "pagina_heritage_blocks_incorporato_locales" CASCADE;
  DROP TABLE "privacy_cookies_incorporati" CASCADE;
  DROP TABLE "privacy_cookies_fornitori_cookie" CASCADE;
  DROP TABLE "privacy_cookies_fornitori_cookie_locales" CASCADE;
  DROP TABLE "privacy_cookies_fornitori" CASCADE;
  DROP TABLE "privacy_cookies_fornitori_locales" CASCADE;
  DROP TABLE "privacy_cookies_script" CASCADE;
  DROP TABLE "privacy_cookies" CASCADE;
  DROP TABLE "privacy_cookies_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_registro_consensi_fk";
  
  DROP INDEX "payload_locked_documents_rels_registro_consensi_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "registro_consensi_id";
  DROP TYPE "public"."enum_prodotti_blocks_incorporato_formato";
  DROP TYPE "public"."enum_prodotti_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__prodotti_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__prodotti_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_categorie_blocks_incorporato_formato";
  DROP TYPE "public"."enum_categorie_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__categorie_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__categorie_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_case_history_blocks_incorporato_formato";
  DROP TYPE "public"."enum_case_history_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__case_history_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__case_history_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_spunti_blocks_incorporato_formato";
  DROP TYPE "public"."enum_spunti_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__spunti_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__spunti_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_materiali_blocks_incorporato_formato";
  DROP TYPE "public"."enum_materiali_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__materiali_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__materiali_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_articoli_blocks_incorporato_formato";
  DROP TYPE "public"."enum_articoli_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__articoli_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__articoli_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagine_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagine_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__pagine_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__pagine_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_contract_blocks_incorporato_formato";
  DROP TYPE "public"."enum_contract_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__contract_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__contract_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagine_heritage_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagine_heritage_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_designer_blocks_incorporato_formato";
  DROP TYPE "public"."enum_designer_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__designer_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__designer_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_registro_consensi_azione";
  DROP TYPE "public"."enum_home_blocks_incorporato_formato";
  DROP TYPE "public"."enum_home_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__home_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__home_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_catalogo_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_designer_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_designer_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_installazioni_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_spunti_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_spunti_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_materiali_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_materiali_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_journal_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_journal_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_incorporato_formato";
  DROP TYPE "public"."enum__pagina_journal_v_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_pagina_heritage_blocks_incorporato_formato";
  DROP TYPE "public"."enum_pagina_heritage_blocks_incorporato_sfondo";
  DROP TYPE "public"."enum_privacy_cookies_incorporati";
  DROP TYPE "public"."enum_privacy_cookies_fornitori_categoria";
  DROP TYPE "public"."enum_privacy_cookies_script_categoria";
  DROP TYPE "public"."enum_privacy_cookies_quando_banner";`)
}
