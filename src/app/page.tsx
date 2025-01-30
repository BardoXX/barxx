import ThemeToggle from '@/components/ThemeToggle'; 
import Image from "next/image";
import ReportForm from '@/components/ReportForm';

interface ProductCardProps {
  title: string;
  price: string;
  features: string[];
}

function ProductCard({ title, price, features }: ProductCardProps) {
  return (
    <div className="border p-6 rounded-lg dark:bg-gray-800 transition-colors duration-300">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h3>
      <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-200">{price}</div>
      <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200">
        Purchase
      </button>
    </div>
  );
}

export default function Page() {
  const products = [
    {
      title: "Basic Package",
      price: "€9.99",
      features: ["Feature 1", "Feature 2", "Feature 3"]
    },
    {
      title: "Pro Package",
      price: "€19.99",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
    }
  ];

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Barxx Packages</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              features={product.features}
            />
          ))}
        </div>
      </div>
      <div>   
 <div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-8">Meldingsformulier</h2>
      <ReportForm />
    </div>
</div>

    </main>
  );
}