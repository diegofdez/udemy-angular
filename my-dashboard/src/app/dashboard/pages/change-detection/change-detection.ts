import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()"></app-title>
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `
})
export default class ChangeDetection {

  public currentFramework = computed(() => `Change Detection: ${this.frameworkAsSignal().name}`);

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  })

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  }

  constructor() {
    console.log('ChangeDetection component initialized');
    setTimeout(() => {
      console.log('Updating frameworkAsSignal and frameworkAsProperty after 3 seconds');
      this.frameworkAsProperty.name = 'Angular (updated property)';
      this.frameworkAsSignal.update(framework => ({
        ...framework,
        name: 'Angular (updated)'
      }));
    }, 3000);
  }
}
