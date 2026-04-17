import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, ImageIcon, ChevronRight, ChevronLeft, CheckCircle2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLessonContent, LessonSection } from "@/data/curriculumData";
import { useAuth } from "@/contexts/AuthContext";
import { markLessonComplete } from "@/lib/progress";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const RenderSection = ({ section }: { section: LessonSection }) => {
  switch (section.type) {
    case "heading":
      return <h2 className="text-xl font-bold text-foreground mb-3 mt-8">{section.content}</h2>;
    case "text":
      return <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>;
    case "definition":
      return (
        <div className="my-4 rounded-2xl bg-primary/5 border border-primary/10 p-5">
          <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{
            __html: section.content?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>') || ""
          }} />
        </div>
      );
    case "list":
      return (
        <div className="my-4 space-y-2">
          {section.items?.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-surface-secondary p-3">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
              }} />
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <div className="my-6 overflow-hidden rounded-2xl bg-surface-secondary border border-border/50">
          <div className="flex aspect-[16/10] items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground px-6 text-center">
              <ImageIcon className="h-10 w-10" strokeWidth={1} />
              <span className="text-sm">{section.imageAlt || section.content}</span>
            </div>
          </div>
        </div>
      );
    case "video":
      return (
        <div className="mb-8 overflow-hidden rounded-2xl bg-surface-tertiary">
          <div className="relative flex aspect-video items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10" />
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full">
                <Play className="h-7 w-7 text-primary-foreground ml-1" strokeWidth={1} />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{section.content}</span>
            </div>
          </div>
        </div>
      );
    case "note":
      const colors = {
        important: "bg-primary/5 border-primary/20 text-primary",
        tip: "bg-success/5 border-success/20 text-success",
        warning: "bg-warning/5 border-warning/20 text-warning",
      };
      const noteStyle = colors[section.noteType || "important"];
      return (
        <div className={`my-6 rounded-2xl border p-5 ${noteStyle}`}>
          <h4 className="mb-1 font-semibold capitalize">{section.noteType || "Important"}</h4>
          <p className="text-sm text-muted-foreground">{section.content}</p>
        </div>
      );
    default:
      return null;
  }
};

const LessonPage = () => {
  const { gradeId, topicId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [marking, setMarking] = useState(false);

  const grade = Number(gradeId);
  const lesson = getLessonContent(grade, topicId || "", lessonId || "");

  // Fallback for lessons without real content
  const fallbackSections: LessonSection[] = [
    { type: "video", content: "Video lesson — tap to play" },
    { type: "heading", content: "What You Will Learn" },
    { type: "text", content: "In this lesson, we will cover the fundamental concepts that form the foundation of this topic. Understanding these basics is essential for building your knowledge as you progress through the curriculum." },
    { type: "image", content: "Diagram: Component overview", imageAlt: "Diagram: Component overview" },
    { type: "heading", content: "Key Concepts" },
    { type: "list", items: ["Concept 1: Definition and purpose", "Concept 2: Components and structure", "Concept 3: Practical usage"] },
    { type: "image", content: "Example: Step-by-step illustration", imageAlt: "Example: Step-by-step illustration" },
    { type: "heading", content: "Summary" },
    { type: "text", content: "In this lesson, you learned the fundamental concepts that will serve as the building blocks for more advanced topics. Make sure to review the key points before moving on to the quiz." },
    { type: "note", content: "Remember these concepts as they frequently appear in exam questions.", noteType: "important" },
  ];

  const sections = lesson?.sections || fallbackSections;
  const title = lesson?.title || (lessonId?.replace(/-/g, " ") || "Lesson");
  const duration = lesson?.duration || "5 min read";

  const handleMarkComplete = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Create an account to track your progress.", variant: "destructive" });
      return;
    }
    setMarking(true);
    const { error } = await markLessonComplete(user.id, grade, topicId || "", lessonId || "");
    if (error) {
      toast({ title: "Error", description: "Could not save progress.", variant: "destructive" });
    } else {
      toast({ title: "Lesson complete! ✓", description: "Your progress has been saved." });
    }
    setMarking(false);
  };

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}`)} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <h1 className="text-lg font-bold text-foreground truncate flex-1">{title}</h1>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
      </header>

      <article className="container py-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{duration} · Grade {gradeId}</p>

        {sections.map((section, i) => (
          <RenderSection key={i} section={section} />
        ))}

        {/* Mark Complete & Navigation */}
        <div className="mt-10 border-t border-border/50 pt-6">
          <Button variant="hero" size="lg" className="w-full gap-2 mb-4" onClick={handleMarkComplete} disabled={marking}>
            <CheckCircle2 className="h-5 w-5" strokeWidth={1} />
            {marking ? "Saving..." : "Mark as Complete"}
          </Button>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="lg" className="gap-2">
              <ChevronLeft className="h-4 w-4" strokeWidth={1} /> Previous
            </Button>
            <Button variant="ghost" size="lg" className="gap-2">
              Next Lesson <ChevronRight className="h-4 w-4" strokeWidth={1} />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default LessonPage;
