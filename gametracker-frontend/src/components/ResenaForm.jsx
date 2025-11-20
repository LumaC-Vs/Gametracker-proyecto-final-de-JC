import { useState, useEffect } from 'react';
import { getAllGames } from '../services/gameService';
import { createResena, updateResena } from '../services/resenaService';

function ResenaForm({ resenaToEdit = null, onSuccess, onCancel }) {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoResena: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (resenaToEdit) {
      setFormData({
        juegoId: resenaToEdit.juegoId._id || resenaToEdit.juegoId,
        puntuacion: resenaToEdit.puntuacion,
        textoResena: resenaToEdit.textoResena || '',
        horasJugadas: resenaToEdit.horasJugadas,
        dificultad: resenaToEdit.dificultad,
        recomendaria: resenaToEdit.recomendaria,
      });
    }
  }, [resenaToEdit]);

  const loadGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.juegoId) {
      setError('Debes seleccionar un juego');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const dataToSend = {
        ...formData,
        puntuacion: parseInt(formData.puntuacion),
        horasJugadas: parseInt(formData.horasJugadas),
      };

      if (resenaToEdit) {
        await updateResena(resenaToEdit._id, dataToSend);
        alert('¡Reseña actualizada exitosamente!');
      } else {
        await createResena(dataToSend);
        alert('¡Reseña creada exitosamente!');
      }

      onSuccess();
      
      // Limpiar formulario si es nueva
      if (!resenaToEdit) {
        setFormData({
          juegoId: '',
          puntuacion: 5,
          textoResena: '',
          horasJugadas: 0,
          dificultad: 'Normal',
          recomendaria: true,
        });
      }
    } catch (err) {
      setError('Error al guardar la reseña: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resena-form-container">
      <div className="form-header">
        <h2>{resenaToEdit ? '✏️ Editar Reseña' : '📝 Agregar Nueva Reseña'}</h2>
        {onCancel && (
          <button className="btn-close" onClick={onCancel}>✕</button>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="resena-form">
        <div className="form-group">
          <label htmlFor="juegoId">Selecciona un juego *</label>
          <select
            id="juegoId"
            name="juegoId"
            value={formData.juegoId}
            onChange={handleChange}
            required
            disabled={resenaToEdit} // No se puede cambiar el juego al editar
          >
            <option value="">-- Elige un juego --</option>
            {games.map(game => (
              <option key={game._id} value={game._id}>
                {game.titulo} ({game.plataforma})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="puntuacion">Puntuación *</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`star-btn ${formData.puntuacion >= star ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, puntuacion: star }))}
              >
                ⭐
              </button>
            ))}
            <span className="rating-text">({formData.puntuacion}/5)</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="textoResena">Tu reseña</label>
          <textarea
            id="textoResena"
            name="textoResena"
            value={formData.textoResena}
            onChange={handleChange}
            placeholder="Escribe tu opinión sobre el juego..."
            rows="5"
          />
        </div>

        <div className="form-row">
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
            <label htmlFor="dificultad">Dificultad</label>
            <select
              id="dificultad"
              name="dificultad"
              value={formData.dificultad}
              onChange={handleChange}
            >
              <option value="Fácil">Fácil</option>
              <option value="Normal">Normal</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="recomendaria"
              checked={formData.recomendaria}
              onChange={handleChange}
            />
            <span>¿Recomendarías este juego?</span>
          </label>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (resenaToEdit ? 'Actualizar Reseña' : 'Publicar Reseña')}
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

export default ResenaForm;