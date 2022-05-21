import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
  
export const PatientSidebarData = [
  
  
  {
    title: "Profile",
    path: "/updatepatient",
    icon: <PersonIcon />,
  },
  {
    title: "Search Doctors",
    path: "/doctorslist",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Appointments",
    path: "/appointmentViewForPatients",
    icon: <CalendarMonthIcon />,
  }
];