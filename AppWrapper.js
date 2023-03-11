import { AuthProvider } from './src/LoginCredencial/context/AuthContext';
import App from './App'

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;