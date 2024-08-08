import "../styles/Sidebar.css"
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="wrapper">
      <div className={`pro-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="head-div">
          <span className="head-text">
            <Link to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              <img src="/static/media/csglogo.609c4f2d.png" alt="CSG Logo" />
            </Link>
          </span>
          <span className="icon-suffix" onClick={handleToggle}>
            <i className="fa fa-bars fa-large"></i>
          </span>
        </div>
        <div className="pro-sidebar-content">
          <nav className="pro-menu">
            <ul>
              <li>
                <Link to="/dashboard">
                  <div className="menu-item" tabIndex="0" role="button">
                    <i className="fa fa-user fa-md side-icon"></i>
                    <span className="item-content">Dashboard</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/questionsinsert">
                  <div className="menu-item" tabIndex="0" role="button">
                    <i className="fa fa-table fa-md side-icon"></i>
                    <span className="item-content">Add Questions</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/listQuestions">
                  <div className="menu-item" tabIndex="0" role="button">
                    <i className="fa fa-table fa-md side-icon"></i>
                    <span className="item-content">View Questions</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/reports">
                  <div className="menu-item" tabIndex="0" role="button">
                    <i className="fa fa-table fa-md side-icon"></i>
                    <span className="item-content">Reports</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <div className="menu-item" tabIndex="0" role="button">
                    <i className="fa fa-exclamation-circle fa-md side-icon"></i>
                    <span className="item-content">Logout</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pro-sidebar-footer">CSG Test App</div>
      </div>
      <div className={`container-fluid ${collapsed ? 'collapsed' : ''}`}>
        <nav className="navbar navbar-expand-lg bg-blue">
          <Link className="navbar-brand csg-logo" to="/"></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/Home"></Link>
            </div>
          </div>
        </nav>
        <div className={`p-3 ${collapsed ? 'collapsed' : ''}`}>
          <h3 className="text-center">Welcome to Dashboard</h3>
        </div>
        <section className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="fixed-footer col-md-12 col-lg-12">Designed and Developed by CSG</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
