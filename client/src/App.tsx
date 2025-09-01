import  { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAppDispatch } from './hooks/redux';
import { initializeAuth } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // This action checks localStorage for a token on every app load
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <Router>
      <div className="bg-brand-light-gray min-h-screen">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;