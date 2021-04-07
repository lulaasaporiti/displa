import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
//import { Observable } from 'rxjs/Rx';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
// import * as Highcharts from 'highcharts';
// require('highcharts/modules/exporting')(Highcharts);

@Injectable()
export class ExportacionService {

    constructor(private http: HttpClient) { }

    public exportAsExcelFile(data: any, nombreArchivo: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, nombreArchivo + " - ");
    }

    private saveAsExcelFile(array: any, fileName: string): void {
        const data: Blob = new Blob([array], {
            type: "text/vnd.ms-excel"
        });
        var today = new Date();
        var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
        var name = fileName + date;
        const file = new File([data], name + '.xls',
            { type: 'application/vnd.ms-excel' });
        FileSaver.saveAs(file);
    }

    private handleError(error: Response | any) {
        //console.error(error.message || error);
        return Observable.throw(error.status);
    }

    // print(printContents) {
    //     // console.log(printContents)
    //     let popupWin;
    //     // printContents = document.getElementById('print-section').innerHTML;
    //     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,status=no');
    //     popupWin.document.open();
    //     popupWin.document.write(`
    //       <html>
    //         <head>
    //           <title>Exportar reportes</title>
    //           <style type="text/css" media="print">
    //             body {
    //                 zoom:75%; 
    //                 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    //             }
    //         </style>
    //         </head>
    //         <body fxLayout="column" onload="window.print()">${printContents}</body>
    //       </html>`
    //     );
    //     popupWin.document.close();
    //     if (document.getElementById('no_print') != null )
    //         document.getElementById('no_print').style.visibility='visible';
    //     // document.getElementById('print_div').style.width='600px';
    //     document.getElementById('hidden_div').style.display='none';
    // }
}

