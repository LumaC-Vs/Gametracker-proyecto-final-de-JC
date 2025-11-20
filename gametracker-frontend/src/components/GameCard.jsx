import { useState } from 'react';
import { getGameResenas } from '../services/gameService';
import { deleteGame } from '../services/gameService';
import { deleteResena } from '../services/resenaService';

function GameCard({ game, onEdit, onDelete, onToggleFavorite, isFavorite, onResenaUpdate }) {
  const [showResenas, setShowResenas] = useState(false);
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadResenas = async () => {
    if (resenas.length > 0 && showResenas) {
      setShowResenas(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getGameResenas(game._id);
      setResenas(data);
      setShowResenas(true);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      alert('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar "${game.titulo}"? Esto también eliminará todas sus reseñas.`)) {
      try {
        await deleteGame(game._id);
        onDelete(game._id);
      } catch (error) {
        console.error('Error al eliminar juego:', error);
        alert('Error al eliminar el juego');
      }
    }
  };

  const handleDeleteResena = async (resenaId) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await deleteResena(resenaId);
        // Recargar reseñas
        const data = await getGameResenas(game._id);
        setResenas(data);
        alert('Reseña eliminada correctamente');
      } catch (error) {
        console.error('Error al eliminar reseña:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  const handleEditResena = (resena) => {
    onResenaUpdate(resena);
  };

  const renderStars = (puntuacion) => {
    return '⭐'.repeat(puntuacion) + '☆'.repeat(5 - puntuacion);
  };

  return (
    <div className="game-card">
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(game._id)}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {game.imagen ? (
        <img 
          src={game.imagen} 
          alt={game.titulo}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/280x180/16213e/00d9ff?text=Sin+Imagen';
          }}
        />
      ) : (
        <div className="no-image">Sin imagen</div>
      )}
      
      <h3>{game.titulo}</h3>
      <p><strong>Plataforma:</strong> {game.plataforma}</p>
      <p><strong>Horas jugadas:</strong> {game.horasJugadas}h</p>
      <p className={game.completado ? 'completed' : 'in-progress'}>
        {game.completado ? '✅ Completado' : '⏳ En progreso'}
      </p>

      <div className="card-actions">
        <button 
          className="btn-resenas" 
          onClick={loadResenas}
          disabled={loading}
        >
          {loading ? 'Cargando...' : showResenas ? 'Ocultar reseñas' : 'Ver reseñas'}
        </button>

        <div className="action-buttons">
          <button 
            className="btn-edit"
            onClick={() => onEdit(game)}
            title="Editar juego"
          >
            ✏️
          </button>
          <button 
            className="btn-delete"
            onClick={handleDelete}
            title="Eliminar juego"
          >
            🗑️
          </button>
        </div>
      </div>

      {showResenas && (
        <div className="resenas-section">
          <h4>Reseñas ({resenas.length})</h4>
          {resenas.length === 0 ? (
            <p className="no-resenas">No hay reseñas todavía</p>
          ) : (
            resenas.map(resena => (
              <div key={resena._id} className="resena-item">
                <div className="resena-header">
                  <span className="stars">{renderStars(resena.puntuacion)}</span>
                  <span className="dificultad">{resena.dificultad}</span>
                </div>
                <p className="resena-texto">{resena.textoResena}</p>
                <div className="resena-footer">
                  <span>🕐 {resena.horasJugadas}h</span>
                  <span>{resena.recomendaria ? '👍 Recomendado' : '👎 No recomendado'}</span>
                </div>
                <div className="resena-actions">
                  <button 
                    className="btn-edit-resena"
                    onClick={() => handleEditResena(resena)}
                    title="Editar reseña"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-delete-resena"
                    onClick={() => handleDeleteResena(resena._id)}
                    title="Eliminar reseña"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default GameCard;