// products.ts

export interface Product {
    title: string;
    price: string;
    priceNum: number;
    features: string[];
    quantity?: number;
  }
  
  export const products: Product[] = [
    {
      title: 'Starter Package',
      price: '€2/month',
      priceNum: 2,
      features: ['Feature 1', 'Feature 2'],
    },
    {
      title: 'Pro Package',
      price: '€4/month',
      priceNum: 4,
      features: ['Feature 1', 'Feature 2'],
    },
    {
      title: 'Elite Package',
      price: '€6/month',
      priceNum: 6,
      features: ['Feature 1', 'Feature 2'],
    },
    {
      title: 'Premium Package',
      price: '€8/month',
      priceNum: 8,
      features: ['Feature 1', 'Feature 2'],
    },
  ];
  