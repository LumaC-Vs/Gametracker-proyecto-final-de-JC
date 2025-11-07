import { useState } from 'react';

function Sidebar({ currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const menuItems = [
    { id: 'biblioteca', label: '📚 Biblioteca', icon: '🎮' },
    { id: 'favoritos', label: '⭐ Favoritos', icon: '❤️' },
    { id: 'agregar-juego', label: '➕ Agregar Juego', icon: '🎯' },
    { id: 'agregar-resena', label: '📝 Agregar Reseña', icon: '✍️' },
    { id: 'estadisticas', label: '📊 Estadísticas', icon: '📈' },
  ];

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    // Agregar/quitar clase al App
    const appElement = document.querySelector('.App');
    if (newState) {
      appElement.classList.remove('sidebar-closed');
    } else {
      appElement.classList.add('sidebar-closed');
    }
  };

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={handleToggle}
      >
        {isOpen ? '◀' : '▶'}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>🎮 Game Tracker</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>© 2025 Game Tracker</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;