document.addEventListener("DOMContentLoaded", () => {
    
    // ================== KONFIGURASI ==================
    const CONFIG = {
        APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzJ9ti-iYWtzH2dZU-c5yhmps45YXAkCoWzspT_MYB-VLSA9al63Usmmmi_eZ2cJaiF/exec',
        SHOP_ITEMS: [{ id: 'access_code', name: 'Kode Akses 2 Hari Link Tanpa Iklan', icon: '🔑', cost: 900 }],
        API_KEYS: ["AIzaSyBfgC4HFG96G0i0dPgZL_YoiCWiDhO9K30","AIzaSyA-MXhmFpT25kyegCuz1uSt-YJ3gxi4E-0","AIzaSyCdaRYs-OkufOUL1apgwgDBgylEtAY7b3w", "AIzaSyAL5T__fZZk7BZ9uCwg1dW1gs607WUmejg"],
        MODEL_NAME: "gemini-2.5-flash",
        MAX_IMAGE_SIZE_MB: 5, MAX_VIDEO_SIZE_MB: 25, ANIMATION_NAME_TALK: "Talk", ANIMATION_NAME_IDLE: "Idle", DAILY_MISSION_COUNT: 3, COINS_PER_MISSION: 10, MISSION_RESET_HOUR_LOCAL: 7, COINS_PER_MONSTER: 1, PLAYER_MAX_HP: 100, MONSTER_MAX_HP: 100, SUPER_METER_MAX: 100,
        FULL_MISSIONS_LIST: [ { id: 'beat_monster', text: `Kalahkan monster di Peta Misi` }, { id: 'ask_rider', text: 'Tanyakan tentang Kamen Rider' }, { id: 'ask_sentai', text: 'Cari info tentang Super Sentai' }, { id: 'ask_ultraman', text: 'Tanya soal Ultraman' }, { id: 'ask_download', text: 'Tanyakan cara download' }, { id: 'ask_hardsub', text: 'Tanyakan tentang format subtitle' }, { id: 'ask_recommendation', text: 'Minta rekomendasi tontonan' }, { id: 'ask_favorite', text: 'Tanyakan seri favorit Kaitou-kun' }, { id: 'ask_about_blog', text: 'Tanya tentang blog Kaitou Fansub' }, { id: 'ask_about_self', text: 'Tanya "siapa kamu?"' }, { id: 'ask_kaiju', text: 'Tanyakan tentang Kaiju' }, { id: 'ask_metalhero', text: 'Tanya soal genre Metal Hero' }, { id: 'ask_encoder', text: 'Tanya tentang encoder H265' }, { id: 'say_henshin', text: 'Katakan "Henshin!"' }, { id: 'say_thankyou', text: 'Katakan "terima kasih" atau "makasih"' }, { id: 'say_cool', text: 'Ucapkan kata "keren"' }, { id: 'upload_image', text: 'Unggah sebuah gambar' }, { id: 'upload_video', text: 'Unggah sebuah video' }, { id: 'use_fullscreen', text: 'Gunakan mode layar penuh' }, { id: 'use_kick_animation', text: 'Gunakan salah satu animasi tendangan' }, { id: 'use_jump_animation', text: 'Gunakan salah satu animasi lompat' }, { id: 'use_twirl_animation', text: 'Gunakan animasi berputar' }, { id: 'use_punch_animation', text: 'Gunakan animasi pukulan' }, { id: 'use_run_animation', text: 'Gunakan animasi lari' }]
    };

    // ================== ELEMEN DOM ==================
    const DOM = {
        chatbotContainer:document.getElementById("kaitou-chatbot-container"),chatWindow:document.getElementById("kaitou-chat-window"),chatButton:document.getElementById("kaitou-chat-button"),closeBtn:document.getElementById("close-btn"),chatScrollArea:document.getElementById("kaitou-chat-scroll-area"),chatInput:document.getElementById("kaitou-chat-input"),sendBtn:document.getElementById("kaitou-send-btn"),modelViewer:document.getElementById("kaitou-3d-viewer"),battleModelViewer:document.getElementById("kaitou-battle-viewer"),fullscreenBtn:document.getElementById("fullscreen-btn"),openSound:document.getElementById("kaitou-open-sound"),uploadBtn:document.getElementById("kaitou-upload-btn"),imageInput:document.getElementById("kaitou-image-input"),videoUploadBtn:document.getElementById("kaitou-video-upload-btn"),videoInput:document.getElementById("kaitou-video-input"),mediaIndicator:document.getElementById("kaitou-media-indicator"),mediaIndicatorText:document.getElementById("kaitou-media-indicator-text"),removeMediaBtn:document.getElementById("kaitou-remove-media-btn"),animationToggleBtn:document.getElementById("animation-toggle-btn"),animationControls:document.getElementById("kaitou-animation-controls"),missionToggleBtn:document.getElementById("mission-toggle-btn"),missionPanel:document.getElementById("kaitou-mission-panel"),missionList:document.getElementById("mission-list"),streakCounter:document.getElementById("streak-counter"),sfxMissionComplete:document.getElementById("sfx-mission-complete"),missionCountdownElem:document.getElementById("mission-reset-countdown"),coinAmountElem:document.getElementById("coin-amount"),coinBalanceButton:document.getElementById("kaitou-coin-balance"),hubPopup:document.getElementById("kaitou-hub-popup"),closeHubBtn:document.getElementById("close-hub-btn"),shopList:document.getElementById("kaitou-shop-list"),historyList:document.getElementById("history-list"),hubTabs:document.querySelector(".hub-tabs"),missionMapContainer:document.getElementById("kaitou-mission-map-container"),battleOverlay:document.getElementById("kaitou-battle-overlay"),battleBox:document.getElementById("battle-box"),battleMonsterImg:document.getElementById("battle-monster-img"),battleLogArea:document.getElementById("battle-log-area"),battleResultOverlay:document.getElementById("battle-result-overlay"),battleResultText:document.getElementById("battle-result-text"),sfxAttack:document.getElementById("sfx-attack-swing"),sfxMonsterHit:document.getElementById("sfx-monster-hit"),toast:document.getElementById("kaitou-toast-notification"),toastClose:document.getElementById("kaitou-toast-close"),hubPopupBox:document.getElementById("kaitou-hub-popup"),playerHpBar:document.getElementById("player-hp-bar"),playerHpText:document.getElementById("player-hp-text"),enemyHpBar:document.getElementById("enemy-hp-bar"),enemyHpText:document.getElementById("enemy-hp-text"),specialMeterBar:document.getElementById("special-meter-bar"),usernamePopup:document.getElementById("kaitou-username-popup"),usernameInput:document.getElementById("kaitou-username-input"),saveUsernameBtn:document.getElementById("kaitou-save-username-btn"),rankDisplay:document.getElementById("kaitou-rank-display"),rankValue:document.getElementById("rank-value"),leaderboardPopup:document.getElementById("kaitou-leaderboard-popup"),closeLeaderboardBtn:document.getElementById("close-leaderboard-btn"),leaderboardListContainer:document.getElementById("leaderboard-list-container"),leaderboardTypeSelector:document.querySelector(".leaderboard-type-selector"),battleActionButtons:document.getElementById("battle-action-buttons")
    };

    // ================== STATE APLIKASI ==================
    let state = {
        currentFile: null, currentFilePreviewUrl: null, currentVideoThumbnailSrc: null, activeMonsterDot: null, chatHistory: [], userData: {},
        leaderboardData: { coins: [], fights: [] },
        currentMonsterHP: CONFIG.MONSTER_MAX_HP, playerHP: CONFIG.PLAYER_MAX_HP, superMeter: 0, isPlayerDodging: false, isGameTurn: "player"
    };
    
    // ================== FUNGSI PEMBANTU (UTILITIES) ==================
    const getTodayString = () => new Date().toISOString().slice(0, 10);
    const fileToBase64 = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = error => reject(error); });
    const generateVideoThumbnail = (file) => new Promise((resolve, reject) => { const video = document.createElement('video'); const objectUrl = URL.createObjectURL(file); video.src = objectUrl; video.muted = true; video.onloadeddata = () => { video.currentTime = 1; }; video.onseeked = () => { const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight; canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(objectUrl); resolve(canvas.toDataURL('image/jpeg')); }; video.onerror = () => reject("Gagal memuat metadata video."); });
    const playAnimation = (viewer, animationName, fallbackAnimation) => { if (viewer?.availableAnimations.includes(animationName)) { viewer.animationName = animationName; viewer.play(); } else if (fallbackAnimation) { viewer.animationName = fallbackAnimation; viewer.play(); } };
    const closeAllPanels = () => { DOM.missionPanel.classList.remove("visible"); DOM.animationControls.classList.remove("visible"); DOM.hubPopup.style.display = 'none'; };
    const formatMessage = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/\n/g, "<br>") : "";

    // ================== LOGIKA INTI CHAT ==================
    const addMessageToChat = (role, text, mediaInfo = null) => { const messageDiv = document.createElement("div"); messageDiv.classList.add("chat-message", `${role}-message`); let progressBarElem = null; if (mediaInfo?.src) { let mediaContainer; if (mediaInfo.type.startsWith('image')) { mediaContainer = document.createElement('img'); mediaContainer.style.cssText = 'max-width:100%;border-radius:10px;margin-bottom:10px;'; mediaContainer.src = mediaInfo.src; } else if (mediaInfo.type.startsWith('video')) { mediaContainer = document.createElement('div'); mediaContainer.className = 'video-container-base'; mediaContainer.innerHTML = `<img class="video-thumbnail-img" src="${mediaInfo.thumbnailSrc}"/><div class="video-play-icon">▶</div>`; mediaContainer.onclick = () => { const videoPlayer = document.createElement('video'); videoPlayer.src = mediaInfo.src; videoPlayer.controls = true; videoPlayer.autoplay = true; videoPlayer.style.cssText = 'width:100%;display:block;'; mediaContainer.innerHTML = ''; mediaContainer.appendChild(videoPlayer); mediaContainer.style.cursor = 'default'; mediaContainer.onclick = null; }; } if (mediaContainer) messageDiv.appendChild(mediaContainer); } if (role === 'user' && mediaInfo) { const progressContainer = document.createElement('div'); progressContainer.className = 'upload-progress-container'; progressBarElem = document.createElement('div'); progressBarElem.className = 'upload-progress-bar'; progressContainer.appendChild(progressBarElem); messageDiv.appendChild(progressContainer); } const textSpan = document.createElement("span"); if (role === 'user' && text) { textSpan.innerHTML = formatMessage(text); } if (role === "bot") { if (DOM.battleOverlay?.style.display !== 'flex') { playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_TALK, CONFIG.ANIMATION_NAME_IDLE); } const cursorSpan = document.createElement("span"); cursorSpan.classList.add("typing-cursor"); messageDiv.append(textSpan, cursorSpan); DOM.chatScrollArea.appendChild(messageDiv); let i = 0; const typeWriter = () => { if (i < text.length) { textSpan.innerHTML = formatMessage(text.substring(0, i + 1)); i++; DOM.chatScrollArea.scrollTop = DOM.chatScrollArea.scrollHeight; setTimeout(typeWriter, 2); } else { textSpan.innerHTML = formatMessage(text); cursorSpan.remove(); if (DOM.battleOverlay?.style.display !== 'flex') { playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE); } } }; typeWriter(); } else { if (text || messageDiv.children.length > 0) { messageDiv.appendChild(textSpan); DOM.chatScrollArea.appendChild(messageDiv); } } DOM.chatScrollArea.scrollTop = DOM.chatScrollArea.scrollHeight; return { messageDiv, progressBarElem }; };
    const sendMessage = async () => { const userInput = DOM.chatInput.value.trim(); const fileToSend = state.currentFile; if (userInput === "" && !fileToSend) return; checkMissionCompletion(userInput); let userMediaInfo = null; if (fileToSend) { userMediaInfo = { type: fileToSend.type, src: state.currentFilePreviewUrl, thumbnailSrc: state.currentVideoThumbnailSrc }; } const { progressBarElem } = addMessageToChat("user", userInput, userMediaInfo); const sentFile = fileToSend; DOM.chatInput.value = ""; resetInputs(); const botPlaceholder = addMessageToChat("bot", "").messageDiv; try { const parts = []; if (userInput) parts.push({ text: userInput }); if (sentFile) { const base64Data = await fileToBase64(sentFile); parts.push({ inline_data: { mime_type: sentFile.type, data: base64Data } }); } state.chatHistory.push({ role: "user", parts: parts }); const requestBody = { contents: state.chatHistory }; const tryApiRequest = async (keyIndex) => { if (keyIndex >= CONFIG.API_KEYS.length) throw new Error("All API keys failed."); const currentApiKey = CONFIG.API_KEYS[keyIndex]; try { const data = await uploadWithProgress(requestBody, (percentage) => { if (progressBarElem) progressBarElem.style.width = percentage + '%'; }, currentApiKey); return data; } catch (error) { console.error(`API Key #${keyIndex + 1} gagal:`, error.message); return tryApiRequest(keyIndex + 1); } }; const data = await tryApiRequest(0); if (progressBarElem) progressBarElem.parentElement.style.display = 'none'; let botResponse = "Maaf, aku tidak mengerti. Bisa coba lagi?"; if (data?.candidates?.[0]?.content?.parts?.[0]?.text) { botResponse = data.candidates[0].content.parts[0].text; } botPlaceholder.remove(); addMessageToChat("bot", botResponse); state.chatHistory.push({ role: "model", parts: [{ text: botResponse }] }); } catch (error) { console.error("Semua percobaan API gagal:", error); botPlaceholder.remove(); addMessageToChat("bot", `Waduh, ada sedikit gangguan. Coba lagi nanti ya.`); } };
    const uploadWithProgress = (body, onProgress, apiKey) => new Promise((resolve, reject) => { const xhr = new XMLHttpRequest(); xhr.open("POST", `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.MODEL_NAME}:generateContent?key=${apiKey}`); xhr.setRequestHeader("Content-Type", "application/json"); xhr.upload.onprogress = (event) => { if (event.lengthComputable) onProgress((event.loaded / event.total) * 100); }; xhr.onload = () => { if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText)); else reject(new Error(`Server Error (${xhr.status}): ${xhr.responseText}`)); }; xhr.onerror = () => reject(new Error("Network Error")); xhr.send(JSON.stringify(body)); });
    const resetInputs = () => { state.currentFile = null, state.currentFilePreviewUrl = null, state.currentVideoThumbnailSrc = null, DOM.imageInput.value = "", DOM.videoInput.value = "", DOM.mediaIndicator.style.display = "none" };
    const handleFileInput = async (file) => { if (!file) return; resetInputs(); const isImage = file.type.startsWith('image'); const isVideo = file.type.startsWith('video'); const maxSize = isImage ? CONFIG.MAX_IMAGE_SIZE_MB : CONFIG.MAX_VIDEO_SIZE_MB; if (file.size > maxSize * 1024 * 1024) { return alert(`Ukuran file terlalu besar! Maksimum ${maxSize} MB.`); } state.currentFile = file; state.currentFilePreviewUrl = URL.createObjectURL(file); if (isVideo) { try { state.currentVideoThumbnailSrc = await generateVideoThumbnail(file); } catch (error) { alert("Gagal memproses file video. Coba file lain."); console.error(error); resetInputs(); return; } } DOM.mediaIndicatorText.textContent = isImage ? 'Gambar terpilih!' : 'Video siap!'; DOM.mediaIndicator.style.display = 'flex'; DOM.chatInput.focus(); if (isImage) checkMissionCompletion(null, 'upload_image'); if (isVideo) checkMissionCompletion(null, 'upload_video'); };

    // ================== LOGIKA PENGGUNA, INISIALISASI & LEADERBOARD ==================
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
        } else {
            playAnimation(DOM.modelViewer, CONFIG.ANIMATION_NAME_IDLE);
            closeAllPanels();
        }
    };
    const syncUserDataToServer = () => { try { if (state.userData && state.userData.lastLoginDate) { let userId = localStorage.getItem('kaitouVisitorId'); if (!userId) { userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9); localStorage.setItem('kaitouVisitorId', userId); } const missionsCompleted = state.userData.dailyMissions.filter(m => m.completed).length; const data = { userId: userId, username: state.userData.username || "Anonim", streak: state.userData.dayStreak || 0, missions: missionsCompleted, coins: state.userData.coins || 0, fights: state.userData.fightsWon || 0 }; const url = `${CONFIG.APPS_SCRIPT_URL}?action=sync_user_data&userId=${encodeURIComponent(data.userId)}&username=${encodeURIComponent(data.username)}&streak=${data.streak}&missions=${data.missions}&coins=${data.coins}&fights=${data.fights}`; fetch(url).then(response => response.json()).then(data => { if (data.status === 'error') { console.error(`Error dari Google Script: ${data.message}`); } }).catch(err => { console.error(`Gagal terhubung ke server sync: ${err.toString()}`); }); } } catch (err) { console.error(`Error di dalam fungsi syncUserDataToServer: ${err.toString()}`); } };
    const saveUserData = () => { try { localStorage.setItem('kaitouUserData', JSON.stringify(state.userData)); syncUserDataToServer(); } catch (e) { console.error("Gagal menyimpan data ke localStorage:", e); } };
    const updateCoinDisplay = () => { if (DOM.coinAmountElem) { DOM.coinAmountElem.textContent = state.userData.coins || 0; } };
    const generateNewMissions = () => [...CONFIG.FULL_MISSIONS_LIST].sort(() => 0.5 - Math.random()).slice(0, CONFIG.DAILY_MISSION_COUNT).map(m => ({ ...m, completed: false }));
    const initializeUserData = () => { let storedData = null; try { storedData = JSON.parse(localStorage.getItem('kaitouUserData')); } catch (e) { console.error("Gagal membaca data:", e); } const today = getTodayString(); if (!storedData) { state.userData = { username: null, lastLoginDate: today, dayStreak: 1, dailyMissions: generateNewMissions(), coins: 0, lastMonsterSpawn: 0, fightsWon: 0 }; } else { state.userData = storedData; const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1); const yesterdayString = yesterday.toISOString().slice(0, 10); if (state.userData.lastLoginDate !== today) { if (state.userData.lastLoginDate === yesterdayString) { state.userData.dayStreak = (state.userData.dayStreak || 0) + 1; } else { state.userData.dayStreak = 1; } state.userData.dailyMissions = generateNewMissions(); } if (typeof state.userData.coins === 'undefined') state.userData.coins = 0; if (typeof state.userData.fightsWon === 'undefined') state.userData.fightsWon = 0; if (typeof state.userData.lastMonsterSpawn === 'undefined') state.userData.lastMonsterSpawn = 0; if (typeof state.userData.username === 'undefined') state.userData.username = null; } finishInitialization(); };
    const finishInitialization = () => { initializeChatHistory(state.userData.username); state.userData.lastLoginDate = getTodayString(); saveUserData(); updateMissionPanelUI(); updateCoinDisplay(); if (state.userData.username) { DOM.missionMapContainer.classList.add('visible'); fetchUserRankAndLeaderboard(); } const now = Date.now(); const spawnInterval = 1 * 60 * 1000; if (now - (state.userData.lastMonsterSpawn || 0) > spawnInterval) { spawnMonsters(); state.userData.lastMonsterSpawn = now; saveUserData(); } updateMapAlert(); };
    const initializeChatHistory = (username) => { const finalUsername = username || 'Sobat'; const systemPrompt = `Mulai sekarang, kamu adalah 'Kaitou-kun', asisten AI yang ceria, ramah, dan keren dari blog Kaitou Fansub. Misimu adalah membantu pengunjung dan membuat mereka betah. Kamu sangat menyukai Tokusatsu. --- PENTING --- Pengguna yang sedang berbicara denganmu saat ini bernama **${finalUsername}**. Sapa dia dengan namanya sesekali agar terasa lebih akrab. --- Aturan lain: berikan jawaban sopan soal link download, jelaskan soal H265 dan Hardsub jadi tidak sembarang perangkat bisa memutarnya terutama TV atau Laptop, untuk tutorial cara download bisa tunjukkan link ini https://kaitoufansub.blogspot.com/p/tutorial-download.html, dan ajak follow media sosial.`; state.chatHistory = [ {role: "user", parts: [{text: systemPrompt}]}, {role: "model", parts: [{text: `Halo, ${finalUsername}! Aku Kaitou-kun, partnermu di blog ini!

Senang bertemu denganmu! Aku bukan sekadar asisten biasa, lho. Kamu bisa mendapatkan **koin** dan hadiah dengan berinteraksi denganku.

**Ini yang bisa kamu lakukan:**
*   **🏆 Misi Harian:** Klik ikon piala di atas untuk melihat misimu hari ini. Selesaikan untuk dapat koin & jaga **Day Streak** 🔥 kamu!
*   **👾 Lawan Monster:** Waspada! Radar di pojok bisa mendeteksi monster. Klik titik merah di peta untuk bertarung dan menangkan koin ekstra!
*   **🔑 Tukar Hadiah:** Kumpulkan koinmu dan tukar dengan **Kode Akses Link Download Tanpa Iklan** di User Hub (ikon koin 🪙).

Ada yang mau ditanyakan? Atau mau langsung mulai berburu misi?`}]} ]; };
    const fetchUserRankAndLeaderboard = async () => { try { const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=coins`); const data = await response.json(); if (data.status !== 'success' || !data.leaderboard) { throw new Error('Gagal mengambil data peringkat'); } state.leaderboardData.coins = data.leaderboard; const myUsername = state.userData.username; const myRankIndex = data.leaderboard.findIndex(p => p.username === myUsername); const myRank = (myRankIndex !== -1) ? myRankIndex + 1 : '10+'; updateRankDisplay(myRank); } catch (error) { console.error("Gagal mengambil peringkat:", error); DOM.rankDisplay.classList.remove('visible'); } };
    const updateRankDisplay = (rank) => { if (!rank) return; DOM.rankValue.textContent = `#${rank}`; DOM.rankDisplay.classList.add('visible'); };
    const displayFullLeaderboard = async (type = 'coins') => { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Memuat papan skor...</p>`; DOM.leaderboardPopup.style.display = 'flex'; DOM.leaderboardTypeSelector.querySelectorAll('.leaderboard-type-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.leaderboardType === type); }); try { if (state.leaderboardData[type].length === 0) { const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=get_leaderboard&type=${type}`); const data = await response.json(); if (data.status === 'success') { state.leaderboardData[type] = data.leaderboard; } else { throw new Error(data.message); } } const leaderboard = state.leaderboardData[type]; if (leaderboard.length === 0) { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Belum ada data. Jadilah yang pertama!</p>`; return; } const list = document.createElement('ol'); list.id = 'full-leaderboard-list'; const scoreIcon = type === 'coins' ? '🪙' : '⚔️'; leaderboard.forEach(player => { const li = document.createElement('li'); li.innerHTML = `\n <span class="leaderboard-name">${player.username}</span>\n <span class="leaderboard-score">${player.score.toLocaleString("id-ID")} <span class="score-icon">${scoreIcon}</span></span>\n `; list.appendChild(li); }); DOM.leaderboardListContainer.innerHTML = ''; DOM.leaderboardListContainer.appendChild(list); } catch (error) { DOM.leaderboardListContainer.innerHTML = `<p id="leaderboard-message">Gagal memuat papan skor. Coba lagi nanti.</p>`; console.error('Leaderboard fetch error:', error); } };
    
    // ================== LOGIKA MISI & PERTARUNGAN ==================
    const updateMissionPanelUI = () => { DOM.streakCounter.textContent = `🔥 Day Streak: ${state.userData.dayStreak || 0}`; DOM.missionList.innerHTML = ''; if (state.userData.dailyMissions) { state.userData.dailyMissions.forEach(mission => { const li = document.createElement('li'); li.textContent = mission.text; if (mission.completed) li.classList.add('completed'); DOM.missionList.appendChild(li); }); } };
    const checkMissionCompletion = (userInput = null, actionType = null) => { if (!state.userData.dailyMissions) return; const missionsToComplete = state.userData.dailyMissions.filter(m => !m.completed); if (missionsToComplete.length === 0) return; let missionAccomplished = false; const lowerInput = userInput ? userInput.toLowerCase() : ''; for (const mission of missionsToComplete) { let currentMissionDone = false; const check = (keywords) => keywords.some(kw => lowerInput.includes(kw));
        switch (mission.id) {
            case 'beat_monster': if (actionType === 'beat_monster') currentMissionDone = true; break;
            case 'ask_rider': if (check(['kamen rider'])) currentMissionDone = true; break;
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
        if (currentMissionDone) { mission.completed = true; missionAccomplished = true; break; } } if (missionAccomplished) { state.userData.coins += CONFIG.COINS_PER_MISSION; updateCoinDisplay(); DOM.sfxMissionComplete?.play().catch(e => console.error("SFX Error:", e)); let missionMessage = `✨ Misi selesai! Kamu mendapatkan ${CONFIG.COINS_PER_MISSION} Koin!`; const allMissionsNowComplete = state.userData.dailyMissions.every(m => m.completed); if (allMissionsNowComplete) { missionMessage = `🏆 Hebat! Semua misi harian telah selesai!`; } addMessageToChat('bot', missionMessage); saveUserData(); updateMissionPanelUI(); } };
    const updateMapAlert = () => { let alertIcon = DOM.missionMapContainer.querySelector('#mission-map-alert'); if (!alertIcon) { alertIcon = document.createElement('div'); alertIcon.id = 'mission-map-alert'; alertIcon.textContent = '!'; DOM.missionMapContainer.appendChild(alertIcon); } const monsterCount = DOM.missionMapContainer.querySelectorAll('.monster-dot').length; alertIcon.classList.toggle('visible', monsterCount > 0); };
    const spawnMonsters = () => { DOM.missionMapContainer.innerHTML = ''; const monsterCount = Math.floor(Math.random() * 3) + 1; for (let i = 0; i < monsterCount; i++) { const dot = document.createElement('div'); dot.className = 'monster-dot'; dot.style.left = `${Math.random()*(DOM.missionMapContainer.clientWidth-14)}px`; dot.style.top = `${Math.random()*(DOM.missionMapContainer.clientHeight-14)}px`; dot.addEventListener('click', (e) => { e.stopPropagation(); state.activeMonsterDot = dot; startBattle(); }); DOM.missionMapContainer.appendChild(dot); } updateMapAlert(); };
    const startBattle=()=>{state.currentMonsterHP=CONFIG.MONSTER_MAX_HP,state.playerHP=CONFIG.PLAYER_MAX_HP,state.superMeter=0,state.isPlayerDodging=false,state.isGameTurn="player",DOM.modelViewer.style.visibility="hidden",DOM.battleLogArea.innerHTML="",updateBattleUI(),DOM.battleOverlay.style.display="flex",playAnimation(DOM.battleModelViewer,CONFIG.ANIMATION_NAME_IDLE),addBattleLog("Pertarungan dimulai! Pilih aksimu!")},updateBattleUI=()=>{DOM.playerHpBar.style.width=`${state.playerHP/CONFIG.PLAYER_MAX_HP*100}%`,DOM.playerHpText.textContent=`${state.playerHP} / ${CONFIG.PLAYER_MAX_HP}`,DOM.enemyHpBar.style.width=`${state.currentMonsterHP/CONFIG.MONSTER_MAX_HP*100}%`,DOM.enemyHpText.textContent=`${state.currentMonsterHP} / ${CONFIG.MONSTER_MAX_HP}`,DOM.specialMeterBar.style.width=`${state.superMeter/CONFIG.SUPER_METER_MAX*100}%`,DOM.battleActionButtons.querySelectorAll(".action-btn").forEach(e=>{e.disabled="player"!==state.isGameTurn||"special-move-btn"===e.id&&state.superMeter<CONFIG.SUPER_METER_MAX})},dealDamageToMonster=(e,t)=>{if("none"!==state.isGameTurn){playAnimation(DOM.battleModelViewer,t,"PunchC"),DOM.sfxAttack?.play(),(state.currentMonsterHP-=e)<0&&(state.currentMonsterHP=0),DOM.battleMonsterImg.classList.add("flash-red"),setTimeout(()=>{DOM.sfxMonsterHit?.play(),DOM.battleMonsterImg.classList.remove("flash-red")},150),(state.superMeter+=3.5*e)>CONFIG.SUPER_METER_MAX&&(state.superMeter=CONFIG.SUPER_METER_MAX),updateBattleUI(),state.currentMonsterHP<=0?(state.isGameTurn="none",updateBattleUI(),setTimeout(()=>showBattleResult(!0),1500)):switchTurn("enemy")}},dealDamageToPlayer=e=>{if("none"!==state.isGameTurn){let t=e;addBattleLog(`Monster menyerang dengan kekuatan ${e}!`),state.isPlayerDodging?(t=0,addBattleLog("Kamu berhasil menghindar! Tidak ada kerusakan!")):(DOM.battleBox.classList.add("shake-hard"),setTimeout(()=>DOM.battleBox.classList.remove("shake-hard"),400)),(state.playerHP-=t)<0&&(state.playerHP=0),updateBattleUI(),state.playerHP<=0?(state.isGameTurn="none",updateBattleUI(),setTimeout(()=>showBattleResult(!1),1500)):switchTurn("player")}},showBattleResult=e=>{DOM.battleResultText.textContent=e?"MENANG":"KALAH",DOM.battleResultText.className="battle-result-text",DOM.battleResultText.classList.add(e?"win-text":"lose-text"),DOM.battleResultOverlay.style.display="flex",setTimeout(()=>endBattle(e),2e3)},endBattle=e=>{DOM.battleOverlay.style.display="none",DOM.battleResultOverlay.style.display="none",DOM.modelViewer.style.visibility="visible",playAnimation(DOM.modelViewer,CONFIG.ANIMATION_NAME_IDLE),e?(state.activeMonsterDot&&(state.activeMonsterDot.remove(),state.activeMonsterDot=null),e=CONFIG.COINS_PER_MONSTER,state.userData.coins+=e,state.userData.fightsWon=(state.userData.fightsWon||0)+1,updateCoinDisplay(),saveUserData(),checkMissionCompletion(null,"beat_monster"),addMessageToChat("bot",`🎉 KAMU MENANG! Monster berhasil dikalahkan dan kamu mendapatkan ${e} Koin!`)):addMessageToChat("bot","⚔️ Kamu telah dikalahkan... Monster itu terlalu kuat. Coba lagi nanti!"),updateMapAlert()},switchTurn=e=>{state.isPlayerDodging=false,state.isGameTurn=e,updateBattleUI(),"enemy"===state.isGameTurn?(addBattleLog("Monster bersiap..."),setTimeout(()=>{if("none"!==state.isGameTurn){.9>Math.random()?dealDamageToPlayer(Math.floor(11*Math.random())+15):(addBattleLog("Monster terlihat waspada dan menjaga pertahanannya."),switchTurn("player"))}},1500)):addBattleLog("Giliranmu! Pilih aksimu selanjutnya.")},addBattleLog=e=>{const t=document.createElement("p");t.textContent=`> ${e}`,DOM.battleLogArea.appendChild(t),DOM.battleLogArea.scrollTop=DOM.battleLogArea.scrollHeight};
    const openUserHub=e=>{closeAllPanels(),populateShopList(),populateHistoryList(),switchTab(e||"shop"),DOM.hubPopup.style.display="flex"},switchTab=e=>{DOM.hubTabs.querySelectorAll(".hub-tab-btn").forEach(t=>t.classList.remove("active")),DOM.hubTabs.querySelector(`.hub-tab-btn[data-tab="${e}"]`).classList.add("active"),DOM.hubPopupBox.querySelectorAll(".hub-content").forEach(t=>t.classList.remove("active")),document.getElementById(`hub-content-${e}`).classList.add("active")},populateShopList=()=>{DOM.shopList.innerHTML="",CONFIG.SHOP_ITEMS.forEach(e=>{const t=document.createElement("li");t.innerHTML=`<div class="shop-item-icon">${e.icon}</div><div class="item-details"><span class="item-name">${e.name}</span><span class="item-price">${e.cost} Koin</span></div><button class="redeem-btn" data-item-id="${e.id}">Tukar</button>`,state.userData.coins<e.cost&&(t.querySelector(".redeem-btn").disabled=true),DOM.shopList.appendChild(t)})},populateHistoryList=()=>{const e=JSON.parse(localStorage.getItem("kaitouRedeemedCodes"))||[];DOM.historyList.innerHTML="",0===e.length?DOM.historyList.innerHTML='<p id="no-history-msg">Anda belum pernah menukarkan kode.</p>':e.reverse().forEach(e=>{const t=document.createElement("li"),n=new Date(e.timestamp).toLocaleString("id-ID",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});t.innerHTML=`<div class="item-details"><span class="item-name">Kode: <code class="item-code">${e.code}</code></span><span class="item-timestamp">Ditukar pada: ${n}</span></div><button class="copy-btn" data-code="${e.code}">Salin</button>`,DOM.historyList.appendChild(t)})};
    
    // ================== EVENT LISTENERS (PENYIAPAN INTERAKSI) ==================
    const setupEventListeners = () => {
        DOM.chatButton.addEventListener("click", toggleChatWindow); DOM.closeBtn.addEventListener("click", () => { DOM.chatWindow.classList.remove("visible"); closeAllPanels(); });
        DOM.sendBtn.addEventListener("click", sendMessage); DOM.chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
        DOM.uploadBtn.addEventListener("click", () => DOM.imageInput.click()); DOM.videoUploadBtn.addEventListener("click", () => DOM.videoInput.click());
        DOM.imageInput.addEventListener("change", (e) => handleFileInput(e.target.files[0])); DOM.videoInput.addEventListener("change", (e) => handleFileInput(e.target.files[0]));
        DOM.removeMediaBtn.addEventListener("click", resetInputs);
        DOM.fullscreenBtn.addEventListener("click", () => { if (!document.fullscreenElement) { DOM.chatWindow.requestFullscreen(); checkMissionCompletion(null, 'use_fullscreen'); } else { document.exitFullscreen(); } });
        DOM.toast.addEventListener('click', (e) => { if (e.target !== DOM.toastClose) { DOM.toast.classList.remove('visible'); toggleChatWindow(); } });
        DOM.toastClose.addEventListener('click', (e) => { e.stopPropagation(); DOM.toast.classList.remove('visible'); });
        DOM.animationControls.addEventListener("click", (e) => { 
            if (e.target.tagName === 'BUTTON' && e.target.dataset.animation) { 
                const anim = e.target.dataset.animation; 
                playAnimation(DOM.modelViewer, anim); 
                if (anim.toLowerCase().includes('kick')) checkMissionCompletion(null, 'animation_kick');
                else if (anim.toLowerCase().includes('jump')) checkMissionCompletion(null, 'animation_jump');
                else if (anim.toLowerCase().includes('twirl')) checkMissionCompletion(null, 'animation_twirl');
                else if (anim.toLowerCase().includes('punch')) checkMissionCompletion(null, 'animation_punch');
                else if (anim.toLowerCase().includes('run')) checkMissionCompletion(null, 'animation_run');
            } 
        });
        DOM.coinBalanceButton.addEventListener('click', () => openUserHub('shop'));
        DOM.missionToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.missionPanel.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.missionPanel.classList.add('visible'); });
        DOM.animationToggleBtn.addEventListener("click", (e) => { e.stopPropagation(); const isVisible = DOM.animationControls.classList.contains('visible'); closeAllPanels(); if (!isVisible) DOM.animationControls.classList.add('visible'); });
        DOM.closeHubBtn.addEventListener('click', () => { DOM.hubPopup.style.display = 'none'; });
        DOM.hubTabs.addEventListener('click', e => { if (e.target.matches('.hub-tab-btn')) { switchTab(e.target.dataset.tab); } });
        DOM.shopList.addEventListener('click', async (e) => {
    // Cek apakah yang diklik adalah tombol tukar
    if (!e.target.matches('.redeem-btn')) return;

    const redeemButton = e.target;
    const itemId = redeemButton.dataset.itemId;
    const item = CONFIG.SHOP_ITEMS.find(i => i.id === itemId);

    if (!item) {
        alert('Item tidak valid!');
        return;
    }

    // Konfirmasi sebelum menukar
    const confirmed = confirm(`Anda yakin ingin menukar ${item.cost} koin dengan "${item.name}"?`);
    if (!confirmed) return;

    // Nonaktifkan tombol untuk mencegah klik ganda
    redeemButton.disabled = true;
    redeemButton.textContent = 'Memproses...';

    try {
        const userId = localStorage.getItem('kaitouVisitorId');
        if (!userId) {
            alert('ID Pengguna tidak ditemukan. Coba refresh halaman.');
            return;
        }

        // Panggil Google Apps Script
        const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?action=redeem_code&userId=${userId}&itemId=${itemId}`);
        const data = await response.json();

        if (data.status === 'success') {
            alert(`Penukaran Berhasil!\n\nKode Anda adalah: ${data.code}\n\nHarap simpan kode ini baik-baik. Anda juga bisa melihatnya lagi di tab Riwayat.`);

            // Update state di sisi klien
            state.userData.coins = data.newBalance;
            saveUserData();
            updateCoinDisplay();

            // Simpan ke riwayat lokal
            const history = JSON.parse(localStorage.getItem("kaitouRedeemedCodes")) || [];
            history.push({ code: data.code, timestamp: Date.now() });
            localStorage.setItem("kaitouRedeemedCodes", JSON.stringify(history));

            // Perbarui tampilan toko dan riwayat
            populateShopList();
            populateHistoryList();
            
        } else {
            // Jika ada error dari server (misal: koin tidak cukup)
            alert(`Gagal Menukar: ${data.message}`);
            redeemButton.disabled = false; // Aktifkan lagi tombolnya
            redeemButton.textContent = 'Tukar';
        }

    } catch (error) {
        alert('Terjadi kesalahan jaringan. Coba lagi nanti.');
        redeemButton.disabled = false;
        redeemButton.textContent = 'Tukar';
        console.error('Redeem Error:', error);
    }
});
DOM.historyList.addEventListener('click', (e) => {
    // Cek apakah yang diklik adalah tombol Salin
    if (!e.target.matches('.copy-btn')) return;

    const button = e.target;
    // Ambil kode dari atribut data-code pada tombol
    const codeToCopy = button.dataset.code;

    // Gunakan Clipboard API modern untuk menyalin teks
    navigator.clipboard.writeText(codeToCopy).then(() => {
        // Jika berhasil, berikan feedback ke pengguna
        const originalText = button.textContent;
        button.textContent = 'Disalin!';
        button.style.backgroundColor = '#4caf50'; // Warna hijau sebagai tanda sukses

        // Kembalikan ke teks semula setelah 2 detik
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = ''; // Kembalikan ke warna asli
        }, 2000);

    }).catch(err => {
        // Jika gagal, tampilkan pesan error
        console.error('Gagal menyalin kode:', err);
        alert('Gagal menyalin kode. Coba lagi secara manual.');
    });
});
        DOM.battleActionButtons.addEventListener("click",e=>{"player"===state.isGameTurn&&e.target.matches(".action-btn")&&(("punch"===e.target.dataset.action&&dealDamageToMonster(12,"PunchC")),("kick"===e.target.dataset.action&&dealDamageToMonster(18,["DKick","FKick","SFKick"][Math.floor(3*Math.random())])),("dodge"===e.target.dataset.action&&(state.isPlayerDodging=true,playAnimation(DOM.battleModelViewer,"Jump1"),addBattleLog("Kamu bersiap untuk menghindar!"),switchTurn("enemy"))),("special"===e.target.dataset.action&&state.superMeter>=CONFIG.SUPER_METER_MAX&&(dealDamageToMonster(50,"Twirl"),state.superMeter=0)),updateBattleUI())});
        DOM.saveUsernameBtn.addEventListener('click', () => { const username = DOM.usernameInput.value.trim(); if (username.length >= 3 && username.length <= 15 && /^[a-zA-Z0-9_ ]+$/.test(username)) { state.userData.username = username; DOM.usernamePopup.style.display = 'none'; finishInitialization(); setTimeout(() => { if (!DOM.chatWindow.classList.contains('visible')) toggleChatWindow(); }, 300); } else { alert('Nama tidak valid! Gunakan 3-15 karakter (huruf, angka, spasi, _).'); } });
        DOM.usernameInput.addEventListener("keypress", (e) => e.key === "Enter" && DOM.saveUsernameBtn.click());
        DOM.rankDisplay.addEventListener('click', () => { const activeType = DOM.leaderboardTypeSelector.querySelector('.active').dataset.leaderboardType; displayFullLeaderboard(activeType); });
        DOM.closeLeaderboardBtn.addEventListener('click', () => { DOM.leaderboardPopup.style.display = 'none'; });
        DOM.leaderboardTypeSelector.addEventListener('click', (e) => { if (e.target.matches('.leaderboard-type-btn')) { const type = e.target.dataset.leaderboardType; displayFullLeaderboard(type); } });
    };

    // ================== INISIALISASI UTAMA ==================
    const initialize = () => {
        initializeUserData();
        setupEventListeners();
        const checkDarkMode=()=>{const e=document.body.classList.contains("dark-mode")||document.documentElement.classList.contains("dark-mode");DOM.chatbotContainer.classList.toggle("kaitou-dark-mode",e)};const observer=new MutationObserver(checkDarkMode);observer.observe(document.body,{attributes:true,attributeFilter:["class"]}),checkDarkMode();const updateCountdown=()=>{const e=new Date;let t=new Date;t.setHours(CONFIG.MISSION_RESET_HOUR_LOCAL,0,0,0),e>t&&t.setDate(t.getDate()+1);const n=t-e,o=String(Math.floor(n/36e5)).padStart(2,"0"),a=String(Math.floor(n%36e5/6e4)).padStart(2,"0"),s=String(Math.floor(n%6e4/1e3)).padStart(2,"0");DOM.missionCountdownElem&&(DOM.missionCountdownElem.textContent=`Reset dalam: ${o}:${a}:${s}`)};updateCountdown(),setInterval(updateCountdown,1e3);
        setInterval(()=>{const e="flex"===DOM.battleOverlay.style.display,t=DOM.missionMapContainer.querySelectorAll(".monster-dot").length>0;if(!e&&!t){const e=Date.now();1*60*1e3<e-(state.userData.lastMonsterSpawn||0)&&(addMessageToChat("bot","🚨 Sinyal monster baru terdeteksi di peta!"),spawnMonsters(),state.userData.lastMonsterSpawn=e,saveUserData())}},6e4);
        setTimeout(() => { if (!DOM.chatWindow.classList.contains('visible') && DOM.usernamePopup.style.display !== 'flex') { DOM.toast.classList.add('visible'); } }, 1000);
    };

    initialize();
});