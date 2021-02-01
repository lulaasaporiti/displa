import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-precio-lista-uno',
  templateUrl: './precio-lista-uno.component.html',
  styleUrls: ['./precio-lista-uno.component.css']
})
export class PrecioListaUnoComponent {

  constructor( 
    public dialogRef: MatDialogRef<PrecioListaUnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
