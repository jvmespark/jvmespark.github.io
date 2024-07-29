import './styles/writings.css'
import { useEffect, useState } from 'react';

function Writings() {
  const [posts, setPosts] = useState<{ filename: string; title?: string; subtitle?: string; tags?: string[] }[]>([]);
  const [filteredPost, setFilteredPost] = useState<{ filename: string; title?: string; subtitle?: string; tags?: string[] }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/files.json');
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        setPosts(data.files);
        setFilteredPost(data.files);
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
    if (!devlogs && !essays && !college) {
      const filteredItems = posts.filter(item => item.tags?.includes(type));
      setFilteredPost(filteredItems);
      setTag(type);
    }
    else {
      setFilteredPost(posts);
      setTag("")
    }
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
          {filteredPost.map((post) => (
              <div className="post">
                  <a href={`#/writings/${post.filename}`}>
                    <button key={post.filename}>
                        <h3>{post.filename}</h3>
                        {post.subtitle && <p>{post.subtitle}</p>}
                        {post.tags && (
                            <div>
                              {/* 
                            {post.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag+" "}</span>
                            ))}
                                */}
                            </div>
                        )}
                    </button>
                  </a>
              </div>
          ))}
      </div>
    </>
  )
}

export default Writings