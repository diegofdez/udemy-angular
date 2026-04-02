import { Product, calculateTax } from './06-function-destructuring';

const shoppingCart: Product[] = [
    {
        description: 'Phone',
        price: 1500
    },
    {
        description: 'Tablet',
        price: 2500
    }
];

const tax = 0.15;

const [total, taxTotal] = calculateTax({ products: shoppingCart, tax });

console.log('Total', total);
console.log('Tax', taxTotal);