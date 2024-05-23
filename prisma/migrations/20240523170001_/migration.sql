-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "energyElectricQuantity" DROP NOT NULL,
ALTER COLUMN "energyElectricValue" DROP NOT NULL,
ALTER COLUMN "energySCEQuantity" DROP NOT NULL,
ALTER COLUMN "energySCEValue" DROP NOT NULL,
ALTER COLUMN "energyCompensatedQuantity" DROP NOT NULL,
ALTER COLUMN "energyCompensatedValue" DROP NOT NULL,
ALTER COLUMN "publicLightingContributionValue" DROP NOT NULL;
