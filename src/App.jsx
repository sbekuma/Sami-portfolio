import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Cpu, 
  Database, 
  Cloud, 
  Server, 
  Terminal,
  Activity,
  Layers,
  GitCommit,
  Command,
  Code,
  Users,
  TrendingUp,
  Globe,
  Zap,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  GraduationCap,
  Award,
  BarChart3,
  ShieldCheck,
  FileSearch,
  Sun,
  Moon,
  Building2,
  Layout,
  Menu,
  X
} from 'lucide-react';

const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleExperiences, setVisibleExperiences] = useState(new Set());
  const [formStatus, setFormStatus] = useState('idle');
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const containerRef = useRef(null);
  const experienceRefs = useRef([]);
  const formRef = useRef(null);

  // Theme Configuration
  const isDark = theme === 'dark';
  const t = {
    bg: isDark ? 'bg-[#050505]' : 'bg-slate-50',
    bgSecondary: isDark ? 'bg-[#0a0a0a]' : 'bg-white',
    text: isDark ? 'text-gray-300' : 'text-slate-600',
    textHead: isDark ? 'text-white' : 'text-slate-900',
    textSub: isDark ? 'text-gray-400' : 'text-slate-500',
    border: isDark ? 'border-white/5' : 'border-slate-200',
    accent: isDark ? 'text-cyan-500' : 'text-indigo-600',
    accentBg: isDark ? 'bg-cyan-500' : 'bg-indigo-600',
    accentBorder: isDark ? 'border-cyan-500' : 'border-indigo-600',
    accentHover: isDark ? 'hover:text-cyan-400' : 'hover:text-indigo-500',
    accentBorderHover: isDark ? 'hover:border-cyan-500/50' : 'hover:border-indigo-600/50',
    gradientText: isDark 
      ? 'bg-gradient-to-r from-gray-100 to-gray-600' 
      : 'bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900',
    gridColor: isDark ? '#333' : '#cbd5e1', 
    highlight: isDark ? 'bg-white/5' : 'bg-slate-100',
    shadow: isDark ? 'shadow-2xl' : 'shadow-xl shadow-indigo-100',
    navBg: isDark ? 'bg-[#050505]/95' : 'bg-slate-50/95'
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleExperiences((prev) => new Set(prev).add(index));
          } else {
            setVisibleExperiences((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px 0px" }
    );

    experienceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formsubmit.co/ajax/samibekuma.tmc@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        formRef.current.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const navItems = ['Experience', 'Projects', 'Education', 'Skills', 'Contact'];

  const experiences = [
    {
      role: "Machine Learning Engineer",
      company: "Comcast / Xfinity Voice AI",
      period: "2024 — Present",
      type: "complex",
      tech: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Agent-to-Agent (A2A)', 'Azure OpenAI', 'Gemma', 'Qwen', 'DeepEval', 'Langfuse', 'OpenTelemetry', 'AWS S3', 'PostgreSQL', 'Grafana', 'Kubernetes', 'Transformers', 'Scikit-learn'],
      highlights: [
        { 
          icon: <ShieldCheck className={`w-6 h-6 ${t.accent}`} />,
          title: "Agentic AI Failure-Investigation Platform",
          desc: "Architected and built from scratch an agentic AI failure-investigation platform for Comcast’s US/UK production Voice RAG system, combining deterministic triage with LLM reasoning and diagnostic tool selection across policy screening, entity/facet extraction, retrieval, and response generation; reduced root-cause investigation time from 30+ minutes to under 30 seconds across 10K+ triaged queries daily."
        },
        { 
          icon: <Globe className={`w-6 h-6 ${t.accent}`} />,
          title: "Xfinity Voice Remote AI Platform & Multi-language NLP",
          desc: "Developed and scaled production NLP services for the Xfinity Voice Remote AI platform, processing 20M+ daily voice commands across North America and Europe, powering multilingual device control (navigation, app launching), and content-discovery experiences including Olympics and NFL content on Peacock."
        },
        { 
          icon: <Cpu className={`w-6 h-6 ${t.accent}`} />,
          title: "Supervised Intent-Classification Routing",
          desc: "Designed and productionized a supervised intent-classification model using Python, Scikit-learn, and Transformers to intelligently route requests between LLM/RAG pipelines and traditional CPU-based services, reducing infrastructure costs while maintaining response quality."
        },
        { 
          icon: <GitCommit className={`w-6 h-6 ${t.accent}`} />,
          title: "Automated LLM Evaluation Framework & CI/CD",
          desc: "Built an automated LLM evaluation framework in Python and integrated it into Azure CI/CD pipelines, using Azure OpenAI and a fine-tuned Qwen model for LLM-as-a-Judge evaluation of factuality, hallucination, relevance, toxicity, and multi-turn conversational quality; reduced release-validation cycles by 85%."
        },
        { 
          icon: <Code className={`w-6 h-6 ${t.accent}`} />,
          title: "End-to-End AI Evaluation Platform & Analytics",
          desc: "Built an end-to-end AI evaluation platform with Python backend services and a React frontend, enabling engineers to execute evaluation suites, compare model performance, visualize evaluation metrics on dynamic dashboards, and interactively investigate LLM failures."
        },
        { 
          icon: <Activity className={`w-6 h-6 ${t.accent}`} />,
          title: "Latency-Aware Load Balancing & Observability",
          desc: "Designed and deployed latency-aware load balancing for production voice services, using real-time Grafana observability and metrics pipelines to monitor latency, throughput, and system health; reduced request timeouts by 9%."
        },
        { 
          icon: <Users className={`w-6 h-6 ${t.accent}`} />,
          title: "Cross-Functional Collaboration & Product Alignment",
          desc: "Collaborated with product, business, and engineering stakeholders to translate complex problem statements into data-driven solutions, aligning ML model outputs with user experience and business goals."
        }
      ]
    },
    {
      role: "Lead Tutor",
      company: "Tutoring Club of McLean",
      period: "2022 — 2024",
      type: "simple",
      points: [
        "Mentored students in Java and Python programming, breaking down complex algorithmic concepts into digestible, practical lessons.",
        "Provided comprehensive test preparation strategies for SAT and ACT, helping students significantly improve their standardized test scores.",
        "Managed scheduling and progress tracking for multiple students, adapting teaching methodologies to accommodate individual learning styles."
      ]
    },
    {
      role: "Assistant Manager",
      company: "Reef Parking Technology",
      period: "2020 — 2022",
      type: "simple",
      points: [
        "Automated operational workflows, reducing manual workload and improving data accuracy for daily operational reporting.",
        "Led and trained a cross-functional team of 15+ staff, optimizing processes for efficiency and overall service quality."
      ]
    }
  ];

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${t.bg} ${t.text} font-sans transition-colors duration-500 overflow-x-hidden selection:bg-cyan-900/30 selection:text-cyan-200`}
    >
      {/* Dynamic Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${t.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${t.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 70%)`
        }}
      />
      
      {/* Ambient Glow */}
      <div 
        className={`fixed pointer-events-none z-0 w-[800px] h-[800px] rounded-full blur-[120px] transition-transform duration-100 ease-out ${isDark ? 'bg-cyan-900/10' : 'bg-indigo-500/10'}`}
        style={{
          left: mousePos.x - 400,
          top: mousePos.y - 400,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b ${t.border} ${t.navBg} backdrop-blur-xl transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'} flex items-center justify-center font-bold text-sm rounded-sm`}>
              SB
            </div>
            <span className={`font-mono text-xs ${t.textSub} tracking-widest uppercase hidden sm:inline`}>
              System Status: <span className={isDark ? 'text-green-500' : 'text-emerald-600'}>Online</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-12 text-xs font-mono tracking-widest uppercase ${t.textSub}`}>
            {navItems.map((item, index) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${t.accentHover} transition-colors duration-300`}
              >
                0{index + 1}. {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full border ${t.border} ${t.textSub} hover:${t.textHead} hover:border-current transition-colors`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a 
              href="/Sami Bekuma ML Engineer.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex group items-center gap-3 text-xs font-mono uppercase tracking-widest ${t.accentHover} transition-colors`}
            >
              Download_Resume.pdf
              <span className={`block w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-green-500 group-hover:bg-cyan-400' : 'bg-emerald-500 group-hover:bg-indigo-500'}`}></span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-md ${t.textSub} hover:${t.textHead}`}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full ${t.navBg} border-b ${t.border} p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5 duration-200`}>
            {navItems.map((item, index) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-left text-sm font-mono uppercase tracking-widest ${t.textSub} ${t.accentHover}`}
              >
                0{index + 1}. {item}
              </button>
            ))}
            <a 
              href="/Sami Bekuma ML Engineer.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 text-sm font-mono uppercase tracking-widest ${t.textHead}`}
            >
              Download_Resume.pdf
              <span className={`block w-2 h-2 rounded-full ${isDark ? 'bg-green-500' : 'bg-emerald-500'}`}></span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1 border ${isDark ? 'border-cyan-900/30 bg-cyan-900/5 text-cyan-400' : 'border-indigo-200 bg-indigo-50 text-indigo-700'} text-xs font-mono tracking-widest uppercase rounded-sm`}>
                <Activity className="w-3 h-3" />
                Principal Engineering Logic
              </div>
              
              <h1 className={`text-5xl md:text-8xl font-medium tracking-tighter ${t.textHead} leading-[1.1] md:leading-[0.9]`}>
                Architecting <br />
                <span className={`text-transparent bg-clip-text ${t.gradientText}`}>
                  Intelligence.
                </span>
              </h1>
              
               <p className={`text-lg md:text-2xl ${t.textSub} max-w-2xl leading-relaxed font-light`}>
                My name is <span className={`font-semibold ${t.textHead} underline decoration-2 ${isDark ? 'decoration-cyan-500/50' : 'decoration-indigo-500/50'} underline-offset-4`}>Sami Bekuma</span>. 
                I build the robust validation systems that power millions of reliable AI interactions. 
                Machine Learning Engineer specializing in <span className={`${t.textHead} font-medium`}>automated evaluation frameworks</span>, 
                <span className={`${t.textHead} font-medium`}> high-scale NLP testing</span>, and <span className={`${t.textHead} font-medium`}>production AI reliability</span>.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 md:pt-8">
                <div className={`flex flex-col gap-1 border-l ${t.border} pl-6`}>
                  <span className={`text-3xl md:text-4xl font-light ${t.textHead}`}>20M+</span>
                  <span className={`text-xs font-mono ${t.textSub} uppercase tracking-widest`}>Daily Interactions</span>
                </div>
                <div className={`flex flex-col gap-1 border-l ${t.border} pl-6`}>
                  <span className={`text-3xl md:text-4xl font-light ${t.textHead}`}>-85%</span>
                  <span className={`text-xs font-mono ${t.textSub} uppercase tracking-widest`}>Validation Cycle Time</span>
                </div>
                <div className={`flex flex-col gap-1 border-l ${t.border} pl-6`}>
                  <span className={`text-3xl md:text-4xl font-light ${t.textHead}`}>9%</span>
                  <span className={`text-xs font-mono ${t.textSub} uppercase tracking-widest`}>Latency Reduction</span>
                </div>
              </div>
            </div>

            {/* Visual Abstract */}
            <div className="md:col-span-4 flex items-center justify-center relative mt-8 md:mt-0">
              <div className={`w-full max-w-[300px] md:max-w-full aspect-square border ${isDark ? 'border-white/10' : 'border-slate-300'} rounded-full flex items-center justify-center relative group`}>
                <div className={`absolute inset-0 border border-dashed ${isDark ? 'border-white/5' : 'border-slate-200'} rounded-full animate-[spin_20s_linear_infinite]`}></div>
                <div className={`absolute inset-4 border ${isDark ? 'border-white/5' : 'border-slate-200'} rounded-full animate-[spin_15s_linear_infinite_reverse]`}></div>
                <div className={`w-24 h-24 md:w-32 md:h-32 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-200'} backdrop-blur-md rounded-full flex items-center justify-center border z-10`}>
                  <Cpu className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'text-white/80' : 'text-slate-800'}`} />
                </div>
                
                {/* Orbital Nodes */}
                <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 ${t.bg} border ${t.accentBorder} rounded-full`}></div>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 ${t.bg} border ${isDark ? 'border-white/20' : 'border-slate-300'} rounded-full`}></div>
                <div className={`absolute bottom-1/4 right-0 w-2 h-2 md:w-3 md:h-3 ${isDark ? 'bg-cyan-500' : 'bg-indigo-500'} rounded-full blur-[2px]`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 md:py-32 border-t ${t.border} relative z-10`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
            <div>
              <h2 className={`text-xs font-mono ${t.accent} tracking-widest uppercase mb-4`}>01 // Professional Experience</h2>
              <h3 className={`text-3xl md:text-5xl ${t.textHead} font-medium tracking-tight`}>Work Experience</h3>
            </div>
            <p className={`${t.textSub} max-w-md text-sm leading-relaxed border-l ${t.border} pl-4`}>
              My focus is guaranteeing AI reliability and quality at scale. I architect the automated test infrastructure, continuous validation pipelines, and evaluation frameworks that ensure models are safe and effective in production.
            </p>
          </div>

          <div className={`relative border-l ${t.border} ml-3 md:ml-0 space-y-20 md:space-y-24`}>
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                data-index={idx}
                ref={el => experienceRefs.current[idx] = el}
                className={`relative pl-8 md:pl-12 transition-all duration-500 ${
                  visibleExperiences.has(idx) ? 'opacity-100' : 'opacity-40 grayscale'
                }`}
              >
                {/* Timeline Dot - Reactive */}
                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-current transition-colors duration-500 ${
                  visibleExperiences.has(idx) ? `${t.accentBg} ${isDark ? 'ring-[#050505] shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'ring-slate-50 shadow-[0_0_15px_rgba(79,70,229,0.4)]'}` : `bg-gray-800 ${isDark ? 'ring-[#050505]' : 'ring-slate-50'}`
                }`}></div>
                
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <h4 className={`text-xl md:text-2xl ${t.textHead} font-medium`}>{exp.role}</h4>
                    <div className={`${t.accent} font-mono text-sm mt-2`}>{exp.company}</div>
                    <div className={`${t.textSub} text-sm mt-1`}>{exp.period}</div>
                    
                    {exp.tech && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.tech.map(tech => (
                          <span key={tech} className={`px-2 py-1 ${t.highlight} ${t.textSub} text-xs border ${t.border} rounded-sm`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-8 space-y-8">
                    {exp.type === 'complex' ? (
                      exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className={`group relative ${t.bgSecondary} border ${t.border} p-6 ${t.accentBorderHover} transition-all duration-300`}>
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            {highlight.icon}
                          </div>
                          <h5 className={`${t.textHead} font-medium mb-3 flex items-center gap-3`}>
                            <span className={`${t.accent} font-mono text-xs`}>0{hIdx + 1}</span>
                            {highlight.title}
                          </h5>
                          <p className={`${t.textSub} text-sm leading-relaxed`}>
                            {highlight.desc}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className={`${t.bgSecondary} border ${t.border} p-8 relative`}>
                         <ul className="space-y-4">
                           {exp.points.map((point, pIdx) => (
                             <li key={pIdx} className={`flex items-start gap-3 ${t.textSub} text-sm leading-relaxed`}>
                               <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                               <span>{point}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 md:py-32 ${isDark ? 'bg-[#080808]' : 'bg-slate-100/50'} border-y ${t.border} z-10 relative`}>
         {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className={`text-xs font-mono ${t.accent} tracking-widest uppercase mb-4`}>02 // Technical Portfolio</h2>
          <h3 className={`text-3xl md:text-5xl ${t.textHead} font-medium tracking-tight mb-16 md:mb-20`}>Selected Projects</h3>

          <div className="grid grid-cols-1 gap-12">
            
            {/* Project 0: Agentic AI Failure Investigation Platform */}
            <div className={`group grid md:grid-cols-2 border ${t.border} ${t.bg} ${t.accentBorderHover} transition-all duration-500 rounded-xl overflow-hidden shadow-xl`}>
              <div className={`p-6 md:p-10 ${t.bgSecondary} flex flex-col justify-center relative overflow-hidden order-last md:order-first border-t md:border-t-0 md:border-r ${t.border}`}>
                {/* Animated Agentic Architecture Diagram */}
                <div className={`relative z-10 w-full max-w-sm border ${t.border} ${isDark ? 'bg-[#0e0e0e]' : 'bg-white'} p-5 font-mono text-xs ${t.textSub} rounded-lg shadow-lg space-y-4 mx-auto`}>
                  <div className={`flex justify-between items-center border-b ${t.border} pb-3`}>
                     <span className={`${t.textHead} font-medium flex items-center gap-2`}><Activity className={`w-4 h-4 ${t.accent} animate-pulse`}/> LangGraph Live Agent</span>
                     <span className={`${isDark ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800/50' : 'text-indigo-700 bg-indigo-50 border border-indigo-200'} px-2 py-0.5 rounded text-[10px] animate-pulse font-semibold`}>Active Node</span>
                  </div>

                  {/* Flow Steps Animation */}
                  <div className="space-y-2.5">
                    <div className={`p-3 rounded-md border ${isDark ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'} flex items-center justify-between text-[11px] shadow-sm`}>
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> 1. S3 Trace & Triage</span>
                      <span className="text-[10px] opacity-70 font-semibold">Deterministic</span>
                    </div>
                    
                    <div className="flex justify-center my-1">
                      <div className={`w-0.5 h-3.5 ${isDark ? 'bg-cyan-500/50' : 'bg-indigo-400/50'} animate-pulse`}></div>
                    </div>

                    <div className={`p-3 rounded-md border ${isDark ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200' : 'bg-indigo-100 border-indigo-300 text-indigo-950'} flex items-center justify-between text-[11px] shadow-md`}>
                      <span className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 animate-spin text-cyan-400" /> 2. A2A Tool Selection</span>
                      <span className="text-[10px] font-bold">Gemma/OpenAI</span>
                    </div>

                    <div className="flex justify-center my-1">
                      <div className={`w-0.5 h-3.5 ${isDark ? 'bg-cyan-500/50' : 'bg-indigo-400/50'} animate-pulse`}></div>
                    </div>

                    <div className={`p-3 rounded-md border ${isDark ? 'bg-green-950/30 border-green-500/30 text-green-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'} flex items-center justify-between text-[11px] shadow-sm`}>
                      <span className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> 3. Pydantic Diagnostic Report</span>
                      <span className="text-[10px] opacity-70 font-semibold">&lt;30s</span>
                    </div>
                  </div>

                  <div className={`pt-3 border-t ${t.border} flex justify-between text-[10px]`}>
                     <span>Cost Routing: <strong className={t.accent}>-45% Tokens</strong></span>
                     <span className={isDark ? "text-green-400 font-semibold" : "text-emerald-600 font-semibold"}>Langfuse Traced</span>
                  </div>
                </div>

                {/* Diagnostic Engine Summary Card */}
                <div className={`relative z-10 w-full max-w-sm border ${t.border} ${isDark ? 'bg-[#0e0e0e]' : 'bg-white'} p-5 font-mono text-xs ${t.textSub} rounded-lg shadow-lg mt-5 mx-auto`}>
                  <div className={`flex justify-between items-center mb-3 border-b ${t.border} pb-2.5`}>
                     <span className={`${t.textHead} font-medium flex items-center gap-2`}><Activity className={`w-4 h-4 ${t.accent}`}/> Diagnostic Engine</span>
                     <span className={`${isDark ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800/50' : 'text-indigo-700 bg-indigo-50 border border-indigo-200'} px-2 py-0.5 rounded text-[10px]`}>Active Trace</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span>Investigation Time</span>
                       <span className={`${t.accent} font-semibold`}>&lt; 30 sec</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span>Daily Triage Volume</span>
                       <span className={`${t.accent} font-semibold`}>10K+ queries</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span>Evaluation Cost Savings</span>
                       <span className={isDark ? "text-green-400 font-semibold" : "text-emerald-600 font-semibold"}>~45% reduction</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span>Tracing & Observability</span>
                       <span className={`${t.accent} font-semibold`}>Langfuse + Otel</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r ${t.border} relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isDark ? 'from-cyan-500' : 'from-indigo-600'} to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className={`w-5 h-5 ${t.accent}`} />
                    <span className={`font-mono text-xs ${t.accent} uppercase tracking-widest font-semibold`}>Agentic AI & Diagnostics</span>
                  </div>
                  <h4 className={`text-2xl md:text-3xl ${t.textHead} font-medium mb-4 tracking-tight`}>Agentic AI Failure Investigation Platform for Voice RAG</h4>
                  
                  {/* Styled Tech Stack Pill Box */}
                  <div className={`mb-6 p-4 rounded-lg border ${t.border} ${isDark ? 'bg-white/[0.02]' : 'bg-slate-50'} shadow-sm`}>
                    <p className={`${t.textHead} leading-relaxed text-xs md:text-sm font-mono font-medium tracking-wide`}>
                      Python <span className={t.accent}>|</span> LangGraph <span className={t.accent}>|</span> LangChain <span className={t.accent}>|</span> FastAPI <span className={t.accent}>|</span> Agent-to-Agent (A2A) <span className={t.accent}>|</span> Pydantic <span className={t.accent}>|</span> Azure OpenAI <span className={t.accent}>|</span> Gemma <span className={t.accent}>|</span> DeepEval <span className={t.accent}>|</span> Langfuse <span className={t.accent}>|</span> OpenTelemetry <span className={t.accent}>|</span> AWS S3 <span className={t.accent}>|</span> PostgreSQL
                    </p>
                  </div>

                  <ul className={`space-y-3.5 text-sm ${t.textSub} mb-8`}>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                      <span>Designed a dual-mode diagnostic engine supporting both live requests and historical S3 production traces, reconstructing and normalizing pipeline evidence for automated root-cause analysis.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                      <span>Built hybrid deterministic triage and LLM-driven workflows with LangGraph and LangChain, enabling agents to dynamically select diagnostic tools and isolate failures across policy screening, entity/facet extraction, retrieval, and response generation.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                      <span>Implemented cost-aware model routing across Azure OpenAI and open-source Gemma models, directing targeted DeepEval workloads to lower-cost models and reducing evaluation token costs by ~45% while preserving frontier models.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                      <span>Developed a fault-tolerant FastAPI service using Agent-to-Agent (A2A) and Pydantic, generating schema-validated diagnostic reports backed by AWS S3 trace reconstruction and PostgreSQL checkpointing.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className={`w-4 h-4 ${t.accent} mt-1 shrink-0`} />
                      <span>Integrated Langfuse and OpenTelemetry for end-to-end observability, tracing multi-step agent trajectories and individual tool calls to monitor latency, token usage, cost, and performance bottlenecks.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  {[
                    'LangGraph & LangChain Agents', 
                    'FastAPI & Pydantic A2A Architecture', 
                    'DeepEval & Langfuse End-to-End Observability'
                  ].map((stack, i) => (
                    <div key={i} className={`flex items-center gap-3 text-xs md:text-sm ${t.textSub} font-mono`}>
                      <div className={`w-2 h-2 ${isDark ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-indigo-600'} rounded-full`}></div>
                      <span className={t.textHead}>{stack}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 1: Comcast RAG Evaluation Platform */}
            <div className={`group grid md:grid-cols-2 border ${t.border} ${t.bg} ${t.accentBorderHover} transition-all duration-500`}>
              <div className={`p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r ${t.border} relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isDark ? 'from-cyan-500' : 'from-indigo-600'} to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className={`w-5 h-5 ${t.accent}`} />
                    <span className={`font-mono text-xs ${t.accent} uppercase tracking-widest`}>RAG Evaluation Platform</span>
                  </div>
                  <h4 className={`text-2xl md:text-3xl ${t.textHead} font-medium mb-4`}>Enterprise RAG & KPI Testing</h4>
                  <p className={`${t.textSub} leading-relaxed mb-8`}>
                    Built a comprehensive evaluation platform for testing RAG applications at scale. Implemented automated model-level testing and tracking for business-critical KPIs tailored to Comcast's specific domain requirements.
                  </p>
                </div>

                <div className="space-y-4">
                  {['FastAPI / Angular / Python', 'LangChain & DeepEval', 'LLM-as-a-Judge (Azure/Open Source)'].map((stack, i) => (
                    <div key={i} className={`flex items-center gap-4 text-sm ${t.textSub} font-mono`}>
                      <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full`}></div>
                      {stack}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-8 md:p-12 ${t.bgSecondary} flex flex-col items-center justify-center relative overflow-hidden`}>
                 {/* Decorative Tech Illustration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <div className={`w-full h-full border-2 border-dashed ${isDark ? 'border-cyan-500/30' : 'border-indigo-600/30'} rounded-lg`}></div>
                </div>
                
                {/* Logo moved to the left box (visual container) above the report */}
                <div className="relative z-10 w-full max-w-sm mb-6 flex justify-start">
                   <img 
                     src="/comcast.png" 
                     alt="Comcast" 
                     className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                     onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       // Show text fallback if image fails
                       e.currentTarget.nextSibling.style.display = 'block';
                     }}
                   />
                   <span className={`hidden text-xl font-bold ${t.textHead} tracking-tighter`}>COMCAST</span>
                </div>

                <div className={`relative z-10 w-full max-w-sm border ${t.border} ${t.bg} p-6 font-mono text-xs ${t.textSub} ${t.shadow}`}>
                  <div className={`flex justify-between items-center mb-6 border-b ${t.border} pb-4`}>
                     <span className={`${t.textHead} font-medium flex items-center gap-2`}><Activity className={`w-4 h-4 ${t.accent}`}/> Evaluation Report</span>
                     <span className={`${isDark ? 'text-green-500 bg-green-500/10' : 'text-emerald-700 bg-emerald-100'} px-2 py-1 rounded`}>Pass</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3"/> Factuality</span>
                       <span className={t.accent}>0.98</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'} h-1 rounded-full`}><div className={`${isDark ? 'bg-cyan-500' : 'bg-indigo-600'} h-1 rounded-full w-[98%]`}></div></div>
                    
                    <div className="flex justify-between items-center pt-2">
                       <span className="flex items-center gap-2"><FileSearch className="w-3 h-3"/> Context Relevance</span>
                       <span className={t.accent}>0.95</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'} h-1 rounded-full`}><div className={`${isDark ? 'bg-cyan-500' : 'bg-indigo-600'} h-1 rounded-full w-[95%]`}></div></div>

                    <div className="flex justify-between items-center pt-2">
                       <span className="flex items-center gap-2"><AlertCircle className="w-3 h-3"/> Hallucination</span>
                       <span className={isDark ? "text-green-400" : "text-emerald-600"}>0.02</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'} h-1 rounded-full`}><div className={`${isDark ? 'bg-green-500' : 'bg-emerald-500'} h-1 rounded-full w-[2%]`}></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Smart Health Scheduler */}
            <div className={`group grid md:grid-cols-2 border ${t.border} ${t.bg} ${t.accentBorderHover} transition-all duration-500`}>
               <div className={`p-2 md:p-4 ${t.bgSecondary} flex items-center justify-center relative overflow-hidden order-last md:order-first`}>
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                   {[...Array(36)].map((_, i) => (
                     <div key={i} className={`border ${t.border}`}></div>
                   ))}
                </div>
                
                {/* Live System Screenshot Placeholder */}
                <div className="relative z-10 w-full rounded overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                    <img 
                        src="/care-connect.png" 
                        alt="CareConnect Interface" 
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className={`hidden h-32 md:h-48 w-full ${t.bg} flex items-center justify-center text-sm ${t.textSub}`}>
                        System Screenshot Placeholder
                    </div>
                </div>
              </div>

              <div className={`p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-l ${t.border} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-l ${isDark ? 'from-cyan-500' : 'from-indigo-600'} to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Database className={`w-5 h-5 ${t.accent}`} />
                    <span className={`font-mono text-xs ${t.accent} uppercase tracking-widest`}>Full Stack AI</span>
                  </div>
                  <h4 className={`text-2xl md:text-3xl ${t.textHead} font-medium mb-4`}>Smart Health Scheduler</h4>
                  <p className={`${t.textSub} leading-relaxed mb-8`}>
                    A production-grade scheduling platform integrating Google Gemini for conversational triage. It replaces manual booking with an automated, conflict-aware backend system.
                  </p>
                </div>

                {/* API Endpoint Card - Moved to Description Column */}
                <div className={`relative w-full border ${t.border} ${t.bgSecondary} p-6 font-mono text-xs ${t.textSub} ${t.shadow} mb-8`}>
                  <div className={`flex gap-2 mb-4 border-b ${t.border} pb-4`}>
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={t.accent}>POST /api/schedule</span>
                      <span className={isDark ? "text-green-500" : "text-emerald-600"}>200 OK</span>
                    </div>
                    <div className={`pl-4 border-l ${t.border} ${t.textSub}`}>
                      {`{`} <br/>
                      &nbsp;&nbsp;{`"intent": "booking",`} <br/>
                      &nbsp;&nbsp;{`"confidence": 0.98,`} <br/>
                      &nbsp;&nbsp;{`"conflict_check": true`} <br/>
                      {`}`}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {['Node.js / Express Backend', 'Generative AI Agent (Gemini)', 'MySQL Transactional Logic'].map((stack, i) => (
                    <div key={i} className={`flex items-center gap-4 text-sm ${t.textSub} font-mono`}>
                      <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full`}></div>
                      {stack}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto">
                  <a 
                    href="https://care-connect-ecru.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium ${t.textHead} ${t.accentHover} transition-colors`}
                  >
                    <ExternalLink className="w-4 h-4" /> Live System
                  </a>
                  <a 
                    href="https://github.com/sbekuma/CareConnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium ${t.textSub} ${t.accentHover} transition-colors`}
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </div>
            </div>

             {/* Project 3: Pipeline */}
             <div className={`group grid md:grid-cols-2 border ${t.border} ${t.bg} ${t.accentBorderHover} transition-all duration-500`}>
              <div className={`p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r ${t.border} relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isDark ? 'from-cyan-500' : 'from-indigo-600'} to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Cloud className={`w-5 h-5 ${t.accent}`} />
                    <span className={`font-mono text-xs ${t.accent} uppercase tracking-widest`}>Cloud Infrastructure</span>
                  </div>
                  <h4 className={`text-2xl md:text-3xl ${t.textHead} font-medium mb-4`}>Event-Driven Ingestion Pipeline</h4>
                  <p className={`${t.textSub} leading-relaxed mb-8`}>
                    An end-to-end data pipeline on AWS. It automates ingestion via S3 event triggers, processing data through Lambda for immediate indexing in OpenSearch.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {['AWS Lambda & S3 Triggers', 'OpenSearch Service', 'Real-time Analytics'].map((stack, i) => (
                    <div key={i} className={`flex items-center gap-4 text-sm ${t.textSub} font-mono`}>
                      <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full`}></div>
                      {stack}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto">
                  <a 
                    href="https://github.com/sbekuma/ETL-Data-Pipiline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium ${t.textSub} ${t.accentHover} transition-colors`}
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </div>

               <div className={`p-8 md:p-12 ${t.bgSecondary} flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className={`w-64 h-64 border ${isDark ? 'border-cyan-500' : 'border-indigo-600'} rounded-full animate-ping duration-[3s]`}></div>
                 </div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="flex gap-8 items-center">
                    <div className={`w-16 h-16 border ${isDark ? 'border-white/20' : 'border-slate-300'} ${t.bg} flex items-center justify-center rounded-lg`}>
                      <Cloud className={`w-6 h-6 ${t.textHead}`} />
                    </div>
                    <ArrowRight className={`w-6 h-6 ${t.textSub}`} />
                     <div className={`w-16 h-16 border ${isDark ? 'border-white/20' : 'border-slate-300'} ${t.bg} flex items-center justify-center rounded-lg`}>
                      <Server className={`w-6 h-6 ${t.textHead}`} />
                    </div>
                    <ArrowRight className={`w-6 h-6 ${t.textSub}`} />
                     <div className={`w-16 h-16 border ${isDark ? 'border-cyan-500/30' : 'border-indigo-600/30'} ${t.bg} flex items-center justify-center rounded-lg ${t.shadow}`}>
                      <Database className={`w-6 h-6 ${t.accent}`} />
                    </div>
                  </div>
                  <div className={`font-mono text-xs ${t.textSub} mt-4 ${t.bg} px-3 py-1 border ${t.border} rounded-full`}>
                    Latency: &lt;50ms
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4: RAG System */}
            <div className={`group grid md:grid-cols-2 border ${t.border} ${t.bg} ${t.accentBorderHover} transition-all duration-500`}>
               <div className={`p-8 md:p-12 ${t.bgSecondary} flex items-center justify-center relative overflow-hidden order-last md:order-first`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <img 
                      src="/rag-architecture.png" 
                      alt="RAG System Architecture" 
                      className="w-full h-full object-contain p-8"
                    />
                 </div>
              </div>

              <div className={`p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-l ${t.border} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-l ${isDark ? 'from-cyan-500' : 'from-indigo-600'} to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className={`w-5 h-5 ${t.accent}`} />
                    <span className={`font-mono text-xs ${t.accent} uppercase tracking-widest`}>Generative AI</span>
                  </div>
                  <h4 className={`text-2xl md:text-3xl ${t.textHead} font-medium mb-4`}>FastAPI RAG System</h4>
                  <p className={`${t.textSub} leading-relaxed mb-8`}>
                    A comprehensive Retrieval-Augmented Generation system built from scratch using FastAPI and OpenAI. Features robust document parsing, vector indexing, and scalable API design patterns.
                  </p>
                </div>

                <div className={`w-full max-w-sm border ${t.border} ${isDark ? 'bg-[#050505]/20' : 'bg-white/20'} backdrop-blur-sm p-6 font-mono text-xs ${t.textSub} ${t.shadow} mb-8`}>
                   <div className={`flex items-center gap-2 mb-4 ${t.accent} border-b ${t.border} pb-2`}>
                      <Terminal className="w-4 h-4" />
                      <span>rag_engine.py</span>
                   </div>
                   <div className={`space-y-1 ${t.textSub}`}>
                      <span className={isDark ? "text-purple-400" : "text-purple-600"}>async def</span> <span className={isDark ? "text-yellow-200" : "text-amber-600"}>query_knowledge_base</span>(q):<br/>
                      &nbsp;&nbsp;vector = <span className="text-blue-400">await</span> embed(q)<br/>
                      &nbsp;&nbsp;docs = index.search(vector)<br/>
                      &nbsp;&nbsp;context = <span className={isDark ? "text-green-400" : "text-emerald-600"}>"\\n"</span>.join(docs)<br/>
                      &nbsp;&nbsp;<span className={isDark ? "text-purple-400" : "text-purple-600"}>return</span> <span className="text-blue-400">await</span> llm.generate(q, context)
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                  {['FastAPI / Python', 'Vector Embeddings & Retrieval', 'OpenAI API Integration'].map((stack, i) => (
                    <div key={i} className={`flex items-center gap-4 text-sm ${t.textSub} font-mono`}>
                      <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full`}></div>
                      {stack}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto">
                  <a 
                    href="https://github.com/sbekuma/RAG-system-using-fast-api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium ${t.textSub} ${t.accentHover} transition-colors`}
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Honors Section */}
      <section id="education" className={`py-20 md:py-32 border-t ${t.border} relative z-10`}>
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-12">
              <h2 className={`text-xs font-mono ${t.accent} tracking-widest uppercase mb-4`}>03 // Education & Honors</h2>
              <h3 className={`text-3xl md:text-5xl ${t.textHead} font-medium tracking-tight`}>Academic Background</h3>
           </div>

           <div className="grid md:grid-cols-2 gap-12">
              <div className={`${t.bgSecondary} border ${t.border} p-8 relative group ${t.accentBorderHover} transition-all`}>
                 <div className={`absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity ${t.accent}`}>
                    <GraduationCap className="w-12 h-12" />
                 </div>
                 <h4 className={`text-2xl ${t.textHead} font-medium mb-2`}>George Mason University</h4>
                 <p className={`${t.accent} font-mono text-sm mb-4`}>The Volgenau School of Engineering</p>
                 <p className={`${t.textSub} text-lg mb-1`}>B.S. in Computer Science</p>
                 <p className={`${t.textSub} text-sm`}>Fairfax, VA</p>
              </div>

              <div className={`${t.bgSecondary} border ${t.border} p-8 relative group ${t.accentBorderHover} transition-all`}>
                  <div className={`absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity ${t.accent}`}>
                    <Award className="w-12 h-12" />
                 </div>
                 <h4 className={`text-2xl ${t.textHead} font-medium mb-6`}>Honors & Awards</h4>
                 <ul className="space-y-4">
                    {['2022 All-Virginia Academic Team Award', 'Dean’s List', 'Presidential Scholar'].map((award, i) => (
                      <li key={i} className={`flex items-center gap-3 ${t.textSub}`}>
                        <div className={`w-1.5 h-1.5 ${isDark ? 'bg-cyan-500' : 'bg-indigo-600'} rounded-full`}></div>
                        {award}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="py-20 md:py-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px ${isDark ? 'bg-white/10 border-white/10' : 'bg-slate-200 border-slate-200'} border`}>
              {[
                { 
                  icon: <Cpu className="w-6 h-6" />, 
                  title: "ML Systems", 
                  skills: "Transformers, RAG, LlamaIndex, LangChain, Scikit-learn, vLLM" 
                },
                { 
                  icon: <Command className="w-6 h-6" />, 
                  title: "DevOps & Cloud", 
                  skills: "AWS SageMaker,EC2, lambda, bedrock, Azure, Kubernetes, Docker, Jenkins, GitHub Actions" 
                },
                { 
                  icon: <Code className="w-6 h-6" />, 
                  title: "Backend", 
                  skills: "Python, Java, Spring Boot, SQL, Airflow, Node.js, FastAPI" 
                },
                { 
                  icon: <Layout className="w-6 h-6" />, 
                  title: "Frontend", 
                  skills: "React, JavaScript, Tailwind CSS, TypeScript, HTML5/CSS3" 
                },
                { 
                  icon: <Activity className="w-6 h-6" />, 
                  title: "Observability", 
                  skills: "Grafana, MLflow, KServe, Prometheus,CloudWatch, DeepEval, OpenSearch" 
                }
              ].map((item, i) => (
                <div key={i} className={`${t.bg} p-6 md:p-8 hover:${t.bgSecondary} transition-colors group`}>
                  <div className={`mb-6 ${t.textSub} ${t.accentHover} transition-colors`}>{item.icon}</div>
                  <h4 className={`${t.textHead} font-medium mb-2 text-sm md:text-base`}>{item.title}</h4>
                  <p className={`text-xs md:text-sm ${t.textSub} leading-relaxed`}>{item.skills}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 md:py-32 border-t ${t.border} relative z-10`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-xs font-mono ${t.accent} tracking-widest uppercase mb-4`}>05 // Get in Touch</h2>
              <h3 className={`text-3xl md:text-5xl ${t.textHead} font-medium tracking-tight mb-6`}>Let's Collaborate</h3>
              <p className={`${t.textSub} leading-relaxed mb-8 max-w-md`}>
                Interested in building scalable AI systems? I'm always open to discussing technical challenges and potential opportunities.
              </p>
              
              <div className={`space-y-4 font-mono text-sm ${t.textSub}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full animate-pulse`}></div>
                  Open for new opportunities
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 ${isDark ? 'bg-cyan-500' : 'bg-indigo-600'} rounded-full`}></div>
                   Washington, DC / Remote
                </div>
              </div>
            </div>

            <form 
              ref={formRef}
              onSubmit={handleContactSubmit}
              className={`space-y-6 ${t.bgSecondary} p-8 border ${t.border} relative group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-cyan-500/5' : 'from-indigo-600/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <input type="hidden" name="_subject" value="New Portfolio Contact Submission" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className={`text-xs font-mono ${t.textSub} uppercase`}>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className={`w-full ${t.bg} border ${t.border} p-3 ${t.textHead} ${isDark ? 'focus:border-cyan-500' : 'focus:border-indigo-600'} focus:outline-none transition-colors`} 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-mono ${t.textSub} uppercase`}>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className={`w-full ${t.bg} border ${t.border} p-3 ${t.textHead} ${isDark ? 'focus:border-cyan-500' : 'focus:border-indigo-600'} focus:outline-none transition-colors`} 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                <label className={`text-xs font-mono ${t.textSub} uppercase`}>Message</label>
                <textarea 
                  rows="4" 
                  name="message" 
                  required
                  className={`w-full ${t.bg} border ${t.border} p-3 ${t.textHead} ${isDark ? 'focus:border-cyan-500' : 'focus:border-indigo-600'} focus:outline-none transition-colors`} 
                  placeholder="Project details..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={`w-full py-4 font-mono text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10 
                  ${formStatus === 'success' 
                    ? 'bg-green-900/20 border border-green-500/50 text-green-400' 
                    : formStatus === 'error'
                    ? 'bg-red-900/20 border border-red-500/50 text-red-400'
                    : isDark 
                      ? 'bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/40 hover:text-cyan-300'
                      : 'bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300'
                  }
                  ${!isDark && formStatus === 'idle' ? 'group-hover:shadow-lg' : 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}
                  disabled:cursor-not-allowed
                `}
              >
                {formStatus === 'submitting' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Transmitting...
                  </>
                )}
                
                {formStatus === 'success' && (
                  <>
                    <CheckCircle className="w-4 h-4" /> Message Sent
                  </>
                )}

                {formStatus === 'error' && (
                  <>
                    <AlertCircle className="w-4 h-4" /> Transmission Failed
                  </>
                )}

                {formStatus === 'idle' && (
                  <>
                    <Send className="w-4 h-4" /> Send Transmission
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${t.border} ${isDark ? 'bg-[#030303]' : 'bg-slate-100'} z-10 relative`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-emerald-500'} rounded-full animate-pulse`}></div>
            <span className={`${t.textSub} text-xs font-mono uppercase`}>Systems Operational</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="https://linkedin.com/in/samibekuma" className={`${t.textSub} hover:${t.textHead} transition-colors`}><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/sbekuma?tab=repositories" className={`${t.textSub} hover:${t.textHead} transition-colors`}><Github className="w-5 h-5" /></a>
            <a href="mailto:samibekuma.tmc@gmail.com" className={`${t.textSub} hover:${t.textHead} transition-colors text-sm font-mono`}>samibekuma.tmc@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Brain = Cpu; 

export default Portfolio;