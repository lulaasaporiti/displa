import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banco } from 'src/app/model/Banco';
import { BancoService } from 'src/services/banco.service';
import { combineLatest } from 'rxjs';
import { SessionService } from 'src/services/session.service';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';

@Component({
  selector: 'app-cuenta-bancaria-modificacion',
  templateUrl: './cuenta-bancaria-modificacion.component.html',
  styleUrls: ['./cuenta-bancaria-modificacion.component.css']
})
export class CuentaBancariaModificacionComponent {
  bancos: Banco[] = [];
  existeNumero;

  constructor(
    private bancoService: BancoService,
    private sessionService: SessionService,
    private cuentaBancariaService: CuentaBancariaService,
    public dialogRef: MatDialogRef<CuentaBancariaModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }


  ngOnInit() {
    this.data.modelCuentaBancaria.FechaApertura = new Date();
    combineLatest([
      this.bancoService.getBancosVigentesList(),
    ])
      .subscribe(result => {
        this.bancos = result[0];
      });
  }

  validarNumero(numero: string, id: number, idBanco: number) {
    this.cuentaBancariaService.getNumero(numero, id, idBanco)
      .subscribe(r => {
        this.existeNumero = r;
        if (this.existeNumero)
          this.sessionService.showWarning("Ya existe esa cuenta bancaria");
        // hay que ver si se puede repetir por banco
      });
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelCuentaBancaria.Numero != "" && this.data.modelCuentaBancaria.Numero != undefined)
      this.dialogRef.close(this.data);
  }

}