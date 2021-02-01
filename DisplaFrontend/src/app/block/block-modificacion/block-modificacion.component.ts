import { Component, Inject, OnInit } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoBlock } from 'src/app/model/tipoBlock';
import { TipoBlockService } from 'src/services/tipo.block.service';

@Component({
  selector: 'app-block-modificacion',
  templateUrl: './block-modificacion.component.html',
  styleUrls: ['./block-modificacion.component.css']
})
export class BlockModificacionComponent implements OnInit{
  tiposBlock: TipoBlock[];

  constructor( 
    public dialogRef: MatDialogRef<BlockModificacionComponent>,
    private tipoBlockService: TipoBlockService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.tipoBlockService.getTiposBlocksList().subscribe(r => {
        this.tiposBlock = r;
      });
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}