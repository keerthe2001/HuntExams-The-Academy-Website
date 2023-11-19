import React from 'react'

export default function Testimonials() {
  let a = {
    color: '#000',
    backgroundColor: '#f3f2f2'
}
  return (
    <>
       
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
  )
}
