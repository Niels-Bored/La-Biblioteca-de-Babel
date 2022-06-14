import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    this.spinnerService.llamarSpinner();
    return next.handle(req).pipe(
      finalize(()=> this.spinnerService.detenerSpinner())
    );
  }
}
