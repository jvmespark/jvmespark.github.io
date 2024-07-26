import './styles/about.css'

import AboutCard from './aboutCard'

function About() {
  return (
    <>
    <div className="profile_container">
        <div className="profile">
            <div className="profile_inner">
                <div className="profile_img">
                    <img src="https://i.pinimg.com/originals/4f/c9/81/4fc981d2f0d226ce16b40d35bdd25787.jpg" alt="asd"></img>
                </div>
                <AboutCard></AboutCard>
            </div>
        </div>
    </div>
    </>
  )
}

export default About
