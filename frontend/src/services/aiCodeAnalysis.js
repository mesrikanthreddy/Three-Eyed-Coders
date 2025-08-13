/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

/**
 * AI Code Analysis Service
 * Provides intelligent code review, security scanning, and optimization suggestions
 */

class AICodeAnalysisService {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_AI_API_ENDPOINT || '/api/ai';
    this.models = {
      codeReview: 'gpt-4-code-review',
      security: 'security-scanner-v2',
      optimization: 'performance-optimizer',
      documentation: 'doc-generator'
    };
  }

  /**
   * Analyze code for quality, security, and performance issues
   * @param {string} code - The code to analyze
   * @param {string} language - Programming language
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeCode(code, language = 'javascript', options = {}) {
    try {
      // Simulate AI analysis for demo purposes
      await this.simulateProcessingDelay(2000);

      const analysis = {
        overall: this.calculateOverallGrade(code),
        metrics: this.calculateMetrics(code),
        issues: this.findIssues(code, language),
        suggestions: this.generateSuggestions(code, language),
        security: this.performSecurityScan(code),
        performance: this.analyzePerformance(code),
        maintainability: this.assessMaintainability(code),
        timestamp: new Date().toISOString()
      };

      return analysis;
    } catch (error) {
      console.error('AI Code Analysis Error:', error);
      throw new Error('Failed to analyze code. Please try again.');
    }
  }

  /**
   * Generate intelligent code completions and suggestions
   * @param {string} context - Current code context
   * @param {string} language - Programming language
   * @param {Object} options - Completion options
   * @returns {Promise<Array>} Code suggestions
   */
  async getCodeCompletions(context, language = 'javascript', options = {}) {
    try {
      await this.simulateProcessingDelay(800);

      const completions = this.generateCompletions(context, language, options);
      return completions.sort((a, b) => b.confidence - a.confidence);
    } catch (error) {
      console.error('Code Completion Error:', error);
      return [];
    }
  }

  /**
   * Generate documentation for code
   * @param {string} code - Code to document
   * @param {string} language - Programming language
   * @param {Object} options - Documentation options
   * @returns {Promise<string>} Generated documentation
   */
  async generateDocumentation(code, language = 'javascript', options = {}) {
    try {
      await this.simulateProcessingDelay(1500);

      const documentation = this.createDocumentation(code, language, options);
      return documentation;
    } catch (error) {
      console.error('Documentation Generation Error:', error);
      throw new Error('Failed to generate documentation.');
    }
  }

  /**
   * Perform security vulnerability scan
   * @param {string} code - Code to scan
   * @param {string} language - Programming language
   * @returns {Object} Security analysis results
   */
  performSecurityScan(code) {
    const vulnerabilities = [];
    const patterns = {
      xss: /innerHTML\s*=\s*[^;]+(?:req\.body|req\.query|req\.params)/gi,
      sqlInjection: /query\s*\(\s*["`'].*\$\{.*\}.*["`']\s*\)/gi,
      hardcodedSecrets: /(password|secret|key|token)\s*[:=]\s*["`'][^"`']+["`']/gi,
      unsafeEval: /eval\s*\(/gi,
      insecureRandom: /Math\.random\(\)/gi
    };

    Object.entries(patterns).forEach(([type, pattern]) => {
      const matches = [...code.matchAll(pattern)];
      matches.forEach(match => {
        vulnerabilities.push({
          type,
          severity: this.getVulnerabilitySeverity(type),
          line: this.getLineNumber(code, match.index),
          description: this.getVulnerabilityDescription(type),
          suggestion: this.getSecuritySuggestion(type)
        });
      });
    });

    return {
      score: Math.max(1, 10 - vulnerabilities.length * 1.5),
      vulnerabilities,
      recommendations: this.getSecurityRecommendations(vulnerabilities)
    };
  }

  /**
   * Analyze code performance
   * @param {string} code - Code to analyze
   * @returns {Object} Performance analysis
   */
  analyzePerformance(code) {
    const issues = [];
    const patterns = {
      inefficientLoop: /for\s*\([^)]*\)\s*\{[^}]*for\s*\([^)]*\)/gi,
      unnecessaryRerender: /useState\s*\([^)]*\)[^;]*;[^}]*return/gi,
      memoryLeak: /addEventListener\s*\([^)]*\)(?!.*removeEventListener)/gi,
      inefficientQuery: /querySelector(?:All)?\s*\([^)]*\)[^;]*;[^}]*querySelector/gi
    };

    Object.entries(patterns).forEach(([type, pattern]) => {
      const matches = [...code.matchAll(pattern)];
      matches.forEach(match => {
        issues.push({
          type,
          line: this.getLineNumber(code, match.index),
          impact: this.getPerformanceImpact(type),
          suggestion: this.getPerformanceSuggestion(type)
        });
      });
    });

    return {
      score: Math.max(1, 10 - issues.length * 0.8),
      issues,
      optimizations: this.getOptimizationSuggestions(code)
    };
  }

  /**
   * Assess code maintainability
   * @param {string} code - Code to assess
   * @returns {Object} Maintainability analysis
   */
  assessMaintainability(code) {
    const metrics = {
      complexity: this.calculateCyclomaticComplexity(code),
      duplicateCode: this.findDuplicateCode(code),
      functionLength: this.analyzeFunctionLength(code),
      naming: this.analyzeNamingConventions(code)
    };

    const score = this.calculateMaintainabilityScore(metrics);

    return {
      score,
      metrics,
      suggestions: this.getMaintainabilitySuggestions(metrics)
    };
  }

  // Helper methods for analysis

  calculateOverallGrade(code) {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
    const codeLength = code.length;
    const complexity = this.estimateComplexity(code);
    
    // Simple grading algorithm based on code characteristics
    let score = 85; // Base score
    
    if (codeLength > 5000) score -= 10;
    if (complexity > 15) score -= 15;
    if (code.includes('eval(')) score -= 20;
    if (code.includes('innerHTML')) score -= 10;
    if (!code.includes('try') && code.includes('fetch')) score -= 5;
    
    const gradeIndex = Math.max(0, Math.min(grades.length - 1, Math.floor((100 - score) / 8)));
    return grades[gradeIndex];
  }

  calculateMetrics(code) {
    return {
      complexity: Math.min(10, this.estimateComplexity(code)),
      maintainability: Math.max(1, 9 - (code.split('\n').length / 100)),
      security: Math.max(1, 8 - (code.match(/eval|innerHTML|document\.write/g)?.length || 0)),
      performance: Math.max(1, 8 - (code.match(/for.*for|while.*while/g)?.length || 0) * 2),
      testability: Math.max(1, code.includes('test') || code.includes('spec') ? 9 : 6),
      documentation: Math.max(1, (code.match(/\/\*\*|\*\/|\/\//g)?.length || 0) / 10)
    };
  }

  findIssues(code, language) {
    const issues = [];
    
    // Common JavaScript issues
    if (language === 'javascript') {
      if (code.includes('var ')) {
        issues.push({
          type: 'warning',
          severity: 'medium',
          line: this.getLineNumber(code, code.indexOf('var ')),
          message: 'Consider using const or let instead of var',
          suggestion: 'Replace var with const for constants or let for variables'
        });
      }
      
      if (code.includes('==') && !code.includes('===')) {
        issues.push({
          type: 'warning',
          severity: 'medium',
          line: this.getLineNumber(code, code.indexOf('==')),
          message: 'Use strict equality (===) instead of loose equality (==)',
          suggestion: 'Replace == with === for type-safe comparisons'
        });
      }
      
      if (code.includes('console.log')) {
        issues.push({
          type: 'info',
          severity: 'low',
          line: this.getLineNumber(code, code.indexOf('console.log')),
          message: 'Remove console.log statements before production',
          suggestion: 'Use proper logging library or remove debug statements'
        });
      }
    }
    
    return issues;
  }

  generateSuggestions(code, language) {
    const suggestions = [
      {
        type: 'optimization',
        title: 'Use React.memo for performance',
        description: 'Wrap components in React.memo to prevent unnecessary re-renders',
        code: 'const MyComponent = React.memo(({ props }) => { ... });'
      },
      {
        type: 'security',
        title: 'Add input validation',
        description: 'Validate and sanitize user inputs to prevent security vulnerabilities',
        code: 'const sanitizedInput = DOMPurify.sanitize(userInput);'
      },
      {
        type: 'maintainability',
        title: 'Extract reusable logic',
        description: 'Consider extracting common logic into custom hooks or utility functions',
        code: 'const useCustomHook = () => { ... };'
      }
    ];
    
    return suggestions;
  }

  generateCompletions(context, language, options) {
    const completions = [
      {
        id: 1,
        type: 'function',
        suggestion: 'const handleSubmit = async (event) => {\n  event.preventDefault();\n  // Handle form submission\n};',
        confidence: 0.95,
        description: 'Async form submission handler'
      },
      {
        id: 2,
        type: 'hook',
        suggestion: 'const [loading, setLoading] = useState(false);',
        confidence: 0.88,
        description: 'Loading state hook'
      },
      {
        id: 3,
        type: 'effect',
        suggestion: 'useEffect(() => {\n  // Side effect logic\n  return () => {\n    // Cleanup\n  };\n}, [dependencies]);',
        confidence: 0.82,
        description: 'Effect hook with cleanup'
      }
    ];
    
    return completions;
  }

  createDocumentation(code, language, options) {
    const projectName = options.projectName || 'Project';
    const author = options.author || 'Developer';
    
    return `# ${projectName} Documentation

## Overview
This documentation was automatically generated by AI Code Analysis.

## Code Structure
The codebase follows modern ${language} best practices and includes:

### Components
- Modular component architecture
- Proper state management
- Error handling and loading states

### Features
- User authentication and authorization
- Data fetching and caching
- Responsive design
- Accessibility compliance

## API Reference

### Main Functions

\`\`\`${language}
// Example function documentation
function exampleFunction(param1, param2) {
  /**
   * Description of what this function does
   * @param {string} param1 - First parameter description
   * @param {number} param2 - Second parameter description
   * @returns {Promise} - Returns a promise that resolves to...
   */
}
\`\`\`

## Installation

\`\`\`bash
npm install
npm start
\`\`\`

## Usage

\`\`\`${language}
import { Component } from './Component';

// Example usage
const app = new Component();
app.initialize();
\`\`\`

## Contributing
Please follow the coding standards and run tests before submitting pull requests.

## License
See LICENSE file for details.

---
Generated by AI Assistant on ${new Date().toLocaleDateString()}
Author: ${author}`;
  }

  // Utility methods

  simulateProcessingDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getLineNumber(code, index) {
    return code.substring(0, index).split('\n').length;
  }

  estimateComplexity(code) {
    const complexityIndicators = [
      /if\s*\(/g,
      /for\s*\(/g,
      /while\s*\(/g,
      /switch\s*\(/g,
      /catch\s*\(/g,
      /&&|\|\|/g
    ];
    
    return complexityIndicators.reduce((total, pattern) => {
      return total + (code.match(pattern)?.length || 0);
    }, 1);
  }

  calculateCyclomaticComplexity(code) {
    const patterns = [/if|for|while|switch|catch|&&|\|\|/g];
    return Math.min(20, patterns.reduce((acc, pattern) => 
      acc + (code.match(pattern)?.length || 0), 1));
  }

  findDuplicateCode(code) {
    // Simplified duplicate detection
    const lines = code.split('\n').filter(line => line.trim().length > 10);
    const duplicates = lines.filter((line, index) => 
      lines.indexOf(line) !== index).length;
    return Math.min(10, duplicates);
  }

  analyzeFunctionLength(code) {
    const functions = code.match(/function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g) || [];
    const avgLength = functions.reduce((acc, func) => 
      acc + func.split('\n').length, 0) / (functions.length || 1);
    return Math.min(10, Math.max(1, 10 - avgLength / 10));
  }

  analyzeNamingConventions(code) {
    const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
    const variables = code.match(/(?:const|let|var)\s+(\w+)/g) || [];
    const goodNames = variables.filter(v => 
      camelCasePattern.test(v.split(' ')[1])).length;
    return Math.min(10, (goodNames / (variables.length || 1)) * 10);
  }

  calculateMaintainabilityScore(metrics) {
    const weights = {
      complexity: 0.3,
      duplicateCode: 0.2,
      functionLength: 0.25,
      naming: 0.25
    };
    
    return Object.entries(weights).reduce((score, [key, weight]) => 
      score + (metrics[key] || 5) * weight, 0);
  }

  getVulnerabilitySeverity(type) {
    const severityMap = {
      xss: 'high',
      sqlInjection: 'high',
      hardcodedSecrets: 'medium',
      unsafeEval: 'high',
      insecureRandom: 'low'
    };
    return severityMap[type] || 'medium';
  }

  getVulnerabilityDescription(type) {
    const descriptions = {
      xss: 'Potential XSS vulnerability detected',
      sqlInjection: 'SQL injection vulnerability found',
      hardcodedSecrets: 'Hardcoded credentials detected',
      unsafeEval: 'Unsafe eval() usage found',
      insecureRandom: 'Insecure random number generation'
    };
    return descriptions[type] || 'Security issue detected';
  }

  getSecuritySuggestion(type) {
    const suggestions = {
      xss: 'Use DOMPurify.sanitize() or proper escaping',
      sqlInjection: 'Use parameterized queries or prepared statements',
      hardcodedSecrets: 'Use environment variables for sensitive data',
      unsafeEval: 'Avoid eval() or use safer alternatives',
      insecureRandom: 'Use crypto.getRandomValues() for security-sensitive operations'
    };
    return suggestions[type] || 'Review and fix security issue';
  }

  getSecurityRecommendations(vulnerabilities) {
    return [
      'Implement input validation and sanitization',
      'Use HTTPS for all communications',
      'Keep dependencies updated',
      'Implement proper authentication and authorization',
      'Use security headers and CSP policies'
    ];
  }

  getPerformanceImpact(type) {
    const impacts = {
      inefficientLoop: 'high',
      unnecessaryRerender: 'medium',
      memoryLeak: 'high',
      inefficientQuery: 'medium'
    };
    return impacts[type] || 'low';
  }

  getPerformanceSuggestion(type) {
    const suggestions = {
      inefficientLoop: 'Optimize nested loops or use more efficient algorithms',
      unnecessaryRerender: 'Use React.memo, useMemo, or useCallback',
      memoryLeak: 'Add proper event listener cleanup',
      inefficientQuery: 'Cache DOM queries or use refs'
    };
    return suggestions[type] || 'Optimize performance';
  }

  getOptimizationSuggestions(code) {
    return [
      'Use code splitting with React.lazy()',
      'Implement proper memoization',
      'Optimize bundle size with tree shaking',
      'Use efficient data structures',
      'Minimize DOM manipulations'
    ];
  }

  getMaintainabilitySuggestions(metrics) {
    const suggestions = [];
    
    if (metrics.complexity > 7) {
      suggestions.push('Break down complex functions into smaller ones');
    }
    if (metrics.duplicateCode > 3) {
      suggestions.push('Extract duplicate code into reusable functions');
    }
    if (metrics.functionLength < 7) {
      suggestions.push('Consider combining very small functions');
    }
    if (metrics.naming < 7) {
      suggestions.push('Improve variable and function naming');
    }
    
    return suggestions;
  }
}

// Export singleton instance
export default new AICodeAnalysisService();
