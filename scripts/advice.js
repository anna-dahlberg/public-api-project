const url = 'https://api.adviceslip.com/advice'

const button = document.querySelector('.advice-button');
const card = document.querySelector('.theCard');

const getAdvice = async () => {
    button.disabled = true; 
    
    const adviceContainer = document.querySelector(".advice");
    adviceContainer.innerHTML = '';  // Clear previous content
    
    try {
        console.log('Fetching advice from API...');
        
        const response = await fetch(url);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const advice = await response.json();
        
        // Check if the API returned the expected structure
        if (!advice || !advice.slip || !advice.slip.advice) {
            throw new Error('Invalid response format from API');
        }
        
        const printAdvice = document.createElement("p");
        printAdvice.innerText = advice.slip.advice;
        adviceContainer.appendChild(printAdvice);
        
        console.log('Advice successfully loaded:', advice.slip.advice);
        
        card.classList.toggle('isFlipped');
        
        setTimeout(() => {
            card.classList.toggle('isFlipped');
            button.disabled = false; 
        }, 4500);
        
    } catch (error) {
        console.error('Error fetching advice:', error);
        
        // Display user-friendly error message
        const errorMessage = document.createElement("p");
        errorMessage.style.color = '#ff6b6b';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.padding = '20px';
        
        // Determine appropriate error message based on error type
        let userMessage;
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            userMessage = "😕 Oops! It seems you're offline or the advice service is temporarily unavailable. Please check your internet connection and try again.";
        } else if (error.message.includes('404')) {
            userMessage = "😅 The advice fairy seems to have misplaced that particular piece of wisdom. Please try again!";
        } else if (error.message.includes('HTTP error')) {
            userMessage = "🛠️ The advice service is having a moment. Please try again in a few seconds!";
        } else {
            userMessage = "🤔 Something unexpected happened while fetching your advice. Please try again!";
        }
        
        errorMessage.innerText = userMessage;
        adviceContainer.appendChild(errorMessage);
        
        // Show the card with error message
        card.classList.toggle('isFlipped');
        
        // Reset button and card state after showing error
        setTimeout(() => {
            card.classList.toggle('isFlipped');
            button.disabled = false;
        }, 4500);
    }
};

button.addEventListener("click", function() {
    getAdvice();
});





  

 
