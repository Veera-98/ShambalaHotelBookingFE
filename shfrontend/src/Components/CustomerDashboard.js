function CustomerDashboard() {
    return (
      <div style={{ backgroundImage: "url('/Images/Searchroom.jpg')", backgroundSize: 'cover', height: '100vh' }}>
      <GuestSidebar />
      <div>
       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <div style={{color: '#FFFFFF', backgroundColor: '#00000090', padding: '20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '40px'}}>
          Welcome to Shambala Hotel Reservation System
        </div>
        <button style={{marginTop: '20px', padding: '10px', fontSize: '20px'}}>
          <a href="/guestbooking" style={{textDecoration: 'none', color: 'black'}}>
            Guest Booking
          </a>
        </button>
      </div>
      </div>
      </div>
    );
  }

  export default CustomerDashboard;