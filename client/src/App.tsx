import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./lib/AuthContext";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route element={<PrivateRoute />}>
                            {/* Add routes for logged in users here */}
                        </Route>
                    </Route>
                    <Route element={<UnauthenticatedRoute />}>
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
