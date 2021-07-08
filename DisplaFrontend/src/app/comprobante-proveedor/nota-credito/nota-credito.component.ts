import { Component, OnInit, EventEmitter } from '@angular/core';
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
import { TipoComprobanteService } from 'src/services/tipo.comprobante.service';

@Component({
  selector: 'app-nota-credito-proveedor-alta',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoProveedorComponent implements OnInit {
  modelFactura = <ComprobanteProveedor>{};
  gastos: Gasto[];
  alicuotas = [21, 27, 10.5, 5, 2.5, 0]
  originalAlicuotas = [21, 27, 10.5, 5, 2.5, 0]
  modelProveedor = <Proveedor>{};
  proveedores: Proveedor[];
  proveedoresControl = new FormControl();
  filteredProveedores: Observable<Proveedor[]>;
  gastosControl = new FormControl();
  filteredGastos: Observable<Gasto[]>;
  modelAlicuota: ComprobanteIVA[] = [];
  selectedAlicuota = new EventEmitter<ComprobanteIVA[]>();
  tarjetas: TarjetaCredito[];
  cuitValido = true;
  proveedorNuevo;
  conTarjeta = false; 
  sumaExcedida = false;
  validarAlicuotas = false

  constructor(
    private router: Router,
    private gastoService: GastoService,
    private sessionService: SessionService,
    private proveedorService: ProveedorService,
    private tarjetaService: TarjetaCreditoService,
    private tipoComprobanteService: TipoComprobanteService,
    private comprobanteService: ComprobanteProveedorService) {
    let item = <ComprobanteIVA>{};
    item.Alicuota = 21;
    this.modelAlicuota.push(item);
    this.modelFactura.Fecha = new Date();
    this.modelFactura.FechaImputacion = new Date();
    this.modelFactura.IdUsuario = +this.sessionService.getPayload()['idUser'];
  }

  ngOnInit() {
    combineLatest([
      this.proveedorService.getProveedoresVigentesList(),
      this.gastoService.getGastosList(),
      this.tarjetaService.getTarjetasCreditoVigentesList(),
      this.tipoComprobanteService.getTiposComprobantesList()
    ]).subscribe(r => {
      this.proveedores = r[0];
      this.gastos = r[1];
      this.tarjetas = r[2];
      this.modelFactura.IdTipoComprobante = r[3].find(t => t.Descripcion == "Factura").Id;
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
    if (control.value != null && control.value != undefined) this.modelFactura.IdProveedor = control.value.Id;
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
    if (this.alicuotas.length <= this.modelAlicuota.length) {
      this.sessionService.showWarning("Ya se ingresaron todos los módulos posibles.");
    } else {
      if (this.modelAlicuota.length === 1) {
        this.modelAlicuota[0].Neto = undefined;
        this.modelAlicuota[0].MontoIva = undefined;
      }
      let item = <ComprobanteIVA>{};
      this.modelAlicuota.push(item);
    }
  }

  eliminarAlicuota(index) {
    this.alicuotas.push(this.modelAlicuota[index].Alicuota);
    this.modelAlicuota.splice(index, 1);
    this.updateStateAlicuota();
  }

  actualizarAlicuotas() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    this.validarAlicuotas = false;
    let modelAlicuotaVariable = JSON.parse(JSON.stringify(this.modelAlicuota));
    this.selectedAlicuota.emit(modelAlicuotaVariable);
    for (let index = 0; index < modelAlicuotaVariable.length; index++) {
      for (let i = 0; i < modelAlicuotaVariable.length; i++) {
        if (index != i && modelAlicuotaVariable[index].Alicuota == modelAlicuotaVariable[i].Alicuota && modelAlicuotaVariable[index].Alicuota != null) {
          this.validarAlicuotas = true;
          document.getElementById('neto' + i).setAttribute('disabled', 'true')
          document.getElementById('neto' + i).setAttribute('required', 'false')
        }
      }
    }
  }

  calcularMontoIVA(i) {
    if (this.modelAlicuota[i].Neto != undefined && this.modelAlicuota[i].Alicuota != undefined)
      this.modelAlicuota[i].MontoIva = Math.round(((this.modelAlicuota[i].Neto * this.modelAlicuota[i].Alicuota) / 100 + Number.EPSILON) * 100) / 100;
  }

  validarMonto() {
    if (this.modelAlicuota.length === 1) {
      this.modelAlicuota[0].MontoIva = this.modelFactura.Monto * 0.21;
      this.modelAlicuota[0].Neto = this.modelFactura.Monto - this.modelAlicuota[0].MontoIva;
    } else {
      let sumatoria = 0;
      this.modelAlicuota.forEach(al => {
        sumatoria = sumatoria + ((al.Neto != undefined) ? al.Neto : 0) + ((al.MontoIva != undefined) ? al.MontoIva : 0);
      });
      if (this.modelFactura.Monto != undefined && sumatoria > this.modelFactura.Monto) {
        this.sumaExcedida = false;
        this.sessionService.showError("La sumatoria de las alícuotas supera al monto total.");
      }
    }
  }

  // precioSelected() {
  //   this.updateStatePrecio();
  // }

  updateStateAlicuota() {
    let modelAlicuota = JSON.parse(JSON.stringify(this.modelAlicuota));
    this.selectedAlicuota.emit(modelAlicuota);
  }

  agregar() {
    if (this.modelProveedor == undefined) {
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

  cancelar() {
    this.router.navigateByUrl('Home')
  }
}
