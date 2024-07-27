import './styles/navDisplay.css'

function NavDisplay() {
    let location = window.location.pathname.substring(1,)
    let bannerType="displayAbout"
    if (location=="") location ="about"
    if (location=="writings") bannerType="displayWritings"
    if (location=="projects") bannerType="displayProjects"
    if (location=="misc") bannerType="displayMisc"
    return (
      <>
        <div className={bannerType}>
          <h3>{location}</h3>
        </div>
      </>
    )
}

export default NavDisplay
