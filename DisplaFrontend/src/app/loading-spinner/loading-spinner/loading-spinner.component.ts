import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../loading-spinner.service';
import { LoadingSpinnerState } from '../loading-spinner';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  show = false;

  constructor(
    private loadingService: LoadingSpinnerService) { }
    
    private subscription: Subscription
  
    ngOnInit() {
    this.subscription = this.loadingService.loaderState
      .subscribe((state: LoadingSpinnerState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
