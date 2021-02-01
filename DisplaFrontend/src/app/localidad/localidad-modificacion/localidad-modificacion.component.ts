import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProvinciaService } from 'src/services/provincia.service';
import { Provincia } from 'src/app/model/provincia';

@Component({
  selector: 'app-localidad-modificacion',
  templateUrl: './localidad-modificacion.component.html',
  styleUrls: ['./localidad-modificacion.component.css']
})
export class LocalidadModificacionComponent implements OnInit{
  provincias: Provincia[];

  constructor( 
    public dialogRef: MatDialogRef<LocalidadModificacionComponent>,
    private provinciaService: ProvinciaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.provinciaService.getProvinciasVigentesList().subscribe(r => {
        this.provincias = r;
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  }
  