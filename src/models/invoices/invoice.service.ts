import { InvoiceRepository } from './invoice.repository';
const pdfjslib = import('pdfjs-dist');
export class InvoiceService {
    async find(body: any, invoiceRepository: InvoiceRepository) {
        const invoice = await invoiceRepository.find(body);
        return invoice;
    }

    async dashboardGraph(body: any, invoiceRepository: InvoiceRepository) {
        const invoice = await invoiceRepository.dashboardGraph(body);
        return invoice;
    }
    async dashboard(body: any, invoiceRepository: InvoiceRepository) {
        const invoice = await invoiceRepository.dashboard(body);
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
        const energyElectricMatch = textItems.match(
            /Energia Elétrica\s+kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/i
        );
        const energySCE_Match =
            textItems.match(/Energia SCEE ISENTA\s+kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/i) ||
            textItems.match(/Energia SCEE s\/ ICMS\s+kWh\s+(\d+)\s+[\d,.]+\s+([\d,.]+)/i);
        const energyCompensatedMatch = textItems.match(
            /Energia compensada GD I\s+kWh\s+(\d+)\s+[\d,.]+\s+(-?[\d,.]+)/i
        );
        const publicLightingContributionMatch = textItems.match(
            /Contrib Ilum Publica Municipal\s+([\d,.]+)/i
        );

        if (clientNumberMatch) extractedData.clientNumber = parseInt(clientNumberMatch[1]);
        if (referenceMonthMatch) extractedData.referenceMonth = referenceMonthMatch[1];

        if (energyElectricMatch) {
            extractedData.energyElectricQuantity = parseInt(energyElectricMatch[1]);
            extractedData.energyElectricValue = parseFloat(
                energyElectricMatch[2].replace(',', '.')
            );
        }

        if (energySCE_Match) {
            extractedData.energySCEQuantity = parseInt(energySCE_Match[1]);
            extractedData.energySCEValue = parseFloat(energySCE_Match[2].replace(',', '.'));
        }

        if (energyCompensatedMatch) {
            extractedData.energyCompensatedQuantity = parseInt(energyCompensatedMatch[1]);
            extractedData.energyCompensatedValue = parseFloat(
                energyCompensatedMatch[2].replace(',', '.')
            );
        }

        if (publicLightingContributionMatch) {
            extractedData.publicLightingContributionValue = parseFloat(
                publicLightingContributionMatch[1].replace(',', '.')
            );
        }

        extractedData.pdfBuffer = base64Pdf;

        const extractPdf = await invoiceRepository.extractPdf(extractedData);
        return extractPdf;
    }
}
