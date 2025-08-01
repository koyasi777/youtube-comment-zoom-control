// ==UserScript==
// @name         YouTubeコメント欄を拡大・縮小 🎥
// @name:ja      YouTubeコメント欄を拡大・縮小 🎥
// @name:en      Zoom Controls for YouTube Comments 🎥
// @name:zh-CN   YouTube评论区缩放控制 🎥
// @name:zh-TW   YouTube留言區縮放控制 🎥
// @name:ko      YouTube 댓글 확대/축소 제어 🎥
// @name:fr      Contrôle du zoom pour les commentaires YouTube 🎥
// @name:es      Control de zoom en comentarios de YouTube 🎥
// @name:de      Zoom-Steuerung für YouTube-Kommentare 🎥
// @name:pt-BR   Controle de zoom nos comentários do YouTube 🎥
// @name:ru      Управление масштабом комментариев на YouTube 🎥
// @version      1.0.0
// @description         YouTubeのコメント欄を拡大・縮小するUIを追加！ホイールでズーム、クリックでリセット。状態は保存されます。
// @description:ja      YouTubeのコメント欄を拡大・縮小するUIを追加！ホイールでズーム、クリックでリセット。状態は保存されます。
// @description:en      Adds zoom controls to YouTube comments! Scroll to zoom in/out, click to reset. Zoom level is saved.
// @description:zh-CN   为YouTube评论区添加缩放控件！滚轮缩放，点击重置，缩放等级会被保存。
// @description:zh-TW   為YouTube留言區新增縮放控制！滾輪縮放，點擊重設，縮放設定會被儲存。
// @description:ko      YouTube 댓글에 확대/축소 UI 추가! 스크롤로 조절, 클릭으로 리셋. 설정은 저장됩니다.
// @description:fr      Ajoute un contrôle de zoom aux commentaires YouTube ! Molette pour zoomer, clic pour réinitialiser. Niveau de zoom sauvegardé.
// @description:es      Agrega controles de zoom a los comentarios de YouTube. Rueda para ampliar/reducir, clic para restablecer. El nivel se guarda.
// @description:de      Fügt Zoomsteuerung für YouTube-Kommentare hinzu! Scrollen zum Zoomen, Klick zum Zurücksetzen. Zoom-Level wird gespeichert.
// @description:pt-BR   Adiciona controles de zoom aos comentários do YouTube! Role para ajustar, clique para redefinir. Nível salvo.
// @description:ru      Добавляет управление масштабом к комментариям на YouTube. Прокрутка — зум, клик — сброс. Уровень сохраняется.
// @namespace    https://github.com/koyasi777/youtube-comment-zoom-control
// @author       koyasi777
// @match        https://www.youtube.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// @license      MIT
// @compatible   firefox
// @homepageURL  https://github.com/koyasi777/youtube-comment-zoom-control
// @supportURL   https://github.com/koyasi777/youtube-comment-zoom-control/issues
// @icon         https://www.youtube.com/s/desktop/6e6a59d0/img/favicon_144x144.png
// ==/UserScript==

(async function() {
    'use strict';

    // --- 1. 設定 (Configuration) ---
    const SCRIPT_ID = 'youtube-comment-zoom-controls-container';
    const STYLE_ID = 'youtube-comment-zoom-style-sheet';
    const ZOOM_STORAGE_KEY = 'yt-comment-zoom-level';
    const DEFAULT_ZOOM = 100;
    const MIN_ZOOM = 50;
    const MAX_ZOOM = 200;
    const ZOOM_STEP = 5;
    const ZOOM_TARGET_SELECTOR = 'ytd-comment-thread-renderer';
    const UI_INJECTION_TARGET_SELECTOR = 'ytd-comments-header-renderer #sort-menu';

    // --- 2. 状態管理 (State Management) ---
    let currentZoom = await GM_getValue(ZOOM_STORAGE_KEY, DEFAULT_ZOOM);
    let commentObserver = null;

    if (typeof currentZoom !== 'number' || isNaN(currentZoom)) {
        currentZoom = DEFAULT_ZOOM;
    }


    // --- 3. スタイル管理 (Style Management) ---
    function setupStyleElement() {
        if (document.getElementById(STYLE_ID)) return;
        const styleElement = document.createElement('style');
        styleElement.id = STYLE_ID;
        (document.head || document.documentElement).appendChild(styleElement);
    }

    function updateZoomStyle(zoomLevel) {
        const styleElement = document.getElementById(STYLE_ID);
        if (!styleElement) return;

        const staticStyles = `
            ytd-comments-header-renderer #sort-menu #icon-label { font-size: 10.5px !important; }
            ytd-comments-header-renderer h2#count yt-formatted-string.count-text { font-size: 1.7rem !important; }
        `;
        const dynamicZoomStyle = zoomLevel === 100 ? '' :
            `${ZOOM_TARGET_SELECTOR} { zoom: ${zoomLevel}%; }`;
        styleElement.textContent = staticStyles + dynamicZoomStyle;
    }


    // --- 4. UIの生成と破棄 (UI Lifecycle) ---
    function createZoomControls() {
        if (document.getElementById(SCRIPT_ID)) return;

        const injectionTarget = document.querySelector(UI_INJECTION_TARGET_SELECTOR);
        if (!injectionTarget || !injectionTarget.parentElement) return;

        const container = document.createElement('div');
        container.id = SCRIPT_ID;
        Object.assign(container.style, {
            display: 'flex', alignItems: 'center', marginLeft: '16px', padding: '4px 8px',
            borderRadius: '8px', transition: 'background-color 0.2s', cursor: 'pointer', userSelect: 'none'
        });
        container.title = 'スクロールで拡大縮小 / クリックでリセット';

        const zoomIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        zoomIcon.setAttribute('viewBox', '0 0 24 24');
        Object.assign(zoomIcon.style, {
            width: '18px', height: '18px', marginRight: '6px',
            fill: 'var(--yt-spec-text-secondary)', transition: 'fill 0.2s',
        });
        zoomIcon.innerHTML = `<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>`;

        const zoomDisplay = document.createElement('div');
        Object.assign(zoomDisplay.style, {
            color: 'var(--yt-spec-text-secondary)', fontSize: '14px', fontWeight: '500',
            fontVariantNumeric: 'tabular-nums', transition: 'color 0.2s',
        });
        const updateDisplay = () => { zoomDisplay.textContent = `${currentZoom}%`; };

        const handleZoomUpdate = async () => {
            await GM_setValue(ZOOM_STORAGE_KEY, currentZoom);
            updateZoomStyle(currentZoom);
            updateDisplay();
        };

        container.onmouseenter = () => {
            container.style.backgroundColor = 'var(--yt-spec-badge-chip-background-hover)';
            zoomIcon.style.fill = 'var(--yt-spec-text-primary)';
            zoomDisplay.style.color = 'var(--yt-spec-text-primary)';
        };
        container.onmouseleave = () => {
            container.style.backgroundColor = 'transparent';
            zoomIcon.style.fill = 'var(--yt-spec-text-secondary)';
            zoomDisplay.style.color = 'var(--yt-spec-text-secondary)';
        };

        container.addEventListener('wheel', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const oldZoom = currentZoom;
            if (e.deltaY < 0) {
                currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
            } else {
                currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
            }
            if (oldZoom !== currentZoom) await handleZoomUpdate();
        }, { passive: false });

        container.addEventListener('click', async () => {
            if (currentZoom !== DEFAULT_ZOOM) {
                currentZoom = DEFAULT_ZOOM;
                await handleZoomUpdate();
            }
        });

        container.append(zoomIcon, zoomDisplay);
        injectionTarget.parentElement.insertBefore(container, injectionTarget.nextSibling);
        updateDisplay();
    }


    // --- 5. DOM監視と実行制御 (Observer & Execution Control) ---
    function observeAndCreate() {
        if (document.getElementById(SCRIPT_ID) || commentObserver) return;

        commentObserver = new MutationObserver((mutations, obs) => {
            if (document.querySelector(UI_INJECTION_TARGET_SELECTOR)) {
                createZoomControls();
                obs.disconnect();
                commentObserver = null;
            }
        });

        const targetNode = document.querySelector('ytd-page-manager') || document.body;
        commentObserver.observe(targetNode, { childList: true, subtree: true });
    }

    // --- 6. 初期化 (Initialization) ---
    function initialize() {
        setupStyleElement();
        updateZoomStyle(currentZoom);
        observeAndCreate();

        window.addEventListener('yt-navigate-finish', () => {
            document.getElementById(SCRIPT_ID)?.remove();
            observeAndCreate();
            updateZoomStyle(currentZoom);
        });
    }

    initialize();

})();
