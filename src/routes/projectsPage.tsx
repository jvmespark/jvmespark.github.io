import './page.css'

import NavDir from '../components/navdir'
import Projects from '../components/projects'

function ProjectsPage() {
  return (
    <>
      <div>
        <div className="blogContainer">
            <div className="nav">
                <div className="navdir"><NavDir></NavDir></div>
                <div className="navdisplay">
                    <div className="displayProjects">
                    <h3>projects</h3>
                    </div>
                </div>
            </div>
          <Projects></Projects>
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
