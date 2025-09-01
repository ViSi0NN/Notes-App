import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../components/dashboard/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;