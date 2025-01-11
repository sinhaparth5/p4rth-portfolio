interface SkillsProps {
    skills: string[];
  }
  
  export default function Skills({ skills }: SkillsProps) {
    return (
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {skills.map((skill, index) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full text-sm md:text-base
                     bg-gradient-to-r from-purple-500/20 to-cyan-500/20
                     border border-purple-500/50 backdrop-blur-sm
                     animate-fade-in hover:scale-110 transition-transform"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }