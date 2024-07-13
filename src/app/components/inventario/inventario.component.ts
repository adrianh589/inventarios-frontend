import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {InventarioService} from "../../services/inventario.service";
import {IInventario} from "../../models/IInventario";
import {firstValueFrom} from "rxjs";
import Swal from "sweetalert2";
import {IPageable} from "../../models/IPageable";

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{

  pageable: IPageable | undefined;
  inventarios: IInventario[] | undefined = [];
  currentPage = 1; // Página actual del paginador
  itemsPerPage = 5; // Número de elementos por página
  totalItems = 0; // Total de elementos paginados

  constructor( private inventarioService: InventarioService ) {  }

  async ngOnInit() {
   await this.obtenerRegistrosIventario(this.currentPage, this.itemsPerPage);
  }

  // Obtener inventarios paginados
  async obtenerRegistrosIventario( page: number, size: number ) {
    this.pageable = await firstValueFrom(this.inventarioService.obtenerRegistrosIventario(page, size)); // Almacena la respuesta paginada
    this.inventarios = this.pageable.content; // Asigna los datos de inventarios
    this.currentPage = this.pageable.number + 1; // Actualiza la página actual
    this.totalItems = this.pageable.totalElements; // Actualiza el total de elementos paginados
  }

  async cambiarEstadoEntrega(inventario: IInventario) {
    // Cambiar el estado del inventario seleccionado en la db de mongo
    this.inventarioService.entregarInventario(inventario).subscribe({
      next: (res) => {
        Swal.fire('Exito', 'Inventario entregado correctamente', 'success');
      },
      error: err => {
        Swal.fire('Error', 'Surgió un error al actualizar la entrega', 'error');
      },
      complete: async () => {
        // Actualizamos los inventarios
        await this.ngOnInit();
      }
    });
  }

  // Método para manejar el cambio de página
  paginaCambiada(page: number, buttonPage = false): void {
    this.currentPage = (buttonPage) ? page : this.currentPage += page; // Obtiene el número de página del evento click
    this.obtenerRegistrosIventario(this.currentPage, this.itemsPerPage);
  }

  // Función para generar un array de números de página
  obtenerPaginasArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

}
