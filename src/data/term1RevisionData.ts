import { QuizQuestion } from "./quizData";

// Images from the WCED CAT Grade 10 Term 1 Revision 2026
import computerSetupImg from "@/assets/exam-images/page3_img1.jpeg";
import ipcDiagramImg from "@/assets/exam-images/page3_img2.png";
import windowsDesktopImg from "@/assets/exam-images/page4_img1.jpeg";
import shortcutIconImg from "@/assets/exam-images/page4_img2.png";
import ergonomicsImg from "@/assets/exam-images/page5_img1.png";
import folderTreeImg from "@/assets/exam-images/page5_img2.png";
import recycleBinImg from "@/assets/exam-images/page5_img3.jpeg";
import msWordInterfaceImg from "@/assets/exam-images/page6_img1.jpeg";

export { computerSetupImg, ipcDiagramImg, windowsDesktopImg, shortcutIconImg, ergonomicsImg, folderTreeImg, recycleBinImg, msWordInterfaceImg };

// ─── Quiz 1: Matching Items (11 marks) ───────────────────────────────────────

export const term1RevisionQuiz1: { title: string; questions: QuizQuestion[] } = {
  title: "Term 1 Revision — Section A: Matching Items",
  questions: [
    {
      id: 1,
      type: "matching",
      question:
        "Match each item in Column A with the correct answer in Column B.",
      columnA: [
        "A weather scientist working for the South African Weather Services uses this type of computer.",
        "A sales representative who drives around visiting customers each day uses this type of computer.",
        "A schoolteacher preparing work at home uses this type of computer.",
        "I scroll up and down a web page like this using my mouse.",
        "I select an icon on the desktop like this using my mouse.",
        "I open an application using a desktop icon like this using my mouse.",
        "I move an icon from one side of the desktop to another like this using my mouse.",
      ],
      columnB: [
        "Tablet",
        "Supercomputer",
        "Desktop / Laptop",
        "Roll the scroll button of the mouse",
        "Click the left mouse button once",
        "Double-click the left mouse button",
        "Click and hold the left mouse button while moving",
      ],
      correctMatches: [1, 0, 2, 3, 4, 5, 6],
      explanation:
        "1\tSupercomputer (massive processing for weather models)\n" +
        "2\tTablet (portable for travelling reps — Laptop also accepted)\n" +
        "3\tDesktop or Laptop\n" +
        "4\tRoll the scroll button\n" +
        "5\tClick left button once\n" +
        "6\tDouble-click left button\n" +
        "7\tClick-and-hold while moving (drag)",
    },
    {
      id: 2,
      type: "matching",
      question:
        "Match each file extension in Column A with the correct file type in Column B.",
      columnA: [".doc", ".xlsx", ".zip", ".html"],
      columnB: [
        "Microsoft Word document",
        "Microsoft Excel spreadsheet",
        "Compressed file",
        "Web page",
      ],
      correctMatches: [0, 1, 2, 3],
      explanation:
        ".doc\tMicrosoft Word document\n" +
        ".xlsx\tMicrosoft Excel spreadsheet\n" +
        ".zip\tCompressed file\n" +
        ".html\tWeb page",
    },
  ],
};

// ─── Quiz 2: Multiple Choice (1 mark) ────────────────────────────────────────

export const term1RevisionQuiz2: { title: string; questions: QuizQuestion[] } = {
  title: "Term 1 Revision — Section B: Multiple Choice",
  questions: [
    {
      id: 1,
      type: "mcq",
      question:
        "Which of the following is NOT a file extension used for graphics files?",
      options: [".bmp", ".gif", ".toff", ".jpeg"],
      correctAnswer: 2,
      explanation:
        ".toff is not a valid graphics file extension. The correct extension is .tiff (Tagged Image File Format). .bmp, .gif, and .jpeg are all valid graphics/image file formats.",
    },
  ],
};

// ─── Quiz 3: Content Based Questions 1–8 (System Technologies) ───────────────

export const term1RevisionQuiz3: { title: string; questions: QuizQuestion[] } = {
  title: "Term 1 Revision — Section C: System Technologies (Q1–8)",
  questions: [
    {
      id: 1,
      type: "short-answer",
      question:
        "Study the picture of a computer setup below.\n\n" +
        "![Computer Setup](COMPUTER_SETUP_IMG)\n\n" +
        "Identify and name TWO input devices visible in the picture. (2 marks)",
      explanation:
        "Mouse and Keyboard (also accept touchscreen). (2 marks)",
    },
    {
      id: 2,
      type: "short-answer",
      question:
        "Study the picture of a computer setup below.\n\n" +
        "![Computer Setup](COMPUTER_SETUP_IMG)\n\n" +
        "Is device A (the printer) an input device or an output device? (1 mark)",
      explanation:
        "Device A (printer) is an OUTPUT device. (1 mark)",
    },
    {
      id: 3,
      type: "short-answer",
      question:
        "Study the picture of a computer setup below.\n\n" +
        "![Computer Setup](COMPUTER_SETUP_IMG)\n\n" +
        "What is the function of device B (the monitor)? (2 marks)",
      explanation:
        "Device B is a monitor/touchscreen. It displays video and text so that a user can interact with the computer. (2 marks)",
    },
    {
      id: 4,
      type: "short-answer",
      question:
        "Your school has bought a new computer for the administration office. List TWO economic benefits of having a computer in the office. Explain how the school benefits in EACH case. (6 marks)",
      explanation:
        "Any TWO benefits with explanation for each:\n\n" +
        "• Saving paper — Notices can be sent to parents using email/WhatsApp; reports can be sent electronically.\n" +
        "• Increased communication speed with reduced costs — Email/WhatsApp is much faster than posting letters; cheaper to use bulk SMS.\n" +
        "• Efficiency — Important documents can be stored electronically; marks can be captured on a database; records easily retrieved.\n" +
        "• Accuracy — Word processors have built-in spell checkers so communications are error-free; budgets done using spreadsheets rather than manual calculations.",
    },
    {
      id: 5,
      type: "short-answer",
      question:
        "Define what is meant by an embedded device. (2 marks)",
      explanation:
        "An embedded device is a computing device/system that usually has a single purpose. (2 marks)",
    },
    {
      id: 6,
      type: "short-answer",
      question:
        "Give an example of an embedded device that will be found in a motor car. (1 mark)",
      explanation:
        "Any ONE of: Engine management system, Airbag control system, ABS braking system, GPS navigation, parking sensors. (1 mark)",
    },
    {
      id: 7,
      type: "short-answer",
      question:
        "Study the Information Processing Cycle diagram below.\n\n" +
        "![IPC Diagram](IPC_DIAGRAM_IMG)\n\n" +
        "The diagram shows a user (1), Input (2), stage 3, Output (4), stage 5, and a storage/processor device (6).\n\n" +
        "What stage of the information-processing cycle is taking place at stage 3? (1 mark)",
      explanation:
        "Stage 3 is PROCESSING. (1 mark)",
    },
    {
      id: 8,
      type: "short-answer",
      question:
        "Study the Information Processing Cycle diagram below.\n\n" +
        "![IPC Diagram](IPC_DIAGRAM_IMG)\n\n" +
        "The diagram shows a user (1), Input (2), stage 3, Output (4), stage 5, and a storage/processor device (6).\n\n" +
        "Does stage 6 represent storage or communication? Give a reason for your answer. (2 marks)",
      explanation:
        "Stage 6 represents STORAGE. The picture shows a storage device (hard drive). The arrows show that data is moving TO and FROM the device (reading and writing data). (2 marks)",
    },
    {
      id: 9,
      type: "short-answer",
      question:
        "Your class teacher ticks off each morning who is present at school. At the end of the term, she determines how many times each learner was absent. This number is included in the learner's term report.\n\nUsing this scenario, explain the difference between data and information. (4 marks)",
      explanation:
        "The ticks on the class list/attendance register represent DATA — these are unprocessed facts. (2 marks)\n\n" +
        "The total days absent on the report represents INFORMATION — this was obtained by adding up (processing) the number of days absent. Information is processed data that has meaning and is useful. (2 marks)",
    },
    {
      id: 10,
      type: "short-answer",
      question:
        "When working on a computer used by more than one person, you are often asked to enter a username and password. Give TWO reasons why you should never share your password with anyone else. (2 marks)",
      explanation:
        "• Other people could access your files and tamper with them / delete them / steal your information.\n" +
        "• Other people could use the computer to carry out illegal or undesirable activities in your name, e.g., sending rude emails, accessing inappropriate content, cyberbullying.",
    },
    {
      id: 11,
      type: "short-answer",
      question:
        "What does the acronym GUI stand for? (1 mark)",
      explanation:
        "GUI stands for Graphical User Interface. (1 mark)",
    },
    {
      id: 12,
      type: "short-answer",
      question:
        "What is the main screen of the Windows 10 GUI called? (1 mark)",
      explanation:
        "The main screen is called the Desktop. (1 mark)",
    },
    {
      id: 13,
      type: "short-answer",
      question:
        "What is the function of an icon? (2 marks)",
      explanation:
        "Icons are used to access applications, folders, or files without having to go through the Start Menu. They provide a visual shortcut. (2 marks)",
    },
    {
      id: 14,
      type: "short-answer",
      question:
        "Look at the icon below:\n\n" +
        "![Shortcut Icon](SHORTCUT_ICON_IMG)\n\n" +
        "What does the small arrow in the bottom-left corner of this icon indicate? (1 mark)",
      explanation:
        "The small arrow indicates that the icon is a SHORTCUT to the application (in this case, Microsoft Edge). It is not the actual program file but a link to it. (1 mark)",
    },
  ],
};

// ─── Quiz 4: Content Based Questions 9–16 (Desktop, Ergonomics, File Mgmt) ──

export const term1RevisionQuiz4: { title: string; questions: QuizQuestion[] } = {
  title: "Term 1 Revision — Section D: Desktop, Ergonomics & Files (Q9–16)",
  questions: [
    {
      id: 1,
      type: "short-answer",
      question:
        "Study the Windows 10 desktop image below:\n\n" +
        "![Windows Desktop](WINDOWS_DESKTOP_IMG)\n\n" +
        "Label the parts of the desktop labelled A, B, C and D. (4 marks)",
      explanation:
        "A — Start button (1 mark)\n" +
        "B — Taskbar (1 mark)\n" +
        "C — Notification tray / System tray (1 mark)\n" +
        "D — Start menu (1 mark)",
    },
    {
      id: 2,
      type: "short-answer",
      question:
        "Study the icon below:\n\n" +
        "![Recycle Bin](RECYCLE_BIN_IMG)\n\n" +
        "What application/feature can be accessed by double-clicking this icon? (1 mark)",
      explanation:
        "The Recycle Bin. (1 mark)",
    },
    {
      id: 3,
      type: "short-answer",
      question:
        "Study the icon below:\n\n" +
        "![Recycle Bin](RECYCLE_BIN_IMG)\n\n" +
        "Explain to someone who is NOT familiar with Windows 10 how you would use this feature. (3 marks)",
      explanation:
        "Items such as files or folders that have been deleted are stored temporarily in the Recycle Bin. If they were deleted in error, they can be restored to their original location. You can also permanently delete files by emptying the Recycle Bin. (3 marks)",
    },
    {
      id: 4,
      type: "short-answer",
      question: "Explain the difference between SAVING and CLOSING a file. (2 marks)",
      explanation:
        "When you SAVE a file, the file is updated on the storage medium where it is stored, but the file remains open for further editing.\n\n" +
        "When you CLOSE a file, the file is no longer open/visible, but the application (e.g., Word) stays open. If you haven't saved, you may lose changes.",
    },
    {
      id: 5,
      type: "short-answer",
      question: "Give FOUR tips to avoid eye strain when using a computer monitor. (4 marks)",
      explanation:
        "Any FOUR:\n" +
        "• Place the monitor at eye level.\n" +
        "• Tilt the screen at an angle to avoid glare.\n" +
        "• Take regular breaks by getting up or looking into the distance.\n" +
        "• Don't sit with the monitor facing a window or light source.\n" +
        "• Use the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    },
    {
      id: 6,
      type: "short-answer",
      question:
        "Study the correct sitting posture image below:\n\n" +
        "![Ergonomics](ERGONOMICS_IMG)\n\n" +
        "Mention at least FOUR points that you need to focus on for correct seating posture when using a computer. (4 marks)",
      explanation:
        "Any FOUR:\n" +
        "• Sit up straight with your back perpendicular to the ground.\n" +
        "• Your forearms should be at the same height as your mouse and keyboard.\n" +
        "• Your feet should be placed firmly on the ground or on a footrest.\n" +
        "• The back of your chair, height of your chair, and height of your armrests should be adjusted to support your body.\n" +
        "• The monitor should be positioned at eye level and roughly 50 cm away from you.\n" +
        "• The monitor should be tilted upwards to reduce glare.\n" +
        "• You should stand up and take regular breaks.",
    },
    {
      id: 7,
      type: "short-answer",
      question:
        "Each time Sipho saves a file, he saves it to the desktop of the computer. His desktop is very cluttered, and he has trouble finding files.\n\nAdvise Sipho on a more effective way to organise his files. (4 marks)",
      explanation:
        "Sipho should:\n" +
        "• Create folders with meaningful names that suggest what type of file is stored in them.\n" +
        "• The files on the desktop should be copied/moved into appropriate folders.\n" +
        "• Delete unnecessary files from the desktop.\n" +
        "• Use sub-folders to further organise related files (e.g., School > Grade 10 > CAT).",
    },
    {
      id: 8,
      type: "short-answer",
      question:
        "Fred created a folder called 'Grade 10 PAT' on a school computer. The folder location is:\nc:\\users\\Fred\\documents\\Grade 10\\Grade 10 PAT\n\nStudy the folder tree diagram below:\n\n" +
        "![Folder Tree](FOLDER_TREE_IMG)\n\n" +
        "Write down the folder names of folders A, B and C. (3 marks)",
      explanation:
        "A — Documents (1 mark)\n" +
        "B — Grade 10 (1 mark)\n" +
        "C — Grade 10 PAT (1 mark)",
    },
    {
      id: 9,
      type: "short-answer",
      question:
        "Fred created a folder called 'Grade 10 PAT' on a school computer. The folder location is:\nc:\\users\\Fred\\documents\\Grade 10\\Grade 10 PAT\n\nStudy the folder tree diagram below:\n\n" +
        "![Folder Tree](FOLDER_TREE_IMG)\n\n" +
        "How many users have folders on this computer? (1 mark)",
      explanation:
        "Three users (Fred, Zainab, Mimi). (1 mark)",
    },
    {
      id: 10,
      type: "matching",
      question: "Match each action with the correct keyboard shortcut.",
      columnA: ["Rename a file", "Copy a folder", "Paste a document"],
      columnB: ["F2", "Ctrl+C", "Ctrl+V"],
      correctMatches: [0, 1, 2],
      explanation:
        "Rename a file → F2\n" +
        "Copy a folder → Ctrl+C\n" +
        "Paste a document → Ctrl+V",
    },
  ],
};

// ─── Quiz 5: Word Processing (Solution Development) ──────────────────────────

export const term1RevisionQuiz5: { title: string; questions: QuizQuestion[] } = {
  title: "Term 1 Revision — Section E: Word Processing",
  questions: [
    {
      id: 1,
      type: "short-answer",
      question:
        "Word-processing applications have several uses. List any TWO uses of a word processor. (2 marks)",
      explanation:
        "Any TWO:\n" +
        "• Word processors can be used to create documents (letters, reports, essays).\n" +
        "• Edit and format text documents.\n" +
        "• Print documents.\n" +
        "• Create mail merges.\n" +
        "• Insert tables, images, and graphics into documents.",
    },
    {
      id: 2,
      type: "short-answer",
      question:
        "Study the screenshot of Microsoft Word below:\n\n" +
        "![MS Word Interface](MS_WORD_IMG)\n\n" +
        "Write down the labels for the following parts: A, E, H, I, J and K. (6 marks)",
      labels: ["A", "E", "H", "I", "J", "K"],
      labelAnswers: {
        "A": ["save button", "save"],
        "E": ["ruler"],
        "H": ["scroll bar", "scrollbar"],
        "I": ["page and word count", "word count", "page count"],
        "J": ["document views", "view buttons"],
        "K": ["zoom control", "zoom slider", "zoom"],
      },
      explanation:
        "A — Save button (1 mark)\n" +
        "E — Ruler (1 mark)\n" +
        "H — Scroll bar (1 mark)\n" +
        "I — Page and word count (1 mark)\n" +
        "J — Document views (1 mark)\n" +
        "K — Zoom control (1 mark)",
    },
    {
      id: 3,
      type: "short-answer",
      question:
        "Briefly explain WHEN you would use the 'Save As' option, compared to when you would use the 'Save' option. (3 marks)",
      explanation:
        "The 'Save As' option is used when:\n" +
        "• Saving in a different location (folder or drive).\n" +
        "• Adding a password to the file.\n" +
        "• Saving as a different type of file (e.g., .pdf instead of .docx).\n" +
        "• Creating a copy with a different name.\n\n" +
        "The 'Save' option saves the file to its current location with the same name, overwriting the previous version.",
    },
    {
      id: 4,
      type: "matching",
      question:
        "Match each Window concept in Column A with its correct description in Column B.",
      columnA: [
        "Restore button",
        "Title bar",
        "Maximise button",
        "Shortcut",
      ],
      columnB: [
        "Returns the window to normal size after being maximised",
        "Found at the top of the window; shows the name of the open file",
        "Enlarges a window to fill the entire screen",
        "Used to find folders, files, or programs quickly",
      ],
      correctMatches: [0, 1, 2, 3],
      explanation:
        "Restore button → Returns to normal window size.\n" +
        "Title bar → Found at top of window, shows file name.\n" +
        "Maximise button → Enlarges window to full screen.\n" +
        "Shortcut → Quick way to find/access folders, files, or programs.",
    },
    {
      id: 5,
      type: "mcq",
      question:
        "When formatting a heading in Word, which of the following actions would you take to change character spacing?",
      options: [
        "Home tab → Font group → Bold",
        "Home tab → Font dialog box → Advanced tab → Spacing",
        "Insert tab → Header & Footer",
        "Page Layout → Margins",
      ],
      correctAnswer: 1,
      explanation:
        "To change character spacing (expand or condense), you go to the Home tab → open the Font dialog box (click the small arrow) → Advanced tab → Spacing dropdown. This allows you to expand or condense the spacing between characters by a specific point value.",
    },
    {
      id: 6,
      type: "short-answer",
      question:
        "In Revision Activity 2, learners are asked to:\n\n" +
        "2.3 Change the style of a heading to 'Heading 1' style.\n" +
        "2.4.1 Remove a hanging indent from a paragraph.\n" +
        "2.4.2 Change line spacing to 1.5.\n" +
        "2.4.3 Replace green highlighting with light paragraph shading.\n" +
        "2.4.4 Add a red paragraph border with a width of 2¼ pt.\n\n" +
        "Explain how you would carry out step 2.4.2 (change the line spacing to 1.5) in Microsoft Word. (2 marks)",
      explanation:
        "To change line spacing to 1.5 in Microsoft Word:\n" +
        "1. Select the paragraph.\n" +
        "2. Go to Home tab → Paragraph group → Click the Line Spacing button (or open the Paragraph dialog box).\n" +
        "3. Select 1.5 from the dropdown, OR in the Paragraph dialog box, set 'Line spacing' to 1.5 lines.\n" +
        "4. Click OK.",
    },
    {
      id: 7,
      type: "short-answer",
      question:
        "Explain the difference between a hanging indent and a first-line indent in a word processor. (2 marks)",
      explanation:
        "A FIRST-LINE INDENT indents only the first line of a paragraph to the right.\n\n" +
        "A HANGING INDENT indents all lines of a paragraph EXCEPT the first line. The first line stays at the margin while the remaining lines are indented. This is commonly used in bibliographies and reference lists.",
    },
    {
      id: 8,
      type: "mcq",
      question:
        "What is the purpose of the 'Print Preview' feature in Microsoft Word?",
      options: [
        "To save the document as a PDF",
        "To see what the document will look like when printed before actually printing it",
        "To change the printer settings",
        "To share the document via email",
      ],
      correctAnswer: 1,
      explanation:
        "Print Preview allows you to see exactly what your document will look like when printed. This helps you check formatting, margins, page breaks, and layout before wasting paper and ink.",
    },
    {
      id: 9,
      type: "short-answer",
      question:
        "In Word, explain how to change a hyphen (-) to an en dash (–). (2 marks)",
      explanation:
        "To change a hyphen to an en dash:\n" +
        "1. Select the hyphen in the text.\n" +
        "2. Go to Insert tab → Symbol → More Symbols.\n" +
        "3. Find the en dash (–) in the Special Characters tab.\n" +
        "4. Click Insert.\n\n" +
        "Alternative: Type the hyphen with a space before and after, and Word may auto-correct it. Or use the shortcut Ctrl + Minus (on the numeric keypad).",
    },
    {
      id: 10,
      type: "mcq",
      question:
        "Which tab in Microsoft Word would you use to set the top margin to 2 cm?",
      options: [
        "Home tab",
        "Insert tab",
        "Layout tab (Page Layout)",
        "View tab",
      ],
      correctAnswer: 2,
      explanation:
        "To set margins, go to the Layout tab (also called Page Layout in some versions) → Margins → Custom Margins. In the dialog box, change the Top margin to 2 cm.",
    },
  ],
};
