document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) return;
    const workElement = document.querySelector('#work');
    if (!workElement) return;
    let tapCount = 0;
    workElement.addEventListener('touchend', function(e) {
        tapCount++;
        if (tapCount >= 3) {
            Array.from(workElement.querySelectorAll('span')).forEach(span => {
                span.classList.add('hovered');
            });
        }
    });
}); 