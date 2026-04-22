import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title implements OnChanges {
  title = input.required<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');

    if (changes["title"]) {
      console.log(`Previous: ${changes["title"].previousValue}`);
      console.log(`Current: ${changes["title"].currentValue}`);
      console.log(`Is first ${changes["title"].firstChange}`);
    }
  }
}
