import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { List } from "../../components/list/list";
import { CountryService } from '../../services/country';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validatedQueryParam(region: string | null): Region {
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };

  if (region === null) return 'Americas';
  region = region.toLowerCase();

  return region in validRegions ? validRegions[region] : 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region | null>(() => validatedQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({  query: this.selectedRegion() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.query
        }
      });

      return this.countryService.searchByRegion(params.query);
    }
  });
 }
