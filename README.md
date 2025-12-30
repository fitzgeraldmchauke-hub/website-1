<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>R.I.P 2025</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: radial-gradient(circle at bottom, #020111, #000000 70%);
      overflow: hidden;
      height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: white;
    }

    /* Stars */
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      opacity: 0.8;
      animation: twinkle 3s infinite ease-in-out;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    /* Center Text */
    .center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 2;
    }

    h1 {
      font-size: clamp(3rem, 10vw, 9rem);
      letter-spacing: 0.2em;
      text-shadow: 0 0 20px #fff, 0 0 40px #ff4444;
    }

    h2 {
      margin-top: 1rem;
      font-weight: 300;
      opacity: 0.8;
      letter-spacing: 0.3em;
    }

    /* Fireworks Canvas */
    canvas {
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  </style>
</head>
<body>
  <canvas id="fireworks"></canvas>

  <div class="center">
    <h1>2025</h1>
    <h2>R.I.P 2025</h2>
  </div>

  <script>
    // Stars
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDelay = Math.random() * 3 + 's';
      document.body.appendChild(star);
    }

    // Fireworks
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.life = 100;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    let particles = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      const colors = ['#ff4444', '#44ccff', '#ffff66', '#ff66ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      if (Math.random() < 0.05) createFirework();

      requestAnimationFrame(animate);
    }

    animate();
  </script>
</body>
</html>
