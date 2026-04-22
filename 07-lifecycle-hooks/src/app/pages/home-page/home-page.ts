import { afterNextRender, afterRenderEffect, Component, effect, signal } from '@angular/core';
import { Title } from "../../components/title/title";


const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')}`,
     'color: #bada55'
  );
}

@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html'
})
export class HomePage {

  traditionalProperty = "Diego";
  signalProperty = signal("Diego");

  constructor() {
    console.log('HomePage constructor');
  }

  changeTraditional() {
    this.traditionalProperty = "Diego FL";
  }

  changeSignal() {
    this.signalProperty.set("Diego FL");
  }

  basicEffect = effect((onCleanup) => {
    log('basicEffect', "Runs secondary effects.");

    onCleanup(() => {
      log('basicEffect cleanup', "Runs when the effect is re-run or the component is destroyed.");
    });
  });

  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }

  ngDoCheck() {
    log('ngDoCheck', "Runs every time this component is checked for changes.");
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }

  ngAfterContentChecked() {
    log('ngAfterContentChecked', "Runs every time this component content has been checked for changes.");
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy() {
    log('ngOnDestroy', "Runs once just before Angular destroys the component.");
  }

  afterNextRenderEffect =  afterNextRender(() => {
    log('afterNextRender', "Runs once after the next render of the component.");
  });

  afterRenderEffect =  afterRenderEffect(() => {
    log('afterRender', "Runs every time after the component has been rendered.");
  });
}


