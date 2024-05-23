-- DropIndex
DROP INDEX "Invoice_clientNumber_key";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "updatedAt" TIMESTAMP(3);
