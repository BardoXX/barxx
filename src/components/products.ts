// products.ts

  export interface Product {
    id: string; 
    title: string;
    price: string;
    features: string[];
    quantity?: number; 
  } 
  
  export const products: Product[] = [
    {
      id: "basic-hosting",
      title: "Basis Pakket",
      price: "€4,99",
      quantity: "1", 
      features: ["5GB Opslag", "1 Website", "10GB Bandbreedte"]
    },
    {
      id: "pro-hosting",
      title: "Pro Pakket",
      price: "€9,99",
      quantity: "1",
      features: ["5GB Opslag", "1 Website", "10GB Bandbreedte"]
    },
    {
      id: "ulta-hosting",
      title: "Ultra Pakket",
      price: "€19,99",
      quantity: "1",
      features: ["5GB Opslag", "1 Website", "10GB Bandbreedte"]
    },
    {
      id: "supreme-hosting",
      title: "Supreme Pakket",
      price: "€29,99",
      quantity: "1",
      features: ["5GB Opslag", "1 Website", "10GB Bandbreedte"]
    },
  ];
  