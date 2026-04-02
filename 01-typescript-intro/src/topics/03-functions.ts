function addNumbers(a: number, b: number): number {
  return a + b;
}

const addNumbersArrow = (a: number, b: number): number => {
  return a + b;
}

function multiplyNumbers(a: number, b?: number, base: number = 2): number {
  return a * (b ?? base);
}

// const result = addNumbers(5, 10);
// const result2 = addNumbersArrow(5, 10);
// const multiplyResult = multiplyNumbers(5, 10);
// console.log({result, result2, multiplyResult});

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = (character: Character, amount: number ) => {
    character.hp += amount;
}
 
const mario_bros: Character = {
    name: "Mario",
    hp: 50,
    showHp() {
        console.log(`HP: ${this.hp}`);
    }
};

mario_bros.showHp();
healCharacter(mario_bros, 20);
mario_bros.showHp();

export {};