import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent {
    hide = false;
    
    constructor(public router: Router) {
    }

    
}






