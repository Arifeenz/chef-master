/* เพิ่มไว้ด้านบนสุด */
let inventory = { hint: 0, clear: 0, shuffle: 0 };

/* ===============================
   สูตรอาหารตามเลเวล (1 → 5 วัตถุดิบ)
================================= */
const recipes = {
  // ====== เลเวล 1: ง่ายสุด (1 วัตถุดิบ) ======
  "🥥 น้ำกะทิ": ["🥥 กะทิ"],
  "🍚 ข้าวหอม": ["🍚 ข้าวหอม"],
  "🍌 กล้วยหิน": ["🍌 กล้วยหิน"],
  "🥚 ไข่ต้ม": ["🥚 ไข่"],
  "🍗 ไก่ทอด": ["🍗 เนื้อไก่"],
  "🥗 สลัดผัก": ["🥬 ผัก"],
  "🐟 ปลาทอด": ["🐟 ปลา"],

  // ====== เลเวล 2: ง่าย (2 วัตถุดิบ) ======
  "🍗 ไก่กอและ": ["🍗 เนื้อไก่", "🌶️ เครื่องแกงใต้"],
  "🍳 ไข่ดาว": ["🥚 ไข่", "🛢️ น้ำมัน"],
  "🍤 ทอดมันกุ้ง": ["🍤 กุ้ง", "🌾 แป้ง"],
  "🥬 กะหล่ำปลีผัดน้ำปลา": ["🥬 กะหล่ำปลี", "🧂 น้ำปลา"],

  // ====== เลเวล 3: ง่าย–กลาง (3 วัตถุดิบ) ======
  "🍚 ข้าวยำปักษ์ใต้": ["🍚 ข้าวหอม", "🌿 สมุนไพรซอย", "🐟 น้ำบูดู"],
  "🥗 ส้มตำ": ["🥒 มะละกอ", "🌿 ถั่วฝักยาว", "🌶️ พริก"],
  "🍤 ข้าวผัดกุ้ง": ["🍚 ข้าวสวย", "🍤 กุ้ง", "🥚 ไข่"],
  "🍲 ต้มจืดไข่": ["🥚 ไข่", "🌿 สาหร่าย", "🥢 เต้าหู้อ่อน"],
  "🎃 ฟักทองผัดไข่": ["🎃 ฟักทอง", "🥚 ไข่", "🧄 กระเทียม"],
  "🍗 ยำไก่เชียง": ["🍗 ไก่เชียง", "🥒 แตงกวา", "🌶️ พริก"],

  // ====== เลเวล 4: กลาง (4 วัตถุดิบ) ======
  "🍛 แกงไก่สะตอ": ["🍗 เนื้อไก่", "🌱 สะตอ", "🥥 กะทิ", "🌶️ เครื่องแกงใต้"],
  "🍤 ต้มยำกุ้ง": ["🍤 กุ้ง", "🌾 ตะไคร้", "🍃 ใบมะกรูด", "🌶️ พริก"],
  "🌿 ผัดกะเพราไก่": ["🍗 เนื้อไก่", "🌿 ใบกะเพรา", "🌶️ พริก", "🧄 กระเทียม"],
  "🐟 ยำปลากระป๋อง": [
    "🐟 ปลากระป๋อง",
    "🌾 ตะไคร้",
    "🍃 ใบมะกรูด",
    "🍋 น้ำมะนาว",
  ],
  "🥚 ไข่ลูกเขย": [
    "🥚 ไข่ต้ม",
    "🍯 น้ำตาลปี๊บ",
    "🍋 น้ำมะขามเปียก",
    "🧅 หอมเจียว",
  ],

  // ====== เลเวล 5: ยาก (5 วัตถุดิบ) ======
  "🍲 แกงเขียวหวาน": [
    "🍗 เนื้อไก่",
    "🥥 กะทิ",
    "🍆 มะเขือ",
    "🌶️ พริกแกงเขียว",
    "🍃 ใบมะกรูด",
  ],
  "🐟 ซุปหัวปลา": [
    "🐟 หัวปลา",
    "🌾 ขมิ้น",
    "🌾 ตะไคร้",
    "🍋 น้ำมะนาว",
    "🧄 กระเทียม",
  ],
  "🍛 แกงส้มใต้": [
    "🐟 ปลา",
    "🌾 ขมิ้น",
    "🥭 มะม่วงดิบ",
    "🌶️ เครื่องแกงใต้",
    "🥬 ผักพื้นบ้าน",
  ],
  "🍛 ข้าวผัดอเมริกัน": [
    "🍚 ข้าวสวย",
    "🥕 แครอท",
    "🌭 ไส้กรอก",
    "🍗 ปีกไก่ทอด",
    "🧅 หอมใหญ่",
  ],
  "🐂 ซุปหางวัว": [
    "🐂 หางวัว",
    "🍃 ใบมะกรูด",
    "🌾 ตะไคร้",
    "🍅 มะเขือเทศ",
    "🍋 น้ำมะนาว",
  ],
  "🍜 บะหมี่ไก่แดง": [
    "🍗 อกไก่",
    "🧄 กระเทียม",
    "🐟 ลูกชิ้นปลา",
    "🍜 เส้นบะหมี่",
    "🥚 ไข่ต้ม",
  ],
};

/* วัตถุดิบทั้งหมด */
const allIngredients = [
  // พื้นฐาน / ภาคใต้
  "🍗 เนื้อไก่",
  "🥥 กะทิ",
  "🌾 ขมิ้น",
  "🌶️ เครื่องแกงใต้",
  "🍚 ข้าวหอม",
  "🍚 ข้าวสวย",
  "🌿 สมุนไพรซอย",
  "🐟 น้ำบูดู",
  "🌱 สะตอ",
  "🍌 กล้วยหิน",
  "🍤 กุ้ง",
  "🐟 ปลา",
  "🐟 หัวปลา",

  // ผัก/สมุนไพร
  "🌿 ใบกะเพรา",
  "🍃 ใบมะกรูด",
  "🥬 ผักพื้นบ้าน",
  "🥒 มะละกอ",
  "🌿 ถั่วฝักยาว",
  "🍆 มะเขือ",
  "🥭 มะม่วงดิบ",
  "🥬 กะหล่ำปลี",
  "🥬 ผัก",
  "🌿 สาหร่าย",
  "🎃 ฟักทอง",
  "🥒 แตงกวา",
  "🥕 แครอท",
  "🧅 หอมใหญ่",
  "🍅 มะเขือเทศ",

  // เนื้อสัตว์/โปรตีนพิเศษ
  "🍗 ไก่เชียง",
  "🐟 ปลากระป๋อง",
  "🍗 ปีกไก่ทอด",
  "🐂 หางวัว",
  "🍗 อกไก่",
  "🐟 ลูกชิ้นปลา",

  // เครื่องปรุง
  "🧄 กระเทียม",
  "🌶️ พริก",
  "🌶️ พริกแกงเขียว",
  "🥢 ซีอิ๊ว",
  "🛢️ น้ำมัน",
  "🍋 น้ำมะนาว",
  "🌾 แป้ง",
  "🧂 น้ำปลา",
  "🥢 เต้าหู้อ่อน",
  "🍯 น้ำตาลปี๊บ",
  "🍋 น้ำมะขามเปียก",
  "🧅 หอมเจียว",
  "🌭 ไส้กรอก",
  "🍜 เส้นบะหมี่",

  // ทั่วไป
  "🥚 ไข่",
];

/* เมนูปลดล็อกตามเลเวล */
const menuByLevel = {
  1: [
    "🥥 น้ำกะทิ",
    "🍚 ข้าวหอม",
    "🍌 กล้วยหิน",
    "🥚 ไข่ต้ม",
    "🍗 ไก่ทอด",
    "🥗 สลัดผัก",
    "🐟 ปลาทอด",
  ],
  2: ["🍗 ไก่กอและ", "🍳 ไข่ดาว", "🍤 ทอดมันกุ้ง", "🥬 กะหล่ำปลีผัดน้ำปลา"],
  3: [
    "🍚 ข้าวยำปักษ์ใต้",
    "🥗 ส้มตำ",
    "🍤 ข้าวผัดกุ้ง",
    "🍲 ต้มจืดไข่",
    "🎃 ฟักทองผัดไข่",
    "🍗 ยำไก่เชียง",
  ],
  4: [
    "🍛 แกงไก่สะตอ",
    "🍤 ต้มยำกุ้ง",
    "🌿 ผัดกะเพราไก่",
    "🐟 ยำปลากระป๋อง",
    "🥚 ไข่ลูกเขย",
  ],
  5: [
    "🍲 แกงเขียวหวาน",
    "🐟 ซุปหัวปลา",
    "🍛 แกงส้มใต้",
    "🍛 ข้าวผัดอเมริกัน",
    "🐂 ซุปหางวัว",
    "🍜 บะหมี่ไก่แดง",
  ],
};

/* ===============================
   ด่านบอสพิเศษ (6 วัตถุดิบ)
================================= */
const bossRecipes = {
  "👑 Ultimate Master Dish": [
    "🍗 เนื้อไก่",
    "🍤 กุ้ง",
    "🥥 กะทิ",
    "🍚 ข้าวหอม",
    "🌶️ พริก",
    "🧄 กระเทียม",
  ],
};

/* ===============================
   State ของเกม
================================= */
let gameState = {
  fame: 0,
  coins: 100,
  recipes: menuByLevel[1].length,
  level: 1,
  currentOrder: null,
  selectedIngredients: [],
  timeLeft: 90,
  timer: null,
  unlockedRecipes: [...menuByLevel[1]],
  bossStage: false, // <-- เพิ่ม flag ตรงนี้
};

/* ===============================
   ฟังก์ชันช่วย
================================= */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ===============================
   Flow หลักของเกม
================================= */
function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  generateOrder();
  createIngredients();
  startTimer();
  updateStats();
  updateLevelDisplay();
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.onclick = () => {
      clearInterval(gameState.timer);
      document.getElementById("game-screen").classList.add("hidden");
      document.getElementById("start-screen").classList.remove("hidden");
    };
  }
}

function generateOrder() {
  const availableMenus = menuByLevel[gameState.level] || menuByLevel[5];
  const randomMenu =
    availableMenus[Math.floor(Math.random() * availableMenus.length)];
  gameState.currentOrder = randomMenu;
  document.getElementById("order-dish").textContent = randomMenu;
}

function createIngredients() {
  const container = document.getElementById("ingredients");
  container.innerHTML = "";

  const requiredIngredients = recipes[gameState.currentOrder] || [];

  // สร้างวัตถุดิบลวง
  const distractors = allIngredients.filter(
    (i) => !requiredIngredients.includes(i)
  );
  const shuffledDistractors = shuffle(distractors).slice(
    0,
    12 - requiredIngredients.length
  );

  // รวมและสุ่มลำดับ
  let finalIngredients = [...requiredIngredients, ...shuffledDistractors];
  finalIngredients = shuffle(finalIngredients);

  // แสดงผล
  finalIngredients.forEach((ingredient) => {
    const div = document.createElement("div");
    div.className = "ingredient";
    const parts = ingredient.split(" ");
    const emoji = parts[0];
    const name = parts.slice(1).join(" ");
    div.innerHTML = `<div class="emoji">${emoji}</div><div class="name">${name}</div>`;
    div.onclick = () => selectIngredient(ingredient, div);
    container.appendChild(div);
  });
}

/* ===============================
   ด่านบอสพิเศษ
================================= */
function showBossStage() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  // ใช้เมนูบอส
  const bossMenu = Object.keys(bossRecipes)[0];
  gameState.currentOrder = bossMenu;
  document.getElementById("order-dish").textContent = bossMenu;

  // แสดงวัตถุดิบ (6 ของจริง + วัตถุดิบลวง)
  const container = document.getElementById("ingredients");
  container.innerHTML = "";

  const requiredIngredients = bossRecipes[bossMenu];

  // ดึง distractors มาเพิ่มให้สับสน
  const distractors = allIngredients.filter(
    (i) => !requiredIngredients.includes(i)
  );
  const shuffledDistractors = shuffle(distractors).slice(
    0,
    12 - requiredIngredients.length
  );

  let finalIngredients = [...requiredIngredients, ...shuffledDistractors];
  finalIngredients = shuffle(finalIngredients);

  finalIngredients.forEach((ingredient) => {
    const div = document.createElement("div");
    div.className = "ingredient";
    const parts = ingredient.split(" ");
    const emoji = parts[0];
    const name = parts.slice(1).join(" ");
    div.innerHTML = `<div class="emoji">${emoji}</div><div class="name">${name}</div>`;
    div.onclick = () => selectIngredient(ingredient, div);
    container.appendChild(div);
  });

  // ตั้งเวลาให้น้อยลงเพื่อเพิ่มความท้าทาย
  gameState.timeLeft = 45;
  startTimer();

  // แสดงข้อความพิเศษ
  document.getElementById("message").textContent =
    "🔥 ด่านบอส! ทำเมนูนี้ให้สำเร็จเพื่อเป็น Master Chef!";
}

function selectIngredient(ingredient, element) {
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    gameState.selectedIngredients = gameState.selectedIngredients.filter(
      (i) => i !== ingredient
    );
  } else {
    element.classList.add("selected");
    gameState.selectedIngredients.push(ingredient);
  }
  updateCookingArea();
  document.getElementById("cook-btn").disabled =
    gameState.selectedIngredients.length === 0;
}

function updateCookingArea() {
  const area = document.getElementById("cooking-area");
  if (gameState.selectedIngredients.length === 0) {
    area.textContent = "🍳 เลือกวัตถุดิบเพื่อทำอาหาร";
  } else {
    const emojis = gameState.selectedIngredients.map(
      (ingredient) => ingredient.split(" ")[0]
    );
    area.textContent = "🔥 " + emojis.join(" + ");
  }
}

function resetIngredients() {
  gameState.selectedIngredients = [];
  document
    .querySelectorAll(".ingredient")
    .forEach((el) => el.classList.remove("selected"));
  updateCookingArea();
  document.getElementById("cook-btn").disabled = true;
}

function cookDish() {
  // รวมสูตรปกติ + สูตรบอส
  const allRecipes = { ...recipes, ...bossRecipes };
  const requiredIngredients = allRecipes[gameState.currentOrder] || [];

  const hasAll = requiredIngredients.every((req) =>
    gameState.selectedIngredients.includes(req)
  );

  clearInterval(gameState.timer);

  if (
    hasAll &&
    gameState.selectedIngredients.length === requiredIngredients.length
  ) {
    showResult(true);
  } else {
    showResult(false);
  }
}

function showResult(success) {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  const resultContent = document.getElementById("result-content");

  const allRecipes = { ...recipes, ...bossRecipes };
  const requiredIngredients = allRecipes[gameState.currentOrder] || [];

  if (success) {
    // 🏆 ถ้าเป็นด่านบอส → จบเกมเลย
    if (gameState.bossStage) {
      resultContent.innerHTML = `
        <h2 class="success">👑 คุณคือ Master Chef!</h2>
        <p>คุณผ่านด่านบอสพิเศษแล้ว ได้กลายเป็นตำนาน!</p>
      `;
      return; // ❗ จบเกม ไม่ไปบวก fame/level ต่อ
    }

    // ด่านปกติ
    const reward = Math.floor(Math.random() * 50) + 30;
    gameState.fame += 10;
    gameState.coins += reward;
    gameState.level += 1;

    if (menuByLevel[gameState.level]) {
      gameState.unlockedRecipes = [
        ...new Set([
          ...gameState.unlockedRecipes,
          ...menuByLevel[gameState.level],
        ]),
      ];
      gameState.recipes = gameState.unlockedRecipes.length;
    }

    resultContent.innerHTML = `
      <h2 class="success">🎉 สำเร็จ!</h2>
      <p>คุณทำ ${gameState.currentOrder} สำเร็จแล้ว!</p>
      <p>+10 ชื่อเสียง และ +${reward} เหรียญ</p>
    `;
  } else {
    // ล้มเหลว → หักเหรียญ
    const penalty = Math.min(20, gameState.coins);
    gameState.coins -= penalty;

    resultContent.innerHTML = `
      <h2 class="error">💔 ล้มเหลว!</h2>
      <p>สูตร ${
        gameState.currentOrder
      } ต้องใช้:<br><strong>${requiredIngredients.join(" + ")}</strong></p>
      <p>⚠️ คุณเสียเหรียญไป ${penalty} เหรียญ</p>
    `;
  }

  updateStats();
}

function nextLevel() {
  // 🔎 เช็กว่าเข้าสู่ Boss Stage หรือยัง
  if (gameState.fame >= 100 && !gameState.bossStage) {
    gameState.bossStage = true; // ตั้ง flag
    showBossStage(); // ไปฟังก์ชันด่านบอส
    return;
  }

  // ด่านปกติ
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  generateOrder();
  resetIngredients();
  createIngredients();

  if (gameState.level === 1) gameState.timeLeft = 90;
  else if (gameState.level === 2) gameState.timeLeft = 80;
  else if (gameState.level === 3) gameState.timeLeft = 70;
  else if (gameState.level === 4) gameState.timeLeft = 60;
  else gameState.timeLeft = 50;

  startTimer();
  updateLevelDisplay();
}

function viewRecipes() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("recipe-screen").classList.remove("hidden");
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = gameState.unlockedRecipes
    .map(
      (r) => `
    <div class="recipe-item">
      <strong>${r}</strong><br>
      วัตถุดิบ: ${recipes[r].join(", ")}
    </div>
  `
    )
    .join("");
}

function backToGame() {
  document.getElementById("recipe-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
}

function backToHome() {
  // หยุดเวลา ถ้ามี
  clearInterval(gameState.timer);
  gameState.timer = null;

  // ซ่อนทุกหน้าจอของเกม
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("recipe-screen").classList.add("hidden");
  document.getElementById("shop-popup").classList.add("hidden");
  document.getElementById("tutorial-overlay").classList.add("hidden");

  // เคลียร์การเลือกวัตถุดิบในรอบที่เล่นอยู่ (ถ้ามี)
  try {
    resetIngredients();
  } catch (e) {}

  // (ถ้าต้องการให้ตัวเลขเวลาบนหน้าจอเกมกลับไปตรงกับ state ปัจจุบัน)
  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.textContent = `⏰ เวลา: ${gameState.timeLeft} วินาที`;
  }

  // แสดงหน้าเริ่มเกม
  document.getElementById("start-screen").classList.remove("hidden");

  // อัปเดตแถบสถิติ (ชื่อเสียง/เหรียญ/สูตร/ไอเท็ม)
  updateStats();
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  clearInterval(gameState.timer);
  gameState.timer = setInterval(() => {
    gameState.timeLeft -= 1;
    timerElement.textContent = `⏰ เวลา: ${gameState.timeLeft} วินาที`;
    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer);
      showResult(false);
    }
  }, 1000);
}

function updateLevelDisplay() {
  const levelElement = document.getElementById("current-level");
  if (levelElement) {
    levelElement.textContent = gameState.level;
  }
}

function updateStats() {
  document.getElementById("fame").textContent = gameState.fame;
  document.getElementById("coins").textContent = gameState.coins;
  document.getElementById("recipes").textContent = gameState.recipes;

  const hintStat = document.getElementById("hint-count");
  const clearStat = document.getElementById("clear-count");
  const shuffleStat = document.getElementById("shuffle-count");

  if (hintStat) hintStat.textContent = inventory.hint;
  if (clearStat) clearStat.textContent = inventory.clear;
  if (shuffleStat) shuffleStat.textContent = inventory.shuffle;
}

/* ===============================
   Tutorial System
================================= */
let currentTutorialStep = 0;

const tutorialSteps = [
  { title: "🎯 เป้าหมายของเกม", content: "<p>ทำอาหารตามออเดอร์ให้ทันเวลา</p>" },
  {
    title: "📋 ดูออเดอร์",
    content: "<p>ตรวจสอบชื่อเมนูด้านบนและจำวัตถุดิบ</p>",
  },
  {
    title: "🧄 เลือกวัตถุดิบ",
    content: "<p>คลิกวัตถุดิบในตารางให้ครบตามสูตร</p>",
  },
  { title: "🔥 ทำอาหาร", content: "<p>กดปุ่ม 'ทำอาหาร' เพื่อดูผลลัพธ์</p>" },
  { title: "⏰ จัดการเวลา", content: "<p>เลือกให้ครบก่อนเวลาหมด!</p>" },
  { title: "🚀 พร้อมลุย!", content: "<p>ไปเป็นเชฟ Master กันเถอะ!</p>" },
];

function showTutorial() {
  currentTutorialStep = 0;
  document.getElementById("tutorial-overlay").classList.remove("hidden");
  displayTutorialStep();
}

function skipTutorial() {
  document.getElementById("tutorial-overlay").classList.add("hidden");
}

function displayTutorialStep() {
  const step = tutorialSteps[currentTutorialStep];
  const content = document.getElementById("tutorial-content");
  content.innerHTML = `
    <h2>${step.title}</h2>
    <div>${step.content}</div>
    <div style="margin-top:20px;">
      ${
        currentTutorialStep > 0
          ? '<button class="btn btn-secondary" onclick="previousTutorialStep()">← ก่อนหน้า</button>'
          : ""
      }
      ${
        currentTutorialStep < tutorialSteps.length - 1
          ? '<button class="btn btn-primary" onclick="nextTutorialStep()">ถัดไป →</button>'
          : '<button class="btn btn-success" onclick="finishTutorial()">🚀 เริ่มเกม!</button>'
      }
    </div>
  `;
}

function nextTutorialStep() {
  if (currentTutorialStep < tutorialSteps.length - 1) {
    currentTutorialStep++;
    displayTutorialStep();
  }
}

function previousTutorialStep() {
  if (currentTutorialStep > 0) {
    currentTutorialStep--;
    displayTutorialStep();
  }
}

function finishTutorial() {
  document.getElementById("tutorial-overlay").classList.add("hidden");
  startGame();
}

function openShop() {
  document.getElementById("shop-popup").classList.remove("hidden");
}
function closeShop() {
  document.getElementById("shop-popup").classList.add("hidden");
}
function buyItem(type) {
  const cost = { hint: 3, clear: 5, shuffle: 7 }[type];
  if (gameState.coins >= cost) {
    gameState.coins -= cost;
    inventory[type] = (inventory[type] || 0) + 1;
    updateStats();
    alert(`✅ ซื้อ ${type} แล้ว คุณมี ${inventory[type]} ชิ้น`);
  } else {
    alert("เหรียญไม่พอ!");
  }
}

/* เพิ่มคำสั่งใช้ไอเท็ม (คุณสามารถสร้างปุ่มเอง แล้วเชื่อมกับฟังก์ชันเหล่านี้) */
function useHint() {
  if (inventory.hint > 0) {
    inventory.hint--;

    const answer = recipes[gameState.currentOrder];
    if (!answer || answer.length === 0) return;

    // ล้าง hint เดิมก่อน
    document
      .querySelectorAll(".ingredient.hint")
      .forEach((el) => el.classList.remove("hint"));

    // เลือกวัตถุดิบจากสูตรแบบสุ่ม
    const randomIngredient = answer[Math.floor(Math.random() * answer.length)];

    // หา element ที่ตรงกับ ingredient
    const ingredientDivs = document.querySelectorAll(".ingredient");
    ingredientDivs.forEach((div) => {
      const name = div.querySelector(".name")?.textContent;
      const emoji = div.querySelector(".emoji")?.textContent;
      if (`${emoji} ${name}` === randomIngredient) {
        div.classList.add("hint");
      }
    });

    // แสดงข้อความใน message box
    document.getElementById("message").textContent =
      "💡 Hint: มีวัตถุดิบถูกต้องถูกไฮไลท์แล้ว!";
    updateStats();
  } else {
    document.getElementById("message").textContent = "❌ ไม่มี Hint แล้ว!";
  }
}

function useClear() {
  if (inventory.clear > 0) {
    inventory.clear--;
    resetIngredients();
    updateStats();
  } else alert("ไม่มี Clear แล้ว!");
}

function useShuffle() {
  if (inventory.shuffle > 0) {
    inventory.shuffle--;
    createIngredients();
    updateStats();
  } else alert("ไม่มี Shuffle แล้ว!");
}
