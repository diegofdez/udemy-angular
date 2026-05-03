import { Component } from '@angular/core';
import { HeavyLoadersSlow } from '@shared/heavy-loaders/heavy-loaders-slow';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-defer-views',
  imports: [HeavyLoadersSlow, TitleComponent],
  templateUrl: './defer-views.html',
})
export default class DeferViews { }
