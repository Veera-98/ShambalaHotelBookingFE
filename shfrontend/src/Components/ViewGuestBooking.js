import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './views.css';
import Modalbox from './ModalBox';
import GuestSidebar from './GuestSidebar';


export function ViewGuestbookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const[booking_id,setBooking_id]=useState(0);
  const[feedbackBookingIds,setFeedbackBookingIds]=useState([]);
  const[feedbackResponse,setFeedbackResponse]=useState([]);
  const [formData, setFormData] = useState({
    type:'r',
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();
  const [bookingIds, setBookingIds] = useState([]);

  useEffect(() => {
    fetchFeedbackList();
    fetchAllBookings();
  }, []);

  const handleFeedback = (booking) => {
    setFeedbackBooking(booking);
    navigate('/GuestFeedbackForm', { state: { booking } });
  };

  const handleViewFeedBack = (booking) => {
    const fb = feedbackResponse?.filter((item) => item?.booking?.booking_id === booking?.booking_id)?.[0];
    console.log({booking, feedbackResponse, fb})
    setFeedbackBooking(booking);
    navigate('/GuestFeedbackForm', { state: { feedback: fb } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancel = async (booking) => {
    try {
      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/delete/${booking.booking_id}`;
      await axios.put(apiUrl, { isdeleted: true });
      fetchAllBookings();
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const handlebill = (booking) => {

    navigate('/GuestBill', { state: { booking } });
  };


  const fetchMyBookings = async () => {
    // This function is retained but not used
    try {
      const userId = sessionStorage.getItem("userid");
      if (!userId) return;

      const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
      const response = await axios.get(apiUrl);
      setBookings(response.data);
      setBookingIds(response.data.map(booking => booking.booking_id));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchFeedbackList = async () => {
    try{
    const apiUrl = `http://localhost:8181/api/hotel-staff/feedbacklist/all`;
    const feedbackResponse = await axios.get(apiUrl);
    setFeedbackResponse(feedbackResponse.data)
    const feedbackBookingIds = feedbackResponse.data.map(feedback => feedback.booking.booking_id);
    setFeedbackBookingIds(prevBookingIds => [...prevBookingIds, ...feedbackBookingIds]);
    console.log("fjfj",feedbackBookingIds)

   } catch (error) {
    console.error('Error fetching bookings:', error);
  }

  };

  const fetchAllBookings = async () => {
    try {
        const userId = sessionStorage.getItem("userid");
        if (!userId) return;
  
        const apiUrl = `http://localhost:8181/api/hotel-staff/bookingDetails/user/${userId}`;
        const response = await axios.get(apiUrl);
        setBookings(response.data);
        setBookingIds(response.data.map(booking => booking.booking_id));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
  };

  

  const handleUpdate = (booking) => {
    setBooking_id(booking.booking_id);
    setShowModal(true);
  };

  const handleModalSubmit = (booking_id, formData) => {
    formData.booking_id = booking_id;
    setFormData(formData);
    console.log("Form data:", formData);

    axios.post(`http://localhost:8181/api/hotel-staff/bookingDetails`, formData)
      .then(response => {
        console.log("Submitted successfully:", response.data);
        handleCloseModal();
        alert('succesfully updated')
        fetchAllBookings();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div>
    <GuestSidebar />
    <div>
      <h1 style={{ width: '100%', textAlign: 'center', fontSize: '50px', marginBottom: '25px' }}>Booking History</h1>
    </div>

    {showModal && <Modalbox onClose={handleCloseModal} onSubmit={formData => handleModalSubmit(booking_id, formData)} />}

    <div style={{ width: '100vw', height: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="view-bookings-page-container" style={{ width: '65%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'auto', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)', marginTop: '0px' }}>
        <div className="rooms-table-container" style={{ margin: '0 auto', maxWidth: '100%', overflowX: 'auto' }}>
          <table style={{ border: '1px solid #ddd', textAlign: 'left', width: '100%', tableLayout: 'auto', borderRadius: '5px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '10px' }}>Room Number</th>
                <th style={{ padding: '10px' }}>Type</th>
                <th style={{ padding: '10px' }}>Start Date</th>
                <th style={{ padding: '10px' }}>End Date</th>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.booking_id} >
                  <td style={{ padding: '10px' }}>{booking.room.roomNo}</td>
                  <td style={{ padding: '10px' }}>{booking.room.type}</td>
                  <td style={{ padding: '10px' }}>{booking.startDate}</td>
                  <td style={{ padding: '10px' }}>{booking.endDate}</td>
                  <td style={{ padding: '10px' }}>{booking.user.role_id === 1 ? booking.members[0].firstName : booking.user.firstName}</td>
                  <td style={{ padding: '10px' }}>
                    {!booking.isdeleted ? (
                      <>
                      <button onClick={() => handleCancel(booking)}>Cancel</button>
                      
              <span style={{ margin: '0 10px' }}></span>
              <span style={{ margin: '0 10px' }}></span>
                      <button onClick={() => handlebill(booking)}>Reciept</button>
                      
                      </>
                     ) : (
                      feedbackBookingIds.includes(booking.booking_id)?
                        <button onClick={() => handleViewFeedBack(booking)}>ViewFeedBack</button>:
                        <button onClick={() => handleFeedback(booking)}>Feedback</button>
                      
                    )}
    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}
   

export default ViewGuestbookings;