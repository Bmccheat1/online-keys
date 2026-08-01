import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Clock, Layers } from 'lucide-react';

const ProductCard = memo(function ProductCard({ product }) {
  const prices = product.durations.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const inStock = (product.totalAvailableKeys || 0) > 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="panel panel-hover group block relative overflow-hidden animate-fade-up p-5"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-white font-display group-hover:text-amber-400 transition-colors">
            {product.title}
          </h3>
          <span className={`chip flex-shrink-0 !text-[9px] ${inStock ? 'chip-green' : 'chip-red'}`}>
            {inStock ? `${product.totalAvailableKeys} in stock` : 'Sold out'}
          </span>
        </div>
        {product.gameId && (
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full mt-1.5 inline-block font-medium">
            {product.gameId.name}
          </span>
        )}
      </div>

      <p className="text-dark-400 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>

      <div className="flex items-end justify-between pt-3 border-t border-[#1e1e2e]/50">
        <div>
          <span className="text-[10px] text-dark-500 uppercase tracking-wider">Starting from</span>
          <p className="text-lg font-bold text-gradient leading-tight">
            ₹{minPrice.toLocaleString()}
            {maxPrice > minPrice && <span className="text-xs text-dark-500 font-normal"> - ₹{maxPrice.toLocaleString()}</span>}
          </p>
        </div>
        <div className="text-right flex items-center gap-1.5 text-[10px] text-dark-500">
          <Layers className="w-3 h-3" />
          <span>{product.durations.length} options</span>
          <Clock className="w-3 h-3 ml-1" />
          <span>Instant</span>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
