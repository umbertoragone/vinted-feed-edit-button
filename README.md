# Vinted Feed Edit Button

A lightweight userscript that adds an `Edit` button below existing actions in Vinted member feed grid items.

The button points to the item edit page and uses the browser's displayed language for its label instead of guessing from the domain extension.

---

## Features

- Adds an `Edit` button to Vinted feed grid items
- Uses browser language to localize the label
- Works on dynamically loaded feed content
- Client-side only, no external dependencies
- Compatible with Chrome, Firefox, Opera, Safari, and Edge

---

## Supported Pages

The script is enabled on these Vinted member pages:

- `https://www.vinted.it/member/*`
- `https://www.vinted.com/member/*`
- `https://www.vinted.fr/member/*`
- `https://www.vinted.de/member/*`
- `https://www.vinted.es/member/*`

---

## How It Works

The script:

1. Scans member feed grid items
2. Extracts the item ID from the card DOM
3. Finds the item footer
4. Appends an `Edit` link that points to `/items/{id}/edit`
5. Watches for new items as Vinted loads content dynamically

The label is resolved from browser locale signals such as `navigator.languages`, `navigator.language`, and the page language, with English as fallback.

---

## Installation

### Option 1. Using Tampermonkey

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Create a new userscript.
3. Paste the contents of [`vinted-edit-button.user.js`](./vinted-edit-button.user.js).
4. Save the script and open a supported Vinted member page.

### Option 2. Using another userscript manager

1. Open your userscript manager.
2. Add a new script.
3. Paste the contents of [`vinted-edit-button.user.js`](./vinted-edit-button.user.js).
4. Save and refresh Vinted.

---

## Notes

- The script only adds the button when the item card already has existing actions.
- If Vinted changes its markup, the selectors may need an update.

---

## Development

The userscript metadata lives at the top of [`vinted-edit-button.user.js`](./vinted-edit-button.user.js).
That header defines the match rules, browser compatibility, and update URLs.
