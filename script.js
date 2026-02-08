const card = document.getElementById('card');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const question = document.getElementById('question');
const eventBox = document.getElementById('eventBox');
const eventGif = document.getElementById('eventGif');
const eventText = document.getElementById('eventText');
const minigameBox = document.getElementById('minigameBox');
const minigameTitle = document.getElementById('minigameTitle');
const minigameContent = document.getElementById('minigameContent');
const successScreen = document.getElementById('successScreen');
const successTitle = document.getElementById('successTitle');
const successMessage = document.getElementById('successMessage');
const confettiContainer = document.getElementById('confettiContainer');
const heartsContainer = document.getElementById('heartsContainer');
const buttonsContainer = document.getElementById('buttonsContainer');
const mainWrapper = document.getElementById('mainWrapper');
const gameOverlay = document.getElementById('gameOverlay');
const gameContainer = document.getElementById('gameContainer');

let noCount = 0;
let isMinigameActive = false;
let playedGames = new Set();

function updateCounter() {
    const total = chaosEvents.length;
    const played = playedGames.size;
    const counter = document.getElementById('minigameCounter');
    if (counter) counter.textContent = `Minijuegos: ${played}/${total}`;
}

// Textos del botón No
const noTexts = ["No", "Que no", "NO", "Nope", "Paso", "Nunca", "Jamás", "Ni loca", "Ew", "Puaj", "Antes muerta", "Sigue soñando", "Jaja no", "Imposible", "Never", "Nanai"];

// GIFs mejores
const gifs = [
    "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
    "https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif",
    "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    "https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif",
    "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif"
];

// Frases graciosas
const phrases = [
    "Tu wifi irá a 1kb/s durante una semana.",
    "YouTube te pondrá 2 anuncios de 30 segundos sin saltarlos.",
    "Tu cargador solo funcionará en un ángulo de 47 grados exactos.",
    "Tu kebab se caerá por el lado de la salsa.",
    "Tu próximo reel durará 47 minutos sin querer.",
    "Spotify te va a poner 8 anuncios seguidos.",
    "Alguien te acaba de spoilear el final de tu serie.",
    "Pisarás un LEGO descalza a las 3am.",
    "Tu pizza llegará fría y el repartidor se habrá comido una porción.",
    "Tu vecino va a poner reggaeton a las 4am un martes.",
    "Hacienda te está mirando fijamente ahora mismo.",
    "Tu madre ha visto tu historial de navegación.",
    "Tu tostada siempre caerá por el lado de la mantequilla.",
    "Siempre te saldrá el anuncio de 'MAHOU 5 ESTRELLAS'.",
    "Tu móvil se quedará al 1% justo cuando llegue tu Glovo.",
    "El bus se irá justo cuando llegues corriendo a la parada.",
    "Tu jefe te acaba de mandar un 'tenemos que hablar'.",
    "Tus cascos se quedarán sin batería en el gym.",
    "Un gatito ha dejado de ronronear por tu culpa.",
    "El ascensor siempre estará en el piso 7.",
    "Tu WiFi se caerá justo en la mejor parte de la peli.",
    "Siempre te tocará el asiento del medio en el avión.",
    "Tu café siempre estará o hirviendo o frío.",
    "Tu paraguas se romperá justo cuando empiece a llover.",
    "Habrá una mosca que solo tú puedas oír.",
    "Tu alarma sonará en fin de semana sin motivo."
];

// Animaciones del botón
const btnAnims = ['shake', 'spin', 'bounce', 'jello', 'wobble'];

// ============ EFECTOS DEL BOTÓN ============

// ============ NUEVOS EFECTOS DE BOTÓN ============

function buttonWheelchair() {
    isMinigameActive = true;
    btnNo.classList.add('wheelchair');
    showMsg("¡ADIÓS!");

    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    let x = window.innerWidth / 2 - btnWidth / 2;
    let y = window.innerHeight / 2 - btnHeight / 2;
    // Límites seguros (pantalla - botón - margen)
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;

    let vx = (Math.random() - 0.5) * 15;
    let vy = (Math.random() - 0.5) * 15;

    function move() {
        if (!isMinigameActive) return;

        x += vx;
        y += vy;

        if (x < 20 || x > maxX) vx *= -1;
        if (y < 20 || y > maxY) vy *= -1;

        // Clamp para asegurar
        x = Math.max(20, Math.min(x, maxX));
        y = Math.max(20, Math.min(y, maxY));

        btnNo.style.left = x + 'px';
        btnNo.style.top = y + 'px';

        requestAnimationFrame(move);
    }
    move();

    setTimeout(() => {
        isMinigameActive = false;
        btnNo.classList.remove('wheelchair');
        btnNo.style.left = '';
        btnNo.style.top = ''; // Reset position importance
    }, 5000);
}

function lanaVinylGame() {
    isMinigameActive = true;
    document.body.classList.add('sadness');
    showMsg("Born to Die... Atrapa 5 Vinilos");
    btnNo.style.display = 'none';

    // Crear contador visual
    let lanaCounter = document.getElementById('lanaCounter');
    if (!lanaCounter) {
        lanaCounter = document.createElement('div');
        lanaCounter.id = 'lanaCounter';
        document.body.appendChild(lanaCounter);
    }
    lanaCounter.textContent = "Vinyls: 0/5";
    lanaCounter.style.display = 'block';

    // Crear contenedor de lluvia/vinilos
    let rain = document.getElementById('rainContainer');
    if (!rain) {
        rain = document.createElement('div');
        rain.className = 'rain-container';
        document.body.appendChild(rain);
    }
    rain.innerHTML = ''; // Limpiar por si acaso

    let collected = 0;
    const needed = 5;

    // Intervalo de spawn
    const interval = setInterval(() => {
        if (!isMinigameActive) {
            clearInterval(interval);
            return;
        }

        const vinyl = document.createElement('div');
        vinyl.className = 'vinyl-record';
        vinyl.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        vinyl.style.top = '-70px';
        vinyl.style.animationDuration = `2s, ${3 + Math.random() * 2}s`; // Spin, Fall

        // Interacción: Click para recoger
        vinyl.onmousedown = vinyl.ontouchstart = (e) => {
            e.stopPropagation();
            if (vinyl.collected) return;
            vinyl.collected = true;

            collected++;
            lanaCounter.textContent = `Vinyls: ${collected}/${needed}`;

            // Efecto visual al recoger
            vinyl.style.transform = 'scale(1.5)';
            vinyl.style.opacity = '0';
            setTimeout(() => vinyl.remove(), 200);

            if (collected >= needed) {
                clearInterval(interval);
                setTimeout(winLanaGame, 500);
            }
        };

        rain.appendChild(vinyl);

        // Limpieza automática si cae fuera
        setTimeout(() => { if (vinyl.parentNode) vinyl.remove(); }, 6000);

    }, 800);

    window.cleanLanaGame = () => {
        clearInterval(interval);
        if (rain) rain.innerHTML = '';
        if (lanaCounter) lanaCounter.style.display = 'none';
        document.body.classList.remove('sadness');
    };

    function winLanaGame() {
        if (!isMinigameActive) return;
        endMinigame(); // Esto limpia clases y flags
        noCount++;
        showEvent(); // Muestra el gif y frase
    }
}

function buttonBalloon() {
    isMinigameActive = true;
    btnNo.classList.add('balloon');
    showMsg("¡Hasta luego!");

    setTimeout(() => {
        btnNo.classList.remove('balloon');
        isMinigameActive = false;
    }, 5000);
}

function buttonDisguise() {
    isMinigameActive = true;
    btnNo.classList.add('disguise');
    showMsg("¿Quién soy?");

    setTimeout(() => {
        btnNo.classList.remove('disguise');
        isMinigameActive = false;
    }, 3000);
}

function buttonRunsAway() {
    isMinigameActive = true;
    btnNo.classList.add('has-legs', 'running', 'scared');

    // Añadir cuchillo cutre
    let knife = btnNo.querySelector('.knife');
    if (!knife) {
        knife = document.createElement('span');
        knife.className = 'knife';
        knife.textContent = '🔪';
        btnNo.appendChild(knife);
    }

    // Añadir sudor
    let sweat = btnNo.querySelector('.sweat');
    if (!sweat) {
        sweat = document.createElement('span');
        sweat.className = 'sweat';
        sweat.textContent = '💦';
        btnNo.appendChild(sweat);
    }

    showMsg("¡EL BOTÓN ESCAPA!");

    // Posición inicial segura
    const maxX = window.innerWidth - btnNo.offsetWidth - 50;
    const maxY = window.innerHeight - btnNo.offsetHeight - 50;

    btnNo.style.left = Math.max(50, Math.random() * maxX) + 'px';
    btnNo.style.top = Math.max(50, Math.random() * maxY) + 'px';

    function runAway(e) {
        if (!isMinigameActive) return;
        const rect = btnNo.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - bx, e.clientY - by);

        if (dist < 200) {
            const angle = Math.atan2(e.clientY - by, e.clientX - bx);
            let nx = bx - Math.cos(angle) * 150;
            let ny = by - Math.sin(angle) * 150;

            // Mantener dentro de bordes con margen
            nx = Math.max(20, Math.min(window.innerWidth - rect.width - 20, nx));
            ny = Math.max(20, Math.min(window.innerHeight - rect.height - 20, ny));

            btnNo.style.left = nx + 'px';
            btnNo.style.top = ny + 'px';
        }
    }

    document.addEventListener('mousemove', runAway);

    setTimeout(() => {
        document.removeEventListener('mousemove', runAway);
        btnNo.classList.remove('has-legs', 'running', 'scared');
        btnNo.style.left = '';
        btnNo.style.top = '';
        if (knife) knife.remove();
        if (sweat) sweat.remove();
        isMinigameActive = false;
    }, 6000);
}

function buttonMelts() {
    btnNo.classList.add('melting');
    showMsg("¡SE DERRITE!");
    setTimeout(() => {
        btnNo.classList.remove('melting');
    }, 2500);
}

function buttonGoesInvisible() {
    btnNo.classList.add('invisible');
    showMsg("¿DÓNDE ESTÁ?");
    setTimeout(() => btnNo.classList.remove('invisible'), 4000);
}

function buttonSpinsForever() {
    btnNo.classList.add('crazy-spin');
    showMsg("¡GIRA GIRA!");
    setTimeout(() => btnNo.classList.remove('crazy-spin'), 3000);
}

function buttonTeleports() {
    isMinigameActive = true;
    showMsg("¡TELETRANSPORTE!");
    btnNo.classList.add('running');

    function teleport() {
        btnNo.classList.add('portal');
        setTimeout(() => {
            const maxX = window.innerWidth - 150;
            const maxY = window.innerHeight - 100;
            btnNo.style.left = Math.max(50, Math.random() * maxX) + 'px';
            btnNo.style.top = Math.max(50, Math.random() * maxY) + 'px';
            setTimeout(() => btnNo.classList.remove('portal'), 500);
        }, 250);
    }

    teleport();
    const interval = setInterval(teleport, 2000);

    // Se queda hasta que le den click
    const handler = () => {
        clearInterval(interval);
        btnNo.classList.remove('running', 'portal');
        btnNo.style.left = '';
        btnNo.style.top = '';
        btnNo.removeEventListener('click', handler);
        isMinigameActive = false;
    };
    btnNo.addEventListener('click', handler);
}

// ============ REACCIONES GRACIOSAS DEL BOTÓN ============

function buttonShiver() {
    isMinigameActive = true;
    showMsg("¡QUÉ FRÍO!");
    btnNo.classList.add('shiver');

    // Tiembla durante 3 segundos
    setTimeout(() => {
        btnNo.classList.remove('shiver');
        isMinigameActive = false;
    }, 3000);
}

function buttonSleep() {
    isMinigameActive = true;
    showMsg("Zzz...");
    btnNo.classList.add('sleep');

    const zzz = document.createElement('div');
    zzz.className = 'sleep-zzz';
    zzz.textContent = 'Zzz...';
    btnNo.appendChild(zzz);

    // Se despierta al hacer click (aunque no debería poderse) o solo
    setTimeout(() => {
        btnNo.classList.remove('sleep');
        if (zzz) zzz.remove();
        showMsg("¡YA ME DESPERTÉ!");
        isMinigameActive = false;
    }, 4000);
}

function buttonGhost() {
    isMinigameActive = true;
    showMsg("Me mataste del aburrimiento...");
    btnNo.classList.add('ghost');

    setTimeout(() => {
        btnNo.classList.remove('ghost');
        createConfetti(); // Broma
        showMsg("¡BUUU!");
        isMinigameActive = false;
    }, 4000);
}

function buttonBoxer() {
    isMinigameActive = true;
    showMsg("¡VEN AQUÍ SI TE ATREVES!");
    btnNo.classList.add('boxer');

    setTimeout(() => {
        btnNo.classList.remove('boxer');
        showMsg("Has tenido suerte...");
        isMinigameActive = false;
    }, 4000);
}

function buttonVomit() {
    isMinigameActive = true;
    showMsg("Me da algo...");
    btnNo.style.filter = 'hue-rotate(90deg)'; // Verde

    const vomit = document.createElement('div');
    vomit.textContent = '🤮';
    vomit.style.position = 'absolute';
    vomit.style.bottom = '-30px';
    vomit.style.left = '50%';
    vomit.style.fontSize = '30px';
    btnNo.appendChild(vomit);

    setTimeout(() => {
        btnNo.style.filter = '';
        if (vomit) vomit.remove();
        isMinigameActive = false;
    }, 3000);
}

// --- 5 NUEVOS ---

function buttonSumo() {
    isMinigameActive = true;
    showMsg("¡DÉJAME!");
    btnNo.classList.add('sumo');

    // Efecto de pisada fuerte
    function stomp() {
        if (!isMinigameActive) return;
        document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        setTimeout(() => document.body.style.transform = '', 100);
    }

    const interval = setInterval(stomp, 600);

    setTimeout(() => {
        clearInterval(interval);
        btnNo.classList.remove('sumo');
        isMinigameActive = false;
        showMsg("Me cansé.");
    }, 4500);
}

/* Cowboy Removed */

function buttonGamer() {
    isMinigameActive = true;
    showMsg("Rankeds: ON. Skill: OFF.");
    btnNo.classList.add('gamer');

    // Ignora clicks (visualmente hace rage)
    const originalText = btnNo.textContent;
    btnNo.textContent = "AFK";

    const clickHandler = (e) => {
        e.stopPropagation(); // Evita que cuente como click normal
        const rages = ["¡LAG!", "¡HACKER!", "¡NO REG!", "¡PING!", "WTF!"];
        showMsg(rages[Math.floor(Math.random() * rages.length)]);
        btnNo.style.transform = 'rotate(' + (Math.random() * 20 - 10) + 'deg)';

        // Hitmarker
        const marker = document.createElement('div');
        marker.className = 'hitmarker';
        marker.style.left = e.clientX + 'px';
        marker.style.top = e.clientY + 'px';
        document.body.appendChild(marker);
        setTimeout(() => marker.remove(), 500);

        // Damage text
        const dmg = document.createElement('div');
        dmg.className = 'damage-text';
        dmg.textContent = Math.floor(Math.random() * 99);
        dmg.style.left = e.clientX + 'px';
        dmg.style.top = (e.clientY - 20) + 'px';
        document.body.appendChild(dmg);
        setTimeout(() => dmg.remove(), 1000);
    };

    btnNo.addEventListener('click', clickHandler);

    setTimeout(() => {
        btnNo.removeEventListener('click', clickHandler);
        btnNo.classList.remove('gamer');
        btnNo.textContent = originalText;
        btnNo.style.transform = '';
        isMinigameActive = false;
        showMsg("GG EZ NO RE");
    }, 5000);
}

function buttonVampire() {
    isMinigameActive = true;
    showMsg("¡AAHH! ¡EL SOL!");
    btnNo.classList.add('vampire');
    document.body.classList.add('sun-cursor');

    // Huye del ratón (invertido)
    function runFromSun(e) {
        const rect = btnNo.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - bx, e.clientY - by);

        if (dist < 400) { // Radio grande
            const angle = Math.atan2(e.clientY - by, e.clientX - bx);
            // Moverse en dirección OPUESTA al ratón
            let nx = bx - Math.cos(angle) * 60;
            let ny = by - Math.sin(angle) * 60;

            // Límites pantalla estrictos
            const maxX = window.innerWidth - rect.width - 20;
            const maxY = window.innerHeight - rect.height - 20;

            btnNo.style.left = Math.max(20, Math.min(maxX, nx)) + 'px';
            btnNo.style.top = Math.max(20, Math.min(maxY, ny)) + 'px';
        }
    }

    document.addEventListener('mousemove', runFromSun);

    setTimeout(() => {
        document.removeEventListener('mousemove', runFromSun);

        // Transición a noche
        document.body.classList.remove('sun-cursor');
        document.body.classList.add('night-mode');
        const moon = document.createElement('div');
        moon.textContent = '🌙';
        moon.className = 'moon';
        document.body.appendChild(moon);

        btnNo.classList.remove('vampire');
        btnNo.style.left = '';
        btnNo.style.top = '';

        showMsg("Por fin... de noche.");

        setTimeout(() => {
            document.body.classList.remove('night-mode');
            if (moon) moon.remove();
            isMinigameActive = false;
        }, 3000); // 3 seg extra de noche
    }, 5000);
}

function buttonAstronaut() {
    isMinigameActive = true;
    showMsg("Necesito mi espacio...");
    btnNo.classList.add('astronaut');

    // Asteroide ambientación
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    asteroid.textContent = '🪨';
    asteroid.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(asteroid);

    // Gravedad cero física
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    let x = window.innerWidth / 2 - btnWidth / 2;
    let y = window.innerHeight / 2 - btnHeight / 2;
    // Velocidad muy lenta y constante
    let vx = (Math.random() - 0.5) * 4;
    let vy = (Math.random() - 0.5) * 4;

    function float() {
        if (!isMinigameActive) return;
        x += vx;
        y += vy;

        // Rebote suave infinito con límites correctos
        if (x < 20 || x > window.innerWidth - btnWidth - 20) vx *= -1;
        if (y < 20 || y > window.innerHeight - btnHeight - 20) vy *= -1;

        btnNo.style.left = x + 'px';
        btnNo.style.top = y + 'px';
        requestAnimationFrame(float);
    }
    float();

    setTimeout(() => {
        btnNo.classList.remove('astronaut');
        btnNo.style.left = '';
        btnNo.style.top = '';
        if (asteroid) asteroid.remove();
        isMinigameActive = false;
        showMsg("Houston, ya he vuelto.");
    }, 8000);
}

// ============ MINIJUEGOS ============

function mathChallenge() {
    isMinigameActive = true;
    // MUY FÁCIL
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const answer = a + b;

    minigameTitle.textContent = `¿Cuánto es ${a} + ${b}?`;
    minigameContent.innerHTML = `
        <button onclick="checkMath(${answer}, ${answer})" style="margin:5px;padding:15px;font-size:1.2rem">${answer}</button>
        <button onclick="checkMath(${answer + 1}, ${answer})" style="margin:5px;padding:15px;font-size:1.2rem">${answer + 1}</button>
        <button onclick="checkMath(${answer - 1}, ${answer})" style="margin:5px;padding:15px;font-size:1.2rem">${answer - 1}</button>
    `;
    minigameBox.classList.add('show');
    eventBox.classList.remove('show');
    btnNo.style.display = 'none';
}

window.checkMath = function (val, answer) {
    if (val === answer) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        showMsg("¡CASI!");
    }
};

function captchaGame() {
    isMinigameActive = true;
    const targets = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'];
    const target = targets[Math.floor(Math.random() * targets.length)];
    const grid = [];
    const targetPos = Math.floor(Math.random() * 9);

    for (let i = 0; i < 9; i++) {
        if (i === targetPos) {
            grid.push(target);
        } else {
            let r;
            do { r = targets[Math.floor(Math.random() * targets.length)]; } while (r === target);
            grid.push(r);
        }
    }

    minigameTitle.textContent = `Encuentra el ${target} para decir NO`;
    minigameContent.innerHTML = `<div class="captcha-grid">${grid.map((e, i) =>
        `<div class="captcha-cell" onclick="checkCaptcha(${i}, ${targetPos})">${e}</div>`
    ).join('')}</div>`;
    minigameBox.classList.add('show');
    eventBox.classList.remove('show');
    btnNo.style.display = 'none';
}

window.checkCaptcha = function (clicked, correct) {
    if (clicked === correct) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        showMsg("MAL, ESE NO ES");
    }
};

function typingChallenge() {
    isMinigameActive = true;
    const words = ["por favor", "lo siento", "perdon", "soy tonta y pierdo siempre en el rummie", "piensalo", "venga va", "anda porfa"];
    const word = words[Math.floor(Math.random() * words.length)];

    minigameTitle.textContent = `Escribe "${word}" para decir NO`;
    minigameContent.innerHTML = `
        <input type="text" id="typeInput" placeholder="Escribe aquí...">
        <button onclick="checkTyping('${word}')">Enviar</button>
    `;
    minigameBox.classList.add('show');
    eventBox.classList.remove('show');
    btnNo.style.display = 'none';
}

window.checkTyping = function (word) {
    const input = document.getElementById('typeInput');
    if (input.value.toLowerCase().trim() === word) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        input.value = '';
        input.placeholder = 'Mal escrito...';
    }
};

function reverseTyping() {
    isMinigameActive = true;
    const words = ["amor", "corazon", "beso", "carino"];
    const word = words[Math.floor(Math.random() * words.length)];
    const reversed = word.split('').reverse().join('');

    minigameTitle.textContent = `Escribe "${word}" AL REVÉS`;
    minigameContent.innerHTML = `
        <input type="text" id="revInput" placeholder="Al revés...">
        <button onclick="checkReverse('${reversed}')">Enviar</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkReverse = function (rev) {
    const input = document.getElementById('revInput');
    if (input.value.toLowerCase().trim() === rev) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        input.value = '';
        input.placeholder = 'Incorrecto...';
    }
};

function countdownChallenge() {
    isMinigameActive = true;
    let count = 5;

    minigameTitle.textContent = "Pulsa el botón cuando llegue a 0";
    minigameContent.innerHTML = `
        <div style="font-size:3rem;font-weight:bold" id="countdown">${count}</div>
        <button onclick="checkCountdown()">¡AHORA!</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const interval = setInterval(() => {
        count--;
        const el = document.getElementById('countdown');
        if (el) el.textContent = count;
        if (count < -3) {
            clearInterval(interval);
            endMinigame();
        }
    }, 1000);

    window.countdownVal = () => count;
    window.countdownInterval = interval;
}

window.checkCountdown = function () {
    const val = window.countdownVal();
    clearInterval(window.countdownInterval);
    if (val === 0) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = val > 0 ? "MUY PRONTO - Reiniciando..." : "MUY TARDE - Reiniciando...";
        setTimeout(() => countdownChallenge(), 1500);
    }
};

function simonSays() {
    isMinigameActive = true;
    const colors = ['🔴', '🔵', '🟢', '🟡'];
    const sequence = [colors[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)]];
    let playerSeq = [];

    minigameTitle.textContent = `Memoriza: ${sequence.join(' ')}`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    setTimeout(() => {
        minigameTitle.textContent = "Ahora repítelo";
        minigameContent.innerHTML = colors.map(c =>
            `<button style="font-size:2rem;margin:5px" onclick="simonClick('${c}')">${c}</button>`
        ).join('');
    }, 2000);

    window.simonSeq = sequence;
    window.simonPlayer = playerSeq;
}

window.simonClick = function (color) {
    window.simonPlayer.push(color);
    if (window.simonPlayer.length === window.simonSeq.length) {
        if (window.simonPlayer.join('') === window.simonSeq.join('')) {
            endMinigame();
            noCount++;
            showEvent();
        } else {
            minigameTitle.textContent = "MAL, no era eso";
            setTimeout(() => endMinigame(), 1500);
        }
    }
};

function holdButton() {
    isMinigameActive = true;
    let holding = false;
    let startTime = 0;

    minigameTitle.textContent = "Mantén pulsado EXACTAMENTE 3 segundos";
    minigameContent.innerHTML = `
        <button id="holdBtn" style="padding:20px 40px;font-size:1.2rem">MANTÉN PULSADO</button>
        <div id="holdTimer" style="margin-top:10px">0.0s</div>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const btn = document.getElementById('holdBtn');
    const timer = document.getElementById('holdTimer');
    let interval;

    btn.onmousedown = btn.ontouchstart = () => {
        holding = true;
        startTime = Date.now();
        interval = setInterval(() => {
            timer.textContent = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
        }, 100);
    };

    btn.onmouseup = btn.ontouchend = () => {
        if (!holding) return;
        holding = false;
        clearInterval(interval);
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= 2.8 && elapsed <= 3.2) {
            endMinigame();
            noCount++;
            showEvent();
        } else {
            minigameTitle.textContent = elapsed < 2.8 ? "MUY CORTO" : "MUY LARGO";
            setTimeout(() => endMinigame(), 1500);
        }
    };
}

function clickRace() {
    isMinigameActive = true;
    let clicks = 0;
    const target = 15;

    minigameTitle.textContent = `Haz ${target} clicks en 5 segundos`;
    minigameContent.innerHTML = `
        <button id="clickBtn" style="padding:30px 50px;font-size:1.5rem">CLICK (0/${target})</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const btn = document.getElementById('clickBtn');
    btn.onclick = () => {
        clicks++;
        btn.textContent = `CLICK (${clicks}/${target})`;
        if (clicks >= target) {
            endMinigame();
            noCount++;
            showEvent();
        }
    };

    setTimeout(() => {
        if (clicks < target && isMinigameActive) {
            minigameTitle.textContent = "TIEMPO AGOTADO";
            setTimeout(() => endMinigame(), 1500);
        }
    }, 5000);
}

// Riddle muy fácil en español
function riddleChallenge() {
    isMinigameActive = true;
    const riddles = [
        { q: "¿De qué color es el caballo blanco de Santiago?", a: "blanco" },
        { q: "¿Cuánto es 2 + 2?", a: "4" },
        { q: "Si digo 'SÍ', tú dices...", a: "no" }
    ];
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];

    minigameTitle.textContent = riddle.q;
    minigameContent.innerHTML = `
        <input type="text" id="riddleInput" placeholder="Respuesta...">
        <button onclick="checkRiddle('${riddle.a}')">Enviar</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkRiddle = function (answer) {
    const input = document.getElementById('riddleInput');
    if (input.value.toLowerCase().trim().includes(answer)) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        input.value = '';
        input.placeholder = '¡Inténtalo de nuevo!';
    }
};

function escapeRoom() {
    isMinigameActive = true;
    // Código fijo y MUY fácil
    const code = 1234;

    minigameTitle.textContent = "El código es 1234. Escríbelo.";
    minigameContent.innerHTML = `
        <input type="text" id="codeInput" placeholder="Código" maxlength="4">
        <button onclick="checkCode(${code})">Desbloquear</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkCode = function (code) {
    const input = document.getElementById('codeInput');
    if (parseInt(input.value) === code) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        input.value = '';
        input.placeholder = 'Es 1234...';
    }
};

// NUEVOS MINIJUEGOS

function reactionTest() {
    isMinigameActive = true;
    minigameTitle.textContent = "Espera a que se ponga VERDE y pulsa rápido";
    minigameContent.innerHTML = `<div id="reactionBox" style="width:150px;height:150px;background:red;border-radius:12px;margin:auto;cursor:pointer"></div><p id="reactionResult"></p>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const box = document.getElementById('reactionBox');
    const delay = 2000 + Math.random() * 3000;
    let greenTime = 0;
    let clicked = false;

    setTimeout(() => {
        if (!clicked) {
            box.style.background = 'green';
            greenTime = Date.now();
        }
    }, delay);

    box.onclick = () => {
        clicked = true;
        if (greenTime === 0) {
            document.getElementById('reactionResult').textContent = 'MUY PRONTO, tramposa';
            setTimeout(() => endMinigame(), 1500);
        } else {
            const time = Date.now() - greenTime;
            if (time < 500) {
                endMinigame();
                noCount++;
                showEvent();
            } else {
                document.getElementById('reactionResult').textContent = `${time}ms - MUY LENTA`;
                setTimeout(() => endMinigame(), 1500);
            }
        }
    };
}

function findDifferent() {
    isMinigameActive = true;
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅'];
    const base = emojis[Math.floor(Math.random() * emojis.length)];
    let diff;
    do { diff = emojis[Math.floor(Math.random() * emojis.length)]; } while (diff === base);

    const pos = Math.floor(Math.random() * 9);
    const grid = Array(9).fill(base);
    grid[pos] = diff;

    minigameTitle.textContent = "Encuentra el emoji diferente";
    minigameContent.innerHTML = `<div class="captcha-grid">${grid.map((e, i) =>
        `<div class="captcha-cell" onclick="checkDiff(${i}, ${pos})">${e}</div>`
    ).join('')}</div>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkDiff = function (clicked, correct) {
    if (clicked === correct) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        showMsg("ESE NO ES");
    }
};

function completeSequence() {
    isMinigameActive = true;
    const sequences = [
        { seq: "2, 4, 6, 8, ?", ans: "10" },
        { seq: "1, 3, 5, 7, ?", ans: "9" },
        { seq: "10, 20, 30, ?", ans: "40" },
        { seq: "5, 10, 15, ?", ans: "20" }
    ];
    const s = sequences[Math.floor(Math.random() * sequences.length)];

    minigameTitle.textContent = `Completa: ${s.seq}`;
    minigameContent.innerHTML = `
        <input type="text" id="seqInput" placeholder="?">
        <button onclick="checkSeq('${s.ans}')">Enviar</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkSeq = function (ans) {
    if (document.getElementById('seqInput').value.trim() === ans) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        document.getElementById('seqInput').value = '';
        document.getElementById('seqInput').placeholder = 'Incorrecto';
    }
};

function emojiMath() {
    isMinigameActive = true;
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;

    minigameTitle.textContent = `${'🍕'.repeat(a)} + ${'🍕'.repeat(b)} = ?`;
    minigameContent.innerHTML = `
        <input type="text" id="emojiInput" placeholder="Cuántas pizzas?">
        <button onclick="checkEmoji(${a + b})">Enviar</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkEmoji = function (ans) {
    if (parseInt(document.getElementById('emojiInput').value) === ans) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        document.getElementById('emojiInput').value = '';
        document.getElementById('emojiInput').placeholder = 'Mal contadas';
    }
};

function trueOrFalse() {
    isMinigameActive = true;
    const questions = [
        { q: "El sol es una estrella", a: true },
        { q: "Los delfines son peces", a: false },
        { q: "España tiene rey", a: true },
        { q: "El agua hierve a 50 grados", a: false },
        { q: "Paris es la capital de Francia", a: true }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];

    minigameTitle.textContent = q.q;
    minigameContent.innerHTML = `
        <button onclick="checkTF(true, ${q.a})" style="margin:5px;padding:15px 30px">VERDADERO</button>
        <button onclick="checkTF(false, ${q.a})" style="margin:5px;padding:15px 30px">FALSO</button>
    `;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkTF = function (clicked, correct) {
    if (clicked === correct) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = "INCORRECTO";
        setTimeout(() => endMinigame(), 1500);
    }
};

function catchButton() {
    isMinigameActive = true;
    showMsg("ATRAPA EL BOTÓN");
    minigameBox.classList.remove('show');

    const target = document.createElement('button');
    target.textContent = 'ATRÁPAME';
    target.style.cssText = 'position:fixed;padding:15px 30px;background:#ff6b6b;color:white;border:none;border-radius:8px;cursor:pointer;z-index:9999;font-weight:bold';
    document.body.appendChild(target);

    let catches = 0;
    const needed = 3;

    function move() {
        target.style.left = Math.random() * (window.innerWidth - 120) + 'px';
        target.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    }
    move();

    const interval = setInterval(move, 800);

    target.onclick = () => {
        catches++;
        target.textContent = `${catches}/${needed}`;
        if (catches >= needed) {
            clearInterval(interval);
            target.remove();
            noCount++;
            showEvent();
            isMinigameActive = false;
        }
    };

    setTimeout(() => {
        if (catches < needed) {
            clearInterval(interval);
            target.remove();
            showMsg("MUY LENTA");
            isMinigameActive = false;
        }
    }, 8000);
}

function colorMatch() {
    isMinigameActive = true;
    const colors = [{ name: 'ROJO', hex: '#ff0000' }, { name: 'AZUL', hex: '#0000ff' }, { name: 'VERDE', hex: '#00ff00' }, { name: 'AMARILLO', hex: '#ffff00' }];
    const word = colors[Math.floor(Math.random() * colors.length)];
    const display = colors[Math.floor(Math.random() * colors.length)];

    minigameTitle.innerHTML = `¿De qué COLOR está escrita la palabra?<br><span style="color:${display.hex};font-size:2rem">${word.name}</span>`;
    minigameContent.innerHTML = colors.map(c =>
        `<button onclick="checkColor('${display.name}','${c.name}')" style="margin:5px;padding:10px 20px">${c.name}</button>`
    ).join('');
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkColor = function (correct, clicked) {
    if (correct === clicked) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = "INCORRECTO - Reiniciando...";
        setTimeout(() => colorMatch(), 1500);
    }
};

// ============ SNAKE GAME ============

function snakeGame() {
    isMinigameActive = true;
    minigameTitle.textContent = "SNAKE: Consigue 3 puntos para decir NO";
    minigameContent.innerHTML = `<canvas id="snakeCanvas" width="200" height="200" style="border:2px solid white;border-radius:8px;background:#222"></canvas><p id="snakeScore">Puntos: 0</p><p style="font-size:0.8rem">Usa las flechas del teclado</p>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const size = 10;
    let snake = [{ x: 100, y: 100 }];
    let food = { x: 50, y: 50 };
    let dx = size, dy = 0;
    let score = 0;

    function draw() {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, 200, 200);
        ctx.fillStyle = '#0f0';
        snake.forEach(s => ctx.fillRect(s.x, s.y, size - 1, size - 1));
        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x, food.y, size - 1, size - 1);
    }

    function move() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        if (head.x < 0 || head.x >= 200 || head.y < 0 || head.y >= 200 || snake.some(s => s.x === head.x && s.y === head.y)) {
            score = 0;
            snake = [{ x: 100, y: 100 }];
            dx = size; dy = 0;
            document.getElementById('snakeScore').textContent = 'CHOCASTE - Puntos: 0';
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById('snakeScore').textContent = `Puntos: ${score}`;
            food = { x: Math.floor(Math.random() * 20) * size, y: Math.floor(Math.random() * 20) * size };
            if (score >= 3) {
                clearInterval(gameLoop);
                document.removeEventListener('keydown', handleKey);
                endMinigame();
                noCount++;
                showEvent();
            }
        } else {
            snake.pop();
        }
        draw();
    }

    function handleKey(e) {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -size; }
        else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = size; }
        else if (e.key === 'ArrowLeft' && dx === 0) { dx = -size; dy = 0; }
        else if (e.key === 'ArrowRight' && dx === 0) { dx = size; dy = 0; }
    }

    document.addEventListener('keydown', handleKey);
    draw();
    const gameLoop = setInterval(move, 150);
    window.snakeCleanup = () => { clearInterval(gameLoop); document.removeEventListener('keydown', handleKey); };
}

// ============ MÁS MINIJUEGOS ============

function memoryPairs() {
    isMinigameActive = true;
    const emojis = ['🍎', '🍊', '🍋', '🍇'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = 0;

    minigameTitle.textContent = "MEMORY: Encuentra los 4 pares";
    minigameContent.innerHTML = `<div class="captcha-grid" style="grid-template-columns:repeat(4,1fr)">${cards.map((c, i) => `<div class="captcha-cell" id="mem${i}" onclick="flipCard(${i},'${c}')" style="font-size:0">❓</div>`).join('')}</div>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    window.memCards = cards;
    window.memFlipped = flipped;
    window.memMatched = 0;
}

window.flipCard = function (i, emoji) {
    const card = document.getElementById('mem' + i);
    if (card.dataset.matched || window.memFlipped.length >= 2) return;
    card.textContent = emoji;
    card.style.fontSize = '28px';
    window.memFlipped.push({ i, emoji, card });

    if (window.memFlipped.length === 2) {
        setTimeout(() => {
            const [a, b] = window.memFlipped;
            if (a.emoji === b.emoji) {
                a.card.dataset.matched = true;
                b.card.dataset.matched = true;
                window.memMatched++;
                if (window.memMatched >= 4) {
                    endMinigame();
                    noCount++;
                    showEvent();
                }
            } else {
                a.card.textContent = '❓';
                a.card.style.fontSize = '0';
                b.card.textContent = '❓';
                b.card.style.fontSize = '0';
            }
            window.memFlipped = [];
        }, 800);
    }
};

function typeFast() {
    isMinigameActive = true;
    const words = ["rapido", "veloz", "corre", "vuela", "ya"];
    const word = words[Math.floor(Math.random() * words.length)];
    let timeLeft = 5;

    minigameTitle.textContent = `Escribe "${word}" en 5 segundos`;
    minigameContent.innerHTML = `<input type="text" id="fastInput"><button onclick="checkFast('${word}')">OK</button><p id="fastTimer">${timeLeft}s</p>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    const interval = setInterval(() => {
        timeLeft--;
        const el = document.getElementById('fastTimer');
        if (el) el.textContent = timeLeft + 's';
        if (timeLeft <= 0) {
            clearInterval(interval);
            minigameTitle.textContent = "TIEMPO - Reiniciando...";
            setTimeout(() => typeFast(), 1500);
        }
    }, 1000);
    window.fastInterval = interval;
}

window.checkFast = function (word) {
    clearInterval(window.fastInterval);
    if (document.getElementById('fastInput').value.toLowerCase().trim() === word) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = "MAL - Reiniciando...";
        setTimeout(() => typeFast(), 1500);
    }
};

function buttonDodge() {
    isMinigameActive = true;
    showMsg("ESQUIVA LOS OBSTÁCULOS");
    minigameBox.classList.remove('show');

    btnNo.classList.add('running');
    btnNo.style.left = '50%';
    btnNo.style.top = '80%';
    btnNo.style.transform = 'translateX(-50%)';

    let survived = 0;
    const needed = 5;

    function spawnObstacle() {
        const obs = document.createElement('div');
        obs.style.cssText = `position:fixed;width:30px;height:30px;background:#ff0000;border-radius:50%;top:-30px;left:${Math.random() * 90}%;z-index:9998;transition:top 2s linear`;
        document.body.appendChild(obs);
        setTimeout(() => obs.style.top = '110%', 50);
        setTimeout(() => {
            obs.remove();
            survived++;
            if (survived >= needed && isMinigameActive) {
                btnNo.classList.remove('running');
                btnNo.style.left = '';
                btnNo.style.top = '';
                btnNo.style.transform = '';
                isMinigameActive = false;
            }
        }, 2100);
    }

    for (let i = 0; i < needed; i++) setTimeout(spawnObstacle, i * 400);

    document.onmousemove = (e) => {
        if (!isMinigameActive) return;
        btnNo.style.left = e.clientX + 'px';
    };
}

function randomButton() {
    isMinigameActive = true;
    const correct = Math.floor(Math.random() * 9);

    minigameTitle.textContent = "Uno de estos es el NO real";
    minigameContent.innerHTML = `<div class="captcha-grid">${Array(9).fill(0).map((_, i) => `<button onclick="checkRandom(${i},${correct})" style="padding:10px 15px">${i === correct ? 'No' : 'Sí'}</button>`).join('')}</div>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
}

window.checkRandom = function (clicked, correct) {
    if (clicked === correct) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        showMsg("Ese era Sí, jaja");
    }
};

function patternUnlock() {
    isMinigameActive = true;
    const pattern = [0, 1, 2, 5, 8];
    let userPattern = [];

    minigameTitle.textContent = "Dibuja una L (esquina arriba izq -> abajo der)";
    minigameContent.innerHTML = `<div class="captcha-grid">${Array(9).fill(0).map((_, i) => `<div class="captcha-cell" onclick="patternClick(${i})" id="pat${i}">·</div>`).join('')}</div><button onclick="checkPattern()">Comprobar</button>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    window.userPattern = userPattern;
    window.correctPattern = pattern;
}

window.patternClick = function (i) {
    if (!window.userPattern.includes(i)) {
        window.userPattern.push(i);
        document.getElementById('pat' + i).style.background = '#667eea';
        document.getElementById('pat' + i).textContent = window.userPattern.length;
    }
};

window.checkPattern = function () {
    if (JSON.stringify(window.userPattern) === JSON.stringify(window.correctPattern)) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = "PATRÓN INCORRECTO - Reiniciando...";
        setTimeout(() => patternUnlock(), 1500);
    }
};

function whackAMole() {
    isMinigameActive = true;
    let score = 0;
    const needed = 3;

    minigameTitle.textContent = `Golpea 3 topos (${score}/${needed})`;
    minigameContent.innerHTML = `<div class="captcha-grid">${Array(9).fill(0).map((_, i) => `<div class="captcha-cell" id="mole${i}" style="font-size:30px">🕳️</div>`).join('')}</div>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';

    function spawnMole() {
        if (!isMinigameActive) return;
        const pos = Math.floor(Math.random() * 9);
        const cell = document.getElementById('mole' + pos);
        if (!cell) return;
        cell.textContent = '🐹';
        cell.onclick = () => {
            if (cell.textContent === '🐹') {
                score++;
                cell.textContent = '💥';
                minigameTitle.textContent = `Golpea 3 topos (${score}/${needed})`;
                if (score >= needed) {
                    endMinigame();
                    noCount++;
                    showEvent();
                }
            }
        };
        setTimeout(() => { if (cell.textContent !== '💥') cell.textContent = '🕳️'; }, 1000);
    }

    const interval = setInterval(spawnMole, 800);
    setTimeout(() => {
        if (score < needed && isMinigameActive) {
            clearInterval(interval);
            minigameTitle.textContent = "MUY LENTA - Reiniciando...";
            setTimeout(() => whackAMole(), 1500);
        }
    }, 10000);
}

function copyEmoji() {
    isMinigameActive = true;
    const emojis = ['😀', '😎', '🤔', '😱', '🥳', '😴', '🤯', '🥶'];
    const sequence = Array(4).fill(0).map(() => emojis[Math.floor(Math.random() * emojis.length)]);

    minigameTitle.textContent = `Copia: ${sequence.join('')}`;
    minigameContent.innerHTML = `<div id="copySeq"></div><div style="margin-top:10px">${emojis.map(e => `<button onclick="addEmoji('${e}')" style="font-size:1.5rem;margin:2px">${e}</button>`).join('')}</div><button onclick="checkCopy('${sequence.join('')}')" style="margin-top:10px">Comprobar</button>`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
    window.copyStr = '';
}

window.addEmoji = function (e) {
    window.copyStr += e;
    document.getElementById('copySeq').textContent = window.copyStr;
};

window.checkCopy = function (correct) {
    if (window.copyStr === correct) {
        endMinigame();
        noCount++;
        showEvent();
    } else {
        minigameTitle.textContent = "INCORRECTO - Reiniciando...";
        setTimeout(() => copyEmoji(), 1500);
    }
};

function mathRace() {
    isMinigameActive = true;
    let solved = 0;
    const needed = 3;

    function newProblem() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        minigameTitle.textContent = `Resuelve 3 (${solved}/${needed}): ${a} + ${b} = ?`;
        minigameContent.innerHTML = `<input type="text" id="raceInput"><button onclick="checkRace(${a + b})">OK</button>`;
        minigameBox.classList.add('show');
        btnNo.style.display = 'none';
    }
    newProblem();
    window.mathRaceNew = newProblem;
    window.mathRaceSolved = () => solved;
    window.mathRaceAdd = () => { solved++; };
}

window.checkRace = function (ans) {
    if (parseInt(document.getElementById('raceInput').value) === ans) {
        window.mathRaceAdd();
        if (window.mathRaceSolved() >= 3) {
            endMinigame();
            noCount++;
            showEvent();
        } else {
            window.mathRaceNew();
        }
    } else {
        document.getElementById('raceInput').value = '';
        document.getElementById('raceInput').placeholder = 'Mal';
    }
};

function simonSaysHard() {
    isMinigameActive = true;
    const colors = ['🔴', '🔵', '🟢', '🟡'];
    const sequence = Array(5).fill(0).map(() => colors[Math.floor(Math.random() * 4)]);

    minigameTitle.textContent = `Memoriza: ${sequence.join(' ')}`;
    minigameBox.classList.add('show');
    btnNo.style.display = 'none';
    minigameContent.innerHTML = '';

    setTimeout(() => {
        minigameTitle.textContent = "Ahora repítelo (5 colores)";
        minigameContent.innerHTML = colors.map(c => `<button style="font-size:2rem;margin:5px" onclick="simonHardClick('${c}')">${c}</button>`).join('');
    }, 3000);

    window.simonHardSeq = sequence;
    window.simonHardPlayer = [];
}

window.simonHardClick = function (c) {
    window.simonHardPlayer.push(c);
    if (window.simonHardPlayer.length === 5) {
        if (window.simonHardPlayer.join('') === window.simonHardSeq.join('')) {
            endMinigame();
            noCount++;
            showEvent();
        } else {
            minigameTitle.textContent = "MAL - Reiniciando...";
            window.simonHardPlayer = [];
            setTimeout(() => simonSaysHard(), 1500);
        }
    }
};

// ============ FINALIZAR MINIJUEGO ============

function endMinigame() {
    minigameBox.classList.remove('show');
    btnNo.style.display = '';

    // Limpieza de estados
    isMinigameActive = false;
    document.body.classList.remove('sadness');
    btnNo.classList.remove('wheelchair', 'balloon', 'disguise', 'melting', 'running', 'scared', 'portal', 'shiver', 'sleep', 'ghost', 'boxer', 'sumo', 'gamer', 'vampire', 'astronaut');
    // Limpiar elementos extra si quedaron
    const extras = btnNo.querySelectorAll('.sleep-zzz, .knife, .sweat');
    extras.forEach(e => e.remove());
    btnNo.style.filter = '';
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.transform = '';

    if (window.snakeCleanup) window.snakeCleanup();
    if (window.cleanLanaGame) window.cleanLanaGame(); // Clean Lana
    updateCounter();
}

// ============ EFECTOS VISUALES ============

function invertPage() {
    document.body.classList.add('inverted');
    setTimeout(() => document.body.classList.remove('inverted'), 2000);
}

function rotatePage() {
    mainWrapper.classList.add('rotated');
    setTimeout(() => mainWrapper.classList.remove('rotated'), 3000);
}

function tiltPage() {
    mainWrapper.classList.add('tilted');
    setTimeout(() => mainWrapper.classList.remove('tilted'), 2000);
}

function blurPage() {
    document.body.classList.add('blur');
    setTimeout(() => document.body.classList.remove('blur'), 2000);
}

function huePage() {
    document.body.classList.add('hue');
    setTimeout(() => document.body.classList.remove('hue'), 2000);
}

function shakeCard() {
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
}

function addYesButtons() {
    const max = 6;
    if (buttonsContainer.querySelectorAll('.btn-yes').length < max) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-yes clone';
        btn.textContent = ['Sí', 'SÍ', 'Dale', 'Venga'][Math.floor(Math.random() * 4)];
        btn.onclick = showSuccess;
        buttonsContainer.insertBefore(btn, btnNo);
    }
}

function growYes() {
    const size = parseFloat(getComputedStyle(btnYes).fontSize);
    btnYes.style.fontSize = Math.min(size * 1.15, 40) + 'px';
}

function showMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'screen-msg';
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
}

function showEvent() {
    const gif = gifs[noCount % gifs.length];
    const phrase = phrases[noCount % phrases.length];
    eventGif.src = gif;
    eventText.textContent = phrase;
    eventBox.classList.add('show');
}

// ============ EVENTOS CAÓTICOS ============

const chaosEvents = [
    { fn: buttonRunsAway, id: 'run' },
    { fn: buttonMelts, id: 'melt' },
    { fn: buttonWheelchair, id: 'wheelchair' }, // Nuevo
    { fn: lanaVinylGame, id: 'lana' },
    { fn: buttonBalloon, id: 'balloon' }, // Nuevo
    { fn: buttonDisguise, id: 'disguise' }, // Nuevo
    { fn: buttonGoesInvisible, id: 'invisible' },
    { fn: buttonSpinsForever, id: 'spin' },
    { fn: buttonTeleports, id: 'teleport' },
    { fn: mathChallenge, id: 'math' },
    { fn: captchaGame, id: 'captcha' },
    { fn: typingChallenge, id: 'type' },
    { fn: reverseTyping, id: 'revtype' },
    { fn: countdownChallenge, id: 'count' },
    { fn: simonSays, id: 'simon' },
    { fn: holdButton, id: 'hold' },
    { fn: clickRace, id: 'race' },
    { fn: riddleChallenge, id: 'riddle' },
    { fn: escapeRoom, id: 'escape' },
    { fn: reactionTest, id: 'react' },
    { fn: findDifferent, id: 'diff' },
    { fn: completeSequence, id: 'seq' },
    { fn: emojiMath, id: 'emoji' },
    { fn: trueOrFalse, id: 'tf' },
    { fn: catchButton, id: 'catch' },
    { fn: colorMatch, id: 'color' },
    { fn: snakeGame, id: 'snake' },
    { fn: memoryPairs, id: 'mem' },
    { fn: typeFast, id: 'fast' },
    { fn: randomButton, id: 'random' },
    { fn: patternUnlock, id: 'pattern' },
    { fn: whackAMole, id: 'mole' },
    { fn: copyEmoji, id: 'copy' },
    { fn: mathRace, id: 'mathrace' },
    { fn: simonSaysHard, id: 'simonhard' },
    // Nuevas animaciones de personaje
    { fn: buttonShiver, id: 'shiver' },
    { fn: buttonSleep, id: 'sleep' },
    { fn: buttonGhost, id: 'ghost' },
    { fn: buttonBoxer, id: 'boxer' },
    { fn: buttonVomit, id: 'vomit' },
    // 5 nuevos
    { fn: buttonSumo, id: 'sumo' },
    // COWBOY REMOVED
    { fn: buttonGamer, id: 'gamer' },
    { fn: buttonVampire, id: 'vampire' },
    { fn: buttonAstronaut, id: 'astronaut' }
];

// Inicializar contador
updateCounter();

// ============ SELECCIÓN DE EVENTO ============

btnNo.addEventListener('click', function () {
    if (isMinigameActive) return;

    noCount++;
    btnNo.textContent = noTexts[noCount % noTexts.length];

    // Animación simple del botón
    const anim = btnAnims[Math.floor(Math.random() * btnAnims.length)];
    btnNo.classList.remove(...btnAnims);
    void btnNo.offsetWidth;
    btnNo.classList.add(anim);

    shakeCard();
    showEvent();

    // Lógica de Selección Ponderada
    // Prioridad a juegos no jugados (80% prob si hay disponibles)
    const unplayed = chaosEvents.filter(e => !playedGames.has(e.id));
    let selectedEvent;

    if (unplayed.length > 0 && Math.random() < 0.8) {
        // Escoger uno nuevo
        selectedEvent = unplayed[Math.floor(Math.random() * unplayed.length)];
    } else {
        // Escoger cualquiera
        selectedEvent = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
    }

    // Registrar como jugado
    playedGames.add(selectedEvent.id);
    updateCounter();

    // Ejecutar evento
    setTimeout(selectedEvent.fn, 300);

    if (noCount % 2 === 0) growYes();
    if (noCount % 3 === 0) addYesButtons();
});

// ============ CELEBRACIÓN ============

function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff85a2', '#a66cff', '#ff9f43', '#00d2d3'];
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + '%';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDuration = (2 + Math.random() * 2) + 's';
            confettiContainer.appendChild(c);
        }, i * 20);
    }
}

function createHearts() {
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝', '💘', '🥰', '😍', '💑'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.className = 'heart';
            h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            h.style.left = Math.random() * 100 + '%';
            h.style.fontSize = (20 + Math.random() * 40) + 'px';
            h.style.animationDuration = (2 + Math.random() * 3) + 's';
            heartsContainer.appendChild(h);
        }, i * 50);
    }

    setInterval(() => {
        const h = document.createElement('div');
        h.className = 'heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = (25 + Math.random() * 30) + 'px';
        h.style.animationDuration = (3 + Math.random() * 2) + 's';
        heartsContainer.appendChild(h);
        setTimeout(() => h.remove(), 5000);
    }, 150);
}

function showSuccess() {
    const msgs = {
        0: "Sin dudar. Respect.",
        3: "Solo 3 intentos, no está mal.",
        6: "Te ha costado eh.",
        10: "10 veces diciendo que no...",
        15: "Más terca que una mula.",
        20: "Con lo fácil que era decir sí."
    };

    let msg = "Era broma, ¿no?";
    for (const [c, t] of Object.entries(msgs).reverse()) {
        if (noCount >= parseInt(c)) { msg = t; break; }
    }

    successMessage.textContent = msg;
    successTitle.textContent = noCount > 10 ? "POR FIN" : "BIEN";
    successScreen.classList.add('show');
    createConfetti();
    createHearts();
}

btnYes.addEventListener('click', showSuccess);

// Limpiar animaciones
btnNo.addEventListener('animationend', () => btnNo.classList.remove(...btnAnims));
