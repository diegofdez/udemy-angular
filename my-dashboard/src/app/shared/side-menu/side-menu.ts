import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  public menuItems = routes
    .map(route => route.children ? route.children : [])
    .flat()
    .filter(route => route && route.path !== '' && route.path !== '**')
    .filter(route => !route.path?.includes(':'))

  constructor() {
    console.log(this.menuItems);
  }
}
