import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prodotti_disegno_quote_forma" AS ENUM('parallelepipedo', 'cilindro', 'troncoConico');
  CREATE TYPE "public"."enum__prodotti_v_version_disegno_quote_forma" AS ENUM('parallelepipedo', 'cilindro', 'troncoConico');
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_forma" "enum_prodotti_disegno_quote_forma";
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_larghezza" numeric;
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_profondita" numeric;
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_diametro" numeric;
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_diametro_base" numeric;
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_altezza" numeric;
  ALTER TABLE "prodotti" ADD COLUMN "disegno_quote_peso" numeric;
  ALTER TABLE "prodotti_locales" ADD COLUMN "disegno_quote_fonte" varchar;
  ALTER TABLE "prodotti_rels" ADD COLUMN "colori_id" integer;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_forma" "enum__prodotti_v_version_disegno_quote_forma";
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_larghezza" numeric;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_profondita" numeric;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_diametro" numeric;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_diametro_base" numeric;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_altezza" numeric;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_disegno_quote_peso" numeric;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_disegno_quote_fonte" varchar;
  ALTER TABLE "_prodotti_v_rels" ADD COLUMN "colori_id" integer;
  ALTER TABLE "colori" ADD COLUMN "hex" varchar;
  ALTER TABLE "prodotti_rels" ADD CONSTRAINT "prodotti_rels_colori_fk" FOREIGN KEY ("colori_id") REFERENCES "public"."colori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_rels" ADD CONSTRAINT "_prodotti_v_rels_colori_fk" FOREIGN KEY ("colori_id") REFERENCES "public"."colori"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_rels_colori_id_idx" ON "prodotti_rels" USING btree ("colori_id");
  CREATE INDEX "_prodotti_v_rels_colori_id_idx" ON "_prodotti_v_rels" USING btree ("colori_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodotti_rels" DROP CONSTRAINT "prodotti_rels_colori_fk";
  
  ALTER TABLE "_prodotti_v_rels" DROP CONSTRAINT "_prodotti_v_rels_colori_fk";
  
  DROP INDEX "prodotti_rels_colori_id_idx";
  DROP INDEX "_prodotti_v_rels_colori_id_idx";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_forma";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_larghezza";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_profondita";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_diametro";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_diametro_base";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_altezza";
  ALTER TABLE "prodotti" DROP COLUMN "disegno_quote_peso";
  ALTER TABLE "prodotti_locales" DROP COLUMN "disegno_quote_fonte";
  ALTER TABLE "prodotti_rels" DROP COLUMN "colori_id";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_forma";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_larghezza";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_profondita";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_diametro";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_diametro_base";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_altezza";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_disegno_quote_peso";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_disegno_quote_fonte";
  ALTER TABLE "_prodotti_v_rels" DROP COLUMN "colori_id";
  ALTER TABLE "colori" DROP COLUMN "hex";
  DROP TYPE "public"."enum_prodotti_disegno_quote_forma";
  DROP TYPE "public"."enum__prodotti_v_version_disegno_quote_forma";`)
}
