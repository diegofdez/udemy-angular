import { Component, inject } from '@angular/core';
import { List } from "../../components/list/list";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'country-page',
  imports: [List, NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);
  countryId = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['code'])));

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({params}) => this.countryService.searchCountryByAlphaCode(params.code)
  });

  constructor() {
    console.log('CountryPage: ', this.countryId());
    console.log('CountryCode: ', this.countryCode);
  }
}
