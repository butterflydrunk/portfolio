/* ═══════════════════════════════════════════
   CORE PORTFOLIO SCRIPT (BILINGUAL RU ⇄ EN)
   Mekan Mammedov | Lead AI-Engineer & Boutique Automation Architect
═══════════════════════════════════════════ */

/* ── TAB TITLE ── */
let TAB_ACTIVE = 'Мекан Маммедов | Lead AI-Engineer';
const TAB_AWAY = 'MissingEngineerException(); // Come back ⚡';
document.title = TAB_ACTIVE;
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? TAB_AWAY : TAB_ACTIVE;
});

/* ── LOADER ANIMATION ── */
const loaderMsgs = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'TUNING LINUX KERNEL & TCP BBR...',
  'SYNCHRONIZING ZERO-DOWNTIME TRANSPORT NODES...',
  'WARMING UP 35,000 HS CODES VECTOR CACHE...',
  'MOUNTING FASTAPI & RABBITMQ WORKERS...',
  'INITIALIZING TMA & SUPABASE RLS...',
  'SYSTEM READY ✨'
];
let lw = 0;
const lBar = document.getElementById('loaderBar');
const lTxt = document.getElementById('loaderText');

function tickLoader() {
  lw += 2.2;
  if (lBar) lBar.style.width = Math.min(lw, 100) + '%';
  if (lTxt) {
    const idx = Math.floor((lw / 100) * loaderMsgs.length);
    lTxt.textContent = loaderMsgs[Math.min(idx, loaderMsgs.length - 1)];
  }
  if (lw < 100) {
    requestAnimationFrame(tickLoader);
  } else {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('loader-fade');
        setTimeout(() => {
          loader.style.display = 'none';
          startHeroAnimations();
        }, 450);
      }
    }, 200);
  }
}
requestAnimationFrame(tickLoader);

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;

if (dot && ring) {
  document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
  });

  function animRing() {
    rx += (cx - rx) * 0.16;
    ry += (cy - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .skill-tag, .project-card, .about-card, .exp-card, .filter-btn, .logo-pill, .lang-toggle-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ── DECRYPT TEXT HERO ── */
const phrases_ru = [
  'Lead AI-Engineer & System Architect',
  'High-Resilience Transport & Stealth Specialist',
  'Ultra-Fast Hybrid RAG Architect (4.5ms)',
  'High-Load Backend & Async Systems Developer',
  'Telegram Mini Apps & Automation Pioneer'
];
const phrases_en = [
  'Lead AI-Engineer & System Architect',
  'High-Resilience Transport & Stealth Specialist',
  'Ultra-Fast Hybrid RAG Architect (4.5ms)',
  'High-Load Async Backend Developer',
  'Telegram Mini Apps & Automation Pioneer'
];

let activePhrases = phrases_ru;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>';
let phraseIdx = 0;

function decrypt(targetText, onDone) {
  const el = document.getElementById('decryptText');
  if (!el) return;
  let iteration = 0;
  const maxIter = targetText.length;
  clearInterval(el._interval);

  el._interval = setInterval(() => {
    el.textContent = targetText.split('').map((char, index) => {
      if (char === ' ') return ' ';
      if (index < iteration) return targetText[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    iteration += 0.45;
    if (iteration >= maxIter) {
      clearInterval(el._interval);
      el.textContent = targetText;
      if (onDone) setTimeout(onDone, 2400);
    }
  }, 28);
}

function nextPhrase() {
  decrypt(activePhrases[phraseIdx % activePhrases.length], () => {
    phraseIdx = (phraseIdx + 1) % activePhrases.length;
    nextPhrase();
  });
}

function startHeroAnimations() {
  nextPhrase();
}

/* ── NAV & ACTIVE SECTION TRACKER ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    const h = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + h) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* Smooth scroll for nav links */
document.querySelectorAll('a[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('data-section'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});

/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open');
}
function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
}
if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

/* ── PROJECTS FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (cat === 'all' || cardCat === cat) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ── CONTACT FORM ── */
async function handleContact() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const msg = document.getElementById('cf-msg').value.trim();
  const status = document.getElementById('cf-status');
  const btn = document.getElementById('cf-btn');

  const isEn = (document.documentElement.getAttribute('lang') || 'ru') === 'en';

  if (!name || !email || !msg) {
    status.className = 'form-status err';
    status.textContent = isEn
      ? 'Please fill in all required fields (Name, Email, Message).'
      : 'Пожалуйста, заполните все обязательные поля (Имя, Email, Сообщение).';
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    status.className = 'form-status err';
    status.textContent = isEn
      ? 'Please enter a valid email address.'
      : 'Пожалуйста, введите корректный адрес электронной почты.';
    return;
  }

  btn.textContent = isEn ? 'Sending...' : 'Отправка...';
  btn.disabled = true;

  setTimeout(() => {
    status.className = 'form-status ok';
    status.innerHTML = isEn
      ? `✅ Thank you, ${name}! Opening direct dialogue in Telegram...`
      : `✅ Спасибо, ${name}! Открываю прямой диалог в Telegram...`;

    const greeting = isEn
      ? `Hello Mekan! My name is ${name} (${email}). Subject: ${subject || 'Collaboration'}. Message: ${msg}`
      : `Здравствуйте, Мекан! Меня зовут ${name} (${email}). Тема: ${subject || 'Сотрудничество'}. Сообщение: ${msg}`;

    const tgUrl = `https://t.me/irreproachablee?text=${encodeURIComponent(greeting)}`;
    window.open(tgUrl, '_blank');

    btn.textContent = isEn ? 'Sent ✓' : 'Отправлено ✓';
    ['cf-name', 'cf-email', 'cf-subject', 'cf-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    setTimeout(() => {
      btn.textContent = isEn ? 'Send Message →' : 'Отправить сообщение →';
      btn.disabled = false;
    }, 4000);
  }, 600);
}

/* ── INTERACTIVE AI CHATBOT COPILOT ── */
let chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  if (win) win.classList.toggle('open', chatOpen);
}

const kb_ru = {
  skills: `Инженерный стек Мекана Маммедова:

🛡️ Сетевой инжиниринг: Отказоустойчивые протоколы сквозного шифрования (VLESS, Xray-core, XHTTP packet-up), Anycast CDN (Fastly), Cloudflare Edge, Happ Crypt5, 1-Device Lock, gRPC RAM hot-reloading (adu/rmu).
🤖 AI & RAG: Сверхбыстрый Hybrid RAG (BM25 FTS5 + FastEmbed BGE-small ONNX), Reciprocal Rank Fusion (4.5 мс на 35k кодов), Pydantic, Vision LLM OCR, ExcelEngine.
⚙️ Backend & Data: Python, FastAPI, Asyncio, asyncpg, PostgreSQL 16, Redis, RabbitMQ, Docker Compose.
✈️ Telegram-экосистема: Telegram Web Apps (TWA/TMA), Next.js, Supabase RLS, Telegram Stars, Telethon/Pyrogram OSINT.
🌐 Scraping: Playwright Stealth, WAF & Cloudflare bypass, извлечение скрытых данных из SSR __NEXT_DATA__.`,

  transport: `Сетевой инжиниринг & Отказоустойчивые транспортные сети:

• Проектирование распределенной транспортной инфраструктуры для стабильной передачи данных в условиях сетевых аномалий и глубокой инспекции пакетов (DPI).
• Протоколы: VLESS, Xray-core, XHTTP (packet-up) и WebSocket TLS.
• Anycast CDN & Интеллектуальная маршрутизация: автоматический выбор чистых узлов через Fastly CDN и Cloudflare Edge.
• Zero-Downtime Hot-Reloading: синхронизация и менеджмент клиентских сессий через gRPC API ядра Xray прямо в оперативной памяти (без прерывания соединений и без перезапуска демонов).
• Крипто-доставка и Anti-Theft: Happ Crypt5 API и аппаратно-зависимая валидация сессий (1-Device Lock) в мобильных сетях CGNAT.
• Тюнинг ядра Linux: алгоритмы BBR, буферы TCP и строгие списки доступа iptables.`,

  copilot: `B2B Customs Copilot (Классификатор ТН ВЭД):

• База: 35,000+ кодов номенклатуры.
• Сверхбыстрый Hybrid RAG: векторный ONNX (FastEmbed BGE-small) + полнотекстовый BM25 (SQLite FTS5) с RRF-слиянием.
• Время отклика: 4.5 миллисекунды.
• Dual-Path Ingestion: чтение цифровых PDF за 89 мс + OCR сканов с прецизионным сжатием Pillow.
• ExcelEngine: генерация сложнейших корпоративных отчетов пиксель-в-пиксель.`,

  projects: `Ключевые проекты Мекана:

1. Resilient Transport Core & Anycast Routing — распределенная сетевая транспортная инфраструктура с Anycast CDN и Happ Crypt5.
2. B2B Customs Copilot — AI-ассистент для ВЭД с гибридным RAG (4.5ms) и ExcelEngine.
3. "Smart Policeman" & TMA Hub — мобильный интерфейс управления парсерами и AI-агентами внутри Telegram с Supabase RLS и Telegram Stars.
4. Marketplaces Custom Chrome Extension — инъекция в DOM WB/Ozon для модерации и аналитики.
5. Enterprise Automation Dashboards — 230+ n8n сценариев, интеграция с базами данных и очередями.
6. Anti-Fraud Bypass & Scraper Suite — обход WAF через Playwright и AppleScript, LinkedIn Job Agent, Ozon Auto-Reply.`,

  contact: `Прямые контакты Мекана:

📱 Телефон: +993 63 126699
💬 WhatsApp: https://wa.me/99363126699
✈️ Telegram: @irreproachablee (https://t.me/irreproachablee)
✉️ Email: mikhailmammeedov@gmail.com
📍 Локация: Remote / Global Availability
⚡ Формат: Boutique Automation Architect & Lead AI-Engineer`,

  hire: `Мекан открыт для высоконагруженных и сложных архитектурных проектов!
Связаться можно напрямую в Telegram: @irreproachablee ✨`
};

const kb_en = {
  skills: `Mekan Mammedov's Engineering Stack:

🛡️ Network Engineering: Resilient end-to-end encrypted protocols (VLESS, Xray-core, XHTTP packet-up), Anycast CDN (Fastly), Cloudflare Edge, Happ Crypt5, 1-Device Lock, in-memory gRPC hot-reloading (adu/rmu).
🤖 AI & RAG: Ultra-Fast Hybrid RAG (BM25 FTS5 + FastEmbed BGE-small ONNX) with Reciprocal Rank Fusion (4.5ms across 35k codes), Pydantic, Vision LLM OCR, ExcelEngine.
⚙️ Backend & Data: Python, FastAPI, Asyncio, asyncpg, PostgreSQL 16, Redis, RabbitMQ, Docker Compose.
✈️ Telegram Ecosystem: Telegram Web Apps (TWA/TMA), Next.js, Supabase RLS, Telegram Stars, Telethon/Pyrogram OSINT.
🌐 Scraping: Playwright Stealth, WAF & Cloudflare bypass, SSR __NEXT_DATA__ extraction.`,

  transport: `Network Engineering & Resilient Transport Networks:

• Architecting distributed transport infrastructure for mission-critical reliability under severe network constraints and deep packet filtering (DPI).
• Protocols: VLESS, Xray-core, XHTTP (packet-up), WebSocket TLS, and Reality.
• Anycast CDN & Intelligent Routing: Automatic clean node failover via Fastly CDN and Cloudflare Edge.
• Zero-Downtime Hot-Reloading: In-memory client session lifecycle synchronization via Xray gRPC API without daemon restarts or active session drops.
• Cryptographic Delivery: Happ Crypt5 API and hardware-bound 1-Device Lock under dynamic mobile CGNAT.
• Linux Kernel Hardening: TCP BBR congestion control, buffer optimization, and strict iptables edge filtering.`,

  copilot: `B2B Customs Copilot (HS Code Classifier):

• Database: 35,000+ classification codes.
• Sub-5ms Hybrid RAG: Dense ONNX vectors (FastEmbed BGE-small) + Lexical BM25 (SQLite FTS5) with Reciprocal Rank Fusion.
• Latency: 4.5 milliseconds.
• Dual-Path Ingestion: Sub-100ms digital PDF parsing (89ms) + Vision OCR with Pillow compression.
• ExcelEngine: Pixel-perfect automated corporate spreadsheet generation.`,

  projects: `Mekan's Flagship Deployments:

1. Resilient Transport Core & Anycast Routing — distributed mission-critical transport with Anycast CDN and Happ Crypt5.
2. B2B Customs Copilot — AI intelligence for international trade with 4.5ms hybrid RAG and ExcelEngine.
3. "Smart Policeman" & TMA Hub — mobile command interface inside Telegram with Supabase RLS and Telegram Stars.
4. Marketplaces Custom Chrome Extension — DOM injection for real-time marketplace moderation and analytics.
5. Enterprise Automation Dashboards — 230+ n8n workflows, high-scale database handling, and RabbitMQ queues.
6. Anti-Fraud Bypass & Scraper Suite — Cloudflare WAF bypass, LinkedIn AI Job Agent, Ozon review automation.`,

  contact: `Mekan's Direct Contacts:

📱 Phone: +993 63 126699
💬 WhatsApp: https://wa.me/99363126699
✈️ Telegram: @irreproachablee (https://t.me/irreproachablee)
✉️ Email: mikhailmammeedov@gmail.com
📍 Location: Remote / Worldwide Availability
⚡ Role: Boutique Automation Architect & Lead AI-Engineer`,

  hire: `Mekan is open to high-impact architectural and engineering opportunities!
Reach out directly on Telegram: @irreproachablee ✨`
};

function getReply(m) {
  const isEn = (document.documentElement.getAttribute('lang') || 'ru') === 'en';
  const kb = isEn ? kb_en : kb_ru;
  m = m.toLowerCase();

  if (/skill|стек|навык|технолог|stack/.test(m)) return kb.skills;
  if (/транспорт|сетев|transport|vless|xray|protocol|anycast|fastly|bbr|dpi/.test(m)) return kb.transport;
  if (/copilot|rag|таможн|тн вэд|hs code|search|customs/.test(m)) return kb.copilot;
  if (/project|проект|портфолио|кейс|built/.test(m)) return kb.projects;
  if (/hire|нанят|сотрудничеств|заказ|работ|contact|connect/.test(m)) return kb.hire;
  if (/связ|контакт|телеграм|почт|email|telegram|phone|whatsapp/.test(m)) return kb.contact;
  if (/hello|hi|hey|привет|здравствуй/.test(m)) {
    return isEn
      ? "Hello! 👋 I am Mekan's assistant. Ask me about network infrastructure, AI/RAG systems (Customs Copilot), projects, or how to get in touch!"
      : "Привет! 👋 Я интерактивный ассистент Мекана. Спросите меня о сетевой инфраструктуре, AI-системах (Customs Copilot), проектах или контактах!";
  }
  return isEn
    ? "Great question! You can discuss this directly with Mekan on Telegram @irreproachablee or check out the projects section!"
    : "Отличный вопрос! Вы можете подробнее обсудить эту задачу напрямую с Меканом в Telegram @irreproachablee или заглянуть в раздел проектов!";
}

function addMsg(text, type) {
  const el = document.createElement('div');
  el.className = `msg ${type}`;
  el.textContent = text;
  const m = document.getElementById('chatMessages');
  if (m) {
    m.appendChild(el);
    m.scrollTop = m.scrollHeight;
  }
}

async function sendMessage() {
  const inp = document.getElementById('chatInput');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  addMsg(text, 'user');

  const qr = document.getElementById('quickReplies');
  if (qr) qr.style.display = 'none';

  const msgs = document.getElementById('chatMessages');
  const t = document.createElement('div');
  t.className = 'msg bot typing';
  t.innerHTML = '<span class="typing-dot">●</span> <span class="typing-dot">●</span> <span class="typing-dot">●</span>';
  if (msgs) {
    msgs.appendChild(t);
    msgs.scrollTop = 99999;
  }

  await new Promise(r => setTimeout(r, 500 + Math.random() * 350));
  t.remove();
  addMsg(getReply(text), 'bot');
}

function sendQuick(t) {
  const inp = document.getElementById('chatInput');
  if (inp) inp.value = t;
  sendMessage();
}

/* ── LANGUAGE CHANGE HOOK ── */
function onLanguageChanged(lang) {
  TAB_ACTIVE = lang === 'en' ? 'Mekan Mammedov | Lead AI-Engineer' : 'Мекан Маммедов | Lead AI-Engineer';
  document.title = TAB_ACTIVE;

  activePhrases = lang === 'en' ? phrases_en : phrases_ru;

  // Update quick replies in chatbot
  const qr = document.getElementById('quickReplies');
  if (qr) {
    qr.innerHTML = lang === 'en'
      ? `<button type="button" class="quick-btn" onclick="sendQuick('Tech Stack')">Tech Stack</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Transport Networks')">Transport Networks</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Customs Copilot')">Customs Copilot</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Hire Me')">Hire Me</button>`
      : `<button type="button" class="quick-btn" onclick="sendQuick('Стек навыков')">Стек навыков</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Транспортные сети')">Транспортные сети</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Customs Copilot')">Customs Copilot</button>
         <button type="button" class="quick-btn" onclick="sendQuick('Связаться / Нанять')">Связаться</button>`;
  }
}
