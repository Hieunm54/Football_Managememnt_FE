import "./TeamHistory.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Spinner from "../../components/loading/Spinner";
import Timeline from "@mui/lab/Timeline";
import TimelineComponent from "../../components/update-match/timeline-item/TimelineComponent";
import HistoryItem from "../../components/team-history/history-item/HistoryItem";

const TeamHistory = () => {
    const navigate = useNavigate();
    const { teamId } = useParams();
    const [matchHistoryList, setMatchHistoryList] = useState();
    const [isCaptain, setIsCaptain] = useState();
    const [openHelp, setOpenHelp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.auth.login?.currentUser);

    const getMatchHistory = async () => {
        const response = await axios.get(`/match/match-history/${teamId}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setMatchHistoryList(response.data.data);
        setIsLoading(false);
    };

    //kiem tra user la doi truong cua team dang xem hay khong
    const checkUser = async (teamId) => {
        const response = await axios.get(`/team/is-captain/${teamId}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setIsCaptain(response.data.isCaptain);
    };

    useEffect(() => {
        getMatchHistory();
        checkUser(teamId);
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className="team-history">
            <div className="matches">
                {matchHistoryList?.map((m) => {
                    return (
                        <HistoryItem key={m._id} match={m} isCaptain={isCaptain} />
                    );
                })}
            </div>
            <div className="help-btn" onClick={(e) => setOpenHelp(!openHelp)}>
                <ContactSupportIcon />
            </div>
            {openHelp && (
                <p className="help-div">
                    Ch?? th??ch c??c tr???ng th??i tr???n ?????u: <br />
                    - Conflict: T??? s??? tr???n ?????u c???p nh???t b???i 2 ?????i ??ang m??u
                    thu???n. <br />- Confirm: T??? s??? tr???n ?????u c???p nh???t b???i 2 ?????i ????
                    tr??ng nhau. <br />
                    - Pending: T??? s??? tr???n ?????u ??ang ???????c c???p nh???t. <br />
                    - None: Ch??a c???p nh???t t??? s???. <br />
                </p>
            )}
        </div>
    );
};

export default TeamHistory;
