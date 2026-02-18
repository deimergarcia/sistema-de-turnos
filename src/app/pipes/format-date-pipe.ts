import { Pipe, PipeTransform } from '@angular/core';
import { inject } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.warn(`FormatDatePipe: Fecha inválida recibida: ${value}`);
      return value;
    }
    return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  }

}
