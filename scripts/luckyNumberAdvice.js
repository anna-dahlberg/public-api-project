const button = document.querySelector(".advice-button");
const card = document.querySelector(".theCard");
const adviceContainer = document.querySelector(".advice");

const getAdvice = async () => {
  const luckyNumber = document.querySelector("#luckyNumber").value;

  // ✅ Validate user input before calling the API
  if (
    isNaN(luckyNumber) ||
    luckyNumber === "" ||
    luckyNumber > 224 ||
    luckyNumber < 1
  ) {
    alert("⚠️ Please enter a valid number between 1 and 224.");
    return;
  }

  const url = `https://api.adviceslip.com/advice/${luckyNumber}`;
  button.disabled = true;
  adviceContainer.innerHTML = ""; // Clear previous advice

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const advice = await response.json();

    // ✅ Check for valid API response
    if (!advice.slip || !advice.slip.advice) {
      throw new Error(
        "Invalid API response: Missing advice for that lucky number"
      );
    }

    // ✅ Show the advice
    const printAdvice = document.createElement("p");
    printAdvice.innerText = advice.slip.advice;
    adviceContainer.appendChild(printAdvice);

    // ✅ Animate card flip
    card.classList.toggle("isFlipped");
    setTimeout(() => {
      card.classList.toggle("isFlipped");
    }, 4500);
  } catch (error) {
    console.error("Error fetching advice:", error);

    // ✅ Friendly error message inside the card
    const errorMessage = document.createElement("p");
    errorMessage.innerText =
      "⚠️ Couldn’t find advice for that number. Try again!";
    adviceContainer.appendChild(errorMessage);
  } finally {
    // ✅ Always re-enable the button
    button.disabled = false;
  }
};

button.addEventListener("click", getAdvice);
