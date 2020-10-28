import { Component, Inject, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seleccion-servicios',
  templateUrl: './seleccion-servicios.component.html',
  styleUrls: ['./seleccion-servicios.component.css']
})
export class SeleccionServiciosComponent implements OnInit {
  servicios: string[] = ['CAL O', 'CAL M', 'CAL B', 'CAL L', 'CAL P', 'CAL F', 'CAL L', 'OTROS'];


  constructor() {
  }


  ngOnInit() {
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement)
  {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }


  // traerPrecio(i){
  //   console.log(i)
  //   this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[+i].IdLente, this.modelComprobanteItemLente[+i].Esferico, this.modelComprobanteItemLente[+i].Cilindrico)
  //   .subscribe(result => {
  //     this.mostrarPrecio = true;
  //     this.modelComprobanteItemLente[+i].Precio = result;
  //     this.modelComprobanteItemLente[+i].Cantidad = 1;
  //     if (i == 0)
  //       this.modelComprobanteItemLente[0].Sobre = 0;
  //   })
  // }


}