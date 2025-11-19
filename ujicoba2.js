document.addEventListener("DOMContentLoaded", () => {

    // ================== KONFIGURASI ==================
    const CONFIG = {
        APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyYpSp_TqoaMbGztO46SuHGqpw6NwbylsE4awdKVAxWr7WRmNXMJvDfXMxW6jCrZB08Fw/exec',
        SHOP_ITEMS: [
            { id: 'access_code', name: 'Kode Akses 2 Hari Link Tanpa Iklan', icon: '🔑', cost: 900, discountCost: 100 }
        ],
        DISCOUNT_END_DATE: '2025-11-01T23:59:59', 
        API_KEYS: ["AIzaSyBfgC4HFG96G0i0dPgZL_YoiCWiDhO9K30", "AIzaSyA-MXhmFpT25kyegCuz1uSt-YJ3gxi4E-0", "AIzaSyCdaRYs-OkufOUL1apgwgDBgylEtAY7b3w", "AIzaSyAL5T__fZZk7BZ9uCwg1dW1gs607WUmejg"],
        MODEL_NAME: "gemini-2.5-flash",
        MAX_IMAGE_SIZE_MB: 5,
        MAX_VIDEO_SIZE_MB: 25,
        ANIMATION_NAME_TALK: "Talk",
        ANIMATION_NAME_IDLE: "Idle",
        DAILY_MISSION_COUNT: 3,
        COINS_PER_MISSION: 10,
        MISSION_RESET_HOUR_LOCAL: 7,
        COINS_PER_MONSTER: 1,
        PLAYER_MAX_HP: 100,
        MONSTER_MAX_HP: 100,
        SUPER_METER_MAX: 100,
        FULL_MISSIONS_LIST: [
            { id: 'beat_monster', text: `Kalahkan monster di Peta Misi` },
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
        hubTabs: document.querySelector(".hub-tabs"),
        hubPopupBox: document.getElementById("kaitou-hub-box"),
        missionMapContainer: document.getElementById("kaitou-mission-map-container"),
        battleOverlay: document.getElementById("kaitou-battle-overlay"),
        battleBox: document.getElementById("battle-box"),
        battleMonsterImg: document.getElementById("battle-monster-img"),
        battleLogArea: document.getElementById("battle-log-area"),
        battleResultOverlay: document.getElementById("battle-result-overlay"),
        battleResultText: document.getElementById("battle-result-text"),
        sfxAttack: document.getElementById("sfx-attack-swing"),
        sfxMonsterHit: document.getElementById("sfx-monster-hit"),
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
        currentFile: null, currentFilePreviewUrl: null, currentVideoThumbnailSrc: null, activeMonsterDot: null, chatHistory: [], userData: {},
        leaderboardData: { coins: [], fights: [] },
        currentMonsterHP: CONFIG.MONSTER_MAX_HP, playerHP: CONFIG.PLAYER_MAX_HP, superMeter: 0, isPlayerDodging: false, isGameTurn: "player"
    };

    // ================== FUNGSI PEMBANTU (UTILITIES) & EFEK BARU ==================
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
        video.src = objectUrl; video.muted = true; 
        video.onloadeddata = () => { video.currentTime = 1; }; 
        video.onseeked = () => { 
            const canvas = document.createElement('canvas'); 
            canvas.width = video.videoWidth; canvas.height = video.videoHeight; 
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); 
            URL.revokeObjectURL(objectUrl); resolve(canvas.toDataURL('image/jpeg')); 
        }; 
        video.onerror = () => reject("Gagal memuat metadata video."); 
    });

    const playAnimation = (viewer, animationName, fallbackAnimation) => { 
        if (viewer?.availableAnimations.includes(animationName)) { 
            viewer.animationName = animationName; viewer.play(); 
        } else if (fallbackAnimation) { 
            viewer.animationName = fallbackAnimation; viewer.play(); 
        } 
    };

    const closeAllPanels = () => { 
        DOM.missionPanel.classList.remove("visible"); 
        DOM.animationControls.classList.remove("visible"); 
        DOM.hubPopup.style.display = 'none'; 
    };

    const formatMessage = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/\n/g, "<br>") : "";

    // --- FUNGSI EFEK VISUAL BARU ---
    const showDamagePopup = (amount, targetElement, isCritical = false, isPlayer = false) => {
        const rect = targetElement.getBoundingClientRect();
        const battleBoxRect = DOM.battleBox.getBoundingClientRect();
        const popup = document.createElement("div");
        popup.textContent = amount;
        popup.classList.add("damage-popup");
        if (isCritical) popup.classList.add("critical");
        if (isPlayer) popup.classList.add("player-hurt");
        
        const left = rect.left - battleBoxRect.left + (rect.width / 2) - 10 + (Math.random() * 20 - 10);
        const top = rect.top - battleBoxRect.top + (rect.height / 2) - 20;
        
        popup.style.left = `${left}px`; popup.style.top = `${top}px`;
        DOM.battleBox.appendChild(popup);
        setTimeout(() => popup.remove(), 800);
    };

    const createHitParticles = (targetElement) => {
        const rect = targetElement.getBoundingClientRect();
        const battleBoxRect = DOM.battleBox.getBoundingClientRect();
        const centerX = rect.left - battleBoxRect.left + (rect.width / 2);
        const centerY = rect.top - battleBoxRect.top + (rect.height / 2);

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${centerX}px`; particle.style.top = `${centerY}px`;
            particle.style.backgroundColor = ['#fff', '#ffcc00', '#ff4f4f'][Math.floor(Math.random() * 3)];
            DOM.battleBox.appendChild(particle);
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 40 + 20;
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
            ], { duration: 400, easing: 'cubic-bezier(0, .9, .57, 1)' }).onfinish = () => particle.remove();
        }
    };

    const triggerConfetti = () => {
        const colors = ['#ff4f4f', '#f1c40f', '#3498db', '#2ecc71'];
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 50}%`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '0';
            DOM.battleBox.appendChild(particle);
            particle.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${Math.random()*100 - 50}px, ${100 + Math.random()*100}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], { duration: 1000 + Math.random() * 1000, easing: 'ease-out' }).onfinish = () => particle.remove();
        }
    };

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
                    videoPlayer.src = mediaInfo.src; videoPlayer.controls = true; videoPlayer.autoplay = true; 
                    videoPlayer.style.cssText = 'width:100%;display:block;'; 
                    mediaContainer.innerHTML = ''; mediaContainer.appendChild(videoPlayer); 
                    mediaContainer.style.cursor = 'default'; mediaContainer.onclick = null; 
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
                } catch (error) { return tryApiRequest(keyIndex + 1); } 
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
        state.currentFile = null; state.currentFilePreviewUrl = null; state.currentVideoThumbnailSrc = null;
        DOM.imageInput.value = ""; DOM.videoInput.value = ""; DOM.mediaIndicator.style.display = "none"; 
    };

    const handleFileInput = async (file) => { 
        if (!file) return; 
        resetInputs(); 
        const isImage = file.type.startsWith('image'); 
        const isVideo = file.type.startsWith('video'); 
        const maxSize = isImage ? CONFIG.MAX_IMAGE_SIZE_MB : CONFIG.MAX_VIDEO_SIZE_MB; 
        
        if (file.size > maxSize * 1024 * 1024) { return alert(`Ukuran file terlalu besar! Maksimum ${maxSize} MB.`); } 
        state.currentFile = file; state.currentFilePreviewUrl = URL.createObjectURL(file); 
        
        if (isVideo) { 
            try { state.currentVideoThumbnailSrc = await generateVideoThumbnail(file); } 
            catch (error) { alert("Gagal memproses file video."); resetInputs(); return; } 
        } 
        DOM.mediaIndicatorText.textContent = isImage ? 'Gambar terpilih!' : 'Video siap!'; 
        DOM.mediaIndicator.style.display = 'flex'; DOM.chatInput.focus(); 
        if (isImage) checkMissionCompletion(null, 'upload_image'); 
        if (isVideo) checkMissionCompletion(null, 'upload_video'); 
    };

    // ================== LOGIKA PENGGUNA & LEADERBOARD ==================
    const toggleChatWindow = () => {
        if (!state.userData.username) {
            DOM.chatWindow.classList.add("visible");
            DOM.usernamePopup.style.display = 'flex'; DOM.usernameInput.focus(); return;
        }
        const isVisible = DOM.chatWindow.classList.toggle("visible");
        if (isVisible) {
            if (DOM.chatScrollArea.children.length === 0 && state.chatHistory.length > 1) {
                addMessageToChat("bot", state.chatHistory[1].parts[0].text);
            }
            DOM.openSound?.play().catch(e => console.log("Audio fail:", e));
            if (DOM.battleOverlay.style.display === 'flex') {
                DOM.modelViewer.style.visibility = "hidden"; 
            } else {
                DOM.modelViewer.style.visibility = "visible"; 
            }
        } else {
            playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
            closeAllPanels();
        }
    };

    const syncUserDataToServer = () => { 
        try { 
            if (state.userData && state.userData.lastLoginDate) { 
                let userId = localStorage.getItem('kaitouVisitorId'); 
                if (!userId) { 
                    userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9); 
                    localStorage.setItem('kaitouVisitorId', userId); 
                } 
                const missionsCompleted = state.userData.dailyMissions.filter(m => m.completed).length; 
                const data = { userId: userId, username: state.userData.username || "Anonim", streak: state.userData.dayStreak || 0, missions: missionsCompleted, coins: state.userData.coins || 0, fights: state.userData.fightsWon || 0 }; 
                const url = `${CONFIG.APPS_SCRIPT_URL}?action=sync_user_data&userId=${encodeURIComponent(data.userId)}&username=${encodeURIComponent(data.username)}&streak=${data.streak}&missions=${data.missions}&coins=${data.coins}&fights=${data.fights}`; 
                fetch(url).then(r => r.json()).catch(e => console.error(e)); 
            } 
        } catch (err) { console.error(err); } 
    };

    const saveUserData = () => { 
        try { 
            localStorage.setItem('kaitouUserData', JSON.stringify(state.userData)); 
            syncUserDataToServer(); 
        } catch (e) { console.error(e); } 
    };

    const updateCoinDisplay = () => { if (DOM.coinAmountElem) DOM.coinAmountElem.textContent = state.userData.coins || 0; };

    const generateNewMissions = () => [...CONFIG.FULL_MISSIONS_LIST].sort(() => 0.5 - Math.random()).slice(0, CONFIG.DAILY_MISSION_COUNT).map(m => ({ ...m, completed: false }));

    const initializeUserData = () => { 
        let storedData = null; 
        try { storedData = JSON.parse(localStorage.getItem('kaitouUserData')); } catch (e) {} 
        const today = getTodayString(); 
        if (!storedData) { 
            state.userData = { username: null, lastLoginDate: today, dayStreak: 1, dailyMissions: generateNewMissions(), coins: 0, lastMonsterSpawn: 0, fightsWon: 0 }; 
        } else { 
            state.userData = storedData; 
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1); 
            const yesterdayString = yesterday.toISOString().slice(0, 10); 
            if (state.userData.lastLoginDate !== today) { 
                state.userData.dayStreak = (state.userData.lastLoginDate === yesterdayString) ? (state.userData.dayStreak || 0) + 1 : 1; 
                state.userData.dailyMissions = generateNewMissions(); 
            } 
            if (typeof state.userData.coins === 'undefined') state.userData.coins = 0; 
        } 
        finishInitialization(); 
    };

    const finishInitialization = () => { 
        initializeChatHistory(state.userData.username); 
        state.userData.lastLoginDate = getTodayString(); 
        saveUserData(); updateMissionPanelUI(); updateCoinDisplay(); 
        if (state.userData.username) { 
            DOM.missionMapContainer.classList.add('visible'); 
            fetchUserRankAndLeaderboard(); 
        } 
        const now = Date.now(); 
        if (now - (state.userData.lastMonsterSpawn || 0) > 1 * 60 * 1000) { 
            spawnMonsters(); state.userData.lastMonsterSpawn = now; saveUserData(); 
        } 
        updateMapAlert(); 
    };

    const initializeChatHistory = (username) => { 
        const finalUsername = username || 'Sobat'; 
        const systemPrompt = `Mulai sekarang, kamu adalah 'Kaitou-kun', asisten AI yang ceria. Pengguna bernama **${finalUsername}**. Sapa dia. Jawaban sopan soal link download, jelaskan soal H265 dan Hardsub.`; 
        state.chatHistory = [ 
            {role: "user", parts: [{text: systemPrompt}]}, 
            {role: "model", parts: [{text: `Halo, ${finalUsername}! Aku Kaitou-kun! Siap membantu dan bermain bersamamu!`}]} 
        ]; 
    };

    const fetchUserRankAndLeaderboard = async () => { 
        try { 
            const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=coins`); 
            const data = await response.json(); 
            if (data.status === 'success' && data.leaderboard) {
                state.leaderboardData.coins = data.leaderboard; 
                const myRankIndex = data.leaderboard.findIndex(p => p.username === state.userData.username); 
                updateRankDisplay((myRankIndex !== -1) ? myRankIndex + 1 : '10+'); 
            }
        } catch (error) { DOM.rankDisplay.classList.remove('visible'); } 
    };

    const updateRankDisplay = (rank) => { 
        if (!rank) return; 
        DOM.rankValue.textContent = `#${rank}`; DOM.rankDisplay.classList.add('visible'); 
    };

    const displayFullLeaderboard = async (type = 'coins') => { 
        DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Memuat papan skor...</p>`; 
        DOM.leaderboardPopup.style.display = 'flex'; 
        DOM.leaderboardTypeSelector.querySelectorAll('.leaderboard-type-btn').forEach(btn => { 
            btn.classList.toggle('active', btn.dataset.leaderboardType === type); 
        }); 
        try { 
            if (state.leaderboardData[type].length === 0) { 
                const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=${type}`); 
                const data = await response.json(); 
                if (data.status === 'success') state.leaderboardData[type] = data.leaderboard; 
            } 
            const leaderboard = state.leaderboardData[type]; 
            if (leaderboard.length === 0) { 
                DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Belum ada data.</p>`; return; 
            } 
            const list = document.createElement('ol'); list.id = 'full-leaderboard-list'; 
            const scoreIcon = type === 'coins' ? '🪙' : '⚔️'; 
            leaderboard.forEach(player => { 
                const li = document.createElement('li'); 
                li.innerHTML = `\n <span class="leaderboard-name">${player.username}</span>\n <span class="leaderboard-score">${player.score.toLocaleString("id-ID")} <span class="score-icon">${scoreIcon}</span></span>\n `; 
                list.appendChild(li); 
            }); 
            DOM.leaderboardListContainer.innerHTML = ''; DOM.leaderboardListContainer.appendChild(list); 
        } catch (error) { 
            DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Gagal memuat.</p>`; 
        } 
    };

    // ================== LOGIKA MISI & PERTARUNGAN ==================
    const updateMissionPanelUI = () => { 
        DOM.streakCounter.textContent = `🔥 Day Streak: ${state.userData.dayStreak || 0}`; 
        DOM.missionList.innerHTML = ''; 
        if (state.userData.dailyMissions) { 
            state.userData.dailyMissions.forEach(mission => { 
                const li = document.createElement('li'); li.textContent = mission.text; 
                if (mission.completed) li.classList.add('completed'); 
                DOM.missionList.appendChild(li); 
            }); 
        } 
    };

    const checkMissionCompletion = (userInput = null, actionType = null) => { 
        if (!state.userData.dailyMissions) return; 
        const missionsToComplete = state.userData.dailyMissions.filter(m => !m.completed); 
        if (missionsToComplete.length === 0) return; 
        let missionAccomplished = false; const lowerInput = userInput ? userInput.toLowerCase() : ''; 
        
        for (const mission of missionsToComplete) { 
            let currentMissionDone = false; 
            const check = (keywords) => keywords.some(kw => lowerInput.includes(kw));
            switch (mission.id) {
                case 'beat_monster': if (actionType === 'beat_monster') currentMissionDone = true; break;
                case 'ask_rider': if (check(['kamen rider'])) currentMissionDone = true; break;
                case 'ask_sentai': if (check(['sentai'])) currentMissionDone = true; break;
                case 'ask_ultraman': if (check(['ultraman'])) currentMissionDone = true; break;
                case 'ask_download': if (check(['download', 'link'])) currentMissionDone = true; break;
                case 'ask_hardsub': if (check(['hardsub', 'subtitle'])) currentMissionDone = true; break;
                case 'ask_recommendation': if (check(['rekomendasi'])) currentMissionDone = true; break;
                case 'ask_favorite': if (check(['favorit', 'suka'])) currentMissionDone = true; break;
                case 'ask_about_blog': if (check(['blog ini', 'fansub ini'])) currentMissionDone = true; break;
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
            state.userData.coins += CONFIG.COINS_PER_MISSION; updateCoinDisplay(); 
            DOM.sfxMissionComplete?.play().catch(e => console.error(e)); 
            addMessageToChat('bot', `✨ Misi selesai! +${CONFIG.COINS_PER_MISSION} Koin!`); 
            saveUserData(); updateMissionPanelUI(); 
        } 
    };

    const updateMapAlert = () => { 
        let alertIcon = DOM.missionMapContainer.querySelector('#mission-map-alert'); 
        if (!alertIcon) { 
            alertIcon = document.createElement('div'); alertIcon.id = 'mission-map-alert'; alertIcon.textContent = '!'; DOM.missionMapContainer.appendChild(alertIcon); 
        } 
        const monsterCount = DOM.missionMapContainer.querySelectorAll('.monster-dot').length; 
        alertIcon.classList.toggle('visible', monsterCount > 0); 
    };

    const spawnMonsters = () => { 
        DOM.missionMapContainer.innerHTML = ''; 
        const monsterCount = Math.floor(Math.random() * 3) + 1; 
        for (let i = 0; i < monsterCount; i++) { 
            const dot = document.createElement('div'); dot.className = 'monster-dot'; 
            dot.style.left = `${Math.random()*(DOM.missionMapContainer.clientWidth-14)}px`; 
            dot.style.top = `${Math.random()*(DOM.missionMapContainer.clientHeight-14)}px`; 
            dot.addEventListener('click', (e) => { 
                e.stopPropagation(); state.activeMonsterDot = dot; startBattle(); 
            }); 
            DOM.missionMapContainer.appendChild(dot); 
        } 
        updateMapAlert(); 
    };

    const startBattle = () => {
        state.currentMonsterHP = CONFIG.MONSTER_MAX_HP; state.playerHP = CONFIG.PLAYER_MAX_HP; 
        state.superMeter = 0; state.isPlayerDodging = false; state.isGameTurn = "player";
        DOM.modelViewer.style.visibility = "hidden";
        DOM.battleLogArea.innerHTML = ""; updateBattleUI(); 
        DOM.battleOverlay.style.display = "flex"; 
        playAnimation(DOM.battleModelViewer, CONFIG.ANIMATION_NAME_IDLE);
        addBattleLog("Pertarungan dimulai! Pilih aksimu!");
    };

    const updateBattleUI = () => {
        DOM.playerHpBar.style.width = `${state.playerHP/CONFIG.PLAYER_MAX_HP*100}%`;
        DOM.playerHpText.textContent = `${state.playerHP} / ${CONFIG.PLAYER_MAX_HP}`;
        DOM.enemyHpBar.style.width = `${state.currentMonsterHP/CONFIG.MONSTER_MAX_HP*100}%`;
        DOM.enemyHpText.textContent = `${state.currentMonsterHP} / ${CONFIG.MONSTER_MAX_HP}`;
        DOM.specialMeterBar.style.width = `${state.superMeter/CONFIG.SUPER_METER_MAX*100}%`;
        DOM.battleActionButtons.querySelectorAll(".action-btn").forEach(e => {
            e.disabled = "player" !== state.isGameTurn || "special-move-btn" === e.id && state.superMeter < CONFIG.SUPER_METER_MAX;
        });
    };

    const dealDamageToMonster = (damage, animation) => {
        if ("none" !== state.isGameTurn) {
            playAnimation(DOM.battleModelViewer, animation, "PunchC");
            DOM.sfxAttack?.play();
            
            // EFEK BARU
            createHitParticles(DOM.battleMonsterImg);
            showDamagePopup(damage, DOM.battleMonsterImg, damage > 20, false);
            
            state.currentMonsterHP -= damage;
            if (state.currentMonsterHP < 0) state.currentMonsterHP = 0;
            
            DOM.battleMonsterImg.classList.add("flash-red");
            setTimeout(() => { 
                DOM.sfxMonsterHit?.play(); DOM.battleMonsterImg.classList.remove("flash-red"); 
            }, 150);
            
            state.superMeter += 3.5 * damage;
            if (state.superMeter > CONFIG.SUPER_METER_MAX) state.superMeter = CONFIG.SUPER_METER_MAX;
            updateBattleUI();
            
            if (state.currentMonsterHP <= 0) {
                state.isGameTurn = "none"; updateBattleUI(); 
                setTimeout(() => showBattleResult(true), 1500);
            } else {
                switchTurn("enemy");
            }
        }
    };

    const dealDamageToPlayer = (damage) => {
        if ("none" !== state.isGameTurn) {
            let actualDamage = damage;
            addBattleLog(`Monster menyerang dengan kekuatan ${damage}!`);
            
            if (state.isPlayerDodging) {
                actualDamage = 0;
                showDamagePopup("MISS", DOM.playerHpBar, false, true);
                addBattleLog("Kamu berhasil menghindar!");
            } else {
                DOM.battleBox.classList.add("shake-hard");
                setTimeout(() => DOM.battleBox.classList.remove("shake-hard"), 400);
                createHitParticles(DOM.playerHpBar);
                showDamagePopup(actualDamage, DOM.playerHpBar, true, true);
                if (navigator.vibrate) navigator.vibrate(200); 
            }
            state.playerHP -= actualDamage;
            if (state.playerHP < 0) state.playerHP = 0;
            updateBattleUI();
            if (state.playerHP <= 0) {
                state.isGameTurn = "none"; updateBattleUI(); 
                setTimeout(() => showBattleResult(false), 1500);
            } else {
                switchTurn("player");
            }
        }
    };

    const showBattleResult = (isWin) => {
        DOM.battleResultText.textContent = isWin ? "MENANG" : "KALAH";
        DOM.battleResultText.className = "battle-result-text " + (isWin ? "win-text" : "lose-text");
        DOM.battleResultOverlay.style.display = "flex";
        setTimeout(() => endBattle(isWin), 2000);
    };

    const endBattle = (isWin) => {
        DOM.battleOverlay.style.display = "none";
        DOM.battleResultOverlay.style.display = "none";
        if (DOM.chatWindow.classList.contains("visible")) {
            DOM.modelViewer.style.visibility = "visible";
            playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
        }
        if (isWin) {
            triggerConfetti(); // EFEK BARU
            if (state.activeMonsterDot) { state.activeMonsterDot.remove(); state.activeMonsterDot = null; }
            state.userData.coins += CONFIG.COINS_PER_MONSTER;
            state.userData.fightsWon = (state.userData.fightsWon || 0) + 1;
            updateCoinDisplay(); saveUserData(); checkMissionCompletion(null, "beat_monster");
            addMessageToChat("bot", `🎉 KAMU MENANG! +${CONFIG.COINS_PER_MONSTER} Koin!`);
        } else {
            addMessageToChat("bot", "⚔️ Kamu kalah... Coba lagi nanti!");
        }
        updateMapAlert();
    };

    const switchTurn = (turn) => {
        state.isPlayerDodging = false; state.isGameTurn = turn; updateBattleUI();
        if ("enemy" === state.isGameTurn) {
            addBattleLog("Monster bersiap...");
            setTimeout(() => {
                if ("none" !== state.isGameTurn) {
                    if (Math.random() < 0.9) { dealDamageToPlayer(Math.floor(11 * Math.random()) + 15); } 
                    else { addBattleLog("Monster waspada."); switchTurn("player"); }
                }
            }, 1500);
        } else {
            addBattleLog("Giliranmu!");
        }
    };

    const addBattleLog = (text) => {
        const p = document.createElement("p"); p.textContent = `> ${text}`; 
        DOM.battleLogArea.appendChild(p); DOM.battleLogArea.scrollTop = DOM.battleLogArea.scrollHeight;
    };

    const openUserHub = (tab) => { 
        closeAllPanels(); populateShopList(); populateHistoryList(); switchTab(tab || "shop"); 
        DOM.hubPopup.style.display = "flex"; 
    };
    
    const switchTab = (tabName) => {
        DOM.hubTabs.querySelectorAll(".hub-tab-btn").forEach(t => t.classList.remove("active"));
        DOM.hubTabs.querySelector(`.hub-tab-btn[data-tab="${tabName}"]`).classList.add("active");
        document.querySelectorAll(".hub-content").forEach(t => t.classList.remove("active"));
        const content = document.getElementById(`hub-content-${tabName}`);
        if(content) content.classList.add("active");
    };

    // ================== LOGIKA TOKO ==================
    const populateShopList = () => {
        DOM.shopList.innerHTML = "";
        const now = new Date();
        const discountEndDate = CONFIG.DISCOUNT_END_DATE ? new Date(CONFIG.DISCOUNT_END_DATE) : new Date(0);
        CONFIG.SHOP_ITEMS.forEach(item => {
            const li = document.createElement("li");
            let isDiscountActive = (item.discountCost && now <= discountEndDate);
            let priceHTML = `<span class="item-price">${item.cost} Koin</span>`;
            if (isDiscountActive) {
                priceHTML = `<span class="item-price" style="color:#4caf50;font-weight:bold;"><del style="color:#999;">${item.cost}</del> ${item.discountCost} Koin</span>`;
            }
            li.innerHTML = `<div class="shop-item-icon">${item.icon}</div>
                            <div class="item-details"><span class="item-name">${item.name}</span>${priceHTML}</div>
                            <button class="redeem-btn" data-item-id="${item.id}">Tukar</button>`;
            const finalCost = isDiscountActive ? item.discountCost : item.cost;
            if (state.userData.coins < finalCost) {
                const btn = li.querySelector(".redeem-btn"); btn.disabled = true; btn.style.opacity = "0.5"; btn.innerText = "Kurang";
            }
            DOM.shopList.appendChild(li);
        });
    };
    
    const populateHistoryList = () => {
        const history = JSON.parse(localStorage.getItem("kaitouRedeemedCodes")) || [];
        DOM.historyList.innerHTML = "";
        if (history.length === 0) {
            DOM.historyList.innerHTML = '<p id="no-history-msg">Belum ada penukaran.</p>';
        } else {
            history.reverse().forEach(h => {
                const li = document.createElement("li");
                const dateStr = new Date(h.timestamp).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
                li.innerHTML = `<div class="item-details"><span class="item-name">Kode: <code class="item-code">${h.code}</code></span><span class="item-timestamp">${dateStr}</span></div><button class="copy-btn" data-code="${h.code}">Salin</button>`;
                DOM.historyList.appendChild(li);
            });
        }
    };    

    // ================== EVENT LISTENERS ==================
    const setupEventListeners = () => {
        DOM.chatButton.addEventListener("click", toggleChatWindow); 
        DOM.closeBtn.addEventListener("click", () => { DOM.chatWindow.classList.remove("visible"); closeAllPanels(); });
        DOM.sendBtn.addEventListener("click", sendMessage); 
        DOM.chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
        DOM.uploadBtn.addEventListener("click", () => DOM.imageInput.click()); 
        DOM.videoUploadBtn.addEventListener("click", () => DOM.videoInput.click());
        DOM.imageInput.addEventListener("change", (e) => handleFileInput(e.target.files[0])); 
        DOM.videoInput.addEventListener("change", (e) => handleFileInput(e.target.files[0]));
        DOM.removeMediaBtn.addEventListener("click", resetInputs);
        DOM.fullscreenBtn.addEventListener("click", () => { 
            if (!document.fullscreenElement) { DOM.chatWindow.requestFullscreen(); checkMissionCompletion(null, 'use_fullscreen'); } else { document.exitFullscreen(); } 
        });
        DOM.toast.addEventListener('click', (e) => { if (e.target !== DOM.toastClose) { DOM.toast.classList.remove('visible'); toggleChatWindow(); } });
        DOM.toastClose.addEventListener('click', (e) => { e.stopPropagation(); DOM.toast.classList.remove('visible'); });
        
        DOM.animationControls.addEventListener("click", (e) => { 
            if (e.target.tagName === 'BUTTON' && e.target.dataset.animation) { 
                const anim = e.target.dataset.animation; playAnimation(DOM.modelViewer, anim); 
                if (anim.includes('Kick')) checkMissionCompletion(null, 'animation_kick');
                else if (anim.includes('Jump')) checkMissionCompletion(null, 'animation_jump');
                else if (anim.includes('Twirl')) checkMissionCompletion(null, 'animation_twirl');
                else if (anim.includes('Punch')) checkMissionCompletion(null, 'animation_punch');
                else if (anim.includes('Run')) checkMissionCompletion(null, 'animation_run');
            } 
        });
        
        DOM.coinBalanceButton.addEventListener('click', () => openUserHub('shop'));
        DOM.missionToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.missionPanel.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.missionPanel.classList.add('visible'); });
        DOM.animationToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.animationControls.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.animationControls.classList.add('visible'); });
        DOM.closeHubBtn.addEventListener('click', () => { DOM.hubPopup.style.display = 'none'; });
        DOM.hubTabs.addEventListener('click', e => { if (e.target.matches('.hub-tab-btn')) switchTab(e.target.dataset.tab); });

        DOM.shopList.addEventListener('click', async (e) => {
            if (!e.target.matches('.redeem-btn')) return;
            const redeemButton = e.target; const itemId = redeemButton.dataset.itemId;
            const item = CONFIG.SHOP_ITEMS.find(i => i.id === itemId);
            if (!item) { alert('Item tidak valid!'); return; }

            const now = new Date(); const discountEndDate = CONFIG.DISCOUNT_END_DATE ? new Date(CONFIG.DISCOUNT_END_DATE) : new Date(0);
            let currentPrice = (now <= discountEndDate && item.discountCost) ? item.discountCost : item.cost;

            if (state.userData.coins < currentPrice) { alert("Koin tidak cukup!"); return; }
            const confirmed = confirm(`Tukar ${currentPrice} koin dengan "${item.name}"?`);
            if (!confirmed) return;

            redeemButton.disabled = true; redeemButton.textContent = 'Proses...';
            try {
                const userId = localStorage.getItem('kaitouVisitorId');
                if (!userId) { alert('Reload halaman!'); return; }
                const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=redeem_code&userId=${userId}&itemId=${itemId}`);
                const data = await response.json();

                if (data.status === 'success') {
                    alert(`Berhasil! Kode: ${data.code}`);
                    state.userData.coins = data.newBalance; saveUserData(); updateCoinDisplay();
                    const history = JSON.parse(localStorage.getItem("kaitouRedeemedCodes")) || [];
                    history.push({ code: data.code, timestamp: Date.now() });
                    localStorage.setItem("kaitouRedeemedCodes", JSON.stringify(history));
                    populateShopList(); populateHistoryList();
                } else {
                    alert(`Gagal: ${data.message}`); redeemButton.disabled = false; redeemButton.textContent = 'Tukar';
                }
            } catch (error) { alert('Error jaringan.'); redeemButton.disabled = false; redeemButton.textContent = 'Tukar'; }
        });

        DOM.historyList.addEventListener('click', (e) => {
            if (!e.target.matches('.copy-btn')) return;
            const button = e.target; const codeToCopy = button.dataset.code;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                const originalText = button.textContent; button.textContent = 'Disalin!'; button.style.backgroundColor = '#4caf50';
                setTimeout(() => { button.textContent = originalText; button.style.backgroundColor = ''; }, 2000);
            });
        });

        DOM.battleActionButtons.addEventListener("click", e => {
            if ("player" === state.isGameTurn && e.target.matches(".action-btn")) {
                const action = e.target.dataset.action;
                DOM.battleActionButtons.querySelectorAll(".action-btn").forEach(btn => btn.disabled = true);
                if (action === "punch") dealDamageToMonster(12, "PunchC");
                else if (action === "kick") dealDamageToMonster(18, ["DKick", "FKick", "SFKick"][Math.floor(3 * Math.random())]);
                else if (action === "dodge") {
                    state.isPlayerDodging = true; playAnimation(DOM.battleModelViewer, "Jump1");
                    addBattleLog("Kamu bersiap menghindar!"); switchTurn("enemy");
                } else if (action === "special" && state.superMeter >= CONFIG.SUPER_METER_MAX) {
                    dealDamageToMonster(50, "Twirl"); state.superMeter = 0;
                }
                setTimeout(updateBattleUI, 50);
            }
        });

        DOM.saveUsernameBtn.addEventListener('click', () => { 
            const username = DOM.usernameInput.value.trim(); 
            if (username.length >= 3 && /^[a-zA-Z0-9_ ]+$/.test(username)) { 
                state.userData.username = username; DOM.usernamePopup.style.display = 'none'; finishInitialization(); 
                setTimeout(() => { if (!DOM.chatWindow.classList.contains('visible')) toggleChatWindow(); }, 300); 
            } else { alert('Nama tidak valid (3-15 karakter)!'); } 
        });
        DOM.usernameInput.addEventListener("keypress", (e) => e.key === "Enter" && DOM.saveUsernameBtn.click());
        DOM.rankDisplay.addEventListener('click', () => { 
            const activeType = DOM.leaderboardTypeSelector.querySelector('.active').dataset.leaderboardType; displayFullLeaderboard(activeType); 
        });
        DOM.closeLeaderboardBtn.addEventListener('click', () => { DOM.leaderboardPopup.style.display = 'none'; });
        DOM.leaderboardTypeSelector.addEventListener('click', (e) => { 
            if (e.target.matches('.leaderboard-type-btn')) displayFullLeaderboard(e.target.dataset.leaderboardType); 
        });
    };

    // ================== INISIALISASI UTAMA ==================
    const initialize = () => {
        initializeUserData(); setupEventListeners();
        const checkDarkMode = () => { 
            const isDark = document.body.classList.contains("dark-mode") || document.documentElement.classList.contains("dark-mode"); 
            DOM.chatbotContainer.classList.toggle("kaitou-dark-mode", isDark); 
        }; 
        const observer = new MutationObserver(checkDarkMode); observer.observe(document.body, { attributes: true, attributeFilter: ["class"] }); checkDarkMode(); 
        
        const updateCountdown = () => { 
            const now = new Date(); let nextReset = new Date(); nextReset.setHours(CONFIG.MISSION_RESET_HOUR_LOCAL, 0, 0, 0); 
            if (now > nextReset) nextReset.setDate(nextReset.getDate() + 1); 
            const diff = nextReset - now; 
            if (DOM.missionCountdownElem) DOM.missionCountdownElem.textContent = `Reset dalam: ${String(Math.floor(diff/36e5)).padStart(2,"0")}:${String(Math.floor(diff%36e5/6e4)).padStart(2,"0")}:${String(Math.floor(diff%6e4/1e3)).padStart(2,"0")}`; 
        }; 
        updateCountdown(); setInterval(updateCountdown, 1000);
        
        setInterval(() => { 
            const isBattle = "flex" === DOM.battleOverlay.style.display; 
            const hasMonsters = DOM.missionMapContainer.querySelectorAll(".monster-dot").length > 0; 
            if (!isBattle && !hasMonsters) { 
                const now = Date.now(); 
                if (now - (state.userData.lastMonsterSpawn || 0) > 1 * 60 * 1000) { 
                    addMessageToChat("bot", "🚨 Monster terdeteksi!"); spawnMonsters(); 
                    state.userData.lastMonsterSpawn = now; saveUserData(); 
                } 
            } 
        }, 60000);
        
        setTimeout(() => { if (!DOM.chatWindow.classList.contains('visible') && DOM.usernamePopup.style.display !== 'flex') DOM.toast.classList.add('visible'); }, 1000);
    };

    initialize();
});