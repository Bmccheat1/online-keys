import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { gameAPI } from '../../api';
import Loader from '../../components/common/Loader';

export default function GamesManager() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editGame, setEditGame] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    gameAPI.getAll().then((res) => setGames(res.data || [])).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Game name is required'); return; }
    try {
      if (editGame) { await gameAPI.update(editGame._id, form); toast.success('Game updated!'); }
      else { await gameAPI.create(form); toast.success('Game created!'); }
      const res = await gameAPI.getAll();
      setGames(res.data || []);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this game?')) return;
    try { await gameAPI.delete(id); setGames(games.filter((g) => g._id !== id)); toast.success('Game deleted'); }
    catch (error) { toast.error('Delete failed'); }
  };

  const resetForm = () => { setForm({ name: '', description: '' }); setEditGame(null); setShowForm(false); };
  const startEdit = (game) => { setForm({ name: game.name, description: game.description || '' }); setEditGame(game); setShowForm(true); };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Games Management</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Game'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{editGame ? 'Edit Game' : 'Add New Game'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Game Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Valorant, Netflix" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Description (optional)</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows="2" placeholder="Brief description..." />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">{editGame ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="btn-secondary">Reset</button>
            </div>
          </div>
        </form>
      )}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left p-4 text-dark-400 text-sm font-medium">Name</th>
              <th className="text-left p-4 text-dark-400 text-sm font-medium">Status</th>
              <th className="text-right p-4 text-dark-400 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id} className="border-b border-dark-700/50 hover:bg-dark-700/30">
                <td className="p-4 font-medium">{game.name}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${game.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {game.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => startEdit(game)} className="text-primary-400 hover:text-primary-300 text-sm mr-3">Edit</button>
                  <button onClick={() => handleDelete(game._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {games.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-dark-400">No games yet. Add your first game!</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
