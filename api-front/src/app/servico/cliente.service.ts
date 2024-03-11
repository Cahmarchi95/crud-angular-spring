import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './../modelo/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  cadastrarClientes(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, obj);
  }

  editarClientes(obj: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, obj);
  }

  removerClientes(codigo: number): Observable<void> {
    return this.http.delete<void>(this.url + codigo);
  }
}
