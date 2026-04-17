import { BookOpen, Trophy, Target, Users, ChevronRight, Sparkles, GraduationCap, Monitor, User, BarChart3, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import heroBg from "@/assets/hero-bg.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl">
              <Monitor className="h-5 w-5 text-primary" strokeWidth={1} />
            </div>
            <span className="text-lg font-bold text-foreground">CAT Prep</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
              {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
            </button>
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/progress")}>
                  <BarChart3 className="h-4 w-4 mr-1" strokeWidth={1} /> Progress
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
                <Button variant="hero" size="sm" onClick={() => navigate("/grades")}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06]" width={1200} height={600} />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-up">
              <Sparkles className="h-4 w-4" strokeWidth={1} />
              Your path to CAT exam success
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Master Computer Applications{" "}
              <span className="text-gradient">Technology</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Comprehensive lessons, interactive quizzes, and exam preparation
              designed specifically for Grade 10–12 CAT students. Study smarter,
              score higher.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" onClick={() => navigate("/grades")}>
                Start Learning
                <ChevronRight className="ml-1 h-5 w-5" strokeWidth={1} />
              </Button>
              {!user && (
                <Button variant="hero-outline" size="xl" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-surface-secondary py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "3", label: "Grade Levels" },
              { value: "50+", label: "Lessons" },
              { value: "200+", label: "Quiz Questions" },
              { value: "100%", label: "Curriculum Aligned" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Everything you need to excel</h2>
            <p className="text-muted-foreground">Built specifically for the South African CAT curriculum with tools that make studying effective and engaging.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Structured Lessons", desc: "Clear, curriculum-aligned content with images and videos for every topic." },
              { icon: Target, title: "Interactive Quizzes", desc: "Multiple choice, matching, drag-and-drop, and short answer questions." },
              { icon: Trophy, title: "Exam Practice", desc: "Full-length mock exams that simulate the real CAT examination." },
              { icon: Users, title: "Grade 10–12", desc: "Content tailored for each grade level following the CAPS curriculum." },
            ].map((feature) => (
              <div key={feature.title} className="card-interactive p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <feature.icon className="h-6 w-6 text-primary" strokeWidth={1} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Selection CTA */}
      <section className="py-20 bg-surface-secondary">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Choose your grade</h2>
            <p className="text-muted-foreground">Select your grade to access tailored lessons and assessments.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[10, 11, 12].map((grade) => (
              <button key={grade} onClick={() => navigate(`/grade/${grade}`)} className="card-interactive group p-8 text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                  <GraduationCap className="h-8 w-8 text-primary" strokeWidth={1} />
                </div>
                <h3 className="mb-1 text-xl font-bold text-foreground">Grade {grade}</h3>
                <p className="text-sm text-muted-foreground">
                  {grade === 10 && "Foundation concepts & basics"}
                  {grade === 11 && "Intermediate applications"}
                  {grade === 12 && "Advanced topics & exam prep"}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Start learning <ChevronRight className="ml-1 h-4 w-4" strokeWidth={1} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 safe-area-bottom">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">© 2026 CAT Prep. Aligned with the CAPS curriculum.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
