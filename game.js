    // Declaración de variables globales
    const player = document.getElementById('player');
    let velocity = 0;
    let jumping = false;
    let facingRight = true;
    let currentMap = null; // Variable para almacenar el mapa actual
    let canShoot = true; // Variable de control para el tiempo de recarga
    let musicPlaying = false; // Variable para almacenar el estado de reproducción de la música del nivel 1

    // Declaración de sonidos
    const jumpSound = new Audio('jump.mp3');
    const shootSound = new Audio('disparar.mp3');
    const buttonSound = new Audio('boton_inicial.mp3');

    // Declaración de música
    const level1Music = new Audio('Musica Nivel 1.mp3');
    level1Music.loop = true; // Hacer que la música se repita al finalizar
    const level2Music = new Audio('Musica Nivel 2.mp3');
    level2Music.loop = true; // Hacer que la música se repita al finalizar

    // Obtener los botones de dirección
    const directionButtons = document.getElementById('directionButtons').querySelectorAll('button');

    // Evento de clic para los botones de dirección
    directionButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            const direction = this.getAttribute('data-direction');
            handleDirection(direction, true);
        });
        button.addEventListener('mouseup', function() {
            const direction = this.getAttribute('data-direction');
            handleDirection(direction, false);
        });
    });

    // Función para manejar el evento de presionar el botón de Mapa 2
    function playMap2Music() {
        stopLevel1Music(); // Detener cualquier música que se esté reproduciendo actualmente
        stopLevel2Music(); // Detener cualquier música del nivel 2 que se esté reproduciendo actualmente
        level2Music.play(); // Reproducir la música del nivel 2
        musicPlaying = true; // Actualizar el estado de reproducción de la música
    }

    // Función para alternar entre reproducir y detener la música del nivel 1
    function toggleMusic() {
        if (musicPlaying) {
            stopLevel1Music();
        } else {
            playLevel1Music();
        }
    }

    // Función para verificar si el usuario está autenticado
    function checkAuthentication() {
        if (sessionStorage.getItem("loggedin") === "true") {
            document.getElementById('menu').style.display = 'block';
            document.getElementById('loginMenu').style.display = 'none';
            document.getElementById('registerMenu').style.display = 'none';
        } else {
            document.getElementById('loginMenu').style.display = 'block';
            document.getElementById('menu').style.display = 'none';
            document.getElementById('registerMenu').style.display = 'none';
        }
    }

    // Llama a la función para verificar la autenticación cuando la página se carga completamente
    window.onload = function() {
        checkAuthentication();
    };

        document.addEventListener('DOMContentLoaded', function() {
        const loginMenu = document.getElementById('loginMenu');
        const registerMenu = document.getElementById('registerMenu');
        const showRegisterLink = document.getElementById('showRegister');
        const showLoginLink = document.getElementById('showLogin');

        showRegisterLink.addEventListener('click', function(event) {
            event.preventDefault();
            loginMenu.style.display = 'none';
            registerMenu.style.display = 'block';
            showLoginLink.textContent = '¿Ya tienes una cuenta? Inicia sesión';
            window.location.href = '#registerMenu';
        });

        showLoginLink.addEventListener('click', function(event) {
            event.preventDefault();
            registerMenu.style.display = 'none';
            loginMenu.style.display = 'block';
            showLoginLink.textContent = '¿No tienes una cuenta? Regístrate aquí';
            window.location.href = '#loginMenu';
        });
    });
    
    function loginSuccessful() {
        document.getElementById('loginMenu').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
    }
    
    function registerSuccessful() {
        document.getElementById('loginMenu').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
    }

    // Mostrar automáticamente el menú de inicio de sesión al cargar la página
    window.onload = function() {
        var loginMenu = document.getElementById('loginMenu');
        var registerMenu = document.getElementById('registerMenu');

        loginMenu.style.display = 'block';
        registerMenu.style.display = 'none';

        // Actualizar la URL para reflejar el menú de inicio de sesión
        history.replaceState(null, null, '#loginMenu');
    };

    // Función para manejar la dirección presionada
    function handleDirection(direction, isPressed) {
        if (direction === 'up') {
            if (isPressed) {
                // Simular presionar la tecla 'w'
                handleKeyDown({ key: 'w' });
            } else {
                // Simular soltar la tecla 'w'
                handleKeyUp({ key: 'w' });
            }
        } else if (direction === 'right') {
            if (isPressed) {
                // Simular presionar la tecla 'd'
                handleKeyDown({ key: 'd' });
            } else {
                // Simular soltar la tecla 'd'
                handleKeyUp({ key: 'd' });
            }
        } else if (direction === 'left') {
            if (isPressed) {
                // Simular presionar la tecla 'a'
                handleKeyDown({ key: 'a' });
            } else {
                // Simular soltar la tecla 'a'
                handleKeyUp({ key: 'a' });
            }
        } else if (direction === 'down') {
            // Puedes implementar la lógica para el botón hacia abajo aquí
            // Por ejemplo, si es necesario, handleKeyDown({ key: 's' });
            // O simplemente dejarlo vacío si aún no se ha definido la funcionalidad
        }
    }

    // Función para manejar el evento de teclado
    function handleKeyDown(event) {
        // Verificar si el juego está en marcha antes de ejecutar acciones
        if (!currentMap) return;

        if (event.key === 'a' || event.key === 'A') {
            velocity = -3; // Aumentar velocidad
            flipPlayer(false);
        } else if (event.key === 'd' || event.key === 'D') {
            velocity = 3; // Aumentar velocidad
            flipPlayer(true);
        } else if (event.key === 'w' || event.key === 'W') {
            if (!jumping) { // Verificar si ya está saltando
                jump();
            }
        } else if ((event.key === ' ' || event.key === 'Spacebar') && canShoot) {
            shoot();
            canShoot = false;
            setTimeout(() => {
                canShoot = true;
            }, 100); // 100 milisegundos de tiempo de recarga
        } else if (event.key === 'l' || event.key === 'L') {
            toggleMusic();
        }
    }

    // Función para manejar el evento de soltar la tecla
    function handleKeyUp(event) {
        if ((event.key === 'a' || event.key === 'A') || (event.key === 'd' || event.key === 'D')) {
            velocity = 0; // Detener el movimiento
        }
    }

    // Función para reproducir el sonido del botón
    function playButtonSound() {
        buttonSound.currentTime = 0;
        buttonSound.play();
    }

    // Función para manejar el evento de presionar el botón de Mapa 1
    function playMap1Music() {
        stopLevel1Music(); // Detener cualquier música que se esté reproduciendo actualmente
        level1Music.play(); // Reproducir la música del nivel 1
        musicPlaying = true; // Actualizar el estado de reproducción de la música
    }

    // Función para detener la música del nivel 1
    function stopLevel1Music() {
        if (musicPlaying) {
            level1Music.pause();
            level1Music.currentTime = 0;
            musicPlaying = false;
        }
    }

    // Función para reproducir la música del nivel 2
    function playMap2Music() {
        stopLevel1Music(); // Detener cualquier música que se esté reproduciendo actualmente
        level2Music.play(); // Reproducir la música del nivel 2
        musicPlaying = true; // Actualizar el estado de reproducción de la música
    }

    // Función para detener la música del nivel 2
    function stopLevel2Music() {
        if (musicPlaying) {
            level2Music.pause();
            level2Music.currentTime = 0;
            musicPlaying = false;
        }
    }

    // Función para iniciar el juego
    function startGame() {
        playButtonSound();

        if (currentMap === null) {
            alert("Por favor, selecciona un mapa antes de comenzar el juego.");
            showChangeMapMenu();
            return;
        }

        // Cambiar el fondo según el mapa seleccionado
        document.body.style.backgroundImage = `url('${currentMap}')`;

        // Ocultar el menú principal
        document.getElementById('menu').style.display = 'none';

        // Mostrar al jugador
        player.style.display = 'block';

        // Mostrar los botones de dirección
        document.getElementById('directionButtons').style.display = 'block';

        // Reproducir música del nivel correspondiente al iniciar el juego
        if (currentMap === 'Espacio Profundo.png') {
            playMap1Music();
        } else if (currentMap === 'Galaxia Morada.jpg') {
            playMap2Music();
        }
    }

    // Función para regresar al menú principal
    function returnToMenu() {
        // Detener la música del nivel 1 al regresar al menú
        stopLevel1Music();

        // Muestra el menú principal
        document.getElementById('menu').style.display = 'block';

        // Oculta el menú de cambio de mapa
        document.getElementById('changeMapMenu').style.display = 'none';

        // Oculta el menú de AstroRefugio
        document.getElementById('astroRefugioMenu').style.display = 'none';

        playButtonSound();
    }

    // Función para cambiar al menú de cambio de mapa
    function showChangeMapMenu() {
        // Pausar todos los sonidos
        jumpSound.pause();
        jumpSound.currentTime = 0;
        shootSound.pause();
        shootSound.currentTime = 0;

        // Oculta el menú principal
        document.getElementById('menu').style.display = 'none';

        // Muestra el menú de cambio de mapa
        document.getElementById('changeMapMenu').style.display = 'block';

        // Oculta al jugador
        player.style.display = 'none';

        playButtonSound();
    }

    // Función para mostrar el menú de AstroRefugio
    function showAstroRefugio() {
        // Oculta el menú principal
        document.getElementById('menu').style.display = 'none';

        // Muestra el menú de AstroRefugio
        document.getElementById('astroRefugioMenu').style.display = 'flex';

        // Oculta al jugador
        player.style.display = 'none';

        playButtonSound();
    }

    // Función para cambiar el mapa seleccionado
    function changeMap(button, mapNumber) {
        // Desmarcar todos los botones
        const buttons = document.querySelectorAll('#changeMapMenu button');
        buttons.forEach(btn => btn.classList.remove('selected'));

        // Marcar el botón seleccionado
        button.classList.add('selected');

        // Actualizar el fondo actual
        currentMap = mapNumber === 1 ? 'Espacio Profundo.png' : 'Galaxia Morada.jpg';

        // Cambiar el fondo según el mapa seleccionado
        document.body.style.backgroundImage = `url('${currentMap}')`;

        // Oculta el menú de cambio de mapa
        document.getElementById('changeMapMenu').style.display = 'none';

        // Muestra al jugador
        player.style.display = 'block';

        // Si se selecciona el mapa 1, reproducir la música del mapa 1
        if (mapNumber === 1) {
            playMap1Music();
        }

        // Llamar a startGame() después de seleccionar un mapa
        startGame();
    }

    // Función para cambiar el mapa según la vista previa seleccionada
    function changeMapByPreview(mapNumber) {
        // Llama a la función existente changeMap con el número de mapa
        changeMap(document.querySelector(`#changeMapMenu button:nth-child(${mapNumber})`), mapNumber);
    }

    // Función para manejar el evento de teclado
    document.addEventListener('keydown', handleKeyDown);

    // Función para mover al jugador
    function movePlayer() {
        const newLeft = (parseFloat(player.style.left) || 0) + velocity;

        if (newLeft >= document.body.getBoundingClientRect().left && newLeft + player.offsetWidth <= document.body.getBoundingClientRect().right) {
            player.style.left = newLeft + 'px';
        }

        requestAnimationFrame(movePlayer);
    }

    // Función para voltear al jugador horizontalmente
    function flipPlayer(right) {
        const scaleX = right ? 1 : -1;
        player.style.transform = `scaleX(${scaleX})`;
        facingRight = right;
    }

    function jump() {
        if (!jumping) {
            jumping = true;
            let startTime = null;
            let maxHeightReached = false;

            jumpSound.currentTime = 0;
            jumpSound.play();

            function jumpAnimation(timestamp) {
                if (!startTime) startTime = timestamp;

                const progress = timestamp - startTime;
                let displacement = -0.5 * 9.8 * (progress / (1000 / 2)) ** 2 + 120 * (progress / (1000 / 2));

                if (displacement < 0) {
                    player.style.bottom = '10px';
                    jumping = false;
                } else {
                    // Limitar la altura máxima al tamaño de la pantalla
                    const maxScreenHeight = window.innerHeight - player.offsetHeight - 10; // 10px de margen inferior

                    if (!maxHeightReached) {
                        displacement = Math.min(displacement, maxScreenHeight);
                        player.style.bottom = displacement + 'px';
                    } else {
                        // Descenso
                        const newBottom = parseFloat(player.style.bottom) - 5; // Velocidad de descenso
                        player.style.bottom = Math.max(newBottom, 10) + 'px'; // No descender por debajo del límite inferior
                    }

                    if (displacement >= maxScreenHeight) {
                        maxHeightReached = true;
                    }

                    requestAnimationFrame(jumpAnimation);
                }
            }

            requestAnimationFrame(jumpAnimation);
        }
    }

    // Función para que el jugador dispare
    function shoot() {
        shootSound.currentTime = 0;
        shootSound.play();

        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.direction = facingRight ? 'right' : 'left';

        const playerRect = player.getBoundingClientRect();
        const bulletLeft = facingRight ? playerRect.right : playerRect.left - 20;
        const bulletTop = playerRect.top + player.offsetHeight * 0.4;

        bullet.style.left = bulletLeft + 'px';
        bullet.style.top = bulletTop + 'px';
        bullet.style.bottom = 'auto';

        document.body.appendChild(bullet);

        const bulletStep = 15;

        function moveBullet() {
            const currentLeft = parseFloat(bullet.style.left) || 0;
            bullet.style.left = (bullet.direction === 'right' ? currentLeft + bulletStep : currentLeft - bulletStep) + 'px';

            if ((bullet.direction === 'right' && currentLeft < window.innerWidth) || (bullet.direction === 'left' && currentLeft > 0)) {
                requestAnimationFrame(moveBullet);
            } else {
                document.body.removeChild(bullet);
            }
        }

        requestAnimationFrame(moveBullet);
    }

    // Función para reproducir la música del nivel 1
    function playLevel1Music() {
        if (level1Music.paused) {
            level1Music.play();
            musicPlaying = true; // Actualizar el estado de reproducción de la música
        }
    }

    // Evento para repetir la música del nivel 1 al finalizar
    level1Music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    // Inicia el movimiento del jugador
    movePlayer();