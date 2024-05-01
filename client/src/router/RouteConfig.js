import Home from '../pages/Home/index.js';
import Login from '../pages/Login/index.js';
import TicketValidation from '../pages/TicketValidation';
import CreateRoute from '../pages/CreateRoute';
import BuyTicket from '../pages/BuyTicket';
import SearchPassenger from '../pages/SearchPassenger';
import SalesReport from '../pages/SalesReport';
import GlobalSetting from '../pages/GlobalSetting';
import Checkout from '../pages/Checkout/index.js';
import Success from '../pages/Success/index.js';

const routes = [
  { path: "/login", element: <Login />, protected: false, showSidebar: false },
  { path: "/", element: <Home />, protected: false, showSidebar: true },
  { path: "/ticket-validation", element: <TicketValidation />, protected: true, showSidebar: true },
  { path: "/create-route", element: <CreateRoute />, protected: true, showSidebar: true },
  { path: "/buy-ticket", element: <BuyTicket />, protected: true, showSidebar: true },
  { path: "/search-passenger", element: <SearchPassenger />, protected: true, showSidebar: true },
  { path: "/sales-report", element: <SalesReport />, protected: true, showSidebar: true },
  { path: "/global-setting", element: <GlobalSetting />, protected: true, showSidebar: true },
  { path: "/checkout", element: <Checkout />, protected: true, showSidebar: false },
  { path: "/success", element: <Success />, protected: true, showSidebar: false }

];

export default routes;
