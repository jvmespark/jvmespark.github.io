import './page.css'
import './nav.css'
import './navDisplay.css'

import About from '../components/about'
import NavDir from '../components/navdir'

function AboutPage() {
  return (
    <>
      <div>
        <div className="blogContainer">
            <div className="nav">
                <div className="navdir"><NavDir></NavDir></div>
                <div className="navdisplay">
                    <div className="displayAbout">
                    <h3>about</h3>
                    </div>
                </div>
            </div>
          <About></About>
        </div>
      </div>
    </>
  )
}

export default AboutPage
