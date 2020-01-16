import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { SessionService } from '../services/session.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(
    // private sessionService: SessionService
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // We do this in one step.
    const authReq = req.clone({ setHeaders: { Authorization: authToken ? authToken :"" } })
 
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}