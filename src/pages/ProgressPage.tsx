import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Trophy, TrendingUp, CheckCircle2, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { getAllProgress, getQuizScores } from "@/lib/progress";

const ProgressPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const load = async () => {
      const [progressRes, quizRes] = await Promise.all([
        getAllProgress(user.id),
        getQuizScores(user.id),
      ]);
      setLessonsCompleted(progressRes.data?.length || 0);
      setQuizzes(quizRes.data || []);
      setLoading(false);
    };
    load();
  }, [user, navigate]);

  const avgScore = quizzes.length > 0
    ? Math.round(quizzes.reduce((sum, q) => sum + Number(q.percentage), 0) / quizzes.length)
    : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate("/grades")} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">My Progress</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="card-elevated p-4 text-center">
            <BookOpen className="mx-auto mb-2 h-6 w-6 text-primary" strokeWidth={1} />
            <div className="text-2xl font-bold text-foreground">{lessonsCompleted}</div>
            <div className="text-xs text-muted-foreground">Lessons Done</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <Trophy className="mx-auto mb-2 h-6 w-6 text-warning" strokeWidth={1} />
            <div className="text-2xl font-bold text-foreground">{quizzes.length}</div>
            <div className="text-xs text-muted-foreground">Quizzes Taken</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-success" strokeWidth={1} />
            <div className="text-2xl font-bold text-foreground">{avgScore}%</div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div>
        </div>

        {/* Recent Quiz Scores */}
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Quiz Results</h2>
        {quizzes.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <p className="text-muted-foreground">No quizzes completed yet. Start learning to see your progress here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.slice(0, 20).map((quiz) => (
              <div key={quiz.id} className="card-elevated flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <span className={`text-lg font-bold ${
                    Number(quiz.percentage) >= 70 ? "text-success" : Number(quiz.percentage) >= 50 ? "text-warning" : "text-destructive"
                  }`}>
                    {Math.round(Number(quiz.percentage))}%
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground capitalize">{quiz.topic_id.replace(/-/g, " ")}</h3>
                  <p className="text-xs text-muted-foreground">
                    Grade {quiz.grade} · Quiz {quiz.quiz_id} · {quiz.score}/{quiz.total_questions} correct
                  </p>
                </div>
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${Number(quiz.percentage) >= 70 ? "text-success" : "text-muted-foreground"}`} strokeWidth={1} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
