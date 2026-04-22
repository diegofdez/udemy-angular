import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe, NgClass],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  country = input.required<Country>();
  currentYear = new Date().getFullYear();
}
