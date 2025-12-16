import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    listarUsuarios(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/usuarios`);
    }

    editarUsuaio(id: string, payload: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, payload);
    }
}
