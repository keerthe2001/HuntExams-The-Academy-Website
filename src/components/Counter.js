import React, { useContext, useEffect } from 'react'
import StudentContext from '../context/StudentContext';

export default function Counter() {
    const context = useContext(StudentContext);
  const { settings, fetchSettings } = context;

  useEffect(() => {
    fetchSettings(); // Fetch settings when the component mounts
  }, []);
  return (
    <>
        <div className="sectiontitle">
<h2 className='text-center mt-4 fw-bold'>Students Statistics</h2>
<span className="headerLine"></span>
</div>
{ settings.map((setting) => (
            
          
<div id="projectFacts" className="sectionClass" key={setting._id}>
<div className="fullWidth eight columns">
    <div className="projectFactsWrap ">
        <div className="item wow fadeInUpBig animated animated" data-number="12" >
            <i className="fa fa-briefcase"></i>

            <p id="number1" className="number">{setting.Studenttotal}</p>
            <span></span>
            <p>Happy Students</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="55" >
            <i className="fa fa-smile-o"></i>
            <p id="number2" className="number">{setting.NoOfCourses}</p>
            <span></span>
            <p>Courses</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="359" >
            <i className="fa fa-coffee"></i>
            <p id="number3" className="number">{setting.TotalStaffs}</p>
            <span></span>
            <p>Staffs</p>
        </div>
        <div className="item wow fadeInUpBig animated animated" data-number="246">
            <i className="fa fa-camera"></i>
            <p id="number4" className="number">{setting.NoOfBatches}</p>
            <span></span>
            <p>Blossm Batches</p>
        </div>
    </div>
</div>
</div>
    ))}

    </>
  )
}
