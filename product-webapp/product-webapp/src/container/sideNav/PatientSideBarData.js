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
    title: "Appointments",
    path: "/appointmentViewForPatients",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Available Slots",
    path: "/availableSlotsPatients",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Dashboard",
    path: "/doctorslist",
    icon: <CalendarMonthIcon />,
  }
];