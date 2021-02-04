import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.css']
})
export class DetalleArticuloComponent {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  
  constructor(
    private loadingSpinnerService: LoadingSpinnerService 
  ){ }

  applyFilter(event){
  }


  applyFilterAvanzados(event, campo: string) {
    console.log(event)
    if (campo == 'todos'){
      // this.clientesControl.setValue("");
      // this.todo = this.clientesControl.value == "";
      // // this.traerTodos(event);
    }
    if (campo == 'cliente'){
      // console.log(this.cliente)
      // this.todo = (this.cliente == "");
      // this.changeDetector.detectChanges();
      // console.log("entra a cliente")
      // console.log(this.todo)
      // this.dataSource.data = this.original.filter(s => s.IdCliente == event.value.Id);
    }
    if (event.toString() == ""){
      // this.dataSource.data = this.original;
    }
  }
}
