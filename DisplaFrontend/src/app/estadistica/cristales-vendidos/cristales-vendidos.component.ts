import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { ClienteService } from 'src/services/cliente.service';
import { LenteService } from 'src/services/lente.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-cristales-vendidos',
  templateUrl: './cristales-vendidos.component.html',
  styleUrls: ['./cristales-vendidos.component.css'],
  providers: [],
})
export class CristalesVendidosComponent implements OnInit {
  desde: Date;
  hasta = new Date();
  lentes: Lente[];
  analogo: boolean;
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;

  constructor(
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<CristalesVendidosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.desde = new Date(this.hasta.getFullYear()-1, this.hasta.getMonth(), this.hasta.getDate())
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterLente(val))
        );
    });
  }

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre + ' - Combinación ' +  l.Combinacion: undefined;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  filterLente(nombre: any): Lente[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.lentes.filter(lente =>
        lente.Id.toString().indexOf(s) !== -1 || lente.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  formatoAMostrar(formato){
    console.log(formato)
    switch (+formato) {
      case 4:
        console.log("cambia fechas 2 meses")
        this.desde = this.hasta;
        this.hasta = new Date(this.desde.getFullYear(), this.desde.getMonth()+3, this.desde.getDate());
        break;
    
      default:
        break;
    }
  }
}