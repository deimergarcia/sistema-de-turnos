import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {

  transform(time: string | null | undefined): string | null {
    if (!time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return null;
    }
    const [h24, m] = time.split(':').map(Number);
    const h12 = h24 % 12 || 12;
    const ampm = h24 < 12 ? 'AM' : 'PM';

    // Devuelve la hora en formato hh:mm AM/PM
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

}
