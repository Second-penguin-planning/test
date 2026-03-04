/* ==========================================
   徳永行政書士事務所 共通JS
   ハンバーガー + 将来多言語拡張対応
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ハンバーガーメニュー
  ========================= */

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {

    // 開閉
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("show");
    });

    // メニュークリック時に閉じる（スマホ）
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        nav.classList.remove("show");
      });
    });

    // 外側クリックで閉じる
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        nav.classList.remove("show");
      }
    });

    // Escキーで閉じる
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        hamburger.classList.remove("active");
        nav.classList.remove("show");
      }
    });
  }

  /* =========================
     スクロールでヘッダー影
  ========================= */

  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

  /* =========================
     多言語対応ベース（将来拡張用）
     data-i18n 属性を使う設計
  ========================= */

  const translations = {
    ja: {
      hero_cta: "無料相談はこちら"
    },
    en: {
      hero_cta: "Free Consultation"
    },
    tl: {
      hero_cta: "Libreng Konsultasyon"
    }
  };

  function setLanguage(lang) {

    if (!translations[lang]) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // ボタン状態切替
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.remove("active");
      if (btn.textContent.toLowerCase() === lang) {
        btn.classList.add("active");
      }
    });

    localStorage.setItem("siteLang", lang);
  }

  /* =========================
     言語初期化（将来用）
  ========================= */

  const savedLang = localStorage.getItem("siteLang");

  if (savedLang) {
    setLanguage(savedLang);
  }

  // 言語ボタンクリック時（将来SPA化する場合用）
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {

      // 現在はページ遷移型なので
      // 将来SPAにする場合は下記を有効化
      // e.preventDefault();

      const lang = btn.textContent.toLowerCase();
      setLanguage(lang);
    });
  });

});
