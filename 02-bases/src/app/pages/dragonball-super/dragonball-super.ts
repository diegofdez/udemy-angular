import { Component, computed, inject, signal } from '@angular/core';
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { CharacterAdd } from "../../components/dragonball/character-add/character-add";
import { DragonballService } from '../../services/dragonball.service';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  imports: [CharacterList, CharacterAdd],
  templateUrl: './dragonball-super.html',
  selector: 'app-dragonball-super',
})
export class DragonballSuper {
  public dragonballservice = inject(DragonballService);
}
