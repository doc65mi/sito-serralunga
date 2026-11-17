import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DATA TYPE text;
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DEFAULT 'sempre'::text;
  DROP TYPE "public"."enum_privacy_cookies_quando_banner";
  CREATE TYPE "public"."enum_privacy_cookies_quando_banner" AS ENUM('sempre', 'auto');
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DEFAULT 'sempre'::"public"."enum_privacy_cookies_quando_banner";
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DATA TYPE "public"."enum_privacy_cookies_quando_banner" USING "quando_banner"::"public"."enum_privacy_cookies_quando_banner";
  ALTER TABLE "privacy_cookies" ALTER COLUMN "privacy_link" SET DEFAULT '/privacy-policy/';
  ALTER TABLE "privacy_cookies" ALTER COLUMN "cookie_link" SET DEFAULT '/cookie-policy/';
  UPDATE "privacy_cookies" SET "quando_banner" = 'sempre', "privacy_link" = COALESCE("privacy_link", '/privacy-policy/'), "cookie_link" = COALESCE("cookie_link", '/cookie-policy/') WHERE "privacy_link" IS NULL OR "cookie_link" IS NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DATA TYPE text;
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DEFAULT 'auto'::text;
  DROP TYPE "public"."enum_privacy_cookies_quando_banner";
  CREATE TYPE "public"."enum_privacy_cookies_quando_banner" AS ENUM('auto', 'sempre');
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DEFAULT 'auto'::"public"."enum_privacy_cookies_quando_banner";
  ALTER TABLE "privacy_cookies" ALTER COLUMN "quando_banner" SET DATA TYPE "public"."enum_privacy_cookies_quando_banner" USING "quando_banner"::"public"."enum_privacy_cookies_quando_banner";
  ALTER TABLE "privacy_cookies" ALTER COLUMN "privacy_link" DROP DEFAULT;
  ALTER TABLE "privacy_cookies" ALTER COLUMN "cookie_link" DROP DEFAULT;`)
}
