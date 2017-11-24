import { Injectable } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
declare const jsPDF;

@Injectable()
export class ExportService {

    data: Array<JSON>;
    csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true
    };

    constructor() { }

    exportToCsv(fileName, data) {
        new Angular2Csv(data, fileName, { headers: Object.keys(data[0]) }); 
        // new Angular2Csv(data, fileName, this.csvOptions);
    }

    generatePdf(fileName, isLong, title, data, columns, rows) {
        let doc = new jsPDF();
        if (isLong) {
            doc = new jsPDF('l');
        }

        // Document defaults
        doc.autoTableSetDefaults({
            headerStyles: { fillColor: [41, 128, 185] }, // Purple
            margin: { top: 25 },
            addPageContent: function (data) {
                doc.setFontSize(20);
                doc.text('R & D Labs', data.settings.margin.left, 10);
            }
        });

        doc.text(7, 20, title);
        doc.autoTable(columns, rows, {
            startY: 25,
            margin: { horizontal: 7 },
            styles: { columnWidth: 'wrap' },
            columnStyles: { text: { columnWidth: 'auto' } },
        });

        doc.save(fileName + '.pdf');
    }
}