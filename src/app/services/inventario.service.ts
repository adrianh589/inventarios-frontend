import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment'
import {IInventario} from "../models/IInventario";
import {IPageable} from "../models/IPageable";

const baseUrl = `${environment.baseUrl}/api/inventarios`;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  guardarRegistroInventario(registroInventario: IInventario) {
    return this.http.post(`${baseUrl}`, registroInventario);
  }

  obtenerRegistrosIventario(page: number, size: number) {
    return this.http.get<IPageable>(`${baseUrl}?page=${page}&size=${size}`);
  }

  entregarInventario(inventario: IInventario){
    return this.http.put(`${baseUrl}`, inventario);
  }

}
