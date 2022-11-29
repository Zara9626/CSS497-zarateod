import React from "react";

import { useState,useEffect } from 'react';

function Dashboard() {
  const [data, setData] = useState([])

    useEffect(()=>{
  fetch('http://localhost:3000/properties')
  .then(d=> {
    setData(d)
  }).catch(e=> {
    console.error(e)
  })
  }, [])




  return (
    <div className="DASHBOARDS">
      <h1>DASHBOARDS</h1>
      
    </div>
  );
}

export default Dashboard;