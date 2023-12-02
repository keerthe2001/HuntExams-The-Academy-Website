import { useState, useEffect } from "react";
import StudentContext from "./StudentContext";
import { useNavigate } from "react-router-dom";

const StudentState = (props) => {

    const studentslist = [];
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
            console.error('Error fetching notes:', error.message);
        }
    }



    return (
        <StudentContext.Provider value={{ students, handleStudentget }}>
            {props.children}
        </StudentContext.Provider>
    );
}

export default StudentState;

