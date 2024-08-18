import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import './GenerateBillPage.css'; // Import the CSS file for styling
import Sidebar from './sidebar';
import GuestSidebar from './GuestSidebar';

function GuestBill() {
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
        <GuestSidebar />
    
    <div style={{ textAlign: 'center' }}>
    
      <div>
        <h1 style={{ width: '100%', fontSize: '50px' }}>Bill</h1>
      </div>
      <div style={{ textAlign: 'center' }}> {/* Aligning items at the center */}
      
        <div className='container'>
          <div className="box" style={{ width: 'fit-content', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '25px' }}>
            <div className="headingColumn">
              <p>Room Number:</p>
              <p>Guest Name:</p>
              <p>Start Date:</p>
              <p>End Date:</p>
              <p>Number of Days:</p>
              <p>Bill Amount:</p>
            </div>
            <div className="valueColumn">
              <p>{bookingData.room.roomNo}</p>
              <p>{bookingData.user.role_id === 1 ? bookingData.members[0].firstName : bookingData.user.firstName}</p>
              <p>{bookingData.startDate}</p>
              <p>{bookingData.endDate}</p>
              <p>{daysDifference}</p>
              <p>{billAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="downloadButton" onClick={download}>Download</button>
    </div>
    </div>
  );
}

export default GuestBill;