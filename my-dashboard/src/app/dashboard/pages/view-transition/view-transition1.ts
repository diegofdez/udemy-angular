import { Component } from '@angular/core';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-view-transition',
  imports: [TitleComponent],
  template: `
    <app-title title="View Transition API 1" withShadow />
    <section class="flex justify-start">
      <img
        srcset="http://picsum.photos/id/237/200/300"
        alt="Image of a dog"
        width="200"
        height="300"
        style="view-transition-name: hero-1"
      />

      <div
        class="bg-blue-500 w-56 h-56"
        style="view-transition-name: hero-2"
      >
      </div>
    </section>
  `
})
export default class ViewTransition1 { }
