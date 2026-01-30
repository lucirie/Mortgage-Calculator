const mortgageAmmount = document.getElementById('mortgageAmmount');
const mortgageTerm = document.getElementById('mortgageTerm');
const mortgageRate = document.getElementById('mortgageRate');
const submitBtn = document.getElementById('submitBtn');
const monthlyCost = document.getElementById('monthlyCost');
const totalCost = document.getElementById('totalCost');

submitBtn.addEventListener('click', function() {
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    let inputs = checkInputs();
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