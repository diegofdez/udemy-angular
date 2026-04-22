import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { LocaleService, SupportedLocale } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',
})
export default class BasicPage {
  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('diego');
  nameUpper = signal('DIEGO');
  fullName = signal('DiEGo FeRNAnDez');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const intervalId = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick');
    }, 1000);

    onCleanup(() => {
      console.log('cleanup');
      clearInterval(intervalId);
    });
  });

  changeLocale(locale: SupportedLocale) {
    console.log('Changing locale to', locale);
    this.localeService.changeLocale(locale);
  }
}
