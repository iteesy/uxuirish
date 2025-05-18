//is glitch still a thing?
function createBackgroundCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'mobileBackground';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5'; // Reduced opacity for scan lines
    document.body.appendChild(canvas);
    return canvas;
}

function initMobileBackground() {
    const canvas = createBackgroundCanvas();
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    function drawTexture() {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#0716A0';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(141, 149, 151, 0.25)';
        

        const shouldGlitch = Math.random() < 0.1;
        const glitchOffset = shouldGlitch ? Math.random() * 20 - 10 : 0;
        
        for (let y = 0; y < height; y += 4) {
            // random line thickness
            const lineThickness = shouldGlitch ? Math.random() * 2 + 1 : 2;
            
            // randomness to line position
            const lineY = y + (shouldGlitch ? glitchOffset : 0);
            
            // Draw the line
            ctx.fillRect(0, lineY, width, lineThickness);
            
            // glitch
            if (shouldGlitch && Math.random() < 0.3) {
                const shiftAmount = Math.random() * 20 - 15;
                const shiftStart = Math.random() * width;
                const shiftWidth = Math.random() * 100 + 50;
                
                ctx.fillRect(shiftStart, lineY, shiftWidth, lineThickness);
            }
        }
        
        // subtle noise
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 3;
            data[i] = Math.min(255, data[i] + noise);
            data[i + 1] = Math.min(255, data[i + 1] + noise);
            data[i + 2] = Math.min(255, data[i + 2] + noise);
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
    drawTexture();
    
    setInterval(drawTexture, 100);
    

    window.addEventListener('resize', () => {
        resizeCanvas();
        drawTexture();
    });
}

// ONLY MOBILE
function checkAndInitMobile() {
    if (window.innerWidth <= 768) {
        initMobileBackground();
    }
}

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', checkAndInitMobile);
window.addEventListener('resize', checkAndInitMobile); 