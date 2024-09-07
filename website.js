document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.option-button');

    buttons.forEach(button => {
        const originalColor = getComputedStyle(button).backgroundColor;

        // Function to darken a color by reducing its lightness
        function darkenColor(color, factor) {
            // Extract RGB values from the color string
            const rgb = color.match(/\d+/g).map(Number);
            // Adjust each channel by the factor
            const [r, g, b] = rgb.map(channel => Math.max(0, Math.min(255, channel * (1 - factor))));
            return `rgb(${r}, ${g}, ${b})`;
        }

        // Set hover effect dynamically for each button
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = darkenColor(originalColor, 0.1); // Darken by 10%
        });

        // Reset to original color on mouse leave
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = originalColor;
        });
    });
});

function changeColor(event) {
    const selectedColor = event.target.value;
    document.documentElement.style.setProperty('--main-color', event.target.value);
    document.getElementById("colorEdit").value = colorPicker.value;
    // Store the selected color in local storage
    localStorage.setItem('mainColor', selectedColor);    
}

// Retrieve the stored color on page load
const storedColor = localStorage.getItem('mainColor');
if (storedColor) {
    document.documentElement.style.setProperty('--main-color', storedColor);
}