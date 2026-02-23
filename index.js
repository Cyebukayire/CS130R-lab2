const operators = {
  '+': (a, b) => a.plus(b),
  '-': (a, b) => a.minus(b),
  '*': (a, b) => a.times(b),
  '/': (a, b) => {
    if (b.eq(0)) throw new Error("Division by zero");
    return a.div(b);
  },
};

class Calculator {
  constructor() {
    this.displayElement = document.querySelector('.display');

    this._display = '0';
    this._firstOperand = null;
    this._operator = null;
    this._secondOperand = null;
    this.isDecimalUsed = false;

    this.updateDisplay();
    this.attachEvents();
  }

  /* ======================
      DISPLAY
  ====================== */

  updateDisplay() {
    this.displayElement.textContent = this._display;
  }

  set display(value) {
    this._display = value;
    this.updateDisplay();
  }

  get display() {
    return this._display;
  }

  /* ======================
      INPUT NUMBERS
  ====================== */

  inputNumber(value) {
    if (!this._operator) {
      if (!this._firstOperand) {
        this._firstOperand = value;
      } else {
        this._firstOperand += value;
      }
      this.display = this._firstOperand;
    } else {
      if (!this._secondOperand) {
        this._secondOperand = value;
      } else {
        this._secondOperand += value;
      }
      this.display = this._secondOperand;
    }
  }

  inputDecimal() {
    if (this.isDecimalUsed) return;

    this.isDecimalUsed = true;

    if (!this._operator) {
      if (!this._firstOperand) {
        this._firstOperand = '0.';
      } else {
        this._firstOperand += '.';
      }
      this.display = this._firstOperand;
    } else {
      if (!this._secondOperand) {
        this._secondOperand = '0.';
      } else {
        this._secondOperand += '.';
      }
      this.display = this._secondOperand;
    }
  }

  /* ======================
      OPERATORS
  ====================== */

  chooseOperator(op) {
    if (!this._firstOperand) return;

    if (this._secondOperand) {
      this.equals();
    }

    this._operator = op;
    this.isDecimalUsed = false;
  }

  equals() {
    if (!this._firstOperand || !this._operator || !this._secondOperand) return;

    try {
      const first = new Big(this._firstOperand);
      const second = new Big(this._secondOperand);

      const result = operators[this._operator](first, second).toString();

      this._firstOperand = result;
      this._operator = null;
      this._secondOperand = null;
      this.isDecimalUsed = result.includes('.');

      this.display = result;
    } catch (err) {
      this.display = "Error";
      this.clear();
    }
  }

  /* ======================
      FUNCTIONS
  ====================== */

  clear() {
    this._firstOperand = null;
    this._operator = null;
    this._secondOperand = null;
    this.isDecimalUsed = false;
    this.display = '0';
  }

  back() {
    if (!this._operator) {
      if (!this._firstOperand) return;

      this._firstOperand = this._firstOperand.slice(0, -1);
      this.display = this._firstOperand || '0';
    } else {
      if (!this._secondOperand) return;

      this._secondOperand = this._secondOperand.slice(0, -1);
      this.display = this._secondOperand || '0';
    }
  }

  signSwitch() {
    if (!this._operator) {
      if (!this._firstOperand) return;

      if (this._firstOperand.startsWith('-')) {
        this._firstOperand = this._firstOperand.slice(1);
      } else {
        this._firstOperand = '-' + this._firstOperand;
      }

      this.display = this._firstOperand;
    } else {
      if (!this._secondOperand) return;

      if (this._secondOperand.startsWith('-')) {
        this._secondOperand = this._secondOperand.slice(1);
      } else {
        this._secondOperand = '-' + this._secondOperand;
      }

      this.display = this._secondOperand;
    }
  }

  /* ======================
      EVENT LISTENERS
  ====================== */

  attachEvents() {
    document.querySelectorAll('.num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (value === '') return;

        if (value === '.') {
          this.inputDecimal();
        } else {
          this.inputNumber(value);
        }
      });
    });

    document.querySelectorAll('.operator-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (value === '=') {
          this.equals();
        } else {
          this.chooseOperator(value);
        }
      });
    });

    document.querySelectorAll('.func-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (value === 'AC') {
          this.clear();
        } else if (value === 'Back') {
          this.back();
        } else if (value === '+/-') {
          this.signSwitch();
        }
      });
    });
  }
}

/* ======================
    INITIALIZE
====================== */

new Calculator();