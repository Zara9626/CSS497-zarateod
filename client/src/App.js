import React from "react";
import {Route, Routes } from 'react-router-dom';
import Property from "./pages/Property";
import AddProp from "./pages/AddProp";
import AddMaintenance from "./pages/AddMaintenance";
import Residents from "./pages/Residents";
import Incident from "./pages/Incident";
import Maintenance from "./pages/Maintenance";
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
import UpdateMain from './pages/UpdateMain';
import UpdateIncident from './pages/UpdateIncident';
import ReportResident from'./pages/ReportResident';
import AddLease from './pages/AddLease';
import Lease from './pages/Lease';
import ReportProp from './pages/ReportProp';



function App() {
  return (
    <div className="App">

      <Navigation />
      <Routes>
        <Route path="Residents" element={<Residents />} />
        <Route path="AddProp" element={<AddProp />} />
        <Route path="/AddMaintenance/:propertyId/:incidentId" element={<AddMaintenance />} />
        <Route path="/Incident" element={<Incident />} />
        <Route path= "/Lease" element={<Lease/>} />
       
        <Route path="/UpdateProp/:propertyId" element={<UpdateProp />} />
        <Route path="/AddResident/:leaseId" element={<AddResident />} />
        <Route path="/UpdateResident/:residentId" element={<UpdateResident />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/AddIncident/:propertyId" element={<AddIncident />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/AddPayment/:propertyId" element={<AddPayment />} />
        <Route path="/Property" element={<Property />} />
        <Route path="/EmptyProps" element={<EmptyProps />} />
        <Route path="/ReportIncident/:propertyId/:incidentId" element={<ReportIncident />} />
        <Route path="/ReportMain/:propertyId" element={<ReportMain />} />
        <Route path="/ReportPay/:propertyId" element={<ReportPay />} />
        <Route path="/UpdateMain/:eventId" element={<UpdateMain />} />
        <Route path="/UpdateIncident/:propertyId" element={<UpdateIncident />} />
        <Route path="/ReportResident/:propertyId/" element={<ReportResident/>} />
        <Route path="/ReportProp/:propertyId" element={<ReportProp/>}/>
        <Route path= "/AddLease/:propertyId" element={<AddLease/>} />
        <Route path="/" element={<Property />} />

      </Routes>

    </div>
  );
}
export default App;
