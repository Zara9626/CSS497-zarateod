import {
    HomeIcon,
    SettingsIcon,
    PeopleIcon,
    ContactEmergencyIcon,
    PoliceIcon,
    ContractorIcon,
    LogoutIcon,

  } from "./Icons";
  
  export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "dashboard",
      path: "dashboards",
      icon: <HomeIcon />,
      route: './Singin',
    },
    {
      id: 2,
      name: "settings",
      path: "settings",
      icon: <SettingsIcon />,
    },
    {
      id: 3,
      name: "residents",
      path: "residents",
      icon: <PeopleIcon />,
    },
    {
      id: 4,
      name: "incidents",
      path: "incidents",
      icon: <ContactEmergencyIcon />,
    },
    {
      id: 5,
      name: "police reports",
      path: "police",
      icon: < PoliceIcon/>,
    },
    {
      id: 6,
      name: "contractors",
      path: "contractors",
      icon: <ContractorIcon />,
    },
    {
      id: 7,
      name: "log out",
      path: "logout",
      icon: <LogoutIcon/>,
    },
   
     
  ];