import React, { useState, useEffect } from 'react';
import '../Slider.css'; // Import your CSS for styling

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = window.innerWidth <= 768; // Define a breakpoint for mobile view

  const desktopSlides = [
    {
      id: 1,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/1.png',
      alt: 'Slide 1',
    },
    {
      id: 2,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/2.png',
      alt: 'Slide 2',
    },
    {
      id: 3,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/3.png',
      alt: 'Slide 3',
    },
  ];

  const mobileSlides = [
    {
      id: 1,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/1.png',
      alt: 'Mobile Slide 1',
    },
    {
      id: 2,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/2.png',
      alt: 'Mobile Slide 2',
    },
    {
      id: 3,
      src: 'https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/3.png',
      alt: 'Mobile Slide 3',
    },
  ];

  const slides = isMobile ? mobileSlides : desktopSlides;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval);
  }, []);


  return (
    <>
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.src} alt={slide.alt} className="img-slider"/>
        </div>
      ))}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>



  

  
</>
  );
};

export default Slider;
