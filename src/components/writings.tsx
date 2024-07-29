import './styles/writings.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Writings() {
  const [posts, setPosts] = useState<{ filename: string; title?: string; subtitle?: string; tags?: string[] }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/files.json');
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        setPosts(data.files);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const [devlogs, setDevlogs] = useState(false);
  const [essays, setEssays] = useState(false);
  const [college, setCollege] = useState(false);
  const [tag, setTag] = useState("")

  const handleToggle = (type:string) => {
    if (type == "devlogs") setDevlogs(!devlogs)
    if (type == "essays") setEssays(!essays)
    if (type == "college") setCollege(!college)
    if (!devlogs && !essays && !college) setTag(type)
    else setTag("")
  };
  console.log("tag: ",tag)

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
      
      
      <div>
        <ul>
          {posts.map((post) => (
              <div>
                  {((post.tags && post.tags.includes(tag)) || tag=="") && (
                  <li key={post.filename}>
                      <Link to={`/writings/${post.filename}`}>
                      <h3>{post.title}</h3>
                      {post.subtitle && <h4>{post.subtitle}</h4>}
                      {post.tags && (
                          <div>
                            {/* 
                          {post.tags.map((tag, index) => (
                              <span key={index} className="tag">{tag+" "}</span>
                          ))}
                              */}
                          </div>
                      )}
                      </Link>
                  </li>
                  )}
              </div>
          ))}
        </ul>
      </div>

    </div>
    </>
  )
}

export default Writings