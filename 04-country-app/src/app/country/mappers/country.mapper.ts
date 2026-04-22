import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {
  static fromRestCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      nameSpa: restCountry.translations['spa']?.common ?? 'Unknown',
      capital: restCountry.capital?.join(', '),
      population: restCountry.population
    }
  }

  static fromRestCountries( restCountries: RESTCountry[] ): Country[] {
    return restCountries.map(this.fromRestCountry);
  }

}
