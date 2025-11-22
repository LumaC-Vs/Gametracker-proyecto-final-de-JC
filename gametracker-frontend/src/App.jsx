import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import ResenaForm from './components/ResenaForm';
import HeroCarousel from './components/HeroCarousel';
import { getAllGames } from './services/gameService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('biblioteca');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gameToEdit, setGameToEdit] = useState(null);
  const [resenaToEdit, setResenaToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Cargar juegos
  useEffect(() => {
    loadGames();
  }, [refreshKey]);

  const loadGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data);
      setFilteredGames(data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    }
  };

  // Búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game =>
        game.titulo.toLowerCase().includes(term.toLowerCase()) ||
        game.plataforma.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  // Favoritos
  const toggleFavorite = (gameId) => {
    setFavorites(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
  };

  const handleGameSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setGameToEdit(null);
    if (currentView === 'agregar-juego') {
      alert('¡Juego guardado exitosamente!');
    }
  };

  const handleResenaSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setResenaToEdit(null);
    alert('¡Reseña guardada exitosamente!');
    setCurrentView('biblioteca');
  };

  const handleResenaUpdate = (resena) => {
    setResenaToEdit(resena);
    setCurrentView('agregar-resena');
  };

  const handleCancelResena = () => {
    setResenaToEdit(null);
    setCurrentView('biblioteca');
  };

  const handleEdit = (game) => {
    setGameToEdit(game);
    setCurrentView('agregar-juego');
  };

  const handleDelete = (gameId) => {
    setGames(prev => prev.filter(g => g._id !== gameId));
    setFilteredGames(prev => prev.filter(g => g._id !== gameId));
    setFavorites(prev => prev.filter(id => id !== gameId));
  };

  const handleCancelEdit = () => {
    setGameToEdit(null);
    setCurrentView('biblioteca');
  };

  // Renderizar contenido según la vista
  const renderContent = () => {
    switch (currentView) {
      case 'biblioteca':
  return (
    <>
      <HeroCarousel />
      <SearchBar onSearch={handleSearch} />
      <GameList 
        games={filteredGames}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchTerm={searchTerm}
        onResenaUpdate={handleResenaUpdate}
      />
    </>
  );

      case 'favoritos':
        const favoriteGames = games.filter(game => favorites.includes(game._id));
        return (
          <>
            <h2 className="view-title">❤️ Juegos Favoritos</h2>
            {favoriteGames.length === 0 ? (
              <div className="empty-state">
                <p>No tienes juegos favoritos todavía</p>
                <p>Haz clic en 🤍 en cualquier juego para agregarlo a favoritos</p>
              </div>
            ) : (
              <GameList 
                games={favoriteGames}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onResenaUpdate={handleResenaUpdate}
              />
            )}
          </>
        );

      case 'agregar-juego':
        return (
          <GameForm 
            gameToEdit={gameToEdit}
            onSuccess={handleGameSuccess}
            onCancel={gameToEdit ? handleCancelEdit : null}
          />
        );

      case 'agregar-resena':
        return (
          <ResenaForm 
            resenaToEdit={resenaToEdit}
            onSuccess={handleResenaSuccess}
            onCancel={handleCancelResena}
          />
        );

      case 'estadisticas':
        const totalJuegos = games.length;
        const completados = games.filter(g => g.completado).length;
        const totalHoras = games.reduce((sum, g) => sum + (g.horasJugadas || 0), 0);

        return (
          <div className="estadisticas">
            <h2 className="view-title">📊 Estadísticas</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎮</div>
                <div className="stat-value">{totalJuegos}</div>
                <div className="stat-label">Total de juegos</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{completados}</div>
                <div className="stat-label">Completados</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{totalHoras}h</div>
                <div className="stat-label">Horas jugadas</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-value">{favorites.length}</div>
                <div className="stat-label">Favoritos</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="App">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="main-content">
        <header className="main-header">
          <h1>🎮 Game Vault 🔒 </h1>
          <p>Organiza y reseña tus videojuegos favoritos</p>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;