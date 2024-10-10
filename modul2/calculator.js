// Define calculator buttons
const buttons = [
    { label: 'C', action: 'clearResult' },
    { label: '(', action: 'appendCharacter' },
    { label: ')', action: 'appendCharacter' },
    { label: '/', action: 'appendCharacter' },
    { label: '7', action: 'appendCharacter' },
    { label: '8', action: 'appendCharacter' },
    { label: '9', action: 'appendCharacter' },
    { label: '*', action: 'appendCharacter' },
    { label: '4', action: 'appendCharacter' },
    { label: '5', action: 'appendCharacter' },
    { label: '6', action: 'appendCharacter' },
    { label: '-', action: 'appendCharacter' },
    { label: '1', action: 'appendCharacter' },
    { label: '2', action: 'appendCharacter' },
    { label: '3', action: 'appendCharacter' },
    { label: '+', action: 'appendCharacter' },
    { label: '0', action: 'appendCharacter' },
    { label: '.', action: 'appendCharacter' },
    { label: '=', action: 'calculatedResult' },
    { label: '%', action: 'appendCharacter' }
];

// Function to create buttons dynamically
function createCalculatorButtons() {
    const container = document.getElementById('calculator-buttons');

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded';
        btn.textContent = button.label;
        
        // Add appropriate onclick event based on the action
        if (button.action === 'appendCharacter') {
            btn.onclick = () => appendCharacter(button.label);
        } else if (button.action === 'clearResult') {
            btn.onclick = clearResult;
        } else if (button.action === 'calculatedResult') {
            btn.onclick = calculatedResult;
        }
        
        container.appendChild(btn);
    });
}

// Clear the result field
function clearResult() {
    document.getElementById("result").value = "";
}

// Append characters to the input field
function appendCharacter(char) {
    document.getElementById("result").value += char;
}

// Calculate the result
function calculatedResult() {
    let expression = document.getElementById("result").value;
    try {
        let result = eval(expression);
        document.getElementById("result").value = result;
    } catch (error) {
        document.getElementById("result").value = "Error";
    }
}

// Call the function to create buttons on page load
createCalculatorButtons();
