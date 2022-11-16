import React, { useState } from "react";


import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
 
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";


import { SidebarItems } from "..";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
    <SidebarContainer displaySidebar={displaySidebar}>
      <SidebarWrapper>
        <SidebarLogoWrapper displaySidebar={displaySidebar}>
          
            
            <span className="app-brand-logo demo">
              
            </span>
            <SidebarBrand
              displaySidebar={displaySidebar}
              className="app__brand__text"
            >
              PropPal
              
            </SidebarBrand>
        
          <SidebarToggler
            displaySidebar={displaySidebar}
            onClick={handleSidebarDisplay}
          >
            
             
            
          </SidebarToggler>
        </SidebarLogoWrapper>
        <SidebarItems displaySidebar={displaySidebar} />
      </SidebarWrapper>
    </SidebarContainer>
    <Children displaySidebar={displaySidebar}>{children}</Children>
  </React.Fragment>
);
}