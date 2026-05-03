import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [NgClass],
  template: `
    <section [ngClass]="['w-full h-[600px]', cssClass]">
      Heavy Loader Slow
    </section>
  `
})
export class HeavyLoadersSlow {
  @Input({ required: true }) cssClass!: string;

  constructor() {
    console.log('HeavyLoadersSlow component initialized');
    const start = Date.now();
    while (Date.now() - start < 5000) {
      // Simulate heavy computation for 5 seconds
    }
    console.log('HeavyLoadersSlow component finished heavy computation');
  }
}
