import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TestimonialCss.css';

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState([
    {
      feedback_description: "hello is this good course",
      image: "student.gif",
      name: "keertheshwaran",
      status: "0"
    },
    {
      feedback_description: "hello is this good course",
      image: "student.gif",
      name: "keertheshwaran",
      status: "0"
    },
    {
      feedback_description: "hello is this good course",
      image: "student.gif",
      name: "keertheshwaran",
      status: "0"
    }
  ]);
  const [slider, setSlider] = useState(null);
  const host = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${host}/api/feedback/getfeedback`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data)
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    slider.slickPrev();
  };

  const handleNextClick = () => {
    slider.slickNext();
  };



  return (
    <>
      <section id="studentfeedbacks" >
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-xl-8 text-center">
              <h3 className="fw-bold mb-4">Student Feedbacks</h3>
              <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                In the words of our students, discover how our courses have made a positive impact on their lives and careers. Get inspired by their journeys, and join the ranks of learners who have achieved remarkable success through our educational programs.
              </p>
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-light me-2 shadow-lg" onClick={handlePrevClick}>
              Previous
            </button>
            <button className="btn btn-light me-2 shadow-lg" onClick={handleNextClick}>
              Next
            </button>
          </div>

          <Slider className='m-2 rounded shadow-lg' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 10px 0px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px 0px inset' }} {...settings} ref={(slider) => setSlider(slider)}>
            {feedbacks &&
              feedbacks.feedbackList &&
              feedbacks.feedbackList.map((feedback, index) => (
                <div className='m-2' >
                  <div key={index} className="card bg-white shadow m-4" style={{ width: '300px' }}>
                    <div className="card-body py-4 mt-2">
                      <div className="d-flex justify-content-center mb-4">
                        <img
                          src={`https://huntexams.000webhostapp.com/live-previews/images/${feedback.image}`}
                          className="rounded-circle shadow-1-strong"
                          width="100"
                          height="100"
                          alt={`Student ${index + 1}`}
                        />
                      </div>
                      <h5 className="font-weight-bold text-center">{feedback.name}</h5>
                      <h6 className="font-weight-bold my-3 text-center">{feedback.course} at <br /> {feedback.college}</h6>
                      <ul className="text-center list-unstyled d-flex justify-content-center">
                        {Array.from({ length: feedback.rating }, (_, i) => (
                          <li key={i}>
                            <i className="fas fa-star fa-sm text-info"></i>
                          </li>
                        ))}
                      </ul>
                      <p className="text-center mb-2">
                        <i className="fas fa-quote-left pe-2"></i>"{feedback.feedback_description}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
