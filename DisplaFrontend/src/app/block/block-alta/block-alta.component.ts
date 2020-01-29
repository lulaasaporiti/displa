import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoBlockService } from 'src/services/tipo.block.service';
import { TipoBlock } from 'src/app/model/tipoBlock';

@Component({
  selector: 'app-block-alta',
  templateUrl: './block-alta.component.html',
  styleUrls: ['./block-alta.component.css']
})
export class BlockAltaComponent implements OnInit {
  tiposBlock: TipoBlock[];

  constructor(
    public dialogRef: MatDialogRef<BlockAltaComponent>,
    private tipoBlockService: TipoBlockService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.tipoBlockService.getTiposBlocksVigentesList().subscribe(r => {
      this.tiposBlock = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
