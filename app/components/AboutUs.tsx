// app/components/AboutSection.tsx
import { motion } from "framer-motion";

const technologies = [
  {
    category: "AI/ML",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "CUDA", "Computer Vision", "NLP"]
  },
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Rust"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Linux"]
  },
  {
    category: "Web & Databases",
    skills: ["React", "Node.js", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function AboutSection() {
  return (
    <section className="relative py-20 px-4">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-gray-300">
                <motion.p variants={itemVariants}>
                  I'm a passionate AI/ML Engineer with a focus on developing cutting-edge solutions 
                  in computer vision and natural language processing.
                </motion.p>
                <motion.p variants={itemVariants}>
                  With extensive experience in CUDA programming and distributed systems, 
                  I specialize in building scalable machine learning pipelines and 
                  optimizing model performance for production environments.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Currently working on advancing the boundaries of AI applications 
                  while maintaining a strong commitment to open-source contributions 
                  and knowledge sharing.
                </motion.p>
              </div>
            </motion.div>

            {/* Experience Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800/50"
                variants={statsVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-1">4+</div>
                <div className="text-sm text-gray-400">Years of Experience</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800/50"
                variants={statsVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-cyan-400 mb-1">20+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800/50"
                variants={statsVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-1">15+</div>
                <div className="text-sm text-gray-400">Open Source Contributions</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800/50"
                variants={statsVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-cyan-400 mb-1">10+</div>
                <div className="text-sm text-gray-400">Technical Articles</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Technical Expertise
            </h3>
            
            <div className="space-y-8">
              {technologies.map((tech, index) => (
                <motion.div 
                  key={tech.category} 
                  className="space-y-3"
                  variants={itemVariants}
                >
                  <div className="text-lg font-semibold text-purple-400">
                    {tech.category}
                  </div>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                  >
                    {tech.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={skillVariants}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 text-sm rounded-full 
                                 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 
                                 border border-purple-500/20 text-gray-300
                                 hover:border-cyan-500/30 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Education/Certification */}
            <motion.div 
              className="mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800/50"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Education & Certifications
              </h4>
              <motion.ul className="space-y-3 text-gray-300" variants={containerVariants}>
                <motion.li variants={itemVariants} className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  B.Tech in Computer Science
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  AWS Certified Machine Learning Specialist
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  NVIDIA Deep Learning Institute Certificate
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Resume Button */}
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                     bg-gradient-to-r from-purple-600 to-cyan-600
                     text-white font-semibold transition-all duration-300
                     hover:from-purple-500 hover:to-cyan-500"
          >
            View Full Resume
            <svg 
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}