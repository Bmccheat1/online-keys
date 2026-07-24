import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI, gameAPI } from '../api';
import ProductCard from '../components/store/ProductCard';
import Loader from '../components/common/Loader';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const selectedGame = searchParams.get('game') || '';

  useEffect(() => {
    gameAPI.getAll({ active: 'true' }).then((res) => setGames(res.data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { active: 'true', page, limit: 12 };
    if (selectedGame) params.gameId = selectedGame;
    productAPI.getAll(params).then((res) => {
      setProducts(res.data || []);
      setTotal(res.total || 0);
    }).finally(() => setLoading(false));
  }, [selectedGame, page]);

  const handleGameFilter = (gameId) => {
    setSearchParams(gameId ? { game: gameId } : {});
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Store</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => handleGameFilter('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!selectedGame ? 'bg-primary-600 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}>All</button>
        {games.map((game) => (
          <button key={game._id} onClick={() => handleGameFilter(game._id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedGame === game._id ? 'bg-primary-600 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}>
            {game.name}
          </button>
        ))}
      </div>
      {loading ? <Loader /> : products.length === 0 ? (
        <div className="text-center py-16"><p className="text-dark-400 text-lg">No products found</p></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (<ProductCard key={product._id} product={product} />))}
          </div>
          {total > 12 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(total / 12) }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-primary-600 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}