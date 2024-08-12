import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './stores/Store';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration'
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import CenterAdmin from './pages/CenterAdmin';
import Guidelines from './pages/Guidelines';
import TestPage from './pages/TestPage';
import TypingTest from './pages/TypingTest';
import KgidDashboard from './components/KgidDashboard';
import DepartmentAdmin from './pages/DepartmentAdmin';
import Adminloginpage from './components/Adminloginpage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div className="App">
          {/* <Navbar/> */}

          <Router>
            {/* <Sidebar/> */}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/Adminloginpage" element={<Adminloginpage />} />
              <Route path="/Registration" element={<Registration />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/CenterAdmin" element={<CenterAdmin />} />
              <Route path="/Guidelines" element={<Guidelines />} />
              <Route path="/TestPage" element={<TestPage />} />
              <Route path="/TypingTest" element={<TypingTest />} />
              <Route path="/KgidDashboard" element={<KgidDashboard />} />
              <Route path="/DepartmentAdmin" element={<DepartmentAdmin />} />
            </Routes>
          </Router>

        </div>
      </Provider>
    </div>
  );
}

export default App;
