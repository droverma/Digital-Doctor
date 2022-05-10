import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';

export const DoctorSidebarData = [
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
    }
];