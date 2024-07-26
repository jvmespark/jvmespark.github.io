import './styles/navDisplay.css'

function NavDisplay() {
    let location = window.location.pathname.substring(1,)
    if (location=="") location="about"
  return (
    <>
      <div className="display">
        {"@"}<br></br>
        {"@"}<br></br>
        {"@"}<br></br>
        {location}<br></br>
        {"@"}<br></br>
        {"@"}<br></br>
        {"@"}<br></br>
      </div>
    </>
  )
}

export default NavDisplay
