import React, { useContext, useEffect,useState } from 'react'
import feedbackContext from '../../context/feedbackContext'
import { Button, Table } from 'react-bootstrap';

export default function ManageFeedbacks() {
    const [loading, setLoading] = useState(true);

    const context = useContext(feedbackContext);
    const { feedback, handleFeedbackget } = context;
    useEffect(() => {
        const run = async () => {
            await handleFeedbackget();
        }
        run();
    }, [])
    const host = "http://localhost:5000"
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
            setLoading(false);
        }
    }
    console.log(localStorage.getItem('token') && feedback && feedback[0] && feedback[0].feedbackList && feedback[0].feedbackList[0].name);
    return (
        <>

            <h2 className='text-center my-4 fw-bold'  >Student Feedbacks</h2>
            {loading ? (
                <img src="/images/logoloading.gif" alt="Loading" />
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
                            feedback[0] &&
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
                                        <Button variant="btn btn-sm btn-warning" >
                                            Edit
                                        </Button>
                                    </td>

                                    <td>
                                        <Button variant="btn btn-sm btn-danger" >
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
