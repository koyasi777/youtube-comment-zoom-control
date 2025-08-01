# YouTubeコメント欄を拡大・縮小 🎥

## 📌 概要

YouTubeのコメント欄に **ズームコントロールUI** を追加するユーザースクリプトです。  
ホイールスクロールでコメント表示を拡大・縮小でき、クリックでデフォルト（100%）にリセット可能。  
ズームレベルは `GM_getValue` / `GM_setValue` により永続的に保存されます。

- 🖱️ ホイール操作でズームイン・ズームアウト（50%〜200%）
- 👆 クリックでズームをリセット
- 💾 ズーム状態は自動保存
- 🎨 コメント欄のレイアウトを崩さず、自然なスタイル適用

---

## 🛠 インストール方法

1. ブラウザに **[Violentmonkey](https://violentmonkey.github.io/)** または **[Tampermonkey](https://www.tampermonkey.net/)** をインストール
2. 以下のリンクからスクリプトをインストール：  
   👉 [このスクリプトをインストールする](https://raw.githubusercontent.com/koyasi777/youtube-comment-zoom-control/main/youtube-comment-zoom-control.user.js)

---

## 🤝 併用におすすめ

このスクリプトは、YouTubeのコメント欄や概要欄をタブ化する便利なスクリプト  
👉 [**Tabview YouTube Totara**](https://greasyfork.org/ja/scripts/501249-tabview-youtube-totara)  
との**併用がおすすめです！**

- コメント表示がタブで整理されて見やすくなる
- 本スクリプトのズームUIも違和感なく機能
- 両方使えば、**視認性＆操作性が大幅アップ！**

---

## 🎮 操作方法

- **スクロール**：拡大・縮小（50%〜200%）
- **クリック**：ズームレベルを100%にリセット

---

## 💡 技術的ポイント

- ズーム対象：`ytd-comment-thread-renderer` 要素
- UI挿入先：`ytd-comments-header-renderer #sort-menu` の右隣に表示
- ダークモード対応（YouTubeネイティブのテーマカラーに準拠）
- 動的読み込み対応：`yt-navigate-finish` イベントで再適用

---

## 🔗 関連リンク

- [YouTube](https://www.youtube.com/)
- [Tabview YouTube Totara - GreasyFork](https://greasyfork.org/ja/scripts/501249-tabview-youtube-totara)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Tampermonkey](https://www.tampermonkey.net/)

---

## 📜 ライセンス

MIT License  
自由に利用・改変・再配布できますが、自己責任でご利用ください。

---

> YouTubeでコメントが読みづらい？  
> このスクリプトで、**見やすいサイズ**に調整しよう！  
> さらに「Tabview YouTube Totara」と組み合わせれば、YouTube体験がもっと快適に。
