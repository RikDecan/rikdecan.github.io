


(function() {
    function filter(category) {
        let items = document.querySelectorAll('.item');
        
        items.forEach(item => {
            if (category === 'all') {
                item.style.display = 'block';
            } else {
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }

    window.filter = filter; // Expose the filter function globally
})();