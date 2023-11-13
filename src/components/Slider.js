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
  let myStyle={
    width:'150px',
}
let a = {
    color: '#000',
    backgroundColor: '#f3f2f2'
}
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

<div className="sectiontitle">
<h2 className='text-center mt-4'>Students Statistics</h2>
<span className="headerLine"></span>
</div>
<div id="projectFacts" className="sectionClass">
<div className="fullWidth eight columns">
    <div className="projectFactsWrap ">
        <div className="item wow fadeInUpBig animated animated" data-number="12" >
            <i className="fa fa-briefcase"></i>
            <p id="number1" className="number">12</p>
            <span></span>
            <p>Happy Students</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="55" >
            <i className="fa fa-smile-o"></i>
            <p id="number2" className="number">55</p>
            <span></span>
            <p>Happy</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="359" >
            <i className="fa fa-coffee"></i>
            <p id="number3" className="number">359</p>
            <span></span>
            <p>Cups of coffee</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="246">
            <i className="fa fa-camera"></i>
            <p id="number4" className="number">246</p>
            <span></span>
            <p>Photos taken</p>
        </div>
    </div>
</div>
</div>

  
<div className="album py-5 bg-light" id="trendingcourse">
    <div className="container" >
    <div className=" text-center">
        <h3 className="fw-bold mb-4">Trending Courses</h3>
        <p className="mb-4 pb-2 mb-md-5 pb-md-0">
        Discover the pulse of the job market with our 'Top 3 Trending Courses' collection. These courses are meticulously selected to align with the hottest skills and knowledge areas in demand today. Whether you're a career enthusiast, aspiring professional, or lifelong learner, our trending courses offer the perfect gateway to stay relevant and competitive. Dive into these sought-after subjects, led by industry experts, and set yourself on the path to success in a rapidly changing world.
        </p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        
        <div className="col">
          <div className="card shadow-sm">
          <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/css.jpg' alt=' '/>

            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
          <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/react.jpg' alt=' '/>

            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
              <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/html.png' alt=' '/>
            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>

  <section style={a} id="studentfeedbacks">
  <div className="container py-5">
    <div className="row d-flex justify-content-center">
      <div className="col-md-10 col-xl-8 text-center">
        <h3 className="fw-bold mb-4">Student Feedbacks</h3>
        <p className="mb-4 pb-2 mb-md-5 pb-md-0">
        In the words of our students, discover how our courses have made a positive impact on their lives and careers.Get inspired by their journeys, and join the ranks of learners who have achieved remarkable success through our educational programs.
        </p>
      </div>
    </div>

    <div className="row text-center">
      <div className="col-md-4 mb-4 mb-md-0 ">
        <div className="card bg-white shadow">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
            <img src="https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/f2.png"
                className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Pavithra G</h5>
            <h6 className="font-weight-bold my-3">Bio Chemistry At <br/> Justice Basheer Ahmed Sayeed College For Women </h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star-half-alt fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>Thank you so  much for this amazing course , Literally I learned more."
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4 mb-md-0 ">
        <div className="card shadow">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/f1.png" className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Nithya Shree K.M</h5>
            <h6 className="font-weight-bold my-3">Bsc Computer Science at <br/> Shrimathi Devakunva nanalal Bhatt Vishnava College For Women</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>"The classes were clear and the doubts were clarified.The teacher was kind and his teaching was good."
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-0 mb-md-0 ">
        <div className="card shadow">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
            <img src="https://keerthe2001.github.io/HuntExams-The-Academy-Website/images2/f3.png"
                className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Anagha. R</h5>
            <h6 className="font-weight-bold my-3">Bsc computer Science <br/> Shrimathi Devkunvar Nanalal Bhatt Vaishnav College For Women</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="far fa-star fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>"It's a good and best platform to learn courses, we can clearly understand"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
};

export default Slider;
