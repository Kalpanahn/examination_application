import React from "react";
import { NavLink } from "react-router-dom";
import Kgl from '../Images/kgl.png';

function Navbar() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row sticky-top">
          <div className="col-1">
            <img
              src={Kgl}
              className="img-fluid w-100"
              alt="Karnataka Forest Department"
              style={{ width: '10px' }}
            />
          </div>
          
          <div className="col-3 p-0 mt-2">
            <div className="col-8 d-flex align-items-end">
          <div className="navbar-nav d-flex flex-row">
            <NavLink className="nav-link active mx-3" to="/" style={{ color: 'white', fontWeight: 'bold' }}>
              Home
            </NavLink>
            <NavLink className="nav-link mx-3" to="/AdminLoginPage" style={{ color: 'white', fontWeight: 'bold' }}>
              Admin
            </NavLink>
          </div>

        </div>
            {/* <div style={{ marginLeft: '345%', marginTop: '-32px' }}>
              <NavLink
                className="btn btn-primary buttonstyle"
                to="/"
              >
                Logout
              </NavLink>
            </div> */}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Navbar