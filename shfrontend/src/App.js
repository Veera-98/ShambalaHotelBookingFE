import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Components/main';
import { AddRoomPage } from './Components/AddRoomPage';
import DeleteRoomPage from './Components/DeleteRoomPage';
import ErrorBoundary from './Components/ErrorBoundary';
import ViewRoomsPage from './Components/ViewRoomsPage';
import UpdateRoomPage from './Components/UpdateRoomPage';
import Login from './Components/Login';
import StaffDashboard from './Components/StaffDashboard';
import CustomerDashboard from './Components/CustomerDashboard';
import CreateAccount from './Components/CreateAccount';
import GuestBooking from './Components/GuestBooking';
import OnlineBooking from './Components/OnlineBooking';
import AddStaff from './Components/AddStaff';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<Main />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/GuestSidebar' element={<GuestSidebar/>}/>
      


      <Route path='/CreateAccount' element={<CreateAccount/>}/>

      <Route path='/StaffDashboard' element={<StaffDashboard/>}/>

      <Route path='/AddRoomPage' element={<AddRoomPage/>}/>
      <Route path='/DeleteRoomPage' element={<DeleteRoomPage/>}/>
      <Route path='/errorBoundary' element={<ErrorBoundary/>}/>
      <Route path='/ViewRoomsPage' element={<ViewRoomsPage/>}/>
      <Route path='/UpdateRoomPage' element={<UpdateRoomPage/>}/>
      <Route path='/staffbooking' element={<Staffbooking/>}/>
      <Route path='/WalkInReservationPage' element={<WalkInReservationPage/>}/>
      <Route path='/addStaff' element={<AddStaff/>}/>
      <Route path='/Billsandinvoice' element={<Billsandinvoice/>}/>
      <Route path='/GenerateBillPage' element={<GenerateBillPage/>}/>
      <Route path='/GenerateInvoicePage' element={<GenerateInvoicePage/>}/>
      <Route path='/Report' element={<Report/>}/>
      <Route path='/ModalBox' element={<Modalbox/>}/>

      
      <Route path='/CustomerDashboard' element={<CustomerDashboard/>}/>
    

      <Route path='/GuestBooking' element={<GuestBooking/>}/>
      <Route path='/OnlineBooking' element={<OnlineBooking/>}/>
      <Route path='/addStaff' element={<AddStaff/>}/>
      
    </Routes>
  );
}

export default App;