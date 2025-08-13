/*
 * Copyright (c) 2025 YTT Global Services
 * 
 * This software is the confidential and proprietary information of YTT Global Services.
 * You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with YTT Global Services.
 */

/**
 * Consultant Matching Service
 * AI-powered consultant discovery and matching system
 */

class ConsultantService {
  constructor() {
    // Simulated consultant database with diverse profiles
    this.consultantDatabase = [
      {
        id: 'cons-001',
        name: 'Sarah Chen',
        title: 'Senior Full-Stack Developer & AI Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        location: 'San Francisco, CA',
        timezone: 'PST',
        hourlyRate: 125,
        availability: 'Available',
        rating: 4.9,
        reviewCount: 47,
        yearsExperience: 8,
        skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'TypeScript'],
        specializations: ['AI/ML Integration', 'Full-Stack Development', 'Cloud Architecture'],
        languages: ['English', 'Mandarin'],
        bio: 'Passionate full-stack developer with expertise in AI/ML integration. Helped 50+ startups build scalable web applications and implement intelligent features.',
        portfolio: [
          {
            title: 'AI-Powered E-commerce Platform',
            description: 'Built recommendation engine increasing sales by 35%',
            technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
            impact: 'Increased client revenue by $2M annually'
          },
          {
            title: 'Real-time Analytics Dashboard',
            description: 'Created live data visualization for 100K+ users',
            technologies: ['React', 'Node.js', 'D3.js', 'MongoDB'],
            impact: 'Reduced decision-making time by 60%'
          }
        ],
        certifications: ['AWS Solutions Architect', 'Google Cloud ML Engineer'],
        education: 'MS Computer Science - Stanford University',
        workPreference: 'Remote',
        projectTypes: ['Web Applications', 'AI/ML Projects', 'Consulting'],
        industries: ['FinTech', 'HealthTech', 'E-commerce'],
        testimonials: [
          {
            client: 'TechStart Inc.',
            feedback: 'Sarah delivered exceptional results. Her AI expertise transformed our platform.',
            rating: 5
          }
        ]
      },
      {
        id: 'cons-002',
        name: 'Marcus Rodriguez',
        title: 'Blockchain Developer & Smart Contract Auditor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Austin, TX',
        timezone: 'CST',
        hourlyRate: 150,
        availability: 'Busy until Feb 2025',
        rating: 4.8,
        reviewCount: 32,
        yearsExperience: 6,
        skills: ['Solidity', 'Web3.js', 'Ethereum', 'DeFi', 'Smart Contracts', 'Rust'],
        specializations: ['Smart Contract Development', 'DeFi Protocols', 'Security Auditing'],
        languages: ['English', 'Spanish'],
        bio: 'Blockchain security expert specializing in DeFi protocols and smart contract auditing. Secured over $100M in digital assets.',
        portfolio: [
          {
            title: 'DeFi Lending Protocol',
            description: 'Built secure lending platform with $50M TVL',
            technologies: ['Solidity', 'Hardhat', 'React', 'Web3.js'],
            impact: 'Zero security incidents, $50M+ TVL'
          },
          {
            title: 'NFT Marketplace',
            description: 'Created gas-optimized NFT trading platform',
            technologies: ['Solidity', 'IPFS', 'React', 'Ethereum'],
            impact: '40% gas savings for users'
          }
        ],
        certifications: ['Certified Ethereum Developer', 'ConsenSys Blockchain Developer'],
        education: 'BS Computer Engineering - UT Austin',
        workPreference: 'Hybrid',
        projectTypes: ['Smart Contracts', 'DeFi', 'Security Audits'],
        industries: ['Blockchain', 'FinTech', 'Gaming'],
        testimonials: [
          {
            client: 'CryptoVault',
            feedback: 'Marcus saved us from potential exploits. His security expertise is unmatched.',
            rating: 5
          }
        ]
      },
      {
        id: 'cons-003',
        name: 'Dr. Priya Patel',
        title: 'Data Scientist & ML Engineer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        location: 'Boston, MA',
        timezone: 'EST',
        hourlyRate: 140,
        availability: 'Available',
        rating: 4.9,
        reviewCount: 63,
        yearsExperience: 10,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL', 'R', 'Kubernetes'],
        specializations: ['Machine Learning', 'Data Science', 'MLOps', 'Computer Vision'],
        languages: ['English', 'Hindi', 'Gujarati'],
        bio: 'PhD in Machine Learning with 10+ years experience building production ML systems. Published 25+ research papers.',
        portfolio: [
          {
            title: 'Medical Image Analysis System',
            description: 'AI system for early cancer detection with 95% accuracy',
            technologies: ['Python', 'TensorFlow', 'OpenCV', 'Docker'],
            impact: 'Improved diagnosis accuracy by 30%'
          },
          {
            title: 'Predictive Maintenance Platform',
            description: 'ML system reducing equipment downtime by 40%',
            technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'AWS'],
            impact: 'Saved $5M in maintenance costs'
          }
        ],
        certifications: ['Google Cloud ML Engineer', 'AWS ML Specialty'],
        education: 'PhD Machine Learning - MIT',
        workPreference: 'Remote',
        projectTypes: ['ML/AI Development', 'Data Analysis', 'Research'],
        industries: ['Healthcare', 'Manufacturing', 'Finance'],
        testimonials: [
          {
            client: 'MedTech Solutions',
            feedback: 'Dr. Patel\'s ML expertise revolutionized our diagnostic capabilities.',
            rating: 5
          }
        ]
      },
      {
        id: 'cons-004',
        name: 'Alex Thompson',
        title: 'DevOps Engineer & Cloud Architect',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        location: 'Seattle, WA',
        timezone: 'PST',
        hourlyRate: 130,
        availability: 'Available',
        rating: 4.7,
        reviewCount: 41,
        yearsExperience: 9,
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python', 'Go'],
        specializations: ['Cloud Architecture', 'DevOps', 'Infrastructure as Code', 'Microservices'],
        languages: ['English'],
        bio: 'Cloud architecture expert helping companies scale from startup to enterprise. Reduced infrastructure costs by 50% on average.',
        portfolio: [
          {
            title: 'Multi-Cloud Migration',
            description: 'Migrated legacy system to AWS/Azure hybrid cloud',
            technologies: ['AWS', 'Azure', 'Kubernetes', 'Terraform'],
            impact: '50% cost reduction, 99.9% uptime'
          },
          {
            title: 'CI/CD Pipeline Optimization',
            description: 'Automated deployment pipeline for 100+ microservices',
            technologies: ['Jenkins', 'Docker', 'Kubernetes', 'GitLab'],
            impact: '80% faster deployments'
          }
        ],
        certifications: ['AWS Solutions Architect Pro', 'Kubernetes CKA'],
        education: 'BS Software Engineering - University of Washington',
        workPreference: 'Remote',
        projectTypes: ['Cloud Migration', 'DevOps Setup', 'Infrastructure'],
        industries: ['SaaS', 'E-commerce', 'FinTech'],
        testimonials: [
          {
            client: 'ScaleUp Corp',
            feedback: 'Alex transformed our infrastructure. We can now handle 10x the traffic.',
            rating: 5
          }
        ]
      },
      {
        id: 'cons-005',
        name: 'Luna Kim',
        title: 'Mobile App Developer & UX Designer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        location: 'Los Angeles, CA',
        timezone: 'PST',
        hourlyRate: 110,
        availability: 'Available',
        rating: 4.8,
        reviewCount: 38,
        yearsExperience: 7,
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Figma', 'Adobe XD'],
        specializations: ['Mobile Development', 'UX/UI Design', 'Cross-platform Apps'],
        languages: ['English', 'Korean'],
        bio: 'Mobile-first developer and designer creating beautiful, user-centric applications. Apps downloaded 5M+ times globally.',
        portfolio: [
          {
            title: 'Fitness Tracking App',
            description: 'Cross-platform app with 1M+ active users',
            technologies: ['React Native', 'Firebase', 'Redux', 'Figma'],
            impact: '1M+ downloads, 4.8 app store rating'
          },
          {
            title: 'Food Delivery Platform',
            description: 'Complete mobile solution with real-time tracking',
            technologies: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'],
            impact: 'Increased order completion by 25%'
          }
        ],
        certifications: ['Google UX Design Certificate', 'React Native Certified'],
        education: 'BFA Digital Design - Art Center College of Design',
        workPreference: 'Hybrid',
        projectTypes: ['Mobile Apps', 'UX Design', 'Prototyping'],
        industries: ['Consumer Apps', 'HealthTech', 'Food & Beverage'],
        testimonials: [
          {
            client: 'FitLife Inc.',
            feedback: 'Luna created an amazing user experience. Our retention rate doubled.',
            rating: 5
          }
        ]
      },
      {
        id: 'cons-006',
        name: 'David Wilson',
        title: 'Cybersecurity Consultant & Penetration Tester',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
        location: 'Washington, DC',
        timezone: 'EST',
        hourlyRate: 160,
        availability: 'Limited availability',
        rating: 4.9,
        reviewCount: 29,
        yearsExperience: 12,
        skills: ['Penetration Testing', 'Security Auditing', 'Python', 'Linux', 'Network Security'],
        specializations: ['Cybersecurity', 'Ethical Hacking', 'Compliance', 'Risk Assessment'],
        languages: ['English'],
        bio: 'Certified ethical hacker with 12+ years protecting organizations from cyber threats. Prevented $50M+ in potential damages.',
        portfolio: [
          {
            title: 'Enterprise Security Assessment',
            description: 'Comprehensive security audit for Fortune 500 company',
            technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Python'],
            impact: 'Identified 47 vulnerabilities, zero breaches post-remediation'
          },
          {
            title: 'GDPR Compliance Implementation',
            description: 'Full compliance framework for EU data protection',
            technologies: ['Security Frameworks', 'Policy Development'],
            impact: 'Achieved full GDPR compliance, avoided €20M fines'
          }
        ],
        certifications: ['CISSP', 'CEH', 'OSCP', 'CISM'],
        education: 'MS Cybersecurity - George Washington University',
        workPreference: 'On-site preferred',
        projectTypes: ['Security Audits', 'Penetration Testing', 'Compliance'],
        industries: ['Finance', 'Healthcare', 'Government'],
        testimonials: [
          {
            client: 'SecureBank',
            feedback: 'David\'s security expertise is world-class. He made us bulletproof.',
            rating: 5
          }
        ]
      }
    ];

    // Skill categories for better matching
    this.skillCategories = {
      'Frontend': ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
      'Backend': ['Node.js', 'Python', 'Java', 'Go', 'PHP', 'Ruby', 'C#'],
      'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'],
      'Data Science': ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn'],
      'Machine Learning': ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'NLP'],
      'Cloud': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
      'Blockchain': ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi'],
      'DevOps': ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'Ansible'],
      'Security': ['Penetration Testing', 'Ethical Hacking', 'Cryptography', 'OWASP'],
      'Design': ['Figma', 'Adobe XD', 'Sketch', 'UX/UI Design', 'Prototyping']
    };
  }

  /**
   * Search for consultants based on criteria
   * @param {Object} searchCriteria - Search parameters
   * @returns {Promise<Array>} Array of matching consultants
   */
  async searchConsultants(searchCriteria = {}) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const {
        skills = [],
        budget = null,
        availability = null,
        location = null,
        projectType = null,
        experience = null,
        rating = null
      } = searchCriteria;

      let results = [...this.consultantDatabase];

      // Filter by skills
      if (skills.length > 0) {
        results = results.filter(consultant => 
          skills.some(skill => 
            consultant.skills.some(consultantSkill => 
              consultantSkill.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(consultantSkill.toLowerCase())
            )
          )
        );
      }

      // Filter by budget
      if (budget) {
        results = results.filter(consultant => consultant.hourlyRate <= budget);
      }

      // Filter by availability
      if (availability === 'available') {
        results = results.filter(consultant => 
          consultant.availability.toLowerCase().includes('available')
        );
      }

      // Filter by location preference
      if (location) {
        results = results.filter(consultant => 
          consultant.location.toLowerCase().includes(location.toLowerCase()) ||
          consultant.workPreference === 'Remote'
        );
      }

      // Filter by project type
      if (projectType) {
        results = results.filter(consultant => 
          consultant.projectTypes.some(type => 
            type.toLowerCase().includes(projectType.toLowerCase())
          )
        );
      }

      // Filter by experience
      if (experience) {
        const expYears = parseInt(experience);
        results = results.filter(consultant => consultant.yearsExperience >= expYears);
      }

      // Filter by rating
      if (rating) {
        results = results.filter(consultant => consultant.rating >= rating);
      }

      // Calculate match scores and enhance with AI insights
      const enhancedResults = results.map(consultant => ({
        ...consultant,
        matchScore: this.calculateMatchScore(consultant, searchCriteria),
        aiInsights: this.generateConsultantInsights(consultant, searchCriteria)
      }));

      // Sort by match score
      return enhancedResults.sort((a, b) => b.matchScore - a.matchScore);

    } catch (error) {
      console.error('Consultant search error:', error);
      throw new Error('Failed to search consultants. Please try again.');
    }
  }

  /**
   * Calculate match score for a consultant
   */
  calculateMatchScore(consultant, searchCriteria) {
    let score = 0;
    const { skills = [], budget = null, availability = null } = searchCriteria;

    // Skill matching (40% weight)
    if (skills.length > 0) {
      const skillMatches = skills.filter(skill => 
        consultant.skills.some(consultantSkill => 
          consultantSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(consultantSkill.toLowerCase())
        )
      ).length;
      score += (skillMatches / skills.length) * 40;
    } else {
      score += 40; // No skill preference = full score
    }

    // Budget compatibility (25% weight)
    if (budget) {
      if (consultant.hourlyRate <= budget) {
        score += 25;
      } else {
        // Partial score based on how close they are
        const budgetRatio = budget / consultant.hourlyRate;
        score += Math.max(0, budgetRatio * 25);
      }
    } else {
      score += 25; // No budget constraint = full score
    }

    // Availability (20% weight)
    if (availability === 'available') {
      score += consultant.availability.toLowerCase().includes('available') ? 20 : 5;
    } else {
      score += 20; // No availability preference = full score
    }

    // Rating and reviews (15% weight)
    score += (consultant.rating / 5) * 10;
    score += Math.min(5, consultant.reviewCount / 10); // Up to 5 points for reviews

    return Math.min(100, Math.round(score));
  }

  /**
   * Generate AI insights for consultant matching
   */
  generateConsultantInsights(consultant, searchCriteria) {
    const { skills = [], budget = null } = searchCriteria;
    
    const matchedSkills = skills.filter(skill => 
      consultant.skills.some(consultantSkill => 
        consultantSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    const additionalSkills = consultant.skills.filter(skill => 
      !skills.some(searchSkill => 
        skill.toLowerCase().includes(searchSkill.toLowerCase())
      )
    ).slice(0, 3);

    let matchReason = '';
    if (matchedSkills.length === skills.length && skills.length > 0) {
      matchReason = `Perfect skill match! ${consultant.name} has expertise in all your required technologies: ${matchedSkills.join(', ')}.`;
    } else if (matchedSkills.length > 0) {
      matchReason = `Strong match with ${matchedSkills.length}/${skills.length} required skills. Expertise in ${matchedSkills.join(', ')}.`;
    } else {
      matchReason = `Experienced professional with complementary skills that could benefit your project.`;
    }

    const budgetFit = budget ? 
      (consultant.hourlyRate <= budget ? 'Within budget' : `$${consultant.hourlyRate - budget} over budget`) :
      'No budget specified';

    return {
      matchReason,
      budgetFit,
      additionalSkills,
      strengthAreas: consultant.specializations.slice(0, 3),
      experienceHighlight: `${consultant.yearsExperience} years of experience with ${consultant.rating}/5 rating`,
      recommendationTip: this.getRecommendationTip(consultant, searchCriteria)
    };
  }

  /**
   * Get personalized recommendation tip
   */
  getRecommendationTip(consultant, searchCriteria) {
    const tips = [
      `${consultant.name} has worked in ${consultant.industries.join(', ')} industries`,
      `Prefers ${consultant.workPreference.toLowerCase()} work arrangements`,
      `Located in ${consultant.location} (${consultant.timezone})`,
      `Specializes in ${consultant.specializations[0]}`
    ];

    if (consultant.availability.includes('Available')) {
      tips.unshift('Currently available for new projects');
    }

    return tips[Math.floor(Math.random() * tips.length)];
  }

  /**
   * Get consultant by ID
   */
  async getConsultantById(id) {
    const consultant = this.consultantDatabase.find(c => c.id === id);
    if (!consultant) {
      throw new Error('Consultant not found');
    }
    return consultant;
  }

  /**
   * Get skill suggestions for search
   */
  getSkillSuggestions(query = '') {
    const allSkills = Object.values(this.skillCategories).flat();
    if (!query) return allSkills.slice(0, 10);
    
    return allSkills.filter(skill => 
      skill.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  }

  /**
   * Get popular search filters
   */
  getPopularFilters() {
    return {
      skills: ['React', 'Python', 'AWS', 'Machine Learning', 'Blockchain'],
      budgetRanges: [
        { label: 'Under $100/hr', value: 100 },
        { label: '$100-150/hr', value: 150 },
        { label: '$150-200/hr', value: 200 },
        { label: '$200+/hr', value: null }
      ],
      projectTypes: ['Web Development', 'Mobile Apps', 'AI/ML', 'DevOps', 'Security'],
      experienceLevels: [
        { label: '5+ years', value: 5 },
        { label: '10+ years', value: 10 },
        { label: '15+ years', value: 15 }
      ]
    };
  }
}

export default new ConsultantService();
