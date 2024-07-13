import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyletters]',
  standalone: true
})
export class OnlylettersDirective {

  constructor(private ngControl: NgControl) { }

  /**
   * Función que valida si se ingresan letras y espacios
   * @param value
   */
  @HostListener('input', ['$event.target.value']) onInputChange(value: string) {
    this.ngControl.control?.setValue(value.replace(/[^a-zA-Z\s]/g, ''), { emitEvent: false });
  }
}
