import {IProducto} from "./IProducto";

export interface IInventario{
  id: string;
  nombreUsuario: string;
  product: IProducto;
  numeroSerie: number;
  fechaCreacion: Date;
  entregado: boolean;
}
