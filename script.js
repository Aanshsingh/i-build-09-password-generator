const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseToggle = document.getElementById('uppercase');
const lowercaseToggle = document.getElementById('lowercase');
const numbersToggle = document.getElementById('numbers');
const symbolsToggle = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
 

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};
 

function updateSliderFill() {
  const min = Number(lengthSlider.min);
  const max = Number(lengthSlider.max);
  const val = Number(lengthSlider.value);
  const percent = ((val - min) / (max - min)) * 100;
  lengthSlider.style.setProperty('--fill', percent + '%');
  lengthValue.textContent = val;
}
 
lengthSlider.addEventListener('input', updateSliderFill);
updateSliderFill(); 
 
function generatePassword() {
    const activeSets = [];
    if (uppercaseToggle.checked) {
        activeSets.push(CHAR_SETS.uppercase)
    }
    if (lowercaseToggle.checked) {
        activeSets.push(CHAR_SETS.lowercase)
    }
    if (numbersToggle.checked) {
        activeSets.push(CHAR_SETS.numbers)
    }
    if (symbolsToggle.checked) {
        activeSets.push(CHAR_SETS.symbols)
    }

    if (activeSets.length === 0) {
        passwordDisplay.textContent = 'Turn on least one option';
        return null;
    }

    const length =  Number(lengthSlider.value);

    let passwordChars = activeSets.map((set)=>{randomChar(set)});

    const fullPoll = activeSets.join('');
    while (passwordChars.length < length) {
        passwordChars.push(randomChar(fullPoll))
    }

    passwordChars = shuffle(passwordChars);
    return passwordChars.join('');
}

function randomChar(str) {
    const index = Math.floor(Math.random() * str.length)
    return str[index];
}

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

passwordDisplay.addEventListener('click', async()=>{
    const password = generatePassword();
    if (password) {
        passwordDisplay.textContent = password;
        passwordDisplay.classList.remove(password);
    }
});

passwordDisplay.addEventListener('click',async ()=>{
    const text = passwordDisplay.textContent;
    if (!text || text == 'click Generate' || text === 'Turn on at least one option') return ;
    try {
        await navigator.clipboard.writeText(text);
        const original = text;
        passwordDisplay.textContent = 'COPIED!';
        passwordDisplay.classList.add('copied');
        setTimeout(() => {
            passwordDisplay.textContent = original;
        },800);
    } catch (error) {
        
    }
});
