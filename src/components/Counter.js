import React from 'react'

export default function Counter() {
  return (
    <>
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

    </>
  )
}
