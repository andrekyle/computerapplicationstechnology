import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardCheck, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const topics: Record<number, { id: string; title: string; lessons: number; quizzes: number }[]> = {
  10: [
    { id: "intro-to-computers", title: "Introduction to Computers", lessons: 5, quizzes: 3 },
    { id: "hardware", title: "Hardware Components", lessons: 6, quizzes: 4 },
    { id: "software", title: "System & Application Software", lessons: 5, quizzes: 3 },
    { id: "networks-basics", title: "Network Basics", lessons: 4, quizzes: 2 },
    { id: "word-processing", title: "Word Processing", lessons: 6, quizzes: 4 },
    { id: "spreadsheets-intro", title: "Introduction to Spreadsheets", lessons: 5, quizzes: 3 },
    { id: "internet-email", title: "Internet & Email", lessons: 4, quizzes: 2 },
    { id: "file-management", title: "File Management", lessons: 3, quizzes: 2 },
    { id: "term1-revision", title: "Term 1 Revision Exam", lessons: 0, quizzes: 5 },
  ],
  11: [
    { id: "advanced-hardware", title: "Advanced Hardware", lessons: 5, quizzes: 3 },
    { id: "operating-systems", title: "Operating Systems", lessons: 4, quizzes: 3 },
    { id: "advanced-spreadsheets", title: "Advanced Spreadsheets", lessons: 6, quizzes: 4 },
    { id: "databases-intro", title: "Introduction to Databases", lessons: 5, quizzes: 3 },
    { id: "presentations", title: "Presentations", lessons: 4, quizzes: 2 },
    { id: "network-security", title: "Networks & Security", lessons: 5, quizzes: 3 },
    { id: "html-web", title: "HTML & Web Design", lessons: 5, quizzes: 3 },
  ],
  12: [
    { id: "advanced-databases", title: "Advanced Databases & SQL", lessons: 6, quizzes: 4 },
    { id: "advanced-spreadsheets-12", title: "Advanced Spreadsheets (Gr 12)", lessons: 5, quizzes: 3 },
    { id: "solution-development", title: "Solution Development", lessons: 5, quizzes: 3 },
    { id: "data-info-management", title: "Data & Information Management", lessons: 4, quizzes: 3 },
    { id: "social-implications", title: "Social Implications", lessons: 4, quizzes: 2 },
    { id: "integrated-scenario", title: "Integrated Scenario Practice", lessons: 3, quizzes: 2 },
    { id: "exam-prep", title: "Exam Preparation", lessons: 4, quizzes: 5 },
  ],
};

const GradePage = () => {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const grade = Number(gradeId);
  const gradeTopics = topics[grade] || [];

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">Grade {grade}</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div className="container py-6">
        <p className="mb-6 text-muted-foreground">
          {gradeTopics.length} topics · Select a topic to start learning
        </p>

        <div className="space-y-3">
          {gradeTopics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => navigate(`/grade/${grade}/topic/${topic.id}`)}
              className="card-interactive flex w-full items-center gap-4 p-4 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{topic.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" strokeWidth={1} /> {topic.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <ClipboardCheck className="h-3 w-3" strokeWidth={1} /> {topic.quizzes} quizzes
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradePage;
