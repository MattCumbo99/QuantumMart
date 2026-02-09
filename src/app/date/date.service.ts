import { formatDate } from '@angular/common';
import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  formatSpecificDate(date: Date, format: string = 'MM/dd/yyyy'): string {
    return formatDate(date, format, this.locale);
  }
}
