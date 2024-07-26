import './App.css'

import Nav from './components/nav'
import About from './components/about'

function App() {
  return (
    <>
      <div>
        <div className="blogContainer">
          <Nav></Nav>
          <About></About>
        </div>
      </div>
    </>
  )
}

export default App
