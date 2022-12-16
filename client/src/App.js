import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Property from "./pages/Property";
import AddProp from "./pages/AddProp";
import AddMaintenance from "./pages/AddMaintenance";
import Residents from "./pages/Residents";
import Incident from "./pages/Incident";
import Maintenance from "./pages/Maintenance";
import SignIn from "./pages/SignIn";
import UpdateProp from "./pages/UpdateProp";
import Navigation from './Navigation';
import UpdateResident from './pages/UpdateResident';
import AddResident from './pages/AddResident';
import AddIncident from './pages/AddIncident';
import Payment from './pages/Payment';
import AddPayment from './pages/AddPayment';
import EmptyProps from './pages/EmptyProps';
import ReportIncident from './pages/ReportIncident';
import ReportMain from './pages/ReportMain';
import ReportPay from './pages/ReportPay';


function App() {
  return (
    <div className="App">
     
        <Navigation />
        <Routes>
          <Route path="Residents" element={<Residents />} />
          <Route path="AddProp" element={<AddProp />} />
          <Route path="AddMaintenance" element={<AddMaintenance />} />
          <Route path="Incident" element={<Incident />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="/UpdateProp" element={<UpdateProp />} />
          <Route path="/AddResident/:id" element={<AddResident />} />
          <Route path="/UpdateResident" element={<UpdateResident />} />
          <Route path="/Maintenance" element={<Maintenance />} />
          <Route path="/AddIncident" element={<AddIncident />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Addpayment" element={<AddPayment />} />
          <Route path="/Property" element={<Property />} />
          <Route path="/EmptyProps" element={<EmptyProps />} />
          <Route path="/ReportIncident" element={<ReportIncident/>}/>
          <Route path="/ReportMain" element={<ReportMain/>}/>
          <Route path="/ReportPay" element={<ReportPay/>}/>
          <Route path="/" element={<Property />} />

        </Routes>

    </div>
  );
}
export default App;
