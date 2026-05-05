// ==UserScript==
// @name         Vinted Feed Edit Button
// @version      1.0.0
// @description  Adds an Edit button below existing buttons in Vinted feed grid items
// @author       umbertoragone
// @match        https://www.vinted.it/member/*
// @match        https://www.vinted.com/member/*
// @match        https://www.vinted.fr/member/*
// @match        https://www.vinted.de/member/*
// @match        https://www.vinted.es/member/*
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @compatible   edge
// @downloadURL  https://github.com/umbertoragone/vinted-feed-edit-button/raw/main/vinted-feed-edit-button.user.js
// @updateURL    https://github.com/umbertoragone/vinted-feed-edit-button/raw/main/vinted-feed-edit-button.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // Keep only locales used by current Vinted markets.
  const EDIT_TEXT_BY_LOCALE = {
    en: "Edit",
    fr: "Modifier",
    de: "Bearbeiten",
    es: "Editar",
    it: "Modifica",
    nl: "Bewerken",
    pl: "Edytuj",
    pt: "Editar",
    cs: "Upravit",
    sk: "Upraviť",
    sl: "Uredi",
    hr: "Uredi",
    ro: "Editează",
    hu: "Szerkesztés",
    fi: "Muokkaa",
    sv: "Redigera",
    da: "Rediger",
    lt: "Redaguoti",
    lv: "Rediģēt",
    et: "Redigeeri",
    el: "Επεξεργασία",
  };
  const BUTTON_CLASS =
    "web_ui__Button__button web_ui__Button__outlined web_ui__Button__small web_ui__Button__primary web_ui__Button__truncated";

  function normalizeLocale(locale) {
    return String(locale || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
  }

  function getEditText() {
    const localeCandidates = [];

    if (Array.isArray(navigator.languages)) {
      localeCandidates.push(...navigator.languages);
    }

    if (navigator.language) {
      localeCandidates.push(navigator.language);
    }

    const documentLanguage = document.documentElement.lang;
    if (documentLanguage) {
      localeCandidates.push(documentLanguage);
    }

    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
      const resolvedLocale =
        Intl.DateTimeFormat().resolvedOptions().locale || "";
      if (resolvedLocale) {
        localeCandidates.push(resolvedLocale);
      }
    }

    for (const locale of localeCandidates) {
      const normalizedLocale = normalizeLocale(locale);
      if (EDIT_TEXT_BY_LOCALE[normalizedLocale]) {
        return EDIT_TEXT_BY_LOCALE[normalizedLocale];
      }

      const languageCode = normalizedLocale.split("-")[0];
      if (EDIT_TEXT_BY_LOCALE[languageCode]) {
        return EDIT_TEXT_BY_LOCALE[languageCode];
      }
    }

    return EDIT_TEXT_BY_LOCALE.en;
  }

  const EDIT_TEXT = getEditText();

  function createEditButton(itemId) {
    const button = document.createElement("a");
    button.href = `/items/${itemId}/edit`;
    button.className = BUTTON_CLASS;

    // Layout: full-width block with centered content
    button.style.marginTop = "8px";
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.textDecoration = "none";
    button.style.width = "100%";
    button.style.boxSizing = "border-box";

    const spanContent = document.createElement("span");
    spanContent.className = "web_ui__Button__content";

    const spanLabel = document.createElement("span");
    spanLabel.className = "web_ui__Button__label";
    spanLabel.textContent = EDIT_TEXT;

    spanContent.appendChild(spanLabel);
    button.appendChild(spanContent);

    return button;
  }

  function extractItemId(container) {
    const dataAttr = container.getAttribute("data-testid");
    if (dataAttr && dataAttr.startsWith("product-item-id-")) {
      return dataAttr.replace("product-item-id-", "");
    }

    const img = container.querySelector('[data-testid$="--image"]');
    if (img) {
      const imgData = img.getAttribute("data-testid");
      if (imgData) {
        const match = imgData.match(/product-item-id-(\d+)/);
        if (match) return match[1];
      }
    }

    const overlay = container.querySelector('a[href^="/items/"]');
    if (overlay) {
      const match = overlay.getAttribute("href").match(/\/items\/(\d+)/);
      if (match) return match[1];
    }

    return null;
  }

  function processGridItem(item) {
    if (item.dataset.editButtonAdded) return;

    const container = item.querySelector('[data-testid^="product-item-id-"]');
    if (!container) return;

    const itemId = extractItemId(container);
    if (!itemId) return;

    const footer = item.querySelector('[data-testid$="--footer"]');
    if (!footer) return;

    const existingButton = footer.querySelector("button, a");
    if (!existingButton) return;

    const editButton = createEditButton(itemId);
    footer.appendChild(editButton);
    item.dataset.editButtonAdded = "true";
  }

  function init() {
    const gridItems = document.querySelectorAll(
      '[data-testid="grid-item"], .feed-grid__item',
    );
    gridItems.forEach(processGridItem);
  }

  const observer = new MutationObserver(() => {
    init();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
