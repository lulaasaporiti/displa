import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-factura-ficha',
  templateUrl: './factura-ficha.component.html',
  styleUrls: ['./factura-ficha.component.css']
})
export class FacturaFichaComponent implements OnInit {
  displayedColumns: string[] = ['Fecha', 'Descripcion'];
  dataSource = new MatTableDataSource<any>();
  myStyle: SafeHtml;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatAccordion, { static: true}) accordion: MatAccordion;
  constructor(
    public dialogRef: MatDialogRef<FacturaFichaComponent>,
    private _sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
  
    
  }

  getRowDetail(row) {
    // return row.Descripcion;
    return this.myStyle =
    this._sanitizer.bypassSecurityTrustHtml(row.Descripcion);
  }



  onNoClick(): void {
    this.dialogRef.close(false);
  }

 
}
