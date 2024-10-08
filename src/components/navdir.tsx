import './styles/navDir.css'

function NavDir() {
  return (
    <>
      <div>
        <nav>
            <div className="inner">
                <ul className="navbar-list">
                    <li>
                        <a href="#/about">{"about"}</a>
                        <a href={"#/writings"}>{"writings"}</a>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    </>
  )
}

export default NavDir