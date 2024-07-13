import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IProducto} from "../models/IProducto";

const baseUrl = `${environment.baseUrl}/api/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  obtenerTodos(){
    return this.http.get<IProducto[]>(`${baseUrl}`);
  }

}
