import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-usuario-modificacion',
  templateUrl: './usuario-modificacion.component.html',
  styleUrls: ['./usuario-modificacion.component.css']
})
export class UsuarioModificacionComponent implements OnInit {
  rolesList: string[] = [];
  msgErrorFormato: boolean;
  msgMail: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<UsuarioModificacionComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.accountService.getRolesList().subscribe(result => {
        // this.setRol();
        result.forEach(r => {
            this.rolesList.push(r);
        });
      });
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
