import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "prodotti_scheda_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "prodotti_scheda_faq_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_prodotti_v_version_scheda_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodotti_v_version_scheda_faq_locales" (
  	"domanda" varchar,
  	"risposta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "prodotti" ADD COLUMN "scheda_icone_automatiche" boolean DEFAULT true;
  ALTER TABLE "prodotti" ADD COLUMN "scheda_faq_automatiche" boolean DEFAULT true;
  ALTER TABLE "prodotti_locales" ADD COLUMN "scheda_caratteristiche" varchar;
  ALTER TABLE "prodotti_locales" ADD COLUMN "scheda_dimensioni" varchar;
  ALTER TABLE "prodotti_locales" ADD COLUMN "scheda_cura" varchar;
  ALTER TABLE "prodotti_locales" ADD COLUMN "scheda_spedizione" varchar;
  ALTER TABLE "prodotti_locales" ADD COLUMN "scheda_illuminazione" varchar;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_scheda_icone_automatiche" boolean DEFAULT true;
  ALTER TABLE "_prodotti_v" ADD COLUMN "version_scheda_faq_automatiche" boolean DEFAULT true;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_scheda_caratteristiche" varchar;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_scheda_dimensioni" varchar;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_scheda_cura" varchar;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_scheda_spedizione" varchar;
  ALTER TABLE "_prodotti_v_locales" ADD COLUMN "version_scheda_illuminazione" varchar;
  ALTER TABLE "prodotti_scheda_faq" ADD CONSTRAINT "prodotti_scheda_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodotti_scheda_faq_locales" ADD CONSTRAINT "prodotti_scheda_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodotti_scheda_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_scheda_faq" ADD CONSTRAINT "_prodotti_v_version_scheda_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodotti_v_version_scheda_faq_locales" ADD CONSTRAINT "_prodotti_v_version_scheda_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodotti_v_version_scheda_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prodotti_scheda_faq_order_idx" ON "prodotti_scheda_faq" USING btree ("_order");
  CREATE INDEX "prodotti_scheda_faq_parent_id_idx" ON "prodotti_scheda_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prodotti_scheda_faq_locales_locale_parent_id_unique" ON "prodotti_scheda_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prodotti_scheda_faq_locales_parent_id_idx" ON "prodotti_scheda_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_prodotti_v_version_scheda_faq_order_idx" ON "_prodotti_v_version_scheda_faq" USING btree ("_order");
  CREATE INDEX "_prodotti_v_version_scheda_faq_parent_id_idx" ON "_prodotti_v_version_scheda_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prodotti_v_version_scheda_faq_locales_locale_parent_id_uniq" ON "_prodotti_v_version_scheda_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prodotti_v_version_scheda_faq_locales_parent_id_idx" ON "_prodotti_v_version_scheda_faq_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "prodotti_scheda_faq" CASCADE;
  DROP TABLE "prodotti_scheda_faq_locales" CASCADE;
  DROP TABLE "_prodotti_v_version_scheda_faq" CASCADE;
  DROP TABLE "_prodotti_v_version_scheda_faq_locales" CASCADE;
  ALTER TABLE "prodotti" DROP COLUMN "scheda_icone_automatiche";
  ALTER TABLE "prodotti" DROP COLUMN "scheda_faq_automatiche";
  ALTER TABLE "prodotti_locales" DROP COLUMN "scheda_caratteristiche";
  ALTER TABLE "prodotti_locales" DROP COLUMN "scheda_dimensioni";
  ALTER TABLE "prodotti_locales" DROP COLUMN "scheda_cura";
  ALTER TABLE "prodotti_locales" DROP COLUMN "scheda_spedizione";
  ALTER TABLE "prodotti_locales" DROP COLUMN "scheda_illuminazione";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_scheda_icone_automatiche";
  ALTER TABLE "_prodotti_v" DROP COLUMN "version_scheda_faq_automatiche";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_scheda_caratteristiche";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_scheda_dimensioni";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_scheda_cura";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_scheda_spedizione";
  ALTER TABLE "_prodotti_v_locales" DROP COLUMN "version_scheda_illuminazione";`)
}
