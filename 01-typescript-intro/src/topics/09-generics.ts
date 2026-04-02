export function whatsMyType<T>(argument: T): T {
    return argument;
}

let amIString = whatsMyType('Hello');
let amINumber = whatsMyType(123);
let amIArray  = whatsMyType([1, 2, 3]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join(' - '));
