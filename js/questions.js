/**
 * Quiz App - Questions Dataset
 * Multi-category question bank with difficulty tiers and explanations.
 */

const QUIZ_CATEGORIES = [
  { id: "all", name: "All Categories", icon: "sparkles", description: "A balanced mix across all domains" },
  { id: "tech", name: "Tech & Coding", icon: "code", description: "JavaScript, Web, Python & Computer Science" },
  { id: "science", name: "Science & Space", icon: "atom", description: "Physics, Astronomy, Biology & Chemistry" },
  { id: "geography", name: "World & Geography", icon: "globe", description: "Capitals, Landmarks, Continents & Oceans" },
  { id: "entertainment", name: "Pop Culture & Film", icon: "film", description: "Cinema, Music, Gaming & Milestones" }
];

const QUIZ_QUESTIONS = [
  // --- TECH & CODING ---
  {
    id: 1,
    category: "tech",
    difficulty: "easy",
    question: "Which HTML tag is used to embed an external JavaScript file?",
    options: ["<script>", "<js>", "<javascript>", "<link>"],
    correct: 0,
    explanation: "The <script> tag with a 'src' attribute is used to link external JavaScript files in HTML."
  },
  {
    id: 2,
    category: "tech",
    difficulty: "easy",
    question: "Which of the following is NOT a JavaScript primitive data type?",
    options: ["Boolean", "String", "Object", "Number"],
    correct: 2,
    explanation: "Objects (including Arrays and Functions) are reference types in JavaScript, not primitives."
  },
  {
    id: 3,
    category: "tech",
    difficulty: "easy",
    question: "What does CSS stand for in web development?",
    options: [
      "Cascading Style Sheets",
      "Creative Styling Syntax",
      "Computer Sheet Styles",
      "Coded Sheet Sections"
    ],
    correct: 0,
    explanation: "CSS stands for Cascading Style Sheets, used for styling the visual layout of HTML documents."
  },
  {
    id: 4,
    category: "tech",
    difficulty: "medium",
    question: "What is the output of `typeof NaN` in JavaScript?",
    options: ["'undefined'", "'nan'", "'number'", "'object'"],
    correct: 2,
    explanation: "In JavaScript, NaN stands for 'Not-a-Number', but its formal IEEE 754 type is actually 'number'."
  },
  {
    id: 5,
    category: "tech",
    difficulty: "medium",
    question: "Which array method creates a new array with all elements that pass a test?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    correct: 1,
    explanation: "Array.prototype.filter() returns a shallow copy of a portion of a given array, filtered down to just the elements that pass the predicate function."
  },
  {
    id: 6,
    category: "tech",
    difficulty: "medium",
    question: "Which HTTP status code represents 'Internal Server Error'?",
    options: ["400", "404", "500", "502"],
    correct: 2,
    explanation: "500 Internal Server Error is a generic server-side error indicating an unexpected condition prevented the request from being fulfilled."
  },
  {
    id: 7,
    category: "tech",
    difficulty: "hard",
    question: "What does the Event Loop in JavaScript do when the Call Stack is empty?",
    options: [
      "Immediately terminates the JavaScript process",
      "Executes tasks from the Microtask Queue before the Macrotask Queue",
      "Executes tasks from the Macrotask Queue before the Microtask Queue",
      "Re-renders the entire DOM tree"
    ],
    correct: 1,
    explanation: "When the Call Stack clears, the Event Loop first drains the entire Microtask Queue (e.g. Promise callbacks) before picking the next task from the Macrotask Queue (setTimeout, I/O)."
  },
  {
    id: 8,
    category: "tech",
    difficulty: "hard",
    question: "Which CSS property enables hardware acceleration for smooth transform animations?",
    options: ["will-change: transform", "overflow: hidden", "display: flex", "box-sizing: border-box"],
    correct: 0,
    explanation: "'will-change: transform' hints to the browser engine to promote the element to a dedicated GPU compositing layer."
  },
  {
    id: 9,
    category: "tech",
    difficulty: "easy",
    question: "Which Git command is used to stage all modified files for a commit?",
    options: ["git push --all", "git add .", "git commit -a", "git branch -M"],
    correct: 1,
    explanation: "'git add .' stages all new and modified files in the current directory and its subdirectories."
  },
  {
    id: 10,
    category: "tech",
    difficulty: "medium",
    question: "In Python, which built-in data structure is unordered, mutable, and contains no duplicates?",
    options: ["List", "Tuple", "Set", "Dictionary"],
    correct: 2,
    explanation: "A Set is an unordered collection of unique elements in Python with fast membership testing."
  },
  {
    id: 11,
    category: "tech",
    difficulty: "hard",
    question: "What is the average time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correct: 2,
    explanation: "Searching in a balanced BST (like AVL or Red-Black Tree) divides the search space in half at each step, yielding O(log n) complexity."
  },
  {
    id: 12,
    category: "tech",
    difficulty: "medium",
    question: "Which keyword in JavaScript allows a variable to be re-assigned, but blocks re-declaration in the same scope?",
    options: ["var", "let", "const", "def"],
    correct: 1,
    explanation: "'let' is block-scoped and allows reassignment, unlike 'const' which forbids reassignment, and unlike 'var' which allows re-declaration."
  },

  // --- SCIENCE & SPACE ---
  {
    id: 13,
    category: "science",
    difficulty: "easy",
    question: "What is the closest planet to the Sun in our Solar System?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correct: 2,
    explanation: "Mercury orbits closest to the Sun at an average distance of about 57.9 million kilometers (36 million miles)."
  },
  {
    id: 14,
    category: "science",
    difficulty: "easy",
    question: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correct: 1,
    explanation: "Water consists of two Hydrogen atoms bonded covalently to one Oxygen atom (H2O)."
  },
  {
    id: 15,
    category: "science",
    difficulty: "easy",
    question: "What gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
    correct: 1,
    explanation: "Plants take in Carbon Dioxide (CO2) and release Oxygen (O2) through chlorophyll-driven photosynthesis."
  },
  {
    id: 16,
    category: "science",
    difficulty: "medium",
    question: "What is the powerhouse organelle of the eukaryotic cell?",
    options: ["Nucleus", "Ribosome", "Mitochondrion", "Endoplasmic Reticulum"],
    correct: 2,
    explanation: "Mitochondria generate most of the cell's chemical energy supply in the form of Adenosine Triphosphate (ATP)."
  },
  {
    id: 17,
    category: "science",
    difficulty: "medium",
    question: "What is the approximate speed of light in a vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "1,080,000 km/s", "30,000 km/s"],
    correct: 0,
    explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second, or roughly 300,000 kilometers per second."
  },
  {
    id: 18,
    category: "science",
    difficulty: "medium",
    question: "Which element has the atomic number 1 on the Periodic Table?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correct: 1,
    explanation: "Hydrogen has one proton in its nucleus, giving it an atomic number of 1."
  },
  {
    id: 19,
    category: "science",
    difficulty: "hard",
    question: "What is the boundary around a black hole beyond which nothing, not even light, can escape?",
    options: ["Singularity", "Photon Sphere", "Ergosphere", "Event Horizon"],
    correct: 3,
    explanation: "The Event Horizon is the threshold where the escape velocity equals the speed of light."
  },
  {
    id: 20,
    category: "science",
    difficulty: "hard",
    question: "Which subatomic particles are made of two 'up' quarks and one 'down' quark?",
    options: ["Neutron", "Proton", "Electron", "Neutrino"],
    correct: 1,
    explanation: "A proton is composed of two up quarks (+2/3 each) and one down quark (-1/3), yielding a net +1 elementary charge."
  },
  {
    id: 21,
    category: "science",
    difficulty: "hard",
    question: "What principle states that you cannot simultaneously know both the precise position and momentum of a particle?",
    options: [
      "Pauli Exclusion Principle",
      "Heisenberg Uncertainty Principle",
      "Schrödinger Wave Equation",
      "Bohr Complementarity"
    ],
    correct: 1,
    explanation: "Werner Heisenberg formulated the Uncertainty Principle in 1927, setting fundamental quantum limits on measurement precision."
  },
  {
    id: 22,
    category: "science",
    difficulty: "medium",
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Argon", "Carbon Dioxide"],
    correct: 1,
    explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere, while oxygen makes up about 21%."
  },

  // --- WORLD & GEOGRAPHY ---
  {
    id: 23,
    category: "geography",
    difficulty: "easy",
    question: "What is the capital city of France?",
    options: ["Lyon", "Marseille", "Paris", "Nice"],
    correct: 2,
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 24,
    category: "geography",
    difficulty: "easy",
    question: "Which is the largest ocean on Earth by surface area?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3,
    explanation: "The Pacific Ocean covers more than 60 million square miles, exceeding all land area on Earth combined."
  },
  {
    id: 25,
    category: "geography",
    difficulty: "easy",
    question: "On which continent is the Sahara Desert located?",
    options: ["Asia", "Africa", "South America", "Australia"],
    correct: 1,
    explanation: "The Sahara Desert spans across 11 countries in northern Africa."
  },
  {
    id: 26,
    category: "geography",
    difficulty: "medium",
    question: "What is the longest river in the world by general consensus?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correct: 1,
    explanation: "The Nile River in Africa spans approximately 6,650 kilometers (4,132 miles), traditionally ranked as the longest."
  },
  {
    id: 27,
    category: "geography",
    difficulty: "medium",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2,
    explanation: "Canberra was chosen as the compromise capital of Australia in 1908 to resolve rivalry between Sydney and Melbourne."
  },
  {
    id: 28,
    category: "geography",
    difficulty: "medium",
    question: "Which country has the highest number of natural lakes in the world?",
    options: ["United States", "Russia", "Canada", "Finland"],
    correct: 2,
    explanation: "Canada contains over 60% of all natural lakes in the world, totaling an estimated 2 million lakes."
  },
  {
    id: 29,
    category: "geography",
    difficulty: "hard",
    question: "Which landlocked country is situated entirely within the borders of South Africa?",
    options: ["Lesotho", "Eswatini", "Botswana", "Namibia"],
    correct: 0,
    explanation: "The Kingdom of Lesotho is an enclave country completely surrounded by the Republic of South Africa."
  },
  {
    id: 30,
    category: "geography",
    difficulty: "hard",
    question: "What is the deepest point in the world's oceans?",
    options: ["Java Trench", "Challenger Deep (Mariana Trench)", "Puerto Rico Trench", "Sunda Trench"],
    correct: 1,
    explanation: "Challenger Deep in the Mariana Trench plunges nearly 11,000 meters (36,000 feet) below sea level."
  },
  {
    id: 31,
    category: "geography",
    difficulty: "hard",
    question: "Which strait separates the continents of Asia and North America?",
    options: ["Strait of Gibraltar", "Bering Strait", "Bosporus Strait", "Malacca Strait"],
    correct: 1,
    explanation: "The Bering Strait connects the Arctic Ocean with the Bering Sea, separating Russia (Chukotka) from Alaska (USA)."
  },
  {
    id: 32,
    category: "geography",
    difficulty: "medium",
    question: "Which mountain is the highest peak in Africa?",
    options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Elgon", "Atlas Mountains"],
    correct: 1,
    explanation: "Mount Kilimanjaro in Tanzania rises 5,895 meters (19,341 feet) above sea level."
  },

  // --- POP CULTURE & ENTERTAINMENT ---
  {
    id: 33,
    category: "entertainment",
    difficulty: "easy",
    question: "Who directed the 1993 sci-fi blockbuster 'Jurassic Park'?",
    options: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"],
    correct: 1,
    explanation: "Steven Spielberg directed 'Jurassic Park', which revolutionized CGI visual effects in cinema."
  },
  {
    id: 34,
    category: "entertainment",
    difficulty: "easy",
    question: "What is the name of the protagonist in Nintendo's 'The Legend of Zelda' series?",
    options: ["Zelda", "Ganon", "Link", "Navi"],
    correct: 2,
    explanation: "Link is the courageous green-clad hero who embarks on quests to rescue Princess Zelda."
  },
  {
    id: 35,
    category: "entertainment",
    difficulty: "easy",
    question: "Which superhero is known as the 'Caped Crusader'?",
    options: ["Superman", "Spider-Man", "Batman", "Iron Man"],
    correct: 2,
    explanation: "Batman, created by Bob Kane and Bill Finger for DC Comics, is famously nicknamed the Caped Crusader."
  },
  {
    id: 36,
    category: "entertainment",
    difficulty: "medium",
    question: "Which movie won the Best Picture Academy Award in 2020 as the first non-English language film to do so?",
    options: ["Roma", "Parasite", "Drive My Car", "Amélie"],
    correct: 1,
    explanation: "Bong Joon-ho's South Korean thriller 'Parasite' made Oscar history by winning both Best International Feature and Best Picture."
  },
  {
    id: 37,
    category: "entertainment",
    difficulty: "medium",
    question: "What year did the original PlayStation home video game console release in Japan?",
    options: ["1992", "1994", "1996", "1998"],
    correct: 1,
    explanation: "Sony released the PlayStation in Japan on December 3, 1994, launching a massive gaming revolution."
  },
  {
    id: 38,
    category: "entertainment",
    difficulty: "medium",
    question: "In the movie 'The Matrix' (1999), which color pill does Neo take to wake up to reality?",
    options: ["Blue", "Red", "Green", "Yellow"],
    correct: 1,
    explanation: "Morpheus offers Neo the choice: take the blue pill to remain in the Matrix simulation, or take the red pill to see the truth."
  },
  {
    id: 39,
    category: "entertainment",
    difficulty: "hard",
    question: "Which musical artist wrote and recorded the soundtrack for the film 'Purple Rain' (1984)?",
    options: ["Michael Jackson", "Prince", "David Bowie", "Stevie Wonder"],
    correct: 1,
    explanation: "Prince and The Revolution created the iconic 'Purple Rain' album and star in the companion rock musical film."
  },
  {
    id: 40,
    category: "entertainment",
    difficulty: "hard",
    question: "In J.R.R. Tolkien's 'The Lord of the Rings', what is the name of the volcano where the One Ring was forged?",
    options: ["Mount Doom (Orodruin)", "Erebor", "Moria", "Gundabad"],
    correct: 0,
    explanation: "Mount Doom, also called Amon Amarth or Orodruin, is the volcanic peak in Mordor where Sauron forged the One Ring."
  },
  {
    id: 41,
    category: "entertainment",
    difficulty: "hard",
    question: "Which animated film was the first full-length computer-animated feature film in history?",
    options: ["A Bug's Life", "Toy Story", "Shrek", "Monsters, Inc."],
    correct: 1,
    explanation: "Pixar's 'Toy Story', released in 1995 and directed by John Lasseter, was the world's first feature-length CGI film."
  },
  {
    id: 42,
    category: "entertainment",
    difficulty: "medium",
    question: "What is the highest-grossing film of all time worldwide (unadjusted for inflation)?",
    options: ["Avengers: Endgame", "Titanic", "Avatar (2009)", "Star Wars: The Force Awakens"],
    correct: 2,
    explanation: "James Cameron's 'Avatar' holds the global box office record with over $2.9 billion worldwide."
  },

  // --- MORE TECH & CODING ---
  {
    id: 43,
    category: "tech",
    difficulty: "easy",
    question: "What does SQL stand for in database management?",
    options: ["Structured Query Language", "Simple Quick Logic", "System Question Language", "Sequential Query List"],
    correct: 0,
    explanation: "SQL stands for Structured Query Language, the standardized language used to manage relational databases."
  },
  {
    id: 44,
    category: "tech",
    difficulty: "medium",
    question: "Which HTTP request method is idempotent and intended to replace an existing resource entirely?",
    options: ["POST", "PATCH", "PUT", "CONNECT"],
    correct: 2,
    explanation: "PUT is idempotent and replaces the entire target resource with the requested payload, whereas PATCH is used for partial modifications."
  },
  {
    id: 45,
    category: "tech",
    difficulty: "hard",
    question: "In JavaScript, which structure allows weak references where keys can be garbage collected?",
    options: ["WeakMap", "Set", "Symbol", "Proxy"],
    correct: 0,
    explanation: "WeakMap holds weak references to its keys (which must be objects), allowing them to be garbage collected if there are no other references."
  },

  // --- MORE SCIENCE & SPACE ---
  {
    id: 46,
    category: "science",
    difficulty: "easy",
    question: "What is the hardest naturally occurring mineral on Earth?",
    options: ["Quartz", "Topaz", "Diamond", "Corundum"],
    correct: 2,
    explanation: "Diamond rates a maximum 10 on Mohs scale of mineral hardness due to its rigid tetrahedral carbon crystal lattice."
  },
  {
    id: 47,
    category: "science",
    difficulty: "medium",
    question: "Which planet in the solar system has the most prominent and extensive planetary ring system?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
    explanation: "Saturn possesses the most extensive and visually prominent ring system in the solar system, composed predominantly of ice particles and rock debris."
  },
  {
    id: 48,
    category: "science",
    difficulty: "medium",
    question: "What type of chemical bond is formed when atoms share pairs of valence electrons?",
    options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
    correct: 1,
    explanation: "A covalent bond involves the sharing of electron pairs between atoms with similar electronegativity."
  },
  {
    id: 49,
    category: "science",
    difficulty: "hard",
    question: "What is the absolute zero temperature in Celsius, at which thermodynamic entropy reaches minimum?",
    options: ["-273.15 °C", "-212.00 °C", "-459.67 °C", "-100.00 °C"],
    correct: 0,
    explanation: "Absolute zero is 0 Kelvin or -273.15 °C, where particles achieve their lowest quantum-mechanical energy state."
  },
  {
    id: 50,
    category: "science",
    difficulty: "easy",
    question: "Which organ in the human body produces insulin?",
    options: ["Liver", "Pancreas", "Kidney", "Stomach"],
    correct: 1,
    explanation: "The beta cells of the Islets of Langerhans in the pancreas secrete insulin to regulate blood glucose."
  },

  // --- MORE GEOGRAPHY ---
  {
    id: 51,
    category: "geography",
    difficulty: "easy",
    question: "Which country has the largest population in the world as of 2024?",
    options: ["China", "India", "United States", "Indonesia"],
    correct: 1,
    explanation: "India surpassed China in 2023 to become the world's most populous nation according to UN demographic estimates."
  },
  {
    id: 52,
    category: "geography",
    difficulty: "medium",
    question: "Which South American river basin contains the largest tropical rainforest in the world?",
    options: ["Orinoco", "Paraná", "Amazon", "Magdalena"],
    correct: 2,
    explanation: "The Amazon River Basin spans over 7 million square kilometers, encompassing the world's largest rainforest."
  },
  {
    id: 53,
    category: "geography",
    difficulty: "hard",
    question: "What is the capital city of Mongolia?",
    options: ["Astana", "Ulaanbaatar", "Tashkent", "Bishkek"],
    correct: 1,
    explanation: "Ulaanbaatar is the capital and coldest national capital city in the world by average temperature."
  },
  {
    id: 54,
    category: "geography",
    difficulty: "medium",
    question: "What body of water lies between the United Kingdom and continental Europe?",
    options: ["English Channel", "Baltic Sea", "Irish Sea", "Bay of Biscay"],
    correct: 0,
    explanation: "The English Channel connects the North Sea to the Atlantic Ocean and separates southern England from northern France."
  },
  {
    id: 55,
    category: "geography",
    difficulty: "hard",
    question: "Which African country was formerly known as Abyssinia?",
    options: ["Sudan", "Somalia", "Ethiopia", "Eritrea"],
    correct: 2,
    explanation: "Ethiopia was historically referred to by Europeans as Abyssinia until the 20th century."
  },

  // --- MORE POP CULTURE & ENTERTAINMENT ---
  {
    id: 56,
    category: "entertainment",
    difficulty: "easy",
    question: "In the 'Harry Potter' series, what is the name of Harry's pet owl?",
    options: ["Errol", "Scabbers", "Hedwig", "Fawkes"],
    correct: 2,
    explanation: "Hedwig was Harry Potter's snowy owl, given to him as an 11th birthday present by Rubeus Hagrid."
  },
  {
    id: 57,
    category: "entertainment",
    difficulty: "medium",
    question: "Which studio produced animated masterpiece films like 'Spirited Away' and 'My Neighbor Totoro'?",
    options: ["Studio Ghibli", "Toei Animation", "Kyoto Animation", "Madhouse"],
    correct: 0,
    explanation: "Studio Ghibli, co-founded by Hayao Miyazaki and Isao Takahata, produced these iconic anime films."
  },
  {
    id: 58,
    category: "entertainment",
    difficulty: "medium",
    question: "What is the highest-selling video game of all time with over 300 million copies sold?",
    options: ["Grand Theft Auto V", "Minecraft", "Tetris", "Wii Sports"],
    correct: 1,
    explanation: "Mojang's 'Minecraft' has sold more than 300 million copies across platforms, making it the best-selling game in history."
  },
  {
    id: 59,
    category: "entertainment",
    difficulty: "hard",
    question: "Who won the Best Actor Oscar for his legendary performance in 'There Will Be Blood' (2007)?",
    options: ["Daniel Day-Lewis", "Javier Bardem", "Christian Bale", "Johnny Depp"],
    correct: 0,
    explanation: "Daniel Day-Lewis won his second Academy Award for Best Actor for his role as oil prospector Daniel Plainview."
  },
  {
    id: 60,
    category: "entertainment",
    difficulty: "hard",
    question: "Which rock band released the groundbreaking album 'The Dark Side of the Moon' in 1973?",
    options: ["Led Zeppelin", "Pink Floyd", "The Rolling Stones", "The Who"],
    correct: 1,
    explanation: "Pink Floyd released 'The Dark Side of the Moon' in March 1973, which spent a record 950+ weeks on the Billboard charts."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_CATEGORIES, QUIZ_QUESTIONS };
}
