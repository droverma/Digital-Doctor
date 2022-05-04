import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';
  
export const SidebarData = [
  {
    title: "Profile",
    path: "/updatedoctor",
    icon: <PersonIcon />,
  },
  {
    title: "Appointments",
    path: "/appointmentViewForDoctors",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Create Slots",
    path: "/createSlotViewDoctor",
    icon: <TimerIcon />,
  },
  {
    title: "Profile Patients",
    path: "/updatepatient",
    icon: <PersonIcon />,
  },
  {
    title: "Appointments Patients",
    path: "/appointmentViewForPatients",
    icon: <CalendarMonthIcon />,
  }
];