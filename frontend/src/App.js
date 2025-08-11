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
  Switch,
  FormControlLabel,
  CircularProgress,
  Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Create a theme function
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#2e7d32', // Green color for tech theme
    },
    secondary: {
      main: '#1976d2', // Blue color
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        }
      : {
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      marginBottom: '1rem',
    },
    h2: {
      fontWeight: 600,
      marginBottom: '0.75rem',
    },
    h3: {
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.primary.main,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
  },
}));

const CardBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
  
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Projects', icon: <CodeIcon />, path: '/projects' },
    { text: 'Tutorials', icon: <SchoolIcon />, path: '/tutorials' },
    { text: 'Playground', icon: <ScienceIcon />, path: '/playground' },
  ];
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        Three Eyed Coders
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
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
                  {navItems.map((item) => (
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
              <Route path="/" element={<Home setLoading={setLoading} />} />
              <Route path="/projects" element={<Projects setLoading={setLoading} />} />
              <Route path="/tutorials" element={<Tutorials setLoading={setLoading} />} />
              <Route path="/playground" element={<Playground setLoading={setLoading} />} />
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
      </Router>
    </ThemeProvider>
  );
}

function Home({ setLoading }) {
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
          py: { xs: 4, md: 6 }, 
          mb: 6, 
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          borderRadius: 3
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Three Eyed Coders
        </Typography>
        <Typography variant="h5" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          An open-source platform for contributing to and learning new technologies. Join our community of developers, share knowledge, and build amazing projects together.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleExploreProjects}
            sx={{ px: 4, py: 1.5 }}
          >
            Explore Projects
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            onClick={handleStartLearning}
            sx={{ px: 4, py: 1.5 }}
          >
            Start Learning
          </Button>
        </Box>
      </CardBox>
      
      {/* Features Section */}
      <Typography variant="h2" align="center" sx={{ mb: 4 }}>
        What We Offer
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 6 }}>
        <FeatureCard>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CodeIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" align="center" gutterBottom>
            Community Projects
          </Typography>
          <Typography align="center" paragraph>
            Explore and contribute to a wide range of open-source projects created by our community members.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              component={RouterLink} 
              to="/projects"
              sx={{ px: 3 }}
            >
              View Projects
            </Button>
          </Box>
        </FeatureCard>
        
        <FeatureCard>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" align="center" gutterBottom>
            Structured Learning
          </Typography>
          <Typography align="center" paragraph>
            Follow guided tutorials and learning paths to master new technologies at your own pace.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              component={RouterLink} 
              to="/tutorials"
              sx={{ px: 3 }}
            >
              Start Learning
            </Button>
          </Box>
        </FeatureCard>
        
        <FeatureCard>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ScienceIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" align="center" gutterBottom>
            Interactive Playground
          </Typography>
          <Typography align="center" paragraph>
            Experiment with code directly in your browser with our interactive coding playground.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              component={RouterLink} 
              to="/playground"
              sx={{ px: 3 }}
            >
              Try Playground
            </Button>
          </Box>
        </FeatureCard>
      </Box>
      
      {/* Stats Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Our Community
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
          <CardBox sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700 }}>
              150+
            </Typography>
            <Typography variant="h6">
              Projects
            </Typography>
          </CardBox>
          <CardBox sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700 }}>
              50+
            </Typography>
            <Typography variant="h6">
              Tutorials
            </Typography>
          </CardBox>
          <CardBox sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700 }}>
              2000+
            </Typography>
            <Typography variant="h6">
              Developers
            </Typography>
          </CardBox>
        </Box>
      </Box>
      
      {/* Call to Action */}
      <CardBox sx={{ textAlign: 'center', py: 4, borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" paragraph sx={{ mb: 3 }}>
          Join our community today and start your journey in technology learning and contribution.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            href="https://github.com/three-eyed-coders"
            sx={{ px: 4, py: 1.5 }}
          >
            Contribute on GitHub
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            component={RouterLink} 
            to="/playground"
            sx={{ px: 4, py: 1.5 }}
          >
            Try Playground
          </Button>
        </Box>
      </CardBox>
    </Box>
  );
}

function Projects({ setLoading }) {
  const [projects, setProjects] = useState([
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
  const [tutorials, setTutorials] = useState([
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

export default App;
