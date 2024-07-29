import { useRouteError } from "react-router-dom";


import './routes/page.css'
import './routes/nav.css'
import './routes/navDisplay.css'

import NavDir from './components/navdir'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    
    <div id="error-page">
    <div className="blogContainer">
        <div className="nav">
            <div className="navdir"><NavDir></NavDir></div>
            <div className="navdisplay">
                <div className="displayError">
                <h3>{error.status}</h3>
                </div>
            </div>
        </div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  </div>
  );
}