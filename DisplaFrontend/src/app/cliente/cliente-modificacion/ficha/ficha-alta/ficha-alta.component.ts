import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-ficha-alta',
  templateUrl: './ficha-alta.component.html',
  styleUrls: ['./ficha-alta.component.css']
})
export class FichaAltaComponent {
  
  public Editor = ClassicEditor  

  constructor(
    public dialogRef: MatDialogRef<FichaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data.modelFicha.Descripcion = ''
  
  }

  ngOnInit() {
    ClassicEditor
    .create( document.querySelector( '#editor' ), {
      toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList' ]
  } )
  .catch( error => {
      console.log( error );
  } );;
  
    
    console.log(this.Editor)
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}