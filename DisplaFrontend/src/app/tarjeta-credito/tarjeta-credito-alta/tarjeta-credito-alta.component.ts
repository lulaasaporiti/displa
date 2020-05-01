import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BancoService } from 'src/services/banco.service';
import { Banco } from 'src/app/model/banco';

@Component({
  selector: 'app-tarjeta-credito-alta',
  templateUrl: './tarjeta-credito-alta.component.html',
  styleUrls: ['./tarjeta-credito-alta.component.css']
})
export class TarjetaCreditoAltaComponent implements OnInit {
  bancos: Banco[];

  constructor(
    public dialogRef: MatDialogRef<TarjetaCreditoAltaComponent>,
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
