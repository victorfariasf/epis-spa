import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  authLogin(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, payload);
  }

  estaLogado(){
    return localStorage.getItem('logado') === 'true'
  }

  logout(){
    localStorage.removeItem("logado");
    this.router.navigate(['/auth/login']);
  }
}
