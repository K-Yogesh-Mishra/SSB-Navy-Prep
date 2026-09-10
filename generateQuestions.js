import fs from 'fs';

const oirTemplates = [
  { q: "If A = 1, B = 2, C = 3, what is the value of '{word}'?", type: "coding" },
  { q: "Find the missing number in the series: {n1}, {n2}, {n3}, {n4}, ?", type: "series" },
  { q: "Find the odd one out: {opts}", type: "odd" },
  { q: "If {a} * {b} = {ans1} and {c} * {d} = {ans2}, then {e} * {f} = ?", type: "math" }
];

const watWords = [
  "SUCCESS", "DEFEAT", "RISK", "COURAGE", "FEAR", "LEADER", "TEAM", "PROBLEM", "TIME", "WORK",
  "FAILURE", "HONESTY", "LOYALTY", "NATION", "DUTY", "FRIEND", "ENEMY", "WAR", "PEACE", "ANGER",
  "LOVE", "HATE", "DISCIPLINE", "RESPONSIBILITY", "INITIATIVE", "COOPERATION", "DECISION", "STRESS", "CHALLENGE", "VICTORY",
  "NATURE", "SOCIETY", "PARENTS", "MONEY", "POWER", "WEALTH", "HEALTH", "EDUCATION", "WISDOM", "YOUTH",
  "GOAL", "AMBITION", "STRUGGLE", "HARDWORK", "LUCK", "FATE", "DESTINY", "CHARACTER", "MORALS", "ETHICS",
  "RULES", "LAW", "JUSTICE", "CRIME", "PUNISHMENT", "REWARD", "PRAISE", "CRITICISM", "MISTAKE", "LEARNING",
  "CHANGE", "TRADITION", "MODERN", "TECHNOLOGY", "SCIENCE", "ART", "CULTURE", "RELIGION", "FAITH", "BELIEF",
  "TRUST", "DOUBT", "HOPE", "DESPAIR", "JOY", "SORROW", "SMILE", "TEARS", "LIFE", "DEATH",
  "BIRTH", "MARRIAGE", "FAMILY", "HOME", "SCHOOL", "COLLEGE", "OFFICE", "BOSS", "SUBORDINATE", "COLLEAGUE",
  "COMPETITION", "EXAM", "INTERVIEW", "RESULT", "SELECTION", "REJECTION", "TRAINING", "FITNESS", "SPORTS", "GAME"
];

const srtBase = [
  "You see a person drowning in a river.",
  "Your train leaves in 15 minutes and you are stuck in traffic.",
  "During a group trek, you lose your way in a dark forest.",
  "You find a wallet loaded with cash on the street.",
  "Your team is losing a match and morale is low.",
  "A fire breaks out in your office building.",
  "You see someone being bullied in college.",
  "Your subordinate makes a critical mistake before a deadline.",
  "You are assigned a task you have no experience in.",
  "Your parents oppose your career choice."
];

let questions = [];
let idCounter = 1;

// Generate 100 OIR
for (let i = 0; i < 100; i++) {
  let diff = i < 33 ? "Easy" : i < 66 ? "Medium" : "Hard";
  
  if (i % 3 === 0) {
    // Number series
    let start = Math.floor(Math.random() * 10) + 1;
    let step = Math.floor(Math.random() * 5) + 1 + (diff === 'Hard' ? 5 : 0);
    let n1 = start, n2 = start + step, n3 = n2 + step, n4 = n3 + step, n5 = n4 + step;
    questions.push({
      id: `q${idCounter++}`, topic: "OIR", difficulty: diff,
      question: `Find the missing number: ${n1}, ${n2}, ${n3}, ${n4}, ?`,
      options: [(n5 - 1).toString(), n5.toString(), (n5 + 2).toString(), (n5 + step).toString()].sort(() => Math.random() - 0.5),
      correctAnswer: n5.toString(),
      explanation: `The series increases by ${step} each time.`
    });
  } else if (i % 3 === 1) {
    // Word coding
    let words = ["NAVY", "ARMY", "SHIP", "BOAT", "SAIL", "WAVE", "OCEAN", "SEA"];
    let word = words[i % words.length];
    let sum = 0;
    for (let c of word) sum += (c.charCodeAt(0) - 64);
    
    questions.push({
      id: `q${idCounter++}`, topic: "OIR", difficulty: diff,
      question: `If A = 1, B = 2, C = 3, what is the value of '${word}'?`,
      options: [(sum - 2).toString(), sum.toString(), (sum + 1).toString(), (sum + 4).toString()].sort(() => Math.random() - 0.5),
      correctAnswer: sum.toString(),
      explanation: `Sum of alphabetical positions for ${word} is ${sum}.`
    });
  } else {
    // Simple math
    let a = Math.floor(Math.random() * 10) + 2;
    let b = Math.floor(Math.random() * 10) + 2;
    let sum = a * b + (diff === 'Hard' ? 15 : 0);
    questions.push({
      id: `q${idCounter++}`, topic: "OIR", difficulty: diff,
      question: `If 2 * 3 = 6 and 4 * 5 = 20, then ${a} * ${b} = ?`,
      options: [(sum - 2).toString(), sum.toString(), (sum + 2).toString(), (sum * 2).toString()].sort(() => Math.random() - 0.5),
      correctAnswer: sum.toString(),
      explanation: `The operation is simple multiplication: ${a} * ${b} = ${sum}.`
    });
  }
}

// Generate 100 WAT
for (let i = 0; i < 100; i++) {
  let diff = i < 33 ? "Easy" : i < 66 ? "Medium" : "Hard";
  let word = watWords[i % watWords.length];
  
  questions.push({
    id: `q${idCounter++}`, topic: "WAT", difficulty: diff,
    question: `Choose the most appropriate sentence for the word: ${word}`,
    options: [
      `${word.charAt(0) + word.slice(1).toLowerCase()} is the key to progress and betterment.`,
      `${word.charAt(0) + word.slice(1).toLowerCase()} is something to be avoided.`,
      `I don't know much about ${word.toLowerCase()}.`,
      `${word.charAt(0) + word.slice(1).toLowerCase()} brings only misery.`
    ].sort(() => Math.random() - 0.5),
    correctAnswer: `${word.charAt(0) + word.slice(1).toLowerCase()} is the key to progress and betterment.`,
    explanation: "This option demonstrates a positive, constructive, and forward-looking mindset."
  });
}

// Generate 100 SRT
for (let i = 0; i < 100; i++) {
  let diff = i < 33 ? "Easy" : i < 66 ? "Medium" : "Hard";
  let base = srtBase[i % srtBase.length];
  
  questions.push({
    id: `q${idCounter++}`, topic: "SRT", difficulty: diff,
    question: `Situation ${i+1}: ${base} You...`,
    options: [
      "Assess the situation quickly, take practical positive action, and ensure safety/success.",
      "Panic and wait for someone else to take the lead.",
      "Ignore it as it is not your direct problem.",
      "Complain about the circumstances and do nothing."
    ].sort(() => Math.random() - 0.5),
    correctAnswer: "Assess the situation quickly, take practical positive action, and ensure safety/success.",
    explanation: "An officer is expected to take initiative, remain calm under pressure, and solve problems practically."
  });
}


const ssbStages = [
  {
    id: "stage-1",
    title: "Stage I (Day 1) - Screening",
    description: "The primary filtration stage. Only those who pass both components proceed to Stage II.",
    tests: [
      {
        name: "Officer Intelligence Rating (OIR)",
        details: "A set of verbal and non-verbal reasoning questions to test basic cognitive ability, speed, and analytical skills."
      },
      {
        name: "Picture Perception & Discussion Test (PPDT)",
        details: "Candidates write a story based on a blurred image shown for 30 seconds, followed by a group discussion to reach a consensus."
      }
    ]
  },
  {
    id: "stage-2",
    title: "Stage II (Days 2-5) - Detailed Assessment",
    description: "A comprehensive assessment of psychological profile, group dynamics, and personal traits.",
    tests: [
      {
        name: "Psychological Tests (Day 2)",
        details: "Includes Thematic Apperception Test (TAT), Word Association Test (WAT), Situation Reaction Test (SRT), and Self Description Test (SD)."
      },
      {
        name: "Group Testing Officer (GTO) Tasks (Days 3-4)",
        details: "Includes Group Discussion (GD), Group Planning Exercise (GPE), Progressive Group Task (PGT), Snake Race, Individual Obstacles, and Command Task."
      },
      {
        name: "Personal Interview (Days 2-4)",
        details: "A one-on-one interaction with the Interviewing Officer assessing personal life, current affairs, and motivation."
      },
      {
        name: "Conference (Day 5)",
        details: "The final board conference where assessors discuss and finalize candidate recommendations."
      }
    ]
  }
];

const fileContent = `export const ssbStages = ${JSON.stringify(ssbStages, null, 2)};\n\nexport const practiceQuestions = ${JSON.stringify(questions, null, 2)};\n`;

fs.writeFileSync('src/data/mockData.js', fileContent);
console.log('Successfully generated 300 questions!');
