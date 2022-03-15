import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../admin/shared/services/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService, private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuth()){
      req = req.clone({
        setParams: {
          auth: this.authService.token as string
        }
      });

    }
    return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log('interceptor error', error);
              if (error.error === 401){
                this.authService.logOut();
                this.router.navigate(['/admin', 'login'], {
                  queryParams: {
                    authError: true
                  }
                });
              }
              return throwError(error);
            })
        );
  }

}
