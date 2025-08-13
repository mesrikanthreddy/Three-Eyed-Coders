/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Avatar,
} from '@mui/material';
import {
  AutoFixHigh as AIIcon,
  Code as CodeIcon,
  BugReport as BugIcon,
  Security as SecurityIcon,
  Description as DocsIcon,
  Lightbulb as SuggestionIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Send as SendIcon,
  AutoAwesome as SmartIcon,
  Psychology as BrainIcon,
  ExpandMore as ExpandMoreIcon,
  ContentCopy as CopyIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from '@mui/icons-material';

const AIAssistant = ({ isOpen, onClose, currentCode, projectContext }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [codeReview, setCodeReview] = useState(null);
  const [documentation, setDocumentation] = useState('');
  const [activeTab, setActiveTab] = useState('assistant');
  const [conversationHistory, setConversationHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Simulated AI responses for demo purposes
  const aiResponses = {
    codeCompletion: [
      {
        id: 1,
        type: 'completion',
        suggestion: 'const handleSubmit = async (event) => {\n  event.preventDefault();\n  setLoading(true);\n  try {\n    const response = await fetch(\'/api/submit\', {\n      method: \'POST\',\n      headers: { \'Content-Type\': \'application/json\' },\n      body: JSON.stringify(formData)\n    });\n    const result = await response.json();\n    // Handle success\n  } catch (error) {\n    console.error(\'Error:\', error);\n  } finally {\n    setLoading(false);\n  }\n};',
        confidence: 0.95,
        description: 'Async form submission handler with error handling'
      },
      {
        id: 2,
        type: 'optimization',
        suggestion: 'Use React.memo() to prevent unnecessary re-renders',
        confidence: 0.88,
        description: 'Performance optimization suggestion'
      },
      {
        id: 3,
        type: 'security',
        suggestion: 'Add input validation and sanitization',
        confidence: 0.92,
        description: 'Security enhancement recommendation'
      }
    ],
    codeReview: {
      overall: 'B+',
      issues: [
        {
          type: 'warning',
          severity: 'medium',
          line: 45,
          message: 'Consider using useCallback to memoize this function',
          suggestion: 'const memoizedFunction = useCallback(() => { ... }, [dependencies]);'
        },
        {
          type: 'error',
          severity: 'high',
          line: 78,
          message: 'Potential XSS vulnerability: Unescaped user input',
          suggestion: 'Use DOMPurify.sanitize() or escape HTML entities'
        },
        {
          type: 'info',
          severity: 'low',
          line: 23,
          message: 'Consider extracting this logic into a custom hook',
          suggestion: 'Create a useFormValidation hook for reusability'
        }
      ],
      metrics: {
        complexity: 7.2,
        maintainability: 8.1,
        security: 6.8,
        performance: 7.9
      }
    }
  };

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    const userMessage = { type: 'user', content: query, timestamp: new Date() };
    setConversationHistory(prev => [...prev, userMessage]);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(query);
      const aiMessage = { type: 'ai', content: aiResponse, timestamp: new Date() };
      setConversationHistory(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setQuery('');
    }, 1500);
  };

  const generateAIResponse = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('optimize') || lowerQuery.includes('performance')) {
      return {
        type: 'optimization',
        title: 'Performance Optimization Suggestions',
        content: 'Here are some ways to optimize your React component:\n\n1. Use React.memo() for expensive components\n2. Implement useCallback for event handlers\n3. Consider code splitting with React.lazy()\n4. Optimize bundle size with tree shaking',
        code: 'const OptimizedComponent = React.memo(({ data }) => {\n  const handleClick = useCallback(() => {\n    // Event handler logic\n  }, []);\n  \n  return <div onClick={handleClick}>{data}</div>;\n});'
      };
    }
    
    if (lowerQuery.includes('security') || lowerQuery.includes('vulnerability')) {
      return {
        type: 'security',
        title: 'Security Best Practices',
        content: 'Security recommendations for your code:\n\n1. Sanitize all user inputs\n2. Use HTTPS for all API calls\n3. Implement proper authentication\n4. Validate data on both client and server',
        code: 'import DOMPurify from \'dompurify\';\n\nconst sanitizedInput = DOMPurify.sanitize(userInput);'
      };
    }
    
    if (lowerQuery.includes('test') || lowerQuery.includes('testing')) {
      return {
        type: 'testing',
        title: 'Testing Recommendations',
        content: 'Here\'s how to improve your testing strategy:\n\n1. Write unit tests for utility functions\n2. Add integration tests for user flows\n3. Use React Testing Library for component tests\n4. Implement E2E tests with Cypress',
        code: 'import { render, screen, fireEvent } from \'@testing-library/react\';\n\ntest(\'should handle form submission\', () => {\n  render(<MyComponent />);\n  fireEvent.click(screen.getByRole(\'button\'));\n  expect(screen.getByText(\'Success\')).toBeInTheDocument();\n});'
      };
    }
    
    return {
      type: 'general',
      title: 'AI Assistant Response',
      content: 'I can help you with code optimization, security reviews, testing strategies, documentation generation, and more. What specific aspect would you like to focus on?',
      suggestions: [
        'Optimize this component for performance',
        'Review this code for security issues',
        'Generate tests for this function',
        'Create documentation for this API'
      ]
    };
  };

  const runCodeReview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCodeReview(aiResponses.codeReview);
      setIsLoading(false);
    }, 2000);
  };

  const generateDocumentation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDocumentation(`# Three Eyed Coders - AI Assistant

## Overview
The AI Assistant provides intelligent code suggestions, automated code reviews, and documentation generation to enhance developer productivity.

## Features

### 🤖 Code Completion
- Context-aware code suggestions
- Multi-language support
- Real-time error detection

### 🔍 Smart Code Review
- Automated quality analysis
- Security vulnerability detection
- Performance optimization suggestions

### 📚 Documentation Generation
- Auto-generated API documentation
- Code comments and explanations
- Tutorial creation assistance

## Usage

\`\`\`javascript
// Example: Using the AI Assistant for code completion
const aiSuggestion = await aiAssistant.getCodeCompletion({
  context: currentCode,
  language: 'javascript',
  intent: 'function'
});
\`\`\`

## API Reference

### Methods
- \`getCodeCompletion(options)\` - Get intelligent code suggestions
- \`reviewCode(code)\` - Perform automated code review
- \`generateDocs(codebase)\` - Generate documentation

Generated by AI Assistant on ${new Date().toLocaleDateString()}`);
      setIsLoading(false);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <ErrorIcon />;
      case 'medium': return <WarningIcon />;
      case 'low': return <CheckIcon />;
      default: return <CheckIcon />;
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  if (!isOpen) return null;

  return (
    <Card
      sx={{
        position: 'fixed',
        right: 20,
        top: 80,
        width: 450,
        height: 600,
        zIndex: 1300,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 32, height: 32 }}>
                <BrainIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700}>
                AI Assistant
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              ×
            </IconButton>
          </Box>
          
          {/* Tab Navigation */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {[
              { id: 'assistant', label: 'Chat', icon: <SmartIcon /> },
              { id: 'review', label: 'Review', icon: <BugIcon /> },
              { id: 'docs', label: 'Docs', icon: <DocsIcon /> }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'contained' : 'text'}
                size="small"
                startIcon={tab.icon}
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  color: 'white',
                  bgcolor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  minWidth: 'auto',
                  px: 2,
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'assistant' && (
            <>
              {/* Chat History */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {conversationHistory.length === 0 ? (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <AIIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      AI Assistant Ready
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ask me about code optimization, security reviews, testing, or documentation.
                    </Typography>
                    
                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      {[
                        'Optimize my React component',
                        'Review code for security',
                        'Generate unit tests',
                        'Create API documentation'
                      ].map((suggestion, index) => (
                        <Chip
                          key={index}
                          label={suggestion}
                          size="small"
                          onClick={() => setQuery(suggestion)}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </Box>
                ) : (
                  conversationHistory.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '80%',
                          p: 2,
                          borderRadius: 2,
                          bgcolor: message.type === 'user' 
                            ? 'primary.main' 
                            : 'rgba(0,0,0,0.05)',
                          color: message.type === 'user' ? 'white' : 'text.primary'
                        }}
                      >
                        {message.type === 'ai' && message.content.type ? (
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              {message.content.title}
                            </Typography>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
                              {message.content.content}
                            </Typography>
                            {message.content.code && (
                              <Box
                                sx={{
                                  bgcolor: 'rgba(0,0,0,0.8)',
                                  color: 'white',
                                  p: 1,
                                  borderRadius: 1,
                                  fontFamily: 'monospace',
                                  fontSize: '0.8rem',
                                  overflow: 'auto'
                                }}
                              >
                                <pre>{message.content.code}</pre>
                              </Box>
                            )}
                            {message.content.suggestions && (
                              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {message.content.suggestions.map((suggestion, idx) => (
                                  <Chip
                                    key={idx}
                                    label={suggestion}
                                    size="small"
                                    onClick={() => setQuery(suggestion)}
                                    sx={{ cursor: 'pointer' }}
                                  />
                                ))}
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            {typeof message.content === 'string' ? message.content : message.content.content}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))
                )}
                <div ref={chatEndRef} />
              </Box>

              {/* Input Area */}
              <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Ask AI Assistant..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                    disabled={isLoading}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendQuery}
                    disabled={isLoading || !query.trim()}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
                {isLoading && <LinearProgress sx={{ mt: 1 }} />}
              </Box>
            </>
          )}

          {activeTab === 'review' && (
            <Box sx={{ p: 2, overflow: 'auto' }}>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SecurityIcon />}
                  onClick={runCodeReview}
                  disabled={isLoading}
                  fullWidth
                >
                  Run Smart Code Review
                </Button>
                {isLoading && <LinearProgress sx={{ mt: 1 }} />}
              </Box>

              {codeReview && (
                <Box>
                  {/* Overall Grade */}
                  <Card sx={{ mb: 2, bgcolor: 'rgba(102, 126, 234, 0.1)' }}>
                    <CardContent>
                      <Typography variant="h4" color="primary" gutterBottom>
                        Grade: {codeReview.overall}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Overall code quality assessment
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Metrics */}
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Quality Metrics
                      </Typography>
                      {Object.entries(codeReview.metrics).map(([key, value]) => (
                        <Box key={key} sx={{ mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {key}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {value}/10
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={value * 10}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: value >= 8 ? 'success.main' : value >= 6 ? 'warning.main' : 'error.main'
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Issues */}
                  <Typography variant="h6" gutterBottom>
                    Issues Found ({codeReview.issues.length})
                  </Typography>
                  {codeReview.issues.map((issue, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                          <Badge
                            badgeContent={issue.severity}
                            color={getSeverityColor(issue.severity)}
                          >
                            {getSeverityIcon(issue.severity)}
                          </Badge>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            Line {issue.line}: {issue.message}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Suggestion:
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: 'rgba(0,0,0,0.05)',
                            p: 1,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                            fontSize: '0.8rem'
                          }}
                        >
                          {issue.suggestion}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {activeTab === 'docs' && (
            <Box sx={{ p: 2, overflow: 'auto' }}>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<DocsIcon />}
                  onClick={generateDocumentation}
                  disabled={isLoading}
                  fullWidth
                >
                  Generate Documentation
                </Button>
                {isLoading && <LinearProgress sx={{ mt: 1 }} />}
              </Box>

              {documentation && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      Generated Documentation
                    </Typography>
                    <Tooltip title="Copy to clipboard">
                      <IconButton
                        size="small"
                        onClick={() => navigator.clipboard.writeText(documentation)}
                      >
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.05)',
                      p: 2,
                      borderRadius: 2,
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      whiteSpace: 'pre-wrap',
                      maxHeight: 400,
                      overflow: 'auto'
                    }}
                  >
                    {documentation}
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button size="small" startIcon={<ThumbUpIcon />}>
                      Helpful
                    </Button>
                    <Button size="small" startIcon={<ThumbDownIcon />}>
                      Needs Work
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
