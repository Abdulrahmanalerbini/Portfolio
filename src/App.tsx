import { useEffect, useState, useRef } from 'react';
import {
  Github,
  Code2,
  Star,
  GitFork,
  ExternalLink,
  MapPin,
  Users,
  BookOpen,
  Terminal,
  Palette,
  Layout,
  Database,
  Server,
  Cloud,
  GitBranch,
  Container,
  Package,
  Globe,
  Smartphone,
  Zap,
  Layers,
  Cpu,
  FileCode,
  Braces,
  Framework,
} from 'lucide-react';

const GITHUB_USERNAME = 'abdulrahmanalerbini';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

const techStack = {
  Frontend: [
    { name: 'React', icon: Layout, color: 'text-cyan-400' },
    { name: 'TypeScript', icon: Code2, color: 'text-blue-400' },
    { name: 'Tailwind CSS', icon: Palette, color: 'text-teal-400' },
    { name: 'Next.js', icon: Layers, color: 'text-white' },
    { name: 'HTML5', icon: Globe, color: 'text-orange-400' },
    { name: 'CSS3', icon: Palette, color: 'text-blue-400' },
  ],
  Backend: [
    { name: 'Node.js', icon: Server, color: 'text-green-400' },
    { name: 'Python', icon: Terminal, color: 'text-yellow-400' },
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
    { name: 'MongoDB', icon: Database, color: 'text-green-400' },
    { name: 'REST APIs', icon: Globe, color: 'text-purple-400' },
    { name: 'GraphQL', icon: Braces, color: 'text-pink-400' },
  ],
  Tools: [
    { name: 'Git', icon: GitBranch, color: 'text-orange-400' },
    { name: 'Docker', icon: Container, color: 'text-blue-400' },
    { name: 'VS Code', icon: Code2, color: 'text-blue-400' },
    { name: 'npm/yarn', icon: Package, color: 'text-red-400' },
    { name: 'Linux', icon: Terminal, color: 'text-yellow-400' },
    { name: 'GitHub Actions', icon: Zap, color: 'text-gray-400' },
  ],
};

function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {displayedText}
      <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-cyan-400`}>|</span>
    </span>
  );
}

export default function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!userRes.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData: GitHubUser = await userRes.json();
        setUser(userData);

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!reposRes.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const reposData: GitHubRepo[] = await reposRes.json();
        const filtered = reposData
          .filter((repo) => !repo.name.includes('.github'))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 9);
        setRepos(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const getLanguageColor = (lang: string | null): string => {
    const colors: Record<string, string> = {
      TypeScript: 'bg-blue-400',
      JavaScript: 'bg-yellow-400',
      Python: 'bg-green-400',
      Rust: 'bg-orange-400',
      Go: 'bg-cyan-400',
      Java: 'bg-red-400',
      'C++': 'bg-pink-400',
      Ruby: 'bg-red-500',
      PHP: 'bg-purple-400',
      Swift: 'bg-orange-300',
      Kotlin: 'bg-purple-300',
      Dart: 'bg-teal-300',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-300',
      Shell: 'bg-green-500',
    };
    return lang ? colors[lang] || 'bg-zinc-400' : 'bg-zinc-500';
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-zinc-800 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="text-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Github className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 mb-2 font-medium">Connection Error</p>
          <p className="text-zinc-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <TypingText text="Hi, I'm Abdulrahman Alerbini" />
              </h1>

              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                {user?.bio || 'Full-stack developer passionate about building elegant solutions and creating impactful applications.'}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {user?.location && (
                  <span className="inline-flex items-center gap-2 text-zinc-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-zinc-500 text-sm">
                  <Github className="w-4 h-4" />
                  @{user?.login}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={scrollToProjects}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-zinc-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 neon-glow-cyan"
                >
                  <Code2 className="w-5 h-5" />
                  View Projects
                </button>
                <a
                  href={`https://github.com/${user?.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-lg transition-all duration-300 hover:border-cyan-500 hover:text-cyan-400"
                >
                  <Github className="w-5 h-5" />
                  GitHub Profile
                </a>
              </div>
            </div>

            {/* Right Content - Avatar & Stats */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-green-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative p-2 bg-gradient-to-br from-cyan-500 via-purple-500 to-green-500 rounded-full">
                  <img
                    src={user?.avatar_url}
                    alt={user?.name || user?.login}
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover"
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-4 -left-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 backdrop-blur-sm animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{user?.public_repos}</p>
                      <p className="text-xs text-zinc-500">Repositories</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 backdrop-blur-sm animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{user?.followers}</p>
                      <p className="text-xs text-zinc-500">Followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Tech Stack Section */}
      <section className="relative py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-400">&lt;</span>
              Tech Stack
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Technologies and tools I work with to build amazing applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div
                key={category}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/50 card-glow"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    category === 'Frontend' ? 'bg-cyan-400' :
                    category === 'Backend' ? 'bg-purple-400' : 'bg-green-400'
                  }`} />
                  {category}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech) => {
                    const IconComponent = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="group flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50 transition-all duration-300 hover:border-zinc-600"
                      >
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                          <IconComponent className={`w-5 h-5 ${tech.color} tech-icon`} />
                        </div>
                        <span className="text-sm text-zinc-300 font-medium">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Projects Section */}
      <section ref={projectsRef} className="relative py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-purple-400">&lt;</span>
              Featured Projects
              <span className="text-purple-400">/&gt;</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Live repositories from my GitHub, showcasing my latest work and contributions
            </p>
          </div>

          {repos.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <Code2 className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">No public repositories found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-600 card-glow flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-zinc-700 group-hover:border-cyan-500/50 transition-colors">
                      <Github className="w-6 h-6 text-cyan-400" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {repo.name}
                  </h3>

                  <p className="text-zinc-500 text-sm mb-4 flex-1 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs font-medium rounded-md border border-zinc-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-zinc-500 pt-4 border-t border-zinc-800">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 ml-auto">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="w-4 h-4 text-zinc-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-lg transition-all duration-300 hover:border-purple-500 hover:text-purple-400"
            >
              <Github className="w-5 h-5" />
              View All Repositories
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-zinc-500">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Built with React & Tailwind CSS</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>

            <p className="text-zinc-600 text-sm">
              &copy; {new Date().getFullYear()} Abdulrahman Alerbini
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
