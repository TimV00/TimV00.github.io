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
    const correctPassword = 'test'; // Set your correct password here
    const errorMessage = document.getElementById('error-message');
    const container = document.querySelector('.container');
    const image = document.querySelector('.centered-image');

    if (passwordInput === correctPassword) {
        //document.getElementById('btConfetti').click();
        fireConfetti()
        // Temporarily change the image to cat2.jpg for 3 seconds
        const originalSrc = image.src; // Store the original image source
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

function checkAnswer(selectedOption, isCorrect, redirectPage) {
    const feedback = document.getElementById('feedback');
    const options = document.querySelectorAll('.options-list li');
    const retryButton = document.getElementById('retry-button');
    // Disable all options to prevent multiple selections
    options.forEach(option => option.onclick = null);

    if (isCorrect) {
        selectedOption.classList.add('correct');
        feedback.classList.remove('hidden');
        document.body.style.backgroundColor = '#4CAF50';
        // Redirect after 5 seconds
        // Call the function to start the countdown (for example, after a correct answer)
        fireConfetti(); // Trigger confetti effect
        const feedbackElement = document.getElementById('feedback');
        let countdown = 3;
    
        // Display the paragraph and start the countdown
        feedbackElement.classList.remove('hidden');
    
        // Update the feedback text with the countdown
        feedbackElement.textContent = `Next Question in ${countdown}...`;
    
        const interval = setInterval(() => {
            countdown--;
            feedbackElement.textContent = `Next Question in ${countdown}...`;
    
            // When countdown reaches zero, stop the interval
            if (countdown === 0) {
                clearInterval(interval);
                window.location.href = redirectPage;
                // Add your redirect or next question logic here, if needed
            }
        }, 1000); // 1000 milliseconds = 1 second
    } else {
        document.body.style.backgroundColor = '#ff4d4d';
        selectedOption.classList.add('incorrect');
        retryButton.classList.remove('hidden'); // Show the retry button
    }
}

function startCountdown() {
    const feedbackElement = document.getElementById('feedback');
    let countdown = 3;

    // Display the paragraph and start the countdown
    feedbackElement.classList.remove('hidden');

    // Update the feedback text with the countdown
    feedbackElement.textContent = `Next Question in ${countdown}...`;

    const interval = setInterval(() => {
        countdown--;
        feedbackElement.textContent = `Next Question in ${countdown}...`;

        // When countdown reaches zero, stop the interval
        if (countdown === 0) {
            clearInterval(interval);
            feedbackElement.textContent = 'Next Question!';
            // Add your redirect or next question logic here, if needed
        }
    }, 1000); // 1000 milliseconds = 1 second
}

function retry() {
    const options = document.querySelectorAll('.options-list li');
    const feedback = document.getElementById('feedback');
    const retryButton = document.getElementById('retry-button');
    document.body.style.backgroundColor = '#f4f4f9';
    // Reset the styles and re-enable the options
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.onclick = () => checkAnswer(option, option.textContent === 'Paris'); // Update based on correct answer
    });

    feedback.classList.add('hidden');
    retryButton.classList.add('hidden');
}
