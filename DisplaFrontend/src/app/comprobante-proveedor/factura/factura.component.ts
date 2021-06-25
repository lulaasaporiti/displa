import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { ComprobanteProveedor } from 'src/app/model/comprobanteProveedor';
import { Proveedor } from 'src/app/model/Proveedor';
import { Gasto } from 'src/app/model/Gasto';
import { ProveedorService } from 'src/services/proveedor.service';
import { GastoService } from 'src/services/gasto.service';
import { ComprobanteProveedorService } from 'src/services/comprobanteProveedor.service';
import { combineLatest, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-factura-proveedor-alta',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaProveedorComponent implements OnInit {
  modelFactura = <ComprobanteProveedor>{};
  gastos: Gasto[];
  modelProveedor = <Proveedor>{};
  proveedores: Proveedor[];
  proveedoresControl = new FormControl();
  filteredProveedores: Observable<Proveedor[]>;
  gastosControl = new FormControl();
  filteredGastos: Observable<Gasto[]>;
  
  constructor(
    private router: Router,
    private gastoService: GastoService,
    private sessionService: SessionService,
    private proveedorService: ProveedorService,
    private comprobanteService: ComprobanteProveedorService) {
  }

  ngOnInit() {
    combineLatest([
      this.proveedorService.getProveedoresVigentesList(),
      this.gastoService.getGastosList()
    ]).subscribe(r => {
      this.proveedores = r[0];
      this.gastos = r[1];
      this.filteredProveedores = this.proveedoresControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterProveedor(val))
        );
      this.filteredGastos = this.gastosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterGasto(val))
        );
    });
  }

  setIdProveedor(control) {
    if (control.value != null) this.modelFactura.IdProveedor = control.value.Id;
  }

  displayProvedor(p?: Proveedor): string | undefined {
    return p ? p.Id + ' - ' + p.Nombre : undefined;
  }

  filterProveedor(nombre: any): Proveedor[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.proveedores.filter(proveedor =>
        proveedor.Id.toString().indexOf(s) !== -1 || proveedor.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }


  setIdGasto(control) {
    if (control.value != null) this.modelFactura.IdGasto = control.value.Id;
  }

  displayGasto(g?: Gasto): string | undefined {
    return g ? g.Id + ' - ' + g.Nombre : undefined;
  }

  filterGasto(nombre: any): Gasto[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.gastos.filter(gasto =>
        gasto.Id.toString().indexOf(s) !== -1 || gasto.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  // agregarPrecio() {
  //   let item = <PrecioArticulo>{};
  //   item.IdArticulo = this.modelArticuloVario.Id;
  //   this.modelPrecio.push(item);
  // }

  // eliminarPrecio(index) {
  //   this.modelPrecio.splice(index, 1);
  //   this.updateStatePrecio();
  // }


  // precioSelected() {
  //   this.updateStatePrecio();
  // }

  // updateStatePrecio() {
  //   //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
  //   //y el ngOnChanges() lo detecte
  //   let modelPrecio = JSON.parse(JSON.stringify(this.modelArticuloVario.PrecioArticulo));
  //   this.selectedPrecio.emit(modelPrecio);
  // }


  altaFactura(){
    this.comprobanteService.saveOrUpdateComprobanteProveedor(this.modelFactura)
    .subscribe( 
      data => {
        this.router.navigateByUrl('Home')
        this.sessionService.showSuccess("La factura se ha agregado correctamente.");
      },
      error => {
         // console.log(error)
        // this.router.navigateByUrl('ArticuloVario/Listado')
        this.sessionService.showError("La factura no se agregó.");
      }
    )
  }

  cancelar(){
    this.router.navigateByUrl('Home')
  }
}
