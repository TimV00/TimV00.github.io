
var originalSrc;
var oRedirectPage;
// Ensure this code runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Assign the confetti click handler
    const fireBtn = document.querySelector('.fire-btn');

    if (fireBtn) {
        fireBtn.addEventListener('click', fireConfetti);
    }
});

// Confetti function to trigger the confetti effect
function fireConfetti() {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['heart'],
        colors: ['FFC0CB', 'FF69B4', 'FF1493', 'C71585'],
    };

    // Trigger multiple confetti bursts
    confetti({ ...defaults, particleCount: 50, scalar: 2 });
    confetti({ ...defaults, particleCount: 25, scalar: 3 });
    confetti({ ...defaults, particleCount: 10, scalar: 4 });
}

function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = 'TimAndHiba4Ever'; // Set your correct password here
    const errorMessage = document.getElementById('error-message');
    const container = document.querySelector('.container');
    const image = document.querySelector('.centered-image');

    if (passwordInput === correctPassword) {
        //document.getElementById('btConfetti').click();
        fireConfetti()
        // Temporarily change the image to cat2.jpg for 3 seconds
        originalSrc = image.src; // Store the original image source
        image.src = 'cats/cat3.gif'; // Change to the new image (cat2.jpg)

        setTimeout(() => {
            image.src = originalSrc;  // Revert the image back to the original after 3 seconds
            window.location.href = 'AnniversaryUnlocked.html'; // Redirect to the unlocked page
        }, 3000);
    } else {
        errorMessage.classList.remove('hidden');
        container.classList.add('shake'); // Add the shake class to trigger the animation

        // Temporarily change the image to cat2.jpg for 3 seconds
        const originalSrc = image.src; // Store the original image source
        image.src = 'cats/cat2.jpg'; // Change to the new image (cat2.jpg)

        // Revert the image back to the original after 3 seconds
        setTimeout(() => {
            image.src = originalSrc;
        }, 3000);

        // Remove the shake class after the animation ends to allow re-triggering
        setTimeout(() => {
            container.classList.remove('shake');
        }, 300);
    }
    document.getElementById('password').value = '';
}

function goBack() {
    window.history.back(); // Navigate back to the previous page
}

function checkAnswer(selectedOption,redirectPage) {
    const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
    const feedback = document.getElementById('feedback');
    const options = document.querySelectorAll('.options-list li');
    const retryButton = document.getElementById('retry-button');
    const contentElement = document.getElementById('content');
    const pageID = contentElement.getAttribute('data-id'); // Retrieve the identifying number
    const image = document.querySelector('.centered-image');
    oRedirectPage = redirectPage;
    // Disable all options to prevent multiple selections
    options.forEach(option => option.onclick = null);

    if (isCorrect) {
        selectedOption.classList.add('correct');
        feedback.classList.remove('hidden');
        document.body.style.backgroundColor = '#4CAF50';
        fireConfetti(); // Trigger confetti effect
        let countdown = 3;
        let message;

        // Display different messages based on the page ID
        switch (pageID) {
            case '4':
                message = 'Final Question';
                break;
            case '5':
                message = 'Moving On';
                break;
            default:
                message = 'Next Question';
                break;
        }

        originalSrc = image.src; // Store the original image source
        image.src = 'cats/cat3.gif'; // Change to the new image

        // Update the feedback text with the countdown
        feedback.textContent = `${message} in ${countdown}...`;

        const interval = setInterval(() => {
            countdown--;
            feedback.textContent = `${message} in ${countdown}...`;

            // When countdown reaches zero, stop the interval
            if (countdown === 0) {
                clearInterval(interval);
                image.src = originalSrc;
                window.location.href = redirectPage;
            }
        }, 1000); // 1000 milliseconds = 1 second
    } else {
        originalSrc = image.src; // Store the original image source
        image.src = 'cats/catsmack.gif'; // Change to the new image
        document.body.style.backgroundColor = '#ff4d4d';
        selectedOption.classList.add('incorrect');
        retryButton.classList.remove('hidden'); // Show the retry button
    }
}


function retry() {
    const options = document.querySelectorAll('.options-list li');
    const feedback = document.getElementById('feedback');
    const retryButton = document.getElementById('retry-button');
    const image = document.querySelector('.centered-image');
    document.body.style.backgroundColor = '#f4f4f9';

    // Revert the image to its original source if changed
    image.src = originalSrc;

    // Reset the styles and re-enable the options with proper click handlers
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');

        // Re-assign the click handler using data attributes
        option.onclick = () => checkAnswer(option, oRedirectPage);
    });

    feedback.classList.add('hidden');
    retryButton.classList.add('hidden');
}

