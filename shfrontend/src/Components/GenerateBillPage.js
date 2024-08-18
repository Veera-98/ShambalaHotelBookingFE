import React, { useState } from 'react';

function GenerateBillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state.booking || null;
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('N/A');

  const download = async () => {
    const element = document.querySelector(".container");
    html2pdf().from(element).set({
      margin: 10,
      filename: 'bookingDetails.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, scrollY: 0, scrollX: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  }

  if (!bookingData) {
    return <div>No booking data available.</div>;
  }

  // Calculate the number of days difference between startDate and endDate
  const startDate = new Date(bookingData.startDate);
  const endDate = new Date(bookingData.endDate);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Calculate the bill amount (days * price)
  const billAmount = daysDifference * bookingData.room.price;

  return (
    <div>
      <h2>Generate Bill</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Booking ID"
          value={bookingId}
          onChange={e => setBookingId(e.target.value)}
        />
        <button type="submit">Generate Bill</button>
      </form>
      {billDetails && <div className="success">{billDetails}</div>}
    </div>
  );
}

export default GenerateBillPage;
