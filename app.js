/**
 * K-Quest: Кореан Күэст (Virtual Pet & Quiz Web App)
 * Core Controller - SPA Router, State Management, SVG Renderers, Interactive Quiz Engine
 */

class KQuestApp {
  constructor() {
    this.userData = null;
    this.currentView = 'character-selection';
    this.quizState = {
      level: 1,
      currentIdx: 0,
      words: [],
      correctCount: 0,
      goldEarned: 0,
      xpEarned: 0,
      answered: false,
      selectedBtn: null,
      isMistakeQuiz: false
    };
    
    this.wordbookTab = 'mistakes'; // 'mistakes' or 'favorites'
    
    // Virtual Gardening Config
    this.plants = {
      sakura: {
        id: 'sakura',
        name: 'Интоорын мод',
        nameEng: 'Sakura Cherry Blossom',
        desc: 'Дорнын үзэсгэлэнт интоорын мод. Зөв хариулах тусам ягаан цэцэгс хамгийн гоёмсог дэлгэрнэ.',
        traits: ['Үзэсгэлэнт', 'Хурдан дэлгэрдэг', 'Нарсанд дуртай'],
        favoriteCare: 'water',
        hatedCare: 'pruning',
        quotes: {
          idle: [
            'Интоорын мод аниргүйд ургаж байна. Хичээлээ хийж виртуал цэцэрлэгээ гэрэлтүүлэх үү?',
            'Солонгос хэл сурах бүрт миний мөчир дээр шинэ ягаан цэцэгс дэлгэрэх болно.',
            'Намайг бага зэрэг услах уу? Нахиа маань чийг хүсэж байна.',
            'Солонгос хэлийг хамтдаа тууштай сурч, энэ модоо үзэсгэлэнтэй болгоцгооё!'
          ],
          happy: 'Маш сайн байна! Яг зөв хариуллаа! Надад шинэ ягаан цэцэг дэлгэрлээ 🌸!',
          sad: 'Зүгээр ээ найз минь, алдаа бол шинэ навч нахиалах үржил шимтэй хөрс юм.',
          eatFav: 'Вайй! Цэвэр ус намайг маш их сэргээж байна! Гүнээ баярлалаа!',
          eatDislike: 'Намайг хэт тайрах нь миний залуу мөчрүүдийг өвтгөж байна...',
          eatNormal: 'Амттай шим тэжээл! Бид улам бүр өндөр ургах болно.',
          levelUp: 'Ураа! Манай мод улам бүр өндөр ургаж, дараагийн шат руугаа шилжлээ 🌟!'
        }
      },
      plum: {
        id: 'plum',
        name: 'Чавганы мод',
        nameEng: 'Plum Blossom',
        desc: 'Өвлийн хүйтнийг тэсэж ургадаг Солонгосын уламжлалт бэлгэдэл бүхий чавганы цэцэгт мод.',
        traits: ['Тэвчээртэй', 'Шаргуу ургадаг', 'Шим тэжээлд дуртай'],
        favoriteCare: 'fertilizer',
        hatedCare: 'music',
        quotes: {
          idle: [
            'Улаан, ягаан өнгийн чавганы цэцэгс дэлгэрэхэд бэлэн байна!',
            'Хичээл зүтгэл бол өвлийн хүйтнийг даван ургах хамгийн шилдэг шим тэжээл юм.',
            'Надад бага зэрэг шим тэжээл өгөөч? Ургалт маань илүү хүчирхэгжинэ.',
            'Бид өнөөдөр хичнээн шинэ үг цээжлэх вэ?'
          ],
          happy: 'Яг зөв хариуллаа! Чавганы модны мөчир дээр шинэ ягаан цэцэг дэлгэрэв!',
          sad: 'Өө, харамсалтай байна! Зүгээр ээ, дараагийн асуултанд тэвчээртэй хариулаарай.',
          eatFav: 'Гайхалтай! Энэ шим тэжээл миний үндсийг гайхалтай тэлж байна!',
          eatDislike: 'Чанга сонгодог хөгжим миний навчийг бага зэрэг чичрүүлж байна.',
          eatNormal: 'Маш сайн арчилгаа байна найз минь, баярлалаа!',
          levelUp: 'Гайхалтай тэвчээр! Бидний мод түвшин ахиж, улам сүрлэг боллоо!'
        }
      },
      magnolia: {
        id: 'magnolia',
        name: 'Замбага цэцэг',
        nameEng: 'Magnolia',
        desc: 'Цагаан болон ягаан өнгийн томоохон гоёмсог дэлбээтэй, хаврын элч болсон замбага цэцэгт мод.',
        traits: ['Ухаалаг', 'Хаврын элч', 'Нарны гэрэлд дуртай'],
        favoriteCare: 'sunlight',
        hatedCare: 'water',
        quotes: {
          idle: [
            'Нарны гэрэл намайг дулаацуулж байна, хичээлээ эхлүүлэх үү?',
            'Замбага цэцэг ухаан бодлыг цэлмэг байлгахад тусална шүү.',
            'Намайг нарны гэрлээр арчлаарай, би нарны туяанд дуртай.',
            'Солонгос хэлийг өдөр бүр бага багаар давтах нь хамгийн чухал.'
          ],
          happy: 'Мундаг байна! Зөв хариуллаа! Миний мөчир дээгүүр замбага цэцэгс гэрэлтлээ!',
          sad: 'Буруу байлаа, гэхдээ зүгээр ээ. Тайлбарыг нь уншаад цээжлээд аваарай.',
          eatFav: 'Хөөх! Нарны элч туяа миний навч бүрийг гэрэлтүүлж байна!',
          eatDislike: 'Хэт их ус миний үндсийг ялзруулж болзошгүй тул услахдаа анхаараарай.',
          eatNormal: 'Амттай арчилгаа байна, баярлалаа найз минь!',
          levelUp: 'Хаврын дулаан элч! Бидний замбага мод улам томорлоо!'
        }
      },
      rose: {
        id: 'rose',
        name: 'Сарнайн бут',
        nameEng: 'Rose Bush',
        desc: 'Үзэсгэлэнт өнгөлөг, анхилуун үнэрт сарнайн бут. Хайр халамжаар тэжээгддэг.',
        traits: ['Анхилуун', 'Хайранд дуртай', 'Эрх танхил'],
        favoriteCare: 'love',
        hatedCare: 'fertilizer',
        quotes: {
          idle: [
            'Анхилуун сарнайн бут ургаж байна. Надад бага зэрэг хайр бэлэглэх үү?',
            'Солонгос хэл сурах нь яг л цэцэг тарих шиг сэтгэл сэргэм ажил шүү.',
            'Нахиа маань хайр халамж хүсэж байна, намайг илж өгөөч?',
            'Өнөөдөр хамтдаа шинэ үг цээжлээд цэцэрлэгээ дүүргэцгээе!'
          ],
          happy: 'Яг зөв! Манай найз хамгийн ухаантай нь шүү, үзэсгэлэнт сарнай дэлгэрлээ!',
          sad: 'Өө... Харамсалтай байна. Зүгээр ээ, сарнайн өргөс ч гэсэн гоо үзэсгэлэн байдаг шиг алдаанаасаа суралцаарай.',
          eatFav: 'Аяа! Таны халуун хайр халамж миний бут бүрийг дулаацууллаа!',
          eatDislike: 'Хэт их хүчтэй химийн бордоо миний дэлбээг гандаж байна...',
          eatNormal: 'Маш сайхан сэргэлээ, баярлалаа найз минь!',
          levelUp: 'Гайхалтай! Сарнайн бут маань дэлгэрч, улам үзэсгэлэнтэй боллоо!'
        }
      },
      bonsai: {
        id: 'bonsai',
        name: 'Бонсай нарс',
        nameEng: 'Bonsai Pine',
        desc: 'Олон зуун жилийн тэвчээр, нарийн тайралтаар бүрэлддэг бяцхан одой нарс мод.',
        traits: ['Тэвчээртэй', 'Нарийн тайралтад дуртай', 'Сонгодог хөгжимд дуртай'],
        favoriteCare: 'pruning',
        hatedCare: 'love',
        quotes: {
          idle: [
            'Нарс мод аниргүйд ургадаг бөгөөд тэвчээрийг бэлгэддэг.',
            'Мөчир бүрийг нарийн тайрч, цэгцтэй ургуулах нь ухааны дасгал юм.',
            'Надад бага зэрэг тайралт хийж, хэлбэрийг маань засч өгөх үү?',
            'Солонгос хэлийг сурахад ч бас Бонсай шиг нарийн тэвчээр шаардагдана.'
          ],
          happy: 'Маш зөв! Таны ой тогтоолт Бонсай шиг нарийн бөгөөд гайхалтай байна!',
          sad: 'Зүгээр дээ, Бонсайн мөчрийг буруу тайрсан ч дахин нахиалдаг шиг дахиад оролдоорой.',
          eatFav: 'Шилдэг тайралт! Миний мөчрүүд маш цэгцтэй бөгөөд үзэсгэлэнтэй хэлбэрт орлоо!',
          eatDislike: 'Намайг хэт их эрхлүүлэх нь Бонсайн хатуу чанд зан чанарт тохирохгүй ээ.',
          eatNormal: 'Гэдэс маань цадаж, үндэс маань бэхжлээ, баярлалаа!',
          levelUp: 'Тэвчээрийн дээд зэрэг! Манай Бонсай нарс түвшин ахиж илүү сүрлэг боллоо!'
        }
      },
      orchid: {
        id: 'orchid',
        name: 'Цахирмаа цэцэг',
        nameEng: 'Orchid',
        desc: 'Сонгодог уянгалаг хөгжимд дуртай, тансаг бөгөөд ховор цахирмаа цэцэг.',
        traits: ['Тансаг', 'Сонгодог хөгжимд дуртай', 'Аниргүй'],
        favoriteCare: 'music',
        hatedCare: 'sunlight',
        quotes: {
          idle: [
            'Цахирмаа цэцэг уянгалаг сонгодог хөгжимд маш дуртай.',
            'Намуухан цэцэрлэгтээ шинэ үг цээжлээд цэцгээ ургуулцгаая.',
            'Надад сонгодог хөгжим тоглуулж өгөөч? Миний дэлбээ нээгдэх болно.',
            'Солонгос хэлний хамгийн ховор үгсийг ч бид хамтдаа цээжилж чадна.'
          ],
          happy: 'Шшш! Маш оновчтой бөгөөд зөв хариулт байна! Цахирмаа цэцэг дэлгэрч эхэллээ!',
          sad: 'Харамсалтай байна, гэхдээ алдаанаасаа сурах нь хамгийн чухал шүү.',
          eatFav: 'Ооо! Бахдам сонгодог хөгжим! Миний дэлбээ бүр хөгжмийн хэмнэлээр уянгалан бүжиглэж байна.',
          eatDislike: 'Хэт хурц нарны гэрэл миний нарийн дэлбээг шатааж байна, намайг сүүдэрт тавиарай.',
          eatNormal: 'Маш уянгалаг сайхан арчилгаа байна, баярлалаа найз минь!'
        }
      }
    };
    
    // Set level up quote separately to avoid missing properties
    this.plants.orchid.quotes.levelUp = 'Гайхалтай! Бидний цахирмаа цэцэг түвшин ахиж илүү гоёмсог дэлбээлж байна!';
    this.plants.orchid.quotes.eatDislike = 'Би наранд дургүй ээ, сүүдэрт тавиад хөгжим тоглуулаарай!';

    // Shop Items Config (Gardening Theme)
    this.shopItems = [
      { id: 'water', name: '💧 Цэвэр ус', cost: 10, hunger: 20, happiness: 10, desc: 'Ургамлыг услахад хэрэглэх цэвэр ус' },
      { id: 'fertilizer', name: '🧪 Шим тэжээл', cost: 25, hunger: 35, happiness: 20, desc: 'Үндэс ургалтыг дэмжих супер бордоо' },
      { id: 'sunlight', name: '☀️ Нарны гэрэл', cost: 15, hunger: 10, happiness: 25, desc: 'Фотосинтез явуулахад чухал нарны туяа' },
      { id: 'love', name: '💖 Халамж', cost: 10, hunger: 15, happiness: 15, desc: 'Ургамалдаа хайр бэлэглэж ургуулах' },
      { id: 'pruning', name: '✂️ Тайралт', cost: 20, hunger: 15, happiness: 20, desc: 'Мөчрийг зөв хэлбэржүүлж арчлах хэрэгсэл' },
      { id: 'music', name: '🎵 Сонгодог хөгжим', cost: 20, hunger: 10, happiness: 30, desc: 'Цэцэгт зориулсан уянгалаг аялгуу' }
    ];

    this.init();
  }

  // --- Core Lifecycle ---
  init() {
    this.loadUserData();
    this.checkDailyStreak();
    this.setupEventListeners();
    this.updateHeaderUI();
  }

  beginJourney() {
    const landing = document.getElementById('velorah-landing');
    if (landing) {
      landing.classList.add('hidden');
    }
    
    // Play premium synthesized transition tone
    this.playAudioSynthTone(523.25, 0.08); // C5
    setTimeout(() => this.playAudioSynthTone(659.25, 0.08), 80); // E5
    setTimeout(() => this.playAudioSynthTone(783.99, 0.2), 160); // G5
    
    setTimeout(() => {
      document.body.classList.remove('landing-active');
      if (!this.userData.selectedPet) {
        this.navigateTo('character-selection');
      } else {
        this.navigateTo('dashboard');
      }
    }, 1000);
  }

  setupEventListeners() {
    // Search & Filter event listener setup
    const searchInput = document.getElementById('vocab-search');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderVocabulary());
    }
    
    const filterSelect = document.getElementById('vocab-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', () => this.renderVocabulary());
    }
  }

  loadUserData() {
    const data = localStorage.getItem('kquest_userdata');
    if (data) {
      try {
        this.userData = JSON.parse(data);
        
        // Ensure defaults exist for older schema / updates
        if (!this.userData.inventory) this.userData.inventory = {};
        if (!this.userData.favorites) this.userData.favorites = [];
        if (!this.userData.mistakes) this.userData.mistakes = [];
        if (!this.userData.streak) this.userData.streak = 0;
        if (!this.userData.correctAnswersCount) this.userData.correctAnswersCount = 0;
        if (!this.userData.totalQuestionsAnswered) this.userData.totalQuestionsAnswered = 0;
        if (this.userData.blossomCount === undefined) this.userData.blossomCount = 0;
        
        // Migration logic from Pet mode to Gardening mode
        if (this.userData.selectedPet) {
          this.userData.selectedPlant = this.userData.selectedPet;
          delete this.userData.selectedPet;
        }
        if (this.userData.selectedPlant && !this.plants[this.userData.selectedPlant]) {
          // If the older pet name (like 'rabbit') doesn't exist in plants, map to 'sakura'
          if (this.userData.selectedPlant === 'rabbit') this.userData.selectedPlant = 'sakura';
          else if (this.userData.selectedPlant === 'dog') this.userData.selectedPlant = 'plum';
          else if (this.userData.selectedPlant === 'owl') this.userData.selectedPlant = 'magnolia';
          else if (this.userData.selectedPlant === 'cat') this.userData.selectedPlant = 'rose';
          else if (this.userData.selectedPlant === 'bear') this.userData.selectedPlant = 'bonsai';
          else if (this.userData.selectedPlant === 'snake') this.userData.selectedPlant = 'orchid';
          else this.userData.selectedPlant = 'sakura';
        }
        
        // Inventory Migration (carrot -> water, etc.)
        const inv = this.userData.inventory;
        if (inv.carrot !== undefined) { inv.water = (inv.water || 0) + inv.carrot; delete inv.carrot; }
        if (inv.bone !== undefined) { inv.pruning = (inv.pruning || 0) + inv.bone; delete inv.bone; }
        if (inv.berries !== undefined) { inv.fertilizer = (inv.fertilizer || 0) + inv.berries; delete inv.berries; }
        if (inv.fish !== undefined) { inv.sunlight = (inv.sunlight || 0) + inv.fish; delete inv.fish; }
        if (inv.honey !== undefined) { inv.love = (inv.love || 0) + inv.honey; delete inv.honey; }
        if (inv.apple !== undefined) { inv.music = (inv.music || 0) + inv.apple; delete inv.apple; }
        
        // Fill initial inventory with at least 1 food of each to start
        this.shopItems.forEach(item => {
          if (this.userData.inventory[item.id] === undefined) {
            this.userData.inventory[item.id] = 1;
          }
        });
      } catch (e) {
        console.error("Error loading localStorage: ", e);
        this.createDefaultUserData();
      }
    } else {
      this.createDefaultUserData();
    }
  }

  createDefaultUserData() {
    this.userData = {
      xp: 0,
      gold: 50, // Give some starting gold to shop
      streak: 1,
      lastActiveDate: new Date().toDateString(),
      selectedPlant: null,
      petStats: {
        level: 1,
        xp: 0,
        hunger: 80, // Hydration
        happiness: 90 // Vitality
      },
      inventory: {
        water: 2,
        fertilizer: 2,
        sunlight: 2,
        love: 2,
        pruning: 2,
        music: 2
      },
      favorites: [],
      mistakes: [],
      correctAnswersCount: 0,
      totalQuestionsAnswered: 0,
      blossomCount: 0
    };
    this.saveUserData();
  }

  saveUserData() {
    localStorage.setItem('kquest_userdata', JSON.stringify(this.userData));
    this.updateHeaderUI();
  }

  checkDailyStreak() {
    const today = new Date().toDateString();
    const lastActive = this.userData.lastActiveDate;
    
    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        this.userData.streak += 1;
        this.showAlert("success", `Дараалсан идэвхтэй өдөр! Өдөр тутмын цуврал: ${this.userData.streak} өдөр 🔥`);
      } else if (diffDays > 1) {
        this.userData.streak = 1;
      }
      this.userData.lastActiveDate = today;
      this.saveUserData();
    }
  }

  // --- UI Router Navigation ---
  navigateTo(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
      targetView.classList.add('active');
      this.currentView = viewName;
    }
    
    // Update active nav item
    document.querySelectorAll('.dock-item').forEach(item => {
      item.classList.remove('active');
    });
    const activeDockItem = document.getElementById(`nav-${viewName}`);
    if (activeDockItem) {
      activeDockItem.classList.add('active');
    }
    
    // Perform specialized render on entering view
    if (viewName === 'character-selection') {
      this.renderCharacterSelection();
      document.getElementById('header-status').style.display = 'none';
      document.getElementById('main-navigation-dock').style.display = 'none';
    } else {
      document.getElementById('header-status').style.display = 'flex';
      document.getElementById('main-navigation-dock').style.display = 'flex';
      
      if (viewName === 'dashboard') {
        this.renderDashboard();
      } else if (viewName === 'vocab') {
        this.renderVocabularyTabs();
        this.renderVocabulary();
      } else if (viewName === 'wordbook') {
        this.renderWordbook();
      } else if (viewName === 'shop') {
        this.renderShop();
      } else if (viewName === 'stats') {
        this.renderStats();
      }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderUI() {
    document.getElementById('global-xp').textContent = `${this.userData.xp} XP`;
    document.getElementById('global-gold').textContent = this.userData.gold;
    document.getElementById('shop-gold-display').textContent = this.userData.gold;
  }

  showAlert(type, text) {
    const mount = document.getElementById('alert-container');
    if (!mount) return;
    
    const banner = document.createElement('div');
    banner.className = `alert-banner ${type === 'error' ? 'error-banner' : ''}`;
    
    let icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'error') {
      icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }
    
    banner.innerHTML = `${icon} <span>${text}</span>`;
    mount.appendChild(banner);
    
    setTimeout(() => {
      banner.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
      setTimeout(() => banner.remove(), 300);
    }, 4000);
  }

  // --- VIEW 1: Character Selection ---
  renderCharacterSelection() {
    const mount = document.getElementById('characters-mount');
    if (!mount) return;
    
    mount.innerHTML = '';
    
    Object.values(this.plants).forEach(plant => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.onclick = () => this.selectPet(plant.id);
      
      // Traits rendering
      const traitsHTML = plant.traits.map(t => `<span class="trait-badge">${t}</span>`).join('');
      
      card.innerHTML = `
        <div class="pet-svg-container plant-pulsing" style="width:140px; height:140px; display:flex; align-items:center; justify-content:center;">
          ${this.getPlantSVG(plant.id, 1, 'idle', 0)}
        </div>
        <h3>${plant.name}</h3>
        <div class="pet-traits">${traitsHTML}</div>
        <p class="description">${plant.desc}</p>
        <button class="select-btn">Сонгох</button>
      `;
      
      mount.appendChild(card);
    });
  }

  selectPet(plantId) {
    this.userData.selectedPlant = plantId;
    this.userData.petStats = {
      level: 1,
      xp: 0,
      hunger: 80, // Hydration
      happiness: 90 // Vitality
    };
    this.userData.blossomCount = 0; // Reset blossoms for new plant
    this.saveUserData();
    this.showAlert("success", `Баяр хүргэе! Та ${this.plants[plantId].name}-ыг амжилттай тарилаа 🌱`);
    this.navigateTo('dashboard');
  }

  changeCharacter() {
    if (confirm("Ургуулах мод/цэцгээ солих уу? Одоогийн ургацын түвшин болон дэлгэрсэн цэцэгс шинэчлэгдэнэ. Сурсан үг, алт харин хэвээр үлдэнэ.")) {
      this.userData.selectedPlant = null;
      this.saveUserData();
      this.navigateTo('character-selection');
    }
  }

  // --- VIEW 2: Dashboard Room ---
  renderDashboard() {
    const plantId = this.userData.selectedPlant;
    if (!plantId) return;
    
    const plant = this.plants[plantId];
    const lvl = this.userData.petStats.level;
    
    // Render status bars
    document.getElementById('pet-lvl-lbl').textContent = `Lv. ${lvl}`;
    document.getElementById('pet-xp-lbl').textContent = `${this.userData.petStats.xp} / 100 XP`;
    document.getElementById('pet-xp-fill').style.width = `${this.userData.petStats.xp}%`;
    
    document.getElementById('pet-hunger-lbl').textContent = `${this.userData.petStats.hunger}%`;
    document.getElementById('pet-hunger-fill').style.width = `${this.userData.petStats.hunger}%`;
    
    document.getElementById('pet-happy-lbl').textContent = `${this.userData.petStats.happiness}%`;
    document.getElementById('pet-happy-fill').style.width = `${this.userData.petStats.happiness}%`;
    
    // Render main plant SVG
    const svgMount = document.getElementById('main-pet-mount');
    svgMount.innerHTML = this.getPlantSVG(plantId, lvl, 'idle', this.userData.blossomCount || 0);
    
    // Set random greeting quote
    const quotes = plant.quotes.idle;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('pet-speech-text').textContent = randomQuote;
    
    // Render inventory pills
    this.renderFoodInventoryDock();
    
    // Render dynamic petal shower for Sakura
    this.renderPetalShower(plantId);
  }

  renderPetalShower(plantId) {
    const existing = document.querySelector('.petal-container');
    if (existing) existing.remove();
    
    if (plantId !== 'sakura') return;
    
    const showcase = document.querySelector('.pet-showcase-panel');
    if (!showcase) return;
    
    const container = document.createElement('div');
    container.className = 'petal-container';
    
    for (let i = 0; i < 8; i++) {
      const petal = document.createElement('div');
      petal.className = 'falling-petal';
      petal.style.left = `${Math.random() * 80 + 10}%`;
      petal.style.top = `${Math.random() * -40 - 10}px`;
      petal.style.width = `${Math.random() * 8 + 6}px`;
      petal.style.height = `${Math.random() * 12 + 8}px`;
      petal.style.animationDelay = `${Math.random() * 6}s`;
      petal.style.animationDuration = `${Math.random() * 4 + 6}s`;
      container.appendChild(petal);
    }
    showcase.appendChild(container);
  }

  renderFoodInventoryDock() {
    const mount = document.getElementById('food-inventory-mount');
    if (!mount) return;
    mount.innerHTML = '';
    
    let hasFood = false;
    
    this.shopItems.forEach(item => {
      const count = this.userData.inventory[item.id] || 0;
      if (count > 0) {
        hasFood = true;
        const pill = document.createElement('div');
        pill.className = 'inv-item-pill';
        pill.onclick = () => this.feedPetWithItem(item.id);
        
        pill.innerHTML = `
          <span>${item.name}</span>
          <span class="count">${count}</span>
        `;
        mount.appendChild(pill);
      }
    });
    
    if (!hasFood) {
      mount.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted);">Цүнх хоосон байна. Дэлгүүрээс арчилгааны хэрэгсэл авна уу! 🛒</span>';
    }
  }

  playPetInteractive() {
    const plantId = this.userData.selectedPlant;
    const plant = this.plants[plantId];
    const lvl = this.userData.petStats.level;
    
    // Increase stats
    this.userData.petStats.happiness = Math.min(100, this.userData.petStats.happiness + 15);
    this.saveUserData();
    
    // React Animation
    const svgMount = document.getElementById('main-pet-mount');
    svgMount.innerHTML = this.getPlantSVG(plantId, lvl, 'happy', this.userData.blossomCount || 0);
    
    // Speech bubble
    document.getElementById('pet-speech-text').textContent = plant.quotes.happy;
    
    // Recalculate status bars
    document.getElementById('pet-happy-lbl').textContent = `${this.userData.petStats.happiness}%`;
    document.getElementById('pet-happy-fill').style.width = `${this.userData.petStats.happiness}%`;
    
    // Audio synthesis fallback chime
    this.playAudioSynthTone(440, 0.1);
    setTimeout(() => this.playAudioSynthTone(880, 0.15), 100);
    
    setTimeout(() => {
      if (this.currentView === 'dashboard') {
        svgMount.innerHTML = this.getPlantSVG(plantId, lvl, 'idle', this.userData.blossomCount || 0);
        document.getElementById('pet-speech-text').textContent = plant.quotes.idle[0];
      }
    }, 3000);
  }

  feedPetWithItem(itemId) {
    const plantId = this.userData.selectedPlant;
    const plant = this.plants[plantId];
    const careItem = this.shopItems.find(f => f.id === itemId);
    
    if (!careItem) return;
    
    // Check inventory count
    if ((this.userData.inventory[itemId] || 0) <= 0) {
      this.showAlert('error', 'Цүнхэнд энэ хэрэгсэл дууссан байна.');
      return;
    }
    
    // Consume item
    this.userData.inventory[itemId]--;
    
    // Compute nutrition effects
    let hungerGain = careItem.hunger;
    let happinessGain = careItem.happiness;
    let quote = plant.quotes.eatNormal;
    
    if (plant.favoriteCare === itemId) {
      hungerGain = Math.round(hungerGain * 1.25);
      happinessGain = happinessGain * 2;
      quote = plant.quotes.eatFav;
      this.userData.xp += 15; // Extra bonus XP
      this.userData.petStats.xp += 15;
    } else if (plant.hatedCare === itemId) {
      hungerGain = Math.round(hungerGain * 0.7);
      happinessGain = Math.round(happinessGain * 0.4);
      quote = plant.quotes.eatDislike;
    }
    
    this.userData.petStats.hunger = Math.min(100, this.userData.petStats.hunger + hungerGain);
    this.userData.petStats.happiness = Math.min(100, this.userData.petStats.happiness + happinessGain);
    
    // Check for Plant Level up
    this.checkPetLevelUp();
    
    this.saveUserData();
    
    // Premium Water ripple / Care effect
    this.createWaterRippleEffect();
    
    // Play Eating animations
    const svgMount = document.getElementById('main-pet-mount');
    const lvl = this.userData.petStats.level;
    svgMount.innerHTML = this.getPlantSVG(plantId, lvl, 'eating', this.userData.blossomCount || 0);
    document.getElementById('pet-speech-text').textContent = quote;
    
    // Sound effects
    this.playAudioSynthTone(300, 0.08);
    setTimeout(() => this.playAudioSynthTone(350, 0.08), 80);
    setTimeout(() => this.playAudioSynthTone(400, 0.08), 160);
    
    // Refresh GUI
    this.renderDashboard();
    
    setTimeout(() => {
      if (this.currentView === 'dashboard') {
        svgMount.innerHTML = this.getPlantSVG(plantId, lvl, 'idle', this.userData.blossomCount || 0);
        document.getElementById('pet-speech-text').textContent = plant.quotes.idle[0];
      }
    }, 4000);
  }

  createWaterRippleEffect() {
    const showcase = document.querySelector('.pet-showcase-panel');
    if (!showcase) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'watering-ripple';
    ripple.style.left = '50%';
    ripple.style.top = '70%';
    showcase.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
  }

  playFeedAnimation() {
    // Trigger feeding with the first available care item in inventory
    const inventory = this.userData.inventory;
    const availableCare = Object.keys(inventory).find(k => inventory[k] > 0);
    
    if (availableCare) {
      this.feedPetWithItem(availableCare);
    } else {
      this.showAlert("error", "Танд арчилгааны хэрэгсэл байхгүй байна. Дэлгүүрээс авна уу! 🛒");
      this.navigateTo('shop');
    }
  }

  checkPetLevelUp() {
    if (this.userData.petStats.xp >= 100) {
      this.userData.petStats.xp -= 100;
      this.userData.petStats.level += 1;
      this.userData.xp += 50; // Big bonus
      
      const plantId = this.userData.selectedPlant;
      const plant = this.plants[plantId];
      
      setTimeout(() => {
        this.showAlert("success", `Маш сайн байна! ${plant.name}-ийн түвшин нэмэгдэж Lv. ${this.userData.petStats.level} боллоо 🌱 (+50 XP Бонус)`);
        document.getElementById('pet-speech-text').textContent = plant.quotes.levelUp;
        this.playAudioSynthTone(523.25, 0.15); // C5
        setTimeout(() => this.playAudioSynthTone(659.25, 0.15), 150); // E5
        setTimeout(() => this.playAudioSynthTone(783.99, 0.3), 300); // G5
      }, 500);
    }
  }

  // --- VIEW 3: Vocabulary Bank ---
  renderVocabularyTabs() {
    const mount = document.getElementById('vocab-level-tabs');
    if (!mount) return;
    mount.innerHTML = '';
    
    // Ensure we render Level 1 to 6 tabs
    for (let l = 1; l <= 6; l++) {
      const tab = document.createElement('div');
      tab.className = `level-tab l${l} ${this.quizState.level === l ? 'active' : ''}`;
      tab.onclick = () => {
        this.quizState.level = l;
        this.renderVocabularyTabs();
        this.renderVocabulary();
      };
      tab.textContent = `TOPIK ${l}`;
      mount.appendChild(tab);
    }
  }

  renderVocabulary() {
    const mount = document.getElementById('vocab-list-mount');
    if (!mount) return;
    
    const searchVal = document.getElementById('vocab-search').value.toLowerCase();
    const filterVal = document.getElementById('vocab-filter').value;
    const activeLevel = this.quizState.level;
    
    mount.innerHTML = '';
    
    // Filter words matching criteria
    const filtered = KQUEST_WORDS.filter(w => {
      const matchesLevel = w.level === activeLevel;
      const matchesSearch = w.word.includes(searchVal) || w.meaning.toLowerCase().includes(searchVal) || w.pronunciation.toLowerCase().includes(searchVal);
      const matchesFilter = filterVal === 'all' || w.pos === filterVal;
      
      return matchesLevel && matchesSearch && matchesFilter;
    });
    
    if (filtered.length === 0) {
      mount.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Тохирох үг олдсонгүй.</div>`;
      return;
    }
    
    filtered.forEach(w => {
      const isFav = this.userData.favorites.includes(w.id);
      const card = document.createElement('div');
      card.className = 'vocab-card';
      
      card.innerHTML = `
        <div class="vocab-card-header">
          <div>
            <div class="word-korean">${w.word}</div>
            <div class="word-pronunciation">(${w.pronunciation})</div>
          </div>
          <div class="vocab-badge-group">
            <span class="pos-tag">${w.pos}</span>
            <span class="level-tag-dict l${w.level}">L${w.level}</span>
          </div>
        </div>
        
        <div class="word-meaning">${w.meaning}</div>
        
        <div class="word-example">
          <div class="example-ko">${w.exampleKo}</div>
          <div class="example-mn">${w.exampleMn}</div>
        </div>
        
        <div class="vocab-actions">
          <button class="vocab-action-btn tts-btn" onclick="app.speakWord('${w.word}')" title="Солонгос дуудлага сонсох">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="vocab-action-btn fav-btn ${isFav ? 'active' : ''}" onclick="app.toggleFavorite(${w.id}, this)" title="Тэмдэглэлд хадгалах">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      `;
      
      mount.appendChild(card);
    });
  }

  toggleFavorite(wordId, buttonEl) {
    const idx = this.userData.favorites.indexOf(wordId);
    if (idx === -1) {
      this.userData.favorites.push(wordId);
      buttonEl.classList.add('active');
      this.showAlert('success', 'Үгийг Тэмдэглэлийн "Дуртай үгс"-д нэмлээ ❤️');
    } else {
      this.userData.favorites.splice(idx, 1);
      buttonEl.classList.remove('active');
      this.showAlert('success', 'Үгийг цуглуулгаас хаслаа.');
    }
    this.saveUserData();
  }

  speakWord(text) {
    if ('speechSynthesis' in window) {
      // Cancel ongoing speeches
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8; // slightly slower for clean pronunciation
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Таны хөтөч дуу хоолой уншихыг дэмжихгүй байна.");
    }
  }

  // --- VIEW 4: Quiz Engine ---
  startQuiz(level) {
    this.quizState.level = level;
    this.quizState.isMistakeQuiz = false;
    
    // Extract words of this level
    const levelWords = KQUEST_WORDS.filter(w => w.level === level);
    
    // Pick 10 random words (or max if less)
    this.quizState.words = this.shuffleArray([...levelWords]).slice(0, 10);
    this.quizState.currentIdx = 0;
    this.quizState.correctCount = 0;
    this.quizState.goldEarned = 0;
    this.quizState.xpEarned = 0;
    this.quizState.answered = false;
    
    this.navigateTo('quiz');
    this.renderQuizQuestion();
  }

  startMistakeQuiz() {
    const mistakeIds = this.userData.mistakes;
    if (mistakeIds.length === 0) return;
    
    // Extract exact words
    const levelWords = KQUEST_WORDS.filter(w => mistakeIds.includes(w.id));
    
    this.quizState.isMistakeQuiz = true;
    this.quizState.words = this.shuffleArray([...levelWords]).slice(0, 10);
    this.quizState.currentIdx = 0;
    this.quizState.correctCount = 0;
    this.quizState.goldEarned = 0;
    this.quizState.xpEarned = 0;
    this.quizState.answered = false;
    
    this.navigateTo('quiz');
    this.renderQuizQuestion();
  }

  exitQuiz() {
    if (confirm("Та сорилтыг дуусгалгүй гарахдаа итгэлтэй байна уу? Одоогийн оноо хадгалагдахгүй.")) {
      this.navigateTo('dashboard');
    }
  }

  renderQuizQuestion() {
    const qState = this.quizState;
    const currentWord = qState.words[qState.currentIdx];
    
    if (!currentWord) {
      this.renderQuizResults();
      return;
    }
    
    qState.answered = false;
    
    // Reset DOM Elements
    document.getElementById('quiz-explanation-box').style.display = 'none';
    document.getElementById('quiz-next-btn').disabled = true;
    document.getElementById('quiz-next-btn').innerHTML = `Дараах <i class="fa-solid fa-arrow-right"></i>`;
    
    // Set level descriptors
    const isMistakes = qState.isMistakeQuiz;
    document.getElementById('quiz-level-title').textContent = isMistakes ? 'Алдаа Давтах Сорилт' : `TOPIK ${qState.level}: Сорилт`;
    document.getElementById('quiz-badge-level').textContent = isMistakes ? '⚠' : qState.level;
    document.getElementById('quiz-badge-level').style.backgroundColor = isMistakes ? 'var(--color-secondary)' : `var(--lvl-${qState.level})`;
    
    // Progress Indicator
    const pct = Math.round(((qState.currentIdx) / qState.words.length) * 100);
    document.getElementById('quiz-progress-fill').style.width = `${pct}%`;
    document.getElementById('quiz-score-indicator').textContent = `Асуулт ${qState.currentIdx + 1} / ${qState.words.length}`;
    
    // Set question prompt
    document.getElementById('quiz-question-word').textContent = currentWord.word;
    document.getElementById('quiz-question-hint').textContent = `(${currentWord.pronunciation})`;
    
    // Render Plant Buddy speaking text
    const plantId = this.userData.selectedPlant;
    const plant = this.plants[plantId];
    const lvl = this.userData.petStats.level;
    document.getElementById('quiz-pet-mount').innerHTML = this.getPlantSVG(plantId, lvl, 'idle', this.userData.blossomCount || 0);
    document.getElementById('quiz-pet-speech').textContent = `"${plant.name}: Сорилтоо амжилттай бөглөж, мөчрүүд дээр маань ягаан цэцэгс дэлгэрүүлээрэй!"`;
    
    // Generate Options
    const optionsMount = document.getElementById('quiz-options-mount');
    optionsMount.innerHTML = '';
    
    const options = this.generateQuizOptions(currentWord);
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-card';
      btn.innerHTML = `<span>${opt.meaning}</span> <i class="fa-regular fa-circle" style="color:var(--text-muted)"></i>`;
      btn.onclick = () => this.handleOptionClick(opt, btn);
      optionsMount.appendChild(btn);
    });
  }

  generateQuizOptions(correctWord) {
    const levelWords = KQUEST_WORDS.filter(w => w.level === correctWord.level && w.id !== correctWord.id);
    const shuffledLvl = this.shuffleArray([...levelWords]);
    
    const distractors = shuffledLvl.slice(0, 3);
    
    // If not enough from same level, take from neighboring levels
    if (distractors.length < 3) {
      const otherWords = KQUEST_WORDS.filter(w => w.id !== correctWord.id && !distractors.find(d => d.id === w.id));
      distractors.push(...this.shuffleArray([...otherWords]).slice(0, 3 - distractors.length));
    }
    
    const allOptions = [correctWord, ...distractors];
    return this.shuffleArray(allOptions);
  }

  handleOptionClick(selectedOpt, btnEl) {
    const qState = this.quizState;
    if (qState.answered) return; // Answered already
    
    qState.answered = true;
    qState.selectedBtn = btnEl;
    
    const currentWord = qState.words[qState.currentIdx];
    const isCorrect = selectedOpt.id === currentWord.id;
    
    const plantId = this.userData.selectedPlant;
    const plant = this.plants[plantId];
    const lvl = this.userData.petStats.level;
    const petBuddySvg = document.getElementById('quiz-pet-mount');
    
    this.userData.totalQuestionsAnswered++;
    
    if (isCorrect) {
      qState.correctCount++;
      this.userData.correctAnswersCount++;
      
      // Dynamically increment blossom count on correct answers!
      this.userData.blossomCount = (this.userData.blossomCount || 0) + 1;
      
      // Highlight correctly clicked
      btnEl.classList.add('correct');
      btnEl.querySelector('i').className = 'fa-solid fa-circle-check';
      btnEl.querySelector('i').style.color = '#34d399';
      
      // Reward
      const goldReward = 5;
      const xpReward = 10;
      qState.goldEarned += goldReward;
      qState.xpEarned += xpReward;
      
      this.userData.gold += goldReward;
      this.userData.xp += xpReward;
      this.userData.petStats.xp += xpReward;
      
      // Update stats
      this.userData.petStats.happiness = Math.min(100, this.userData.petStats.happiness + 5);
      
      // SVG reaction
      petBuddySvg.innerHTML = this.getPlantSVG(plantId, lvl, 'happy', this.userData.blossomCount);
      document.getElementById('quiz-pet-speech').textContent = `"${plant.name}: ${plant.quotes.happy}"`;
      
      this.playAudioSynthTone(587.33, 0.1); // D5
      setTimeout(() => this.playAudioSynthTone(880, 0.15), 100); // A5
      
      // Remove from mistakes bank if they get it right during mistake quiz
      if (qState.isMistakeQuiz) {
        const idx = this.userData.mistakes.indexOf(currentWord.id);
        if (idx !== -1) {
          this.userData.mistakes.splice(idx, 1);
        }
      }
    } else {
      // Highlight incorrect clicked
      btnEl.classList.add('incorrect');
      btnEl.querySelector('i').className = 'fa-solid fa-circle-xmark';
      btnEl.querySelector('i').style.color = '#f43f5e';
      
      // Find and highlight correct answer
      document.querySelectorAll('.option-card').forEach(card => {
        if (card.textContent.trim() === currentWord.meaning) {
          card.classList.add('correct');
          card.querySelector('i').className = 'fa-solid fa-circle-check';
          card.querySelector('i').style.color = '#34d399';
        }
      });
      
      // Log to mistakes database
      if (!this.userData.mistakes.includes(currentWord.id)) {
        this.userData.mistakes.push(currentWord.id);
      }
      
      // Update stats
      this.userData.petStats.happiness = Math.max(20, this.userData.petStats.happiness - 8);
      this.userData.petStats.hunger = Math.max(20, this.userData.petStats.hunger - 4);
      
      // SVG reaction
      petBuddySvg.innerHTML = this.getPlantSVG(plantId, lvl, 'sad', this.userData.blossomCount || 0);
      document.getElementById('quiz-pet-speech').textContent = `"${plant.name}: ${plant.quotes.sad}"`;
      
      // Show Explanation Box
      const expBox = document.getElementById('quiz-explanation-box');
      document.getElementById('quiz-explanation-body').innerHTML = `
        <strong>${currentWord.word} (${currentWord.pronunciation})</strong> нь Монголоор <strong>${currentWord.meaning}</strong> гэсэн утгатай. <br>
        <span style="font-size:0.85rem; color:var(--text-secondary)">Үгийн аймаг: ${currentWord.pos}</span><br>
        Жишээ: <em>${currentWord.exampleKo}</em> <br>
        Орчуулга: <em>${currentWord.exampleMn}</em>
      `;
      expBox.style.display = 'block';
      
      this.playAudioSynthTone(220, 0.25); // A3
    }
    
    // Check for level up
    this.checkPetLevelUp();
    this.saveUserData();
    
    // Enable Next button
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.disabled = false;
    
    // Speech synthesis audio for correct/incorrect reinforcement
    this.speakWord(currentWord.word);
  }

  submitOrNextQuestion() {
    this.quizState.currentIdx++;
    this.renderQuizQuestion();
  }

  renderQuizResults() {
    const qState = this.quizState;
    const mount = document.getElementById('quiz-options-mount');
    
    // Clear elements
    document.getElementById('quiz-explanation-box').style.display = 'none';
    document.getElementById('quiz-progress-fill').style.width = `100%`;
    document.getElementById('quiz-score-indicator').textContent = `Дууслаа!`;
    document.getElementById('quiz-question-prompt').textContent = `Баяр хүргэе! Та сорилтыг амжилттай гүйцэтгэлээ!`;
    document.getElementById('quiz-question-word').textContent = `${qState.correctCount} / ${qState.words.length}`;
    document.getElementById('quiz-question-hint').textContent = `Зөв хариултын хувь`;
    
    const plantId = this.userData.selectedPlant;
    const plant = this.plants[plantId];
    const lvl = this.userData.petStats.level;
    
    let endQuote = `"${plant.name}: Арчилж ургуулсан мод маань илүү олон цэцэгстэй дэлгэрлээ!"`;
    let reactState = 'happy';
    if (qState.correctCount < 5) {
      endQuote = `"${plant.name}: Гэмтэл сорилт бүр дараагийн бат бөх үндэсний эхлэл юм."`;
      reactState = 'sad';
    }
    
    document.getElementById('quiz-pet-mount').innerHTML = this.getPlantSVG(plantId, lvl, reactState, this.userData.blossomCount || 0);
    document.getElementById('quiz-pet-speech').textContent = endQuote;
    
    // Options grid displays rewards
    mount.innerHTML = `
      <div style="grid-column: 1/-1;" class="quiz-results-card">
        <h3>Олсон шагналууд:</h3>
        <div class="results-gold-reward">
          <span>+${qState.goldEarned}</span> <i class="fa-solid fa-coins"></i>
        </div>
        <p style="color:var(--text-secondary)">+${qState.xpEarned} Хэрэглэгчийн XP & Модны XP</p>
        <br>
        <button class="review-mistakes-btn" onclick="app.navigateTo('dashboard')" style="background:var(--color-primary); box-shadow: 0 4px 15px var(--color-primary-glow)">
          Үндсэн өрөө рүү буцах
        </button>
      </div>
    `;
    
    // Hide footer next
    document.getElementById('quiz-next-btn').style.display = 'none';
    
    this.playAudioSynthTone(523.25, 0.1);
    setTimeout(() => this.playAudioSynthTone(659.25, 0.1), 100);
    setTimeout(() => this.playAudioSynthTone(783.99, 0.1), 200);
    setTimeout(() => this.playAudioSynthTone(1046.5, 0.3), 300);
  }

  // --- VIEW 5: Wordbook (Mistakes & Favorites) ---
  switchWordbookTab(tabType) {
    this.wordbookTab = tabType;
    
    document.getElementById('wb-tab-mistakes').classList.remove('active');
    document.getElementById('wb-tab-favorites').classList.remove('active');
    
    document.getElementById(`wb-tab-${tabType}`).classList.add('active');
    
    this.renderWordbook();
  }

  renderWordbook() {
    const listMount = document.getElementById('wordbook-list-mount');
    const emptyState = document.getElementById('wordbook-empty');
    const actionContainer = document.getElementById('mistake-action-container');
    
    listMount.innerHTML = '';
    emptyState.style.display = 'none';
    actionContainer.style.display = 'none';
    
    // Update tab counts
    document.getElementById('wb-count-mistakes').textContent = this.userData.mistakes.length;
    document.getElementById('wb-count-favorites').textContent = this.userData.favorites.length;
    
    const isMistakes = this.wordbookTab === 'mistakes';
    const sourceIds = isMistakes ? this.userData.mistakes : this.userData.favorites;
    
    if (sourceIds.length === 0) {
      emptyState.style.display = 'flex';
      
      const title = document.getElementById('wordbook-empty-title');
      const desc = document.getElementById('wordbook-empty-desc');
      
      if (isMistakes) {
        title.textContent = "Алдсан үг байхгүй байна!";
        desc.textContent = "Та сорилтонд маш сайн хариулж байна. Алдсан үгс энд автоматаар хадгалагдана.";
      } else {
        title.textContent = "Дуртай үг байхгүй байна!";
        desc.textContent = 'Үгийн сангаас чухал гэж үзсэн үгсийнхээ хажууд байх "Зүрх" дүрс дээр дарж хадгалаарай.';
      }
      return;
    }
    
    // Show practice button if mistakes exist
    if (isMistakes && sourceIds.length > 0) {
      actionContainer.style.display = 'block';
    }
    
    // Render cards
    const targetWords = KQUEST_WORDS.filter(w => sourceIds.includes(w.id));
    targetWords.forEach(w => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      
      card.innerHTML = `
        <div class="vocab-card-header">
          <div>
            <div class="word-korean">${w.word}</div>
            <div class="word-pronunciation">(${w.pronunciation})</div>
          </div>
          <div class="vocab-badge-group">
            <span class="pos-tag">${w.pos}</span>
            <span class="level-tag-dict l${w.level}">L${w.level}</span>
          </div>
        </div>
        
        <div class="word-meaning">${w.meaning}</div>
        
        <div class="word-example">
          <div class="example-ko">${w.exampleKo}</div>
          <div class="example-mn">${w.exampleMn}</div>
        </div>
        
        <div class="vocab-actions">
          <button class="vocab-action-btn tts-btn" onclick="app.speakWord('${w.word}')" title="Дуудлага сонсох">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="vocab-action-btn fav-btn active" onclick="app.removeWordbookItem(${w.id})" title="Цуглуулгаас хасах">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      listMount.appendChild(card);
    });
  }

  removeWordbookItem(wordId) {
    const isMistakes = this.wordbookTab === 'mistakes';
    const source = isMistakes ? this.userData.mistakes : this.userData.favorites;
    
    const idx = source.indexOf(wordId);
    if (idx !== -1) {
      source.splice(idx, 1);
      this.saveUserData();
      this.renderWordbook();
      this.showAlert("success", "Үгийг жагсаалтаас амжилттай хаслаа.");
    }
  }

  // --- VIEW 6: Pet Shop ---
  renderShop() {
    const mount = document.getElementById('shop-grid-mount');
    if (!mount) return;
    
    mount.innerHTML = '';
    
    this.shopItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      
      // Determine emojis and dynamic effect description
      let iconEmoji = '💧';
      let effectClass = 'hunger-eff';
      let effectLabel = `Чийгшил: <span>+${item.hunger}%</span>`;
      
      if (item.id === 'fertilizer') {
        iconEmoji = '🧪';
        effectLabel = `Чийгшил +${item.hunger}%, Эрч хүч +${item.happiness}%`;
      } else if (item.id === 'sunlight') {
        iconEmoji = '☀️';
        effectLabel = `Эрч хүч: <span>+${item.happiness}%</span>`;
      } else if (item.id === 'love') {
        iconEmoji = '💖';
        effectLabel = `Чийгшил +${item.hunger}%, Эрч хүч +${item.happiness}%`;
      } else if (item.id === 'pruning') {
        iconEmoji = '✂️';
        effectLabel = `Эрч хүч: <span>+${item.happiness}%</span>`;
      } else if (item.id === 'music') {
        iconEmoji = '🎵';
        effectLabel = `Эрч хүч: <span>+${item.happiness}%</span>`;
      }
      
      const plantId = this.userData.selectedPlant;
      const plant = this.plants[plantId];
      
      // Favorite tag
      let favTag = '';
      if (plant && plant.favoriteCare === item.id) {
        favTag = `<div style="font-size:0.7rem; background:rgba(251,191,36,0.15); border:1px solid var(--color-gold); color:var(--color-gold); padding:2px 8px; border-radius:10px; margin-bottom:8px; font-weight:700;">Сонгосон модны дуртай арчилгаа!</div>`;
      }
      
      const inventoryCount = this.userData.inventory[item.id] || 0;
      
      card.innerHTML = `
        <div class="item-icon">${iconEmoji}</div>
        <h3>${item.name}</h3>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:6px;">${item.desc}</p>
        ${favTag}
        <div class="item-effect ${effectClass}">${effectLabel}</div>
        <div class="item-cost">
          <i class="fa-solid fa-coins"></i> ${item.cost}
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px;">Эзэмшиж буй: ${inventoryCount} ш</div>
        <button class="buy-btn" onclick="app.buyShopItem('${item.id}')" ${this.userData.gold < item.cost ? 'disabled' : ''}>Худалдаж авах</button>
      `;
      
      mount.appendChild(card);
    });
  }

  buyShopItem(itemId) {
    const item = this.shopItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (this.userData.gold < item.cost) {
      this.showAlert("error", "Алт хүрэлцэхгүй байна.");
      return;
    }
    
    // Complete purchase
    this.userData.gold -= item.cost;
    this.userData.inventory[itemId] = (this.userData.inventory[itemId] || 0) + 1;
    this.saveUserData();
    
    this.showAlert("success", `${item.name}-ийг амжилттай худалдан авлаа! Цүнхэнд хадгалагдлаа 💼`);
    this.renderShop();
    
    // Buy Sound
    this.playAudioSynthTone(600, 0.08);
    setTimeout(() => this.playAudioSynthTone(750, 0.12), 80);
  }

  // --- VIEW 7: Stats Dashboard ---
  renderStats() {
    document.getElementById('stat-xp').textContent = this.userData.xp;
    document.getElementById('stat-streak').textContent = `${this.userData.streak} өдөр`;
    
    // Accuracy
    const pct = this.userData.totalQuestionsAnswered > 0 
      ? Math.round((this.userData.correctAnswersCount / this.userData.totalQuestionsAnswered) * 100) 
      : 0;
    document.getElementById('stat-correct-pct').textContent = `${pct}%`;
    
    // Render progress levels
    const mount = document.getElementById('stats-progress-levels-mount');
    if (!mount) return;
    
    mount.innerHTML = '';
    
    for (let l = 1; l <= 6; l++) {
      const levelWords = KQUEST_WORDS.filter(w => w.level === l);
      
      // Mistakes counting for this level
      const masterCount = levelWords.length;
      
      // Let's compute master completion. Since this is gamified, the master rate is based on 
      // number of words minus active mistakes in this level.
      const levelWordIds = levelWords.map(w => w.id);
      const activeMistakesCount = this.userData.mistakes.filter(id => levelWordIds.includes(id)).length;
      const learnedCount = Math.max(0, masterCount - activeMistakesCount);
      const masteryPct = Math.round((learnedCount / masterCount) * 100);
      
      const row = document.createElement('div');
      row.className = 'progress-level-row';
      
      row.innerHTML = `
        <span class="lvl-tag">TOPIK ${l}</span>
        <div class="lvl-pbar-outer">
          <div class="lvl-pbar-inner" style="width: ${masteryPct}%; background-color: var(--lvl-${l})"></div>
        </div>
        <span class="lvl-pct">${masteryPct}%</span>
      `;
      
      mount.appendChild(row);
    }
  }

  // --- Utility helpers ---
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Web Audio Synth for retro reward chime
  playAudioSynthTone(freq, duration) {
    if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        // Fallback silently if audio context locked
      }
    }
  }

  // --- PREMIUM SVG GRAPHICS GENERATOR ---
  getPlantSVG(plantId, level, state, blossomCount) {
    let animClass = 'plant-swaying';
    if (state === 'happy') animClass = 'plant-growing';
    if (state === 'eating') animClass = 'plant-pulsing';
    
    // Pot & Soil base (common to all plants)
    const baseHTML = `
      <!-- Pot Shadow -->
      <ellipse cx="100" cy="175" rx="60" ry="12" fill="#0f172a" opacity="0.4" />
      <!-- Terrarium Glass Pot -->
      <path d="M 45,155 C 45,185 65,190 100,190 C 135,190 155,185 155,155" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2.5" />
      <!-- Soil -->
      <path d="M 47,157 C 65,168 135,168 153,157 C 151,175 135,182 100,182 C 65,182 49,175 47,157 Z" fill="#451a03" />
      <ellipse cx="100" cy="158" rx="51" ry="8" fill="#78350f" opacity="0.8" />
    `;
    
    let content = '';
    
    // Define Growth Phase
    if (level === 1) {
      // Little Green Sprout 🌱
      content = `
        <!-- Sprout stem -->
        <path d="M 100,158 Q 97,135 102,120" fill="none" stroke="#22c55e" stroke-width="4.5" stroke-linecap="round" />
        <!-- Swaying Leaves -->
        <path class="plant-blossom" d="M 102,120 Q 82,108 85,115 Q 92,125 102,120" fill="#4ade80" stroke="#15803d" stroke-width="1" />
        <path class="plant-blossom" d="M 102,120 Q 122,112 118,120 Q 108,127 102,120" fill="#4ade80" stroke="#15803d" stroke-width="1" />
        <!-- Cute Sprout Bud -->
        <circle cx="101" cy="118" r="3" fill="#bef264" />
      `;
    } else if (level === 2) {
      // Slender Sapling 🌿
      content = `
        <!-- Stem -->
        <path d="M 100,158 Q 98,130 96,105 T 104,80" fill="none" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
        <path d="M 100,158 Q 98,130 96,105 T 104,80" fill="none" stroke="#854d0e" stroke-width="3" stroke-linecap="round" />
        
        <!-- Swaying Leaves along the stem -->
        <path d="M 97,125 Q 80,118 83,124 Q 90,130 97,125" fill="#22c55e" />
        <path d="M 98,110 Q 115,103 112,109 Q 105,115 98,110" fill="#22c55e" />
        <path d="M 100,95 Q 85,88 88,94 Q 95,100 100,95" fill="#22c55e" />
        
        <!-- Sapling Top -->
        <path class="plant-blossom" d="M 104,80 Q 95,65 100,60 Q 108,70 104,80" fill="#4ade80" />
        <path class="plant-blossom" d="M 104,80 Q 113,65 108,60 Q 100,70 104,80" fill="#4ade80" />
      `;
    } else {
      // Level 3+ Sturdy branching tree or flower bush!
      let branchColor = '#78350f';
      let leafColor = '#15803d';
      let leafGlow = '#22c55e';
      
      if (plantId === 'bonsai') {
        branchColor = '#451a03';
        leafColor = '#064e3b';
        leafGlow = '#0f766e';
      }
      
      // Render customized plant trunks
      if (plantId === 'rose') {
        // Rose bush branches
        content = `
          <path d="M 100,158 Q 90,120 75,95 T 60,75" fill="none" stroke="${branchColor}" stroke-width="6.5" stroke-linecap="round" />
          <path d="M 100,158 Q 110,120 125,95 T 140,75" fill="none" stroke="${branchColor}" stroke-width="6.5" stroke-linecap="round" />
          <path d="M 100,140 Q 100,110 95,80 T 100,55" fill="none" stroke="${branchColor}" stroke-width="5" stroke-linecap="round" />
          
          <!-- Green leaves bundles -->
          <circle cx="60" cy="75" r="16" fill="${leafColor}" opacity="0.85" />
          <circle cx="140" cy="75" r="16" fill="${leafColor}" opacity="0.85" />
          <circle cx="100" cy="55" r="18" fill="${leafColor}" opacity="0.85" />
          
          <circle cx="65" cy="70" r="12" fill="${leafGlow}" opacity="0.7" />
          <circle cx="135" cy="70" r="12" fill="${leafGlow}" opacity="0.7" />
          <circle cx="100" cy="50" r="14" fill="${leafGlow}" opacity="0.7" />
        `;
      } else if (plantId === 'orchid') {
        // Delicate orchids
        content = `
          <!-- Large sweeping long green leaves -->
          <path d="M 100,158 Q 60,145 40,152 Q 55,135 100,158" fill="#14532d" />
          <path d="M 100,158 Q 140,145 160,152 Q 145,135 100,158" fill="#14532d" />
          <path d="M 100,158 Q 80,125 50,115 Q 70,125 100,158" fill="#166534" />
          <path d="M 100,158 Q 120,125 150,115 Q 130,125 100,158" fill="#166534" />
          
          <!-- Long thin orchid stem -->
          <path d="M 100,158 Q 95,110 110,80 T 115,40" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round" />
        `;
      } else {
        // Trees (Sakura, Plum, Magnolia, Bonsai)
        content = `
          <!-- Trunk -->
          <path d="M 92,158 C 92,140 85,125 78,110 C 70,95 55,90 60,80" fill="none" stroke="${branchColor}" stroke-width="12" stroke-linecap="round" />
          <path d="M 108,158 C 108,140 115,125 122,110 C 130,95 145,90 140,80" fill="none" stroke="${branchColor}" stroke-width="12" stroke-linecap="round" />
          <path d="M 100,158 C 100,130 95,105 92,85 C 88,65 95,50 100,45" fill="none" stroke="${branchColor}" stroke-width="14" stroke-linecap="round" />
          
          <!-- Foliage clusters -->
          <circle cx="60" cy="80" r="22" fill="${leafColor}" opacity="0.8" />
          <circle cx="140" cy="80" r="22" fill="${leafColor}" opacity="0.8" />
          <circle cx="100" cy="45" r="25" fill="${leafColor}" opacity="0.8" />
          <circle cx="75" cy="60" r="24" fill="${leafColor}" opacity="0.8" />
          <circle cx="125" cy="60" r="24" fill="${leafColor}" opacity="0.8" />
          
          <circle cx="60" cy="76" r="16" fill="${leafGlow}" opacity="0.6" />
          <circle cx="140" cy="76" r="16" fill="${leafGlow}" opacity="0.6" />
          <circle cx="100" cy="42" r="18" fill="${leafGlow}" opacity="0.6" />
          <circle cx="75" cy="56" r="18" fill="${leafGlow}" opacity="0.6" />
          <circle cx="125" cy="56" r="18" fill="${leafGlow}" opacity="0.6" />
        `;
      }
      
      // Dynamic Pink Blossoms blooming based on blossomCount!
      if (blossomCount > 0) {
        const maxSlots = 30;
        const slots = [
          { x: 100, y: 40, s: 1.0 }, { x: 75, y: 55, s: 0.95 }, { x: 125, y: 55, s: 0.95 },
          { x: 60, y: 75, s: 0.9 }, { x: 140, y: 75, s: 0.9 }, { x: 90, y: 35, s: 0.85 },
          { x: 110, y: 35, s: 0.85 }, { x: 70, y: 45, s: 0.9 }, { x: 130, y: 45, s: 0.9 },
          { x: 50, y: 80, s: 0.8 }, { x: 150, y: 80, s: 0.8 }, { x: 80, y: 65, s: 0.9 },
          { x: 120, y: 65, s: 0.9 }, { x: 100, y: 60, s: 1.0 }, { x: 65, y: 65, s: 0.85 },
          { x: 135, y: 65, s: 0.85 }, { x: 85, y: 48, s: 0.9 }, { x: 115, y: 48, s: 0.9 },
          { x: 55, y: 70, s: 0.8 }, { x: 145, y: 70, s: 0.8 }, { x: 95, y: 50, s: 0.95 },
          { x: 105, y: 50, s: 0.95 }, { x: 72, y: 74, s: 0.85 }, { x: 128, y: 74, s: 0.85 },
          { x: 60, y: 90, s: 0.75 }, { x: 140, y: 90, s: 0.75 }, { x: 80, y: 32, s: 0.8 },
          { x: 120, y: 32, s: 0.8 }, { x: 90, y: 65, s: 0.9 }, { x: 110, y: 65, s: 0.9 }
        ];
        
        let blossomsHTML = '';
        const count = Math.min(blossomCount, maxSlots);
        
        for (let i = 0; i < count; i++) {
          const slot = slots[i];
          // Generate 5-petaled beautiful blossom group using pinks and yellows
          blossomsHTML += `
            <g class="plant-blossom" transform="translate(${slot.x}, ${slot.y}) scale(${slot.s})">
              <!-- Petals -->
              <circle cx="0" cy="-4" r="3.2" fill="#fda4af" />
              <circle cx="-3.8" cy="-1.2" r="3.2" fill="#fda4af" />
              <circle cx="3.8" cy="-1.2" r="3.2" fill="#fda4af" />
              <circle cx="-2.4" cy="3.2" r="3.2" fill="#fda4af" />
              <circle cx="2.4" cy="3.2" r="3.2" fill="#fda4af" />
              
              <!-- Petal Center highlights -->
              <circle cx="0" cy="-4" r="1.5" fill="#f43f5e" />
              <circle cx="-3.8" cy="-1.2" r="1.5" fill="#f43f5e" />
              <circle cx="3.8" cy="-1.2" r="1.5" fill="#f43f5e" />
              <circle cx="-2.4" cy="3.2" r="1.5" fill="#f43f5e" />
              <circle cx="2.4" cy="3.2" r="1.5" fill="#f43f5e" />
              
              <!-- Yellow core -->
              <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
            </g>
          `;
        }
        content += blossomsHTML;
      }
    }
    
    return `
      <svg viewBox="0 0 200 200" class="${animClass}" style="width:100%; height:100%">
        ${baseHTML}
        ${content}
      </svg>
    `;
  }
}

// Instantiate global app instance
const app = new KQuestApp();
