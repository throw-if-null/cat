import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
                 .pipe(
                     catchError((error: HttpErrorResponse) => {
                         console.error(error.message);
                         return throwError(error);
                     })
                 );
  }

}
