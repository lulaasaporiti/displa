import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { MovimientoInterno } from 'src/app/model/movimientoInterno';
import { TipoComprobanteService } from 'src/services/tipo.comprobante.service';
import { TipoComprobante } from 'src/app/model/tipoComprobante';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedorService } from 'src/services/proveedor.service';
import { MovimientoInternoService } from 'src/services/movimiento.interno.service';
import { SessionService } from 'src/services/session.service';
import { AnulacionConfirmacionComponent } from 'src/app/anulacion-confirmacion/anulacion-confirmacion.component';


@Component({
  selector: 'app-movimiento-interno-detalle',
  templateUrl: './movimiento-interno-detalle.component.html',
  styleUrls: ['./movimiento-interno-detalle.component.css']
})
export class MovimientoInternoDetalleComponent {
  modelMovimientoInterno = <MovimientoInterno>{};
  tipoComprobante: TipoComprobante[];

  constructor(
    public dialog: MatDialog,
    private movimientoService: MovimientoInternoService,
    public dialogRef: MatDialogRef<MovimientoInternoDetalleComponent>,
    private tipoComprobanteService: TipoComprobanteService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    combineLatest([
      this.movimientoService.getById(this.data.idMovimiento),
      this.tipoComprobanteService.getTiposComprobantesList(),
    ])
      .subscribe(r => {
        this.modelMovimientoInterno = r[0];
        this.tipoComprobante = r[1].filter(t => t.Id >= 4);
      });
  }

  onEnter(): void {
    if (this.data.modelUbicacion.MontoEfectivo != undefined)
      this.dialogRef.close(this.data);
  }

  openDialogAnulacion(){
    const dialogRef = this.dialog.open(AnulacionConfirmacionComponent, {
      width: '550px',
      data: { model: this.modelMovimientoInterno }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.movimientoService.saveOrUpdateMovimientoInterno(result).subscribe(
          data => {
            this.sessionService.showSuccess("El movimiento interno se ha anulado correctamente.");
            this.dialogRef.close(true);
          },
          error => {
            this.sessionService.showError("El movimiento interno no se anuló.");
          }
        );
      }
      
    });
  }

}
