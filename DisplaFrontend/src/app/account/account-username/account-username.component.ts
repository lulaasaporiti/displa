import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-username',
  templateUrl: './account-username.component.html',
  styleUrls: ['./account-username.component.css']
})
export class AccountUsernameComponent {
  username: string;

  constructor(public dialogRef: MatDialogRef<AccountUsernameComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
      this.dialogRef.close(false);
  }

}