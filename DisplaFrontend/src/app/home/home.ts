import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent {
    hide = false;
    
    constructor(
        public dialog: MatDialog) {
            // this.hide = !this.router.url.includes("Home");
    }

    
}






