import './styles/aboutCard.css'

function AboutCard() {
  return (
    <>
        <div className="profile_card">
            <div className="profile_text">
                <span>
                    <div className="center">
                      <h3>{"Hi! I'm James Park"}</h3>
                      {"Undergraduate computer science major at "}
                      <a href={"https://en.wikipedia.org/wiki/Rensselaer_Polytechnic_Institute"}>{"RPI"}</a>
                      <br></br><br></br>
                    </div>

                    <li>{"Currently working on AI hardware accelerators as a SWE Intern at "}
                    <a href={"https://www.youtube.com/user/AMD"}>{"AMD"}</a></li>
                    
                    <li>{"Previously with the Digital Payments & Innovation team at "}
                    <a href={"https://www.linkedin.com/feed/update/urn:li:activity:7204642495563976705/"}>{"Capital One"}</a></li>
                    
                    <li>{"Open Source Developer for student organization "}
                    <a href={"https://new.rcos.io/"}>{"RCOS"}</a></li>
                    <br></br>
                    
                    {"Born and raised in NYC. Interested in being interested."}
                    <br></br>
                </span><br></br>
                <div className="contacts">
                  <a href={"https://github.com/jvmespark"}>{"github"}</a>&nbsp;&nbsp;
                  <a href={"https://www.linkedin.com/in/jvmespark/"}>{"linkedin"}</a>&nbsp;&nbsp;
                  <a href={"https://www.youtube.com/@loomydev"}>{"youtube"}</a>&nbsp;&nbsp;
                  <a href={"mailto:jamesdpark1@gmail.com"}>{"email"}</a>&nbsp;&nbsp;
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutCard
