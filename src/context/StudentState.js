import { useState, useEffect } from "react";
import StudentContext from "./StudentContext";
import { useNavigate } from "react-router-dom";

const StudentState = (props) => {

    const studentslist = [];
    const [settings, setSettings] = useState([]);

    const [students, setstudents] = useState(studentslist);
    const host = "http://localhost:5000";

    useEffect(() => {
        handleStudentget();
    }, [])

    const handleStudentget = async () => {
        try {
            const response = await fetch(`${host}/api/student/getStudents`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            setstudents([json])
            console.log(students)
        }
        catch (error) {
            setstudents(studentslist)
            // console.error('Error fetching notes:', error.message);
            alert("server error")

        }
    }

    //This is For Setting Retireval
    const fetchSettings = async () => {
        try {
          const response = await fetch(`${host}/api/settings/countersetting`,{
            method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
          });
          const data = await response.json();
          console.log([data])
          setSettings([data]);
        } catch (error) {
        //   console.error('Error fetching settings:', error);
        alert("server error")

        }
      };

      useEffect(() => {
        fetchSettings();
      }, []); 


    return (
        <StudentContext.Provider value={{ students, handleStudentget, fetchSettings, settings}}>
            {props.children}
        </StudentContext.Provider>
    );
}

export default StudentState;

