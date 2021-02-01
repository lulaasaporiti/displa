import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LenteService } from 'src/services/lente.service';

@Component({
  selector: 'app-limite-grilla-alta',
  templateUrl: './limite-grilla-alta.component.html',
  styleUrls: ['./limite-grilla-alta.component.css']
})
export class LimiteGrillaAltaComponent implements OnInit {
  combinaciones: string[] = [];

  constructor(
    private lenteService: LenteService,
    public dialogRef: MatDialogRef<LimiteGrillaAltaComponent>,
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
