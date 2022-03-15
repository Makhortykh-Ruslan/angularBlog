import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  get token(): string | null{
    const exDate = new Date(<string> localStorage.getItem('fb_token_ex'));
    if (new Date() > exDate){
      this.logOut();
      return null;
    }
    return <string> localStorage.getItem('fb_token');
  }

  login(user: User): Observable<any>{
    user.returnSecureToken = true;
    // @ts-ignore
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
       .pipe(
           tap(this.setToken),
           catchError(this.handleError.bind(this))
       );
  }
  logOut(): void{
    this.setToken(null);

  }
  isAuth(): boolean{
    return !!this.token;
  }
  private handleError(error: HttpErrorResponse): Observable<any>{
    const {message} = error.error.error;
    console.log(message);
    switch (message){
      case 'INVALID_EMAIL':
        this.error$.next('Некорректный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Нет такого email');
        break;
    }
    return throwError(error);
  }
  private setToken(response: FbResponse | null): void{
    if (response){
      const exDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb_token', response.idToken);
      localStorage.setItem('fb_token_ex', exDate.toString());
      console.log(response);
    }else {
      localStorage.clear();
    }

  }
}
