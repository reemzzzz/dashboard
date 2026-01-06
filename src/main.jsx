import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router'; 
import './index.css';
import ReactDOM from 'react-dom/client';
import { createAppRouter } from './router'; 
import { SnackbarProvider } from 'notistack';
import { AuthProvider, useAuth } from './contexts/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
function InnerApp(){
  const auth = useAuth();
  const router = createAppRouter(auth)

  return (
          <SnackbarProvider maxSnack={3}>
            <RouterProvider router={router} />
          </SnackbarProvider>
  )
}
root.render(
  <StrictMode>
      <AuthProvider>
       <InnerApp />
      </AuthProvider>
  </StrictMode>
);
