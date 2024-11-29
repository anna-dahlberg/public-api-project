const url = 'https://api.adviceslip.com/advice'

const button = document.querySelector(".advice-button");

const getAdvice = async() => {
    const response = await fetch(url);
    const advice = await response.json();
    
    const printAdvice = document.createElement("p");
    printAdvice.innerText = advice.slip.advice;

    const adviceContainer = document.querySelector(".advice"); 
    adviceContainer.appendChild(printAdvice);
};


button.addEventListener("click", function() {
    getAdvice();
})



  

 
