document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    // Initially hide left button
    scrollLeftBtn.style.display = 'none';
    
    // Scroll buttons click handlers
    scrollLeftBtn.addEventListener('click', () => {
        productGrid.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        productGrid.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
    
    // Update button visibility based on scroll position
    productGrid.addEventListener('scroll', () => {
        scrollLeftBtn.style.display = 
            productGrid.scrollLeft > 0 ? 'flex' : 'none';
        scrollRightBtn.style.display = 
            productGrid.scrollLeft < (productGrid.scrollWidth - productGrid.clientWidth) 
            ? 'flex' : 'none';
    });
});