document.addEventListener("DOMContentLoaded", () => {

    // ================== KONFIGURASI ==================
    const CONFIG = {
        APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyYpSp_TqoaMbGztO46SuHGqpw6NwbylsE4awdKVAxWr7WRmNXMJvDfXMxW6jCrZB08Fw/exec',
        CHARACTERS: [
            { 
                id: 'kaitou', 
                name: 'Kaitou-kun', 
                icon: '🎩', 
                modelSrc: 'https://cdn.jsdelivr.net/gh/USERGAS/my-blog-assets/qe6apf.glb', 
                price: 0 
            },
            { 
                id: 'eins', 
                name: 'Kamen Rider Eins', 
                icon: '💙', 
                // GANTI URL INI DENGAN LINK MODEL 3D KUUGA KAMU
                modelSrc: 'https://cdn.jsdelivr.net/gh/USERGAS/my-blog-assets/einsanim.glb', 
                price: 100 
            },
        ],
        SHOP_ITEMS: [
            { id: 'access_code', name: 'Kode Akses 2 Hari Link Tanpa Iklan', icon: '🔑', cost: 900, discountCost: 100 }
        ],
        DISCOUNT_END_DATE: '2026-01-01T23:59:59', 
        API_KEYS: ["AIzaSyAHvk575K6-pzo9Kgoh9cTOZu59bEVHhDs", "AIzaSyCiWN_9wbrmGbxJEDY3S5Qbs0fzxwoLY2U", "AIzaSyDFeqTYfRsohlVPEX_6Q63-PEhkY3uTuWU", "AIzaSyCxTQ6GdOFotghEwu9LHfELByQbkSsZ6qc"],
        MODEL_NAME: "gemini-2.5-flash",
        MAX_IMAGE_SIZE_MB: 5,
        MAX_VIDEO_SIZE_MB: 25,
        ANIMATION_NAME_TALK: "Talk",
        ANIMATION_NAME_IDLE: "Idle",
        DAILY_MISSION_COUNT: 3,
        COINS_PER_MISSION: 10,
        MISSION_RESET_HOUR_LOCAL: 7,
        COINS_PER_MONSTER: 1,
        COINS_PER_SAFE: 5,
        COINS_PER_RUN: 10,
        PLAYER_MAX_HP: 100,
        MONSTER_MAX_HP: 100,
        SUPER_METER_MAX: 100,
        FULL_MISSIONS_LIST: [
            { id: 'beat_monster', text: `Kalahkan monster di Peta Misi` },
            { id: 'crack_safe', text: `Bobol brankas (Titik Kuning)` },
            { id: 'play_runner', text: `Main Cyber Run (Titik Biru)` },
            { id: 'ask_rider', text: 'Tanyakan tentang Kamen Rider' },
            { id: 'ask_sentai', text: 'Cari info tentang Super Sentai' },
            { id: 'ask_ultraman', text: 'Tanya soal Ultraman' },
            { id: 'ask_download', text: 'Tanyakan cara download' },
            { id: 'ask_hardsub', text: 'Tanyakan tentang format subtitle' },
            { id: 'ask_recommendation', text: 'Minta rekomendasi tontonan' },
            { id: 'ask_favorite', text: 'Tanyakan seri favorit Kaitou-kun' },
            { id: 'ask_about_blog', text: 'Tanya tentang blog Kaitou Fansub' },
            { id: 'ask_about_self', text: 'Tanya "siapa kamu?"' },
            { id: 'ask_kaiju', text: 'Tanyakan tentang Kaiju' },
            { id: 'ask_metalhero', text: 'Tanya soal genre Metal Hero' },
            { id: 'ask_encoder', text: 'Tanya tentang encoder H265' },
            { id: 'say_henshin', text: 'Katakan "Henshin!"' },
            { id: 'say_thankyou', text: 'Katakan "terima kasih" atau "makasih"' },
            { id: 'say_cool', text: 'Ucapkan kata "keren"' },
            { id: 'upload_image', text: 'Unggah sebuah gambar' },
            { id: 'upload_video', text: 'Unggah sebuah video' },
            { id: 'use_fullscreen', text: 'Gunakan mode layar penuh' },
            { id: 'use_kick_animation', text: 'Gunakan salah satu animasi tendangan' },
            { id: 'use_jump_animation', text: 'Gunakan salah satu animasi lompat' },
            { id: 'use_twirl_animation', text: 'Gunakan animasi berputar' },
            { id: 'use_punch_animation', text: 'Gunakan animasi pukulan' },
            { id: 'use_run_animation', text: 'Gunakan animasi lari' }
        ]
    };

    // ================== ELEMEN DOM ==================
    const DOM = {
        chatbotContainer: document.getElementById("kaitou-chatbot-container"),
        chatInputArea: document.getElementById("kaitou-chat-input-area"),
        chatWindow: document.getElementById("kaitou-chat-window"),
        chatButton: document.getElementById("kaitou-chat-button"),
        closeBtn: document.getElementById("close-btn"),
        chatScrollArea: document.getElementById("kaitou-chat-scroll-area"),
        chatInput: document.getElementById("kaitou-chat-input"),
        sendBtn: document.getElementById("kaitou-send-btn"),
        modelViewer: document.getElementById("kaitou-3d-viewer"),
        battleModelViewer: document.getElementById("kaitou-battle-viewer"),
        fullscreenBtn: document.getElementById("fullscreen-btn"),
        openSound: document.getElementById("kaitou-open-sound"),
        uploadBtn: document.getElementById("kaitou-upload-btn"),
        imageInput: document.getElementById("kaitou-image-input"),
        videoUploadBtn: document.getElementById("kaitou-video-upload-btn"),
        videoInput: document.getElementById("kaitou-video-input"),
        mediaIndicator: document.getElementById("kaitou-media-indicator"),
        mediaIndicatorText: document.getElementById("kaitou-media-indicator-text"),
        removeMediaBtn: document.getElementById("kaitou-remove-media-btn"),
        animationToggleBtn: document.getElementById("animation-toggle-btn"),
        animationControls: document.getElementById("kaitou-animation-controls"),
        missionToggleBtn: document.getElementById("mission-toggle-btn"),
        missionPanel: document.getElementById("kaitou-mission-panel"),
        missionList: document.getElementById("mission-list"),
        streakCounter: document.getElementById("streak-counter"),
        sfxMissionComplete: document.getElementById("sfx-mission-complete"),
        missionCountdownElem: document.getElementById("mission-reset-countdown"),
        coinAmountElem: document.getElementById("coin-amount"),
        coinBalanceButton: document.getElementById("kaitou-coin-balance"),
        hubPopup: document.getElementById("kaitou-hub-popup"),
        closeHubBtn: document.getElementById("close-hub-btn"),
        shopList: document.getElementById("kaitou-shop-list"),
        historyList: document.getElementById("history-list"),
        garageGrid: document.getElementById("garage-grid"),
        skinLoadingOverlay: document.getElementById("skin-loading-overlay"),
        skinLoadingText: document.getElementById("skin-loading-text"),
        chatHeaderTitle: document.querySelector("#kaitou-chat-header > span"), // Judul Header buat ganti nama nanti
        hubTabs: document.querySelector(".hub-tabs"),
        hubPopupBox: document.getElementById("kaitou-hub-box"), 
        missionMapContainer: document.getElementById("kaitou-mission-map-container"),
        
        // BATTLE DOM
        battleOverlay: document.getElementById("kaitou-battle-overlay"),
        battleBox: document.getElementById("battle-box"),
        battleMonsterImg: document.getElementById("battle-monster-img"),
        battlePlayerName: document.querySelector("#player-side .battle-name"), 
        battleLogArea: document.getElementById("battle-log-area"),
        battleResultOverlay: document.getElementById("battle-result-overlay"),
        battleResultText: document.getElementById("battle-result-text"),
        sfxAttack: document.getElementById("sfx-attack-swing"),
        sfxMonsterHit: document.getElementById("sfx-monster-hit"),
        
        // SAFE GAME DOM
        safeOverlay: document.getElementById("kaitou-safe-overlay"),
        safeDial: document.getElementById("safe-dial"),
        closeSafeBtn: document.getElementById("close-safe-btn"),
        safeLights: [
            document.getElementById("safe-light-1"),
            document.getElementById("safe-light-2"),
            document.getElementById("safe-light-3")
        ],
        sfxSafeTick: document.getElementById("sfx-safe-tick"),
        sfxSafeClick: document.getElementById("sfx-safe-click"),
        sfxSafeOpen: document.getElementById("sfx-safe-open"),

        // RUNNER GAME DOM
        runnerOverlay: document.getElementById("kaitou-runner-overlay"),
        runnerMsgOverlay: document.getElementById("runner-msg-overlay"),
        runnerMsgTitle: document.getElementById("runner-msg-title"),
        runnerMsgDesc: document.getElementById("runner-msg-desc"),
        runnerStartBtn: document.getElementById("runner-start-btn"),
        runnerObjectsLayer: document.getElementById("runner-objects-layer"),
        runnerCoinCount: document.getElementById("runner-coin-count"),
        runnerLives: document.querySelector(".runner-lives"),
        runLeftBtn: document.getElementById("run-left-btn"),
        runRightBtn: document.getElementById("run-right-btn"),
        sfxCoinGet: document.getElementById("sfx-coin-get"),
        sfxCrash: document.getElementById("sfx-crash"),

        // MISC
        toast: document.getElementById("kaitou-toast-notification"),
        toastClose: document.getElementById("kaitou-toast-close"),
        playerHpBar: document.getElementById("player-hp-bar"),
        playerHpText: document.getElementById("player-hp-text"),
        enemyHpBar: document.getElementById("enemy-hp-bar"),
        enemyHpText: document.getElementById("enemy-hp-text"),
        specialMeterBar: document.getElementById("special-meter-bar"),
        usernamePopup: document.getElementById("kaitou-username-popup"),
        usernameInput: document.getElementById("kaitou-username-input"),
        saveUsernameBtn: document.getElementById("kaitou-save-username-btn"),
        rankDisplay: document.getElementById("kaitou-rank-display"),
        rankValue: document.getElementById("rank-value"),
        leaderboardPopup: document.getElementById("kaitou-leaderboard-popup"),
        closeLeaderboardBtn: document.getElementById("close-leaderboard-btn"),
        leaderboardListContainer: document.getElementById("leaderboard-list-container"),
        leaderboardTypeSelector: document.querySelector(".leaderboard-type-selector"),
        battleActionButtons: document.getElementById("battle-action-buttons")
    };

    // ================== STATE APLIKASI ==================
    let state = {
        currentFile: null,
        currentFilePreviewUrl: null,
        currentVideoThumbnailSrc: null,
        activeMonsterDot: null,
        chatHistory: [],
        userData: {},
        leaderboardData: { coins: [], fights: [] },
        currentMonsterHP: CONFIG.MONSTER_MAX_HP,
        playerHP: CONFIG.PLAYER_MAX_HP,
        superMeter: 0,
        isPlayerDodging: false,
        isGameTurn: "player",
        
        // Safe Game State
        isSafeGameActive: false,
        safeCombination: [],
        safeCurrentLevel: 0,
        safeUnlockTimer: null,
        currentDialAngle: 0,
        lastTickAngle: 0,
        isDraggingDial: false,

        // Runner Game State
        isRunnerActive: false,
        runnerLane: 1, // 0: Left, 1: Center, 2: Right
        runnerCoins: 0,
        runnerLives: 3,
        runnerSpeed: 2000, 
        runnerTimer: null,
        runnerGameLoop: null
    };

    // ================== FUNGSI PEMBANTU (UTILITIES) ==================
    const getTodayString = () => new Date().toISOString().slice(0, 10);
    
    const fileToBase64 = (file) => new Promise((resolve, reject) => { 
        const reader = new FileReader(); 
        reader.readAsDataURL(file); 
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = error => reject(error); 
    });

    const generateVideoThumbnail = (file) => new Promise((resolve, reject) => { 
        const video = document.createElement('video'); 
        const objectUrl = URL.createObjectURL(file); 
        video.src = objectUrl; 
        video.muted = true; 
        video.onloadeddata = () => { video.currentTime = 1; }; 
        video.onseeked = () => { 
            const canvas = document.createElement('canvas'); 
            canvas.width = video.videoWidth; 
            canvas.height = video.videoHeight; 
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); 
            URL.revokeObjectURL(objectUrl); 
            resolve(canvas.toDataURL('image/jpeg')); 
        }; 
        video.onerror = () => reject("Gagal memuat metadata video."); 
    });

    const playAnimation = (viewer, animationName, fallbackAnimation) => { 
        if (viewer?.availableAnimations.includes(animationName)) { 
            viewer.animationName = animationName; 
            viewer.play(); 
        } else if (fallbackAnimation) { 
            viewer.animationName = fallbackAnimation; 
            viewer.play(); 
        } 
    };

    const triggerVibration = (pattern) => {
        if (navigator.vibrate) {
            try { navigator.vibrate(pattern); } catch(e) {}
        }
    };

    const closeAllPanels = () => { 
        DOM.missionPanel.classList.remove("visible"); 
        DOM.animationControls.classList.remove("visible"); 
        DOM.hubPopup.style.display = 'none'; 
    };

    const preloadGameAudios = () => {
        const audios = [DOM.sfxSafeTick, DOM.sfxSafeClick, DOM.sfxSafeOpen, DOM.sfxAttack, DOM.sfxMonsterHit, DOM.sfxCoinGet, DOM.sfxCrash];
        audios.forEach(audio => {
            if(audio) {
                audio.load(); 
                audio.volume = 0.8; 
            }
        });
    };

    const formatMessage = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/\n/g, "<br>") : "";

    // ================== LOGIKA INTI CHAT ==================
    const addMessageToChat = (role, text, mediaInfo = null) => { 
        const messageDiv = document.createElement("div"); 
        messageDiv.classList.add("chat-message", `${role}-message`); 
        let progressBarElem = null; 

        if (mediaInfo?.src) { 
            let mediaContainer; 
            if (mediaInfo.type.startsWith('image')) { 
                mediaContainer = document.createElement('img'); 
                mediaContainer.style.cssText = 'max-width:100%;border-radius:10px;margin-bottom:10px;'; 
                mediaContainer.src = mediaInfo.src; 
            } else if (mediaInfo.type.startsWith('video')) { 
                mediaContainer = document.createElement('div'); 
                mediaContainer.className = 'video-container-base'; 
                mediaContainer.innerHTML = `<img class="video-thumbnail-img" src="${mediaInfo.thumbnailSrc}"/><div class="video-play-icon">▶</div>`; 
                mediaContainer.onclick = () => { 
                    const videoPlayer = document.createElement('video'); 
                    videoPlayer.src = mediaInfo.src; 
                    videoPlayer.controls = true; 
                    videoPlayer.autoplay = true; 
                    videoPlayer.style.cssText = 'width:100%;display:block;'; 
                    mediaContainer.innerHTML = ''; 
                    mediaContainer.appendChild(videoPlayer); 
                    mediaContainer.style.cursor = 'default'; 
                    mediaContainer.onclick = null; 
                }; 
            } 
            if (mediaContainer) messageDiv.appendChild(mediaContainer); 
        } 

        if (role === 'user' && mediaInfo) { 
            const progressContainer = document.createElement('div'); 
            progressContainer.className = 'upload-progress-container'; 
            progressBarElem = document.createElement('div'); 
            progressBarElem.className = 'upload-progress-bar'; 
            progressContainer.appendChild(progressBarElem); 
            messageDiv.appendChild(progressContainer); 
        } 

        const textSpan = document.createElement("span"); 
        if (role === 'user' && text) { 
            textSpan.innerHTML = formatMessage(text); 
        } 

        if (role === "bot") { 
            if (DOM.battleOverlay.style.display !== 'flex') { 
                playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_TALK, CONFIG.ANIMATION_NAME_IDLE); 
            } 
            const cursorSpan = document.createElement("span"); 
            cursorSpan.classList.add("typing-cursor"); 
            messageDiv.append(textSpan, cursorSpan); 
            DOM.chatScrollArea.appendChild(messageDiv); 
            
            let i = 0; 
            const typeWriter = () => { 
                if (i < text.length) { 
                    textSpan.innerHTML = formatMessage(text.substring(0, i + 1)); 
                    i++; 
                    DOM.chatScrollArea.scrollTop = DOM.chatScrollArea.scrollHeight; 
                    setTimeout(typeWriter, 2); 
                } else { 
                    textSpan.innerHTML = formatMessage(text); 
                    cursorSpan.remove(); 
                    if (DOM.battleOverlay.style.display !== 'flex') { 
                        playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE); 
                    } 
                } 
            }; 
            typeWriter(); 
        } else { 
            if (text || messageDiv.children.length > 0) { 
                messageDiv.appendChild(textSpan); 
                DOM.chatScrollArea.appendChild(messageDiv); 
            } 
        } 
        DOM.chatScrollArea.scrollTop = DOM.chatScrollArea.scrollHeight; 
        return { messageDiv, progressBarElem }; 
    };

    const sendMessage = async () => { 
        const userInput = DOM.chatInput.value.trim(); 
        const fileToSend = state.currentFile; 
        if (userInput === "" && !fileToSend) return; 
        checkMissionCompletion(userInput); 
        let userMediaInfo = null; 
        if (fileToSend) { 
            userMediaInfo = { type: fileToSend.type, src: state.currentFilePreviewUrl, thumbnailSrc: state.currentVideoThumbnailSrc }; 
        } 
        const { progressBarElem } = addMessageToChat("user", userInput, userMediaInfo); 
        const sentFile = fileToSend; 
        DOM.chatInput.value = ""; 
        resetInputs(); 
        const botPlaceholder = addMessageToChat("bot", "").messageDiv; 
        try { 
            const parts = []; 
            if (userInput) parts.push({ text: userInput }); 
            if (sentFile) { 
                const base64Data = await fileToBase64(sentFile); 
                parts.push({ inline_data: { mime_type: sentFile.type, data: base64Data } }); 
            } 
            state.chatHistory.push({ role: "user", parts: parts }); 
            const requestBody = { contents: state.chatHistory }; 
            const tryApiRequest = async (keyIndex) => { 
                if (keyIndex >= CONFIG.API_KEYS.length) throw new Error("All API keys failed."); 
                const currentApiKey = CONFIG.API_KEYS[keyIndex]; 
                try { 
                    const data = await uploadWithProgress(requestBody, (percentage) => { 
                        if (progressBarElem) progressBarElem.style.width = percentage + '%'; 
                    }, currentApiKey); 
                    return data; 
                } catch (error) { 
                    console.error(`API Key #${keyIndex + 1} gagal:`, error.message); 
                    return tryApiRequest(keyIndex + 1); 
                } 
            }; 
            const data = await tryApiRequest(0); 
            if (progressBarElem) progressBarElem.parentElement.style.display = 'none'; 
            let botResponse = "Maaf, aku tidak mengerti. Bisa coba lagi?"; 
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) { 
                botResponse = data.candidates[0].content.parts[0].text; 
            } 
            botPlaceholder.remove(); 
            addMessageToChat("bot", botResponse); 
            state.chatHistory.push({ role: "model", parts: [{ text: botResponse }] }); 
        } catch (error) { 
            console.error("Semua percobaan API gagal:", error); 
            botPlaceholder.remove(); 
            addMessageToChat("bot", `Waduh, ada sedikit gangguan. Coba lagi nanti ya.`); 
        } 
    };

    const uploadWithProgress = (body, onProgress, apiKey) => new Promise((resolve, reject) => { 
        const xhr = new XMLHttpRequest(); 
        xhr.open("POST", `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.MODEL_NAME}:generateContent?key=${apiKey}`); 
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.upload.onprogress = (event) => { 
            if (event.lengthComputable) onProgress((event.loaded / event.total) * 100); 
        }; 
        xhr.onload = () => { 
            if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText)); 
            else reject(new Error(`Server Error (${xhr.status}): ${xhr.responseText}`)); 
        }; 
        xhr.onerror = () => reject(new Error("Network Error")); 
        xhr.send(JSON.stringify(body)); 
    });

    const resetInputs = () => { 
        state.currentFile = null; 
        state.currentFilePreviewUrl = null; 
        state.currentVideoThumbnailSrc = null; 
        DOM.imageInput.value = ""; 
        DOM.videoInput.value = ""; 
        DOM.mediaIndicator.style.display = "none"; 
    };

    const handleFileInput = async (file) => { 
        if (!file) return; 
        resetInputs(); 
        const isImage = file.type.startsWith('image'); 
        const isVideo = file.type.startsWith('video'); 
        const maxSize = isImage ? CONFIG.MAX_IMAGE_SIZE_MB : CONFIG.MAX_VIDEO_SIZE_MB; 
        if (file.size > maxSize * 1024 * 1024) { 
            return alert(`Ukuran file terlalu besar! Maksimum ${maxSize} MB.`); 
        } 
        state.currentFile = file; 
        state.currentFilePreviewUrl = URL.createObjectURL(file); 
        if (isVideo) { 
            try { 
                state.currentVideoThumbnailSrc = await generateVideoThumbnail(file); 
            } catch (error) { 
                alert("Gagal memproses file video. Coba file lain."); 
                console.error(error); 
                resetInputs(); 
                return; 
            } 
        } 
        DOM.mediaIndicatorText.textContent = isImage ? 'Gambar terpilih!' : 'Video siap!'; 
        DOM.mediaIndicator.style.display = 'flex'; 
        DOM.chatInput.focus(); 
        if (isImage) checkMissionCompletion(null, 'upload_image'); 
        if (isVideo) checkMissionCompletion(null, 'upload_video'); 
    };

    // ================== LOGIKA PENGGUNA & INISIALISASI ==================
    const toggleChatWindow = () => {
        if (!state.userData.username) {
            DOM.chatWindow.classList.add("visible");
            DOM.usernamePopup.style.display = 'flex';
            DOM.usernameInput.focus();
            return;
        }
        const isVisible = DOM.chatWindow.classList.toggle("visible");
        
        if (isVisible) {
            if (DOM.chatScrollArea.children.length === 0 && state.chatHistory.length > 1) {
                addMessageToChat("bot", state.chatHistory[1].parts[0].text);
            }
            DOM.openSound?.play().catch(e => console.log("Audio play failed:", e));
            
            preloadGameAudios();

            // Pindahkan Model ke dalam Overlay jika game aktif
            if (state.isRunnerActive) {
                attachModelToRunner();
            } else if (DOM.battleOverlay.style.display === 'flex' || state.isSafeGameActive) {
                DOM.modelViewer.style.visibility = "hidden"; 
            } else {
                DOM.modelViewer.style.visibility = "visible"; 
                resetModelPosition();
            }
        } else {
            playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
            closeAllPanels();
        }
    };

const attachModelToRunner = () => {
        const playerWrapper = document.createElement('div');
        playerWrapper.className = 'runner-player-wrapper';
        DOM.runnerOverlay.querySelector('#runner-game-container').appendChild(playerWrapper);
        playerWrapper.appendChild(DOM.modelViewer);
        
        // SETTING MODEL
        DOM.modelViewer.style.visibility = "visible";
        DOM.modelViewer.style.backgroundColor = "transparent"; 
        DOM.modelViewer.cameraOrbit = "180deg 75deg 3m"; 
        DOM.modelViewer.fieldOfView = "30deg"; 
        DOM.modelViewer.removeAttribute('camera-controls'); 
        
        // [FIX UTAMA] Tambahkan atribut autoplay secara eksplisit
        DOM.modelViewer.setAttribute('autoplay', ''); 
        DOM.modelViewer.setAttribute('animation-name', 'Run');
        
        DOM.modelViewer.timeScale = 1.5; 
        DOM.modelViewer.play();

        updatePlayerLane();
    };

    const resetModelPosition = () => {
        document.getElementById("kaitou-chat-body-container").prepend(DOM.modelViewer);
        
        DOM.modelViewer.style.width = "100%";
        DOM.modelViewer.style.height = "100%";
        DOM.modelViewer.style.backgroundColor = ""; 
        DOM.modelViewer.timeScale = 1; 
        
        DOM.modelViewer.cameraOrbit = "0deg 88deg 1.0m"; 
        DOM.modelViewer.fieldOfView = "auto";
        DOM.modelViewer.setAttribute('camera-controls', ''); 
        
        playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
        
        const wrapper = DOM.runnerOverlay.querySelector('.runner-player-wrapper');
        if(wrapper) wrapper.remove();
    };

    const syncUserDataToServer = () => { try { if (state.userData && state.userData.lastLoginDate) { let userId = localStorage.getItem('kaitouVisitorId'); if (!userId) { userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9); localStorage.setItem('kaitouVisitorId', userId); } const missionsCompleted = state.userData.dailyMissions.filter(m => m.completed).length; const data = { userId: userId, username: state.userData.username || "Anonim", streak: state.userData.dayStreak || 0, missions: missionsCompleted, coins: state.userData.coins || 0, fights: state.userData.fightsWon || 0 }; const url = `${CONFIG.APPS_SCRIPT_URL}?action=sync_user_data&userId=${encodeURIComponent(data.userId)}&username=${encodeURIComponent(data.username)}&streak=${data.streak}&missions=${data.missions}&coins=${data.coins}&fights=${data.fights}`; fetch(url).then(response => response.json()).then(data => { if (data.status === 'error') console.error(`Error dari Google Script: ${data.message}`); }).catch(err => console.error(`Gagal terhubung ke server sync: ${err.toString()}`)); } } catch (err) { console.error(`Error di dalam fungsi syncUserDataToServer: ${err.toString()}`); } };
    const saveUserData = () => { try { localStorage.setItem('kaitouUserData', JSON.stringify(state.userData)); syncUserDataToServer(); } catch (e) { console.error("Gagal menyimpan data ke localStorage:", e); } };
    const updateCoinDisplay = () => { if (DOM.coinAmountElem) DOM.coinAmountElem.textContent = state.userData.coins || 0; };
    const generateNewMissions = () => [...CONFIG.FULL_MISSIONS_LIST].sort(() => 0.5 - Math.random()).slice(0, CONFIG.DAILY_MISSION_COUNT).map(m => ({ ...m, completed: false }));

    const initializeUserData = () => { 
        let storedData = null; 
        try { storedData = JSON.parse(localStorage.getItem('kaitouUserData')); } catch (e) { console.error("Gagal membaca data:", e); } 
        const today = getTodayString(); 
        
        if (!storedData) { 
            state.userData = { username: null, lastLoginDate: today, dayStreak: 1, dailyMissions: generateNewMissions(), coins: 0, unlockedCharacters: ['kaitou'], 
                activeCharacter: 'kaitou', lastMonsterSpawn: 0, fightsWon: 0 }; 
        } else { 
            state.userData = storedData; 
            const yesterday = new Date(); 
            yesterday.setDate(yesterday.getDate() - 1); 
            const yesterdayString = yesterday.toISOString().slice(0, 10); 
            
            if(!state.userData.unlockedCharacters) state.userData.unlockedCharacters = ['kaitou'];
            if(!state.userData.activeCharacter) state.userData.activeCharacter = 'kaitou';
            if (state.userData.lastLoginDate !== today) { 
                if (state.userData.lastLoginDate === yesterdayString) { 
                    state.userData.dayStreak = (state.userData.dayStreak || 0) + 1; 
                } else { 
                    state.userData.dayStreak = 1; 
                } 
                state.userData.dailyMissions = generateNewMissions(); 
            } 
            if (typeof state.userData.coins === 'undefined') state.userData.coins = 0; 
            if (typeof state.userData.fightsWon === 'undefined') state.userData.fightsWon = 0; 
            if (typeof state.userData.lastMonsterSpawn === 'undefined') state.userData.lastMonsterSpawn = 0; 
            if (typeof state.userData.username === 'undefined') state.userData.username = null; 
        } 
        finishInitialization(); 
    };

    const finishInitialization = () => { 
        initializeChatHistory(state.userData.username); 
        state.userData.lastLoginDate = getTodayString(); 
        applyCharacterMode(state.userData.activeCharacter);
        saveUserData(); 
        updateMissionPanelUI(); 
        updateCoinDisplay(); 
        if (state.userData.username) { 
            DOM.missionMapContainer.classList.add('visible'); 
            fetchUserRankAndLeaderboard(); 
        } 
        const now = Date.now(); 
        const spawnInterval = 1 * 60 * 1000; 
        if (now - (state.userData.lastMonsterSpawn || 0) > spawnInterval) { 
            spawnMonsters(); 
            state.userData.lastMonsterSpawn = now; 
            saveUserData(); 
        } 
        updateMapAlert(); 
    };

    const initializeChatHistory = (username) => { 
        const finalUsername = username || 'Sobat'; 
        const systemPrompt = `Mulai sekarang, kamu adalah 'Kaitou-kun', asisten AI yang ceria, ramah, dan keren dari blog Kaitou Fansub. Misimu adalah membantu pengunjung dan membuat mereka betah. Kamu sangat menyukai Tokusatsu. --- PENTING --- Pengguna yang sedang berbicara denganmu saat ini bernama **${finalUsername}**. Sapa dia dengan namanya sesekali agar terasa lebih akrab. --- Aturan lain: berikan jawaban sopan soal link download, jelaskan soal H265 dan Hardsub jadi tidak sembarang perangkat bisa memutarnya terutama TV atau Laptop, untuk tutorial cara download bisa tunjukkan link ini https://kaitoufansub.blogspot.com/p/tutorial-download.html, dan ajak follow media sosial.`; 
        state.chatHistory = [ 
            {role: "user", parts: [{text: systemPrompt}]}, 
            {role: "model", parts: [{text: `Halo, ${finalUsername}! Aku Kaitou-kun, partnermu di blog ini!

Senang bertemu denganmu! Aku bukan sekadar asisten biasa, lho. Kamu bisa mendapatkan **koin** dan hadiah dengan berinteraksi denganku.

**Ini yang bisa kamu lakukan:**
*   **🏆 Misi Harian:** Klik ikon piala di atas untuk melihat misimu hari ini. Selesaikan untuk dapat koin & jaga **Day Streak** 🔥 kamu!
*   **👾 Lawan Monster (Titik Merah):** Waspada! Radar di pojok bisa mendeteksi monster.
*   **🔐 Bobol Brankas (Titik Kuning):** Temukan kode rahasia dengan pendengaranmu.
*   **🏃 Cyber Run (Titik Biru):** Lari dan kumpulkan koin di dunia cyber!
*   **🔑 Tukar Hadiah:** Kumpulkan koinmu dan tukar dengan **Kode Akses Link Download Tanpa Iklan** di User Hub (ikon koin 🪙).`}]} 
        ]; 
    };

    const fetchUserRankAndLeaderboard = async () => { try { const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=coins`); const data = await response.json(); if (data.status !== 'success' || !data.leaderboard) { throw new Error('Gagal mengambil data peringkat'); } state.leaderboardData.coins = data.leaderboard; const myUsername = state.userData.username; const myRankIndex = data.leaderboard.findIndex(p => p.username === myUsername); const myRank = (myRankIndex !== -1) ? myRankIndex + 1 : '10+'; updateRankDisplay(myRank); } catch (error) { console.error("Gagal mengambil peringkat:", error); DOM.rankDisplay.classList.remove('visible'); } };
    const updateRankDisplay = (rank) => { if (!rank) return; DOM.rankValue.textContent = `#${rank}`; DOM.rankDisplay.classList.add('visible'); };
    const displayFullLeaderboard = async (type = 'coins') => { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Memuat papan skor...</p>`; DOM.leaderboardPopup.style.display = 'flex'; DOM.leaderboardTypeSelector.querySelectorAll('.leaderboard-type-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.leaderboardType === type); }); try { if (state.leaderboardData[type].length === 0) { const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=${type}`); const data = await response.json(); if (data.status === 'success') { state.leaderboardData[type] = data.leaderboard; } else { throw new Error(data.message); } } const leaderboard = state.leaderboardData[type]; if (leaderboard.length === 0) { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Belum ada data. Jadilah yang pertama!</p>`; return; } const list = document.createElement('ol'); list.id = 'full-leaderboard-list'; const scoreIcon = type === 'coins' ? '🪙' : '⚔️'; leaderboard.forEach(player => { const li = document.createElement('li'); li.innerHTML = `\n <span class="leaderboard-name">${player.username}</span>\n <span class="leaderboard-score">${player.score.toLocaleString("id-ID")} <span class="score-icon">${scoreIcon}</span></span>\n `; list.appendChild(li); }); DOM.leaderboardListContainer.innerHTML = ''; DOM.leaderboardListContainer.appendChild(list); } catch (error) { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Gagal memuat papan skor. Coba lagi nanti.</p>`; console.error('Leaderboard fetch error:', error); } };

    const updateMissionPanelUI = () => { 
        DOM.streakCounter.textContent = `🔥 Day Streak: ${state.userData.dayStreak || 0}`; 
        DOM.missionList.innerHTML = ''; 
        if (state.userData.dailyMissions) { 
            state.userData.dailyMissions.forEach(mission => { 
                const li = document.createElement('li'); 
                li.textContent = mission.text; 
                if (mission.completed) li.classList.add('completed'); 
                DOM.missionList.appendChild(li); 
            }); 
        } 
    };

    const checkMissionCompletion = (userInput = null, actionType = null) => { 
        if (!state.userData.dailyMissions) return; 
        const missionsToComplete = state.userData.dailyMissions.filter(m => !m.completed); 
        if (missionsToComplete.length === 0) return; 
        
        let missionAccomplished = false; 
        const lowerInput = userInput ? userInput.toLowerCase() : ''; 
        
        for (const mission of missionsToComplete) { 
            let currentMissionDone = false; 
            const check = (keywords) => keywords.some(kw => lowerInput.includes(kw));
            
            switch (mission.id) {
                case 'beat_monster': if (actionType === 'beat_monster') currentMissionDone = true; break;
                case 'crack_safe': if (actionType === 'crack_safe') currentMissionDone = true; break;
                case 'play_runner': if (actionType === 'play_runner') currentMissionDone = true; break;
                case 'ask_rider': if (check(['kamen rider'])) currentMissionDone = true; break;
                // ... (sisanya sama)
                case 'ask_sentai': if (check(['sentai'])) currentMissionDone = true; break;
                case 'ask_ultraman': if (check(['ultraman'])) currentMissionDone = true; break;
                case 'ask_download': if (check(['download', 'link'])) currentMissionDone = true; break;
                case 'ask_hardsub': if (check(['hardsub', 'subtitle'])) currentMissionDone = true; break;
                case 'ask_recommendation': if (check(['rekomendasi'])) currentMissionDone = true; break;
                case 'ask_favorite': if (check(['favorit', 'suka'])) currentMissionDone = true; break;
                case 'ask_about_blog': if (check(['blog ini', 'fansub ini', 'kaitou fansub', 'kaito fansub'])) currentMissionDone = true; break;
                case 'ask_about_self': if (check(['siapa kamu', 'kamu adalah'])) currentMissionDone = true; break;
                case 'ask_kaiju': if (check(['kaiju'])) currentMissionDone = true; break;
                case 'ask_metalhero': if (check(['metal hero'])) currentMissionDone = true; break;
                case 'ask_encoder': if (check(['encoder', 'h265'])) currentMissionDone = true; break;
                case 'say_henshin': if (check(['henshin'])) currentMissionDone = true; break;
                case 'say_thankyou': if (check(['terima kasih', 'makasih', 'thx', 'tq'])) currentMissionDone = true; break;
                case 'say_cool': if (check(['keren'])) currentMissionDone = true; break;
                case 'upload_image': if (actionType === 'upload_image') currentMissionDone = true; break;
                case 'upload_video': if (actionType === 'upload_video') currentMissionDone = true; break;
                case 'use_fullscreen': if (actionType === 'use_fullscreen') currentMissionDone = true; break;
                case 'use_kick_animation': if (actionType === 'animation_kick') currentMissionDone = true; break;
                case 'use_jump_animation': if (actionType === 'animation_jump') currentMissionDone = true; break;
                case 'use_twirl_animation': if (actionType === 'animation_twirl') currentMissionDone = true; break;
                case 'use_punch_animation': if (actionType === 'animation_punch') currentMissionDone = true; break;
                case 'use_run_animation': if (actionType === 'animation_run') currentMissionDone = true; break;
            }
            if (currentMissionDone) { mission.completed = true; missionAccomplished = true; break; } 
        } 
        
        if (missionAccomplished) { 
            state.userData.coins += CONFIG.COINS_PER_MISSION; 
            updateCoinDisplay(); 
            DOM.sfxMissionComplete?.play().catch(e => console.error("SFX Error:", e)); 
            triggerVibration([100, 50, 100]);
            let missionMessage = `✨ Misi selesai! Kamu mendapatkan ${CONFIG.COINS_PER_MISSION} Koin!`; 
            if (state.userData.dailyMissions.every(m => m.completed)) missionMessage = `🏆 Hebat! Semua misi harian selesai!`; 
            addMessageToChat('bot', missionMessage); 
            saveUserData(); 
            updateMissionPanelUI(); 
        } 
    };

    const updateMapAlert = () => { 
        let alertIcon = DOM.missionMapContainer.querySelector('#mission-map-alert'); 
        if (!alertIcon) { 
            alertIcon = document.createElement('div'); 
            alertIcon.id = 'mission-map-alert'; 
            alertIcon.textContent = '!'; 
            DOM.missionMapContainer.appendChild(alertIcon); 
        } 
        const totalDots = DOM.missionMapContainer.querySelectorAll('.monster-dot, .yellow-dot, .blue-dot').length; 
        alertIcon.classList.toggle('visible', totalDots > 0); 
    };

    const spawnMonsters = () => { 
        DOM.missionMapContainer.innerHTML = ''; 
        // 1. Monster (Red)
        const monsterCount = Math.floor(Math.random() * 3) + 1; 
        for (let i = 0; i < monsterCount; i++) { 
            const dot = document.createElement('div'); dot.className = 'monster-dot'; 
            dot.style.left = `${Math.random()*(DOM.missionMapContainer.clientWidth-14)}px`; 
            dot.style.top = `${Math.random()*(DOM.missionMapContainer.clientHeight-14)}px`; 
            dot.addEventListener('click', (e) => { e.stopPropagation(); state.activeMonsterDot = dot; startBattle(); }); 
            DOM.missionMapContainer.appendChild(dot); 
        } 
        
        // 2. Safe (Yellow)
        if(Math.random() > 0.5) {
             const yellowDot = document.createElement('div'); yellowDot.className = 'yellow-dot';
             yellowDot.style.left = `${Math.random()*(DOM.missionMapContainer.clientWidth-14)}px`; 
             yellowDot.style.top = `${Math.random()*(DOM.missionMapContainer.clientHeight-14)}px`;
             yellowDot.addEventListener('click', (e) => { e.stopPropagation(); state.activeMonsterDot = yellowDot; startSafeGame(); });
             DOM.missionMapContainer.appendChild(yellowDot);
        }

        // 3. Runner (Blue)
        if(Math.random() > 0.4) {
             const blueDot = document.createElement('div'); 
             blueDot.className = 'blue-dot'; 
             blueDot.style.width = "12px"; blueDot.style.height = "12px"; blueDot.style.backgroundColor = "#3498db";
             blueDot.style.borderRadius = "50%"; blueDot.style.border = "2px solid white";
             blueDot.style.position = "absolute"; blueDot.style.boxShadow = "0 0 10px #3498db";
             blueDot.style.animation = "pulse-blue 1.5s infinite";
             blueDot.style.left = `${Math.random()*(DOM.missionMapContainer.clientWidth-14)}px`; 
             blueDot.style.top = `${Math.random()*(DOM.missionMapContainer.clientHeight-14)}px`;
             blueDot.addEventListener('click', (e) => { e.stopPropagation(); state.activeMonsterDot = blueDot; startRunnerGame(); });
             DOM.missionMapContainer.appendChild(blueDot);
        }
        updateMapAlert(); 
    };

    // ================== GAME RUNNER (SWIPE + VISUAL FX) ==================
    let touchStartX = 0;
    let touchEndX = 0;

    const startRunnerGame = () => {
        state.isRunnerActive = true;
        state.runnerLane = 1; 
        state.runnerCoins = 0;
        state.runnerLives = 3;
        state.runnerSpeed = 1800;
        
        DOM.runnerOverlay.style.display = 'block';
        DOM.runnerMsgOverlay.style.display = 'flex';
        DOM.runnerMsgTitle.textContent = "CYBER RUN";
        DOM.runnerMsgDesc.textContent = "Swipe Kiri/Kanan. Ambil 10 Koin!";
        DOM.runnerObjectsLayer.innerHTML = '';
        DOM.runnerCoinCount.textContent = '0';
        updateRunnerLivesUI();
        
        attachModelToRunner();
    };

    const runGameLoop = () => {
        DOM.runnerMsgOverlay.style.display = 'none';
        
        const spawnObject = () => {
            if(!state.isRunnerActive) return;

            // [FIX UTAMA] Jantung Pacu: Cek setiap saat, kalau pause, paksa play!
            if (DOM.modelViewer.paused || DOM.modelViewer.animationName !== 'Run') {
                DOM.modelViewer.animationName = 'Run';
                DOM.modelViewer.play();
            }
            
            // ... (Kode spawn object di bawah ini SAMA seperti sebelumnya, jangan diubah) ...
            const obj = document.createElement('div');
            const isCoin = Math.random() > 0.4; 
            const lane = Math.floor(Math.random() * 3); 
            
            obj.className = `runner-obj ${isCoin ? 'obj-coin' : 'obj-obstacle'}`;
            obj.style.animation = `comeCloser ${state.runnerSpeed/1000}s linear forwards`;
            
            const lanePositions = ['20%', '50%', '80%'];
            obj.style.left = lanePositions[lane];
            
            obj.dataset.lane = lane;
            obj.dataset.type = isCoin ? 'coin' : 'obstacle';
            
            DOM.runnerObjectsLayer.appendChild(obj);
            
            setTimeout(() => {
                if(!state.isRunnerActive || !obj.parentNode) return;
                
                if (state.runnerLane === lane) {
                    if (!obj.classList.contains('collected') && !obj.classList.contains('hit')) {
                        if (isCoin) {
                            collectCoinRunner(obj);
                        } else {
                            hitObstacleRunner(obj);
                        }
                    }
                }
            }, state.runnerSpeed * 0.80);

            setTimeout(() => { if(obj.parentNode) obj.remove(); }, state.runnerSpeed);
            
            state.runnerTimer = setTimeout(spawnObject, 1200); 
        };
        
        spawnObject();
    };

    const moveRunner = (direction) => {
        // [FIX TAMBAHAN] Paksa play saat swipe
        DOM.modelViewer.play(); 

        const wrapper = DOM.runnerOverlay.querySelector('.runner-player-wrapper');
        if(direction === 'left' && state.runnerLane > 0) {
            state.runnerLane--;
            wrapper.classList.add('lean-left');
            setTimeout(() => wrapper.classList.remove('lean-left'), 200);
        }
        if(direction === 'right' && state.runnerLane < 2) {
            state.runnerLane++;
            wrapper.classList.add('lean-right');
            setTimeout(() => wrapper.classList.remove('lean-right'), 200);
        }
        updatePlayerLane();
    };

    const updatePlayerLane = () => {
        const wrapper = DOM.runnerOverlay.querySelector('.runner-player-wrapper');
        if(wrapper) {
            const positions = ['20%', '50%', '80%'];
            wrapper.style.left = positions[state.runnerLane];
        }
    };

    const collectCoinRunner = (obj) => {
        obj.classList.add('collected');
        state.runnerCoins++;
        DOM.runnerCoinCount.textContent = state.runnerCoins;
        
        if(DOM.sfxCoinGet) { DOM.sfxCoinGet.currentTime=0; DOM.sfxCoinGet.play().catch(e=>{}); }
        triggerVibration(50);

        if(state.runnerCoins >= CONFIG.COINS_PER_RUN) {
            setTimeout(() => endRunnerGame(true), 500); 
        }
    };

    const hitObstacleRunner = (obj) => {
        obj.classList.add('hit'); 
        state.runnerLives--;
        updateRunnerLivesUI();
        
        if(DOM.sfxCrash) { DOM.sfxCrash.currentTime=0; DOM.sfxCrash.play().catch(e=>{}); }
        triggerVibration(400);
        
        const flash = document.getElementById('runner-flash-overlay');
        if(flash) {
            flash.style.opacity = '0.6';
            setTimeout(() => flash.style.opacity = '0', 100);
        }

        const container = document.getElementById('runner-game-container');
        container.style.transform = "translateX(10px)";
        setTimeout(() => container.style.transform = "translateX(-10px)", 50);
        setTimeout(() => container.style.transform = "none", 100);

        if(state.runnerLives <= 0) {
            setTimeout(() => endRunnerGame(false), 500);
        }
    };

    const updateRunnerLivesUI = () => {
        let hearts = "";
        for(let i=0; i<state.runnerLives; i++) hearts += "❤";
        DOM.runnerLives.textContent = hearts;
    };

    const endRunnerGame = (isWin) => {
        state.isRunnerActive = false;
        if(state.runnerTimer) clearTimeout(state.runnerTimer);
        DOM.runnerObjectsLayer.innerHTML = '';
        
        if (state.activeMonsterDot) {
            state.activeMonsterDot.remove();
            state.activeMonsterDot = null;
        }

        DOM.runnerOverlay.style.display = 'none';
        resetModelPosition();
        updateMapAlert();
        
        if (isWin) {
            state.userData.coins += CONFIG.COINS_PER_RUN;
            updateCoinDisplay();
            saveUserData();
            checkMissionCompletion(null, 'play_runner');
            addMessageToChat('bot', `🏃‍♂️ Cyber Run Sukses! Kamu gesit sekali dan membawa pulang ${CONFIG.COINS_PER_RUN} Koin!`);
            triggerVibration([100, 50, 100, 50, 100]);
        } else {
            addMessageToChat('bot', `💥 Awas nabrak! Misi gagal. Koin tidak terselamatkan.`);
        }
    };

    const setupRunnerControls = () => {
        DOM.runnerStartBtn.addEventListener('click', runGameLoop);
        window.addEventListener('keydown', (e) => {
            if(state.isRunnerActive) {
                if(e.key === 'ArrowLeft') moveRunner('left');
                if(e.key === 'ArrowRight') moveRunner('right');
            }
        });
        const runnerContainer = document.getElementById('runner-game-container');
        runnerContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: false});
        runnerContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: false});
        runnerContainer.addEventListener('touchmove', (e) => {
            if(state.isRunnerActive) e.preventDefault();
        }, {passive: false});
    };

    const handleSwipe = () => {
        if (!state.isRunnerActive) return;
        const threshold = 30; 
        if (touchEndX < touchStartX - threshold) moveRunner('left');
        if (touchEndX > touchStartX + threshold) moveRunner('right');
    };

    // ================== LOGIKA BRANKAS & BATTLE (SAFE GAME & RPG) ==================
    const startSafeGame=()=>{state.isSafeGameActive=!0,state.safeCurrentLevel=0,state.currentDialAngle=0,state.lastTickAngle=0,state.safeCombination=[];for(let e=0;3>e;e++)state.safeCombination.push(Math.floor(360*Math.random()));const e=DOM.safeDial.querySelector(".dial-knob");e&&(e.style.backgroundColor="",e.style.boxShadow="",e.style.borderColor=""),DOM.safeDial.classList.remove("active-glow"),preloadGameAudios(),DOM.safeDial.style.transform="rotate(0deg)",DOM.safeLights.forEach(e=>e.classList.remove("unlocked")),DOM.modelViewer.style.visibility="hidden",DOM.safeOverlay.style.display="flex",addMessageToChat("bot",'🕵️ Kamu menemukan brankas terkunci! Naikkan Volume 🔊, putar dial perlahan. Saat tombol MENYALA KUNING 🟡, tahan sebentar!')};const checkSafeSweetSpot=()=>{if(3<=state.safeCurrentLevel)return;const e=state.safeCombination[state.safeCurrentLevel],t=Math.abs(state.currentDialAngle-e),n=DOM.safeDial.querySelector(".dial-knob");(10>t||10>360-t)?(n&&(n.style.backgroundColor="#f1c40f",n.style.boxShadow="0 0 20px #f1c40f, inset 0 0 10px #fff",n.style.borderColor="#fff"),DOM.safeDial.classList.add("active-glow"),state.safeUnlockTimer||(DOM.sfxSafeClick&&(DOM.sfxSafeClick.currentTime=0,DOM.sfxSafeClick.play().catch(e=>{})),triggerVibration(50),state.safeUnlockTimer=setTimeout(()=>{unlockSafeLevel()},500))):(n&&(n.style.backgroundColor="",n.style.boxShadow="",n.style.borderColor=""),DOM.safeDial.classList.remove("active-glow"),state.safeUnlockTimer&&(clearTimeout(state.safeUnlockTimer),state.safeUnlockTimer=null))};const unlockSafeLevel=()=>{state.safeUnlockTimer=null,triggerVibration([50,50,100]),DOM.sfxSafeOpen&&DOM.sfxSafeOpen.play().catch(e=>{}),DOM.safeLights[state.safeCurrentLevel].classList.add("unlocked");const e=DOM.safeDial.querySelector(".dial-knob");e&&(e.style.backgroundColor="",e.style.boxShadow=""),DOM.safeDial.classList.remove("active-glow"),state.safeCurrentLevel++,3<=state.safeCurrentLevel&&setTimeout(endSafeGameWin,500)};const endSafeGameWin=()=>{DOM.safeOverlay.style.display="none",state.isSafeGameActive=!1,DOM.chatWindow.classList.contains("visible")&&(DOM.modelViewer.style.visibility="visible"),state.activeMonsterDot&&(state.activeMonsterDot.remove(),state.activeMonsterDot=null),state.userData.coins+=CONFIG.COINS_PER_SAFE,updateCoinDisplay(),saveUserData(),checkMissionCompletion(null,"crack_safe"),addMessageToChat("bot",`🔓 KLIK! Brankas terbuka! Kamu menemukan ${CONFIG.COINS_PER_SAFE} Koin di dalamnya!`),updateMapAlert()};const closeSafeGame=()=>{DOM.safeOverlay.style.display="none",state.isSafeGameActive=!1,state.safeUnlockTimer&&clearTimeout(state.safeUnlockTimer),DOM.chatWindow.classList.contains("visible")&&(DOM.modelViewer.style.visibility="visible"),addMessageToChat("bot","🔒 Kamu membatalkan pembobolan brankas.")};const handleDialInput=(e,t=!1)=>{if(t)return void(state.isDraggingDial=!1);const n=DOM.safeDial.getBoundingClientRect(),o=n.left+n.width/2,a=n.top+n.height/2;let s,r;e.touches&&0<e.touches.length?(s=e.touches[0].clientX,r=e.touches[0].clientY):(s=e.clientX,r=e.clientY);const l=Math.atan2(r-a,s-o);let i=180*l/Math.PI+90;0>i&&(i+=360),state.currentDialAngle=i,DOM.safeDial.style.transform=`rotate(${i}deg)`,15<Math.abs(i-state.lastTickAngle)&&(DOM.sfxSafeTick&&(DOM.sfxSafeTick.currentTime=0,DOM.sfxSafeTick.play().catch(e=>{})),state.lastTickAngle=i,triggerVibration(5)),checkSafeSweetSpot()};const startBattle=()=>{state.currentMonsterHP=CONFIG.MONSTER_MAX_HP,state.playerHP=CONFIG.PLAYER_MAX_HP,state.superMeter=0,state.isPlayerDodging=!1,state.isGameTurn="player",DOM.modelViewer.style.visibility="hidden",DOM.battleLogArea.innerHTML="",updateBattleUI(),DOM.battleOverlay.style.display="flex",playAnimation(DOM.battleModelViewer,CONFIG.ANIMATION_NAME_IDLE),addBattleLog("Pertarungan dimulai! Pilih aksimu!")};const updateBattleUI=()=>{DOM.playerHpBar.style.width=`${state.playerHP/CONFIG.PLAYER_MAX_HP*100}%`,DOM.playerHpText.textContent=`${state.playerHP} / ${CONFIG.PLAYER_MAX_HP}`,DOM.enemyHpBar.style.width=`${state.currentMonsterHP/CONFIG.MONSTER_MAX_HP*100}%`,DOM.enemyHpText.textContent=`${state.currentMonsterHP} / ${CONFIG.MONSTER_MAX_HP}`,DOM.specialMeterBar.style.width=`${state.superMeter/CONFIG.SUPER_METER_MAX*100}%`,DOM.battleActionButtons.querySelectorAll(".action-btn").forEach(e=>{e.disabled="player"!==state.isGameTurn||"special-move-btn"===e.id&&state.superMeter<CONFIG.SUPER_METER_MAX})};const dealDamageToMonster=(e,t)=>{if("none"!==state.isGameTurn){playAnimation(DOM.battleModelViewer,t,"PunchC"),DOM.sfxAttack?.play(),triggerVibration(50),(state.currentMonsterHP-=e)<0&&(state.currentMonsterHP=0),DOM.battleMonsterImg.classList.add("flash-red"),setTimeout(()=>{DOM.sfxMonsterHit?.play(),DOM.battleMonsterImg.classList.remove("flash-red")},150),(state.superMeter+=3.5*e)>CONFIG.SUPER_METER_MAX&&(state.superMeter=CONFIG.SUPER_METER_MAX),updateBattleUI(),state.currentMonsterHP<=0?(state.isGameTurn="none",updateBattleUI(),setTimeout(()=>showBattleResult(!0),1500)):switchTurn("enemy")}};const dealDamageToPlayer=e=>{if("none"!==state.isGameTurn){let t=e;addBattleLog(`Monster menyerang dengan kekuatan ${e}!`),state.isPlayerDodging?(t=0,addBattleLog("Kamu berhasil menghindar! Tidak ada kerusakan!")):(DOM.battleBox.classList.add("shake-hard"),setTimeout(()=>DOM.battleBox.classList.remove("shake-hard"),400),triggerVibration(200)),(state.playerHP-=t)<0&&(state.playerHP=0),updateBattleUI(),state.playerHP<=0?(state.isGameTurn="none",updateBattleUI(),setTimeout(()=>showBattleResult(!1),1500)):switchTurn("player")}};const showBattleResult=e=>{DOM.battleResultText.textContent=e?"MENANG":"KALAH",DOM.battleResultText.className="battle-result-text",DOM.battleResultText.classList.add(e?"win-text":"lose-text"),DOM.battleResultOverlay.style.display="flex",setTimeout(()=>endBattle(e),2e3)};const endBattle=e=>{DOM.battleOverlay.style.display="none",DOM.battleResultOverlay.style.display="none",DOM.chatWindow.classList.contains("visible")&&(DOM.modelViewer.style.visibility="visible",playAnimation(DOM.modelViewer,CONFIG.ANIMATION_NAME_IDLE)),e?(state.activeMonsterDot&&(state.activeMonsterDot.remove(),state.activeMonsterDot=null),e=CONFIG.COINS_PER_MONSTER,state.userData.coins+=e,state.userData.fightsWon=(state.userData.fightsWon||0)+1,updateCoinDisplay(),saveUserData(),checkMissionCompletion(null,"beat_monster"),triggerVibration([50,50,50,50,100]),addMessageToChat("bot",`🎉 KAMU MENANG! Monster berhasil dikalahkan dan kamu mendapatkan ${e} Koin!`)):addMessageToChat("bot","⚔️ Kamu telah dikalahkan... Monster itu terlalu kuat. Coba lagi nanti!"),updateMapAlert()};const switchTurn=e=>{state.isPlayerDodging=!1,state.isGameTurn=e,updateBattleUI(),"enemy"===state.isGameTurn?(addBattleLog("Monster bersiap..."),setTimeout(()=>{if("none"!==state.isGameTurn){.9>Math.random()?dealDamageToPlayer(Math.floor(11*Math.random())+15):(addBattleLog("Monster terlihat waspada dan menjaga pertahanannya."),switchTurn("player"))}},1500)):addBattleLog("Giliranmu! Pilih aksimu selanjutnya.")};const addBattleLog=e=>{const t=document.createElement("p");t.textContent=`> ${e}`,DOM.battleLogArea.appendChild(t),DOM.battleLogArea.scrollTop=DOM.battleLogArea.scrollHeight};const openUserHub=e=>{closeAllPanels(),populateShopList(),populateGarageList(),populateHistoryList(),switchTab(e||"shop"),DOM.hubPopup.style.display="flex"};const switchTab=e=>{DOM.hubTabs.querySelectorAll(".hub-tab-btn").forEach(t=>t.classList.remove("active")),DOM.hubTabs.querySelector(`.hub-tab-btn[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll(".hub-content").forEach(t=>t.classList.remove("active"));const t=document.getElementById(`hub-content-${e}`);t&&t.classList.add("active")};const populateShopList=()=>{DOM.shopList.innerHTML="";const e=new Date,t=CONFIG.DISCOUNT_END_DATE?new Date(CONFIG.DISCOUNT_END_DATE):new Date(0);CONFIG.SHOP_ITEMS.forEach(n=>{const o=document.createElement("li");let a=!1;n.discountCost&&e<=t&&(a=!0);let s=`<span class="item-price">${n.cost} Koin</span>`;a&&(s=`<span class="item-price" style="color: #4caf50; font-weight: bold;">\n <del style="color: #999;">${n.cost} Koin</del> ${n.discountCost} Koin (EVENT TERBATAS)\n </span>`),o.innerHTML=`<div class="shop-item-icon">${n.icon}</div>\n <div class="item-details">\n <span class="item-name">${n.name}</span>\n ${s}\n </div>\n <button class="redeem-btn" data-item-id="${n.id}">Tukar</button>`;const r=a?n.discountCost:n.cost;if(state.userData.coins<r){const e=o.querySelector(".redeem-btn");e.disabled=!0,e.style.opacity="0.5",e.innerText="Koin Kurang"}DOM.shopList.appendChild(o)})};const populateHistoryList=()=>{const e=JSON.parse(localStorage.getItem("kaitouRedeemedCodes"))||[];DOM.historyList.innerHTML="",0===e.length?DOM.historyList.innerHTML='<p id="no-history-msg">Anda belum pernah menukarkan kode.</p>':e.reverse().forEach(e=>{const t=document.createElement("li"),n=new Date(e.timestamp).toLocaleString("id-ID",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});t.innerHTML=`<div class="item-details"><span class="item-name">Kode: <code class="item-code">${e.code}</code></span><span class="item-timestamp">Ditukar pada: ${n}</span></div><button class="copy-btn" data-code="${e.code}">Salin</button>`,DOM.historyList.appendChild(t)})};

// FUNGSI RENDER GARASI
    const populateGarageList = () => {
        // Kosongkan grid dulu
        DOM.garageGrid.innerHTML = "";
        
        CONFIG.CHARACTERS.forEach(char => {
            const div = document.createElement("div");
            // Cek apakah user punya karakter ini
            const isOwned = state.userData.unlockedCharacters.includes(char.id);
            // Cek apakah ini karakter yang sedang dipakai
            const isActive = state.userData.activeCharacter === char.id;
            
            // Tambahkan class CSS
            div.className = `char-card ${isActive ? 'active-char' : ''}`;
            
            // Tentukan tombol apa yang muncul (Gunakan / Beli / Dipakai)
            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="char-action-btn btn-use" disabled>Sedang Dipakai</button>`;
            } else if (isOwned) {
                // Tombol GUNAKAN (Ada data-action="use")
                btnHTML = `<button class="char-action-btn btn-use" data-action="use" data-id="${char.id}">Gunakan</button>`;
            } else {
                // Tombol BELI (Ada data-action="buy")
                btnHTML = `<button class="char-action-btn btn-buy" data-action="buy" data-id="${char.id}">Beli (${char.price} 🪙)</button>`;
            }

            // Isi HTML Kartu
            div.innerHTML = `
                <span class="char-icon">${char.icon}</span>
                <span class="char-name">${char.name}</span>
                ${btnHTML}
            `;
            
            DOM.garageGrid.appendChild(div);
        });
    };

// --- 1. HANDLE TOMBOL GARASI (BELI & GUNAKAN) ---
    const handleGarageAction = (target) => {
        const action = target.dataset.action;
        const charId = target.dataset.id;
        const char = CONFIG.CHARACTERS.find(c => c.id === charId);

        if (!char) return;

        // LOGIKA BELI
        if (action === 'buy') {
            if (state.userData.coins >= char.price) {
                if (confirm(`Beli ${char.name} seharga ${char.price} Koin?`)) {
                    state.userData.coins -= char.price;
                    state.userData.unlockedCharacters.push(charId); // Simpan kepemilikan
                    
                    updateCoinDisplay();
                    saveUserData();
                    
                    // Cek misi "Beli Karakter" (Kalau ada di list misi)
                    checkMissionCompletion(null, 'buy_char'); 
                    
                    alert(`Selamat! ${char.name} berhasil dibuka!`);
                    populateGarageList(); // Refresh tampilan tombol jadi "Gunakan"
                }
            } else {
                alert("Koin kamu tidak cukup!");
            }
        } 
        // LOGIKA GUNAKAN
        else if (action === 'use') {
            switchCharacter(char);
        }
    };

    // --- 2. PROSES GANTI KARAKTER (DENGAN LOADING) ---
    const switchCharacter = (character) => {
        // Tutup User Hub biar lega
        DOM.hubPopup.style.display = 'none';
        
        // Cek: Kalau modelnya SAMA dengan yang sekarang, tidak perlu download ulang
        const currentSrc = DOM.modelViewer.getAttribute('src');
        if (currentSrc === character.modelSrc) {
            state.userData.activeCharacter = character.id;
            saveUserData();
            applyCharacterMode(character.id); // Langsung terapkan mode
            return; // Selesai
        }

        // TAMPILKAN LAYAR LOADING
        DOM.skinLoadingOverlay.style.display = 'flex';
        DOM.skinLoadingText.textContent = `Mengunduh Skin: ${character.name}...`;

        // GANTI SOURCE MODEL (Ini memicu download browser)
        DOM.modelViewer.src = character.modelSrc;

        // TUNGGU SAMPAI SELESAI DOWNLOAD (Event 'load')
        const onLoad = () => {
            // Sembunyikan Loading
            DOM.skinLoadingOverlay.style.display = 'none';
            
            // Simpan State
            state.userData.activeCharacter = character.id;
            saveUserData();
            
            // Terapkan Mode Tampilan
            applyCharacterMode(character.id);
            
            // Mainkan animasi Idle
            playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
            
            // Bersihkan listener biar memori aman
            DOM.modelViewer.removeEventListener('load', onLoad);
        };

        // Jaga-jaga kalau error (misal link mati/internet putus)
        const onError = () => {
            DOM.skinLoadingOverlay.style.display = 'none';
            alert("Gagal mengunduh model. Periksa koneksi internet.");
            DOM.modelViewer.removeEventListener('error', onError);
        };

        // Pasang pendengar event
        DOM.modelViewer.addEventListener('load', onLoad, { once: true });
        DOM.modelViewer.addEventListener('error', onError, { once: true });
    };

// --- MASTER SWITCH (UBAH TAMPILAN WIDGET & GAME) ---
    const applyCharacterMode = (charId) => {
        const char = CONFIG.CHARACTERS.find(c => c.id === charId);
        if (!char) return;

        // 1. Ubah Judul Header Chat
        if (DOM.chatHeaderTitle) DOM.chatHeaderTitle.textContent = char.name;

        // 2. Ubah Nama di Battle Arena (BARU)
        if (DOM.battlePlayerName) DOM.battlePlayerName.textContent = char.name;

        // 3. Logic Sembunyikan/Tampilkan Input
        if (charId !== 'kaitou') {
            state.isGameMode = true; 
            if(DOM.chatInputArea) DOM.chatInputArea.style.setProperty('display', 'none', 'important');
            if(DOM.animationToggleBtn) DOM.animationToggleBtn.style.setProperty('display', 'none', 'important');
        } else {
            state.isGameMode = false;
            if(DOM.chatInputArea) DOM.chatInputArea.style.display = 'flex';
            if(DOM.animationToggleBtn) DOM.animationToggleBtn.style.display = 'block';
        }
        
        // 4. Update MODEL UTAMA (Chat & Runner)
        const currentSrc = DOM.modelViewer.getAttribute('src');
        if (currentSrc !== char.modelSrc) {
            DOM.modelViewer.src = char.modelSrc;
        }

        // 5. Update MODEL BATTLE (Red Dot) (BARU)
        // Kita samakan source model battle dengan model utama
        if (DOM.battleModelViewer) {
            const currentBattleSrc = DOM.battleModelViewer.getAttribute('src');
            if (currentBattleSrc !== char.modelSrc) {
                DOM.battleModelViewer.src = char.modelSrc;
            }
        }
    };

    // ================== EVENT LISTENERS ==================
    const setupEventListeners = () => {
        DOM.garageGrid.addEventListener('click', (e) => {
            // Cek apakah yang diklik adalah tombol action (Beli/Gunakan)
            if (e.target.matches('.char-action-btn')) {
                handleGarageAction(e.target);
            }
        });
        DOM.chatButton.addEventListener("click", toggleChatWindow); 
        DOM.closeBtn.addEventListener("click", () => { 
            DOM.chatWindow.classList.remove("visible"); 
            closeAllPanels(); 
        });
        DOM.sendBtn.addEventListener("click", sendMessage); 
        DOM.chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
        DOM.uploadBtn.addEventListener("click", () => DOM.imageInput.click()); 
        DOM.videoUploadBtn.addEventListener("click", () => DOM.videoInput.click());
        DOM.imageInput.addEventListener("change", (e) => handleFileInput(e.target.files[0])); 
        DOM.videoInput.addEventListener("change", (e) => handleFileInput(e.target.files[0]));
        DOM.removeMediaBtn.addEventListener("click", resetInputs);
        DOM.fullscreenBtn.addEventListener("click", () => { if (!document.fullscreenElement) { DOM.chatWindow.requestFullscreen(); checkMissionCompletion(null, 'use_fullscreen'); } else { document.exitFullscreen(); } });
        DOM.toast.addEventListener('click', (e) => { if (e.target !== DOM.toastClose) { DOM.toast.classList.remove('visible'); toggleChatWindow(); } });
        DOM.toastClose.addEventListener('click', (e) => { e.stopPropagation(); DOM.toast.classList.remove('visible'); });
        
        DOM.animationControls.addEventListener("click", (e) => { if (e.target.tagName === 'BUTTON' && e.target.dataset.animation) { const anim = e.target.dataset.animation; playAnimation(DOM.modelViewer, anim); if (anim.toLowerCase().includes('kick')) checkMissionCompletion(null, 'animation_kick'); else if (anim.toLowerCase().includes('jump')) checkMissionCompletion(null, 'animation_jump'); else if (anim.toLowerCase().includes('twirl')) checkMissionCompletion(null, 'animation_twirl'); else if (anim.toLowerCase().includes('punch')) checkMissionCompletion(null, 'animation_punch'); else if (anim.toLowerCase().includes('run')) checkMissionCompletion(null, 'animation_run'); } });
        DOM.coinBalanceButton.addEventListener('click', () => openUserHub('shop'));
        DOM.missionToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.missionPanel.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.missionPanel.classList.add('visible'); });
        DOM.animationToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.animationControls.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.animationControls.classList.add('visible'); });
        DOM.closeHubBtn.addEventListener('click', () => { DOM.hubPopup.style.display = 'none'; });
        DOM.hubTabs.addEventListener('click', e => { if (e.target.matches('.hub-tab-btn')) { switchTab(e.target.dataset.tab); } });

        DOM.shopList.addEventListener('click', async (e) => { if (!e.target.matches('.redeem-btn')) return; const redeemButton = e.target; const itemId = redeemButton.dataset.itemId; const item = CONFIG.SHOP_ITEMS.find(i => i.id === itemId); if (!item) { alert('Item tidak valid!'); return; } const now = new Date(); const discountEndDate = CONFIG.DISCOUNT_END_DATE ? new Date(CONFIG.DISCOUNT_END_DATE) : new Date(0); let currentPrice = item.cost; if (now <= discountEndDate && item.discountCost) { currentPrice = item.discountCost; } if (state.userData.coins < currentPrice) { alert("Koin kamu tidak cukup!"); return; } const confirmed = confirm(`Anda yakin ingin menukarkan ${currentPrice} koin dengan "${item.name}"?`); if (!confirmed) return; redeemButton.disabled = true; redeemButton.textContent = 'Memproses...'; try { const userId = localStorage.getItem('kaitouVisitorId'); if (!userId) { alert('ID Pengguna tidak ditemukan. Coba refresh halaman.'); redeemButton.disabled = false; redeemButton.textContent = 'Tukar'; return; } const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=redeem_code&userId=${userId}&itemId=${itemId}`); const data = await response.json(); if (data.status === 'success') { alert(`Penukaran Berhasil!\n\nKode Anda adalah: ${data.code}\n\nHarap simpan kode ini baik-baik. Anda juga bisa melihatnya lagi di tab Riwayat.`); state.userData.coins = data.newBalance; saveUserData(); updateCoinDisplay(); const history = JSON.parse(localStorage.getItem("kaitouRedeemedCodes")) || []; history.push({ code: data.code, timestamp: Date.now() }); localStorage.setItem("kaitouRedeemedCodes", JSON.stringify(history)); populateShopList(); populateHistoryList(); } else { alert(`Gagal Menukar: ${data.message}`); redeemButton.disabled = false; redeemButton.textContent = 'Tukar'; } } catch (error) { alert('Terjadi kesalahan jaringan. Coba lagi nanti.'); redeemButton.disabled = false; redeemButton.textContent = 'Tukar'; console.error('Redeem Error:', error); } });
        DOM.historyList.addEventListener('click', (e) => { if (!e.target.matches('.copy-btn')) return; const button = e.target; const codeToCopy = button.dataset.code; navigator.clipboard.writeText(codeToCopy).then(() => { const originalText = button.textContent; button.textContent = 'Disalin!'; button.style.backgroundColor = '#4caf50'; setTimeout(() => { button.textContent = originalText; button.style.backgroundColor = ''; }, 2000); }).catch(err => { console.error('Gagal menyalin kode:', err); alert('Gagal menyalin kode. Coba lagi secara manual.'); }); });
        
        DOM.battleActionButtons.addEventListener("click", e => { if ("player" === state.isGameTurn && e.target.matches(".action-btn")) { const action = e.target.dataset.action; triggerVibration(10); DOM.battleActionButtons.querySelectorAll(".action-btn").forEach(btn => btn.disabled = true); if (action === "punch") dealDamageToMonster(12, "PunchC"); else if (action === "kick") dealDamageToMonster(18, ["DKick", "FKick", "SFKick"][Math.floor(3 * Math.random())]); else if (action === "dodge") { state.isPlayerDodging = true; playAnimation(DOM.battleModelViewer, "Jump1"); addBattleLog("Kamu bersiap untuk menghindar!"); switchTurn("enemy"); } else if (action === "special" && state.superMeter >= CONFIG.SUPER_METER_MAX) { dealDamageToMonster(50, "Twirl"); state.superMeter = 0; } setTimeout(updateBattleUI, 50); } });
        DOM.saveUsernameBtn.addEventListener('click', () => { const username = DOM.usernameInput.value.trim(); if (username.length >= 3 && username.length <= 15 && /^[a-zA-Z0-9_ ]+$/.test(username)) { state.userData.username = username; DOM.usernamePopup.style.display = 'none'; finishInitialization(); setTimeout(() => { if (!DOM.chatWindow.classList.contains('visible')) toggleChatWindow(); }, 300); } else { alert('Nama tidak valid! Gunakan 3-15 karakter (huruf, angka, spasi, _).'); } });
        DOM.usernameInput.addEventListener("keypress", (e) => e.key === "Enter" && DOM.saveUsernameBtn.click());
        DOM.rankDisplay.addEventListener('click', () => { const activeType = DOM.leaderboardTypeSelector.querySelector('.active').dataset.leaderboardType; displayFullLeaderboard(activeType); });
        DOM.closeLeaderboardBtn.addEventListener('click', () => { DOM.leaderboardPopup.style.display = 'none'; });
        DOM.leaderboardTypeSelector.addEventListener('click', (e) => { if (e.target.matches('.leaderboard-type-btn')) { const type = e.target.dataset.leaderboardType; displayFullLeaderboard(type); } });

        if(DOM.closeSafeBtn) DOM.closeSafeBtn.addEventListener('click', closeSafeGame);
        if(DOM.safeDial) {
            DOM.safeDial.addEventListener('mousedown', (e) => { state.isDraggingDial = true; handleDialInput(e); });
            window.addEventListener('mousemove', (e) => { if(state.isDraggingDial) handleDialInput(e); });
            window.addEventListener('mouseup', () => handleDialInput(null, true));
            DOM.safeDial.addEventListener('touchstart', (e) => { state.isDraggingDial = true; handleDialInput(e); }, {passive: false});
            window.addEventListener('touchmove', (e) => { if(state.isDraggingDial) { e.preventDefault(); handleDialInput(e); } }, {passive: false});
            window.addEventListener('touchend', () => handleDialInput(null, true));
        }

        setupRunnerControls();
    };

    const initialize = () => {
        initializeUserData();
        setupEventListeners();
        
        const checkDarkMode = () => { 
            const isDark = document.body.classList.contains("dark-mode") || document.documentElement.classList.contains("dark-mode"); 
            DOM.chatbotContainer.classList.toggle("kaitou-dark-mode", isDark); 
        }; 
        const observer = new MutationObserver(checkDarkMode); 
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] }); 
        checkDarkMode(); 
        
        const updateCountdown = () => { 
            const now = new Date(); 
            let nextReset = new Date(); 
            nextReset.setHours(CONFIG.MISSION_RESET_HOUR_LOCAL, 0, 0, 0); 
            if (now > nextReset) nextReset.setDate(nextReset.getDate() + 1); 
            
            const diff = nextReset - now; 
            const hours = String(Math.floor(diff / 36e5)).padStart(2, "0"); 
            const minutes = String(Math.floor(diff % 36e5 / 6e4)).padStart(2, "0"); 
            const seconds = String(Math.floor(diff % 6e4 / 1e3)).padStart(2, "0"); 
            if (DOM.missionCountdownElem) DOM.missionCountdownElem.textContent = `Reset dalam: ${hours}:${minutes}:${seconds}`; 
        }; 
        updateCountdown(); 
        setInterval(updateCountdown, 1000);
        
        setInterval(() => { 
            const isBattle = "flex" === DOM.battleOverlay.style.display; 
            const isSafeGame = state.isSafeGameActive;
            const isRunner = state.isRunnerActive;
            const hasMonsters = DOM.missionMapContainer.querySelectorAll(".monster-dot, .yellow-dot, .blue-dot").length > 0; 
            if (!isBattle && !isSafeGame && !isRunner && !hasMonsters) { 
                const now = Date.now(); 
                if (now - (state.userData.lastMonsterSpawn || 0) > 1 * 60 * 1000) { 
                    addMessageToChat("bot", "🚨 Sinyal baru terdeteksi di peta!"); 
                    spawnMonsters(); 
                    state.userData.lastMonsterSpawn = now; 
                    saveUserData(); 
                } 
            } 
        }, 60000);
        
        setTimeout(() => { 
            if (!DOM.chatWindow.classList.contains('visible') && DOM.usernamePopup.style.display !== 'flex') { 
                DOM.toast.classList.add('visible'); 
            } 
        }, 1000);
    };

    initialize();
});