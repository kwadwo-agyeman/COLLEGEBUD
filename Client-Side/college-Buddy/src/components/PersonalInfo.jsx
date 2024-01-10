import React from "react";
import Bio from "./Bio";
import Education from "./Education";
function PersonalInfo(props) {
  return (
    <div >
        <Bio setBio={props.setBio} bio={props.bio}/>
        <br /><br />
        <Education setEdu={props.setEdu} edu={props.edu}/>
    </div>
  );
}

export default PersonalInfo;
