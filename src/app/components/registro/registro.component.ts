import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {OnlylettersDirective} from "../../directives/onlyletters.directive";
import {OnlyNumbersDirective} from "../../directives/only-numbers.directive";
import {InventarioService} from "../../services/inventario.service";
import {ProductosService} from "../../services/productos.service";
import {IProducto} from "../../models/IProducto";
import {firstValueFrom} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    JsonPipe,
    OnlylettersDirective,
    OnlyNumbersDirective,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  submitted = false;
  productos: IProducto[] = [];

  registroInventarioForm: FormGroup = this.fb.group({
    nombreUsuario: [null, [Validators.required]],
    productoId: [null, [Validators.required]],
    numeroSerie: [null, [Validators.required]],
    fechaCreacion: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private registroService: InventarioService,
              private productosService: ProductosService,
              private router: Router) {
  }

  async ngOnInit() {
    // Listar los productos de la db de MySQL
    this.productos = await firstValueFrom(this.productosService.obtenerTodos());

    // Si NO hay productos, se alerta al usuario
    if (this.productos.length === 0) {
      Swal.fire('Advertencia', 'No hay productos guardados actualmente', 'warning');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registroInventarioForm.valid) {

      // Se guarda el registro
      this.registroService.guardarRegistroInventario(this.registroInventarioForm.value)
        .subscribe({
          next: (result) => {
            // Mostrar mensaje de exito al usuario si se guardo correctamente
            Swal.fire('Éxito', 'Registro de inventario guardado correctamente', 'success').then( (result) => {
              // Al hacer click en OK del mensaje, se redirige a la pantalla de inventario
             if (result) {
               this.router.navigate(['inventario']);
             }
            });
          },
          error: (error) => {
            console.log(error);
            // Mensaje de error en caso de cualquier siniestro con la api
            Swal.fire('Error', error.error, 'error');
          }
        })
    }
  }
}
