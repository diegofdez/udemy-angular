import { Component } from '@angular/core';
import { HeavyLoadersFast } from "@shared/heavy-loaders/heavy-loaders-fast";
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-defer-options',
  imports: [HeavyLoadersFast, TitleComponent],
  templateUrl: './defer-options.html',
})
export default class DeferOptions { }
