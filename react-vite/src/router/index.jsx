import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import TicketForm from '../components/TicketForm/TicketForm';
import EditTicketForm from '../components/EditTicketForm/EditTicketForm';
import LandingPage from '../components/LandingPage/LandingPage';
import ViewTickets from '../components/VIewTickets/ViewTickets';
import DashBoard from '../components/DashBoard/DashBoard';
import CreateCustomer from '../components/CreateCustomer/CreateCustomer';
import CreateMacro from '../components/CreateMacro/CreateMacro';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "create/ticket",
        element: <TicketForm />
      },
      {
        path: "edit/ticket/:ticket_id",
        element: <EditTicketForm />
      },
      {
        path: "view/ticket/:ticket_id",
        element: <ViewTickets />
      },
      {
        path: "view/tickets/all",
        element: <DashBoard />
      },
      {
        path: "customer/create",
        element: <CreateCustomer />
      },
      {
        path: "macro/create",
        element: <CreateMacro />
      }
    ],
  },
]);