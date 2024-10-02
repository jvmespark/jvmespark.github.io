import './styles/aboutCard.css'

function AboutCard() {
  return (
      <div className="profile_text">
          <div className="center">
            <h3>{"jvmespark:~$ whoami"}</h3>
            {"Hi! I'm James, an undergraduate computer science major at "}
            <a href={"https://en.wikipedia.org/wiki/Rensselaer_Polytechnic_Institute"}>{"RPI"}</a><br></br><br></br>
            {"Here's a brief history of my young software engineering career (so far):"}
            <br></br><br></br>
          </div>

          <div className="exp">
            <li>{"Currently an intern at "}
            <a href={"https://www.youtube.com/user/AMD"}>{"AMD"}</a>{" working on AI/ML accelerators"}</li>
            
            <li>{"I was previously with the Digital Commerce & Innovation team at "}
            <a href={"https://www.linkedin.com/feed/update/urn:li:activity:7204642495563976705/"}>{"Capital One"}</a></li>
            
            <li>{"When on campus, I'm an open source developer for "}
            <a href={"https://new.rcos.io/"}>{"RCOS"}</a></li>
          </div>
          
          <br></br>
          <div className="center">
            {"Outside of being a computer nerd I'm also a sci-fi geek, indie film consumer, alternative music enthusiast, wannabe gamer, hobby artist & writer, and a professional procrastinator"}
          </div>
          <br></br>

          <br></br>
          <div className="center">
            {"I exist on the interwebs at these following locations:"}
          </div>
          <br></br>

          <div className="contacts">
            <li><a href={"https://github.com/jvmespark"}>{"Github"}</a></li>
            <li><a href={"https://www.linkedin.com/in/jvmespark/"}>{"LinkedIn"}</a></li>
            {/*<li><a href={"https://instagram.com/jvmespark"}>{"Instagram"}</a></li>*/}
            {/*<li><a href={"https://open.spotify.com/user/31wkdpjr2cnzo3yctou2tz65xfiy?si=9d7853fea20e447f"}>{"Spotify"}</a></li>*/}
            {/*<li><a href={"https://jvmespark.substack.com"}>{"Substack"}</a></li>*/}
            <li><a href={"https://www.youtube.com/@cryocoda"}>{"Youtube (Coming soon!)"}</a></li>
          </div>
          <br></br>
          <div className="center">
            {"You can also reach me through my emails:"}<br></br><br></br>
            {"parkj28 [at] rpi [dot] edu"}<br></br>
            {"or"}<br></br>
            {"jamesdpark1 on gmail"}
          </div>
      </div>
  )
}

export default AboutCard
