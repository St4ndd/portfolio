"use client";
import React, { useState, useEffect } from "react";

function MainComponent() {
  const [mounted, setMounted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  const maxParticles = 15;

  useEffect(() => {
    setMounted(true);
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e) => {
      if (Math.abs(e.clientX - lastX) > 1 || Math.abs(e.clientY - lastY) > 1) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const handleMouseLeave = () => {
      setCursorPosition({ x: 0, y: 0 });
    };
    const handleMouseEnter = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    let animationFrame;
    const animate = () => {
      setParticles((prevParticles) => {
        const newParticles = [
          ...prevParticles.filter(
            (particle) => Date.now() - particle.created < 500
          ),
          ...(cursorPosition.x !== 0 &&
          cursorPosition.y !== 0 &&
          prevParticles.length < maxParticles
            ? [
                {
                  id: Date.now(),
                  x: cursorPosition.x,
                  y: cursorPosition.y,
                  vx: (Math.random() - 0.5) * 2,
                  vy: (Math.random() - 0.5) * 2,
                  created: Date.now(),
                  size: Math.random() * 3 + 2,
                },
              ]
            : []),
        ].map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: 1 - (Date.now() - particle.created) / 500,
        }));

        return newParticles;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const skillCategories = {
    Frontend: {
      name: "Frontend",
      level: 95,
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Tailwind CSS", level: 70 },
      ],
    },
    Backend: {
      name: "Backend",
      level: 90,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "sql", level: 70 },
        { name: "Supabase", level: 90 },
        { name: "Cloudflare", level: 90 },
      ],
    },
    "Cloud & DevOps": {
      name: "Cloud & DevOps",
      level: 6,
      skills: [
        { name: "AWS", level: 10 },
        { name: "Docker", level: 3 },
        { name: "Kubernetes", level: 3 },
        { name: "CI/CD", level: 4 },
      ],
    },
    Languages: {
      name: "Languages",
      level: 82,
      skills: [
        { name: "Python", level: 95 },
        { name: "C#", level: 95 },
        { name: "C++", level: 80 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 80 },
        { name: "Java", level: 60 },
        { name: "TypeScript", level: 80 },
      ],
    },
  };
  const projects = [
    {
      title: "Cloudflare Database",
      description: "C# Extention for Cloudflare Database",
      image: "https://i.postimg.cc/NjJ2vbnZ/cloudflare-filestorage.jpg",
    },
    {
      title: "Supabse C# Example",
      description: "C# Example for Supabase Service",
      image: "https://i.postimg.cc/YqwrZL31/Supabase-CSHARP.png",
    },
    {
      title: "Supabase Node.js Example",
      description: "Administrate your Supabase Database with Node.js Webserver",
      image: "https://i.postimg.cc/DwkLB3Bx/nodejs-supabase.jpg",
    },
    {
      title: "Cloudflare Filestorage",
      description: "C# Extention for Cloudflare Filestorage",
      image: "https://i.postimg.cc/s2PXDcHV/cloudflare-Storage.png",
    },
  ];
  const services = [
    {
      title: "C# Development",
      description:
        "Development of custom C# applications and backend systems",
      image: "https://i.postimg.cc/FFGGDqP2/full-picture.jpg",
    },
    {
      title: "Python Development",
      description: "Scalable and efficient Python development for modern applications and backend systems.",
      image: "https://i.postimg.cc/brwQgQh0/finished.png",
    },
    {
      title: "Website Design",
      description: "Modern and responsive websites with innovative design",
      image: "https://i.postimg.cc/8cKGqVrJ/finished.png",
    },
  ];
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100 relative overflow-x-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: "#00A6FF",
            borderRadius: "50%",
            opacity: particle.opacity,
            pointerEvents: "none",
            zIndex: 9998,
            boxShadow: "0 0 10px #00A6FF",
            transition: "opacity 0.2s ease-out",
          }}
        />
      ))}
      <div
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`,
          willChange: "transform",
        }}
        data-hovering={isHovering}
      />
      <div
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`,
          willChange: "transform",
        }}
        data-hovering={isHovering}
      />
      <nav className="fixed top-0 w-full backdrop-blur-md bg-[#0A0A0F]/80 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="space-x-8">
              {["Start", "Projects", "Skills", "Services"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="hover-glow font-inter cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <section
        id="start"
        className="hero-section min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="particle-background">
          <div className="cyber-grid"></div>
        </div>
        <div className="container mx-auto px-6 pt-20 relative z-10">
          <div className="glitch-container">
            <h1 className="text-6xl md:text-8xl font-inter font-bold mb-6 glitch-text">
              Johannes Hehl
              <span className="text-[#00A6FF] animate-pulse">.</span>
            </h1>
            <div className="glitch-effect"></div>
          </div>
          <p
            className="text-xl md:text-2xl font-inter text-gray-400 max-w-2xl typewriter-text"
            style={{ width: "fit-content" }}
          >
            Transforming ideas into digital innovation
          </p>
          <div className="mt-12 cyber-shape"></div>
        </div>
      </section>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-inter font-bold mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-lg transform hover:scale-105 transition-all cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => {
                  if (index === 0) {
                    window.open(
                      "https://github.com/St4ndd/Cloudflare-Filestorage",
                      "_blank"
                    );
                  } else if (index === 1) {
                    window.open(
                      "https://github.com/St4ndd/Supabase-C-SHARP-Example",
                      "_blank"
                    );
                  } else if (index === 2) {
                    window.open(
                      "https://github.com/St4ndd/Supabase-React-Node.js-Example",
                      "_blank"
                    );
                  }
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-inter font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-[#0F0F14]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-inter font-bold mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">
            {Object.entries(skillCategories).map(([key, category]) => (
              <div
                key={key}
                className="skill-category glass-card p-6 hover:bg-[#00A6FF]/5 transition-all duration-300 relative overflow-hidden group"
                onMouseEnter={() => setActiveSkill(key)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <pre className="text-sm leading-relaxed font-mono text-[#00A6FF] whitespace-pre-wrap animate-codeScroll group-hover:animate-codeScrollSlow">
                    {`function ${category.name.toLowerCase()}() {
  const skills = [${category.skills.map((s) => `'${s.name}'`).join(", ")}];
  return skills.map(skill => ({
    name: skill,
    level: Math.min(100, getSkillLevel(skill) + 1)
  }));
}`}
                  </pre>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#00A6FF] glitch-text">
                      {category.name}
                    </h3>
                    <span className="text-lg">{category.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="skill-bar-fill h-full bg-[#00A6FF]"
                      style={{ width: `${category.level}%` }}
                      data-active={activeSkill === key}
                    />
                  </div>
                  <div
                    className="skill-details"
                    data-expanded={activeSkill === key}
                  >
                    {category.skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="mb-3"
                        style={{ "--skill-index": index }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                          <div
                            className="skill-bar-animation h-full bg-[#00A6FF]/70"
                            style={{ "--skill-level": `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-inter font-bold mb-12">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-lg transform hover:scale-105 transition-all cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => {
                  if (index === 0) {
                    window.open(
                      "https://de.fiverr.com/s/ljg445a",
                      "_blank"
                    );
                  } else if (index === 1) {
                    window.open(
                      "https://de.fiverr.com/s/o8L770L",
                      "_blank"
                    );
                  }
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-inter font-bold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer id="contact" className="py-12 bg-[#070709]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Over LinkedIn</p>
            </div>
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Social</h3>
              <div className="flex space-x-4">
                {[
                  { name: "GitHub", url: "https://github.com/St4ndd" },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/johannes-hehl-0591902b2",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="hover-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Location</h3>
              <p className="text-gray-400">Augsburg, Germany</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        html, body {
          cursor: none !important;
        }

        a, button, [role="button"], [class*="cursor-pointer"] {
          cursor: none !important;
        }

        .custom-cursor {
          width: 24px;
          height: 24px;
          border: 2px solid #00A6FF;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.05s cubic-bezier(0.23, 1, 0.32, 1), 
                      width 0.2s ease-in-out, 
                      height 0.2s ease-in-out,
                      opacity 0.2s ease-in-out;
          transform-origin: center;
          margin-left: -12px;
          margin-top: -12px;
          backdrop-filter: blur(4px);
          opacity: ${
            cursorPosition.x === 0 && cursorPosition.y === 0 ? "0" : "1"
          };
        }

        .custom-cursor[data-hovering="true"] {
          width: 40px;
          height: 40px;
          margin-left: -20px;
          margin-top: -20px;
          background: rgba(0, 166, 255, 0.1);
          mix-blend-mode: screen;
        }

        .particle-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, #0A0A0F 0%, #070709 100%);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          color: #00A6FF;
          text-shadow: 0 0 10px #00A6FF50;
        }

        .skill-bar-fill {
          height: 100%;
          background: #00A6FF;
          transition: width 1s ease, filter 0.3s ease;
          position: relative;
        }

        .skill-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }

        .skill-bar-fill[data-active="true"] {
          filter: brightness(1.3);
          animation: pulse 2s infinite;
        }

        .skill-details {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(-10px);
        }

        .skill-details[data-expanded="true"] {
          max-height: 500px;
          opacity: 1;
          transform: translateY(0);
          padding: 1rem 0;
        }

        .skill-bar-animation {
          width: 0;
          opacity: 0;
        }

        .skill-details[data-expanded="true"] .skill-bar-animation {
          animation: slideIn 0.4s ease-out forwards;
          animation-delay: calc(var(--skill-index) * 0.1s);
        }

        .skill-category {
          height: auto;
          min-height: 180px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          transform: scale(1);
        }

        .skill-category:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 166, 255, 0.15);
        }

        .hero-section {
          position: relative;
          background: linear-gradient(145deg, #0A0A0F 0%, #070709 100%);
        }

        .cyber-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(to right, rgba(0, 166, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 166, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: top;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        .glitch-container {
          position: relative;
        }

        .glitch-effect {
          content: 'Future Forward.';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          mix-blend-mode: overlay;
          animation: glitchEffect 4s infinite;
        }

        @keyframes glitchEffect {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid #00A6FF;
          white-space: nowrap;
          margin: 0;
          width: fit-content;
          animation: 
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: fit-content }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #00A6FF }
        }

        .cyber-shape {
          position: absolute;
          width: 200px;
          height: 200px;
          right: 10%;
          top: 20%;
          background: linear-gradient(45deg, rgba(0, 166, 255, 0.1), transparent);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: rotateCyber 10s linear infinite;
        }

        @keyframes rotateCyber {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes slideIn {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: var(--skill-level);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
          100% { filter: brightness(1); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes codeScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes codeScrollSlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .animate-codeScroll {
          animation: codeScroll 20s linear infinite;
        }

        .animate-codeScrollSlow {
          animation: codeScrollSlow 30s linear infinite;
        }

        .glitch-text {
          position: relative;
          animation: glitch 5s infinite;
        }

        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
