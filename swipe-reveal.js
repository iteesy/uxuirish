document.addEventListener('DOMContentLoaded', function() {
    const workElement = document.querySelector('#work');
    let startX = 0;
    let isSwiping = false;
    let revealedSpans = new Set();

    // touch events for mobile
    workElement.addEventListener('touchstart', handleStart);
    workElement.addEventListener('touchmove', handleMove);
    workElement.addEventListener('touchend', handleEnd);

    // mouse events for desktop testing
    workElement.addEventListener('mousedown', handleStart);
    workElement.addEventListener('mousemove', handleMove);
    workElement.addEventListener('mouseup', handleEnd);
    workElement.addEventListener('mouseleave', handleEnd);

    function handleStart(e) {
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        isSwiping = true;
    }

    function handleMove(e) {
        if (!isSwiping) return;
        
        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        
        const spans = Array.from(workElement.getElementsByTagName('span'));
        spans.forEach(span => {
            const rect = span.getBoundingClientRect();
            if (currentX >= rect.left && currentX <= rect.right) {
                span.classList.add('hovered');
                revealedSpans.add(span);
            }
        });
    }

    function handleEnd() {
        isSwiping = false;
    }
}); 