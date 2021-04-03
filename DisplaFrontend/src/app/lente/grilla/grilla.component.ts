import { Component, Inject } from '@angular/core';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { combineLatest, iif } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StockLenteService } from 'src/services/stock.lente.service';
import { LenteService } from 'src/services/lente.service';
import { StockLente } from 'src/app/model/stockLente';
import { Lente } from 'src/app/model/lente';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { StockAltaComponent } from '../stock-alta/stock-alta.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent {
  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};
  arraySuperiorDerecho: string[] = [];
  arrayLateralDerecho: number[] = [];
  arraySuperiorIzquierdo: string[] = [];
  arrayLateralIzquierdo: number[] = [];
  idLente: number;
  agregarMas: boolean = false;
  grillaIzquierda: any[][] = [[0], [0]];
  grillaDerecha: any[][] = [[0], [0]];
  stock: StockLente[];
  cargarStock: StockLente[] = [];
  lente = <Lente>{};
  dataSourceIzquierda: MatTableDataSource<number[]>;
  dataSourceDerecha: MatTableDataSource<number[]>;
  columnsIzquierda = [];
  columnsDerecha = [];


  constructor(
    private router: Router,
    public  dialog: MatDialog,
    private segment: ActivatedRoute,
    private lenteService: LenteService,
    private stockLenteService: StockLenteService,
    private limitesGrillaService: LimitesGrillaService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    this.loadingSpinnerService.show();
    this.segment.queryParams.subscribe((params: Params) => {
      // console.log(params['id'])
      this.idLente = +params['id'];
    });
    combineLatest([
      this.lenteService.getById(this.idLente),
      this.stockLenteService.getStockLenteList(this.idLente)
    ]).subscribe(r => {
      this.lente = r[0]
      // console.log(this.lente)
      this.stock = r[1];
      let combinacion = this.lente.Combinacion.split("  / ");
      let idLimiteDerecha;
      let idLimiteIzquierda;
      if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      else idLimiteIzquierda = 3;
      if (combinacion[1] == '- +') idLimiteDerecha = 2;
      else idLimiteDerecha = 4;
      combineLatest([
        this.limitesGrillaService.getById(idLimiteIzquierda),
        this.limitesGrillaService.getById(idLimiteDerecha)
      ]).subscribe(result => {
        this.limiteGrillaIzquierda = result[0];
        this.limiteGrillaDerecha = result[1];

        this.arraySuperiorIzquierdo.push("Esférico Positivo")
        this.arraySuperiorDerecho.push("Esférico Negativo")

        for (let index = this.limiteGrillaIzquierda.LimiteInferiorEsferico; index <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico; index = index + 0.25) {
          this.arrayLateralIzquierdo.push(index)
        }
        // console.log(this.arrayLateralIzquierdo);
        if (this.limiteGrillaIzquierda.Combinacion == '+ +') {
          for (let index = this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index <= this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index = index + 0.25) {
            this.arraySuperiorIzquierdo.push(index.toString())
          }
        } else {
          for (let index = this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index >= this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index = index - 0.25) {
            this.arraySuperiorIzquierdo.push(index.toString())
          }
        }

        for (let index = this.limiteGrillaDerecha.LimiteSuperiorEsferico; index >= this.limiteGrillaDerecha.LimiteInferiorEsferico; index = index - 0.25) {
          this.arrayLateralDerecho.push(index)
        }
        // console.log(this.arrayLateralDerecho);
        if (this.limiteGrillaDerecha.Combinacion == '- +') {
          for (let index = this.limiteGrillaDerecha.LimiteInferiorCilindrico; index <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico; index = index + 0.25) {
            this.arraySuperiorDerecho.push(index.toString())
          }
        } else {
          for (let index = this.limiteGrillaDerecha.LimiteSuperiorCilindrico; index >= this.limiteGrillaDerecha.LimiteInferiorCilindrico; index = index - 0.25) {
            this.arraySuperiorDerecho.push(index.toString())
          }
        }

        this.grillaIzquierda = [this.arraySuperiorIzquierdo];
        for (let i = 0; i <= this.arrayLateralIzquierdo.length; i++) {
          this.grillaIzquierda[i][0] = this.arrayLateralIzquierdo[i - 1];
          this.grillaIzquierda.push([]);
        }

        this.stock.forEach(s => {
          let columna = this.grillaIzquierda[0].indexOf(s.MedidaCilindrico.toString());
          this.grillaIzquierda.forEach(f => {
            if (f[0] == s.MedidaEsferico) {
              f[columna] = s.Stock;
            }
          })
        })
        this.columnsIzquierda.push({ columnDef: 'Esférico Positivo', header: 'Esférico Positivo', cell: (fila: any, columna: any) => "lala" });
        this.columnsDerecha.push({ columnDef: 'Esférico Negativo', header: 'Esférico Negativo', cell: (fila: any, columna: any) => "lala" });


        // this.grillaIzquierda[0][0] = "Esférico Positivo";
        // console.table(this.grillaIzquierda)
        for (let j = 0; j <= this.grillaIzquierda[0].length - 1; j++) {
          if (this.grillaIzquierda[0][j] != undefined)
            this.columnsIzquierda.push({ columnDef: this.grillaIzquierda[0][j], header: this.grillaIzquierda[0][j], cell: (fila: any, columna: any) => `${fila}` });
        }
        // this.columnsIzquierda.splice(1, 1);
        this.grillaIzquierda.splice(0, 1);
        this.arraySuperiorIzquierdo.splice(0, 1);
        this.grillaIzquierda.splice(this.grillaIzquierda.length - 1, 1)
        this.dataSourceIzquierda = new MatTableDataSource([]);
        this.dataSourceIzquierda.data = this.grillaIzquierda;

        this.grillaDerecha = [this.arraySuperiorDerecho];
        for (let i = 0; i <= this.arrayLateralDerecho.length; i++) {
          this.grillaDerecha[i][0] = this.arrayLateralDerecho[i - 1];
          this.grillaDerecha.push([]);
        }

        this.stock.forEach(s => {
          let columna = this.grillaDerecha[0].indexOf(s.MedidaCilindrico.toString());
          this.grillaDerecha.forEach(f => {
            if (f[0] == s.MedidaEsferico) {
              f[columna] = s.Stock;
            }
          })
        })

        // this.grillaDerecha[0][0] = "Esférico Negativo";
        for (let j = 0; j <= this.grillaDerecha[0].length - 1; j++) {
          if (this.grillaDerecha[0][j] != undefined)
            this.columnsDerecha.push({ columnDef: this.grillaDerecha[0][j], header: this.grillaDerecha[0][j], cell: (fila: any, columna: any) => `${fila}` });
        }

        this.grillaDerecha.splice(0, 1)
        this.grillaDerecha.splice(this.grillaDerecha.length - 1, 1)
        this.arraySuperiorDerecho.splice(0, 1);
        this.dataSourceDerecha = new MatTableDataSource([]);
        this.dataSourceDerecha.data = this.grillaDerecha;
        this.combinacionGraduacion();
        this.loadingSpinnerService.hide();
      });
    })
  }

  getTotalIzquierda(i) {
    if (i == 0) return "Total"
    else {
      var sum = 0
      for (let j = 0; j < this.arrayLateralIzquierdo.length; j++) {
        sum = sum + ((this.grillaIzquierda[j][i] != null) ? this.grillaIzquierda[j][i] : 0);
      }
      return sum;
    }
  }

  getTotalDerecha(i) {
    if (i == 0) return "Total"
    else {
      var sum = 0
      for (let j = 0; j < this.arrayLateralDerecho.length; j++) {
        sum = sum + ((this.grillaDerecha[j][i] != null) ? this.grillaDerecha[j][i] : 0);
      }
      return sum;
    }
  }

  getTotalFila(row) {
    if (row.length > 1) {
      var sum = 0
      for (let j = 1; j < row.length; j++) {
        sum = sum + ((row[j] != null) ? row[j] : 0);
      }
      return sum;
    }
    else {
      return ' ';
    }
  }

  combinacionGraduacion() {
    if (this.lente.Combinacion.startsWith('+ +'))
      this.agregarMas = true;
    else {
      this.agregarMas = false;
    }
  }

  sumarStockIzquierda(event, i, columna) {
    let fila = this.arrayLateralIzquierdo.indexOf(i);
    if (this.grillaIzquierda[fila][columna] != event) {
      let stockLente = <StockLente>{};
      if (this.grillaIzquierda[fila][columna] != undefined) {
        stockLente = this.stock.find(s => s.IdLente == this.idLente && s.MedidaEsferico == i
          && s.MedidaCilindrico == +this.arraySuperiorIzquierdo[columna]);
        stockLente.Stock = event;
        this.cargarStock.push(stockLente);
      }
      else {
        stockLente.Stock = +event;
        stockLente.IdLente = this.idLente;
        stockLente.MedidaEsferico = i;
        stockLente.MedidaCilindrico = +this.arraySuperiorIzquierdo[columna];
        this.cargarStock.push(stockLente);
      }
    }
  }

  sumarStockDerecha(event, i, columna) {
    let fila = this.arrayLateralDerecho.indexOf(i);
    if (this.grillaDerecha[fila][columna] != event) {
      let stockLente = <StockLente>{};
      if (this.grillaDerecha[fila][columna] != undefined) {
        stockLente = this.stock.find(s => s.IdLente == this.idLente && s.MedidaEsferico == i
          && s.MedidaCilindrico == +this.arraySuperiorDerecho[columna]);
        stockLente.Stock = event;
        this.cargarStock.push(stockLente);
      }
      else {
        let stockLente = <StockLente>{};
        stockLente.Stock = +event;
        stockLente.IdLente = this.idLente;
        stockLente.MedidaEsferico = i;
        stockLente.MedidaCilindrico = +this.arraySuperiorDerecho[columna];
        this.cargarStock.push(stockLente)
      }
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  agregarStock(){
    const dialogRef = this.dialog.open(StockAltaComponent, {
      width: '700px',
      height: '650px',
      data: { modelStock: this.stock, lente: this.lente }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadingSpinnerService.show();
      this.router.navigateByUrl('Account/Login').then(
        () => {
          this.router.navigateByUrl('Lente/Stock?id='+this.idLente);
          this.loadingSpinnerService.hide();
          window.scrollTo(0, 0);
        });
      // window.location.reload();
    });
  }

  guardarStock() {
    this.stockLenteService.saveOrUpdateStockLente(this.cargarStock)
      .subscribe(r => {
        this.loadingSpinnerService.show();
        this.router.navigateByUrl('Account/Login').then(
          () => {
            this.router.navigateByUrl('Lente/Stock?id='+this.idLente);
            this.loadingSpinnerService.hide();
            window.scrollTo(0, 0);
          });
        // window.location.reload();
      });
  }

  scrollToTop() {
    window.scrollTo(0,0)
  }
}