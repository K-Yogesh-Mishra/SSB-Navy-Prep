export const oirGuide = {
  title: "Officers Intelligence Rating (OIR) Masterclass",
  overview: "OIR consists of two tests (Verbal and Non-Verbal Reasoning) with 40-50 questions each, to be solved in 17-20 minutes. Candidates are awarded a rating from OIR-1 (Outstanding) to OIR-5 (Poor). Achieving OIR-1 or OIR-2 gives a huge weightage during Day 1 Stage-1 Screening.",
  topics: [
    {
      name: "1. Cube & Dice Tricks (Non-Verbal / Verbal)",
      rule: "Opposite faces can NEVER be adjacent to each other. If two faces are common in two dice positions, the remaining third faces are opposite to each other.",
      example: "Two positions of a dice show (1, 2, 3) and (1, 2, 5). What is opposite to 3?",
      solution: "Faces 1 and 2 are common. Therefore, 3 is directly opposite to 5.",
      shortcut: "Look for 2 common numbers across dice views to find the 3rd opposite pair instantly."
    },
    {
      name: "2. Coding - Decoding Shortcuts",
      rule: "Memorize letter positions using EJOTY (E=5, J=10, O=15, T=20, Y=25) and reverse pairs (A-Z, B-Y, C-X, D-W, E-V, etc.).",
      example: "If NAVY is coded as OBWZ, how is SHIP coded?",
      solution: "N+1=O, A+1=B, V+1=W, Y+1=Z. Applying +1 to SHIP: S+1=T, H+1=I, I+1=J, P+1=Q -> TJQ.",
      shortcut: "Write down letter numbers quickly (S=19, H=8, I=9, P=16) to spot addition/subtraction series."
    },
    {
      name: "3. Blood Relations Family Tree Method",
      rule: "Use (+) for Males, (-) for Females, (=) for Spouse, and vertical lines for Generations.",
      example: "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is the girl related to Rohit?",
      solution: "Grandfather's only son = Rohit's father. Daughter of Rohit's father = Rohit's sister.",
      shortcut: "Break the sentence backwards starting from 'my'."
    },
    {
      name: "4. Syllogism (Venn Diagram Method)",
      rule: "Draw overlapping circles for 'Some' and concentric circles for 'All'. 'No' means completely disjoint circles.",
      example: "Statements: All Sailors are Brave. Some Brave men are Engineers. Conclusion: Are some Sailors Engineers?",
      solution: "The circle for Engineers may or may not overlap Sailors. Hence conclusion does not strictly follow.",
      shortcut: "Unless a relation is explicitly stated or unavoidable in all diagrams, it cannot be assumed true."
    },
    {
      name: "5. Non-Verbal Figure Series & Mirror Images",
      rule: "In Mirror Images, Left becomes Right and Right becomes Left. Top and Bottom remain UNCHANGED.",
      example: "Figure rotation pattern: Symbol rotates 45 degrees clockwise each step.",
      solution: "Next figure must be at 45 x 4 = 180 degrees from start position.",
      shortcut: "Track one single unique feature (like a dot or arrow head) across figures to eliminate wrong options instantly."
    }
  ],
  solvedQuestions: [
    {
      id: 1,
      type: "Verbal - Coding",
      question: "In a certain code, 'DEFENCE' is written as 'EDEFDED'. How is 'OFFICER' written in that code?",
      options: ["PEGHBDQ", "NEEHBDQ", "PEGHBDS", "NEEJCFS"],
      answer: "NEEHBDQ",
      explanation: "Pattern: Alternate letters are shifted -1 and +0 or -1. D(-1)=C... Let's trace D->E (+1), E->D (-1), F->E (-1). Applying -1/+1 pattern gives NEEHBDQ."
    },
    {
      id: 2,
      type: "Verbal - Direction Sense",
      question: "A candidate walks 10m North, turns Right and walks 15m, then turns Right and walks 10m. How far and in which direction is he from the starting point?",
      options: ["15m East", "15m West", "10m East", "25m East"],
      answer: "15m East",
      explanation: "Walking 10m North and 10m South cancels the vertical movement. He is 15m East of starting point."
    },
    {
      id: 3,
      type: "Non-Verbal - Dice",
      question: "A standard dice is thrown. If 6 is at the bottom, what number will be at the top?",
      options: ["1", "2", "3", "5"],
      answer: "1",
      explanation: "In a standard dice, opposite faces always sum to 7. Opposite of 6 is (7 - 6) = 1."
    },
    {
      id: 4,
      type: "Verbal - Odd One Out",
      question: "Find the odd one out: INS Vikrant, INS Vikramaditya, INS Arihant, INS Kolkata",
      options: ["INS Vikrant", "INS Vikramaditya", "INS Arihant", "INS Kolkata"],
      answer: "INS Arihant",
      explanation: "INS Arihant is a nuclear ballistic missile submarine, whereas the others are surface warships/aircraft carriers."
    }
  ]
};

export const ppdtGuide = {
  title: "Picture Perception & Discussion Test (PPDT) Masterclass",
  overview: "PPDT is the core eliminating test of Day 1. Candidates view a hazy picture for 30 seconds, fill the perception box (Characters, Age, Gender, Mood), write a story in 4 minutes, give a 1-minute individual narration, and participate in a Group Discussion to form a Common Group Story.",
  boxRules: {
    title: "1. How to Mark the Perception Box Correctly",
    steps: [
      "Draw a small circle around the main character (Hero/Protagonist).",
      "Write details in format: [Gender][Age][Mood]. Example: M 22 + (Male, 22 years old, Positive mood).",
      "Gender codes: M = Male, F = Female, P = Person (if gender unclear).",
      "Mood codes: '+' for Positive, '-' for Negative, 'N' for Neutral.",
      "Write the main Action/Theme clearly in the top action box (e.g., 'Organizing a Flood Relief Camp')."
    ]
  },
  narrationBlueprint: {
    title: "2. The Perfect 1-Minute Individual Narration Blueprint",
    timeLimit: "60 Seconds Strict",
    structure: [
      { step: "Greeting & Theme (0-10s)", script: "'Good morning friends! From the picture shown, I have perceived 3 characters: 2 males and 1 female, all in a positive mood. The main character is Ramesh, aged 23. My story theme is Rural Literacy Drive.'" },
      { step: "Story Progression (10-45s)", script: "'Ramesh, a B.Tech student during his summer vacation, noticed children in his village lacking basic computer skills. He discussed with the village Sarpanch and secured space in the community hall...'" },
      { step: "Outcome & Conclusion (45-60s)", script: "'...He organized evening classes, taught 30 children basic digital literacy, and handed over the project to a local teacher. Thank you.'" }
    ],
    rules: [
      "Maintain eye contact with fellow candidates, NOT the assessors.",
      "Speak clearly without fillers ('uh', 'um', 'like'). Keep body upright with relaxed shoulders.",
      "Do NOT read directly from your sheet; speak naturally from memory."
    ]
  },
  gdStrategy: {
    title: "3. Group Discussion & Common Story Strategy",
    dos: [
      "Initiate the discussion ONLY if you have a clear, crisp point. Otherwise, listen and support early.",
      "Acknowledge others: 'I agree with candidate 14's point regarding the setting, and we can add...'",
      "Help the group move towards consensus if a 'fish market' (loud shouting) occurs.",
      "Propose nominating a soft-spoken candidate who contributed well to present the Common Group Story (CGS)."
    ],
    donts: [
      "Never shout or argue aggressively. SSB assesses social adaptability and group harmony.",
      "Don't look at the assessors during the group discussion.",
      "Don't rigidify your story—be flexible to incorporate the group's majority perception."
    ]
  },
  solvedScenarios: [
    {
      id: 1,
      image: "/ppdt1.png",
      title: "Scenario 1: Hazy Rural Setting with Two People & Document",
      perception: {
        characters: "2 Males (Main: M 23 +)",
        theme: "Implementing Drip Irrigation for Small Farmers"
      },
      story: `Rohan, a 23-year-old agricultural officer posted in Satara district, noticed local farmers suffering from erratic rainfall. He met with village head Suresh to propose modern drip irrigation systems eligible for government subsidies. Rohan prepared a simple blueprint, conducted a demonstration on 1 acre of land, and guided 15 farmers through the online application portal. Within two months, the system was installed, reducing water consumption by 40% and increasing crop yield. Rohan felt fulfilled seeing the farmers' progress.`,
      narrationScript: `Good morning friends. I perceived two male characters in positive mood. Main character is Rohan, 23, an Agricultural Officer. Theme is Drip Irrigation adoption. Rohan noticed water scarcity in Satara, organized a demonstration camp with Sarpanch Suresh, helped 15 farmers get government drip irrigation subsidies, leading to 40% water savings and higher yield. Thank you.`,
      cgsSummary: `The group agrees on 2 male characters in a rural setting working on agricultural modernizations through government scheme execution.`
    },
    {
      id: 2,
      image: "/ppdt2.png",
      title: "Scenario 2: Group of Young People near a Table / Computer",
      perception: {
        characters: "3 Males, 1 Female (Main: M 22 +)",
        theme: "Finalizing College Tech-Fest Management Portal"
      },
      story: `Aman, a 3rd-year Computer Science student, was appointed event coordinator for the annual college technical fest. Observing long queues during manual registrations last year, he assembled a team of 3 classmates to develop an automated web registration portal. Aman assigned frontend coding to Neha and backend database to Vikas, while he integrated payment gateway APIs. After testing for load handling, the portal went live 2 weeks before the fest, seamlessly handling 2,000+ registrations without errors.`,
      narrationScript: `Respected friends, I perceived 4 characters (3 males, 1 female) in positive mood. Main character is Aman, 22. Theme is Web Portal Development for Tech-Fest. Aman led his team to build an online registration system, divided coding modules, tested for load, and successfully registered 2000+ participants smoothly. Thank you.`,
      cgsSummary: `Group consensus: 4 college students collaborating on a technical project deliverable to streamline event management.`
    },
    {
      id: 3,
      image: "/ppdt3.png",
      title: "Scenario 3: One Person Standing near Water Body / Riverbank",
      perception: {
        characters: "1 Male (Main: M 21 +)",
        theme: "Establishing Riverbank Safety & Cleanliness Patrol"
      },
      story: `Vikas, a 21-year-old NCC cadet living near the Yamuna riverbank, observed frequent littering and unsafe swimming by local teenagers during monsoons. He drafted a plan and got approval from his NCC unit officer to set up a 'River Safety & Cleanliness Drive'. Vikas recruited 10 volunteers, placed warning signboards at deep-water zones, conducted weekend garbage collection, and alerted local authorities. His initiative prevented drowning incidents and kept the bank clean.`,
      narrationScript: `Friends, I perceived 1 male character, 21 years old, positive mood. Main character is Vikas, an NCC Cadet. Theme: Riverbank Safety & Environmental Drive. Vikas organized a volunteer team, installed warning signs at deep spots, conducted cleanliness drives, and ensured safety during monsoons. Thank you.`,
      cgsSummary: `Group consensus: A youth leader taking proactive steps for community safety and environmental preservation near a river body.`
    },
    {
      id: 4,
      image: "/ppdt4.png",
      title: "Scenario 4: Two Engineers Inspecting Machinery on Factory Floor",
      perception: {
        characters: "2 Males (Main: M 24 +)",
        theme: "Preventive Maintenance and Process Optimization"
      },
      story: `Karan, a 24-year-old mechanical engineer at a manufacturing plant, noticed recurring thermal spikes in the primary conveyor motor. Partnering with technician Rajesh, he conducted a vibration and thermal audit during lunch break. Karan identified a worn-out bearing, ordered an immediate replacement from stores, and recalibrated the lubrication schedule. His proactive action prevented a major line breakdown, saving 12 hours of production downtime.`,
      narrationScript: `Good morning friends. I perceived 2 male characters in positive mood. Main character is Karan, 24, a Mechanical Engineer. Theme: Factory Machinery Maintenance. Karan detected thermal anomalies in a conveyor motor, performed diagnostic audits with his technician, replaced a faulty bearing, and restored optimal plant operations. Thank you.`,
      cgsSummary: `Group consensus: Two technical professionals conducting equipment diagnostic checks to optimize workplace efficiency.`
    }
  ]
};
