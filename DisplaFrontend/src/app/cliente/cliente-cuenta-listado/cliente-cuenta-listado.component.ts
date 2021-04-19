import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { merge, Observable } from 'rxjs';
import { ExportacionService } from 'src/services/exportacion.service';


@Component({
  selector: 'app-cliente-cuenta-listado',
  templateUrl: './cliente-cuenta-listado.component.html',
  styleUrls: ['./cliente-cuenta-listado.component.css']
})
export class ClienteCuentaListadoComponent implements OnInit {
  panelOpenState = false;
  original: any[] = [];
  form: FormGroup = new FormGroup({
    Optica: new FormControl(true),
    Saldo: new FormControl(true),
    Monto: new FormControl(true),
    Credito: new FormControl(true),
    Dias: new FormControl(true),
    Plazo: new FormControl(true),
    Fecha: new FormControl(true),
    Motivo: new FormControl(true),
    Estado: new FormControl(true),
  });

  Optica = this.form.get('Optica');
  Saldo = this.form.get('Saldo');
  Monto = this.form.get('Monto');
  Credito = this.form.get('Credito');
  Dias = this.form.get('Dias');
  Plazo = this.form.get('Plazo');
  Fecha = this.form.get('Fecha');
  Motivo = this.form.get('Motivo');
  Estado = this.form.get('Estado');

  cbValues;
  displayedColumns =
    [
      { def: 'Optica', hide: this.Optica.value },
      { def: 'Saldo', hide: this.Saldo.value },
      { def: 'Monto', hide: this.Monto.value },
      { def: 'Credito', hide: this.Credito.value },
      { def: 'Dias', hide: this.Dias.value },
      { def: 'Plazo', hide: this.Plazo.value },
      { def: 'Fecha', hide: this.Fecha.value },
      { def: 'Motivo', hide: this.Motivo.value },
      { def: 'Estado', hide: this.Estado.value },
    ]


  dataSource = new MatTableDataSource<any>();
  traerActivos = true;
  manual: boolean;
  todo: boolean;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private changeDetector: ChangeDetectorRef,
    private exportacionService: ExportacionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.manual = false;
    this.todo = true;
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClientePage()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  loadClientePage() {
    this.loadingSpinnerService.show()
    this.clienteService.getCuentasClientes()
      .subscribe(r => {
        this.dataSource.data = r.filter(d => d.BloqueoManual == false);
        this.original = r;
        this.loadingSpinnerService.hide();
      })
  }

  traerDesbloqueados() {
    this.dataSource.data = this.original;
    document.getElementById("nobloqueados").style.backgroundColor="#e0e0e0";
    document.getElementById("bloqueados").style.backgroundColor = "transparent";
    this.dataSource.data = this.dataSource.data.filter(d => d.Bloqueado == false)
    this.todo = false;
    this.manual = false;
    this.changeDetector.detectChanges();
  }


  traerBloqueados() {
    this.dataSource.data = this.original;
    document.getElementById("bloqueados").style.backgroundColor="#e0e0e0";
    document.getElementById("nobloqueados").style.backgroundColor = "transparent";
    this.dataSource.data = this.dataSource.data.filter(d => d.Bloqueado == true)
    this.todo = false;
    this.manual = false;
    this.changeDetector.detectChanges();
  }

  traerManuales(event) {
    document.getElementById("bloqueados").style.backgroundColor = "transparent";
    document.getElementById("nobloqueados").style.backgroundColor = "transparent";
    if (!event.model) {
      if (this.todo)
        this.dataSource.data = this.original
      else
        this.dataSource.data = this.original.filter(d => d.Bloqueado == true && d.BloqueoManual == true)
    } else {
      if (this.todo)
        this.dataSource.data = this.original.filter(d => d.BloqueoManual == false);
      else 
        this.dataSource.data = [];
    }
  }

  traerTodos(event) {
    document.getElementById("bloqueados").style.backgroundColor = "transparent";
    document.getElementById("nobloqueados").style.backgroundColor = "transparent";
    if (!event.model) {
      // this.todo = event.checked;
      if (this.manual)
        this.dataSource.data = this.original;
      else
        this.dataSource.data = this.original.filter(d => d.BloqueoManual == false);
    } else {
      // this.todo = event.checked;
      if (this.manual)
        this.dataSource.data = this.original.filter(d => d.Bloqueado == true && d.BloqueoManual == true)
      else 
        this.dataSource.data = [];
    }
  }

  applyFilterAvanzados(filtro: number, campo: string) {
    if (campo == 'diferencia') {
      this.dataSource.data = this.dataSource.data.filter(d => d.Saldo >= filtro)
    }
    if (campo == 'dias') {
      this.dataSource.data = this.dataSource.data.filter(d => d.DiasExcedido >= filtro)
    }
    if (filtro.toString() == "") {
      this.dataSource.data = this.original;

    }
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter(cd => cd.hide).map(cd => cd.def);
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
    let o1: Observable<boolean> = this.Optica.valueChanges;
    let o2: Observable<boolean> = this.Saldo.valueChanges;
    let o3: Observable<boolean> = this.Monto.valueChanges;
    let o4: Observable<boolean> = this.Credito.valueChanges;
    let o5: Observable<boolean> = this.Dias.valueChanges;
    let o6: Observable<boolean> = this.Plazo.valueChanges;
    let o7: Observable<boolean> = this.Fecha.valueChanges;
    let o8: Observable<boolean> = this.Motivo.valueChanges;
    let o9: Observable<boolean> = this.Estado.valueChanges;

    merge(o1, o2, o3, o4, o5, o6, o7, o8, o9).subscribe(v => {
      this.displayedColumns[0].hide = this.Optica.value;
      this.displayedColumns[1].hide = this.Saldo.value;
      this.displayedColumns[2].hide = this.Monto.value;
      this.displayedColumns[3].hide = this.Credito.value;
      this.displayedColumns[4].hide = this.Dias.value;
      this.displayedColumns[5].hide = this.Plazo.value;
      this.displayedColumns[6].hide = this.Fecha.value;
      this.displayedColumns[7].hide = this.Motivo.value;
      this.displayedColumns[8].hide = this.Estado.value;
      this.displayedColumns[9];
    });
  }

  public exportar(): void {
    this.loadingSpinnerService.show();
    let excel = JSON.parse(JSON.stringify(this.original));
    excel.forEach(element => {
      element["Codigo"] = element.Id;
      delete element.Id;
      element["Fecha"] = element.Fecha != undefined ? new Date(Date.parse(element.Fecha.toString())).toLocaleDateString() : '';
      element["Bloqueado"] = element.Bloqueado == "FALSO" ? 'No' : 'Si';
      element["Borrado"] = element.Borrado == "FALSO" ? 'No' : 'Si';
      element["Monto excedido"] = element.MontoExcedido;
      delete element.MontoExcedido;
      element["Dias excedido"] = element.DiasExcedido
      delete element.DiasExcedido;
      element["BloqueoManual"] = element.BloqueoManual == "FALSO" ? 'No' : 'Si';
    });
    this.exportacionService.exportAsExcelFile(excel, "Listado cuentas corrientes");
    this.loadingSpinnerService.hide();
  }
}
