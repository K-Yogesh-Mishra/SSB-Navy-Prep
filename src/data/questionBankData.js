export const oirAdvancedVault = {
  title: "OIR Advanced Problem-Solving Vault & Formulas",
  categories: [
    {
      id: "cubes",
      name: "1. Cube Cutting & Painting Formulas",
      formulaSummary: "For a cube of side N cut into n x n x n smaller unit cubes (n = Big Side / Small Side):",
      formulas: [
        { label: "3 Faces Painted (Corners)", value: "Always 8 (the 8 corner vertices)" },
        { label: "2 Faces Painted (Edges)", value: "12 * (n - 2)" },
        { label: "1 Face Painted (Central)", value: "6 * (n - 2)^2" },
        { label: "0 Faces Painted (Colorless/Inner)", value: "(n - 2)^3" },
        { label: "Total Unit Cubes", value: "n^3" }
      ],
      method: "First find n = (Side of big cube) / (Side of small cube). Then directly apply the formulas above."
    },
    {
      id: "clocks",
      name: "2. Clock & Calendar Angle Shortcuts",
      formulaSummary: "Angle between Hour hand and Minute hand at H hours and M minutes:",
      formulas: [
        { label: "Angle Formula", value: "Angle θ = | 30*H - (11/2)*M |" },
        { label: "Coincide (0° Angle)", value: "Hands overlap every 65 (5/11) minutes (22 times in 24 hours)" },
        { label: "Straight Line (180° Angle)", value: "Opposite 22 times in 24 hours" },
        { label: "Right Angle (90° Angle)", value: "Forms 90° 44 times in 24 hours" }
      ],
      method: "Plug H and M into |30H - 5.5M|. If the result is > 180°, subtract from 360° to get the acute angle."
    },
    {
      id: "ranking",
      name: "3. Seating Arrangement & Line Ranking Formulas",
      formulaSummary: "Formula for single person rank from opposite ends:",
      formulas: [
        { label: "Total People in Line", value: "Total = (Rank from Left) + (Rank from Right) - 1" },
        { label: "Rank from Right", value: "Rank Right = Total - Rank Left + 1" },
        { label: "Circular Facing Inside", value: "Right = Counter-clockwise, Left = Clockwise" },
        { label: "Circular Facing Outside", value: "Right = Clockwise, Left = Counter-clockwise" }
      ],
      method: "Always draw a linear line or circle and mark positions relative to Left/Right orientations."
    },
    {
      id: "directions",
      name: "4. Direction & Shadow Vector Rules",
      formulaSummary: "Rules for Sunrise, Sunset, and Turn Angles:",
      formulas: [
        { label: "At Sunrise (Morning)", value: "Sun is in East -> Shadow always falls towards WEST." },
        { label: "At Sunset (Evening)", value: "Sun is in West -> Shadow always falls towards EAST." },
        { label: "Right Turn", value: "Clockwise 90° rotation" },
        { label: "Left Turn", value: "Counter-clockwise 90° rotation" }
      ],
      method: "Draw a standard NESW cross. Use Pythagoras theorem (a^2 + b^2 = c^2) for shortest distance."
    }
  ],
  solvedQuestions: [
    {
      id: 1,
      category: "Cube Cutting",
      question: "A solid cube of side 6 cm is painted red on all faces and then cut into smaller cubes of side 1 cm each. How many smaller cubes have exactly 2 faces painted?",
      options: ["48", "36", "24", "64"],
      answer: "48",
      method: "Step 1: Calculate n = 6 / 1 = 6.\nStep 2: Use 2-faces painted formula = 12 * (n - 2).\nStep 3: 12 * (6 - 2) = 12 * 4 = 48."
    },
    {
      id: 2,
      category: "Cube Cutting",
      question: "In the same 6 cm cube cut into 1 cm cubes, how many smaller cubes have NO face painted?",
      options: ["64", "16", "36", "27"],
      answer: "64",
      method: "Step 1: n = 6.\nStep 2: Use 0-face painted formula = (n - 2)^3.\nStep 3: (6 - 2)^3 = 4^3 = 64."
    },
    {
      id: 3,
      category: "Clock Math",
      question: "What is the angle between the hour hand and the minute hand of a clock at 4:20 PM?",
      options: ["10°", "20°", "0°", "15°"],
      answer: "10°",
      method: "Step 1: H = 4, M = 20.\nStep 2: Formula θ = |30*H - (11/2)*M|\nStep 3: θ = |30*(4) - 5.5*(20)| = |120 - 110| = 10°."
    },
    {
      id: 4,
      category: "Clock Math",
      question: "At what time between 3 o'clock and 4 o'clock will the hands of a clock be together (0° angle)?",
      options: ["16 (4/11) min past 3", "15 min past 3", "16 (5/11) min past 3", "18 min past 3"],
      answer: "16 (4/11) min past 3",
      explanation: "Hands overlap at M = (60/11) * H. For H = 3, M = (60/11) * 3 = 180/11 = 16 (4/11) minutes past 3.",
      method: "Shortcut formula for overlap time = 60/11 * H minutes past H."
    },
    {
      id: 5,
      category: "Line Ranking",
      question: "In a class of 45 students, Rohit's rank is 17th from the top. What is his rank from the bottom?",
      options: ["29th", "28th", "30th", "27th"],
      answer: "29th",
      method: "Step 1: Use formula Rank Bottom = Total - Rank Top + 1.\nStep 2: Rank Bottom = 45 - 17 + 1 = 28 + 1 = 29th."
    },
    {
      id: 6,
      category: "Direction & Shadow",
      question: "One morning after sunrise, Vikram and Suresh were standing face to face. Suresh's shadow fell exactly to the left of Vikram. Which direction was Vikram facing?",
      options: ["North", "South", "East", "West"],
      answer: "North",
      method: "Step 1: In the morning, sun is in East -> shadows fall in West.\nStep 2: Shadow is to the Left of Vikram. For left side to be West, Vikram must be facing NORTH."
    },
    {
      id: 7,
      category: "Missing Matrix Logic",
      question: "Find the missing number in the matrix: \n[ 3  4  5 ] \n[ 4  5  6 ] \n[ 5  6  ? ] \n(Bottom row is square sum of top elements minus middle)",
      options: ["7", "8", "9", "10"],
      answer: "7",
      method: "Pattern: Column-wise arithmetic series. 3+1=4+1=5; 4+1=5+1=6; 5+1=6+1=7. Missing number is 7."
    }
  ]
};

export const personalInterviewVault = {
  title: "SSB Personal Interview (PI) High-Yield Question Bank & Blueprints",
  overview: "The Personal Interview is conducted by the President or Vice-President of the SSB board. They ask Rapid-Fire Question Sequences (10 questions in one go) and situational probing questions to assess your truthfulness, social background, academic consistency, and motivations.",
  rapidFireSequences: [
    {
      title: "Rapid-Fire Sequence 1: Academic & Personal Background",
      questions: [
        "1. Tell me about your marks from 10th, 12th, and Graduation.",
        "2. Why did your marks fluctuate between 10th and 12th?",
        "3. Who was your favorite teacher and why?",
        "4. Which subject did you dislike the most and how did you manage it?",
        "5. Tell me about your achievements in sports or extra-curricular activities."
      ],
      strategy: "Listen carefully without interrupting. Remember all 5 questions in sequence. Answer them sequentially: 'Sir, regarding my academics...' Maintain calm speech speed."
    },
    {
      title: "Rapid-Fire Sequence 2: Family & Financial Management",
      questions: [
        "1. Tell me about your family members, their occupations, and your relationship with each.",
        "2. Who are you closest to—father or mother, and why?",
        "3. How do you handle financial expenses in your family?",
        "4. Have you ever had a serious disagreement with your father? How did you resolve it?",
        "5. How do you contribute to household responsibilities daily?"
      ],
      strategy: "Be 100% honest. Disagreements with parents are natural—show respect, logical discussion, and mature resolution."
    }
  ],
  probingQuestions: [
    {
      id: 1,
      question: "Why do you want to join the Indian Navy specifically over Corporate Jobs or Army/Air Force?",
      intent: "Tests your genuine motivation, service awareness, and career clarity.",
      weakAnswer: "Navy has white uniforms and I love traveling in ships.",
      idealAnswer: "Sir, as a technical graduate, the Indian Navy offers an unmatched blend of cutting-edge technology (warships, radar systems, naval aviation) and leadership responsibilities early in career. The sea-going lifestyle, high operational readiness, and pride of defending maritime borders align perfectly with my long-term career goals.",
      keyPoints: ["Highlight technical/operational interest", "Pride in maritime security", "Avoid superficial fashion reasons"]
    },
    {
      id: 2,
      question: "What will you do if you get rejected in this SSB interview today?",
      intent: "Tests emotional resilience, practical backup planning, and determination.",
      weakAnswer: "Sir, I will get depressed and try again next time.",
      idealAnswer: "Sir, I have prepared thoroughly and am confident of recommendation. However, if I do not make it today, I will analyze the feedback from this attempt, work on my identified gaps in fitness/communication, and re-appear in the next Navy SSC attempt. Simultaneously, I am pursuing my career/studies so my progress never stops.",
      keyPoints: ["Show positive confidence", "Demonstrate realistic practical backup", "Zero emotional breakdown"]
    },
    {
      id: 3,
      question: "What are your 3 major strengths and 3 weaknesses?",
      intent: "Tests self-awareness and active efforts towards self-improvement.",
      weakAnswer: "My weakness is that I work too hard and trust people easily. (Fake humble weaknesses)",
      idealAnswer: "Sir, my strengths are organizing team tasks, staying calm under tight deadlines, and maintaining physical fitness. My scope for improvement includes public speaking anxiety under large crowds, for which I have recently joined college debate clubs and started daily narration practice.",
      keyPoints: ["State genuine, fixable weaknesses", "Show active concrete steps being taken to fix them", "Never mention moral flaws like lying or laziness"]
    }
  ]
};
