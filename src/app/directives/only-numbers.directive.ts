import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  constructor(private ngControl: NgControl) { }

  /**
   * Función que valida si se ingresan números
   * @param value
   */
  @HostListener('input', ['$event.target.value']) onInputChange(value: string) {
    this.ngControl.control?.setValue(value.replace(/[^0-9]/g, ''), { emitEvent: false });
  }
}
