
const screen = document.getElementById("calculatorScreen");
const stepsList = document.getElementById("stepsList");


function appendValue(value) {
  screen.value += value;
}


function clearScreen() {
  screen.value = "";
  stepsList.innerHTML = "";
}


function calculate() {
  try {
    const expression = screen.value;
    const result = eval(expression);
    
    
    stepsList.innerHTML = "";

   
    const operations = expression.match(/[\+\-\*\/]/g);
    const numbers = expression.split(/[\+\-\*\/]/g).map(num => parseFloat(num));

    if (operations && numbers.length > 1) {
      for (let i = 0; i < operations.length; i++) {
        const operator = operations[i];
        const num1 = numbers[i];
        const num2 = numbers[i + 1];
        let operationName = "";
        let symbol = "";

        switch(operator) {
          case '+':
            operationName = "Suma";
            symbol = "+";
            break;
          case '-':
            operationName = "Resta";
            symbol = "−";
            break;
          case '*':
            operationName = "Multiplicación";
            symbol = "×";
            break;
          case '/':
            operationName = "División";
            symbol = "÷";
            break;
          default:
            operationName = "Operación";
            symbol = operator;
        }

        const intermediateResult = calculateIntermediate(numbers.slice(0, i + 2), operations.slice(0, i + 1));
        stepsList.innerHTML += `<li>${operationName} de ${num1} ${symbol} ${num2} = ${intermediateResult}</li>`;
      }
    } else {
      stepsList.innerHTML = `<li>Operación simple: ${expression} = ${result}</li>`;
    }

   
    stepsList.innerHTML += `<li><strong>Resultado final: ${result}</strong></li>`;
    screen.value = result;
  } catch {
    screen.value = "Error";
    stepsList.innerHTML = "<li>Error: Verifica la operación.</li>";
  }
}


function calculateIntermediate(numbers, operators) {
  let tempExpression = "";
  for (let i = 0; i < operators.length; i++) {
    tempExpression += numbers[i] + operators[i];
  }
  tempExpression += numbers[operators.length];
  return eval(tempExpression);
}


const conversionType = document.getElementById("conversionType");
const conversionOptions = document.getElementById("conversionOptions");
const inputValue = document.getElementById("inputValue");
const conversionResult = document.getElementById("conversionResult");
const conversionStepsList = document.getElementById("conversionStepsList");


function updateConversionOptions() {
  const type = conversionType.value;
  conversionOptions.innerHTML = "";

  let options = [];
  if (type === "distance") {
    options = [
      { label: "Kilómetros a Millas", value: "kmToMiles", formula: (val) => val * 0.621371 },
      { label: "Millas a Kilómetros", value: "milesToKm", formula: (val) => val / 0.621371 }
    ];
  } else if (type === "volume") {
    options = [
      { label: "Litros a Galones", value: "litersToGallons", formula: (val) => val * 0.264172 },
      { label: "Galones a Litros", value: "gallonsToLiters", formula: (val) => val / 0.264172 }
    ];
  } else if (type === "temperature") {
    options = [
      { label: "Celsius a Fahrenheit", value: "celsiusToFahrenheit", formula: (val) => (val * 9/5) + 32 },
      { label: "Fahrenheit a Celsius", value: "fahrenheitToCelsius", formula: (val) => (val - 32) * 5/9 }
    ];
  }

  options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    conversionOptions.appendChild(opt);
  });
}


function convert() {
  const type = conversionType.value;
  const selectedOption = conversionOptions.value;
  const value = parseFloat(inputValue.value);
  
  conversionStepsList.innerHTML = "";

  if (isNaN(value)) {
    conversionResult.textContent = "Por favor, ingresa un valor válido.";
    return;
  }

  let result = 0;
  let step1 = "";
  let step2 = "";
  let step3 = "";

  if (type === "distance") {
    if (selectedOption === "kmToMiles") {
      step1 = `Convierte kilómetros a millas.`;
      step2 = `Multiplica ${value} km por 0.621371.`;
      result = value * 0.621371;
      step3 = `${value} km × 0.621371 = ${result.toFixed(2)} millas.`;
    } else if (selectedOption === "milesToKm") {
      step1 = `Convierte millas a kilómetros.`;
      step2 = `Divide ${value} millas por 0.621371.`;
      result = value / 0.621371;
      step3 = `${value} millas ÷ 0.621371 = ${result.toFixed(2)} km.`;
    }
  } else if (type === "volume") {
    if (selectedOption === "litersToGallons") {
      step1 = `Convierte litros a galones.`;
      step2 = `Multiplica ${value} litros por 0.264172.`;
      result = value * 0.264172;
      step3 = `${value} litros × 0.264172 = ${result.toFixed(2)} galones.`;
    } else if (selectedOption === "gallonsToLiters") {
      step1 = `Convierte galones a litros.`;
      step2 = `Divide ${value} galones por 0.264172.`;
      result = value / 0.264172;
      step3 = `${value} galones ÷ 0.264172 = ${result.toFixed(2)} litros.`;
    }
  } else if (type === "temperature") {
    if (selectedOption === "celsiusToFahrenheit") {
      step1 = `Convierte Celsius a Fahrenheit.`;
      step2 = `Multiplica ${value}°C por 9/5 y suma 32.`;
      result = (value * 9/5) + 32;
      step3 = `${value}°C × 9/5 + 32 = ${result.toFixed(2)}°F.`;
    } else if (selectedOption === "fahrenheitToCelsius") {
      step1 = `Convierte Fahrenheit a Celsius.`;
      step2 = `Resta 32 a ${value}°F y multiplica el resultado por 5/9.`;
      result = (value - 32) * 5/9;
      step3 = `(${value}°F − 32) × 5/9 = ${result.toFixed(2)}°C.`;
    }
  }

  conversionStepsList.innerHTML = `
    <li>${step1}</li>
    <li>${step2}</li>
    <li>${step3}</li>
  `;

  conversionResult.textContent = `Resultado: ${result.toFixed(2)}`;
}


updateConversionOptions();
