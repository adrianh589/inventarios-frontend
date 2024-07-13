import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingCounter = 0;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Funcion para mostrar el loading
  showLoader(): void {
    // Aumentamos el contador ya que mas de una api puede ser llamada
    this.loadingCounter++;
    this.loading$.next(true);
  }

  hideLoader(): void {

    // Cualquier solicitud activa debe ser restada
    if (this.loadingCounter > 0) {
      this.loadingCounter--;
    }

    // Quitar el loading
    if (this.loadingCounter === 0) {
      this.loading$.next(false);
    }
  }
}
