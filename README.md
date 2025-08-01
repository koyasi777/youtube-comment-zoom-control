# Zoom Controls for YouTube Comments 🎥

## 📌 Overview

This userscript adds **zoom controls to YouTube comment sections**.  
Use the mouse scroll to zoom in/out (from 50% to 200%), and click to reset to 100%.  
Your zoom level is saved persistently via `GM_getValue` / `GM_setValue`.

- 🖱️ Scroll to zoom in/out
- 👆 Click to reset zoom to 100%
- 💾 Zoom level is saved automatically
- 🎨 Clean styling, blends naturally with the YouTube UI

---

## 🛠 Installation

1. Install a userscript manager like **[Violentmonkey](https://violentmonkey.github.io/)** or **[Tampermonkey](https://www.tampermonkey.net/)**
2. Install the script from this link:  
   👉 [Install this userscript](https://raw.githubusercontent.com/koyasi777/youtube-comment-zoom-control/main/youtube-comment-zoom-control.user.js)

---

## 🤝 Recommended Companion Script

This script works especially well alongside  
👉 [**Tabview YouTube Totara**](https://greasyfork.org/en/scripts/501249-tabview-youtube-totara)

- Turns YouTube's description and comments into tabs for easier viewing
- Fully compatible with this zoom control script
- Use them together for a **cleaner, more focused YouTube experience**

---

## 🎮 How to Use

- **Scroll**: Zoom in/out (50%–200%)
- **Click**: Reset zoom to 100%

---

## 💡 Technical Details

- Zoom target: `ytd-comment-thread-renderer` elements
- UI is injected next to: `ytd-comments-header-renderer #sort-menu`
- Fully supports dark mode (uses YouTube's native theme variables)
- Supports SPA-style YouTube navigation (`yt-navigate-finish` listener)

---

## 🔗 Related Links

- [YouTube](https://www.youtube.com/)
- [Tabview YouTube Totara - GreasyFork](https://greasyfork.org/en/scripts/501249-tabview-youtube-totara)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Tampermonkey](https://www.tampermonkey.net/)

---

## 📜 License

MIT License  
Free to use, modify, and redistribute — use at your own risk.

---

> Tired of tiny, unreadable comments on YouTube?  
> Use this script to zoom in — and pair it with "Tabview YouTube Totara" for the best viewing experience!
