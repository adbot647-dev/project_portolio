// ─── PROJECT DATA ─────────────────────────────────────
// เพิ่ม project ใหม่ได้ที่นี่เลย
const projects = [
  {
    id: 1,
    title: "Luca Store",
    category: "E-Commerce",
    description: "เว็บไซต์ขายของออนไลน์ ดีไซน์ clean ใช้งานง่าย",
    image: "assets/preview/project1.png",
    emoji: "🛒",
    tags: ["React", "Tailwind CSS", "Vite"],
    link: "https://luca.koralab.work/",
  },
  // ── เพิ่ม project ใหม่ตรงนี้ ──
  // {
  //   id: 2,
  //   title: "Project Two",
  //   category: "Landing Page",   // <-- ใส่ category ที่ต้องการ
  //   description: "คำอธิบาย",
  //   image: "assets/preview/project2.png",
  //   emoji: "🚀",
  //   tags: ["Next.js", "Prisma"],
  //   link: "https://project2.com",
  // },
];

// ─── SKILLS DATA ──────────────────────────────────────
const skills = [
  "HTML / CSS", "JavaScript", "React", "Next.js",
  "Tailwind CSS", "Node.js", "Figma", "Vite",
];

// ─── GROUP BY CATEGORY ────────────────────────────────
function groupByCategory(list) {
  return list.reduce((acc, p) => {
    const cat = p.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});
}

// ─── RENDER PROJECTS (NETFLIX SHELVES) ────────────────
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const grouped = groupByCategory(projects);

  grid.innerHTML = Object.entries(grouped).map(([category, items]) => `
    <div class="shelf">
      <h3 class="shelf-title">${category}</h3>
      <div class="shelf-wrapper">
        <button class="shelf-arrow shelf-arrow--left" onclick="scrollShelf(this, -1)" aria-label="scroll left">&#8249;</button>
        <div class="shelf-track">
          ${items.map((p, i) => `
            <article
              class="project-card"
              onclick="openProject('${p.link}')"
              style="transition-delay: ${i * 80}ms"
            >
              <div class="card-image-wrap">
                ${p.image
                  ? `<img src="${p.image}" alt="${p.title}" loading="lazy"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
                  : ""}
                <div class="card-placeholder" style="${p.image ? "display:none" : ""}">
                  ${p.emoji || "✦"}
                </div>
                <div class="card-overlay">
                  <span class="card-overlay-btn">View Site →</span>
                </div>
              </div>
              <div class="card-body">
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.description}</p>
                <div class="card-tags">
                  ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
                </div>
              </div>
            </article>
          `).join("")}
        </div>
        <button class="shelf-arrow shelf-arrow--right" onclick="scrollShelf(this, 1)" aria-label="scroll right">&#8250;</button>
      </div>
    </div>
  `).join("");
}

// ─── SCROLL SHELF ─────────────────────────────────────
function scrollShelf(btn, dir) {
  const track = btn.closest(".shelf-wrapper").querySelector(".shelf-track");
  track.scrollBy({ left: dir * 360, behavior: "smooth" });
}

// ─── RENDER SKILLS ────────────────────────────────────
function renderSkills() {
  const container = document.getElementById("skills-tags");
  if (!container) return;
  container.innerHTML = skills
    .map((s) => `<span class="skill-tag">${s}</span>`)
    .join("");
}

// ─── OPEN PROJECT ─────────────────────────────────────
function openProject(link) {
  if (!link) return;
  window.open(link, "_blank", "noopener,noreferrer");
}

// ─── SCROLL REVEAL ────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".project-card").forEach((el) => {
    observer.observe(el);
  });
}

// ─── NAV SCROLL EFFECT ────────────────────────────────
function initNav() {
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav.style.borderBottomColor =
      window.scrollY > 40
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.08)";
  });
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initNav();
  requestAnimationFrame(() => {
    requestAnimationFrame(initScrollReveal);
  });
});
