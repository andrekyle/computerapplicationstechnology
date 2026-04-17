export interface LessonContent {
  id: string;
  title: string;
  duration: string;
  hasVideo: boolean;
  sections: LessonSection[];
}

export interface LessonSection {
  type: "heading" | "text" | "image" | "video" | "list" | "note" | "definition";
  content?: string;
  items?: string[];
  imageAlt?: string;
  noteType?: "important" | "tip" | "warning";
}

export interface TopicData {
  id: string;
  title: string;
  description: string;
  lessons: LessonContent[];
  quizCount: number;
}

export const grade10IntroToComputers: TopicData = {
  id: "intro-to-computers",
  title: "Introduction to Computers",
  description: "Learn what a computer is, the types of computers, and how they process information.",
  quizCount: 3,
  lessons: [
    {
      id: "lesson-1",
      title: "What is a Computer?",
      duration: "8 min read",
      hasVideo: true,
      sections: [
        { type: "video", content: "Introduction to Computers — What is a computer and why do we use them?" },
        { type: "heading", content: "Definition" },
        {
          type: "definition",
          content: "A **computer** is an electronic device that accepts data (input), processes it according to a set of instructions (program), and produces information (output). It can also store data for future use.",
        },
        { type: "heading", content: "The Information Processing Cycle (IPC)" },
        {
          type: "text",
          content: "Every computer follows the Information Processing Cycle, which has four stages. Understanding this cycle is fundamental to understanding how all computers work — from smartphones to supercomputers.",
        },
        {
          type: "list",
          items: [
            "**Input** — Data is entered into the computer using input devices (e.g., keyboard, mouse, microphone, scanner).",
            "**Processing** — The CPU (Central Processing Unit) manipulates and transforms the raw data into meaningful information by following program instructions.",
            "**Output** — The processed information is presented to the user through output devices (e.g., monitor, printer, speakers).",
            "**Storage** — Data and information are saved for later use on storage devices (e.g., hard drive, SSD, USB flash drive).",
          ],
        },
        { type: "image", content: "Diagram of the Information Processing Cycle", imageAlt: "Information Processing Cycle: Input → Processing → Output → Storage" },
        { type: "note", content: "The IPC is a favourite exam topic. Make sure you can list the four stages and give examples of devices for each stage.", noteType: "important" },
        { type: "heading", content: "Data vs Information" },
        { type: "definition", content: "**Data** is raw, unprocessed facts and figures that have no meaning on their own (e.g., the number 36.7)." },
        { type: "definition", content: "**Information** is data that has been processed, organised, and given context so it has meaning (e.g., \"The patient's temperature is 36.7°C, which is normal\")." },
        { type: "text", content: "Think of it this way: data is the ingredient, and information is the cooked meal. The computer is the chef that transforms one into the other." },
      ],
    },
    {
      id: "lesson-2",
      title: "Types of Computers",
      duration: "10 min read",
      hasVideo: false,
      sections: [
        { type: "heading", content: "Classification of Computers" },
        { type: "text", content: "Computers come in many shapes and sizes, each designed for specific purposes. In your CAT exam, you need to know the main categories and be able to give examples and typical uses for each." },
        { type: "heading", content: "By Size and Purpose" },
        {
          type: "list",
          items: [
            "**Supercomputer** — The most powerful type of computer. Used for complex calculations such as weather forecasting, scientific simulations, and nuclear research. Example: IBM Summit.",
            "**Mainframe** — A large, powerful computer used by big organisations (banks, airlines) to process millions of transactions. Supports thousands of simultaneous users.",
            "**Server** — A computer that provides services to other computers on a network (hosting websites, email, files). Can range from a small machine to a room full of hardware.",
            "**Desktop Computer (PC)** — A personal computer designed for use at a desk. Suitable for general tasks: word processing, internet browsing, gaming, and office work.",
            "**Laptop / Notebook** — A portable personal computer with a built-in screen, keyboard, touchpad, and battery. Ideal for people who need to work on the move.",
            "**Tablet** — A flat, touchscreen device, larger than a smartphone. Used for browsing, media consumption, and light productivity (e.g., Apple iPad, Samsung Galaxy Tab).",
            "**Smartphone** — A mobile phone with advanced computing capabilities, internet access, and an operating system that runs apps.",
          ],
        },
        { type: "image", content: "Comparison of different computer types by size", imageAlt: "Chart comparing supercomputer, mainframe, server, desktop, laptop, tablet, smartphone" },
        { type: "heading", content: "Embedded Computers" },
        { type: "definition", content: "An **embedded computer** is a small computer built into another device to perform a specific function. You interact with embedded computers daily without realising it." },
        {
          type: "list",
          items: [
            "Microwave oven — controls cooking time and power",
            "Traffic lights — manages signal timing",
            "Modern cars — manages engine performance, ABS braking, GPS",
            "ATMs — processes banking transactions",
            "Smart TVs — runs apps and connects to the internet",
          ],
        },
        { type: "note", content: "Be prepared to classify a computer if given a scenario in the exam. For example: \"A hospital needs a system to manage patient records for 5 000 users simultaneously\" → Answer: Mainframe or server.", noteType: "tip" },
      ],
    },
    {
      id: "lesson-3",
      title: "Hardware: Input, Output & Storage Devices",
      duration: "12 min read",
      hasVideo: true,
      sections: [
        { type: "video", content: "Watch: Input, Output, and Storage devices explained with real-world examples." },
        { type: "heading", content: "What is Hardware?" },
        { type: "definition", content: "**Hardware** refers to the physical components of a computer — parts you can see and touch. Hardware is categorised into input devices, output devices, processing components, and storage devices." },
        { type: "heading", content: "Input Devices" },
        { type: "text", content: "Input devices allow users to enter data and instructions into the computer." },
        {
          type: "list",
          items: [
            "**Keyboard** — The most common input device for typing text and commands. Includes function keys, modifier keys (Ctrl, Alt, Shift), and a numeric keypad.",
            "**Mouse** — A pointing device used to move the cursor and select items on screen. Variations: optical mouse, wireless mouse, trackball.",
            "**Scanner** — Converts physical documents or images into digital format. Types: flatbed scanner, handheld scanner, barcode scanner.",
            "**Microphone** — Captures audio input for recording, voice calls, and voice recognition.",
            "**Webcam** — Captures video input for video calls and recording.",
            "**Touchscreen** — Allows direct input by touching the display surface. Used in smartphones, tablets, ATMs, and kiosks.",
            "**Biometric scanner** — Reads unique physical characteristics (fingerprint, iris, face) for identification and security.",
          ],
        },
        { type: "image", content: "Common input devices illustrated", imageAlt: "Input devices: keyboard, mouse, scanner, microphone, webcam, touchscreen" },
        { type: "heading", content: "Output Devices" },
        { type: "text", content: "Output devices present processed information from the computer to the user." },
        {
          type: "list",
          items: [
            "**Monitor / Screen** — Displays visual output. Types: LCD, LED, OLED. Resolution is measured in pixels (e.g., 1920×1080 Full HD).",
            "**Printer** — Produces hard copy (paper) output. Types: inkjet (colour, photos), laser (fast, text), 3D printer (creates physical objects).",
            "**Speakers / Headphones** — Output audio/sound from the computer.",
            "**Projector** — Projects images onto a large surface for presentations and viewing.",
          ],
        },
        { type: "heading", content: "Storage Devices" },
        {
          type: "list",
          items: [
            "**Hard Disk Drive (HDD)** — Magnetic storage with spinning platters. High capacity (500 GB – 4+ TB), but slower and has moving parts that can fail.",
            "**Solid State Drive (SSD)** — Flash-based storage with no moving parts. Faster, more durable, quieter, but more expensive per GB than HDD.",
            "**USB Flash Drive** — Portable flash storage. Typical capacity: 8 GB – 256 GB. Connects via USB port.",
            "**Optical Disc** — CD (700 MB), DVD (4.7 GB), Blu-ray (25 GB). Used for media distribution but becoming less common.",
            "**Cloud Storage** — Data stored remotely on internet servers (e.g., Google Drive, Dropbox, OneDrive). Accessible from any device with internet.",
          ],
        },
        { type: "image", content: "Storage capacity comparison chart", imageAlt: "Chart: HDD vs SSD vs USB vs Optical vs Cloud storage comparison" },
        { type: "note", content: "In exams, you may be asked to recommend a storage device for a specific scenario. Consider factors: capacity needed, portability, speed, cost, and durability.", noteType: "important" },
      ],
    },
    {
      id: "lesson-4",
      title: "Software: System & Application Software",
      duration: "10 min read",
      hasVideo: false,
      sections: [
        { type: "heading", content: "What is Software?" },
        { type: "definition", content: "**Software** is a set of instructions (programs) that tells the computer hardware what to do. Unlike hardware, software cannot be physically touched." },
        { type: "heading", content: "Two Main Categories of Software" },
        { type: "text", content: "Software is divided into two main categories: system software and application software. Understanding the difference is crucial for your exam." },
        { type: "heading", content: "1. System Software" },
        { type: "definition", content: "**System software** manages the computer's hardware and provides a platform for application software to run. It operates in the background." },
        {
          type: "list",
          items: [
            "**Operating System (OS)** — The most important system software. It manages hardware, provides a user interface, and runs application programs. Examples: Windows 11, macOS, Linux, Android, iOS.",
            "**Device Drivers** — Small programs that allow the OS to communicate with hardware devices (e.g., printer driver, graphics card driver).",
            "**Utility Software** — Tools that help maintain and optimise the computer. Examples: antivirus software, disk cleanup, file compression (WinZip), backup software.",
            "**Firmware** — Permanent software stored in ROM that controls hardware at the lowest level. Example: BIOS/UEFI.",
          ],
        },
        { type: "heading", content: "2. Application Software" },
        { type: "definition", content: "**Application software** is designed to help users perform specific tasks. It runs on top of the operating system." },
        {
          type: "list",
          items: [
            "**Word Processing** — Creating and editing text documents (e.g., Microsoft Word, Google Docs).",
            "**Spreadsheets** — Organising and calculating numerical data (e.g., Microsoft Excel, Google Sheets).",
            "**Presentations** — Creating slideshows (e.g., Microsoft PowerPoint, Google Slides).",
            "**Database Software** — Organising and managing structured data (e.g., Microsoft Access).",
            "**Web Browsers** — Accessing websites (e.g., Google Chrome, Mozilla Firefox, Safari).",
            "**Media Players** — Playing audio and video files (e.g., VLC, Windows Media Player).",
          ],
        },
        { type: "image", content: "System software vs Application software comparison", imageAlt: "Diagram showing system software layer between hardware and application software" },
        { type: "heading", content: "Proprietary vs Open-Source Software" },
        {
          type: "list",
          items: [
            "**Proprietary (Commercial)** — Requires purchase or licence. Source code is hidden. User cannot modify it. Examples: Microsoft Office, Adobe Photoshop.",
            "**Open-Source (Free)** — Free to use, modify, and distribute. Source code is available. Examples: LibreOffice, GIMP, Linux, Firefox.",
            "**Freeware** — Free to use but source code is not available. Cannot be modified. Examples: Skype, Adobe Acrobat Reader.",
            "**Shareware** — Free trial version with limited features or time. Must pay for full version.",
          ],
        },
        { type: "note", content: "Know the advantages and disadvantages of open-source vs proprietary software. A common exam question asks you to recommend software for a specific scenario and justify your choice.", noteType: "tip" },
      ],
    },
    {
      id: "lesson-5",
      title: "Ergonomics & Computer Health",
      duration: "6 min read",
      hasVideo: false,
      sections: [
        { type: "heading", content: "What is Ergonomics?" },
        { type: "definition", content: "**Ergonomics** is the study of designing equipment and workplaces to fit the human body, maximising comfort, efficiency, and safety." },
        { type: "heading", content: "Health Risks of Computer Use" },
        {
          type: "list",
          items: [
            "**Repetitive Strain Injury (RSI)** — Pain in hands, wrists, and arms from repetitive movements like typing and mouse use.",
            "**Eye Strain (Computer Vision Syndrome)** — Dry eyes, headaches, and blurred vision from staring at a screen for extended periods.",
            "**Back and Neck Pain** — Caused by poor posture, incorrect chair height, or poorly positioned monitor.",
            "**Carpal Tunnel Syndrome** — Numbness and tingling in the hand caused by pressure on the median nerve in the wrist from repetitive keyboard/mouse use.",
          ],
        },
        { type: "heading", content: "Preventative Measures" },
        {
          type: "list",
          items: [
            "Use an **adjustable chair** with lumbar support; feet flat on the floor.",
            "Position the **monitor at arm's length**, with the top of the screen at or slightly below eye level.",
            "Take **regular breaks** — follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
            "Use an **ergonomic keyboard and mouse** to reduce strain on wrists.",
            "Ensure **adequate lighting** to reduce glare on the screen.",
            "Keep wrists **straight and level** with the keyboard (use a wrist rest if needed).",
          ],
        },
        { type: "image", content: "Proper ergonomic workstation setup", imageAlt: "Diagram showing correct desk, chair, monitor, and keyboard positioning" },
        { type: "note", content: "Ergonomics questions appear in almost every CAT exam. Be ready to identify health risks from a picture of a poor workstation and suggest improvements.", noteType: "important" },
      ],
    },
  ],
};

export const getTopicContent = (grade: number, topicId: string): TopicData | null => {
  if (grade === 10 && topicId === "intro-to-computers") {
    return grade10IntroToComputers;
  }
  if (grade === 10 && topicId === "term1-revision") {
    return {
      id: "term1-revision",
      title: "Term 1 Revision Exam",
      description: "WCED CAT Grade 10 Term 1 Revision 2026 — Full exam covering System Technologies, Social Implications, Information Management, and Word Processing.",
      quizCount: 5,
      lessons: [],
    };
  }
  return null;
};

export const getLessonContent = (grade: number, topicId: string, lessonId: string): LessonContent | null => {
  const topic = getTopicContent(grade, topicId);
  if (!topic) return null;
  return topic.lessons.find(l => l.id === lessonId) || null;
};
