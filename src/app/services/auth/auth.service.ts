import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://192.168.0.6:8005';

  constructor() { }

  signup(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(`${this.baseUrl}/users/register`, data, httpOptions);
  }

  login(data: any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post(`${this.baseUrl}/users/login`, data, httpOptions)
      .pipe(tap((result:any) => {
        localStorage.setItem('authUser', result.token); 
      }),
      
    );
  }


  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
