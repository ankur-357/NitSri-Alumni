import React from "react";
import "./Profile.css";
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Profile(props) {
    return (
        <div className="single">
            <div className="circle"></div>
            <div className="inner">
                <h3 id="memberName">{props.name}</h3>
                <br></br>
                <div className="image">
                    <img src={props.img} alt="profile" />
                </div>
                <br></br>
                <p id="info">{props.info}</p>
                <div className="social">
                    <a id="socialLinks" href={props.link} />
                    <a id="socialLinks" href={props.link} />
                    <a id="socialLinks" href={props.link} />
                </div>
            </div>
        </div>
    );
}

export default Profile;