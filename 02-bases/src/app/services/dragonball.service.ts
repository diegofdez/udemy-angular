import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}

@Injectable({providedIn: 'root'})
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  savetolocalstorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
    localStorage.setItem('gato', 'perro');
    console.log(`Character count is ${this.characters().length}`);
    console.log(localStorage.getItem('gato'));
  });

  addCharacter(character: Character) {
    this.characters.update(chars => [...chars, character]);
  }

}
