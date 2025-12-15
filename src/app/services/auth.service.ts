import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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

  constructor(private http: HttpClient) {}

   private USER_KEY = 'usuarioLogado';

  salvarUsuario(usuario: any) {
    const userData = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  obterUsuario() {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  obterUserId(): number | null {
    const user = this.obterUsuario();
    return user ? user.id : null;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      senha
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

    getUsuario() {
      const user = localStorage.getItem('usuario');
      return user ? JSON.parse(user) : null;
    }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
