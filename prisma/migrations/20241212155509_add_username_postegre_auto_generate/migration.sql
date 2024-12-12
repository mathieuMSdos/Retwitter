-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DEFAULT SUBSTRING(LOWER(REGEXP_REPLACE(REGEXP_REPLACE(name, '\s+', '', 'g'), '[^a-zA-Z0-9]', '', 'g')), 1, 6) || '_' || SUBSTRING(gen_random_uuid()::text, 1, 4);
