(function () {
  const C = (window.LIVE_SITE_CONFIG ||= {});
  const $ = (id) => document.getElementById(id);

  // Title & text
  if (C.title) document.title = C.title;
  if ($("ownerName")) $("ownerName").textContent = C.name || "Joshua Clifford";
  if ($("footerName")) $("footerName").textContent = C.name || "Joshua Clifford";
  if ($("ownerRole")) $("ownerRole").textContent = C.role || "";
  if ($("siteTagline") && C.tagline) $("siteTagline").textContent = C.tagline;

  // Links
  const set = (id, href, fallback = "#") => {
    const el = $(id);
    if (!el) return;
    if (href) { el.href = href; el.removeAttribute("aria-disabled"); }
    else { el.href = fallback; el.setAttribute("aria-disabled", "true"); }
  };
  set("githubLink", C.github);
  set("resumeLink", C.resumeUrl);
  set("linkedinLink", C.linkedin);
  set("contactLink", C.email ? `mailto:${C.email}` : "");
  set("emailLink", C.email ? `mailto:${C.email}` : "");
  set("projectRepo", C.projectRepo || C.github);

  // Year
  const y = $("year"); if (y) y.textContent = new Date().getFullYear();

  // Theme toggle with persistence
  const root = document.documentElement;
  const key = "liveSiteTheme";
  const saved = localStorage.getItem(key);
  if (saved === "light") root.classList.add("light");
  const btn = $("themeToggle");
  btn?.addEventListener("click", () => {
    const isLight = root.classList.toggle("light");
    localStorage.setItem(key, isLight ? "light" : "dark");
    btn.setAttribute("aria-pressed", isLight);
  });
})();
