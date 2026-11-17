import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_contract_sezione" ADD VALUE 'su-misura' BEFORE 'cataloghi';
  ALTER TYPE "public"."enum__contract_v_version_sezione" ADD VALUE 'su-misura' BEFORE 'cataloghi';
  ALTER TABLE "home_locales" ALTER COLUMN "catalogo_pulsante" SET DEFAULT 'Richiedi il catalogo';
  ALTER TABLE "home_locales" ALTER COLUMN "catalogo_grazie" SET DEFAULT 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.';
  ALTER TABLE "_home_v_locales" ALTER COLUMN "version_catalogo_pulsante" SET DEFAULT 'Richiedi il catalogo';
  ALTER TABLE "_home_v_locales" ALTER COLUMN "version_catalogo_grazie" SET DEFAULT 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contract" ALTER COLUMN "sezione" SET DATA TYPE text;
  DROP TYPE "public"."enum_contract_sezione";
  CREATE TYPE "public"."enum_contract_sezione" AS ENUM('principale', 'hospitality', 'residenziale', 'urbano', 'cataloghi', 'area-riservata');
  ALTER TABLE "contract" ALTER COLUMN "sezione" SET DATA TYPE "public"."enum_contract_sezione" USING "sezione"::"public"."enum_contract_sezione";
  ALTER TABLE "_contract_v" ALTER COLUMN "version_sezione" SET DATA TYPE text;
  DROP TYPE "public"."enum__contract_v_version_sezione";
  CREATE TYPE "public"."enum__contract_v_version_sezione" AS ENUM('principale', 'hospitality', 'residenziale', 'urbano', 'cataloghi', 'area-riservata');
  ALTER TABLE "_contract_v" ALTER COLUMN "version_sezione" SET DATA TYPE "public"."enum__contract_v_version_sezione" USING "version_sezione"::"public"."enum__contract_v_version_sezione";
  ALTER TABLE "home_locales" ALTER COLUMN "catalogo_pulsante" SET DEFAULT 'Richiesta catalogo';
  ALTER TABLE "home_locales" ALTER COLUMN "catalogo_grazie" SET DEFAULT 'Grazie: riceverete catalogo e listino entro 24 ore lavorative.';
  ALTER TABLE "_home_v_locales" ALTER COLUMN "version_catalogo_pulsante" SET DEFAULT 'Richiesta catalogo';
  ALTER TABLE "_home_v_locales" ALTER COLUMN "version_catalogo_grazie" SET DEFAULT 'Grazie: riceverete catalogo e listino entro 24 ore lavorative.';`)
}
