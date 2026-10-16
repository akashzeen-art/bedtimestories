import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [loginText, setLoginText] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px', width: '100%' }}>
          <form className="form-signin" onSubmit={handleSubmit}>
            <div className="svgContainer">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200">
                <circle style={{fill:'#587EBF'}} cx="100" cy="100" r="100"/>
                <g>
                  <path style={{fill:'#543253'}} d="M129.747,114.977c-0.975-0.464-1.961-0.934-2.953-1.406c-17.2-8.189-37.194-8.101-54.319,0.241 c-16.138,7.861-28.106,22.272-32.915,39.567c-0.306,1.099-0.606,2.217-0.898,3.353c-1.469,5.702-2.837,12.26-3.715,19.211 C52.435,190.938,75.158,200,100,200c26.549,0,50.677-10.349,68.582-27.229c-0.632-3.04-1.394-6.138-2.31-9.305 c-1.637-5.659-3.622-11.146-5.781-16.351C154.619,132.959,143.584,121.565,129.747,114.977z"/>
                  <path style={{fill:'#D38C9F'}} d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z"/>
                </g>
                <g>
                  <path style={{fill:'#804E5D'}} d="M161.313,97.01c0,33.703-27.322,43.908-61.025,43.908s-61.025-10.205-61.025-43.908 s27.322-80.894,61.025-80.894S161.313,63.307,161.313,97.01z"/>
                  <path style={{fill:'#543253'}} d="M100.289,16.116c33.703,0,61.025,47.191,61.025,80.894s-27.322,43.908-61.025,43.908 c-33.703,0-61.025-10.205-61.025-43.908S66.586,16.116,100.289,16.116z"/>
                </g>
                <g>
                  <path style={{fill:'#C88F9E'}} d="M129.077,109.901c0,15.9-12.889,20.714-28.789,20.714s-28.789-4.814-28.789-20.714 s12.889-36.053,28.789-36.053S129.077,94.001,129.077,109.901z"/>
                </g>
                <circle style={{fill:'#4F3150'}} cx="115.3" cy="71.313" r="2.555"/>
                <circle style={{fill:'#4F3150'}} cx="83.279" cy="71.313" r="2.555"/>
                <g>
                  <path style={{fill:'#4F3150'}} d="M112.972,95.82c0,4.07-5.679,11.179-12.684,11.179s-12.684-7.109-12.684-11.179 s5.679-7.369,12.684-7.369S112.972,91.75,112.972,95.82z"/>
                </g>
                <circle style={{fill:'#543253'}} cx="99.437" cy="116.598" r="2.555"/>
              </svg>
            </div>

            <div className="inputGroup">
              <label htmlFor="loginText">Your email address / phone / user id</label>
              <input
                type="text" id="loginText" name="loginText" required
                value={loginText} onChange={e => setLoginText(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password" id="loginPassword" name="p" required
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
