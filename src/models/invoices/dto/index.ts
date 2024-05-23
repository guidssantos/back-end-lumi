export interface InvoiceDTO {
    clientNumber: string;
    referenceMonth: string;
    energyEletricQuantity?: number;
    energyEletricValue?: number;
    energySCEQuantity?: number;
    energySCEValue?: number;
    energyCompensatedQuantity?: number;
    energyCompensatedValue?: number;
    publicLightingContribution?: number;
    pdfBuffer?: String;
}
