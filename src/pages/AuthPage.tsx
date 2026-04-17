import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Check your email to verify your account." });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/grades");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">{isSignUp ? "Create Account" : "Sign In"}</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div className="container py-10">
        <div className="mx-auto max-w-sm">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {isSignUp ? "Join CAT Prep" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp ? "Create an account to track your progress" : "Sign in to continue learning"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1} />
                <input
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border-2 border-border bg-background py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1} /> : <Eye className="h-5 w-5" strokeWidth={1} />}
              </button>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-primary hover:underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
