import { supabase } from "@/integrations/supabase/client";

export const markLessonComplete = async (
  userId: string,
  grade: number,
  topicId: string,
  lessonId: string
) => {
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: userId,
      grade,
      topic_id: topicId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,grade,topic_id,lesson_id" }
  );
  return { error };
};

export const getLessonProgress = async (userId: string, grade: number, topicId: string) => {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("grade", grade)
    .eq("topic_id", topicId);
  return { data, error };
};

export const getAllProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("completed", true);
  return { data, error };
};

export const saveQuizScore = async (
  userId: string,
  grade: number,
  topicId: string,
  quizId: string,
  score: number,
  totalQuestions: number,
  answers?: any
) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const { error } = await supabase.from("quiz_scores").insert({
    user_id: userId,
    grade,
    topic_id: topicId,
    quiz_id: quizId,
    score,
    total_questions: totalQuestions,
    percentage,
    answers,
  });
  return { error };
};

export const getQuizScores = async (userId: string, grade?: number) => {
  let query = supabase.from("quiz_scores").select("*").eq("user_id", userId).order("completed_at", { ascending: false });
  if (grade) query = query.eq("grade", grade);
  const { data, error } = await query;
  return { data, error };
};
