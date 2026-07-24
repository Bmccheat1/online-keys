import { Link } from 'react-router-dom';
import { memo } from 'react';

const ProductCard = memo(function ProductCard({ product }) {
  const prices = product.durations.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <Link to={`/products/${product._id}`} className="card p-5 hover:border-primary-500/50 transition-all duration-300 group block">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition">{product.title}</h3>
        {product.gameId && (
          <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
            {product.gameId.name}
          </span>
        )}
      </div>
      <p className="text-dark-400 text-sm mb-4 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-dark-500">Starting from</span>
          <p className="text-lg font-bold text-primary-400">
            ₹{minPrice.toLocaleString()}
            {maxPrice > minPrice && <span className="text-sm text-dark-500 font-normal"> - ₹{maxPrice.toLocaleString()}</span>}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-dark-500 block">{product.durations.length} options</span>
          <span className={`text-[10px] font-medium ${(product.totalAvailableKeys || 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(product.totalAvailableKeys || 0) > 0 ? `${product.totalAvailableKeys} in stock` : 'Sold out'}
          </span>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
