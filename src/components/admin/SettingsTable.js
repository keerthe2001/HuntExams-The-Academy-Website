import React, { useContext, useEffect } from 'react';
import StudentContext from '../../context/StudentContext';

const SettingsTable = () => {
    const context = useContext(StudentContext);
  const { settings, fetchSettings } = context;

  useEffect(() => {
    fetchSettings(); // Fetch settings when the component mounts
  }, []);
  console.log(settings && settings)

  return (
    <div>
      <h2>Settings Details</h2>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>No</th>
            <th>Student Total</th>
            <th>No Of Courses</th>
            <th>Total Staffs</th>
            <th>Date</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {settings && settings.map((setting) => (
            <tr key={setting._id}>
              <td>{setting.No}</td>
              <td>{setting.Studenttotal}</td>
              <td>{setting.NoOfCourses}</td>
              <td>{setting.TotalStaffs}</td>
              <td>{new Date(setting.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTable;
