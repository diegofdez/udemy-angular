import { booleanAttribute, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <h1 class="text-3xl mb-5">{{ title }} - {{ title2() }} - {{ withShadow }}</h1>
  `
})
export class TitleComponent {
  @Input( { required: true} ) title: string = '';
  title2 = input<string>('');

  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
