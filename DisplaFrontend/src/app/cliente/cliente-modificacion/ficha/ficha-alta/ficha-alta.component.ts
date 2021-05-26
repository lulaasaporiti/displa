import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';


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
      .create(document.querySelector('#editor'), {

        language: {
          // The UI will be English.
          ui: 'es',

          // But the content will be edited  Arabic.
          content: 'es'
        },

        toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],

      })
      .then(editor => {
      })
      .catch(error => {
        console.log(error);
      });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}