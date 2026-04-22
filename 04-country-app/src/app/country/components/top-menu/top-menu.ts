import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";

@Component({
  selector: 'country-top-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './top-menu.html',
})
export class TopMenu { }
