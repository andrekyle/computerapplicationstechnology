import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardCheck, ChevronRight, Play, CheckCircle2, Moon, Sun } from "lucide-react";
import { getTopicContent } from "@/data/curriculumData";
import { useAuth } from "@/contexts/AuthContext";
import { getLessonProgress } from "@/lib/progress";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const TopicPage = () => {
  const { gradeId, topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const grade = Number(gradeId);

  const topicData = getTopicContent(grade, topicId || "");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user && topicId) {
      getLessonProgress(user.id, grade, topicId).then(({ data }) => {
        if (data) {
          setCompletedLessons(new Set(data.filter(p => p.completed).map(p => p.lesson_id)));
        }
      });
    }
  }, [user, grade, topicId]);

  // Fallback lessons if no curriculum data
  const lessons = topicData?.lessons || [
    { id: "lesson-1", title: "Understanding the Basics", duration: "8 min read", hasVideo: true },
    { id: "lesson-2", title: "Key Concepts & Terminology", duration: "6 min read", hasVideo: false },
    { id: "lesson-3", title: "Practical Applications", duration: "10 min read", hasVideo: true },
    { id: "lesson-4", title: "Common Mistakes to Avoid", duration: "5 min read", hasVideo: false },
    { id: "lesson-5", title: "Summary & Review", duration: "4 min read", hasVideo: false },
  ];

  const quizCount = topicData?.quizCount || 3;
  const topicTitle = topicData?.title || topicId?.replace(/-/g, " ") || "Topic";

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate(`/grade/${gradeId}`)} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground truncate capitalize flex-1">{topicTitle}</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <div className="container py-6">
        {/* Topic Banner */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6">
          <h2 className="text-xl font-bold text-foreground capitalize">{topicTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grade {gradeId} · {lessons.length} lessons · {quizCount} quizzes
            {completedLessons.size > 0 && ` · ${completedLessons.size}/${lessons.length} completed`}
          </p>
          {topicData?.description && (
            <p className="mt-2 text-sm text-muted-foreground">{topicData.description}</p>
          )}
        </div>

        {/* Lessons */}
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Lessons</h3>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}/lesson/${lesson.id}`)}
                className="card-interactive flex w-full items-center gap-4 p-4 text-left"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                  completedLessons.has(lesson.id) ? "text-success" : "text-muted-foreground"
                }`}>
                  {completedLessons.has(lesson.id) ? <CheckCircle2 className="h-5 w-5" strokeWidth={1} /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{lesson.duration}</span>
                    {lesson.hasVideo && (
                      <span className="flex items-center gap-1 text-primary">
                        <Play className="h-3 w-3" strokeWidth={1} /> Video
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1} />
              </button>
            ))}
          </div>
        </div>

        {/* Quizzes */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quizzes & Assessments</h3>
          <div className="space-y-3">
            {Array.from({ length: quizCount }, (_, i) => i + 1).map((quizNum) => (
              <button
                key={quizNum}
                onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}/quiz/${quizNum}`)}
                className="card-interactive flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <ClipboardCheck className="h-5 w-5 text-primary" strokeWidth={1} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground">Quiz {quizNum}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">Multiple question types · 15 min</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
