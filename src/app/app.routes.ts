import { Routes } from '@angular/router';
import {RegistroComponent} from "./components/registro/registro.component";
import {InventarioComponent} from "./components/inventario/inventario.component";

export const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'inventario', component: InventarioComponent },
];
