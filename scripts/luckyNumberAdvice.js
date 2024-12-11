
const button = document.querySelector('.advice-button');
const card = document.querySelector('.theCard');

const getAdvice = async () => {
    
    const luckyNumber = document.querySelector('#luckyNumber').value;
    
    if (isNaN(luckyNumber) || luckyNumber === "" || luckyNumber > 224) {
        alert("Please enter a valid number.");
        return;
    }
    
    const url = `https://api.adviceslip.com/advice/${luckyNumber}`;

    button.disabled = true; 

    const response = await fetch(url);
    const advice = await response.json();
    
    const adviceContainer = document.querySelector(".advice");
    
    adviceContainer.innerHTML = '';  //Clears the previous response
    
    const printAdvice = document.createElement("p");
    printAdvice.innerText = advice.slip.advice;
    adviceContainer.appendChild(printAdvice);

    card.classList.toggle('isFlipped');

    setTimeout(() => {
        card.classList.toggle('isFlipped');
        button.disabled = false; 
    }, 4500);
};

button.addEventListener("click", function() {
    getAdvice();
});
