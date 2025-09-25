/* ===============================
   สูตรอาหารตามเลเวล (1 → 5 วัตถุดิบ)
================================= */
const recipes = {
  // ====== เลเวล 1: ง่ายสุด (1 วัตถุดิบ) ======
  '🥥 น้ำกะทิ': ['🥥 กะทิ'],
  '🍚 ข้าวหอม': ['🍚 ข้าวหอม'],
  '🍌 กล้วยหิน': ['🍌 กล้วยหิน'],

  // ====== เลเวล 2: ง่าย (2 วัตถุดิบ) ======
  '🍗 ไก่กอและ': ['🍗 เนื้อไก่','🌶️ เครื่องแกงใต้'],
  '🥚 ไข่ต้ม': ['🥚 ไข่','🥢 ซีอิ๊ว'],
  '🍳 ไข่ดาว': ['🥚 ไข่','🛢️ น้ำมัน'],

  // ====== เลเวล 3: ง่าย–กลาง (3 วัตถุดิบ) ======
  '🍚 ข้าวยำปักษ์ใต้': ['🍚 ข้าวหอม','🌿 สมุนไพรซอย','🐟 น้ำบูดู'],
  '🥗 ส้มตำ': ['🥒 มะละกอ','🌿 ถั่วฝักยาว','🌶️ พริก'],
  '🍤 ข้าวผัดกุ้ง': ['🍚 ข้าวสวย','🍤 กุ้ง','🥚 ไข่'],

  // ====== เลเวล 4: กลาง (4 วัตถุดิบ) ======
  '🍛 แกงไก่สะตอ': ['🍗 เนื้อไก่','🌱 สะตอ','🥥 กะทิ','🌶️ เครื่องแกงใต้'],
  '🍤 ต้มยำกุ้ง': ['🍤 กุ้ง','🌾 ตะไคร้','🍃 ใบมะกรูด','🌶️ พริก'],
  '🌿 ผัดกะเพราไก่': ['🍗 เนื้อไก่','🌿 ใบกะเพรา','🌶️ พริก','🧄 กระเทียม'],

  // ====== เลเวล 5: ยาก (5 วัตถุดิบ) ======
  '🍲 แกงเขียวหวาน': ['🍗 เนื้อไก่','🥥 กะทิ','🍆 มะเขือ','🌶️ พริกแกงเขียว','🍃 ใบมะกรูด'],
  '🐟 ซุปหัวปลา': ['🐟 หัวปลา','🌾 ขมิ้น','🌾 ตะไคร้','🍋 น้ำมะนาว','🧄 กระเทียม'],
  '🍛 แกงส้มใต้': ['🐟 ปลา','🌾 ขมิ้น','🥭 มะม่วงดิบ','🌶️ เครื่องแกงใต้','🥬 ผักพื้นบ้าน']
};

/* วัตถุดิบทั้งหมด */
const allIngredients = [
  // พื้นฐาน / ภาคใต้
  '🍗 เนื้อไก่','🥥 กะทิ','🌾 ขมิ้น','🌶️ เครื่องแกงใต้',
  '🍚 ข้าวหอม','🍚 ข้าวสวย','🌿 สมุนไพรซอย','🐟 น้ำบูดู','🌱 สะตอ',
  '🍌 กล้วยหิน','🍤 กุ้ง','🐟 ปลา','🐟 หัวปลา',

  // ผัก/สมุนไพร
  '🌿 ใบกะเพรา','🍃 ใบมะกรูด','🥬 ผักพื้นบ้าน','🥒 มะละกอ',
  '🌿 ถั่วฝักยาว','🍆 มะเขือ','🥭 มะม่วงดิบ',

  // เครื่องปรุง
  '🧄 กระเทียม','🌶️ พริก','🌶️ พริกแกงเขียว','🥢 ซีอิ๊ว','🛢️ น้ำมัน',
  '🍋 น้ำมะนาว',

  // ทั่วไป
  '🥚 ไข่'
];

/* เมนูปลดล็อกตามเลเวล */
const menuByLevel = {
  1: ['🥥 น้ำกะทิ','🍚 ข้าวหอม','🍌 กล้วยหิน'],
  2: ['🍗 ไก่กอและ','🥚 ไข่ต้ม','🍳 ไข่ดาว'],
  3: ['🍚 ข้าวยำปักษ์ใต้','🥗 ส้มตำ','🍤 ข้าวผัดกุ้ง'],
  4: ['🍛 แกงไก่สะตอ','🍤 ต้มยำกุ้ง','🌿 ผัดกะเพราไก่'],
  5: ['🍲 แกงเขียวหวาน','🐟 ซุปหัวปลา','🍛 แกงส้มใต้']
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
  unlockedRecipes: [...menuByLevel[1]]
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
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  generateOrder();
  createIngredients();
  startTimer();
  updateStats();
  updateLevelDisplay();
}

function generateOrder() {
  const availableMenus = menuByLevel[gameState.level] || menuByLevel[5];
  const randomMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
  gameState.currentOrder = randomMenu;
  document.getElementById('order-dish').textContent = randomMenu;
}

function createIngredients() {
  const container = document.getElementById('ingredients');
  container.innerHTML = '';

  const requiredIngredients = recipes[gameState.currentOrder] || [];

  // สร้างวัตถุดิบลวง
  const distractors = allIngredients.filter(i => !requiredIngredients.includes(i));
  const shuffledDistractors = shuffle(distractors).slice(0, 12 - requiredIngredients.length);

  // รวมและสุ่มลำดับ
  let finalIngredients = [...requiredIngredients, ...shuffledDistractors];
  finalIngredients = shuffle(finalIngredients);

  // แสดงผล
  finalIngredients.forEach(ingredient => {
    const div = document.createElement('div');
    div.className = 'ingredient';
    const parts = ingredient.split(' ');
    const emoji = parts[0];
    const name = parts.slice(1).join(' ');
    div.innerHTML = `<div class="emoji">${emoji}</div><div class="name">${name}</div>`;
    div.onclick = () => selectIngredient(ingredient, div);
    container.appendChild(div);
  });
}

function selectIngredient(ingredient, element) {
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    gameState.selectedIngredients = gameState.selectedIngredients.filter(i => i !== ingredient);
  } else {
    element.classList.add('selected');
    gameState.selectedIngredients.push(ingredient);
  }
  updateCookingArea();
  document.getElementById('cook-btn').disabled = gameState.selectedIngredients.length === 0;
}

function updateCookingArea() {
  const area = document.getElementById('cooking-area');
  if (gameState.selectedIngredients.length === 0) {
    area.textContent = '🍳 เลือกวัตถุดิบเพื่อทำอาหาร';
  } else {
    const emojis = gameState.selectedIngredients.map(ingredient => ingredient.split(' ')[0]);
    area.textContent = '🔥 ' + emojis.join(' + ');
  }
}

function resetIngredients() {
  gameState.selectedIngredients = [];
  document.querySelectorAll('.ingredient').forEach(el => el.classList.remove('selected'));
  updateCookingArea();
  document.getElementById('cook-btn').disabled = true;
}

function cookDish() {
  const requiredIngredients = recipes[gameState.currentOrder] || [];
  const hasAll = requiredIngredients.every(req => gameState.selectedIngredients.includes(req));
  clearInterval(gameState.timer);
  if (hasAll && gameState.selectedIngredients.length === requiredIngredients.length) {
    showResult(true);
  } else {
    showResult(false);
  }
}

function showResult(success) {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  const resultContent = document.getElementById('result-content');

  if (success) {
    const reward = Math.floor(Math.random() * 50) + 30;
    gameState.fame += 10;
    gameState.coins += reward;
    gameState.level += 1;

    if (menuByLevel[gameState.level]) {
      gameState.unlockedRecipes = [
        ...new Set([...gameState.unlockedRecipes, ...menuByLevel[gameState.level]])
      ];
      gameState.recipes = gameState.unlockedRecipes.length;
    }

    resultContent.innerHTML = `
      <h2 class="success">🎉 สำเร็จ!</h2>
      <p>คุณทำ ${gameState.currentOrder} สำเร็จแล้ว!</p>
      <p>+10 ชื่อเสียง และ +${reward} เหรียญ</p>
    `;
  } else {
    const requiredIngredients = recipes[gameState.currentOrder] || [];
    resultContent.innerHTML = `
      <h2 class="error">💔 ล้มเหลว!</h2>
      <p>สูตร ${gameState.currentOrder} ต้องใช้:<br><strong>${requiredIngredients.join(' + ')}</strong></p>
    `;
  }

  updateStats();
}

function nextLevel() {
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
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
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('recipe-screen').classList.remove('hidden');
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = gameState.unlockedRecipes.map(r => `
    <div class="recipe-item">
      <strong>${r}</strong><br>
      วัตถุดิบ: ${recipes[r].join(', ')}
    </div>
  `).join('');
}

function backToGame() {
  document.getElementById('recipe-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
}

function startTimer() {
  const timerElement = document.getElementById('timer');
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
  const levelElement = document.getElementById('current-level');
  if (levelElement) {
    levelElement.textContent = gameState.level;
  }
}

function updateStats() {
  document.getElementById('fame').textContent = gameState.fame;
  document.getElementById('coins').textContent = gameState.coins;
  document.getElementById('recipes').textContent = gameState.recipes;
}

/* ===============================
   Tutorial System
================================= */
let currentTutorialStep = 0;

const tutorialSteps = [
  { title: "🎯 เป้าหมายของเกม", content: "<p>ทำอาหารตามออเดอร์ให้ทันเวลา</p>" },
  { title: "📋 ดูออเดอร์", content: "<p>ตรวจสอบชื่อเมนูด้านบนและจำวัตถุดิบ</p>" },
  { title: "🧄 เลือกวัตถุดิบ", content: "<p>คลิกวัตถุดิบในตารางให้ครบตามสูตร</p>" },
  { title: "🔥 ทำอาหาร", content: "<p>กดปุ่ม 'ทำอาหาร' เพื่อดูผลลัพธ์</p>" },
  { title: "⏰ จัดการเวลา", content: "<p>เลือกให้ครบก่อนเวลาหมด!</p>" },
  { title: "🚀 พร้อมลุย!", content: "<p>ไปเป็นเชฟ Master กันเถอะ!</p>" }
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
      ${currentTutorialStep > 0 ? '<button class="btn btn-secondary" onclick="previousTutorialStep()">← ก่อนหน้า</button>' : ''}
      ${currentTutorialStep < tutorialSteps.length - 1 ? 
        '<button class="btn btn-primary" onclick="nextTutorialStep()">ถัดไป →</button>' : 
        '<button class="btn btn-success" onclick="finishTutorial()">🚀 เริ่มเกม!</button>'}
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
