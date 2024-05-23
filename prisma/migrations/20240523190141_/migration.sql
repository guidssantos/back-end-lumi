-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "pdfBuffer" TEXT;
ALTER TABLE "Invoice" ALTER COLUMN "clientNumber" TYPE VARCHAR USING "clientNumber"::VARCHAR;
