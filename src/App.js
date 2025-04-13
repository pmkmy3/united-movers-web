import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoadingProvider } from './context/loadingContext';
import './App.css';
import styled from 'styled-components';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Login from './pages/auth/login2/login';
import EmployeeList from './pages/employee/EmployeeList';
import RiderList from './pages/rider/RiderList';
import GlobalLoadingSpinner from './components/common/globalLoadingSpinner';
import PrivateRoute from './components/common/privateRoute';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  Height: 99vh;
`;

const HeaderContainer = styled.header`
  flex: 0 0 auto; /* Header has fixed height */
  height: 80px;
`;

const Layout = styled.div`
    display: flex;
    flex: 1;
    overflow-y: auto;
    margin-top: 3px;
    min-height: calc(100% - 120px);
    max-height: calc(100% - 120px);
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FooterContainer = styled.footer`
  flex: 0 0 auto; /* Footer has fixed height */
  height: 20px;
  background-color: #333;
  color: white;
`;

const MainApp = ({ loggedIn, setLoggedIn, isCollapsed, toggleCollapse, callbackFunction }) => {
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/auth/login') {
      setLoggedIn(false);
    } else {
      const token = localStorage.getItem('authToken');
      if (token) {
        setLoggedIn(true);
        navigate(location.pathname, { replace: true });
      }
    }
  }, []);

  return loggedIn ? (
    <AppContainer>
      <HeaderContainer>
        <Header isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      </HeaderContainer>
      <Layout>
        <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
          <main>
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/employee" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
              <Route path="/rider" element={<PrivateRoute><RiderList /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Layout>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </AppContainer>
  ) : (
    <Routes>
      <Route path="/auth/login" element={<Login parentCallback={callbackFunction} />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const callbackFunction = (childData) => {
    setLoggedIn(childData);
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <LoadingProvider>
      <Router>
        <GlobalLoadingSpinner />
        <MainApp
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          callbackFunction={callbackFunction}
        />
      </Router>
    </LoadingProvider>
  );
};

export default App;
