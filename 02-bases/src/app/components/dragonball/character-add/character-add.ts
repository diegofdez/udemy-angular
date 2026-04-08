import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.html'
})
export class CharacterAdd {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || this.power() <= 0) {
      console.error('Invalid character data');
      return;
    }

    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demonstration
      name: this.name(),
      power: this.power()
    };

    this.newCharacter.emit(newCharacter);

    console.log(newCharacter);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
