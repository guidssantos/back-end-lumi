import { InvoiceRepository } from './invoice.repository';
const pdfjslib = import('pdfjs-dist');
export class InvoiceService {
    async find(body: any, invoiceRepository: InvoiceRepository) {
        const invoice = await invoiceRepository.find(body);
        return invoice;
    }

    async download(body: any, invoiceRepository: InvoiceRepository) {
        const invoice = await invoiceRepository.download(body);
        return invoice;
    }
    async extractPdf(body: any, invoiceRepository: InvoiceRepository) {
        const { pdfBuffer: base64Pdf } = body;
        const pdfBuffer = Buffer.from(base64Pdf, 'base64');
        const pdfData = new Uint8Array(pdfBuffer.length);
        pdfBuffer.copy(pdfData);
        const pdf = await (await pdfjslib).getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);
        const text = await page.getTextContent();
        const textItems = text.items.map((item: any) => item.str).join(' ');

        const extractedData: any = {};

        const clientNumberMatch = textItems.match(/Nº DA INSTALAÇÃO\s+(\d+)/i);
        const referenceMonthMatch = textItems.match(/Valor a pagar \(R\$\)\s+([A-Z]{3})/i);
        const energyEletricMatch = textItems.match(
            /Energia Elétrica\s+kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/i
        );
        const energySCE_Match = textItems.match(
            /Energia SCEE ISENTA\s+kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/i
        );
        const energyCompensatedMatch = textItems.match(
            /Energia compensada GD I\s+kWh\s+(\d+)\s+[\d,.]+\s+(-?[\d,.]+)/i
        );
        const publicLightingContributionMatch = textItems.match(
            /Contrib Ilum Publica Municipal\s+([\d,.]+)/i
        );
        if (clientNumberMatch) extractedData.clientNumber = clientNumberMatch[1];
        if (referenceMonthMatch) extractedData.referenceMonth = referenceMonthMatch[1];
        if (energyEletricMatch) {
            extractedData.energyElectricQuantity = energyEletricMatch[1];
            extractedData.energyElectricValue = energyEletricMatch[2];
        }
        if (energySCE_Match) {
            extractedData.energySCEQuantity = energySCE_Match[1];
            extractedData.energySCEValue = energySCE_Match[2];
        }
        if (energyCompensatedMatch) {
            extractedData.energyCompensatedQuantity = energyCompensatedMatch[1];
            extractedData.energyCompensatedValue = energyCompensatedMatch[2];
        }
        if (publicLightingContributionMatch) {
            extractedData.publicLightingContributionValue = publicLightingContributionMatch[1];
        }
        extractedData.pdfBuffer = base64Pdf;
        const extractPdf = await invoiceRepository.extractPdf(extractedData);
        return extractPdf;
    }
}
