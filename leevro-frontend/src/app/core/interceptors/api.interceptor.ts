import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get session ID from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    
    // Clone the request and add headers
    let headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Add Authorization header if sessionId exists
    if (sessionId) {
      headers['Authorization'] = sessionId; // Your backend expects just the sessionId, not "Bearer"
    }

    const authenticatedReq = req.clone({
      setHeaders: headers
    });

    return next.handle(authenticatedReq);
  }
}
