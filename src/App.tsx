import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Task from './pages/Task';

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
      setTimeout(() => {
        if (preloader) {
          preloader.style.display = 'none';
        }
      }, 500);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return isAuthenticated ? (
    <>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/ecommerce" element={<ECommerce />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  ) : <></>;
}

export default App;
