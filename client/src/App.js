import { BrowserRouter,Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import Navbar from "./Components/Navbar/Navbar";
import AddTransaction from "./Components/Forms/AddTransaction";
import AccountDashboard from "./Components/Dashboard/AccountDashboard";
import AccountDetails from "./Components/Dashboard/AccountDetails";
import AddAccount from "./Components/Forms/AddAccount";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/add-transaction/:id" element={<AddTransaction/>}/>
      <Route path="/Dashboard" element={<AccountDashboard/>}/>
      <Route path="/account-details/:accountID" element={<AccountDetails/>}/>
      <Route path="/Dashboard/accounts/create" element={<AddAccount/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
