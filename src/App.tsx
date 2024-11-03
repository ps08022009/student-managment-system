import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from '@/components/Dashboard';
import { VolunteerProvider } from '@/contexts/VolunteerContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <VolunteerProvider>
        <div className="min-h-screen bg-background">
          <Dashboard />
          <Toaster />
        </div>
      </VolunteerProvider>
    </ThemeProvider>
  );
}

export default App;