export class Person {
    //public name: string;
    //private address: string;


    //constructor(public name: string, public address: string) {
    constructor(
        public name: string, 
        private address: string = 'No address provided'
    ) {}
}

// export class Hero extends Person {
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string,
//         public heroAddress: string
//     ) {
//         super(realName, heroAddress);
//     }
// }

export class Hero {
    constructor(
        public alterEgo: string,
        public age: number,
        public person: Person
    ) {
    }
}

const tony = new Person('Tony Stark', 'Malibu');
const iron_man = new Hero('Iron Man', 45, tony);

console.log({ iron_man });