import { Component } from '@angular/core';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-view-transition',
  imports: [TitleComponent],
  template: `
    <app-title title="View Transition API 2" withShadow />
    <section class="flex justify-end">
      <img
        srcset="http://picsum.photos/id/237/200/300"
        alt="Image of a dog"
        width="200"
        height="300"
        style="view-transition-name: hero-1"
      />

      <div
        class="fixed bottom-16 right-10 bg-blue-800 w-32 h-32 rounded"
        style="view-transition-name: hero-2"
      >
      </div>
    </section>
  `
})
export default class ViewTransition { }
