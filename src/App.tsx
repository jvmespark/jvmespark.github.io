import './App.css'

import Nav from './components/nav'
import About from './components/about'
import Writings from './components/writings'
import Projects from './components/projects'
import Misc from './components/misc'

function App() {
  let location = window.location.pathname.substring(1,)
  let page = <About></About>
  if (location=="writings") page = <Writings></Writings>
  if (location=="projects") page = <Projects></Projects>
  if (location=="misc") page = <Misc></Misc>
  return (
    <>
      <div>
        <div className="blogContainer">
          <Nav></Nav>
          {page}
        </div>
      </div>
    </>
  )
}

export default App
