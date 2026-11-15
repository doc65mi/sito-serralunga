import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_catalogo_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "home_catalogo_box_locales" (
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_home_v_version_catalogo_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"immagine_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_catalogo_box_locales" (
  	"titolo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_catalogo_box" ADD CONSTRAINT "home_catalogo_box_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_catalogo_box" ADD CONSTRAINT "home_catalogo_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_catalogo_box_locales" ADD CONSTRAINT "home_catalogo_box_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_catalogo_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_catalogo_box" ADD CONSTRAINT "_home_v_version_catalogo_box_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_catalogo_box" ADD CONSTRAINT "_home_v_version_catalogo_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_catalogo_box_locales" ADD CONSTRAINT "_home_v_version_catalogo_box_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_catalogo_box"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_catalogo_box_order_idx" ON "home_catalogo_box" USING btree ("_order");
  CREATE INDEX "home_catalogo_box_parent_id_idx" ON "home_catalogo_box" USING btree ("_parent_id");
  CREATE INDEX "home_catalogo_box_immagine_idx" ON "home_catalogo_box" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "home_catalogo_box_locales_locale_parent_id_unique" ON "home_catalogo_box_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_catalogo_box_locales_parent_id_idx" ON "home_catalogo_box_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_catalogo_box_order_idx" ON "_home_v_version_catalogo_box" USING btree ("_order");
  CREATE INDEX "_home_v_version_catalogo_box_parent_id_idx" ON "_home_v_version_catalogo_box" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_catalogo_box_immagine_idx" ON "_home_v_version_catalogo_box" USING btree ("immagine_id");
  CREATE UNIQUE INDEX "_home_v_version_catalogo_box_locales_locale_parent_id_unique" ON "_home_v_version_catalogo_box_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_catalogo_box_locales_parent_id_idx" ON "_home_v_version_catalogo_box_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_catalogo_box" CASCADE;
  DROP TABLE "home_catalogo_box_locales" CASCADE;
  DROP TABLE "_home_v_version_catalogo_box" CASCADE;
  DROP TABLE "_home_v_version_catalogo_box_locales" CASCADE;`)
}
