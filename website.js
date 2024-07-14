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