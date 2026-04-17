import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, GripVertical, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuizData, QuizQuestion } from "@/data/quizData";
import { useAuth } from "@/contexts/AuthContext";
import { saveQuizScore } from "@/lib/progress";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import {
  computerSetupImg,
  ipcDiagramImg,
  windowsDesktopImg,
  shortcutIconImg,
  ergonomicsImg,
  folderTreeImg,
  recycleBinImg,
  msWordInterfaceImg,
} from "@/data/term1RevisionData";

const examImageMap: Record<string, string> = {
  COMPUTER_SETUP_IMG: computerSetupImg,
  IPC_DIAGRAM_IMG: ipcDiagramImg,
  WINDOWS_DESKTOP_IMG: windowsDesktopImg,
  SHORTCUT_ICON_IMG: shortcutIconImg,
  ERGONOMICS_IMG: ergonomicsImg,
  FOLDER_TREE_IMG: folderTreeImg,
  RECYCLE_BIN_IMG: recycleBinImg,
  MS_WORD_IMG: msWordInterfaceImg,
};

// Fuzzy text matching: case-insensitive with misspelling tolerance
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0));
  return dp[m][n];
}

function fuzzyMatch(userText: string, keyword: string): boolean {
  const u = userText.toLowerCase();
  const k = keyword.toLowerCase();
  // Exact substring match
  if (u.includes(k)) return true;
  // Check each word in user text against keyword words
  const userWords = u.split(/\s+/);
  const keyWords = k.split(/\s+/);
  return keyWords.every(kw => userWords.some(uw => {
    const maxDist = kw.length <= 3 ? 0 : kw.length <= 5 ? 1 : 2;
    return levenshtein(uw, kw) <= maxDist;
  }));
}

function fuzzyContainsKeyword(userText: string, keyword: string): boolean {
  const u = userText.toLowerCase();
  const k = keyword.toLowerCase();
  if (u.includes(k)) return true;
  const maxDist = k.length <= 3 ? 0 : k.length <= 5 ? 1 : 2;
  // Sliding window over user text
  for (let i = 0; i <= u.length - k.length + maxDist; i++) {
    const slice = u.substring(i, i + k.length + maxDist);
    if (levenshtein(slice, k) <= maxDist) return true;
  }
  return false;
}

function renderQuestionText(text: string, onZoom: (src: string) => void) {
  // Extract marks from the end of the text, e.g. "(2 marks)" or "(1 mark)"
  const marksMatch = text.match(/\((\d+)\s+marks?\)\s*$/);
  const marks = marksMatch ? marksMatch[1] : null;
  const cleanedText = marksMatch ? text.slice(0, marksMatch.index).trimEnd() : text;

  const parts = cleanedText.split(/(!\[.*?\]\(.*?\))/g);
  const content = parts.map((part, i) => {
    const imgMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const key = imgMatch[2];
      const src = examImageMap[key];
      if (src) {
        return (
          <img key={i} src={src} alt={alt} onClick={() => onZoom(src)} className="my-4 w-full max-w-lg rounded-xl border border-border/50 cursor-zoom-in active:opacity-80 transition-opacity" />
        );
      }
    }
    // Render text with line breaks preserved
    return (
      <span key={i}>
        {part.split("\n").map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </span>
    );
  });

  return (
    <>
      <div>
        <div>{content}</div>
        {marks && (
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary whitespace-nowrap">
            {marks} {Number(marks) === 1 ? "mark" : "marks"}
          </span>
        )}
      </div>
    </>
  );
}

function renderExplanation(text: string) {
  const lines = text.split("\n");
  const hasTabs = lines.some(l => l.includes("\t"));
  if (hasTabs) {
    return (
      <div className="text-sm text-muted-foreground space-y-1">
        {lines.map((line, i) => {
          if (line.includes("\t")) {
            const [left, ...rest] = line.split("\t");
            return (
              <div key={i} className="flex">
                <span className="shrink-0 w-12 font-medium">{left}</span>
                <span>{rest.join(" ")}</span>
              </div>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    );
  }
  return <p className="text-sm text-muted-foreground whitespace-pre-wrap">{text}</p>;
}

const QuizPage = () => {
  const { gradeId, topicId, quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const grade = Number(gradeId);

  const quizData = getQuizData(grade, topicId || "", quizId || "");
  const questions: QuizQuestion[] = quizData?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [matchSelections, setMatchSelections] = useState<Record<number, number | null>>({});
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });
  const [dragItems, setDragItems] = useState<string[]>([]);
  const [shortAnswer, setShortAnswer] = useState("");
  const [selectedDragIndex, setSelectedDragIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const totalMarks = questions.reduce((sum, q) => {
    if (q.type === "matching" && q.correctMatches) return sum + q.correctMatches.length;
    if (q.type === "short-answer" && q.labels) return sum + q.labels.length;
    return sum + 1;
  }, 0);
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  useEffect(() => {
    const q = questions[currentIndex];
    // Restore matching selections from saved answers
    const savedAnswer = answers[q?.id];
    if (q?.type === "matching" && savedAnswer && typeof savedAnswer === "object" && !Array.isArray(savedAnswer)) {
      setMatchSelections(savedAnswer as Record<number, number | null>);
    } else {
      setMatchSelections({});
    }
    // Restore drag-drop items from saved answers or initialize fresh
    if (q?.type === "drag-drop" && q.items) {
      if (savedAnswer && Array.isArray(savedAnswer)) {
        setDragItems(savedAnswer);
      } else {
        const initial = [...q.items];
        setDragItems(initial);
        setAnswers(prev => ({ ...prev, [q.id]: initial }));
      }
    }
    // Restore short-answer text from saved answers or prefill
    if (q?.type === "short-answer" && !q.labels) {
      if (savedAnswer && typeof savedAnswer === "string") {
        setShortAnswer(savedAnswer);
      } else if (q.prefill) {
        setShortAnswer(q.prefill);
        setAnswers(prev => prev[q.id] !== undefined ? prev : { ...prev, [q.id]: q.prefill });
      } else {
        setShortAnswer("");
      }
    } else {
      setShortAnswer("");
    }
    setSelectedDragIndex(null);
  }, [currentIndex]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
        <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
          <div className="container flex h-14 items-center gap-3">
            <button onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}`)} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Quiz</h1>
          </div>
        </header>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Quiz content coming soon for this topic.</p>
          <Button variant="hero" size="lg" className="mt-4" onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}`)}>
            Back to Topic
          </Button>
        </div>
      </div>
    );
  }

  const handleMCQSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [question.id]: optionIndex });
  };

  const handleMatchSelect = (colAIndex: number, colBIndex: number) => {
    if (submitted) return;
    const newSelections = { ...matchSelections, [colAIndex]: colBIndex };
    setMatchSelections(newSelections);
    setAnswers({ ...answers, [question.id]: newSelections });
  };

  const handleDragSwap = (fromIndex: number, toIndex: number) => {
    if (submitted) return;
    const newItems = [...dragItems];
    [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
    setDragItems(newItems);
    setAnswers({ ...answers, [question.id]: newItems });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (q.type === "mcq" && answer === q.correctAnswer) correct++;
      if (q.type === "matching" && q.correctMatches && typeof answer === "object") {
        q.correctMatches.forEach((correctB, aIdx) => {
          if (answer[aIdx] === correctB) correct++;
        });
      }
      if (q.type === "short-answer" && !q.labels && typeof q.correctAnswer === "string" && typeof answer === "string") {
        const keywords = q.correctAnswer.toLowerCase().split(/\s+/);
        const userText = answer.trim();
        if (keywords.every(kw => fuzzyContainsKeyword(userText, kw))) correct++;
      }
      if (q.type === "short-answer" && q.labels && q.labelAnswers && typeof answer === "object") {
        q.labels.forEach((label) => {
          const userVal = (answer as Record<string, string>)[label] || "";
          const accepted = q.labelAnswers![label];
          if (accepted && accepted.some(a => fuzzyMatch(userVal.trim(), a))) {
            correct++;
          }
        });
      }
      if (q.type === "drag-drop" && q.correctOrder && Array.isArray(answer)) {
        const originalItems = q.items || [];
        const isCorrect = q.correctOrder.every((origIdx, pos) => answer[pos] === originalItems[origIdx]);
        if (isCorrect) correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    if (user) {
      await saveQuizScore(user.id, grade, topicId || "", quizId || "", finalScore, totalMarks, answers);
      toast({ title: "Quiz submitted!", description: `You scored ${finalScore}/${totalMarks}` });
    }
  };

  const typeLabel: Record<string, string> = {
    mcq: "Multiple Choice",
    matching: "Match Columns",
    "short-answer": "Short Answer",
    "drag-drop": "Drag & Drop",
  };

  const renderQuestion = () => {
    switch (question.type) {
      case "mcq":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = answers[question.id] === index;
              const isCorrect = submitted && index === question.correctAnswer;
              const isWrong = submitted && isSelected && index !== question.correctAnswer;
              return (
                <button
                  key={index}
                  onClick={() => handleMCQSelect(index)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    isCorrect ? "border-success bg-success/5" : isWrong ? "border-destructive bg-destructive/5" : isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    isCorrect ? "text-success-foreground" : isWrong ? "text-destructive-foreground" : isSelected ? "text-primary-foreground" : "text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{option}</span>
                  {isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-success" strokeWidth={1} />}
                  {isWrong && <XCircle className="ml-auto h-5 w-5 text-destructive" strokeWidth={1} />}
                </button>
              );
            })}
            {submitted && question.explanation && (
              <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                {renderExplanation(question.explanation)}
              </div>
            )}
          </div>
        );

      case "matching":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Column A</p>
                <div className="space-y-2">
                  {question.columnA?.map((item, i) => (
                    <div key={i} className={`rounded-xl p-3 text-sm font-light transition-all flex ${
                      matchSelections[i] !== undefined ? "bg-primary/10 border border-primary/30 text-foreground" : "bg-surface-secondary text-foreground"
                    }`}>
                      <span className="shrink-0 w-5">{i + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Column B</p>
                <div className="space-y-2">
                  {question.columnB?.map((item, j) => {
                    const isMatched = Object.values(matchSelections).includes(j);
                    return (
                      <button
                        key={j}
                        onClick={() => {
                          if (submitted) return;
                          const nextUnmatched = (question.columnA?.length || 0) > Object.keys(matchSelections).length
                            ? Object.keys(matchSelections).length : null;
                          if (nextUnmatched !== null) handleMatchSelect(nextUnmatched, j);
                        }}
                        className={`w-full rounded-xl p-3 text-left text-sm font-light transition-all ${
                          isMatched ? "bg-primary/10 border border-primary text-foreground" : "bg-surface-secondary text-foreground hover:bg-surface-tertiary"
                        }`}
                      >
                        {String.fromCharCode(65 + j)}. {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {Object.keys(matchSelections).length > 0 && (
              <div className="rounded-xl bg-surface-secondary p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your matches</p>
                  {!submitted && (
                    <button onClick={() => { setMatchSelections({}); const newAnswers = { ...answers }; delete newAnswers[question.id]; setAnswers(newAnswers); }} className="text-xs text-primary font-medium">
                      Reset
                    </button>
                  )}
                </div>
                {Object.entries(matchSelections).map(([aIdx, bIdx]) => {
                  const isCorrect = submitted && question.correctMatches ? question.correctMatches[Number(aIdx)] === bIdx : false;
                  const isWrong = submitted && question.correctMatches ? question.correctMatches[Number(aIdx)] !== bIdx : false;
                  return (
                    <div key={aIdx} className={`flex items-center gap-2 text-sm ${isCorrect ? "text-success" : isWrong ? "text-destructive" : "text-foreground"}`}>
                      <span className="inline-block w-8">{Number(aIdx) + 1}</span>
                      <span>{String.fromCharCode(65 + (bIdx as number))}</span>
                      {isCorrect && <CheckCircle2 className="h-4 w-4 text-success ml-1" strokeWidth={1} />}
                      {isWrong && (
                        <>
                          <XCircle className="h-4 w-4 text-destructive ml-1" strokeWidth={1} />
                          <span className="text-xs text-muted-foreground ml-1">(correct: {String.fromCharCode(65 + question.correctMatches![Number(aIdx)])})</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {submitted && question.explanation && (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                {renderExplanation(question.explanation)}
              </div>
            )}
          </div>
        );

      case "short-answer":
        return (
          <div>
            {question.labels ? (
              <div className="grid gap-x-3 gap-y-2" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                {question.labels.map((label, i) => {
                  const userVal = ((answers[question.id] as Record<string, string>) || {})[label] || "";
                  const acceptedAnswers = question.labelAnswers?.[label];
                  const isCorrect = submitted && acceptedAnswers ? acceptedAnswers.some(a => fuzzyMatch(userVal.trim(), a)) : false;
                  const isWrong = submitted && acceptedAnswers && !isCorrect && userVal.trim().length > 0;
                  const isEmpty = submitted && acceptedAnswers && !isCorrect && userVal.trim().length === 0;
                  return (
                    <React.Fragment key={label}>
                      <span className="text-sm font-semibold text-foreground self-center whitespace-nowrap">{label}:</span>
                      <div>
                        <input
                          type="text"
                          value={userVal}
                          onChange={(e) => {
                            if (submitted) return;
                            const current = (answers[question.id] as Record<string, string>) || {};
                            const updated = { ...current, [label]: e.target.value };
                            setAnswers({ ...answers, [question.id]: updated });
                          }}
                          placeholder="Type answer..."
                          className={`w-full rounded-xl border-2 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                            isCorrect ? "border-success bg-success/5" : isWrong || isEmpty ? "border-destructive bg-destructive/5" : "border-border focus:border-primary"
                          }`}
                        />
                        {submitted && acceptedAnswers && !isCorrect && (
                          <p className="mt-1 text-xs text-success italic">Correct: {acceptedAnswers[0]}</p>
                        )}
                      </div>
                      <div className="self-center w-5">
                        {isCorrect && <CheckCircle2 className="h-5 w-5 text-success" strokeWidth={1} />}
                        {(isWrong || isEmpty) && <XCircle className="h-5 w-5 text-destructive" strokeWidth={1} />}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div>
                <textarea
                  value={shortAnswer}
                  onChange={(e) => {
                    if (submitted) return;
                    setShortAnswer(e.target.value);
                    setAnswers({ ...answers, [question.id]: e.target.value });
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  ref={(el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; } }}
                  placeholder="Type your answer here..."
                  className={`w-full rounded-xl border-2 bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none overflow-hidden ${
                    submitted && typeof question.correctAnswer === "string"
                      ? (question.correctAnswer.toLowerCase().split(/\s+/).every(kw => fuzzyContainsKeyword(shortAnswer.trim(), kw))
                        ? "border-success bg-success/5" : "border-destructive bg-destructive/5")
                      : "border-border focus:border-primary"
                  }`}
                  rows={3}
                />
                {submitted && typeof question.correctAnswer === "string" && (
                  <div className="mt-2 flex items-center gap-2">
                    {question.correctAnswer.toLowerCase().split(/\s+/).every(kw => fuzzyContainsKeyword(shortAnswer.trim(), kw))
                      ? <><CheckCircle2 className="h-4 w-4 text-success" strokeWidth={1} /><span className="text-sm text-success">Correct</span></>
                      : <><XCircle className="h-4 w-4 text-destructive" strokeWidth={1} /><span className="text-sm text-destructive">Missing keywords: {question.correctAnswer.toLowerCase().split(/\s+/).filter(kw => !fuzzyContainsKeyword(shortAnswer.trim(), kw)).join(", ")}</span></>
                    }
                  </div>
                )}
              </div>
            )}
            {submitted && question.explanation && (
              <div className="mt-3 rounded-xl bg-success/5 border border-success/20 p-4">
                <p className="text-sm font-medium text-success mb-1">Model Answer</p>
                {renderExplanation(question.explanation)}
              </div>
            )}
          </div>
        );

      case "drag-drop":
        return (
          <div className="space-y-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tap two items to swap their positions
            </p>
            {dragItems.map((item, index) => {
              const correctItem = question.correctOrder && question.items ? question.items[question.correctOrder[index]] : null;
              const isCorrect = submitted && correctItem === item;
              const isWrong = submitted && correctItem !== item;
              return (
              <button
                key={index}
                onClick={() => {
                  if (submitted) return;
                  if (selectedDragIndex !== null && selectedDragIndex !== index) {
                    handleDragSwap(selectedDragIndex, index);
                    setSelectedDragIndex(null);
                  } else {
                    setSelectedDragIndex(selectedDragIndex === index ? null : index);
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  isCorrect ? "border-success bg-success/5" : isWrong ? "border-destructive bg-destructive/5" : selectedDragIndex === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1} />
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{item}</span>
                {isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-success" strokeWidth={1} />}
                {isWrong && <XCircle className="ml-auto h-5 w-5 text-destructive" strokeWidth={1} />}
              </button>
              );
            })}
            {submitted && question.explanation && (
              <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-sm font-medium text-primary mb-1">Correct Order & Explanation</p>
                {renderExplanation(question.explanation)}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50 safe-area-top">
        <div className="container flex h-14 items-center gap-3">
          <button onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}`)} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1} />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-foreground">{quizData?.title || `Quiz ${quizId}`}</h1>
            <p className="text-xs text-muted-foreground">Question {currentIndex + 1} of {totalQuestions}</p>
          </div>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-accent transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5 text-foreground" strokeWidth={1} /> : <Moon className="h-5 w-5 text-foreground" strokeWidth={1} />}
          </button>
        </div>
        <div className="h-1 bg-surface-secondary">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="container py-6">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {typeLabel[question.type]}
        </div>

        <div className="mb-6 text-lg font-semibold text-foreground leading-snug">{renderQuestionText(question.question, setZoomedImg)}</div>

        {renderQuestion()}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentIndex === 0}>
            Previous
          </Button>
          {currentIndex === totalQuestions - 1 ? (
            <Button variant="hero" size="lg" onClick={handleSubmit} disabled={submitted}>
              {submitted ? "Submitted" : "Submit Quiz"}
            </Button>
          ) : (
            <Button variant="hero" size="lg" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>

        {submitted && currentIndex === totalQuestions - 1 && (
          <div className="mt-8 rounded-2xl bg-surface-secondary p-6 text-center animate-fade-up">
            <CheckCircle2 className={`mx-auto mb-3 h-12 w-12 ${score / totalMarks >= 0.7 ? "text-success" : "text-warning"}`} strokeWidth={1} />
            <h3 className="text-xl font-bold text-foreground">
              {score}/{totalMarks} — {Math.round((score / totalMarks) * 100)}%
            </h3>
            <p className="mt-2 text-muted-foreground">
              {score / totalMarks >= 0.7 ? "Great work! You passed!" : "Keep studying and try again."}
            </p>
            <div className="mt-4 flex gap-3 justify-center">
              <Button variant="outline" size="lg" onClick={() => { setSubmitted(false); setCurrentIndex(0); setAnswers({}); setScore(0); }}>
                Reset
              </Button>
              <Button variant="hero" size="lg" onClick={() => navigate(`/grade/${gradeId}/topic/${topicId}`)}>
                Back to Topic
              </Button>
            </div>
          </div>
        )}
      </div>

      {zoomedImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => { setZoomedImg(null); setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
          onMouseMove={(e) => {
            if (!isPanning.current) return;
            setPanOffset({ x: lastOffset.current.x + e.clientX - panStart.current.x, y: lastOffset.current.y + e.clientY - panStart.current.y });
          }}
          onMouseUp={() => { isPanning.current = false; lastOffset.current = panOffset; }}
          onMouseLeave={() => { isPanning.current = false; lastOffset.current = panOffset; }}
          onTouchMove={(e) => {
            if (!isPanning.current || !e.touches[0]) return;
            setPanOffset({ x: lastOffset.current.x + e.touches[0].clientX - panStart.current.x, y: lastOffset.current.y + e.touches[0].clientY - panStart.current.y });
          }}
          onTouchEnd={() => { isPanning.current = false; lastOffset.current = panOffset; }}
        >
          <div className="relative overflow-hidden max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomedImg}
              alt="Zoomed"
              className={`rounded-xl object-contain origin-center select-none ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
              style={{ transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`, transition: isPanning.current ? 'none' : 'transform 0.2s' }}
              draggable={false}
              onClick={() => {
                if (zoomLevel === 1) {
                  setZoomLevel(2);
                }
              }}
              onMouseDown={(e) => {
                if (zoomLevel <= 1) return;
                e.preventDefault();
                isPanning.current = true;
                panStart.current = { x: e.clientX, y: e.clientY };
                lastOffset.current = panOffset;
              }}
              onTouchStart={(e) => {
                if (zoomLevel <= 1 || !e.touches[0]) return;
                isPanning.current = true;
                panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                lastOffset.current = panOffset;
              }}
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); const next = Math.max(1, zoomLevel - 1); setZoomLevel(next); if (next === 1) { setPanOffset({ x: 0, y: 0 }); lastOffset.current = { x: 0, y: 0 }; } }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
            >
              −
            </button>
            <span className="text-white text-sm font-medium min-w-[3rem] text-center">{zoomLevel}×</span>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.min(4, prev + 1)); }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={() => { setZoomedImg(null); setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); lastOffset.current = { x: 0, y: 0 }; }}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
