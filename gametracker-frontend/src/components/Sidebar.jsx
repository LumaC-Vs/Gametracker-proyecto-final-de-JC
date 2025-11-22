function Sidebar({ currentView, onViewChange }) {
  const menuItems = [
    { id: 'biblioteca', label: '📚 Biblioteca', icon: '🎮' },
    { id: 'favoritos', label: '⭐ Favoritos', icon: '❤️' },
    { id: 'agregar-juego', label: '➕ Agregar Juego', icon: '🎯' },
    { id: 'agregar-resena', label: '📝 Agregar Reseña', icon: '✍️' },
    { id: 'estadisticas', label: '📊 Estadísticas', icon: '📈' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🎮 Game Vault 🔒</h2>
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
        <p>© 2025 Game Vault </p>
      </div>
    </aside>
  );
}

export default Sidebar;