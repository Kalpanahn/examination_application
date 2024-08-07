import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './stores/Store';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration'
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from './pages/Admin';
import Guidelines from './pages/Guidelines';
import QuestionsPage from './pages/QuestionsPage';
import TypingTest from './pages/TypingTest';

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
              <Route path="/Registration" element={<Registration />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/Guidelines" element={<Guidelines />} />
              <Route path="/QuestionsPage" element={<QuestionsPage />} />
              <Route path="/TypingTest" element={<TypingTest />} />
            </Routes>
          </Router>

        </div>
      </Provider>
    </div>
  );
}

export default App;
