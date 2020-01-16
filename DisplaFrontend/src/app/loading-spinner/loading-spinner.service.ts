import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'node_modules/rxjs';
import { LoadingSpinnerState } from './loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private loaderSubject = new BehaviorSubject<LoadingSpinnerState>({show: true});

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<LoadingSpinnerState>{show: true});
    }

    hide() {
        this.loaderSubject.next(<LoadingSpinnerState>{show: false});
    }
}
