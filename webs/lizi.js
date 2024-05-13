document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("particle-container");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    container.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30;
    const particleRadius = 3;

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.radius = particleRadius;
        this.color = "#00FF00";
        this.alpha = 1;
        this.velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
    }

    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    Particle.prototype.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    };

    function createParticles(x, y) {
        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle(x, y);
            particles.push(particle);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.draw();
            particle.update();

            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("mousemove", function(event) {
        const { clientX, clientY } = event;
        createParticles(clientX, clientY);
    });
});