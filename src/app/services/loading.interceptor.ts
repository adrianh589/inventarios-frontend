import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  // Activacion del loading en la llamada de cualquier api
  loadingService.showLoader();

  // Cuando termine la llamada a cualquier api, se desactiva el loading
  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoader();
    })
  );
};
