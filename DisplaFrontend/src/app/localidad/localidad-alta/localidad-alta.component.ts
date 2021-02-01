import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProvinciaService } from 'src/services/provincia.service';
import { Provincia } from 'src/app/model/provincia';

@Component({
  selector: 'app-localidad-alta',
  templateUrl: './localidad-alta.component.html',
  styleUrls: ['./localidad-alta.component.css']
})
export class LocalidadAltaComponent implements OnInit {
  provincias: Provincia[];

  constructor(
    public dialogRef: MatDialogRef<LocalidadAltaComponent>,
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
