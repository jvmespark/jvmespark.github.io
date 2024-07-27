import './page.css'

import Misc from '../components/misc'
import NavDir from '../components/navdir'

function MiscPage() {
  return (
    <>
      <div>
        <div className="blogContainer">
            <div className="nav">
                <div className="navdir"><NavDir></NavDir></div>
                <div className="navdisplay">
                    <div className="displayMisc">
                    <h3>misc</h3>
                    </div>
                </div>
            </div>
          <Misc></Misc>
        </div>
      </div>
    </>
  )
}

export default MiscPage
