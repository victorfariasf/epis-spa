import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private api = "http://localhost:3000"

  public register(payload: any): Observable<any> {
    const registerUrl = `${this.api}/api/register`;

    return this.http.post<any>(registerUrl, payload);
  }
}
