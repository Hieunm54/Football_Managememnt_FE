import React, { useEffect } from "react";
import "./editTeam.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editTeamInfo } from "../../redux/apiRequest";
import { useParams } from "react-router-dom";
import axios from "axios";


const EditTeam = () => {
  const user = useSelector((state)=> state.auth.login?.currentUser);
  const {teamId} = useParams();
  const teamEdit = useSelector((state)=> state.team.editTeam?.pendingEdit);
  const [name, setName] = useState();
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState();
  const [minage, setMinage] = useState();
  const [maxage, setMaxage] = useState(); 
  const [area, setArea] = useState('');
  const [kits, setKits] = useState('');
  const [logo, setLogo] = useState('');
  const [time, setTime] = useState('');
  const [teamInfo, setTeamInfo] = useState();
  const dispatch = useDispatch();
  
  const getTeamInfo = async () => {
    const response = await axios.get(`/team/view-team/${teamId}`);
    setTeamInfo(response.data);  
    setName(response.data.team.name); 
    setDescription(response.data.team.description);
    setLevel(response.data.team.level);
    setMinage(response.data.team.age.minAge);
    setMaxage(response.data.team.age.maxAge);
    setArea(response.data.team.area);
}
    useEffect(() => {
    getTeamInfo();
    }, []);
  const handleEdit = (e) => {
    e.preventDefault(); 
    const teamInfo1 = {
      description : description,
      name : name,
      minAge : minage,
      maxAge : maxage,
      level : level,
      area : area,
      logo : logo,
    };
    editTeamInfo(teamInfo1,dispatch,teamId,user?.token);
  };
  console.log(teamInfo);
  return (
    <div className="updateWrapper">
      <div className="updateContainer">
        <div className="heading">Edit your team</div>
        <form>
          <div className="card">
            <div className="formAvatar">
              <label className="labelInfor">Team Logo</label>
              <div className="profilePic">
                <img className="avatar" src="static/images/anh1.jpg" alt="avatar" />
              </div>
            </div>
            <div className="card-details">
              <div className="formItem">
                <label className="labelInfor">Team </label>
                <input
                  value={name}
                  className="formInput"
                  type="text"
                  placeholder='Enter your team name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Description</label>
                <input
                  className="formInput"
                  value={description}
                  type="text"
                  placeholder='Enter team description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Min Age</label>
                <input
                  className="formInput"
                  value={minage}
                  type="number"
                  placeholder="Enter number > 18"
                  onChange={(e) => setMinage(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Max Age</label>
                <input
                  className="formInput"
                  value={maxage}
                  type="number"
                  placeholder="Enter number < 35"
                  onChange={(e) => setMaxage(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Area</label>
                <input
                  className="formInput"
                  value={area}
                  type="text"
                  placeholder="Enter your area"
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label className="labelInfor">Level</label>
                <select className="formSelect" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="vui vẻ">vui vẻ</option>
                  <option value="yếu">yếu</option>
                  <option value="trung bình">trung bình</option>
                  <option value="khá">khá</option>
                  <option value="bán chuyên">bán chuyên</option>
                  <option value="chuyên nghiệp">chuyên nghiệp</option>
                </select>
              </div>
            </div>
          </div>
          <div className="buttonUpdate">
          <button
            disabled={teamEdit}
            className="updateButton"
            onClick={handleEdit}
          >
            Update
          </button>
             
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
//name,dateOfBirth,avatar,password,achivements,phonenumber,email,
