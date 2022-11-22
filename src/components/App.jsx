import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Destination from "../Destination";
import Users from "./Admin/Users";
import Home from "./Home";
import Destinations from "./Admin/Destinations";
import Locations from "./Admin/Locations";
import Login from "./Login";
import Feedbacks from "./admin-components/analytics-components/Feedbacks";



const App = (props) => {
    return (
        <React.Fragment>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/destination" element={<Destination />} />
                        <Route exact path="/users" element={<Users />} />
                        <Route exact path="/destinations" element={<Destinations />} />
                        <Route exact path="/locations" element={<Locations />} />
                        <Route exact path="/feedbacks" element={<Feedbacks />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </React.Fragment>
    )
}



export default App;