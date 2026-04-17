import {
  term1RevisionQuiz1,
  term1RevisionQuiz2,
  term1RevisionQuiz3,
  term1RevisionQuiz4,
  term1RevisionQuiz5,
} from "./term1RevisionData";

export interface QuizQuestion {
  id: number;
  type: "mcq" | "matching" | "short-answer" | "drag-drop";
  question: string;
  options?: string[];
  columnA?: string[];
  columnB?: string[];
  correctAnswer?: number | string;
  correctMatches?: number[];
  items?: string[];
  correctOrder?: number[];
  explanation: string;
  prefill?: string;
  labels?: string[];
  labelAnswers?: Record<string, string[]>;
}

export interface TopicQuizzes {
  [topicId: string]: {
    [quizId: string]: {
      title: string;
      questions: QuizQuestion[];
    };
  };
}

export const grade10Quizzes: TopicQuizzes = {
  "term1-revision": {
    "1": term1RevisionQuiz1,
    "2": term1RevisionQuiz2,
    "3": term1RevisionQuiz3,
    "4": term1RevisionQuiz4,
    "5": term1RevisionQuiz5,
  },
  "intro-to-computers": {
    "1": {
      title: "Introduction to Computers — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "Which of the following is an example of an input device?",
          options: ["Monitor", "Printer", "Keyboard", "Speaker"],
          correctAnswer: 2,
          explanation: "A keyboard is an input device because it sends data INTO the computer. Monitors, printers, and speakers are output devices that present data FROM the computer.",
        },
        {
          id: 2, type: "mcq",
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
          correctAnswer: 0,
          explanation: "CPU stands for Central Processing Unit. It is the brain of the computer that performs calculations and executes instructions.",
        },
        {
          id: 3, type: "matching",
          question: "Match each hardware component in Column A with its function in Column B.",
          columnA: ["RAM", "Hard Drive", "CPU", "GPU"],
          columnB: [
            "Processes all instructions and calculations",
            "Stores data permanently even when powered off",
            "Temporarily stores data for quick access",
            "Renders images and video on screen",
          ],
          correctMatches: [2, 1, 0, 3],
          explanation: "RAM is temporary fast-access memory, the hard drive provides permanent storage, the CPU processes instructions, and the GPU handles graphics rendering.",
        },
        {
          id: 4, type: "short-answer",
          question: "Explain the difference between hardware and software. Give one example of each.",
          correctAnswer: "hardware software",
          labels: ["Hardware", "Hardware example", "Software", "Software example"],
          explanation: "Hardware refers to the physical components of a computer that you can touch (e.g., keyboard, monitor, motherboard). Software refers to programs and instructions that tell the hardware what to do (e.g., Microsoft Windows, Google Chrome).",
        },
        {
          id: 5, type: "mcq",
          question: "Which of the following is system software?",
          options: ["Microsoft Word", "Windows 11", "Google Chrome", "Photoshop"],
          correctAnswer: 1,
          explanation: "Windows 11 is an operating system, which is system software. It manages hardware resources and provides a platform for application software. Word, Chrome, and Photoshop are application software.",
        },
        {
          id: 6, type: "drag-drop",
          question: "Arrange these storage units from smallest to largest.",
          items: ["Gigabyte (GB)", "Kilobyte (KB)", "Terabyte (TB)", "Megabyte (MB)"],
          correctOrder: [1, 3, 0, 2],
          explanation: "The correct order from smallest to largest is: Kilobyte (KB) → Megabyte (MB) → Gigabyte (GB) → Terabyte (TB). Each unit is approximately 1 000 times larger than the previous one.",
        },
        {
          id: 7, type: "mcq",
          question: "What is the main function of an operating system?",
          options: [
            "To create documents and spreadsheets",
            "To manage hardware resources and provide a user interface",
            "To connect to the internet",
            "To protect the computer from viruses",
          ],
          correctAnswer: 1,
          explanation: "The operating system manages the computer's hardware resources (CPU, memory, storage), provides a user interface, and serves as a platform for running application software.",
        },
        {
          id: 8, type: "matching",
          question: "Match each type of software in Column A with the correct example in Column B.",
          columnA: ["Operating System", "Word Processor", "Spreadsheet", "Web Browser"],
          columnB: ["Google Chrome", "Microsoft Excel", "macOS", "Microsoft Word"],
          correctMatches: [2, 3, 1, 0],
          explanation: "macOS is an operating system, Microsoft Word is a word processor, Microsoft Excel is a spreadsheet program, and Google Chrome is a web browser.",
        },
        {
          id: 9, type: "mcq",
          question: "Which component determines the processing speed of a computer?",
          options: ["Amount of RAM", "Size of hard drive", "Clock speed of CPU", "Size of the monitor"],
          correctAnswer: 2,
          explanation: "The clock speed of the CPU (measured in GHz) is the primary factor that determines processing speed. While RAM also affects performance, the CPU clock speed is the main determinant.",
        },
        {
          id: 10, type: "short-answer",
          question: "What does the acronym GUI stand for, and why is it important?",
          correctAnswer: "graphical user interface",
          labels: ["Acronym", "Importance"],
          explanation: "GUI stands for Graphical User Interface. It is important because it allows users to interact with the computer using visual elements like windows, icons, menus, and pointers instead of typing text commands, making computers easier and more intuitive to use.",
        },
      ],
    },
    "2": {
      title: "Introduction to Computers — Quiz 2",
      questions: [
        {
          id: 1, type: "mcq",
          question: "Which of the following is volatile memory?",
          options: ["Hard disk drive", "SSD", "RAM", "ROM"],
          correctAnswer: 2,
          explanation: "RAM (Random Access Memory) is volatile memory, meaning it loses all data when the computer is powered off. Hard drives, SSDs, and ROM are non-volatile.",
        },
        {
          id: 2, type: "drag-drop",
          question: "Arrange the stages of the Information Processing Cycle in the correct order.",
          items: ["Processing", "Input", "Storage", "Output"],
          correctOrder: [1, 0, 3, 2],
          explanation: "The Information Processing Cycle follows: Input (data enters the system) → Processing (CPU manipulates data) → Output (results are displayed) → Storage (data is saved for later use).",
        },
        {
          id: 3, type: "mcq",
          question: "What type of software is a device driver?",
          options: ["Application software", "System software", "Utility software", "Firmware"],
          correctAnswer: 1,
          explanation: "A device driver is system software that allows the operating system to communicate with hardware devices like printers, graphics cards, and USB devices.",
        },
        {
          id: 4, type: "matching",
          question: "Match each port/connector in Column A with its primary use in Column B.",
          columnA: ["HDMI", "USB", "Ethernet", "Audio jack"],
          columnB: [
            "Connecting headphones or speakers",
            "Transferring data and charging devices",
            "Connecting to a wired network",
            "Transmitting video and audio to a display",
          ],
          correctMatches: [3, 1, 2, 0],
          explanation: "HDMI transmits video/audio to displays, USB transfers data and charges devices, Ethernet provides wired network connectivity, and the audio jack connects headphones/speakers.",
        },
        {
          id: 5, type: "short-answer",
          question: "Name three output devices and explain what each does.",
          correctAnswer: "output",
          labels: ["Device 1", "Device 2", "Device 3"],
          explanation: "Three output devices: (1) Monitor — displays visual information from the computer. (2) Printer — produces a hard copy (printout) of digital documents. (3) Speakers — output audio/sound from the computer.",
        },
        {
          id: 6, type: "mcq",
          question: "1 Gigabyte (GB) is approximately equal to:",
          options: ["100 Megabytes", "1 000 Megabytes", "10 000 Kilobytes", "100 Terabytes"],
          correctAnswer: 1,
          explanation: "1 Gigabyte is approximately 1 000 Megabytes (technically 1 024 MB in binary). This is a fundamental unit conversion in computer science.",
        },
        {
          id: 7, type: "mcq",
          question: "Which of the following best describes firmware?",
          options: [
            "Software you download from the internet",
            "Permanent software embedded in hardware (e.g. BIOS)",
            "Temporary files stored in RAM",
            "Anti-virus software",
          ],
          correctAnswer: 1,
          explanation: "Firmware is permanent software programmed into read-only memory (ROM) that provides low-level control for hardware. BIOS is the most common example — it initialises hardware when you turn on the computer.",
        },
        {
          id: 8, type: "mcq",
          question: "Which type of computer would be most suitable for a large company's data centre?",
          options: ["Laptop", "Tablet", "Mainframe", "Smartphone"],
          correctAnswer: 2,
          explanation: "A mainframe is a powerful, large-scale computer designed for bulk data processing and serving many users simultaneously, making it ideal for data centres in large organisations.",
        },
      ],
    },
    "3": {
      title: "Introduction to Computers — Quiz 3",
      questions: [
        {
          id: 1, type: "mcq",
          question: "What is the purpose of the BIOS?",
          options: [
            "To run application software",
            "To perform startup checks and load the operating system",
            "To connect to Wi-Fi",
            "To store user files",
          ],
          correctAnswer: 1,
          explanation: "BIOS (Basic Input/Output System) performs the POST (Power-On Self-Test) to check hardware, then loads the operating system from the storage device into RAM.",
        },
        {
          id: 2, type: "matching",
          question: "Match each type of computer in Column A with its typical use in Column B.",
          columnA: ["Supercomputer", "Desktop PC", "Tablet", "Server"],
          columnB: [
            "Hosting websites and managing network resources",
            "Complex scientific simulations and weather forecasting",
            "General office work and home computing",
            "Casual browsing and reading on the go",
          ],
          correctMatches: [1, 2, 3, 0],
          explanation: "Supercomputers handle complex scientific tasks, desktops are for general-purpose computing, tablets are portable for casual use, and servers host websites/manage networks.",
        },
        {
          id: 3, type: "drag-drop",
          question: "Arrange these computer generations in chronological order.",
          items: ["Transistors", "Vacuum tubes", "Microprocessors", "Integrated circuits"],
          correctOrder: [1, 0, 3, 2],
          explanation: "Computer generations: 1st — Vacuum tubes (1940s-50s), 2nd — Transistors (1950s-60s), 3rd — Integrated circuits (1960s-70s), 4th — Microprocessors (1970s-present).",
        },
        {
          id: 4, type: "short-answer",
          question: "What is the difference between RAM and ROM? Give a use for each.",
          correctAnswer: "RAM ROM",
          labels: ["RAM", "RAM use", "ROM", "ROM use"],
          explanation: "RAM (Random Access Memory) is volatile — it temporarily stores data being actively used and loses contents when powered off. Used for running programs. ROM (Read-Only Memory) is non-volatile — it permanently stores essential startup instructions. Used for BIOS/firmware.",
        },
        {
          id: 5, type: "mcq",
          question: "Which of the following is NOT a function of an operating system?",
          options: [
            "Managing files and folders",
            "Providing a user interface",
            "Creating presentations",
            "Managing memory allocation",
          ],
          correctAnswer: 2,
          explanation: "Creating presentations is done by application software (like PowerPoint), not the operating system. OS functions include file management, providing a user interface, and managing memory.",
        },
      ],
    },
  },
  "hardware": {
    "1": {
      title: "Hardware Components — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "The motherboard's primary function is to:",
          options: [
            "Store data permanently",
            "Connect and allow communication between all components",
            "Cool down the CPU",
            "Display images on screen",
          ],
          correctAnswer: 1,
          explanation: "The motherboard is the main circuit board that connects all computer components (CPU, RAM, storage, etc.) and allows them to communicate with each other via buses and circuits.",
        },
        {
          id: 2, type: "matching",
          question: "Match each component in Column A with its description in Column B.",
          columnA: ["Power Supply Unit", "Heat Sink", "Motherboard", "Expansion Slot"],
          columnB: [
            "Allows additional cards (e.g., graphics card) to be added",
            "Converts AC power to DC power for components",
            "Absorbs and dissipates heat from the CPU",
            "Main circuit board connecting all components",
          ],
          correctMatches: [1, 2, 3, 0],
          explanation: "The PSU converts power, the heat sink cools the CPU, the motherboard connects everything, and expansion slots allow adding hardware like graphics cards.",
        },
        {
          id: 3, type: "mcq",
          question: "Which storage device has no moving parts and is faster than a traditional hard drive?",
          options: ["HDD", "Floppy disk", "SSD", "CD-ROM"],
          correctAnswer: 2,
          explanation: "An SSD (Solid State Drive) uses flash memory with no moving parts, making it faster, quieter, more durable, and more energy-efficient than a traditional HDD.",
        },
        {
          id: 4, type: "short-answer",
          question: "Explain why a computer needs both RAM and a hard drive.",
          correctAnswer: "RAM hard drive",
          labels: ["RAM", "Hard drive"],
          explanation: "A computer needs RAM for fast temporary storage of data being actively used — it allows the CPU to quickly access running programs. The hard drive provides permanent storage for all files, programs, and the operating system. RAM is fast but volatile; the hard drive is slower but retains data when powered off.",
        },
        {
          id: 5, type: "drag-drop",
          question: "Arrange these components from fastest access speed to slowest.",
          items: ["Hard Disk Drive", "CPU Cache", "RAM", "SSD"],
          correctOrder: [1, 2, 3, 0],
          explanation: "Speed order: CPU Cache (fastest, built into processor) → RAM (fast temporary memory) → SSD (fast permanent storage) → HDD (slowest, mechanical parts).",
        },
        {
          id: 6, type: "mcq",
          question: "What does 'dual-core' processor mean?",
          options: [
            "The processor has two different brands",
            "The processor contains two processing units",
            "The processor runs at double speed",
            "The processor uses two types of memory",
          ],
          correctAnswer: 1,
          explanation: "A dual-core processor contains two independent processing units (cores) on a single chip, allowing it to handle two tasks simultaneously and improving multitasking performance.",
        },
      ],
    },
  },
  "software": {
    "1": {
      title: "System & Application Software — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "Which of the following is an example of open-source software?",
          options: ["Microsoft Office", "Adobe Photoshop", "LibreOffice", "macOS"],
          correctAnswer: 2,
          explanation: "LibreOffice is open-source software — its source code is freely available, and anyone can modify and distribute it. Microsoft Office and Adobe Photoshop are proprietary (commercial) software.",
        },
        {
          id: 2, type: "matching",
          question: "Match each software type in Column A with the correct example in Column B.",
          columnA: ["Utility Software", "Application Software", "System Software", "Programming Software"],
          columnB: ["Python IDE", "Windows Defender (Antivirus)", "Linux Kernel", "Microsoft PowerPoint"],
          correctMatches: [1, 3, 2, 0],
          explanation: "Utility software helps maintain the computer (antivirus), application software helps users do tasks (PowerPoint), system software manages hardware (Linux Kernel), and programming software helps developers write code (Python IDE).",
        },
        {
          id: 3, type: "short-answer",
          question: "What is the difference between proprietary software and open-source software?",
          correctAnswer: "proprietary open-source",
          labels: ["Proprietary software", "Open-source software"],
          explanation: "Proprietary software is owned by a company, requires a licence/purchase, and its source code is hidden (e.g., Microsoft Office). Open-source software is free to use, and its source code is publicly available for anyone to view, modify, and distribute (e.g., LibreOffice, Linux).",
        },
        {
          id: 4, type: "mcq",
          question: "What is the purpose of disk defragmentation?",
          options: [
            "To delete unnecessary files",
            "To rearrange fragmented data for faster access",
            "To scan for viruses",
            "To increase storage capacity",
          ],
          correctAnswer: 1,
          explanation: "Disk defragmentation rearranges fragmented data on a hard drive so related data is stored contiguously, improving read/write speeds. Note: SSDs should NOT be defragmented.",
        },
      ],
    },
  },
};

export const grade11Quizzes: TopicQuizzes = {
  "advanced-hardware": {
    "1": {
      title: "Advanced Hardware — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "What is the function of the northbridge chipset on a motherboard?",
          options: [
            "Managing USB and audio connections",
            "Handling high-speed communication between CPU, RAM, and GPU",
            "Providing power to the CPU",
            "Storing the BIOS firmware",
          ],
          correctAnswer: 1,
          explanation: "The northbridge handles high-speed communication between the CPU, RAM, and GPU. The southbridge handles slower peripherals like USB and audio.",
        },
        {
          id: 2, type: "matching",
          question: "Match each memory type in Column A with its characteristic in Column B.",
          columnA: ["SRAM", "DRAM", "Flash Memory", "Cache"],
          columnB: [
            "Fastest memory, closest to CPU",
            "Used in USB drives and SSDs",
            "Fast, expensive, doesn't need refreshing",
            "Needs constant refreshing, used for main RAM",
          ],
          correctMatches: [2, 3, 1, 0],
          explanation: "SRAM is fast and doesn't need refreshing, DRAM needs refreshing and is used for main RAM, Flash memory is in SSDs/USB drives, and Cache is the fastest memory closest to CPU.",
        },
        {
          id: 3, type: "short-answer",
          question: "Explain the difference between parallel and serial data transmission.",
          correctAnswer: "parallel serial",
          labels: ["Parallel", "Serial"],
          explanation: "Parallel transmission sends multiple bits simultaneously along multiple wires (faster over short distances but prone to interference). Serial transmission sends one bit at a time along a single wire (more reliable over long distances, e.g., USB, SATA).",
        },
      ],
    },
  },
  "databases-intro": {
    "1": {
      title: "Introduction to Databases — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "In a relational database, a 'record' refers to:",
          options: ["A single column in a table", "A single row in a table", "The entire table", "The database file"],
          correctAnswer: 1,
          explanation: "A record (or row) represents a single entry in a table. Each record contains data for all the fields (columns) defined in that table.",
        },
        {
          id: 2, type: "matching",
          question: "Match each database term in Column A with its definition in Column B.",
          columnA: ["Primary Key", "Foreign Key", "Field", "Table"],
          columnB: [
            "A column that stores individual pieces of data",
            "A structured collection of related records",
            "A unique identifier for each record",
            "A field that links to a primary key in another table",
          ],
          correctMatches: [2, 3, 0, 1],
          explanation: "A primary key uniquely identifies records, a foreign key creates relationships between tables, a field is a single column, and a table holds related records.",
        },
        {
          id: 3, type: "drag-drop",
          question: "Arrange the steps of database design in the correct order.",
          items: ["Create relationships between tables", "Identify the data to store", "Define fields and data types", "Normalise the data"],
          correctOrder: [1, 2, 3, 0],
          explanation: "Database design: Identify data needs → Define fields and data types → Normalise to reduce redundancy → Create relationships between tables.",
        },
      ],
    },
  },
};

export const grade12Quizzes: TopicQuizzes = {
  "advanced-databases": {
    "1": {
      title: "Advanced Databases & SQL — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "Which SQL statement is used to retrieve data from a database?",
          options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
          correctAnswer: 2,
          explanation: "SELECT is the SQL statement used to retrieve (query) data from one or more tables. INSERT adds new data, UPDATE modifies existing data, and DELETE removes data.",
        },
        {
          id: 2, type: "short-answer",
          question: "Write an SQL query to select all learners from the 'Students' table who are in Grade 12.",
          correctAnswer: "SELECT",
          explanation: "SELECT * FROM Students WHERE Grade = 12; — This query selects all columns (*) from the Students table where the Grade field equals 12.",
        },
        {
          id: 3, type: "matching",
          question: "Match each SQL clause in Column A with its function in Column B.",
          columnA: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
          columnB: [
            "Filters groups after aggregation",
            "Sorts the result set",
            "Filters individual rows before grouping",
            "Groups rows with the same values",
          ],
          correctMatches: [2, 1, 3, 0],
          explanation: "WHERE filters rows before grouping, ORDER BY sorts results, GROUP BY groups rows by a column, and HAVING filters groups after aggregation.",
        },
        {
          id: 4, type: "mcq",
          question: "What does the SQL COUNT() function do?",
          options: [
            "Calculates the total value of a column",
            "Returns the number of rows matching a condition",
            "Returns the average of a column",
            "Finds the maximum value",
          ],
          correctAnswer: 1,
          explanation: "COUNT() returns the number of rows that match the specified condition. SUM() calculates totals, AVG() computes averages, and MAX() finds the maximum value.",
        },
        {
          id: 5, type: "drag-drop",
          question: "Arrange these SQL clauses in the correct order they appear in a query.",
          items: ["ORDER BY", "SELECT", "WHERE", "FROM"],
          correctOrder: [1, 3, 2, 0],
          explanation: "The correct SQL clause order is: SELECT (what columns) → FROM (which table) → WHERE (filter conditions) → ORDER BY (sort results).",
        },
      ],
    },
  },
  "social-implications": {
    "1": {
      title: "Social Implications — Quiz 1",
      questions: [
        {
          id: 1, type: "mcq",
          question: "The POPI Act (Protection of Personal Information Act) aims to:",
          options: [
            "Prevent all internet usage",
            "Protect citizens' personal data from misuse",
            "Make software development illegal without a licence",
            "Control social media content",
          ],
          correctAnswer: 1,
          explanation: "The POPI Act (South Africa) protects the personal information of citizens and regulates how organisations collect, process, store, and share personal data.",
        },
        {
          id: 2, type: "matching",
          question: "Match each ethical concern in Column A with its description in Column B.",
          columnA: ["Software Piracy", "Plagiarism", "Phishing", "Identity Theft"],
          columnB: [
            "Stealing someone's personal details to commit fraud",
            "Copying and distributing software without permission",
            "Presenting someone else's work as your own",
            "Sending fake emails to steal sensitive information",
          ],
          correctMatches: [1, 2, 3, 0],
          explanation: "Software piracy is illegal copying of software, plagiarism is presenting others' work as your own, phishing uses fake communications to steal info, and identity theft is using someone's personal details fraudulently.",
        },
        {
          id: 3, type: "short-answer",
          question: "Explain the concept of the 'digital divide' and give two ways it can be addressed.",
          correctAnswer: "digital divide",
          labels: ["Concept", "Way 1", "Way 2"],
          explanation: "The digital divide refers to the gap between people who have access to technology and the internet and those who do not, often due to economic, geographic, or educational factors. It can be addressed by: (1) Government initiatives providing free Wi-Fi and computer labs in underserved areas, (2) Subsidising affordable devices for low-income households.",
        },
      ],
    },
  },
};

export const getQuizData = (grade: number, topicId: string, quizId: string) => {
  const quizBank = grade === 10 ? grade10Quizzes : grade === 11 ? grade11Quizzes : grade12Quizzes;
  return quizBank[topicId]?.[quizId] || null;
};
