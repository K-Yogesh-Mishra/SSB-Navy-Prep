export const master30DaysData = [
  // ------------------ WEEK 1: STAGE 1 SCREENING (DAYS 1 - 7) ------------------
  {
    day: 1,
    week: 1,
    title: "Day 1: OIR Dice & Cubes + PPDT Picture 1 Observation",
    focus: "Screening Foundations (OIR + PPDT)",
    task1Study: {
      title: "OIR Dice Rules & PPDT Perception Box Blueprint",
      durationMinutes: 20,
      theory: `1. OIR Dice Shortcut: Opposite faces can NEVER be adjacent. If two faces are common across two views (e.g. [1, 2, 4] and [1, 2, 5]), the remaining faces (4 and 5) are 100% opposite to each other.
2. PPDT Box Coding: Draw a circle around your Hero. Mark format: [Gender][Age][Mood]. Example: M 22 +. Mood codes: '+' (Positive), '-' (Negative), 'N' (Neutral).
3. Action Box: Write a clear 4-5 word theme (e.g. 'Organizing Rural Drip Irrigation Camp').`
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 600,
      oirQuestions: [
        { id: 101, question: "Two positions of a dice show (2, 3, 5) and (2, 3, 6). What is opposite to 5?", options: ["6", "1", "4", "3"], answer: "6", explanation: "2 and 3 are common faces. Hence, 5 is directly opposite to 6." },
        { id: 102, question: "In a standard dice, if 4 is at the top, what number is at the bottom?", options: ["3", "1", "2", "5"], answer: "3", explanation: "Standard dice opposite faces sum to 7. Opposite of 4 is 7 - 4 = 3." },
        { id: 103, question: "If 'NAVY' is coded as 'OBWZ', how is 'SHIP' coded?", options: ["TJQ", "TJQP", "TJQQ", "TJQ"], answer: "TJQ", explanation: "+1 shift: S+1=T, H+1=I, I+1=J, P+1=Q -> TJQ." },
        { id: 104, question: "A solid 4cm cube is cut into 1cm unit cubes. How many small cubes have 3 faces painted red?", options: ["8", "12", "24", "16"], answer: "8", explanation: "3-faces painted cubes are always the 8 corner vertices." },
        { id: 105, question: "Find the odd one out: Submarine, Destroyer, Frigate, Tank", options: ["Tank", "Submarine", "Destroyer", "Frigate"], answer: "Tank", explanation: "Tank is a land warfare vehicle; others are naval vessels." }
      ],
      ppdtPicture: { image: "/ppdt1.png", title: "PPDT Picture 1: Rural Setting near Wooden Bridge", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 2,
    week: 1,
    title: "Day 2: OIR Verbal Coding (EJOTY) + PPDT Story Structure",
    focus: "OIR Speed & PPDT 4-Line Blueprint",
    task1Study: {
      title: "EJOTY Letter Numbers & 4-Part Story Structure",
      durationMinutes: 20,
      theory: `1. EJOTY Formula: E=5, J=10, O=15, T=20, Y=25. Use reverse pairs (A-Z, B-Y, C-X, D-W) to solve coding series in < 15 seconds.
2. 4-Part Story Structure:
   - Line 1: Context (Hero name, age 22, occupation).
   - Line 2: Trigger (What immediate problem or opportunity arose?).
   - Line 3-6: Action Plan (Practical step-by-step actions taken by hero & team).
   - Line 7-8: Outcome (Positive result & community benefit).`
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 600,
      oirQuestions: [
        { id: 201, question: "If E=5 and HOTEL=12, what is the value of LAMB?", options: ["7", "14", "28", "10"], answer: "7", explanation: "Sum of positions / number of letters. H(8)+O(15)+T(20)+E(5)+L(12)=60/5=12. LAMB: L(12)+A(1)+M(13)+B(2)=28/4=7." },
        { id: 202, question: "In a code language, 'SAILOR' is written as 'TBJMPS'. How is 'OFFICER' written?", options: ["PGGJDFS", "NEEHBDQ", "PEGHBDS", "QGGJDFS"], answer: "PGGJDFS", explanation: "+1 shift for every letter." },
        { id: 203, question: "Find missing number in series: 2, 6, 12, 20, 30, ?", options: ["42", "40", "36", "48"], answer: "42", explanation: "+4, +6, +8, +10, +12 -> 30 + 12 = 42." }
      ],
      ppdtPicture: { image: "/ppdt2.png", title: "PPDT Picture 2: Group of Students in Study Room", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 3,
    week: 1,
    title: "Day 3: SSB Grand All-In-One Mock Test (OIR + PPDT + TAT + WAT + SRT + PI)",
    focus: "Stage 1 & Stage 2 Integrated Mastery (Comprehensive Assessor Simulation)",
    task1Study: {
      title: "Comprehensive SSB Test Battery Execution & Officer Qualities Audit",
      durationMinutes: 25,
      theory: `1. OIR Strategy: Attempt all questions within 15-20 seconds each. Skip tough questions and return later.
2. PPDT & TAT Blueprint:
   - Identify Hero (Age, Sex, Mood). Hero must take proactive, logical, ground-level action.
   - 4-Part Structure: Context -> Trigger -> Action Plan (Step 1 to 4) -> Positive Community Outcome.
   - Blank Slide (TAT): Frame an original story reflecting personal leadership, initiative, and responsibility.
3. WAT Rule: Write short, active, non-moralizing 1-line responses (No 'should', 'must', or 'always').
4. SRT Rule: Action + Resource + Result. Immediate practical response without fleeing or escalating panic.
5. PI Rule: Honest, confident, structured response highlighting authentic self-awareness and naval commitment.`
    },
    task2Test: {
      type: "COMBINED_MEGA_BATTERY",
      timeLimitSeconds: 1800,
      oirQuestions: [
        { id: 301, question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?", options: ["Mother", "Sister", "Aunt", "Grandmother"], answer: "Mother", explanation: "Only daughter of woman's mother = the woman herself. She is his mother." },
        { id: 302, question: "A is B's brother. C is A's father. D is C's sister. E is D's mother. How is B related to E?", options: ["Granddaughter/Grandson", "Daughter", "Mother", "Aunt"], answer: "Granddaughter/Grandson", explanation: "E is C's mother. C is B's father. So B is E's grandchild." },
        { id: 303, question: "Two positions of a dice show (1, 4, 5) and (1, 4, 6). What number is opposite to 5?", options: ["6", "2", "3", "4"], answer: "6", explanation: "1 and 4 are common faces across both views. Hence 5 is directly opposite to 6." },
        { id: 304, question: "In a certain code, 'NAVY' is written as 'OBWZ'. How is 'SHIP' written?", options: ["TJQP", "TJQQ", "TIQO", "TJQP"], answer: "TJQP", explanation: "+1 letter shift: S+1=T, H+1=I, I+1=J, P+1=Q -> TJQP." },
        { id: 305, question: "What is the angle between the hour hand and minute hand of a clock at 3:30?", options: ["75°", "90°", "105°", "60°"], answer: "75°", explanation: "Formula: |30H - 5.5M| = |30(3) - 5.5(30)| = |90 - 165| = 75°." },
        { id: 306, question: "Statements: All Captains are Leaders. Some Leaders are Sailors. Conclusion: Are some Captains Sailors?", options: ["Does not strictly follow", "Follows definitely", "Either follows", "None"], answer: "Does not strictly follow", explanation: "Sailors circle may or may not overlap Captains circle." },
        { id: 307, question: "A solid 3cm cube is painted red on all sides and cut into 1cm cubes. How many small cubes have zero faces painted?", options: ["1", "8", "6", "12"], answer: "1", explanation: "Inner unpainted cubes = (n-2)³ = (3-2)³ = 1." },
        { id: 308, question: "Find missing number in series: 5, 11, 23, 47, ?", options: ["95", "92", "88", "96"], answer: "95", explanation: "Pattern: x2 + 1 -> 47*2 + 1 = 95." },
        { id: 309, question: "Rohan walks 20m North, turns Right 15m, turns Right 20m. How far and in which direction is he from the starting point?", options: ["15m East", "15m West", "20m East", "35m South"], answer: "15m East", explanation: "North 20m and South 20m cancel out. 15m East remains." },
        { id: 10, question: "Find the odd one out: Destroyer, Frigate, Submarine, Fighter Jet", options: ["Fighter Jet", "Destroyer", "Frigate", "Submarine"], answer: "Fighter Jet", explanation: "Fighter Jet is an aircraft; others are naval vessels." }
      ],
      ppdtPicture: { image: "/ppdt3.png", title: "PPDT Picture: River Bank Safety & Inspection", viewTimeSeconds: 30, writeTimeSeconds: 240 },
      tatPictures: [
        { id: 1, image: "/ppdt11.png", title: "TAT Picture 1: Night Rescue & Search Operation", viewTimeSeconds: 30, writeTimeSeconds: 240 },
        { id: 2, image: "/ppdt12.png", title: "TAT Picture 2: Technical Innovation Team Discussion", viewTimeSeconds: 30, writeTimeSeconds: 240 },
        { id: 3, image: null, title: "TAT Picture 3 (Blank Slide): Write Your Original Hero Story", viewTimeSeconds: 0, writeTimeSeconds: 240 }
      ],
      watWords: ["Leader", "Danger", "War", "Failure", "Bomb", "Mistake", "Attack", "System", "Panic", "Duty"],
      srtScenarios: [
        "Scenario 1: While travelling by train, he noticed thick smoke coming out of the adjacent passenger coach. He...",
        "Scenario 2: He was appointed leader for a crucial college project, but two key team members had a severe quarrel on submission eve. He...",
        "Scenario 3: During a night trek in heavy rain, one member of his group slipped and injured his ankle severely. He...",
        "Scenario 4: His commander gave him an urgent operational task, but his key subordinate expressed fear of the dangerous terrain. He..."
      ],
      piQuestions: [
        "Q1 (Rapid-Fire): Introduce yourself covering your educational background, achievements, hobbies, and family background.",
        "Q2 (Naval Motivation): Why do you want to join the Indian Navy as a Short Service Commission Officer? What backup plans do you have if you get screened out?",
        "Q3 (Crisis & Conflict): Describe a situation where you faced severe failure or group disagreement, and how you logically resolved it."
      ]
    }
  },
  {
    day: 4,
    week: 1,
    title: "Day 4: OIR Syllogisms + Group Discussion (GD) Tactics",
    focus: "Logical Venn Diagrams & Fish-Market Control",
    task1Study: {
      title: "Syllogism Logic & GD Fish-Market Neutralizer",
      durationMinutes: 20,
      theory: `1. Syllogism Rule: Draw overlapping Venn circles. If a conclusion is not true in ALL possible Venn configurations, it does NOT follow.
2. GD Fish-Market Neutralizer: When candidates shout, sit calm, raise your hand politely and say: 'Friends, we are wasting time by speaking together. Let us listen one by one so we can reach a Common Group Story.'`
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 600,
      oirQuestions: [
        { id: 401, question: "Statements: All Sailors are Brave. Some Brave men are Engineers. Conclusion: Are some Sailors Engineers?", options: ["Does not strictly follow", "Follows definitely", "Either follows", "None"], answer: "Does not strictly follow", explanation: "Engineers circle may or may not overlap Sailors circle." },
        { id: 402, question: "Statements: All Ships are Vessels. All Vessels Float. Conclusion: Do all Ships Float?", options: ["Follows definitely", "Does not follow", "Partially follows", "None"], answer: "Follows definitely", explanation: "Concentric circles: Ships inside Vessels inside Floating objects." }
      ],
      ppdtPicture: { image: "/ppdt4.png", title: "PPDT Picture 4: Factory Floor Equipment Diagnostic", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 5,
    week: 1,
    title: "Day 5: Non-Verbal Rotation & PPDT Flood Rescue Test",
    focus: "Non-Verbal Speed & Flood Relief Perception",
    task1Study: {
      title: "Pattern Rotation Tricks & Flood Rescue Theme",
      durationMinutes: 20,
      theory: `1. Track one unique feature (like a dot or arrow head) across steps. If it rotates 45° clockwise, after 4 steps it will be at 180°.
2. Flood Relief PPDT: Hero assists locals, organizes safe evacuation, alerts village panchayat & local disaster team.`
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 600,
      oirQuestions: [
        { id: 501, question: "A symbol rotates 90° counter-clockwise in each step. After 3 steps, total rotation is?", options: ["270° CCW (90° CW)", "180°", "360°", "45°"], answer: "270° CCW (90° CW)", explanation: "3 * 90° = 270° counter-clockwise, which equals 90° clockwise." }
      ],
      ppdtPicture: { image: "/ppdt5.png", title: "PPDT Picture 5: Flood Relief & Water Rescue Action", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 6,
    week: 1,
    title: "Day 6: Stage 1 Full Screening Mock Simulation 1",
    focus: "Real-Exam Timed Practice (OIR + PPDT)",
    task1Study: {
      title: "Full Mock Checklist",
      durationMinutes: 10,
      theory: "Complete OIR test in 15 minutes followed by PPDT picture observation (30s) and story writing (4 minutes) without breaks."
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 900,
      oirQuestions: [
        { id: 601, question: "If 6 is opposite 1 on a dice, what is opposite 2 if 3 is opposite 5?", options: ["4", "1", "6", "5"], answer: "4", explanation: "Remaining pair is 2 and 4." },
        { id: 602, question: "Rohit walks 10m North, turns Right 15m, turns Right 10m. Distance from start?", options: ["15m East", "10m East", "25m East", "15m West"], answer: "15m East", explanation: "North and South cancel out. 15m East remains." }
      ],
      ppdtPicture: { image: "/ppdt6.png", title: "PPDT Picture 6: Village Renewable Solar Energy Project", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 7,
    week: 1,
    title: "Day 7: Stage 1 Full Screening Mock Simulation 2 & AI Evaluation",
    focus: "Final Stage 1 Readiness Audit",
    task1Study: {
      title: "Screening Readiness Strategy",
      durationMinutes: 10,
      theory: "Review your OIR score and submit your story to Gemini 3.6 Flash AI for instant recommendation assessment."
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 900,
      oirQuestions: [
        { id: 701, question: "Find odd one: INS Vikramaditya, INS Vikrant, INS Viraat, Tejas", options: ["Tejas", "INS Vikrant", "INS Viraat", "INS Vikramaditya"], answer: "Tejas", explanation: "Tejas is a fighter aircraft; others are aircraft carriers." }
      ],
      ppdtPicture: { image: "/ppdt7.png", title: "PPDT Picture 7: Mountain Expedition & Trail Navigation", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },

  // ------------------ WEEK 2: STAGE 2 PSYCHOLOGY (DAYS 8 - 14) ------------------
  {
    day: 8,
    week: 2,
    title: "Day 8: Word Association Test (WAT) Set 1 & Daily PPDT Practice",
    focus: "Subconscious Personality Projections",
    task1Study: {
      title: "WAT 3 Sentence Types & Avoidance Rules",
      durationMinutes: 20,
      theory: `1. Sentence Types: Action-Oriented (Best: 'Leader -> Inspires teams by example'), Fact-Based ('Dark -> Stars shine in dark'), Quality-Focused ('Difficult -> Challenges refine capabilities').
2. Avoid: Preachiness ('should/must'), dictionary definitions, or forced heroism.`
    },
    task2Test: {
      type: "WAT",
      timeLimitSeconds: 300,
      watWords: ["Failure", "Danger", "Leader", "Snake", "Lover", "Mistake", "War", "Lonely", "Fear", "Bomb", "Lax", "Compel", "Stolen", "Tired", "Death", "Disagree", "Delay", "Attack", "Hijack", "Reject"],
      ppdtPicture: { image: "/ppdt8.png", title: "PPDT Daily Practice 8: Sports First-Aid & Injury Management", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 9,
    week: 2,
    title: "Day 9: Thematic Apperception Test (TAT) Set 1 & Sports First-Aid Theme",
    focus: "Story Building & Hero OLQs",
    task1Study: {
      title: "TAT Story Building & Hero Projection",
      durationMinutes: 20,
      theory: "Make the Hero your own age/gender. Show practical step-by-step actions and a positive logical outcome. Address the main theme visible."
    },
    task2Test: {
      type: "TAT",
      timeLimitSeconds: 270,
      tatPicture: { image: "/ppdt8.png", title: "TAT Picture 1: Sports First-Aid & Injury Management", viewTimeSeconds: 30, writeTimeSeconds: 240 },
      ppdtPicture: { image: "/ppdt8.png", title: "PPDT Picture 8: Sports Field First Aid", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 10,
    week: 2,
    title: "Day 10: Situation Reaction Test (SRT) Set 1 & Daily PPDT Practice",
    focus: "Speed of Decision & Practical Sense",
    task1Study: {
      title: "SRT 3-Step Reaction Formula",
      durationMinutes: 20,
      theory: "Write telegraphic action steps: [Immediate Action] + [Resource Mobilized] + [Final Solution]. Example: 'Pulled emergency chain, alerted guard, used fire extinguisher, evacuated passengers safely.'"
    },
    task2Test: {
      type: "SRT",
      timeLimitSeconds: 600,
      srtScenarios: [
        "While travelling in a train at night, he noticed smoke coming from adjacent compartment.",
        "His captain got injured 1 hour before the final inter-college football match.",
        "He saw an injured boy bleeding on the road while going for an important job interview.",
        "His colleague stole credit for a project he worked hard on for three months.",
        "While trekking in a remote forest, his group lost their compass and map."
      ],
      ppdtPicture: { image: "/ppdt9.png", title: "PPDT Daily Practice 9: Naval Warship Lookout & Surveillance", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 11,
    week: 2,
    title: "Day 11: Self Description Test (SDT) Drafting & Daily PPDT Practice",
    focus: "Self-Awareness & Consistency",
    task1Study: {
      title: "SDT 5 Paragraph Structure",
      durationMinutes: 20,
      theory: "1. Parents' Opinion  2. Teachers'/Employers' Opinion  3. Friends'/Peers' Opinion  4. Own Opinion  5. Aims & Improvement Goals."
    },
    task2Test: {
      type: "SDT",
      timeLimitSeconds: 900,
      sdtPrompts: ["Parents' View", "Teachers' View", "Friends' View", "Self View", "Aims & Goals"],
      ppdtPicture: { image: "/ppdt10.png", title: "PPDT Daily Practice 10: Archaeology Site Survey & Restoration", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 12,
    week: 2,
    title: "Day 12: WAT Flash Drill Set 2 & Daily PPDT Practice",
    focus: "Flashing Timed Reaction",
    task1Study: {
      title: "Overcoming Negative Words in WAT",
      durationMinutes: 15,
      theory: "Treat negative words neutrally or overcome them with action (e.g. 'Fail -> Analysis of mistakes leads to success')."
    },
    task2Test: {
      type: "WAT",
      timeLimitSeconds: 300,
      watWords: ["Climb", "Dark", "Guilt", "Insult", "Wound", "Blood", "Enemy", "Fire", "Panic", "Risk", "System", "Team", "Duty", "Honesty", "Courage", "Speed", "Audit", "Plan", "Target", "Victory"],
      ppdtPicture: { image: "/ppdt11.png", title: "PPDT Daily Practice 11: Village Guidance & Navigation", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 13,
    week: 2,
    title: "Day 13: TAT Picture Simulation Set 2 & Daily PPDT Practice",
    focus: "Academic & Professional Excellence Theme",
    task1Study: {
      title: "Avoiding Superhuman Traits",
      durationMinutes: 15,
      theory: "Hero should delegate tasks and utilize team members effectively rather than doing everything alone."
    },
    task2Test: {
      type: "TAT",
      timeLimitSeconds: 270,
      tatPicture: { image: "/tat2.png", title: "TAT Picture 2: Student Robotics Project", viewTimeSeconds: 30, writeTimeSeconds: 240 },
      ppdtPicture: { image: "/ppdt12.png", title: "PPDT Daily Practice 12: Public Speaking & Auditorium Presentation", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 14,
    week: 2,
    title: "Day 14: Full Stage 2 Psychology Battery Mock & AI Evaluation",
    focus: "Full Stage 2 Battery Endurance",
    task1Study: {
      title: "Psych Battery Endurance Checklist",
      durationMinutes: 10,
      theory: "Complete WAT + TAT + SRT sequentially to simulate real Day 2 testing at SSB."
    },
    task2Test: {
      type: "PSYCH_FULL",
      timeLimitSeconds: 900,
      watWords: ["Leader", "Danger", "System", "Duty", "Fear"],
      tatPicture: { image: "/tat1.png", title: "TAT Battery Picture", viewTimeSeconds: 30, writeTimeSeconds: 240 },
      srtScenarios: ["Train smoke emergency", "Injured player replacement", "Lost in trekking forest"],
      ppdtPicture: { image: "/ppdt13.png", title: "PPDT Daily Practice 13: Electrical Infrastructure Repair", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },

  // ------------------ WEEK 3: PERSONAL INTERVIEW & NAVY (DAYS 15 - 21) ------------------
  {
    day: 15,
    week: 3,
    title: "Day 15: PIQ Form Analysis & Daily PPDT Practice",
    focus: "Personal Information Questionnaire (PIQ)",
    task1Study: {
      title: "PIQ Form Verification & Accuracy",
      durationMinutes: 20,
      theory: "Your PIQ form is the foundation of your Personal Interview. Ensure 100% accuracy on marks, family income, positions of responsibility, and hobbies."
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 600,
      piQuestions: ["State your exact academic percentages in 10th, 12th, and B.Tech/Graduation.", "What are your official positions of responsibility held in school/college?", "Define your hobbies and sports played with level of participation."],
      ppdtPicture: { image: "/ppdt14.png", title: "PPDT Daily Practice 14: Food Grain Relief Operations", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 16,
    week: 3,
    title: "Day 16: Rapid-Fire Question Sequence 1 & Daily PPDT Practice",
    focus: "Memory & Sequential Answering",
    task1Study: {
      title: "Handling 5-in-1 Rapid Fire Barrages",
      durationMinutes: 20,
      theory: "Listen attentively without interrupting. Structurally answer: 'Sir, regarding my marks... regarding my teachers... regarding my subjects...'"
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 600,
      piQuestions: [
        "Rapid-Fire Barrage 1: 1. Marks from 10th to Graduation? 2. Reasons for fluctuation? 3. Favorite & least favorite teacher? 4. Favorite subject? 5. Sports achievements?"
      ],
      ppdtPicture: { image: "/ppdt15.png", title: "PPDT Daily Practice 15: Tactical Command Map Planning", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 17,
    week: 3,
    title: "Day 17: Rapid-Fire Question Sequence 2 & Daily PPDT Practice",
    focus: "Family Dynamics & Maturity",
    task1Study: {
      title: "Honesty in Family & Financial Queries",
      durationMinutes: 20,
      theory: "Be genuine about family income, chores, and minor disagreements. Show respectful resolution."
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 600,
      piQuestions: [
        "Rapid-Fire Barrage 2: 1. Family occupations & income? 2. Whom are you closest to? 3. How do you manage personal pocket money? 4. Disagreements with father and how resolved? 5. Daily household contributions?"
      ],
      ppdtPicture: { image: "/ppdt1.png", title: "PPDT Daily Practice 16: Bridge Engineering & Inspection", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 18,
    week: 3,
    title: "Day 18: Indian Navy Awareness & Daily PPDT Practice",
    focus: "Naval Technical & Command Knowledge",
    task1Study: {
      title: "Indian Navy Commands, Ships & Aircraft Carriers",
      durationMinutes: 20,
      theory: `1. Commands: Western (Mumbai), Eastern (Visakhapatnam), Southern (Kochi).
2. Aircraft Carriers: INS Vikrant, INS Vikramaditya.
3. Submarines: Kalvari-class (Scorpene), Arihant-class (SSBN).`
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 600,
      piQuestions: [
        "Where are the 3 Naval Commands located and who heads them?",
        "Name 3 frontline destroyers and 2 aircraft carriers of the Indian Navy.",
        "Why do you want to join the Executive / Technical branch of the Navy?"
      ],
      ppdtPicture: { image: "/ppdt2.png", title: "PPDT Daily Practice 17: Academic Group Discussion", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 19,
    week: 3,
    title: "Day 19: 3-Minute Lecturette Speaking Drill & Daily PPDT Practice",
    focus: "Spoken Fluency & Defense Current Affairs",
    task1Study: {
      title: "Lecturette 4-Card Choice & Structure",
      durationMinutes: 20,
      theory: "Structure: Introduction (30s) -> Body Points (2 mins) -> Conclusion (30s). Avoid long pauses."
    },
    task2Test: {
      type: "LECTURETTE",
      timeLimitSeconds: 180,
      topics: ["India-China Maritime Relations", "Role of AI in Defense", "Renewable Energy Options", "Agnipath Scheme"],
      ppdtPicture: { image: "/ppdt3.png", title: "PPDT Daily Practice 18: Riverbank Safety Management", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 20,
    week: 3,
    title: "Day 20: Situational Interview Questions & Daily PPDT Practice",
    focus: "Emotional Balance & Career Backup Plan",
    task1Study: {
      title: "Answering 'What if you get rejected today?'",
      durationMinutes: 20,
      theory: "Show confidence, state that you will analyze feedback and re-appear, while continuing your professional studies/job."
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 600,
      piQuestions: [
        "What will you do if you are not recommended in this SSB attempt?",
        "What are your 3 genuine weaknesses and how are you working to improve them?",
        "Tell me about a time you faced a major setback in college/work."
      ],
      ppdtPicture: { image: "/ppdt4.png", title: "PPDT Daily Practice 19: Factory Equipment Maintenance", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 21,
    week: 3,
    title: "Day 21: Full Personal Interview Simulation & Daily PPDT Practice",
    focus: "Full PI Officer Mock",
    task1Study: {
      title: "Interview Posture & Voice Modulation",
      durationMinutes: 10,
      theory: "Sit erect, hands on thighs, maintain pleasant facial expression, answer directly without beating around the bush."
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 900,
      piQuestions: [
        "Why Navy over corporate jobs?",
        "Explain your academic performance from 10th to Graduation.",
        "How do you resolve conflicts with team members under pressure?"
      ],
      ppdtPicture: { image: "/ppdt5.png", title: "PPDT Daily Practice 20: Disaster Flood Relief Action", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },

  // ------------------ WEEK 4: GTO TASKS & FULL MOCKS (DAYS 22 - 30) ------------------
  {
    day: 22,
    week: 4,
    title: "Day 22: GTO Group Discussion Tactics & Daily PPDT Practice",
    focus: "Group Dynamics & Substantive Contributions",
    task1Study: {
      title: "GTO GD Scoring Factors",
      durationMinutes: 20,
      theory: "GTO assesses group influence, logical reasoning, and cooperative spirit. Give 3-4 solid facts without over-dominating."
    },
    task2Test: {
      type: "GTO_DRILL",
      timeLimitSeconds: 600,
      gtoTopics: ["Self-Reliance in Defense Manufacturing (Atmanirbhar Bharat)", "Impact of Social Media on Youth Discipline", "Cyber Warfare Readiness"],
      ppdtPicture: { image: "/ppdt6.png", title: "PPDT Daily Practice 21: Solar Energy Adoption Drive", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 23,
    week: 4,
    title: "Day 23: GTO Lecturette 10-Topic Marathon & Daily PPDT Practice",
    focus: "3-Minute Uninterrupted Delivery",
    task1Study: {
      title: "Lecturette Topic Selection Strategy",
      durationMinutes: 15,
      theory: "Choose a topic you have 3 solid facts on. Maintain steady pace and clear eye contact with all group members."
    },
    task2Test: {
      type: "LECTURETTE",
      timeLimitSeconds: 180,
      topics: ["Indo-Pacific Security", "Space Technology in Warfare", "Youth and Nation Building", "Disaster Management in India"],
      ppdtPicture: { image: "/ppdt7.png", title: "PPDT Daily Practice 22: Mountain Rescue & Trekking Safety", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 24,
    week: 4,
    title: "Day 24: PGT & HGT Obstacle Rules & Daily PPDT Practice",
    focus: "Rope, Plank (Fatta), Bali & Load Rules",
    task1Study: {
      title: "PGT 4 Main Rules",
      durationMinutes: 20,
      theory: `1. Rule of Color: White (Free for all), Red (Out of bounds for all), Yellow (Bound for human, out of bounds for helper material).
2. Rule of Out of Bounds: Ground between start and finish line is out of bounds.
3. Rule of Rigidity: Two rigid materials cannot be tied together rigidly.
4. Rule of Distance: Cannot jump distance > 4 feet with load.`
    },
    task2Test: {
      type: "GTO_DRILL",
      timeLimitSeconds: 600,
      gtoTopics: ["Explain how you will bridge a 6-foot gap using a 4-foot plank and rope.", "What is Cantilever principle in PGT bridge construction?"],
      ppdtPicture: { image: "/ppdt8.png", title: "PPDT Daily Practice 23: Sports First-Aid", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 25,
    week: 4,
    title: "Day 25: Individual Obstacles Strategy & Daily PPDT Practice",
    focus: "Stamina & Risk Assessment",
    task1Study: {
      title: "10 Obstacles Scoring & Sequence",
      durationMinutes: 20,
      theory: "10 obstacles carrying 1 to 10 points (Total 55 points). Complete easy obstacles first to secure minimum 35+ points in 3 minutes."
    },
    task2Test: {
      type: "GTO_DRILL",
      timeLimitSeconds: 180,
      gtoTopics: ["High Screen Jump (1 pt)", "Long Jump (2 pt)", "Zig-Zag Balance (3 pt)", "Command Screen (4 pt)", "Tarzan Leap (10 pt)"],
      ppdtPicture: { image: "/ppdt9.png", title: "PPDT Daily Practice 24: Warship Lookout Duty", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 26,
    week: 4,
    title: "Day 26: Command Task & FGT Tactics & Daily PPDT Practice",
    focus: "Subordinate Selection & Tactical Execution",
    task1Study: {
      title: "Command Task Leadership Strategy",
      durationMinutes: 20,
      theory: "Choose 2 subordinates based on their physical capability and cooperative nature. Give clear instructions, execute calmly, and don't do all work yourself."
    },
    task2Test: {
      type: "GTO_DRILL",
      timeLimitSeconds: 600,
      gtoTopics: ["Command Task Scenario: Transporting ammo box across 8-ft painted structure", "FGT Teamwork Consolidation"],
      ppdtPicture: { image: "/ppdt10.png", title: "PPDT Daily Practice 25: Archaeological Survey", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 27,
    week: 4,
    title: "Day 27: Full SSB Grand Mock Day 1 (Naval Surveillance PPDT)",
    focus: "Full Day 1 Simulation",
    task1Study: {
      title: "Grand Mock Screening Checklist",
      durationMinutes: 10,
      theory: "Execute 40 OIR Questions + PPDT Picture perception & writing in continuous sequence."
    },
    task2Test: {
      type: "MIXED_SCREENING",
      timeLimitSeconds: 900,
      oirQuestions: [{ id: 2701, question: "If 'NAVY' = 48, what is 'COAST'?", options: ["54", "50", "60", "52"], answer: "54", explanation: "Sum of letters C(3)+O(15)+A(1)+S(19)+T(20) = 58... 54." }],
      ppdtPicture: { image: "/ppdt9.png", title: "PPDT Picture 9: Naval Warship Lookout & Surveillance", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 28,
    week: 4,
    title: "Day 28: Full SSB Grand Mock Day 2 (Archaeological Heritage TAT)",
    focus: "Full Psych Battery Endurance",
    task1Study: {
      title: "Grand Mock Psych Battery Checklist",
      durationMinutes: 10,
      theory: "Execute 20 WAT words + 1 TAT picture + 5 SRT scenarios in single sitting."
    },
    task2Test: {
      type: "PSYCH_FULL",
      timeLimitSeconds: 900,
      watWords: ["Officer", "Courage", "Duty", "Leader", "Success"],
      tatPicture: { image: "/ppdt10.png", title: "TAT Picture 10: Archaeology Site Survey & Restoration", viewTimeSeconds: 30, writeTimeSeconds: 240 },
      srtScenarios: ["Smoke in train", "Captain injured before match", "Lost in trekking forest"],
      ppdtPicture: { image: "/ppdt10.png", title: "PPDT Daily Practice 28: Archaeological Site Restoration", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 29,
    week: 4,
    title: "Day 29: Full SSB Grand Mock Day 3 & 4 & Daily PPDT Practice",
    focus: "Interview & GTO Final Drill",
    task1Study: {
      title: "GTO & PI Polish",
      durationMinutes: 10,
      theory: "Review PI rapid fire questions and lecturette topics."
    },
    task2Test: {
      type: "PI_DRILL",
      timeLimitSeconds: 900,
      piQuestions: ["Why Navy over corporate jobs?", "Academic fluctuation reasons", "Key strengths & weaknesses"],
      ppdtPicture: { image: "/ppdt14.png", title: "PPDT Daily Practice 29: Disaster Relief Food Distribution", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  },
  {
    day: 30,
    week: 4,
    title: "Day 30: Final Board Conference Simulation & Daily PPDT Practice",
    focus: "Day 5 Board Conference & Final Recommendation",
    task1Study: {
      title: "The SSB Conference Procedure",
      durationMinutes: 15,
      theory: "At the Conference, all assessors (President, Psychologists, GTOs, IO) assemble in uniform. You enter, sit straight, answer any brief confirmation question calmly, and smile."
    },
    task2Test: {
      type: "CONFERENCE_SIMULATION",
      timeLimitSeconds: 300,
      conferenceQuestions: [
        "How was your stay at the SSB Board?",
        "Did you get enough opportunity to showcase your true potential?",
        "Any suggestions for improvement in mess or boarding facilities?"
      ],
      ppdtPicture: { image: "/ppdt15.png", title: "PPDT Daily Practice 30: Strategic Defense Planning", viewTimeSeconds: 30, writeTimeSeconds: 240 }
    }
  }
];
