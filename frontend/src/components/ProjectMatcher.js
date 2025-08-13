/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  Container,
  CircularProgress,
  IconButton,
  Fade,
  LinearProgress,
  Avatar,
  Rating,
  Tooltip,
  Badge,
  Paper,
  Divider,
  Alert,
  Link,
  Skeleton,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as AIIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  ForkRight as ForkIcon,
  BugReport as IssueIcon,
  Lightbulb as LightbulbIcon,
  EmojiObjects as IdeaIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import githubService from '../services/githubService';
import consultantService from '../services/consultantService';

const ProjectMatcher = ({ userSkills = [], userExperience = 'intermediate', preferences = {} }) => {
  // Tab management
  const [activeTab, setActiveTab] = useState(0);
  
  // Project search state
  const [recommendations, setRecommendations] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState(new Set());
  
  // Consultant search state
  const [consultants, setConsultants] = useState([]);
  const [favoriteConsultants, setFavoriteConsultants] = useState(new Set());
  
  // Search filters
  const [searchFilters, setSearchFilters] = useState({
    skills: userSkills,
    budget: null,
    availability: null,
    location: '',
    projectType: '',
    experience: null,
    rating: null
  });
  
  // Common state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Run AI matching for projects
  const runAIMatching = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const projects = await githubService.searchProjects(searchFilters.skills, userExperience, preferences);
      
      if (projects.length === 0) {
        setError('No matching projects found. Try adjusting your skills or preferences.');
        return;
      }
      
      setRecommendations(projects);
    } catch (err) {
      console.error('GitHub API error:', err);
      setError('Failed to fetch project recommendations. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Search for consultants
  const searchConsultants = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await consultantService.searchConsultants(searchFilters);
      
      if (results.length === 0) {
        setError('No matching consultants found. Try adjusting your search criteria.');
        return;
      }
      
      setConsultants(results);
    } catch (err) {
      console.error('Consultant search error:', err);
      setError('Failed to search consultants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
    if (newValue === 0 && recommendations.length === 0) {
      // Auto-search projects when switching to projects tab
      runAIMatching();
    } else if (newValue === 1 && consultants.length === 0) {
      // Auto-search consultants when switching to consultants tab
      searchConsultants();
    }
  };

  // Handle search filter changes
  const handleFilterChange = (filterName, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Execute search based on active tab
  const executeSearch = () => {
    if (activeTab === 0) {
      runAIMatching();
    } else {
      searchConsultants();
    }
  };

  // AI-powered matching algorithm simulation
  const calculateMatchScore = (project, userSkills, userExperience) => {
    let score = 0;
    
    // Skill matching (40% weight)
    const skillMatches = project.technologies.filter(tech => 
      userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()))
    ).length;
    const skillScore = (skillMatches / project.technologies.length) * 40;
    score += skillScore;
    
    // Experience level matching (30% weight)
    const experienceLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const userLevel = experienceLevels[userExperience] || 2;
    const projectLevel = experienceLevels[project.difficulty] || 2;
    const experienceScore = Math.max(0, 30 - Math.abs(userLevel - projectLevel) * 10);
    score += experienceScore;
    
    // Project popularity and activity (20% weight)
    const popularityScore = Math.min(20, (project.stars / 10) + (project.contributors / 2));
    score += popularityScore;
    
    // AI impact score (10% weight)
    const impactScore = (project.aiInsights.impactScore / 10) * 10;
    score += impactScore;
    
    return Math.min(100, Math.round(score));
  };



  const toggleFavorite = (projectId) => {
    setFavoriteProjects(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const toggleFavoriteConsultant = (consultantId) => {
    setFavoriteConsultants(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(consultantId)) {
        newFavorites.delete(consultantId);
      } else {
        newFavorites.add(consultantId);
      }
      return newFavorites;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  useEffect(() => {
    if (userSkills.length > 0) {
      runAIMatching();
    }
  }, [userSkills, userExperience]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: 56,
              height: 56,
            }}
          >
            <AIIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800,
            }}
          >
            AI Project Matcher
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Discover projects perfectly matched to your skills and interests
        </Typography>
        
        {recommendations.length > 0 && (
          <Alert
            icon={<LightbulbIcon />}
            severity="success"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}
          >
            AI found {recommendations.length} GitHub projects perfectly matched to your skills!
          </Alert>
        )}
      </Box>

      {/* User Skills Display */}
      {userSkills.length > 0 && (
        <Card sx={{ mb: 4, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CodeIcon color="primary" />
              Your Skills Profile
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {userSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Experience Level: <Chip label={userExperience} size="small" color={getDifficultyColor(userExperience)} />
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AIIcon className="pulse" />
            AI is analyzing perfect matches for you...
          </Typography>
          <LinearProgress sx={{ mb: 2, height: 6, borderRadius: 3 }} />
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={32} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Project Recommendations */}
      {!isLoading && recommendations.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <IdeaIcon color="primary" />
            AI-Recommended Projects
          </Typography>
          
          <Grid container spacing={3}>
            {recommendations.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card
                  className="floating"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: index === 0 ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  {/* Match Score Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      bgcolor: index === 0 ? 'success.main' : 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      zIndex: 1,
                    }}
                  >
                    {project.aiMatchScore}% Match
                  </Box>

                  {index === 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: 16,
                        bgcolor: 'warning.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <StarIcon sx={{ fontSize: 16 }} />
                      Best Match
                    </Box>
                  )}

                  <CardContent sx={{ flex: 1, pt: 3 }}>
                    {/* Project Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ flex: 1, mr: 1 }}>
                        {project.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(project.id)}
                        sx={{ color: favoriteProjects.has(project.id) ? 'error.main' : 'text.secondary' }}
                      >
                        {favoriteProjects.has(project.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {project.description}
                    </Typography>

                    {/* AI Insights */}
                    <Box
                      sx={{
                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                        p: 2,
                        borderRadius: 2,
                        mb: 2,
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AIIcon sx={{ fontSize: 16 }} />
                        AI Insights
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {project.aiInsights.matchReason}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Learn: {project.aiInsights.learningOpportunities.join(', ')}
                      </Typography>
                    </Box>

                    {/* Technologies */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Technologies
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            variant={userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase())) ? 'filled' : 'outlined'}
                            color={userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase())) ? 'primary' : 'default'}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* GitHub Stats */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label={project.difficulty}
                        size="small"
                        color={getDifficultyColor(project.difficulty)}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2">{project.stars}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ForkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{project.forks}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IssueIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{project.openIssues}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{project.estimatedTime}</Typography>
                      </Box>
                    </Box>

                    {/* GitHub Maintainer */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Avatar src={project.maintainer.avatar} sx={{ width: 24, height: 24 }}>
                        <PersonIcon sx={{ fontSize: 14 }} />
                      </Avatar>
                      <Link href={project.maintainer.url} target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
                        <Typography variant="body2" color="primary">
                          {project.maintainer.name}
                        </Typography>
                      </Link>
                      <Rating value={project.maintainer.reputation} size="small" readOnly precision={0.1} />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* GitHub Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<GitHubIcon />}
                        sx={{ flex: 1 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        View on GitHub
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LaunchIcon />}
                        sx={{ flex: 1 }}
                        onClick={() => window.open(project.cloneUrl, '_blank')}
                      >
                        Clone Repo
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Refresh Button */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={runAIMatching}
              disabled={isLoading}
            >
              Find More GitHub Projects
            </Button>
          </Box>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={runAIMatching}
            disabled={isLoading}
          >
            Try Again
          </Button>
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && !error && recommendations.length === 0 && userSkills.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <GitHubIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Ready to Find Your Perfect GitHub Project?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add your skills to get AI-powered GitHub project recommendations tailored just for you.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<AIIcon />}
            onClick={runAIMatching}
          >
            Start AI Matching
          </Button>
        </Box>
      )}

      {/* No Results State */}
      {!isLoading && !error && recommendations.length === 0 && userSkills.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AssessmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Matching Projects Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your skills or experience level, or check back later for new projects.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<RefreshIcon />}
            onClick={runAIMatching}
          >
            Search Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectMatcher;
