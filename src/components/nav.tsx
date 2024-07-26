import './styles/nav.css'
import NavDir from './navdir'
import NavDisplay from './navdisplay'

function Nav() {
  return (
    <>
      <div className="nav">
        <div className="navdir"><NavDir></NavDir></div>
        <div className="navdisplay"><NavDisplay></NavDisplay></div>
      </div>
    </>
  )
}

export default Nav
