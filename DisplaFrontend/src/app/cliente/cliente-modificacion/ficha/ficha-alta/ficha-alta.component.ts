import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
// import Font from '@ckeditor/ckeditor5-font/src/font';
import * as customEditor from 'src/ckeditor/ckeditor';

@Component({
  selector: 'app-ficha-alta',
  templateUrl: './ficha-alta.component.html',
  styleUrls: ['./ficha-alta.component.css']
})
export class FichaAltaComponent {

  public Editor = customEditor
  public config = {
    language: {
      ui: 'es',
    },
    // plugins: [ Font ],
    fontColor: {
      colors: [
          {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black'
          },
          {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey'
          },
          {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey'
          },
          {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey'
          },
          {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
              hasBorder: true
          },

          // ...
      ]
  },
  fontBackgroundColor: {
      colors: [
          {
              color: 'hsl(0, 75%, 60%)',
              label: 'Red'
          },
          {
              color: 'hsl(30, 75%, 60%)',
              label: 'Orange'
          },
          {
              color: 'hsl(60, 75%, 60%)',
              label: 'Yellow'
          },
          {
              color: 'hsl(90, 75%, 60%)',
              label: 'Light green'
          },
          {
              color: 'hsl(120, 75%, 60%)',
              label: 'Green'
          },

          // ...
      ]
  },
    toolbar: ['bold', 'italic', 'link', '|', 'fontColor', 'fontBackgroundColor', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList']
  };

  constructor(
    public dialogRef: MatDialogRef<FichaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data.modelFicha.Descripcion = ''
  }

  ngOnInit() {
    // ClassicEditor
    //   .create(document.querySelector('#editor'), {
    //     language: {
    //       ui: 'es',
    //       content: 'es'
    //     },
    //     toolbar: ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],

    //   })
    //   .then(editor => {
    //     this.Editor = editor;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}