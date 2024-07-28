import './styles/writings.css'
import { useState } from 'react';

function Writings() {
  const [devlogs, setDevlogs] = useState(false);
  const [essays, setEssays] = useState(false);
  const [college, setCollege] = useState(false);

  const handleToggle = (type:string) => {
    if (type == "devlogs") setDevlogs(!devlogs)
    if (type == "essays") setEssays(!essays)
    if (type == "college") setCollege(!college)
  };
  return (
    <>
    <div className="writingNavContainer">
        <button className={essays ? 'toggled' : ''} onClick={() => handleToggle("essays")}>
          essays
        </button>
        <button className={devlogs ? 'toggled' : ''} onClick={() => handleToggle("devlogs")}>
          devlogs
        </button>
        <button className={college ? 'toggled' : ''} onClick={() => handleToggle("college")}>
          college
        </button>
    </div>
    <div className="postContainer">
      <a href={"#/writings/1"}>{"post"}</a>
    </div>
    </>
  )
}

export default Writings