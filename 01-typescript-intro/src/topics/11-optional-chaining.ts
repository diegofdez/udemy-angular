export interface Passenger {
    name: string;
    //age: number;
    //destination?: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Perrete'
}

const passenger2: Passenger = {
    name: 'Gatita',
    children: ['Gatito1', 'Gatito2']
}

const printChildren = (passenger: Passenger) => {
    const howManyChildren = passenger.children?.length || 0;
    console.log(howManyChildren);
}

printChildren(passenger1);
printChildren(passenger2);