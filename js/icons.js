/* Brand icon helper — Simple Icons CDN & Devicons */
const ICON = (name, color = 'ffffff') =>
  `https://cdn.simpleicons.org/${name}/${color.replace('#', '')}`;

const iconUrl = (entry) => {
  if (entry.src) return entry.src;
  if (entry.jsdelivr) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${entry.icon}.svg`;
  }
  return ICON(entry.icon, entry.color || 'ffffff');
};

const CONTACT_EMAIL = 'mikhailmammeedov@gmail.com';
const TELEGRAM_HANDLE = 'irreproachablee';

/* Tech Stack for Marquee Track - Carefully curated clean icons */
const TECH_STACK = [
  { name: 'Python', icon: 'python', color: '3776AB' },
  { name: 'FastAPI', icon: 'fastapi', color: '009688' },
  { name: 'PostgreSQL', icon: 'postgresql', color: '4169E1' },
  { name: 'Docker', icon: 'docker', color: '2496ED' },
  { name: 'Redis', icon: 'redis', color: 'DC382D' },
  { name: 'RabbitMQ', icon: 'rabbitmq', color: 'FF6600' },
  { name: 'Linux', icon: 'linux', color: 'FCC624' },
  { name: 'Supabase', icon: 'supabase', color: '3ECF8E' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'Next.js', icon: 'nextdotjs', color: 'EAEAEA' },
  { name: 'n8n', icon: 'n8n', color: 'EA4B71' },
  { name: 'OpenAI', icon: 'openai', color: 'CDB4DB' },
  { name: 'Anthropic', icon: 'anthropic', color: 'D97757' },
  { name: 'Cloudflare', icon: 'cloudflare', color: 'F38020' },
  { name: 'Fastly', icon: 'fastly', color: 'FF282D' },
  { name: 'Playwright', icon: 'playwright', color: '2EAD33' },
  { name: 'SQLite', icon: 'sqlite', color: '003B57' },
  { name: 'Git', icon: 'git', color: 'F05032' }
];

/* Populate Marquee Track */
function initLogoTrack() {
  const track = document.getElementById('logoTrack');
  if (!track) return;
  track.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'skills-logo-row';

  // Double items for seamless infinite marquee loop
  const list = [...TECH_STACK, ...TECH_STACK];
  list.forEach(tech => {
    const pill = document.createElement('div');
    pill.className = 'logo-pill';
    pill.innerHTML = `
      <img src="${iconUrl(tech)}" alt="${tech.name}" loading="lazy" class="tech-icon-img" onerror="this.style.display='none'">
      <span class="logo-pill-text">${tech.name}</span>
    `;
    row.appendChild(pill);
  });

  track.appendChild(row);
}

/* Populate Social Links */
function initSocialLinks() {
  const container = document.getElementById('socialLinks');
  if (!container) return;
  container.innerHTML = '';

  const links = [
    { name: 'Telegram', url: 'https://t.me/irreproachablee', icon: 'telegram', color: '26A5E4' },
    { name: 'Email', url: 'mailto:mikhailmammeedov@gmail.com', icon: 'gmail', color: 'EA4335' },
    { name: 'GitHub', url: 'https://github.com', icon: 'github', color: 'FFFFFF' }
  ];

  links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'social-btn magnetic';
    a.setAttribute('aria-label', l.name);
    a.innerHTML = `
      <img src="${iconUrl(l)}" alt="${l.name}" class="social-btn-icon">
      <span class="social-btn-label">${l.name}</span>
    `;
    container.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLogoTrack();
  initSocialLinks();
});
