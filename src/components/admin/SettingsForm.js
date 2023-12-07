import React, { useState } from 'react';

const SettingsForm = () => {
    const [formData, setFormData] = useState({
        Studenttotal: '',
        NoOfCourses: '',
        NoOfBatches: '',
        TotalStaffs: '',
    });
        const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const host = process.env.REACT_APP_API_URL
    console.log(host);

    const handleAddSettings = async () => {
        try {
            const response = await fetch(`${host}/api/settings/addSettings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')

                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Optionally, you can redirect or show a success message
            console.log('Settings added successfully!');
        } catch (error) {
            console.error('Error adding settings:', error.message);
        }
    };

    return (
        <div>
            <h2>Add Settings</h2>
            <form>
                <label>Student Total:</label>
                <input type="number" name="Studenttotal" value={formData.Studenttotal} onChange={handleInputChange} />

                <label>No. of Courses:</label>
                <input type="number" name="NoOfCourses" value={formData.NoOfCourses} onChange={handleInputChange} />
                <label>No. of Batches:</label>
                <input type="number" name="NoOfBatches" value={formData.NoOfBatches} onChange={handleInputChange} />

                <label>Total Staffs:</label>
                <input type="number" name="TotalStaffs" value={formData.TotalStaffs} onChange={handleInputChange} />

                <button type="button" onClick={handleAddSettings}>
                    Add Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsForm;
