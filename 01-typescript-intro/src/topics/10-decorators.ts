function classDecorator<T extends { new(...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'new property';
        hello = 'override';
    }
}
 
@classDecorator
export class SuperClass {
    public myProperty: string = 'Abcd123';
    
    print() {
        console.log(this.myProperty);
    }
}

console.log(SuperClass);

const myClass = new SuperClass();
console.log(myClass);