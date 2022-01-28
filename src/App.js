import logo from './logo.svg';
import './App.css';
import { Search } from './components/Search';
import { Publications } from './components/Publications';
import { Login, RequireAuth } from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <div className="App">
      <header>
        Congility
      </header>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Search />
              <Publications />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>        
      </AuthProvider>
      
    </div>
  );
}

export default App;
