const skills: string[] = ['Bash', 'Counter', 'Healing', 'Lightning'];

interface Character {
    name: string;
    hp: number;
    isAlive: boolean;
    skills: string[];
    hometown?: string; // Optional property
}

const mario_bros: Character = {
    name: 'Mario Bros',
    hp: 95,
    isAlive: true,
    skills
};

mario_bros.hometown = 'Mushroom Kingdom';

console.table(mario_bros);

export {};