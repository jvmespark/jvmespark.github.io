import './page.css'

import Writings from '../components/writings'
import NavDir from '../components/navdir'

function WritingsPage() {
  return (
    <>
      <div>
        <div className="blogContainer">
            <div className="nav">
                <div className="navdir"><NavDir></NavDir></div>
                <div className="navdisplay">
                    <div className="displayWritings">
                    <h3>writings</h3>
                    </div>
                </div>
            </div>
          <Writings></Writings>
        </div>
      </div>
    </>
  )
}

export default WritingsPage
