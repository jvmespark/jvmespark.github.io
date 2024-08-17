import './styles/about.css'

import AboutCard from './aboutCard'

function About() {
  return (
    <>
    <div className="profile_container">
        <div className="profile">
            <div className="profile_inner">
                <div className="profile_img">
                    {/*<img src="https://i.pinimg.com/originals/4f/c9/81/4fc981d2f0d226ce16b40d35bdd25787.jpg" alt="asd"></img>*/}
                    <img src="https://64.media.tumblr.com/2f7316b94ac36660d3ddc338adb5de1e/e46f1c4856d4a4e7-1c/s250x400/a89ed660ab6c7addc1f6fee1c3e71c1364a797d7.png" alt="asd"></img>
                </div>
                <AboutCard></AboutCard>
            </div>
        </div>
    </div>
    </>
  )
}

export default About
