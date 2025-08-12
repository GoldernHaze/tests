import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Logo } from './Logo';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { setSearchQuery: setGlobalSearchQuery, setSearchResults, setIsSearchActive } = useSearch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Animated wavy background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      // Create multiple wave layers with navy blue gradient
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        
        const opacity = 0.08 - layer * 0.015;
        const frequency = 0.002 + layer * 0.0005;
        const amplitude = 30 + layer * 10;
        const speed = 0.01 + layer * 0.005;
        
        // Create navy blue gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `rgba(30, 64, 175, ${opacity})`); // Navy blue
        gradient.addColorStop(0.5, `rgba(37, 99, 235, ${opacity})`); // Blue
        gradient.addColorStop(1, `rgba(29, 78, 216, ${opacity})`); // Dark blue
        
        ctx.fillStyle = gradient;
        
        // Draw wave
        ctx.moveTo(0, height / 2);
        for (let x = 0; x <= width; x += 2) {
          const y = height / 2 + 
            Math.sin((x * frequency) + (time * speed)) * amplitude + 
            Math.sin((x * frequency * 0.5) + (time * speed * 1.5)) * amplitude * 0.5;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }
      
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateJobData = (query: string) => {
    const jobTitle = query.toLowerCase();
    
    // Comprehensive job database with Indian context
    const jobDatabase: Record<string, any> = {
      'software engineer': {
        title: 'Software Engineer',
        description: 'Design, develop, and maintain software applications and systems for Indian and global markets.',
        averageSalary: { fresher: '₹4-8 LPA', experienced: '₹15-35 LPA', senior: '₹35-80+ LPA' },
        skills: ['Programming (Java/Python/JavaScript)', 'Data Structures & Algorithms', 'System Design', 'Git', 'Databases'],
        growthRate: '+22%',
        jobOpenings: '50,000+',
        topCompanies: [
          { name: 'TCS', logo: '🏢', employees: '2000+', rating: 4.2, location: 'Mumbai, Bangalore, Chennai' },
          { name: 'Infosys', logo: '💼', employees: '1800+', rating: 4.1, location: 'Bangalore, Hyderabad, Pune' },
          { name: 'Google India', logo: '🔍', employees: '500+', rating: 4.5, location: 'Bangalore, Gurgaon' },
        ],
        learningPath: ['Master DSA', 'System Design', 'Open Source Contributions', 'Build Projects'],
        futureProspects: 'Excellent growth with AI/ML, Cloud, and emerging tech opportunities.',
        category: 'Engineering',
        locations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune']
      },
      'data scientist': {
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make informed business decisions.',
        averageSalary: { fresher: '₹6-12 LPA', experienced: '₹18-40 LPA', senior: '₹40-1CR+ LPA' },
        skills: ['Python/R', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
        growthRate: '+35%',
        jobOpenings: '25,000+',
        topCompanies: [
          { name: 'Flipkart', logo: '🛒', employees: '300+', rating: 4.3, location: 'Bangalore' },
          { name: 'Microsoft India', logo: '💻', employees: '200+', rating: 4.4, location: 'Hyderabad, Bangalore' },
        ],
        learningPath: ['Statistics & Math', 'Python/R Programming', 'ML Algorithms', 'Domain Expertise'],
        futureProspects: 'High demand in fintech, e-commerce, and healthcare sectors.',
        category: 'Analytics',
        locations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad']
      }
    };

    // Try to match the search query
    const matchedJob = Object.keys(jobDatabase).find(key => 
      jobTitle.includes(key) || key.includes(jobTitle)
    );

    if (matchedJob) {
      return jobDatabase[matchedJob];
    }

    // Default fallback for unknown careers
    return {
      title: query,
      description: `Explore career opportunities in ${query} within the Indian job market.`,
      averageSalary: { fresher: '₹4-10 LPA', experienced: '₹12-30 LPA', senior: '₹30-60+ LPA' },
      skills: ['Domain Knowledge', 'Problem Solving', 'Communication', 'Technical Skills'],
      growthRate: '+15%',
      jobOpenings: '10,000+',
      topCompanies: [
        { name: 'TCS', logo: '🏢', employees: '1000+', rating: 4.1, location: 'Pan India' },
        { name: 'Wipro', logo: '💼', employees: '800+', rating: 4.0, location: 'Bangalore, Mumbai' },
      ],
      learningPath: ['Build Domain Knowledge', 'Develop Core Skills', 'Gain Experience', 'Network Building'],
      futureProspects: 'Growing demand with digital transformation in India.',
      category: 'General',
      locations: ['Major Indian Cities']
    };
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || isLoading) return;

    setIsLoading(true);
    setIsSearchFocused(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const jobData = generateJobData(searchQuery.trim());
      
      setGlobalSearchQuery(searchQuery.trim());
      setSearchResults(jobData);
      setIsSearchActive(true);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-blue-50/70 to-slate-100/80" />

      {/* Logo - No Figma branding */}
      <div className="absolute top-6 left-6 z-20">
        <Logo />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced animated title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
              style={{ 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #2563eb 60%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ENTER YOUR
            </motion.h1>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black"
              style={{ 
                background: 'linear-gradient(135deg, #3730a3 0%, #4338ca 30%, #4f46e5 60%, #3730a3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              DREAM CAREER
            </motion.h1>
            
            <motion.div 
              className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 rounded-full mt-6 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.2, delay: 1 }}
            />
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI-powered career guidance tailored for the <span className="text-blue-600 font-bold">Indian job market</span>
          </motion.p>

          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="flex gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50"
              animate={{ 
                scale: isSearchFocused ? 1.02 : 1
              }}
            >
              <Input
                type="text"
                placeholder="e.g., Software Engineer, Data Scientist, Product Manager..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 border-0 bg-transparent text-xl px-8 py-5 focus:ring-0 focus:outline-none"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl px-10 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Search className="h-6 w-6 mr-3" />
                    Explore Career
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <span className="text-slate-600 text-lg mb-2">🔥 Trending careers:</span>
            {['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Digital Marketing'].map((term) => (
              <motion.button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-6 py-3 bg-white/70 hover:bg-white/90 text-slate-700 rounded-full backdrop-blur-sm border border-slate-200/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {term}
              </motion.button>
            ))}
          </motion.div>

          {/* Indian job market stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '2M+', label: 'Job Opportunities', icon: '💼' },
              { number: '500+', label: 'Top Companies', icon: '🏢' },
              { number: '50+', label: 'Career Paths', icon: '🚀' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/30"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl text-blue-600 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}