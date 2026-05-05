# Vinted Feed Edit Button

[![GitHub release](https://img.shields.io/github/v/release/umbertoragone/vinted-feed-edit-button)](https://github.com/umbertoragone/vinted-feed-edit-button/releases)

A lightweight userscript that adds an **Edit** button below existing actions in Vinted member feed grid items.

---

## Features

- Adds an **Edit** button to Vinted feed grid items
- Uses browser language to localize the label
- Works on dynamically loaded feed content
- Client-side only, no external dependencies
- Compatible with Chrome, Firefox, Opera, Safari, and Edge

---

## How It Works

The script:

1. Scans member feed grid items
2. Extracts the item ID from the card DOM
3. Finds the item footer
4. Appends an **Edit** link that points to `/items/{id}/edit`
5. Watches for new items as Vinted loads content dynamically

The label is resolved from browser locale signals such as `navigator.languages`, `navigator.language`, and page language, with English as fallback.

---

## Installation

### Option 1. Using Tampermonkey (Recommended)

[![Install](https://img.shields.io/badge/Install-Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/umbertoragone/vinted-feed-edit-button/main/vinted-feed-edit-button.user.js)

**Quick install:** Click badge above if Tampermonkey already installed.

Or install manually:

1. Install **[Tampermonkey](https://www.tampermonkey.net/)** for your browser.
2. Create new userscript.
3. Paste contents of [`vinted-feed-edit-button.user.js`](./vinted-feed-edit-button.user.js).
4. Save script and open supported Vinted member page.

### Option 2. Using AdGuard

[![Install](https://img.shields.io/badge/Install-AdGuard-68BC71?style=for-the-badge&logo=adguard&logoColor=white)](https://raw.githubusercontent.com/umbertoragone/vinted-feed-edit-button/main/vinted-feed-edit-button.user.js)

**Quick install:** Click badge above if AdGuard already installed.

Or install manually:

1. Open AdGuard settings.
2. Navigate to **Extensions → Userscripts** (or **Filters → Custom** if using extension).
3. Click **Add userscript**.
4. Enter direct URL to script: `https://raw.githubusercontent.com/umbertoragone/vinted-feed-edit-button/main/vinted-feed-edit-button.user.js`
5. AdGuard downloads and manages script automatically.
6. Refresh Vinted to activate it.

---

## Contribute

Pull requests welcome. If Vinted changes its layout again or you can help improve selector coverage or locale support, open an issue with an HTML snippet showing the updated card structure so selectors can be updated quickly.
