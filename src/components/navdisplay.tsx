import './styles/navDisplay.css'

function NavDisplay() {
    let location = window.location.pathname.substring(1,)
    if (location=="") location="about"
  return (
    <>
      <div className="display">
        <h3>{location}</h3>
      </div>
    </>
  )
}

export default NavDisplay
