import React, { useContext, useEffect, useState } from 'react'
import feedbackContext from '../../context/feedbackContext'
import { Button, Table } from 'react-bootstrap';

export default function ManageFeedbacks() {
    const [loading, setLoading] = useState(false);

    const context = useContext(feedbackContext);
    const { feedback, handleFeedbackget } = context;
    useEffect(() => {
        const run = async () => {
            setLoading(true);
            await handleFeedbackget();
        }
        run();
        setTimeout(() => {

            setLoading(false);
        }, 1000);

    }, [])
    const host = process.env.REACT_APP_API_URL

    const handleDeleteFeedback = async (feedbackId) => {
      
        try {
            // Send a PUT request to update the status to 1 for the specific feedback
            const response = await fetch(`${host}/api/feedback/${feedbackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')

                },
            });
            // Check if the request was successful
            if (response.ok) {
                
                handleFeedbackget();

            } else {
                console.error('Failed to delete feedback');
            }
        } catch (error) {
            console.error('Error Deleting feedback:', error.message);
        } finally {
            // setTimeout(() => {
            //     setLoading(false);
            // }, 500);
        }
    }
    const handleApprove = async (feedbackId, status) => {
        setLoading(true);
        const statusid = status;
        console.log(statusid)
        try {
            // Send a PUT request to update the status to 1 for the specific feedback
            const response = await fetch(`${host}/api/feedback/${feedbackId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed, e.g., authentication headers
                },
                body: JSON.stringify({ statusid })
            });
            console.log(response)

            // Check if the request was successful
            if (response.ok) {
                handleFeedbackget();
                console.log('Feedback approved successfully');
            } else {
                console.error('Failed to approve feedback');
            }
        } catch (error) {
            console.error('Error approving feedback:', error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }
    // console.log(localStorage.getItem('token') && feedback && feedback[0] && feedback[0].feedbackList && feedback[0].feedbackList[0].name);
    return (
        <>

            <h2 className='text-center my-4 fw-bold'  >Student Feedbacks</h2>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="overlay"></div>

                    <div className=' mx-auto text-center bg-light rounded shadow' style={{ position: 'absolute', zIndex: 2, top: '30%', left: '42%', width: "200px" }}>

                        <img className='absolute' style={{ zIndex: 2 }} src="https://huntexams.000webhostapp.com/live-previews/images/logoloading2.gif" alt="Loading" />

                        <div style={{ zIndex: 2 }} className='text-center fw-bold pb-2'>Hunting..</div>
                    </div>
                </div>
            ) : ('')}
            <div className='mx-3 shadow overflow-scroll rounded' style={{ maxHeight: '300px' }} >
                <table className="table" >
                    <thead className='text-center bg-success text-light sticky-top' style={{ zIndex: 0 }}>
                        <tr >
                            <th scope="col" className='bg-success text-light'>Select</th>
                            <th scope="col" className='bg-success text-light'>Name</th>
                            <th scope="col" className='bg-success text-light'>Feedback</th>
                            <th scope="col" className='bg-success text-light'>Status</th>
                            <th scope="col" colSpan={3} className='bg-success text-light'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {localStorage.getItem('token') &&
                            feedback &&
                            feedback[0] && feedback[0].feedbackList &&
                            feedback[0].feedbackList ? (
                            feedback[0].feedbackList.map((feedbackItem, index) => (
                                <tr key={index} >
                                    <th scope="row">
                                        <input type='checkbox'></input>
                                    </th>
                                    <td>{feedbackItem.name}</td>
                                    <td>{feedbackItem.feedback_description}</td>
                                    <td>{feedbackItem.status === '0' ?
                                        <div className='text-warning fw-bold'>Pending!</div> : <div className='text-success fw-bold'>Approved</div>}</td>
                                    <td>{feedbackItem.status === '0' ?
                                        <Button variant="btn btn-sm btn-success" onClick={() => { handleApprove(feedbackItem._id, feedbackItem.status) }}>
                                            Approve
                                        </Button> :
                                        <Button variant="btn btn-sm btn-danger" onClick={() => { handleApprove(feedbackItem._id, feedbackItem.status) }}>
                                            Reject
                                        </Button>
                                    }
                                    </td>

                                    <td>
                                        {/* <Button variant="btn btn-sm btn-warning" onClick={() => { handleEdit(feedbackItem._id) }}>
                                            Edit
                                        </Button> */}
                                    </td>

                                    <td>
                                        <Button variant="btn btn-sm btn-danger" onClick={() => { handleDeleteFeedback(feedbackItem._id) }}>
                                            Delete
                                        </Button></td>
                                </tr>
                            ))) :
                            <div className='text-center'>No Data to Display</div>

                        }

                    </tbody>
                </table>

            </div>
        </>
    );
}
