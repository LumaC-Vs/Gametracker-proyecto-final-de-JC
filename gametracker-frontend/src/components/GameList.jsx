import GameCard from './GameCard';

function GameList({ games, favorites, onToggleFavorite, onEdit, onDelete, searchTerm, onResenaUpdate }) {
  if (games.length === 0) {
    return (
      <div className="empty-state">
        {searchTerm ? (
          <>
            <p>😕 No se encontraron juegos con "{searchTerm}"</p>
            <p>Intenta con otro término de búsqueda</p>
          </>
        ) : (
          <>
            <p>📚 No hay juegos en tu biblioteca todavía</p>
            <p>¡Agrega tu primer juego usando el botón "➕ Agregar Juego"!</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="game-list">
      <h2 className="view-title">
        {searchTerm ? `Resultados para "${searchTerm}"` : '📚 Mi Biblioteca'}
        <span className="game-count">({games.length} juegos)</span>
      </h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard 
            key={game._id} 
            game={game}
            isFavorite={favorites.includes(game._id)}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
            onDelete={onDelete}
            onResenaUpdate={onResenaUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default GameList;