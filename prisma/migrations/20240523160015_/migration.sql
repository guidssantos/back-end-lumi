-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "energyElectricQuantity" TEXT NOT NULL,
    "energyElectricValue" TEXT NOT NULL,
    "energySCEQuantity" TEXT NOT NULL,
    "energySCEValue" TEXT NOT NULL,
    "energyCompensatedQuantity" TEXT NOT NULL,
    "energyCompensatedValue" TEXT NOT NULL,
    "publicLightingContributionValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientNumber_key" ON "Invoice"("clientNumber");
