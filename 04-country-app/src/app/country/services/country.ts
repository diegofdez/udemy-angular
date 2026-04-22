import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    console.log("searchByCapital", query);
    query = query.toLowerCase().trim();

    if (this.queryCacheCapital.has(query)) {
      console.log("Returning cached result for capital query:", query);
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map( countries => CountryMapper.fromRestCountries(countries) ),
        tap( countries => {
          console.log("Caching result for capital query:", query, countries);
          this.queryCacheCapital.set(query, countries);
        }),
        catchError( err => {
          console.error("Error searching by capital", err);
          return throwError(() => new Error(`Failed to search by capital. Please try again later. Query: ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;

    console.log("searchByCountry", query);
    query = query.toLowerCase().trim();

    if (this.queryCacheCountry.has(query)) {
      console.log("Returning cached result for country query:", query);
      return of(this.queryCacheCountry.get(query)!);
    }


    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( countries => CountryMapper.fromRestCountries(countries) ),
        tap( countries => {
          console.log("Caching result for country query:", query, countries);
          this.queryCacheCountry.set(query, countries);
        }),
        catchError( err => {
          console.error("Error searching by country", err);
          return throwError(() => new Error(`Failed to search by country. Please try again later. Query: ${query}`));
        })
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${API_URL}/alpha/${code}`;

    console.log("searchCountryByAlphaCode", code);
    code = code.toLowerCase().trim();
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( response => CountryMapper.fromRestCountries(response) ),
        map( countries => countries.length > 0 ? countries[0] : null ), // The API returns an array, but we only want the first match
        catchError( err => {
          console.error("Error searching by alpha code", err);
          return throwError(() => new Error(`Failed to search by alpha code. Please try again later. Code: ${code}`));
        })
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    console.log("searchByRegion", region);

    if (this.queryCacheRegion.has(region)) {
      console.log("Returning cached result for region query:", region);
      return of(this.queryCacheRegion.get(region)!);
    }

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( countries => CountryMapper.fromRestCountries(countries) ),
        tap( countries => {
          console.log("Caching result for region query:", region, countries);
          this.queryCacheRegion.set(region, countries);
        }),
        catchError( err => {
          console.error("Error searching by region", err);
          return throwError(() => new Error(`Failed to search by region. Please try again later. Query: ${region}`));
        })
      );
  }
}
