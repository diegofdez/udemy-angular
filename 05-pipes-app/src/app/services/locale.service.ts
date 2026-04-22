import { Injectable, signal } from '@angular/core';

export type SupportedLocale = 'es' | 'en' | 'fr';

@Injectable({providedIn: 'root'})
export class LocaleService {
  private currentLocale = signal<SupportedLocale>('en');

  constructor() {
    this.currentLocale.set(
      localStorage.getItem('locale') as SupportedLocale ?? 'es'
    )
  }

  changeLocale(locale: SupportedLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }

  getLocale() {

    return this.currentLocale();
  }
}
