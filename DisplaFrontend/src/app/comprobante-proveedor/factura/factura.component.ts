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
import { ComprobanteIVA } from 'src/app/model/comprobanteIVA';
import { TarjetaCredito } from 'src/app/model/tarjetaCredito';
import { TarjetaCreditoService } from 'src/services/tarjeta.credito.service';

@Component({
  selector: 'app-factura-proveedor-alta',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaProveedorComponent implements OnInit {
  modelFactura = <ComprobanteProveedor>{};
  gastos: Gasto[];
  alicuotas = [21, 27, 10.5, 5, 2.5, 0]
  modelProveedor = <Proveedor>{};
  proveedores: Proveedor[];
  proveedoresControl = new FormControl();
  filteredProveedores: Observable<Proveedor[]>;
  gastosControl = new FormControl();
  filteredGastos: Observable<Gasto[]>;
  modelAlicuota: ComprobanteIVA[] = [];
  selectedAlicuota = new EventEmitter<ComprobanteIVA[]>();
  tarjetas: TarjetaCredito[];
  panelOpenState = false;
  cuitValido = true;

  constructor(
    private router: Router,
    private gastoService: GastoService,
    private sessionService: SessionService,
    private proveedorService: ProveedorService,
    private tarjetaService: TarjetaCreditoService,
    private comprobanteService: ComprobanteProveedorService) {
    let item = <ComprobanteIVA>{};
    item.Alicuota = 21;
    this.modelAlicuota.push(item);
  }

  ngOnInit() {
    combineLatest([
      this.proveedorService.getProveedoresVigentesList(),
      this.gastoService.getGastosList(),
      this.tarjetaService.getTarjetasCreditoVigentesList()
    ]).subscribe(r => {
      this.proveedores = r[0];
      this.gastos = r[1];
      console.log(this.gastos)
      this.tarjetas = r[2];
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
    if (nombre != undefined && nombre.length >= 0) {
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
    return g ? g.Id + ' - ' + g.Descripcion : undefined;
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
        gasto.Id.toString().indexOf(s) !== -1 || gasto.Descripcion.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  agregarAlicuota() {
    let item = <ComprobanteIVA>{};
    this.modelAlicuota.push(item);
  }

  eliminarAlicuota(index) {
    this.alicuotas.push(this.modelAlicuota[index].Alicuota);
    this.modelAlicuota.splice(index, 1);
    this.updateStateAlicuota();
  }

  actualizarAlicuotas(i) {

  }

  calcularMontoIVA(i) {
    if (this.modelAlicuota[i].Neto != undefined && this.modelAlicuota[i].Alicuota != undefined)
      this.modelAlicuota[i].MontoIva = Math.round(((this.modelAlicuota[i].Neto * this.modelAlicuota[i].Alicuota) / 100 + Number.EPSILON) * 100) / 100;
  }



  // precioSelected() {
  //   this.updateStatePrecio();
  // }

  updateStateAlicuota() {
    let modelAlicuota = JSON.parse(JSON.stringify(this.modelAlicuota));
    this.selectedAlicuota.emit(modelAlicuota);
  }

  agregar() {
    this.modelFactura.ComprobanteIva = this.modelAlicuota;
    if (this.modelProveedor != undefined) {
      this.proveedorService.saveOrUpdateProveedor(this.modelProveedor).subscribe(
        data => {
          this.modelFactura.IdProveedor = +data;
          this.altaFactura();
        },
        error => {
          this.sessionService.showError("¡Error! El usuario no se agregó.");
        }
      );
    } else {
      this.altaFactura();
    }
  }


  altaFactura() {
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

  //Cuando se ingresa un cuit se valida si es válido. En caso de que lo sea, comprueba
  //si ya existe registrado en la base de datos.
  validarCuit() {
    this.cuitValido = true;
    if (this.modelProveedor.Cuit != '' && this.modelProveedor.Cuit != undefined)
      if (this.modelProveedor.Cuit.length == 11) {
        let longitud = this.modelProveedor.Cuit.length;
        let acumulado = 0;
        let digitoVerificacion = parseInt(this.modelProveedor.Cuit.charAt(this.modelProveedor.Cuit.length - 1), 10);
        for (let x = 0; x < longitud - 1; x++) {
          let nro = parseInt(this.modelProveedor.Cuit.charAt(9 - x), 10);
          acumulado += (nro * (2 + (x % 6)));
        }

        let verificacion = 11 - (acumulado % 11);
        if (verificacion == 11) {
          verificacion = 0
        }

        this.cuitValido = (verificacion == digitoVerificacion);
      }
      else {
        this.cuitValido = false;
      }
  }

  deshabilitarProveedor() {
    if (this.modelProveedor.Nombre != undefined && this.modelProveedor.Nombre != '' && this.cuitValido == true && this.modelProveedor.Cuit != undefined) {
      this.proveedoresControl.disable()
    }
    else {
      this.proveedoresControl.enable()
    }
  }

  cancelar() {
    this.router.navigateByUrl('Home')
  }
}
