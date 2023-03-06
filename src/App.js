import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/authentication/AdminLogin";
import AddScheme from "./components/admin/pages/AddScheme";
import AddUserType from "./components/admin/pages/AddUserType";
import AddCaste from "./components/admin/pages/AddCaste";
import Header from "./components/layout/Header";
import AuthContext, { CustomContext } from "./context/AuthContext";
import MemberLogin from "./components/member/authentication/MemberLogin";
import MemberRegister from "./components/member/authentication/MemberRegister";
import Schemes from "./components/all-schemes/Schemes";
import Home from "./components/home/Home";
import MatchingSchemes from "./components/member/pages/MatchingSchemes";
import Apply from "./components/member/ui/Apply";
import MyApplications from "./components/member/pages/MyApplications";
import ManageApplications from "./components/admin/pages/ManageApplications";
import MyQueries from "./components/member/pages/MyQueries";
import ManageQueries from "./components/admin/pages/ManageQueries";
import AboutUs from "./components/home/AboutUs";
import ContactUs from "./components/home/ContactUs";

export const TOAST_PROP = { position: 'top-center', hideProgressBar: true };

function AuthenticatedRoute() {
  const context = CustomContext();
  if (context.isAuthenticated && context.isAuthenticated !== null) {
    return <Outlet />
  } else {
    return <Navigate to={"/"} />
  }
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/all-schemes" element={<Schemes />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/member/login" element={<MemberLogin />} />
            <Route path="/member/register" element={<MemberRegister />} />

            {/* private routes */}

            {/* Member Routes */}
            <Route path="/member" element={<AuthenticatedRoute />}>
              <Route path="matching-schemes" element={<MatchingSchemes />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="queries" element={<MyQueries />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AuthenticatedRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="dashboard/add-scheme" element={<AddScheme />} />
              <Route path="dashboard/add-types" element={<AddUserType />} />
              <Route path="dashboard/add-caste" element={<AddCaste />} />
              <Route path="dashboard/applications" element={<ManageApplications />} />
              <Route path="dashboard/queries" element={<ManageQueries />} />
            </Route>

          </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}