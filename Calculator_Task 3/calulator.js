let input = document.getElementById('display');

function insertValue(val) {
  input.value += val;
}

function clearDisplay() {
  input.value = '';
}

function deleteLast() {
  input.value = input.value.slice(0, -1);
}

function calculate() {
  try {
    input.value = eval(input.value);
  } catch (error) {
    input.value = 'Error';
  }
}
