import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { , MAT_DIALOG_DATA } from '@angular/material/core';
import { SessionService } from 'src/services/session.service';
import { AccountService } from 'src/services/account.service';
import { MainService } from 'src/services/main.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent {
    hide = false;
    
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private mainService: MainService,
        private sessionService: SessionService) {
            // this.hide = !this.router.url.includes("Home");
    }

    
}






