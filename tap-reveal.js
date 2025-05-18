document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) return;
    const workElement = document.querySelector('#work');
    if (!workElement) return;

    const tappedSpans = new Set();
    const spans = workElement.querySelectorAll('span');

    spans.forEach(span => {
        span.addEventListener('touchend', function() {
            tappedSpans.add(span);
            console.log('Tapped:', span.textContent, 'Set size:', tappedSpans.size);
            if (tappedSpans.size === 4) {
                spans.forEach(s => s.classList.add('hovered'));
            }
        });
    });
}); 