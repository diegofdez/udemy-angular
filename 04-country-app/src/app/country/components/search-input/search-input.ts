import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input<string>('Input value to search');
  debounceTime = input(1000); // milliseconds
  initialValue = input<string>('');

  searchValue = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue());

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());

    onCleanup(() => clearTimeout(timeout));


  });
}
