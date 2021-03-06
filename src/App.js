import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginHeader from "./components/header/LoginHeader";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllTeam from "./pages/all-team/AllTeam";
import UpdateMatch from "./pages/update-match/UpdateMatch";
import UpdateInfor from "./pages/UpdateInfor/UpdateInfor";
import CreateTeam from "./pages/CreateTeam/CreateTeam";
import EditTeam from "./pages/EditTeam/EditTeam";
import TeamInfo from "./pages/team-info/TeamInfo";
import MemberInfo from "./pages/MemberInfo/MemberInfo";
import EditMember from "./pages/EditMember/EditMember";
import AllMyTeam from "./pages/all-my-team/AllMyTeam";
import TeamHistory from "./pages/team-history/TeamHistory";
import CreateMember from "./pages/CreateMember/CreateMember";
import MemberList from "./components/team-info/member-list/MemberList";
import Comments from "./components/team-info/Comments/Comments";

function App() {
    const { login } = useSelector((state) => state.auth);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" />
                    <Route exact path="/register" />
                    <Route
                        path="*"
                        element={
                            login.currentUser ? <LoginHeader /> : <Header />
                        }
                    />
                </Routes>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/all-team" element={<AllTeam />} />
                    <Route path="/team-info/:teamId" element={<TeamInfo />}>
                        <Route
                            path="/team-info/:teamId/member-list"
                            element={<MemberList />}
                        />
                        <Route
                            path="/team-info/:teamId/match-history"
                            element={<TeamHistory />}
                        />
                        <Route
                            path="/team-info/:teamId/comments"
                            element={<Comments />}
                        />
                    </Route>
                    <Route path="/update-match" element={<UpdateMatch />} />
                    <Route path="/edit-information" element={<UpdateInfor />} />
                    <Route path="/all-my-team" element={<AllMyTeam />} />
                    <Route path="/create" element={<CreateTeam />} />
                    <Route path="/edit-team/:teamId" element={<EditTeam />} />
                    <Route path="/team-history" element={<TeamHistory />} />
                    <Route path="/create-member/:teamId" element={<CreateMember />} />
                    <Route path="/edit-member/:teamId/:memberId" element={<EditMember />} />
                    <Route path="/member-info/:memberId" element={<MemberInfo />} />
                </Routes>
                <Routes>
                    <Route exact path="/" />
                    <Route exact path="/login" />
                    <Route exact path="/register" />
                    <Route path="*" element={<Footer />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer autoClose={1000} />
        </div>
    );
}

export default App;
