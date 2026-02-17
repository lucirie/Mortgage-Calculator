const mortgageAmmount = document.getElementById('mortgageAmmount');
const mortgageTerm = document.getElementById('mortgageTerm');
const mortgageRate = document.getElementById('mortgageRate');
const submitBtn = document.getElementById('submitBtn');
const monthlyCost = document.getElementById('monthlyCost');
const totalCost = document.getElementById('totalCost');

submitBtn.addEventListener('click', function() {
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    let inputs = validateForm();
    if (inputs) {
        document.getElementById('completed').hidden = false;
        document.getElementById('empty').hidden = true;
        if (mortgageType.value == "repayment") {
            document.getElementById("monthlyCostHeader").innerText = "Your monthly payments"
            document.getElementById("totalCostHeader").innerText = "Total you'll pay over the term"
            monthlyCost.innerText = "$" + calculateMonthly();
            totalCost.innerText = "$" + calculateTotal();
        } else if (mortgageType.value == "interest") {
            document.getElementById("monthlyCostHeader").innerText = "Your monthly interest"
            document.getElementById("totalCostHeader").innerText = "Total interest you'll pay over the term"
            monthlyCost.innerText = "$" + calculateMonthlyInterest();
            totalCost.innerText = "$" + calculateTotalInterest();
        }
    }
});

function calculateMonthly() {
    let p = Number(mortgageAmmount.value);
    let r = Number(mortgageRate.value / 100 / 12);
    let n = Number(mortgageTerm.value * 12);

    monthlyPayments = p * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
    return Math.trunc(monthlyPayments);
}

function calculateTotal() {
    let payments = Number(mortgageTerm.value) * 12;
    let totalPayments = calculateMonthly() * payments;
    return Math.trunc(totalPayments);
}


function calculateMonthlyInterest() {
    let p = Number(mortgageAmmount.value);
    let r = Number(mortgageRate.value / 100 / 12);

    let monthlyInterest = r * p;
    return monthlyInterest;
}

function calculateTotalInterest() {
    let n = Number(mortgageTerm.value * 12);
    let p = Number(mortgageAmmount.value);
    let monthlyPayment = calculateMonthly();

    let totalInterest = (monthlyPayment * n) - p;
    return totalInterest;
}

function validateInput(input, container) {
    inputGroup = container.querySelector('.input-group')
    errorDiv = container.querySelector('#error');
    label = container.querySelector('label');
    if (!input.value.trim()) {
        label.style.backgroundColor = 'red';
        label.style.color = 'white';
        inputGroup.style.outline = '1px solid red';
        errorDiv.textContent = 'This field is required';
        
        return false;
    } else {
        label.style.backgroundColor = '#E4F3FC';
        label.style.color = '#4E6E7E';
        inputGroup.style.outline = '1px solid hsl(200, 24%, 40%)';
        errorDiv.textContent = '';
        return true
    }
}

function validateMortgageType() {
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    const errorDiv = document.getElementById('mortgageTypeError');

    if (!mortgageType) {
        errorDiv.textContent = 'This field is required';
        return false;
    } else {
        errorDiv.textContent = '';
        return true;
    }
}

function validateForm() {
    termContainer = document.getElementById('termContainer');
    rateContainer = document.getElementById('rateContainer');
    amountContainer = document.getElementById('amountContainer');

    const amountValid = validateInput(mortgageAmmount, amountContainer);
    const termValid = validateInput(mortgageTerm, termContainer);
    const rateValid = validateInput(mortgageRate, rateContainer);
    const typeValid = validateMortgageType();
    
    return amountValid && termValid && rateValid && typeValid
}