import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatAccordion } from '@angular/material';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-factura-ficha',
  templateUrl: './factura-ficha.component.html',
  styleUrls: ['./factura-ficha.component.css']
})
export class FacturaFichaComponent implements OnInit {
  displayedColumns: string[] = ['Fecha', 'Descripcion'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatAccordion, { static: true}) accordion: MatAccordion;
  constructor(
    public dialogRef: MatDialogRef<FacturaFichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
  
    
  }



  onNoClick(): void {
    this.dialogRef.close(false);
  }

 
}
