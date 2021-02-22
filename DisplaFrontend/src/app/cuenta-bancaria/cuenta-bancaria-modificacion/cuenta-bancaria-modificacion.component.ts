import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banco } from 'src/app/model/Banco';
import { BancoService } from 'src/services/banco.service';
import { ClienteService } from 'src/services/cliente.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cuenta-bancaria-modificacion',
  templateUrl: './cuenta-bancaria-modificacion.component.html',
  styleUrls: ['./cuenta-bancaria-modificacion.component.css']
})
export class CuentaBancariaModificacionComponent {
  bancos: Banco[] = [];


  constructor( 
    private bancoService: BancoService,
    private clienteService: ClienteService,
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
  
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelCuentaBancaria.Numero != "" && this.data.modelCuentaBancaria.Numero != undefined) 
      this.dialogRef.close(this.data);
  }

}