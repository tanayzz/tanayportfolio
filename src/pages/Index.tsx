import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDown, 
  Briefcase, 
  Code, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  User, 
  Zap,
  BookOpen,
  Trophy,
  Languages,
  MessageSquare,
  Sparkles,
  Heart,
  Coffee
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatbotBubble from "@/components/ChatbotBubble";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggType, setEasterEggType] = useState<string>("");
  const { toast } = useToast();
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [clickCount, setClickCount] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (blob1Ref.current) {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        blob1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      
      if (blob2Ref.current) {
        const x = (e.clientX / window.innerWidth) * -20 + 10;
        const y = (e.clientY / window.innerHeight) * -20 + 10;
        blob2Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);
      
      if (newKonami.join(',') === konamiCode.join(',')) {
        toast({
          title: "Konami Code Activated!",
          description: "You found an easter egg! Tanay would be impressed.",
        });
        setEasterEggType("konami");
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
        setKonami([]);
      }
      
      if (e.key === 't' || e.key === 'T') {
        const typed = e.key.toLowerCase();
        const expectedSequence = ['t', 'a', 'n', 'a', 'y'];
        
        if (typed === expectedSequence[0]) {
          const typingTimer = setTimeout(() => {
            const input = document.getElementById("typing-detector") as HTMLInputElement;
            if (input) {
              input.value = "";
            }
          }, 2000);
          
          const input = document.getElementById("typing-detector") as HTMLInputElement;
          if (input) {
            input.value += typed;
            if (input.value.toLowerCase() === 'tanay') {
              toast({
                title: "Name Easter Egg Found!",
                description: "You spelled my name! Here's a special animation.",
              });
              setEasterEggType("name");
              setShowEasterEgg(true);
              setTimeout(() => setShowEasterEgg(false), 3000);
              input.value = "";
              clearTimeout(typingTimer);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konami, toast]);

  const handleLogoClick = () => {
    setClickCount(clickCount + 1);
    
    if (clickCount === 5) {
      toast({
        title: "Logo Easter Egg Found!",
        description: "You clicked the logo 6 times! Secret message: Code is poetry.",
      });
      setEasterEggType("logo");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      setClickCount(0);
    }
  };

  const handleSecretAreaClick = () => {
    setSecretClicks(secretClicks + 1);
    
    if (secretClicks === 2) {
      toast({
        title: "Coffee Lover Easter Egg!",
        description: "You found Tanay's secret: He loves coffee while coding!",
      });
      setEasterEggType("coffee");
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      setSecretClicks(0);
    }
  };

  const handleDoubleClick = () => {
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 2000);
    toast({
      title: "Sparkles!",
      description: "Double-clicking creates magic ✨",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white" onDoubleClick={handleDoubleClick}>
      <input 
        id="typing-detector" 
        className="opacity-0 h-0 w-0 absolute -z-10" 
        type="text"
        aria-hidden="true"
      />
      
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span 
                className="text-lg font-semibold text-blue-700 cursor-pointer transition-transform hover:scale-110 duration-300" 
                onClick={handleLogoClick}
              >
                TM
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home", icon: <User size={16} /> },
                { id: "about", label: "About", icon: <FileText size={16} /> },
                { id: "skills", label: "Skills", icon: <Zap size={16} /> },
                { id: "projects", label: "Projects", icon: <Code size={16} /> },
                { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
                { id: "education", label: "Education", icon: <BookOpen size={16} /> },
                { id: "contact", label: "Contact", icon: <Mail size={16} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-blue-700 underline-animation after:scale-x-100"
                      : "text-gray-600 hover:text-blue-600 underline-animation"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <button className="p-2 text-blue-700">
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div 
              ref={blob1Ref}
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow transition-transform duration-700"
            ></div>
            <div 
              ref={blob2Ref}
              className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-1000 transition-transform duration-700"
            ></div>
          </div>
          
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Tanay Malepati
              </h1>
              <p className="text-xl sm:text-2xl text-blue-700 mb-8">
                UI/UX Designer & Developer
              </p>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
                Passionate about technology and design, with a strong interest in UI/UX. 
                Eager to explore innovative solutions that enhance user experiences through intuitive interfaces.
              </p>
              <button
                onClick={() => scrollToSection("about")}
                className="group inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Learn More
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
              
              <div className="mt-6 text-sm text-gray-400 hidden-text">
                Psst... <span>Try the Konami code: ↑↑↓↓←→←→BA</span>
              </div>
              
              <div 
                className="absolute -bottom-12 right-0 w-8 h-8 opacity-0 cursor-pointer" 
                onClick={handleSecretAreaClick}
                aria-hidden="true"
              ></div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                About Me
              </h2>
              <div className="glass-card rounded-xl p-6 md:p-8">
                <p className="text-gray-700 mb-6">
                  I'm a tech and design enthusiast with a strong interest in UI/UX design. My passion lies 
                  in creating intuitive interfaces that enhance user experiences and solve real-world problems.
                </p>
                <p className="text-gray-700 mb-6">
                  Currently pursuing B.E. in Information Science, I'm constantly exploring new technologies 
                  and design principles to create more effective digital experiences. I believe that good design 
                  is not just about aesthetics but about creating functional, accessible, and delightful user experiences.
                </p>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <Languages className="mr-2" size={20} />
                    Languages
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 font-medium">Telugu</span>
                      <span className="text-gray-500 ml-2">(Native)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 font-medium">English</span>
                      <span className="text-gray-500 ml-2">(Fluent)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 font-medium">Kannada</span>
                      <span className="text-gray-500 ml-2">(Proficient)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 font-medium">Hindi</span>
                      <span className="text-gray-500 ml-2">(Conversational)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                My Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-blue-700 mb-6">
                    Technical Skills
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "HTML", level: 80 },
                      { name: "Java/C (Basic)", level: 60 },
                      { name: "UI/UX", level: 85 },
                      { name: "Figma", level: 90 },
                    ].map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden group">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-blue-600 h-2 rounded-full group-hover:bg-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-blue-700 mb-6">
                    Soft Skills
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Communication", icon: "💬" },
                      { name: "Speech", icon: "🎤" },
                      { name: "Team Management", icon: "👥" },
                      { name: "Client Collaboration", icon: "🤝" },
                    ].map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow duration-300 hover:scale-105 transform"
                      >
                        <span className="text-2xl mb-2">{skill.icon}</span>
                        <span className="text-gray-700 text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "OTP Verifier",
                    tech: "Python",
                    description: "A secure OTP verification system with a Tkinter GUI that provides real-time feedback for users.",
                    details: "Features include secure validation, real-time feedback, and an intuitive user interface.",
                    icon: "🔒",
                  },
                  {
                    title: "Password Strength Tester",
                    tech: "C",
                    description: "A tool that evaluates password strength based on length, diversity, and complexity.",
                    details: "Assesses passwords using multiple criteria including character diversity and structural complexity.",
                    icon: "🔑",
                  },
                  {
                    title: "Vote Management System",
                    tech: "C",
                    description: "A stack-based system for managing candidates and votes with real-time results.",
                    details: "Efficiently manages candidate information and vote counting using a stack data structure.",
                    icon: "📊",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="glass-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="text-4xl mb-4">{project.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <div className="text-sm text-blue-600 mb-4">{project.tech}</div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <details className="group">
                        <summary className="text-blue-600 cursor-pointer flex items-center text-sm font-medium">
                          <span>Learn More</span>
                          <svg className="ml-1 h-4 w-4 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="mt-2 text-sm text-gray-600">{project.details}</p>
                      </details>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Work Experience
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <div className="glass-card rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Freelance UI/UX Designer
                      </h3>
                      <p className="text-blue-600">Self-Employed</p>
                    </div>
                    <div className="text-gray-500 mt-2 md:mt-0">
                      <span>Present</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Creating intuitive user interfaces and experiences for websites and applications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Collaborating directly with clients to understand their requirements and vision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Developing interactive prototypes using Figma to visualize design concepts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Conducting user research and usability testing to refine designs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="education" className="py-20 bg-gray-50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Education
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                  <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-1">
                    <h3 className="text-xl font-semibold text-gray-900">RV Institute of Technology and Management</h3>
                    <p className="text-blue-600">B.E. in Information Science</p>
                    <p className="text-gray-600">2023 - Present</p>
                  </div>
                </div>
                
                <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                  <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-1">
                    <h3 className="text-xl font-semibold text-gray-900">Sri Chaitanya PU and CBSE College</h3>
                    <p className="text-gray-600">11th and 12th Grade</p>
                  </div>
                </div>
                
                <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                  <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-1">
                    <h3 className="text-xl font-semibold text-gray-900">Sri Chaitanya Techno School</h3>
                    <p className="text-gray-600">8th to 10th Grade</p>
                  </div>
                </div>
                
                <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                  <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-1">
                    <h3 className="text-xl font-semibold text-gray-900">Clarence Public School, Bangalore</h3>
                    <p className="text-gray-600">Up to 7th Grade</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16">
                <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                  Certifications & Courses
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      title: "Data Structures in C++",
                      issuer: "Online Course",
                      icon: "📚",
                    },
                    {
                      title: "NCDTE 2024 Participation Certificate",
                      issuer: "National Conference",
                      icon: "🏆",
                    },
                    {
                      title: "Microsoft Excel for Data Management",
                      issuer: "Microsoft",
                      icon: "📊",
                    },
                  ].map((cert, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      className="glass-card rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">{cert.icon}</div>
                      <h4 className="font-medium text-gray-900">{cert.title}</h4>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-16">
                <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                  Extracurriculars & Achievements
                </h3>
                
                <div className="max-w-3xl mx-auto">
                  <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
                    <div className="mb-4 flex items-center">
                      <Trophy className="text-blue-500 mr-2" size={24} />
                      <h4 className="text-xl font-medium text-gray-900">Track & Field</h4>
                    </div>
                    <p className="text-gray-700 mb-2">Experience in sprint and hurdle races at school level.</p>
                    <p className="text-gray-700">Multiple 1st/2nd place finishes in track events (early school years).</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Get In Touch
              </h2>
              
              <div className="max-w-xl mx-auto text-center mb-12">
                <p className="text-gray-600">
                  Feel free to reach out to me for opportunities, collaborations, or just to say hello!
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
                <a
                  href="tel:9448529581"
                  className="glass-card flex flex-col items-center p-6 rounded-xl w-60 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("9448529581");
                    toast({
                      title: "Phone number copied!",
                      description: "The phone number has been copied to your clipboard.",
                    });
                  }}
                >
                  <MessageSquare className="text-blue-600 mb-3" size={28} />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">9448529581</p>
                </a>
                
                <a
                  href="mailto:socials.tanay@gmail.com"
                  className="glass-card flex flex-col items-center p-6 rounded-xl w-60 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="text-blue-600 mb-3" size={28} />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">socials.tanay@gmail.com</p>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/tanaymalepati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex flex-col items-center p-6 rounded-xl w-60 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <Linkedin className="text-blue-600 mb-3" size={28} />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">LinkedIn</h3>
                  <p className="text-gray-600">Connect with me</p>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Tanay Malepati. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Designed and built with passion <Heart className="inline-block text-red-500 h-4 w-4" size={16} />
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            {easterEggType === "konami" && (
              <div className="text-7xl">🎮</div>
            )}
            {easterEggType === "name" && (
              <div className="text-7xl">🌟</div>
            )}
            {easterEggType === "logo" && (
              <div className="text-7xl">💻</div>
            )}
            {easterEggType === "coffee" && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-7xl"
              >
                <Coffee size={100} className="text-amber-700" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <div className="absolute" style={{ left: `${mousePosition.x - 20}px`, top: `${mousePosition.y - 20}px` }}>
              <Sparkles className="text-yellow-400" size={40} />
            </div>
            <div className="absolute" style={{ left: `${mousePosition.x + 30}px`, top: `${mousePosition.y - 30}px` }}>
              <Sparkles className="text-blue-400" size={30} />
            </div>
            <div className="absolute" style={{ left: `${mousePosition.x - 40}px`, top: `${mousePosition.y + 20}px` }}>
              <Sparkles className="text-purple-400" size={35} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ChatbotBubble chatbotUrl="https://www.chatbase.co/chatbot-iframe/wW7Sy4EnqLqgtjo77VepB" />
    </div>
  );
};

export default Index;
