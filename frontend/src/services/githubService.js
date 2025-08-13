/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

/**
 * GitHub API Service
 * Fetches real GitHub projects for AI-powered project matching
 */

class GitHubService {
  constructor() {
    this.baseUrl = 'https://api.github.com';
    this.searchUrl = 'https://api.github.com/search';
    
    // Popular tech stacks and their associated keywords
    this.techStackKeywords = {
      'React': ['react', 'jsx', 'create-react-app', 'next.js', 'gatsby'],
      'Vue.js': ['vue', 'vuejs', 'nuxt', 'vue-cli'],
      'Angular': ['angular', 'typescript', 'ng', 'angular-cli'],
      'Node.js': ['node', 'nodejs', 'express', 'fastify', 'koa'],
      'Python': ['python', 'django', 'flask', 'fastapi', 'pandas'],
      'JavaScript': ['javascript', 'js', 'es6', 'typescript'],
      'TypeScript': ['typescript', 'ts', 'type-definitions'],
      'Go': ['golang', 'go', 'gin', 'fiber'],
      'Rust': ['rust', 'cargo', 'actix', 'tokio'],
      'Java': ['java', 'spring', 'maven', 'gradle'],
      'C++': ['cpp', 'c++', 'cmake'],
      'Swift': ['swift', 'ios', 'swiftui'],
      'Kotlin': ['kotlin', 'android'],
      'PHP': ['php', 'laravel', 'symfony'],
      'Ruby': ['ruby', 'rails', 'sinatra'],
      'C#': ['csharp', 'dotnet', 'asp.net'],
      'Solidity': ['solidity', 'ethereum', 'web3', 'smart-contracts'],
      'Docker': ['docker', 'dockerfile', 'containers'],
      'Kubernetes': ['kubernetes', 'k8s', 'helm'],
      'GraphQL': ['graphql', 'apollo', 'relay'],
      'MongoDB': ['mongodb', 'mongoose'],
      'PostgreSQL': ['postgresql', 'postgres'],
      'Redis': ['redis', 'cache'],
      'AWS': ['aws', 'amazon-web-services', 'lambda'],
      'Firebase': ['firebase', 'firestore'],
      'Machine Learning': ['machine-learning', 'ml', 'tensorflow', 'pytorch', 'scikit-learn'],
      'Data Science': ['data-science', 'pandas', 'numpy', 'jupyter'],
      'Blockchain': ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'defi'],
      'Mobile': ['mobile', 'react-native', 'flutter', 'ionic'],
      'Game Development': ['game', 'unity', 'unreal', 'godot'],
      'DevOps': ['devops', 'ci-cd', 'jenkins', 'github-actions'],
      'Security': ['security', 'cybersecurity', 'encryption', 'auth'],
      'API': ['api', 'rest', 'graphql', 'microservices'],
      'Frontend': ['frontend', 'ui', 'ux', 'css', 'html'],
      'Backend': ['backend', 'server', 'database', 'api'],
      'Full Stack': ['fullstack', 'full-stack', 'mern', 'mean'],
      'Open Source': ['open-source', 'oss', 'community'],
      'Education': ['education', 'learning', 'tutorial', 'course'],
      'Healthcare': ['healthcare', 'medical', 'health', 'telemedicine'],
      'Finance': ['finance', 'fintech', 'banking', 'trading'],
      'E-commerce': ['ecommerce', 'e-commerce', 'shopping', 'store'],
      'Social': ['social', 'chat', 'messaging', 'community'],
      'Productivity': ['productivity', 'tools', 'automation', 'workflow'],
      'Entertainment': ['entertainment', 'media', 'streaming', 'music'],
      'IoT': ['iot', 'internet-of-things', 'sensors', 'embedded'],
      'AR/VR': ['ar', 'vr', 'augmented-reality', 'virtual-reality'],
      'Climate': ['climate', 'environment', 'sustainability', 'green'],
    };

    // Difficulty mapping based on repository characteristics
    this.difficultyMapping = {
      beginner: { maxStars: 100, maxForks: 50, maxContributors: 10 },
      intermediate: { maxStars: 1000, maxForks: 300, maxContributors: 50 },
      advanced: { maxStars: Infinity, maxForks: Infinity, maxContributors: Infinity }
    };
  }

  /**
   * Search for GitHub repositories based on user skills and preferences
   * @param {Array} userSkills - User's programming skills
   * @param {string} userExperience - User's experience level
   * @param {Object} preferences - Additional search preferences
   * @returns {Promise<Array>} Array of GitHub projects
   */
  async searchProjects(userSkills = [], userExperience = 'intermediate', preferences = {}) {
    try {
      const searchQueries = this.buildSearchQueries(userSkills, userExperience, preferences);
      const allProjects = [];

      // Execute multiple searches to get diverse results
      for (const query of searchQueries) {
        const projects = await this.executeSearch(query, userExperience);
        allProjects.push(...projects);
      }

      // Remove duplicates and enhance with AI insights
      const uniqueProjects = this.removeDuplicates(allProjects);
      const enhancedProjects = await this.enhanceWithAIInsights(uniqueProjects, userSkills, userExperience);
      
      // Sort by AI match score and return top results
      return enhancedProjects
        .sort((a, b) => b.aiMatchScore - a.aiMatchScore)
        .slice(0, 12); // Return top 12 matches

    } catch (error) {
      console.error('GitHub search error:', error);
      // Return fallback projects if API fails
      return this.getFallbackProjects(userSkills, userExperience);
    }
  }

  /**
   * Build search queries focused on top open source projects
   */
  buildSearchQueries(userSkills, userExperience, preferences) {
    const queries = [];
    
    // Top open source projects by skill
    userSkills.slice(0, 3).forEach(skill => {
      const keywords = this.techStackKeywords[skill] || [skill.toLowerCase()];
      const primaryKeyword = keywords[0];
      const language = this.getLanguageForSkill(skill);
      
      // High-quality projects with strong community
      queries.push({
        q: `${primaryKeyword} stars:>500 forks:>50 good-first-issues:>5 license:mit OR license:apache-2.0 OR license:bsd`,
        sort: 'stars',
        order: 'desc',
        per_page: 8
      });
      
      // Active, well-maintained projects
      queries.push({
        q: `${primaryKeyword} language:${language} stars:>100 pushed:>2024-01-01 contributors:>10`,
        sort: 'updated',
        order: 'desc',
        per_page: 6
      });
    });

    // Top trending open source projects
    queries.push({
      q: 'stars:>1000 forks:>100 good-first-issues:>10 pushed:>2024-06-01 license:mit OR license:apache-2.0',
      sort: 'stars',
      order: 'desc',
      per_page: 12
    });

    // Highly starred projects with active development
    queries.push({
      q: 'stars:>2000 pushed:>2024-01-01 contributors:>20 topics:>3',
      sort: 'stars',
      order: 'desc',
      per_page: 10
    });

    // Experience-specific top projects
    if (userExperience === 'beginner') {
      queries.push({
        q: 'stars:>200 good-first-issues:>10 help-wanted-issues:>5 beginner-friendly documentation',
        sort: 'stars',
        order: 'desc',
        per_page: 15
      });
    } else if (userExperience === 'advanced') {
      queries.push({
        q: 'stars:>5000 contributors:>50 complex architecture enterprise',
        sort: 'stars',
        order: 'desc',
        per_page: 8
      });
    } else {
      queries.push({
        q: 'stars:>1000 good-first-issues:>3 contributors:>15 active-development',
        sort: 'stars',
        order: 'desc',
        per_page: 10
      });
    }

    // Top projects by category
    const topCategories = ['react', 'vue', 'angular', 'node', 'python', 'machine-learning', 'blockchain', 'kubernetes'];
    const randomCategory = topCategories[Math.floor(Math.random() * topCategories.length)];
    queries.push({
      q: `${randomCategory} stars:>1000 license:mit OR license:apache-2.0 pushed:>2024-01-01`,
      sort: 'stars',
      order: 'desc',
      per_page: 6
    });

    return queries;
  }

  /**
   * Execute a search query against GitHub API
   */
  async executeSearch(query, userExperience) {
    try {
      const url = new URL(`${this.searchUrl}/repositories`);
      Object.keys(query).forEach(key => {
        url.searchParams.append(key, query[key]);
      });

      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Three-Eyed-Coders-AI-Matcher'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformGitHubProjects(data.items || [], userExperience);
    } catch (error) {
      console.error('GitHub API request failed:', error);
      return [];
    }
  }

  /**
   * Transform GitHub API response to our project format
   * Filters for top-quality open source projects only
   */
  transformGitHubProjects(githubRepos, userExperience) {
    // Filter for high-quality open source projects
    const qualityRepos = githubRepos.filter(repo => {
      // Must have minimum stars for quality
      const minStars = userExperience === 'beginner' ? 50 : userExperience === 'advanced' ? 500 : 100;
      if (repo.stargazers_count < minStars) return false;
      
      // Must have open source license
      if (!repo.license || !['mit', 'apache-2.0', 'bsd-3-clause', 'bsd-2-clause', 'gpl-3.0', 'lgpl-3.0'].includes(repo.license.key)) return false;
      
      // Must not be archived
      if (repo.archived) return false;
      
      // Must have recent activity (within last year)
      const lastUpdate = new Date(repo.updated_at);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      if (lastUpdate < oneYearAgo) return false;
      
      // Must have community engagement
      if (repo.forks_count < 5) return false;
      
      return true;
    });

    return qualityRepos.map(repo => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || 'No description available',
      technologies: this.extractTechnologies(repo),
      difficulty: this.calculateDifficulty(repo, userExperience),
      contributors: repo.watchers_count || 0,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      estimatedTime: this.estimateProjectTime(repo),
      category: this.categorizeProject(repo),
      githubUrl: repo.html_url,
      cloneUrl: repo.clone_url,
      language: repo.language,
      lastUpdated: repo.updated_at,
      hasIssues: repo.has_issues,
      openIssues: repo.open_issues_count || 0,
      license: repo.license?.name || 'No license',
      maintainer: {
        name: repo.owner.login,
        avatar: repo.owner.avatar_url,
        url: repo.owner.html_url,
        reputation: this.calculateMaintainerReputation(repo.owner)
      },
      features: this.extractFeatures(repo),
      isArchived: repo.archived,
      defaultBranch: repo.default_branch,
      size: repo.size,
      createdAt: repo.created_at,
      topics: repo.topics || []
    }));
  }

  /**
   * Extract technologies from GitHub repository
   */
  extractTechnologies(repo) {
    const technologies = [];
    
    // Primary language
    if (repo.language) {
      technologies.push(repo.language);
    }
    
    // Extract from topics
    if (repo.topics) {
      repo.topics.forEach(topic => {
        const matchedTech = Object.keys(this.techStackKeywords).find(tech => 
          this.techStackKeywords[tech].some(keyword => 
            topic.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        if (matchedTech && !technologies.includes(matchedTech)) {
          technologies.push(matchedTech);
        }
      });
    }
    
    // Extract from name and description
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
    Object.keys(this.techStackKeywords).forEach(tech => {
      if (this.techStackKeywords[tech].some(keyword => text.includes(keyword.toLowerCase()))) {
        if (!technologies.includes(tech)) {
          technologies.push(tech);
        }
      }
    });
    
    return technologies.slice(0, 6); // Limit to 6 technologies
  }

  /**
   * Calculate project difficulty based on repository metrics
   */
  calculateDifficulty(repo, userExperience) {
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const issues = repo.open_issues_count || 0;
    const size = repo.size || 0;
    
    // Calculate complexity score
    let complexityScore = 0;
    complexityScore += Math.min(stars / 100, 10); // Stars contribution
    complexityScore += Math.min(forks / 50, 5);   // Forks contribution
    complexityScore += Math.min(size / 1000, 5);  // Size contribution
    complexityScore += Math.min(issues / 20, 3);  // Issues contribution
    
    if (complexityScore < 5) return 'beginner';
    if (complexityScore < 12) return 'intermediate';
    return 'advanced';
  }

  /**
   * Estimate project contribution time
   */
  estimateProjectTime(repo) {
    const size = repo.size || 0;
    const complexity = repo.stargazers_count || 0;
    
    if (size < 1000 && complexity < 100) return '1-2 weeks';
    if (size < 5000 && complexity < 500) return '2-4 weeks';
    if (size < 20000 && complexity < 2000) return '1-2 months';
    return '2+ months';
  }

  /**
   * Categorize project based on content
   */
  categorizeProject(repo) {
    const text = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase();
    
    const categories = {
      'Web Development': ['web', 'frontend', 'backend', 'fullstack', 'website', 'app'],
      'Mobile Development': ['mobile', 'android', 'ios', 'react-native', 'flutter'],
      'Machine Learning': ['ml', 'ai', 'machine-learning', 'tensorflow', 'pytorch', 'data'],
      'Blockchain': ['blockchain', 'crypto', 'ethereum', 'bitcoin', 'web3', 'defi'],
      'DevOps': ['devops', 'docker', 'kubernetes', 'ci', 'cd', 'deployment'],
      'Game Development': ['game', 'gaming', 'unity', 'unreal', 'godot'],
      'Data Science': ['data-science', 'analytics', 'visualization', 'pandas', 'jupyter'],
      'Security': ['security', 'cybersecurity', 'encryption', 'auth', 'vulnerability'],
      'Education': ['education', 'learning', 'tutorial', 'course', 'teaching'],
      'Open Source Tools': ['tool', 'utility', 'cli', 'library', 'framework'],
      'Social Impact': ['social', 'community', 'nonprofit', 'charity', 'volunteer'],
      'Healthcare': ['health', 'medical', 'healthcare', 'medicine', 'patient'],
      'Finance': ['finance', 'fintech', 'trading', 'banking', 'payment'],
      'E-commerce': ['ecommerce', 'shop', 'store', 'marketplace', 'retail'],
      'Entertainment': ['entertainment', 'media', 'music', 'video', 'streaming']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }
    
    return 'General Development';
  }

  /**
   * Extract key features from repository
   */
  extractFeatures(repo) {
    const features = [];
    
    if (repo.has_issues) features.push('Issue Tracking');
    if (repo.has_wiki) features.push('Documentation');
    if (repo.has_projects) features.push('Project Management');
    if (repo.open_issues_count > 0) features.push('Active Development');
    if (repo.topics && repo.topics.length > 0) features.push('Well Tagged');
    if (repo.license) features.push('Licensed');
    
    return features;
  }

  /**
   * Calculate maintainer reputation score
   */
  calculateMaintainerReputation(owner) {
    // Simple reputation calculation based on available data
    const followers = owner.followers || 0;
    const publicRepos = owner.public_repos || 0;
    
    let score = 3.0; // Base score
    score += Math.min(followers / 100, 1.5); // Followers boost
    score += Math.min(publicRepos / 50, 0.5); // Repos boost
    
    return Math.min(5.0, Math.round(score * 10) / 10);
  }

  /**
   * Enhance projects with AI insights and match scoring
   */
  async enhanceWithAIInsights(projects, userSkills, userExperience) {
    return projects.map(project => {
      const aiMatchScore = this.calculateAIMatchScore(project, userSkills, userExperience);
      const aiInsights = this.generateAIInsights(project, userSkills, userExperience, aiMatchScore);
      
      return {
        ...project,
        aiMatchScore,
        aiInsights
      };
    });
  }

  /**
   * Calculate AI match score for top open source projects
   */
  calculateAIMatchScore(project, userSkills, userExperience) {
    let score = 0;
    
    // Skill matching (35% weight)
    const skillMatches = project.technologies.filter(tech => 
      userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()) || 
                              tech.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    const skillScore = (skillMatches / Math.max(project.technologies.length, 1)) * 35;
    score += skillScore;
    
    // Experience level matching (20% weight)
    const experienceLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const userLevel = experienceLevels[userExperience] || 2;
    const projectLevel = experienceLevels[project.difficulty] || 2;
    const experienceScore = Math.max(0, 20 - Math.abs(userLevel - projectLevel) * 6);
    score += experienceScore;
    
    // Open source quality indicators (25% weight)
    let qualityScore = 0;
    
    // Star rating (logarithmic scale for fairness)
    const starScore = Math.min(10, Math.log10(project.stars + 1) * 2);
    qualityScore += starScore;
    
    // Community engagement
    const forkScore = Math.min(5, project.forks / 20);
    qualityScore += forkScore;
    
    // Active development
    const issueActivityScore = project.openIssues > 0 ? 5 : 0;
    qualityScore += issueActivityScore;
    
    // License quality
    const licenseScore = project.license !== 'No license' ? 5 : 0;
    qualityScore += licenseScore;
    
    score += qualityScore;
    
    // Contribution friendliness (20% weight)
    let contributionScore = 0;
    
    // Good first issues
    if (project.openIssues > 10) contributionScore += 8;
    else if (project.openIssues > 5) contributionScore += 5;
    else if (project.openIssues > 0) contributionScore += 3;
    
    // Documentation and features
    if (project.features.includes('Documentation')) contributionScore += 4;
    if (project.features.includes('Issue Tracking')) contributionScore += 4;
    if (project.features.includes('Well Tagged')) contributionScore += 2;
    if (project.features.includes('Active Development')) contributionScore += 2;
    
    score += Math.min(20, contributionScore);
    
    return Math.min(100, Math.round(score));
  }

  /**
   * Generate AI insights for top open source projects
   */
  generateAIInsights(project, userSkills, userExperience, matchScore) {
    const matchedSkills = project.technologies.filter(tech => 
      userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()) || 
                              tech.toLowerCase().includes(skill.toLowerCase()))
    );
    
    const newSkills = project.technologies.filter(tech => 
      !userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()) || 
                               tech.toLowerCase().includes(skill.toLowerCase()))
    );
    
    // Enhanced match reasoning for open source quality
    let matchReason = '';
    const qualityIndicators = [];
    
    if (project.stars > 1000) qualityIndicators.push('highly starred');
    if (project.forks > 100) qualityIndicators.push('actively forked');
    if (project.openIssues > 10) qualityIndicators.push('community-driven');
    if (project.license !== 'No license') qualityIndicators.push('properly licensed');
    
    if (matchScore >= 80) {
      matchReason = `🌟 Excellent match! This ${qualityIndicators.join(', ')} open source project perfectly aligns with your ${matchedSkills.join(', ')} expertise.`;
    } else if (matchScore >= 60) {
      matchReason = `✨ Strong match! This ${qualityIndicators.length > 0 ? qualityIndicators[0] : 'quality'} project offers great opportunities with your ${matchedSkills.join(', ')} skills.`;
    } else if (matchScore >= 40) {
      matchReason = `🚀 Good learning opportunity! This well-maintained open source project will help you grow beyond your current skills.`;
    } else {
      matchReason = `📚 Skill-building match! This established project offers excellent learning potential in new technologies.`;
    }
    
    // Enhanced impact scoring for open source projects
    const impactScore = Math.min(10, 
      Math.log10(project.stars + 1) * 1.5 + 
      Math.log10(project.forks + 1) * 1.2 + 
      (project.category.includes('Social') ? 2 : 0) +
      (project.category.includes('Education') ? 1.5 : 0) +
      (project.category.includes('Healthcare') ? 2 : 0) +
      (project.category.includes('Climate') ? 2.5 : 0) +
      (project.openIssues > 20 ? 1 : 0)
    );
    
    return {
      matchReason,
      learningOpportunities: newSkills.slice(0, 3),
      impactScore: Math.round(impactScore * 10) / 10,
      contributionTips: this.generateContributionTips(project),
      difficultyExplanation: this.explainDifficulty(project),
      openSourceQuality: this.assessOpenSourceQuality(project)
    };
  }

  /**
   * Assess open source project quality
   */
  assessOpenSourceQuality(project) {
    const indicators = [];
    
    if (project.stars > 5000) indicators.push('🌟 Highly popular');
    else if (project.stars > 1000) indicators.push('⭐ Well-regarded');
    else if (project.stars > 100) indicators.push('✨ Community favorite');
    
    if (project.forks > 500) indicators.push('🔄 Extensively forked');
    else if (project.forks > 50) indicators.push('🔀 Actively forked');
    
    if (project.openIssues > 50) indicators.push('🔥 Very active');
    else if (project.openIssues > 10) indicators.push('💬 Community engaged');
    
    if (project.license && project.license !== 'No license') {
      indicators.push('📄 Open source licensed');
    }
    
    return indicators.slice(0, 3);
  }

  /**
   * Generate contribution tips for a project
   */
  generateContributionTips(project) {
    const tips = [];
    
    if (project.openIssues > 0) {
      tips.push('Check open issues for contribution opportunities');
    }
    if (project.features.includes('Documentation')) {
      tips.push('Documentation improvements are always welcome');
    }
    if (project.language) {
      tips.push(`Focus on ${project.language} related contributions`);
    }
    if (project.topics.includes('good-first-issue')) {
      tips.push('Look for "good first issue" labels');
    }
    
    return tips.slice(0, 3);
  }

  /**
   * Explain project difficulty
   */
  explainDifficulty(project) {
    if (project.difficulty === 'beginner') {
      return 'Great for newcomers with clear documentation and simple codebase';
    } else if (project.difficulty === 'intermediate') {
      return 'Moderate complexity requiring some experience with the tech stack';
    } else {
      return 'Advanced project with complex architecture and extensive codebase';
    }
  }

  /**
   * Remove duplicate projects
   */
  removeDuplicates(projects) {
    const seen = new Set();
    return projects.filter(project => {
      if (seen.has(project.id)) {
        return false;
      }
      seen.add(project.id);
      return true;
    });
  }

  /**
   * Get language for skill mapping
   */
  getLanguageForSkill(skill) {
    const languageMap = {
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'Python': 'python',
      'Java': 'java',
      'Go': 'go',
      'Rust': 'rust',
      'C++': 'cpp',
      'C#': 'csharp',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Swift': 'swift',
      'Kotlin': 'kotlin',
      'Solidity': 'solidity'
    };
    
    return languageMap[skill] || skill.toLowerCase();
  }

  /**
   * Fallback projects when GitHub API is unavailable
   */
  getFallbackProjects(userSkills, userExperience) {
    return [
      {
        id: 'fallback-1',
        title: 'Community Project Finder',
        description: 'Help build a platform to connect developers with meaningful projects',
        technologies: ['React', 'Node.js', 'MongoDB'],
        difficulty: userExperience,
        contributors: 15,
        stars: 89,
        estimatedTime: '2-3 weeks',
        category: 'Open Source Tools',
        aiMatchScore: 85,
        aiInsights: {
          matchReason: 'Great match for your skills and experience level',
          learningOpportunities: ['GraphQL', 'Docker'],
          impactScore: 8.5
        }
      }
    ];
  }
}

export default new GitHubService();
