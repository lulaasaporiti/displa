import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LenteService } from 'src/services/lente.service';

@Component({
  selector: 'app-limite-grilla-modificacion',
  templateUrl: './limite-grilla-modificacion.component.html',
  styleUrls: ['./limite-grilla-modificacion.component.css']
})
export class LimiteGrillaModificacionComponent implements OnInit{
  combinaciones: string[];

  constructor(
    private lenteService: LenteService,
    public dialogRef: MatDialogRef<LimiteGrillaModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.lenteService.getCombinaciones().subscribe(r => {
        this.combinaciones = r 
        console.log(this.combinaciones)
  
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  }
  