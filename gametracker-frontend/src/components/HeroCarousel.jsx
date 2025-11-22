import { useState, useEffect } from 'react';

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://i.pinimg.com/1200x/71/50/e8/7150e83d3a245868a35a491e8edbeb32.jpg',
      title: 'Bienvenido a Game Vault',
      description: 'Organiza, reseña y descubre tus videojuegos favoritos en un solo lugar',
      buttonText: 'Explorar Biblioteca',
      buttonAction: 'biblioteca'
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/1200x/85/2a/fc/852afce363fad5ac094c8558b3f8aca2.jpg',
      title: 'Guarda tus Favoritos',
      description: 'Marca tus juegos preferidos y accede rápidamente a ellos en cualquier momento',
      buttonText: 'Ver Favoritos',
      buttonAction: 'favoritos'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/736x/77/7b/0a/777b0ada60945be6cfda856597aeeac2.jpg',
      title: 'Comparte tus Reseñas',
      description: 'Escribe reseñas detalladas de tus juegos y comparte tu experiencia',
      buttonText: 'Crear Reseña',
      buttonAction: 'agregar-resena'
    },
    {
      id: 4,
      image: 'https://i.pinimg.com/1200x/e6/bb/93/e6bb933f4123b702aca7ac05ec008858.jpg',
      title: 'Estadísticas Detalladas',
      description: 'Visualiza tus horas jugadas, juegos completados y mucho más',
      buttonText: 'Ver Estadísticas',
      buttonAction: 'estadisticas'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(26, 26, 46, 0.7), rgba(22, 33, 62, 0.9)), url(${slide.image})`
            }}
          >
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-description">{slide.description}</p>
              <button className="carousel-button">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button className="carousel-nav prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="carousel-nav next" onClick={nextSlide}>
        ❯
      </button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;