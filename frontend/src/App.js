/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Link, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Button, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  styled, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  FormControlLabel,
  CircularProgress,
  Fade,
  TextField,
  Card,
  CardContent,
  Checkbox,
  Alert,
  Paper,
  Fab,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import LoginIcon from '@mui/icons-material/Login';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Psychology from '@mui/icons-material/Psychology';
import SmartToy from '@mui/icons-material/SmartToy';

// Import AI components
import AIAssistant from './components/AIAssistant';
import ProjectMatcher from './components/ProjectMatcher';
import aiCodeAnalysis from './services/aiCodeAnalysis';

// Create a modern theme function with enhanced styling
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#667eea',
      light: '#8fa7f3',
      dark: '#4a56cc',
    },
    secondary: {
      main: '#764ba2',
      light: '#9a6bc7',
      dark: '#533471',
    },
    success: {
      main: '#4facfe',
      light: '#7bc8ff',
      dark: '#2e7bcc',
    },
    ...(mode === 'light'
      ? {
          background: {
            default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            paper: 'rgba(255, 255, 255, 0.95)',
          },
        }
      : {
          background: {
            default: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            paper: 'rgba(30, 30, 30, 0.95)',
          },
        }),
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontWeight: 700,
      marginBottom: '1rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      marginBottom: '0.75rem',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Modern styled components with glassmorphism and enhanced effects
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  color: theme.palette.primary.main,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  borderRadius: '12px',
  padding: '8px 16px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const CardBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'conic-gradient(from 0deg, transparent, rgba(102, 126, 234, 0.1), transparent)',
    animation: 'rotate 4s linear infinite',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
  },
  '&:hover::after': {
    opacity: 1,
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // AI Assistant states
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [userSkills, setUserSkills] = useState(['React', 'JavaScript', 'TypeScript', 'Node.js']);
  const [userExperience, setUserExperience] = useState('intermediate');
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const theme = createAppTheme(darkMode ? 'dark' : 'light');
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };
  
  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Projects', icon: <CodeIcon />, path: '/projects' },
    { text: 'Tutorials', icon: <SchoolIcon />, path: '/tutorials' },
    { text: 'Playground', icon: <ScienceIcon />, path: '/playground' },
    { text: 'AI Matcher', icon: <Psychology />, path: '/ai-matcher' },
    { text: 'Login', icon: <LoginIcon />, path: '/login' },
  ];
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        Three Eyed Coders
      </Typography>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            sx={{ py: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Header with Navigation */}
          <StyledAppBar position="static">
            <Container maxWidth="lg">
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1, display: { md: 'none' } }}
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                    Three Eyed Coders
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                  {navigationItems.map((item) => (
                    <NavButton 
                      key={item.text}
                      component={RouterLink} 
                      to={item.path} 
                      startIcon={item.icon}
                    >
                      {item.text}
                    </NavButton>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    color="inherit" 
                    onClick={handleThemeToggle}
                    aria-label="toggle dark mode"
                  >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </StyledAppBar>
          
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Loading overlay */}
          <Fade in={loading} style={{ pointerEvents: 'none' }}>
            <Box 
              sx={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                zIndex: 9999 
              }}
            >
              <CircularProgress size={60} thickness={4} />
            </Box>
          </Fade>
          
          {/* Main Content */}
          <Container component="main" sx={{ flex: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<Home setAiAssistantOpen={setAiAssistantOpen} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/ai-matcher" element={
                <ProjectMatcher 
                  userSkills={userSkills} 
                  userExperience={userExperience}
                  preferences={{}}
                />
              } />
              <Route path="/login" element={<Login setLoading={setLoading} />} />
            </Routes>
          </Container>
          
          {/* Footer */}
          <Box 
            component="footer" 
            sx={{ 
              bgcolor: darkMode ? 'grey.900' : 'grey.800', 
              color: 'white', 
              py: 3,
              mt: 'auto'
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">
                  © {new Date().getFullYear()} Three Eyed Coders Community.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link href="https://github.com/three-eyed-coders" color="inherit" underline="hover">
                    GitHub
                  </Link>
                  <Link href="#" color="inherit" underline="hover">
                    Documentation
                  </Link>
                  <Link href="#" color="inherit" underline="hover">
                    Community
                  </Link>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>

        {/* AI Assistant Floating Action Button */}
        <Tooltip title="Open AI Assistant" placement="left">
          <Fab
            color="primary"
            onClick={() => setAiAssistantOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'scale(1.1)',
                boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="pulse"
          >
            <SmartToy />
          </Fab>
        </Tooltip>

        {/* AI Assistant Component */}
        <AIAssistant
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          currentCode={currentCode}
          projectContext={{
            userSkills,
            userExperience,
            currentProject: null
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

function Home({ setAiAssistantOpen, setLoading }) {
  const handleExploreProjects = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.hash = '#/projects';
      setLoading(false);
    }, 800);
  };
  
  const handleStartLearning = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.hash = '#/tutorials';
      setLoading(false);
    }, 800);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <CardBox 
        sx={{ 
          textAlign: 'center', 
          py: { xs: 6, md: 8 }, 
          mb: 6, 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            animation: 'float 6s ease-in-out infinite',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }}
        className="floating"
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            mb: 3,
            textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}
          className="pulse"
        >
          Welcome to Three Eyed Coders
        </Typography>
        <Typography 
          variant="h5" 
          paragraph 
          sx={{ 
            mb: 4, 
            maxWidth: '800px', 
            mx: 'auto',
            color: 'text.secondary',
            fontWeight: 400,
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          An innovative open-source platform for contributing to and learning cutting-edge technologies. Join our community of developers, share knowledge, and build the future together.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleExploreProjects}
            className="micro-bounce"
            sx={{ 
              px: 5, 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              '&:hover::before': {
                left: '100%',
              },
            }}
          >
            🚀 Explore Projects
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={handleStartLearning}
            className="micro-bounce"
            sx={{ 
              px: 5, 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
              color: '#667eea',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: -1,
              },
              '&:hover': {
                transform: 'translateY(-3px)',
                color: 'white',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)',
              },
              '&:hover::before': {
                opacity: 1,
              },
            }}
          >
            📚 Start Learning
          </Button>
        </Box>
      </CardBox>
      
      {/* AI Features Highlight */}
      <CardBox 
        sx={{ 
          textAlign: 'center', 
          py: 4, 
          mb: 6,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(102, 126, 234, 0.2)',
        }}
        className="floating"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
          <SmartToy sx={{ fontSize: 48, color: 'primary.main' }} className="pulse" />
          <Typography 
            variant="h4" 
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800,
            }}
          >
            🤖 AI-Powered Development
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: '800px', mx: 'auto' }}>
          Experience the future of coding with our integrated AI assistant that provides intelligent code suggestions, 
          automated reviews, and personalized project recommendations.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<AutoAwesome />}
            onClick={() => setAiAssistantOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Try AI Assistant
          </Button>
          <Button
            variant="outlined"
            startIcon={<Psychology />}
            component={RouterLink}
            to="/ai-matcher"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            AI Project Matcher
          </Button>
        </Box>
      </CardBox>

      {/* Features Section */}
      <Typography 
        variant="h3" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}
      >
        ✨ Why Choose Three Eyed Coders?
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4, mb: 8 }}>
        <FeatureCard className="floating">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              mx: 'auto',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
              },
            }}
          >
            <CodeIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Open Source Projects
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            Contribute to cutting-edge projects and collaborate with developers worldwide. Build your portfolio while making a real impact on the tech community.
          </Typography>
        </FeatureCard>
        
        <FeatureCard className="floating" sx={{ animationDelay: '0.2s' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              mx: 'auto',
              boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(-5deg)',
                boxShadow: '0 15px 35px rgba(79, 172, 254, 0.4)',
              },
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Learn & Grow
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            Access comprehensive tutorials, interactive documentation, and mentorship opportunities to accelerate your coding journey and master new technologies.
          </Typography>
        </FeatureCard>
        
        <FeatureCard className="floating" sx={{ animationDelay: '0.4s' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              mx: 'auto',
              boxShadow: '0 8px 25px rgba(250, 112, 154, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
                boxShadow: '0 15px 35px rgba(250, 112, 154, 0.4)',
              },
            }}
          >
            <ScienceIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            🧪 Experiment & Innovate
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            Use our advanced playground environment to test innovative ideas, experiment with emerging technologies, and prototype next-generation solutions.
          </Typography>
        </FeatureCard>
      </Box>
      
      {/* Enhanced Stats Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{
            mb: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          🌟 Our Growing Community
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 4 }}>
          <CardBox 
            className="floating"
            sx={{ 
              textAlign: 'center', 
              py: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              },
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
              className="pulse"
            >
              250+
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                fontWeight: 600,
                opacity: 0.8,
              }}
            >
              🚀 Active Projects
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mt: 1,
                opacity: 0.6,
                fontSize: '0.875rem',
              }}
            >
              Open source contributions
            </Typography>
          </CardBox>
          
          <CardBox 
            className="floating"
            sx={{ 
              textAlign: 'center', 
              py: 4,
              position: 'relative',
              overflow: 'hidden',
              animationDelay: '0.2s',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              },
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
              className="pulse"
            >
              75+
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                fontWeight: 600,
                opacity: 0.8,
              }}
            >
              📚 Learning Tutorials
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mt: 1,
                opacity: 0.6,
                fontSize: '0.875rem',
              }}
            >
              Interactive learning paths
            </Typography>
          </CardBox>
          
          <CardBox 
            className="floating"
            sx={{ 
              textAlign: 'center', 
              py: 4,
              position: 'relative',
              overflow: 'hidden',
              animationDelay: '0.4s',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #fa709a 0%, #fee140 100%)',
              },
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
              className="pulse"
            >
              2.5K+
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                fontWeight: 600,
                opacity: 0.8,
              }}
            >
              👥 Community Members
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mt: 1,
                opacity: 0.6,
                fontSize: '0.875rem',
              }}
            >
              Global developer network
            </Typography>
          </CardBox>
        </Box>
      </Box>
      

      
      {/* Enhanced Call to Action */}
      <CardBox 
        sx={{ 
          textAlign: 'center', 
          py: 6, 
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
            animation: 'float 8s ease-in-out infinite',
          },
        }}
        className="floating"
      >
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          🚀 Ready to Start Your Journey?
        </Typography>
        <Typography 
          variant="h6" 
          paragraph 
          sx={{ 
            mb: 4, 
            maxWidth: '700px', 
            mx: 'auto',
            color: 'text.secondary',
            fontWeight: 400,
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          Join thousands of innovative developers who are already building the future, learning cutting-edge technologies, and growing their careers with Three Eyed Coders.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/projects"
            className="micro-bounce"
            sx={{ 
              px: 5, 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            🎯 Browse Projects
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={RouterLink} 
            to="/tutorials"
            className="micro-bounce"
            sx={{ 
              px: 5, 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '16px',
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
              color: '#667eea',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: -1,
              },
              '&:hover': {
                transform: 'translateY(-3px)',
                color: 'white',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)',
              },
              '&:hover::before': {
                opacity: 1,
              },
            }}
          >
            📖 Start Learning
          </Button>
        </Box>
      </CardBox>
    </Box>
  );
}

function Projects({ setLoading }) {
  const [projects] = useState([
    {
      id: 1,
      title: 'Linear Regression Demo',
      description: 'A simple demonstration of linear regression implementation from scratch and using scikit-learn.',
      language: 'Python',
      difficulty: 'Beginner',
      likes: 24,
      contributors: 5
    },
    {
      id: 2,
      title: 'Neural Network Visualizer',
      description: 'Interactive visualization tool for understanding how neural networks process information.',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      likes: 42,
      contributors: 8
    },
    {
      id: 3,
      title: 'Data Analysis Toolkit',
      description: 'Collection of utilities for data cleaning, transformation, and visualization.',
      language: 'Python',
      difficulty: 'Advanced',
      likes: 38,
      contributors: 12
    },
    {
      id: 4,
      title: 'Algorithm Playground',
      description: 'Interactive implementation of classic algorithms with visual explanations.',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      likes: 31,
      contributors: 7
    },
    {
      id: 5,
      title: 'Web Scraper Framework',
      description: 'Flexible framework for building web scrapers with built-in data processing.',
      language: 'Python',
      difficulty: 'Intermediate',
      likes: 29,
      contributors: 6
    },
    {
      id: 6,
      title: 'React Component Library',
      description: 'Collection of reusable React components with customizable themes.',
      language: 'JavaScript',
      difficulty: 'Advanced',
      likes: 56,
      contributors: 15
    }
  ]);
  
  const handleViewProject = (projectId) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Viewing project ${projectId}`);
    }, 800);
  };
  
  const handleContribute = () => {
    setLoading(true);
    // Simulate navigation
    setTimeout(() => {
      window.location.hash = '#/contribute';
      setLoading(false);
    }, 800);
  };
  
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Community Projects</Typography>
      <Typography variant="h6" paragraph sx={{ mb: 4 }}>
        Browse and contribute to projects created by our community members.
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {projects.map((project) => (
          <CardBox key={project.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5">{project.title}</Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {project.language}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {project.difficulty}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => handleViewProject(project.id)}
              >
                View Project
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                👍 {project.likes}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                👥 {project.contributors}
              </Typography>
            </Box>
          </CardBox>
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleContribute}
        >
          Contribute Your Project
        </Button>
      </Box>
    </Box>
  );
}

function Tutorials({ setLoading }) {
  const [tutorials] = useState([
    {
      id: 1,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning concepts, algorithms, and practical applications.',
      lessons: 12,
      level: 'Beginner',
      progress: 0
    },
    {
      id: 2,
      title: 'React Fundamentals',
      description: 'Learn the core concepts of React including components, state, and props.',
      lessons: 18,
      level: 'Beginner',
      progress: 35
    },
    {
      id: 3,
      title: 'Cloud Computing Basics',
      description: 'Deploy and manage applications on cloud platforms like AWS and Azure.',
      lessons: 10,
      level: 'Intermediate',
      progress: 70
    },
    {
      id: 4,
      title: 'Data Science with Python',
      description: 'Comprehensive guide to data analysis and visualization using Python libraries.',
      lessons: 15,
      level: 'Intermediate',
      progress: 0
    },
    {
      id: 5,
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript concepts and design patterns for scalable applications.',
      lessons: 20,
      level: 'Advanced',
      progress: 0
    },
    {
      id: 6,
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native.',
      lessons: 14,
      level: 'Intermediate',
      progress: 20
    }
  ]);
  
  const handleStartTutorial = (tutorialId) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Starting tutorial ${tutorialId}`);
    }, 800);
  };
  
  const handleViewAll = () => {
    setLoading(true);
    // Simulate navigation
    setTimeout(() => {
      window.location.hash = '#/all-tutorials';
      setLoading(false);
    }, 800);
  };
  
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Learning Tutorials</Typography>
      <Typography variant="h6" paragraph sx={{ mb: 4 }}>
        Follow structured tutorials to learn new technologies and enhance your skills.
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {tutorials.map((tutorial) => (
          <CardBox key={tutorial.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5">{tutorial.title}</Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              {tutorial.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {tutorial.lessons} Lessons
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tutorial.level}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => handleStartTutorial(tutorial.id)}
              >
                Start Tutorial
              </Button>
            </Box>
            {tutorial.progress > 0 && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Progress</Typography>
                  <Typography variant="caption">{tutorial.progress}%</Typography>
                </Box>
                <Box sx={{ height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${tutorial.progress}%`, 
                      bgcolor: 'primary.main', 
                      borderRadius: 4 
                    }} 
                  />
                </Box>
              </Box>
            )}
          </CardBox>
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleViewAll}
        >
          View All Tutorials
        </Button>
      </Box>
    </Box>
  );
}

function Playground({ setLoading }) {
  const [code, setCode] = useState(`// Example: Calculate factorial recursively
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120`);
  
  const [output, setOutput] = useState('');
  
  const algorithms = [
    { 
      name: 'Sorting Algorithms', 
      description: 'Bubble, Quick, Merge Sort',
      examples: ['bubbleSort', 'quickSort', 'mergeSort']
    },
    { 
      name: 'Search Algorithms', 
      description: 'Binary, Linear Search',
      examples: ['binarySearch', 'linearSearch']
    },
    { 
      name: 'Data Structures', 
      description: 'Stacks, Queues, Trees',
      examples: ['Stack', 'Queue', 'BinaryTree']
    }
  ];
  
  const handleRunCode = () => {
    setLoading(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('Output:\n120\n\nExecution time: 0.001s');
      setLoading(false);
    }, 1000);
  };
  
  const handleReset = () => {
    setCode('');
    setOutput('');
  };
  
  const handleLoadExample = (example) => {
    setLoading(true);
    
    // Simulate loading example
    setTimeout(() => {
      setCode(`// ${example} implementation\n// Your code here...`);
      setOutput('');
      setLoading(false);
    }, 500);
  };
  
  const handleExploreMore = () => {
    setLoading(true);
    // Simulate navigation
    setTimeout(() => {
      window.location.hash = '#/algorithms';
      setLoading(false);
    }, 800);
  };
  
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Interactive Playground</Typography>
      <Typography variant="h6" paragraph sx={{ mb: 4 }}>
        Experiment with code directly in your browser. Try out algorithms, test ideas, and learn by doing.
      </Typography>
      
      <CardBox>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ScienceIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h4">Code Editor</Typography>
        </Box>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 2, 
          mb: 2 
        }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Code</Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.100', 
              borderRadius: 1, 
              minHeight: '200px', 
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflow: 'auto'
            }}>
              {code}
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Output</Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.800', 
              color: 'grey.100',
              borderRadius: 1, 
              minHeight: '200px', 
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflow: 'auto'
            }}>
              {output || '// Run code to see output'}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleRunCode}
          >
            Run Code
          </Button>
        </Box>
      </CardBox>
      
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Sample Algorithms
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        {algorithms.map((algo, index) => (
          <CardBox key={index} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              {algo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ flex: 1 }}>
              {algo.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {algo.examples.map((example) => (
                <Button 
                  key={example}
                  variant="outlined" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }}
                  onClick={() => handleLoadExample(example)}
                >
                  {example}
                </Button>
              ))}
            </Box>
          </CardBox>
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleExploreMore}
        >
          Explore More Examples
        </Button>
      </Box>
    </Box>
  );
}

function Login({ setLoading }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Simulate login failure for demo
        if (formData.email === 'demo@example.com' && formData.password === 'password') {
          alert('Login successful! Welcome to Three Eyed Coders');
          window.location.hash = '#/';
        } else {
          setShowError(true);
        }
      }, 1500);
    }
  };

  const handleForgotPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Password reset link sent to your email!');
    }, 1000);
  };

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Redirecting to sign up page...');
    }, 800);
  };

  return (
    <Box sx={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Header Section */}
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #2e7d32 0%, #1976d2 100%)',
              color: 'white',
              py: 4,
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Sign in to your Three Eyed Coders account
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Error Alert */}
            {showError && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                onClose={() => setShowError(false)}
              >
                Invalid email or password. Try demo@example.com / password
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={handleForgotPassword}
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #2e7d32 0%, #1976d2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b5e20 0%, #1565c0 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>

              {/* Demo Credentials */}
              <Paper 
                sx={{ 
                  p: 2, 
                  mt: 2, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2,
                  border: '1px dashed',
                  borderColor: 'grey.300'
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Demo Credentials:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Email: demo@example.com
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Password: password
                </Typography>
              </Paper>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={handleSignUp}
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
