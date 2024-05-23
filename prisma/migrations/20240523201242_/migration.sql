/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `energyElectricQuantity` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energyElectricValue` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energySCEQuantity` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energySCEValue` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energyCompensatedQuantity` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energyCompensatedValue` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publicLightingContributionValue` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clientNumber` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "clientNumber",
ADD COLUMN     "clientNumber" INTEGER NOT NULL,
DROP COLUMN "energyElectricQuantity",
ADD COLUMN     "energyElectricQuantity" INTEGER,
DROP COLUMN "energyElectricValue",
ADD COLUMN     "energyElectricValue" INTEGER,
DROP COLUMN "energySCEQuantity",
ADD COLUMN     "energySCEQuantity" INTEGER,
DROP COLUMN "energySCEValue",
ADD COLUMN     "energySCEValue" INTEGER,
DROP COLUMN "energyCompensatedQuantity",
ADD COLUMN     "energyCompensatedQuantity" INTEGER,
DROP COLUMN "energyCompensatedValue",
ADD COLUMN     "energyCompensatedValue" INTEGER,
DROP COLUMN "publicLightingContributionValue",
ADD COLUMN     "publicLightingContributionValue" INTEGER,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invoice_id_seq";
