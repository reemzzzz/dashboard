import { useContext } from "react";
import ViewProfile from "../../components/global/Profile";
import { useAuth } from "../../contexts/authContext";
import Bar from "./pages/BarChart";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/DashboardHome";
import Devices from "./pages/Devices";
import Form from "./pages/Form";
import Manuals from "./pages/Manuals";
import SpareParts from "./pages/Parts";
import Pie from "./pages/PieChart";
import MonthlyReports from "./pages/Reports";
import Team from "./pages/Team";
// useAuth


// const {user} = useContext()

export const sidebar =  [
    {path:"/",label: "Dashboard",component: Dashboard , subtitle:"Welcome to your dashboard"},
    {path:"bar",label: "Bar Chart",component: Bar, subtitle: "Status of Devices entered the system this month"},
    {path:"pie",label: "Pie Chart",component: Pie, subtitle: "Devices entered the system this month"},
    {path:"calendar",label: "My Calendar",component: Calendar , subtitle: "My Service Visits Calendar"},
    {path:"devices",label: "Devices",component: Devices , subtitle:"Current Devices present in the system"},
    {path:"team",label: "Team",component: Team , subtitle:"Team members"},
    {path:"contacts",label: "Contacts Info",component: Contacts , subtitle: "Contacts of all Companies"},
    {path:"reports",label: "Monthly Reports",component: MonthlyReports , subtitle: "Automated monthly performance reports" },
    {path:"manuals",label: "Manuals",component: Manuals ,subtitle: "Browse or search user or service manuals"},
    {path:"spare-parts",label: "Spare Parts",component: SpareParts , subtitle: "Browse or search spare parts"},
    {path:"form",label: "New Member",component: Form ,subtitle:"Create a new engineer profile"},
    {path:"profile",label: "My Profile",component: ViewProfile , subtitle: "Update your information upon change"},
]

// Optional API handlers (if needed later)
export const api = {
  fetchDashboard: () => fetch("/api/maintenance/dashboard"),
};

export {
  Dashboard,
  Bar,
  Pie,
  Calendar,
};