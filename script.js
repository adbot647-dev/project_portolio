// ─── PROJECT DATA ─────────────────────────────────────
// เพิ่ม project ใหม่ได้ที่นี่เลย
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "เว็บไซต์ตัวอย่างที่ 1 — อธิบายสั้นๆ ว่าทำอะไร เพื่อใคร",
    image: "assets/preview/project1.png",  // ใส่ screenshot ที่นี่
    emoji: "🌐",                           // แสดงถ้ายังไม่มี image
    tags: ["React", "Tailwind CSS", "Vite"],
    link: "https://luca.koralab.work/",      // path หรือ URL จริง
  },
  // ── เพิ่ม project ใหม่ตรงนี้ ──
  // {
  //   id: 2,
  //   title: "Project Two",
  //   description: "คำอธิบาย",
  //   image: "assets/preview/project2.png",
  //   emoji: "🛒",
  //   tags: ["Next.js", "Prisma"],
  //   link: "https://project2.com",
  // },
];

// ─── SKILLS DATA ──────────────────────────────────────
const skills = [
  "HTML / CSS", "JavaScript", "React", "Next.js",
  "Tailwind CSS", "Node.js", "Figma", "Vite",
];

// ─── RENDER PROJECTS ──────────────────────────────────
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => `
    <article
      class="project-card"
      onclick="openProject('${p.link}')"
      style="transition-delay: ${i * 80}ms"
    >
      <div class="card-image-wrap">
        ${
          p.image
            ? `<img src="${p.image}" alt="${p.title}" loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
            : ""
        }
        <div class="card-placeholder" style="${p.image ? "display:none" : ""}">
          ${p.emoji || "✦"}
        </div>
        <div class="card-overlay">
          <span class="card-overlay-btn">View Site →</span>
        </div>
      </div>
      <div class="card-body">
        <p class="card-num">${String(p.id).padStart(2, "0")}</p>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
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
  // ให้ DOM โหลด card ก่อนแล้วค่อย observe
  requestAnimationFrame(() => {
    requestAnimationFrame(initScrollReveal);
  });
});
