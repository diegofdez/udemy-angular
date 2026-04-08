import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  imports: [],
  templateUrl: './dragonball.html',
  styleUrl: './dragonball.css',
})
export class Dragonball {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8500 },
    // { id: 4, name: 'Yamcha', power: 500 },
    // { id: 5, name: 'Piccolo', power: 3000 },
    // { id: 6, name: 'Krillin', power: 300 }
  ]);

  addCharacter() {
    if (!this.name() || this.power() <= 0) {
      console.error('Invalid character data');
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };

    this.characters.update(chars => [...chars, newCharacter]);

    console.log('Adding character: ' + this.name() + ' with power ' + this.power());
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true
  //   }
  // });
}
