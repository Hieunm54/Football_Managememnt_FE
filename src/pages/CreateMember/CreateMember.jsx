import React from "react";
import "./createMember.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createMember, editTeamInfo } from "../../redux/apiRequest";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate, useParams } from "react-router-dom";
const CreateMember = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const {teamId} = useParams();
  const [nickname, setNickname] = useState("");
  const [number, setNumber] = useState();
  const [value, setValue] = React.useState("thành viên");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const memberInfo = {
      nickname: nickname,
      number: number,
      role: value,
      isExistUser: false, 
    };
    createMember(memberInfo,navigate ,dispatch, teamId, user?.token);
  };

  return (
    <div className="updateWrapper">
      <div className="updateContainer">
        <div className="heading">Create your member</div>
        <form>
          <div className="card">
            <div className="formAvatar">
              <label className="labelInfor">Member Avatar</label>
              <div className="profilePic">
                <img
                  className="avatar"
                  src="static/images/anh1.jpg"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="card-details">
              <div className="formItem">
                <label className="labelInfor">Nickname</label>
                <input
                  value={nickname}
                  className="formInput"
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Number</label>
                <input
                  className="formInput"
                  value={number}
                  type="number"
                  placeholder="Enter number of kit"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="formItem">
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    ROLE
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="đội trưởng"
                      control={<Radio />}
                      label="CAPTAIN"
                    />
                    <FormControlLabel
                      value="thành viên"
                      control={<Radio />}
                      label="MEMBER"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="buttonUpdate">
            <button
              // disabled={teamEdit}
              className="updateButton"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
