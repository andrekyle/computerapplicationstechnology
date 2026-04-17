import { useNavigate } from "react-router-dom";
import { GraduationCap, ChevronRight, ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const GradeSelectionPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">Select Your Grade</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div className="container py-8">
        <p className="mb-8 text-center text-muted-foreground">
          Choose your grade level to access the relevant curriculum content.
        </p>

        <div className="space-y-4 max-w-lg mx-auto">
          {[
            { grade: 10, desc: "Foundation concepts, basic hardware & software, intro to applications" },
            { grade: 11, desc: "Advanced applications, databases, networking, HTML & web design" },
            { grade: 12, desc: "SQL, advanced spreadsheets, solution development, exam preparation" },
          ].map(({ grade, desc }) => (
            <button
              key={grade}
              onClick={() => navigate(`/grade/${grade}`)}
              className="card-interactive flex w-full items-center gap-4 p-5 text-left"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                <GraduationCap className="h-7 w-7 text-primary" strokeWidth={1} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground">Grade {grade}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSelectionPage;
