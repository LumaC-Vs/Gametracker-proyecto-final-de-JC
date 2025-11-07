import { useState } from 'react';
import { createGame, updateGame } from '../services/gameService';

function GameForm({ gameToEdit = null, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: gameToEdit?.titulo || '',
    plataforma: gameToEdit?.plataforma || '',
    horasJugadas: gameToEdit?.horasJugadas || 0,
    completado: gameToEdit?.completado || false,
    imagen: gameToEdit?.imagen || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.plataforma.trim()) {
      setError('El título y la plataforma son obligatorios');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (gameToEdit) {
        await updateGame(gameToEdit._id, formData);
      } else {
        await createGame(formData);
      }

      onSuccess();
      
      // Limpiar formulario si es nuevo juego
      if (!gameToEdit) {
        setFormData({
          titulo: '',
          plataforma: '',
          horasJugadas: 0,
          completado: false,
          imagen: '',
        });
      }
    } catch (err) {
      setError('Error al guardar el juego: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-form-container">
      <div className="form-header">
        <h2>{gameToEdit ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h2>
        {onCancel && (
          <button className="btn-close" onClick={onCancel}>✕</button>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-group">
          <label htmlFor="titulo">Título del juego *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: The Legend of Zelda"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plataforma">Plataforma *</label>
          <select
            id="plataforma"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una plataforma</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="Xbox Series X/S">Xbox Series X/S</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile">Mobile</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="horasJugadas">Horas jugadas</label>
          <input
            type="number"
            id="horasJugadas"
            name="horasJugadas"
            value={formData.horasJugadas}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la imagen</label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="completado"
              checked={formData.completado}
              onChange={handleChange}
            />
            <span>¿Juego completado?</span>
          </label>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (gameToEdit ? 'Actualizar' : 'Agregar Juego')}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GameForm;