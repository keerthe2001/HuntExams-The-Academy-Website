import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Frontend from './images/Frontend.jpg';
import Backend from './images/backend.jpg';
import Fullstack from './images/Fullstack.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Features() {
  const Navigate = useNavigate();
  let GForm = "https://forms.gle/VBRCBnHx7EwQSaiG7";
  const [CourseAvail, setCourseAvail] = useState({ Course:[{
    categories: "Coding",
    coursename: "Backend Development",
    coursediscription: "Master PHP and MySQL for dynamic web development. Learn to create interactive websites and manage data efficiently.",
    coursename: "Backend Development",
    registrationlink: GForm,
    date: "2023-12-07T14:52:58.489Z",
    image: Backend
  },
  {
    categories: "Coding",
    coursename: "Frontend Development",
    coursediscription: "Craft responsive, dynamic websites from scratch with our HTML, CSS along with bootstrap, and JavaScript course.",
    coursename: "Frontend Development",
    registrationlink: GForm,
    date: "2023-12-07T14:52:58.489Z",
    image: Frontend
  },
  {
    categories: "Coding",
    coursename: "Full Stack Development",
    coursediscription: "Master the front-end design using HTML, CSS, JS, and Bootstrap to back-end functionality with PHP and MySQL.",
    coursename: "Full Stack Development",
    registrationlink: GForm,
    date: "2023-12-07T14:52:58.489Z",
    image: Fullstack
  }
  ]});
  const fetchCourse = async () => {
    try {
      const response = await fetch(`${host}/api/course/getcourse`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // setCourseAvail(data);
    } catch (error) {
      console.error('Error fetching Course:', error);
    }
  };

  const [slider, setSlider] = useState(null);

  const host = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCourse();
  }, []);

  console.log(CourseAvail && CourseAvail.Course && CourseAvail.Course)
 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
      <section>
        {console.log("render")}
        <div className="album py-5 bg-light">
          <div className="container" id="trendingcourse" >
            <div className=" text-center">
              <h3 className="fw-bold mb-4">Trending Course</h3>
              <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                Discover the pulse of the job market with our 'Top 3 Trending Course' collection. These Course are meticulously selected to align with the hottest skills and knowledge areas in demand today. Whether you're a career enthusiast, aspiring professional, or lifelong learner, our trending Course offer the perfect gateway to stay relevant and competitive. Dive into these sought-after subjects, led by industry experts, and set yourself on the path to success in a rapidly changing world.
              </p>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-light mx-2 shadow-lg" onClick={handlePrevClick}>
                Previous
              </button>
              <button className="btn btn-light mx1-2 shadow-lg" onClick={handleNextClick}>
                Next
              </button>
            </div>

            <div className='d-flex flex-row w-100 shadow-lg rounded' style={{ overflow: "hidden" }}>
              <Slider className='m-2 ' {...settings} ref={(slider) => setSlider(slider)}>

                {CourseAvail && CourseAvail.Course &&
                 CourseAvail.Course.map((settingcourse, index) => (
                    <div className='m-4'>
                      <div className="card shadow-sm m-2" style={{ width: "300px" }} key={index}>

                        <img src={settingcourse.image} alt=' ' />

                        <div className="card-body">
                          <h5 className="card-text fw-bold text-center">{settingcourse.coursename}</h5>
                          <p className="card-text">{settingcourse.coursediscription}</p>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className="text-center" >
                              <Link to={settingcourse.registrationlink} target='_blank'> <button type="button"  className="btn btn-sm btn-outline-secondary text-light btn-primary py-2 px-4">Register Now</button></Link>
                            </div>
                            {/* <small className="text-muted">9 mins</small> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
