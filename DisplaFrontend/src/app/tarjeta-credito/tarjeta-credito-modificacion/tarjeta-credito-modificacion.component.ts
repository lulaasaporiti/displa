import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BancoService } from 'src/services/banco.service';
import { Banco } from 'src/app/model/banco';

@Component({
  selector: 'app-tarjeta-credito-modificacion',
  templateUrl: './tarjeta-credito-modificacion.component.html',
  styleUrls: ['./tarjeta-credito-modificacion.component.css']
})
export class TarjetaCreditoModificacionComponent implements OnInit{
  bancos: Banco[];

  constructor( 
    public dialogRef: MatDialogRef<TarjetaCreditoModificacionComponent>,
    private bancoService: BancoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.bancoService.getBancosVigentesList().subscribe(r => {
        this.bancos = r;
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  }
  