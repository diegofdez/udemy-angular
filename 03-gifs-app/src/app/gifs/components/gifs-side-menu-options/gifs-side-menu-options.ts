import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from '../../services/gifs.service';

interface MenuOption {
  label: string;
  sublabel: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/dashboard/search'
    },
    {
      label: 'Trending',
      sublabel: 'GIFs populares',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard/trending'
    }
  ];

  searchHistory = this.gifService.searchHistoryKeys;
}
