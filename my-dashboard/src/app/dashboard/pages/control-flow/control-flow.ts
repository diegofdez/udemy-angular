import { Component, signal } from '@angular/core';
import { TitleComponent } from "../../../shared/title/title.component";

type Grade = 'A' | 'B' | 'F';

@Component({
  selector: 'app-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.html',
})
export default class ControlFlow {
  public showContent = signal(false);
  public grade = signal<Grade>('A');
  public frameworks = signal(['Angular', 'React', 'Vue', 'Spring', 'Micronaut']);
  public frameworks2 = signal([]);

  public toggleContent(): void {
    this.showContent.update((value) => !value);
  }
}
