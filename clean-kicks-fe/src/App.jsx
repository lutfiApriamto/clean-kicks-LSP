import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/UserPages/LandingPage.jsx"
import Catalog from "./Pages/AdminPages/Catalog.jsx";
import Dashboard from "./Pages/AdminPages/Dashboard.jsx";
import AddCatalog from "./Pages/AdminPages/AddCatalog.jsx";
import LoginPage from "./Pages/AdminPages/LoginPage.jsx";
import EditCatalog from "./Pages/AdminPages/EditCatalog.jsx";
import CatalogPageUser from "./Pages/UserPages/CatalogPageUser.jsx";
import OrderForm from "./Pages/UserPages/OrderForm.jsx"
import TrackingOrderPage from "./Pages/UserPages/TrackingOrderPage.jsx";
import OrderHistory from "./Pages/AdminPages/OrderHistory.jsx";
import DetailOrder from "./Pages/AdminPages/DetailOrder.jsx";
import DetailProgress from "./Pages/AdminPages/DetailProgress.jsx";
import AddNewProgress from "./Pages/AdminPages/AddNewProgress.jsx";

function App() {
  return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/catalog" element={<CatalogPageUser/>}/>
        <Route path="/order" element={<OrderForm/>}/>
        <Route path="/tracking" element={<TrackingOrderPage/>}/>

        
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/catalog" element={<Catalog />} />
        <Route path="/admin/catalog/addcatalog" element={<AddCatalog/>}/>
        <Route path="/admin/login" element={<LoginPage/>}/>
        <Route path="/admin/catalog/:id" element={<EditCatalog/>}/>
        <Route path="admin/order/history" element={<OrderHistory/>}/>
        <Route path="/admin/order/history/detail/:id" element={<DetailOrder/>}/>
        <Route path="/admin/order/progress/detail/:id" element={<DetailProgress/>}/>
        <Route path="/admin/order/progress/new/:id" element={<AddNewProgress/>}/>

      </Routes>
          </BrowserRouter>
  );
}

export default App;