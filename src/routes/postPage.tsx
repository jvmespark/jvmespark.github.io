import './page.css'

import NavDir from '../components/navdir'
import Post from '../components/post'

function PostPage() {
  return (
    <>
      <div>
        <div className="blogContainer">
            <div className="nav">
                <div className="navdir"><NavDir></NavDir></div>
                <div className="navdisplay"></div>
            </div>
          <Post></Post>
        </div>
      </div>
    </>
  )
}

export default PostPage
