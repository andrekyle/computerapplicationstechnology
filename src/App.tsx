import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import GradeSelectionPage from "./pages/GradeSelectionPage";
import GradePage from "./pages/GradePage";
import TopicPage from "./pages/TopicPage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import AuthPage from "./pages/AuthPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/grades" element={<GradeSelectionPage />} />
            <Route path="/grade/:gradeId" element={<GradePage />} />
            <Route path="/grade/:gradeId/topic/:topicId" element={<TopicPage />} />
            <Route path="/grade/:gradeId/topic/:topicId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/grade/:gradeId/topic/:topicId/quiz/:quizId" element={<QuizPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
