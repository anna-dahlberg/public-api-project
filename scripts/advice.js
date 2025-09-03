const url = 'https://api.adviceslip.com/advice';

const button = document.querySelector('.advice-button');
const card = document.querySelector('.theCard');
const adviceContainer = document.querySelector(".advice");

const getAdvice = async () => {
    button.disabled = true; // Disable button while fetching
    adviceContainer.innerHTML = ''; // Clear previous advice

    try {
        const response = await fetch(url);

        // Check if the API response is OK
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const advice = await response.json();

        // API-specific check (in case response structure is wrong)
        if (!advice.slip || !advice.slip.advice) {
            throw new Error("Invalid API response: Missing advice field");
        }

        // Display advice
        const printAdvice = document.createElement("p");
        printAdvice.innerText = advice.slip.advice;
        adviceContainer.appendChild(printAdvice);

        // Animate the card flip
        card.classList.toggle('isFlipped');
        setTimeout(() => {
            card.classList.toggle('isFlipped');
        }, 4500);

    } catch (error) {
        // Log error for debugging
        console.error("Error fetching advice:", error);

        // Show user-friendly error message
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "⚠️ Oops! Something went wrong. Please try again.";
        adviceContainer.appendChild(errorMessage);

    } finally {
        // Ensure button gets re-enabled even on error
        button.disabled = false;
    }
};

button.addEventListener("click", getAdvice);
