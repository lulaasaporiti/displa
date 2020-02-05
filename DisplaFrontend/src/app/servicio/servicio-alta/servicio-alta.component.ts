import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { TipoServicio } from 'src/app/model/tipoServicio';

@Component({
  selector: 'app-servicio-alta',
  templateUrl: './servicio-alta.component.html',
  styleUrls: ['./servicio-alta.component.css']
})
export class ServicioAltaComponent implements OnInit {
  tiposServicio: TipoServicio[];

  constructor(
    public dialogRef: MatDialogRef<ServicioAltaComponent>,
    private tipoServicioService: TipoServicioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.tipoServicioService.getTiposServiciosVigentesList().subscribe(r => {
      this.tiposServicio = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
