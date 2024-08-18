import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { useLocation,navigate, useNavigate } from 'react-router-dom';
import GuestSidebar from './GuestSidebar';


function GuestFeedbackForm() {
  const location = useLocation();
  const navigate=useNavigate();
  const feedbackData = location.state?.feedback || null;
  console.log({feedbackData})
  const bookingData = feedbackData?.booking || location.state?.booking || null;
  const [rating, setRating] = useState(feedbackData?.rating || 0);
  const [comments, setComments] = useState('N/A');
 const guest_name=bookingData?.user.role_id === 1 ? bookingData.members[0].firstName : bookingData.user.firstName;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send feedback data to server
    try {
      const response = await axios.post('http://localhost:8181/api/hotel-staff/save/feedback', {
        feedback_id:0,
        guest_name:guest_name,
        booking:bookingData,
        rating,
        feedback_text:comments
      });
      alert('Feedback submitted!');
      navigate('/ViewGuestbooking');
    } catch (error) {
        alert('Feedback already submitted.');
        navigate('/ViewGuestbooking');
      console.error('Error submitting feedback:', error);
    }
  };

  const handleStarClick = (value) => {
    if(feedbackData) {
      return;
    }
    setRating(value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  return (
    
    <div>
    <GuestSidebar />
    <div>
      {
feedbackData ? <h1 style={{ width: '100%', textAlign: 'center', fontSize: '50px', marginBottom: '25px' }}>Feedback</h1> :
  <h1 style={{ width: '100%', textAlign: 'center', fontSize: '50px', marginBottom: '25px' }}>Feedback</h1>
    }
  <div className="container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={guest_name}
        readOnly
      /><br></br>
      {/* Textbox for comments, prefilled with "N/A" */}

      <div>
      <label>Rating:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} onClick={() => handleStarClick(star)}>
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <br></br>
      <label htmlFor="comments">Comments:</label>
      <textarea
        id="comments"
        name="comments"
        value={feedbackData?.feedback_text || comments}
        onChange={handleCommentsChange}
      ></textarea>
      {!feedbackData && <button type="submit">Submit</button>}
    </form>
  </div>
  </div>
  </div>
);
}

export default GuestFeedbackForm;