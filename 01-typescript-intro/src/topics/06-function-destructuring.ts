
export interface Product {
    description: string;
    price: number;
}

// const phone: Product = {
//     description: 'Nokia',
//     price: 1500
// };

// const tablet: Product = {
//     description: 'iPad',
//     price: 2500
// };

interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

export function calculateTax({ products, tax }: TaxCalculationOptions): [number, number] {
    let total = 0;
    products.forEach(({price}) => {
        total += price;
    });

    return [total, total * tax];
}

// const shopCart: Product[] = [phone, tablet];
// const tax = 0.15;

// const [total, taxTotal] = calculateTax({ products: shopCart, tax });

//console.log('Total', total);
//console.log('Tax', taxTotal);