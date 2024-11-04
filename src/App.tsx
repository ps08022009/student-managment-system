import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from '@/components/Dashboard';
import { VolunteerProvider } from '@/contexts/VolunteerContext';
import LoginScreen from '@/components/Login'; 
import './style.css'; // Importing the Tailwind CSS file

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <VolunteerProvider>
        <div className="min-h-screen bg-background">
          {!isLoggedIn ? ( 
            <LoginScreen onLogin={handleLogin} />
          ) : (
            <>
              <Dashboard />
              <Toaster />
            </>
          )}
        </div>
      </VolunteerProvider>
    </ThemeProvider>
  );
}

export default App;
