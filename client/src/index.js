import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import ReactDOM from "react-dom";
import Layout from  "./Layout";
import Dashboard from "./pages/Dashboard";
import AddNew from "./pages/AddNew";
import Contractors from "./pages/Contractors";
import Residents from "./pages/Residents";
import Incidents from "./pages/Incidents";
import Police from "./pages/Police";
import SignIn from "./pages/SignIn";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>} />

          <Route path= "Residents" element={<Residents />}/>
          <Route path= "AddNew" element={<AddNew />}/>
          <Route path= "Contractors" element={<Contractors/>}/>
          <Route path= "Incidents" element={<Incidents />}/>
          <Route path= "Police" element={<Police/>}/>
          <Route path= "SignIn" element={<SignIn />}/>

          </Route>
      </Routes>
    </BrowserRouter>

  );
}

ReactDOM.render(<App />, document.getElementById("root"));




