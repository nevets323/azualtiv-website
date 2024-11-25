import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Models from './pages/Models';
import FanArt from './pages/FanArt';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import { AuthProvider } from './utils/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/fanart" element={<FanArt />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;