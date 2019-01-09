
// Listen for submit
document.querySelector("#loan-form").addEventListener('submit', (e) => {

    // Hide results
    document.querySelector('#results').style.display = 'none';

    // Show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(() => {
        calculateResults();
    }, 1000);
    e.preventDefault();
});

// Calculate Results
function calculateResults(e) {

    // UI variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    // Logic
    const principal = parseFloat(amount.value);
    const calcylatedInterset = parseFloat(interest.value)  / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calcylatedInterset, calculatePayments);
    const monthly = (principal*x*calcylatedInterset)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly *calculatePayments).toFixed(2);
        totalInterest.value = ((monthly* calculatePayments)-principal).toFixed(2);
        console.log("fire !");
        
        // Show results
        document.querySelector('#results').style.display = 'block';
    } else {
        showError('Please cheak your number');
    }
    
    // Hide loader
    document.querySelector('#loading').style.display = 'none';


}

// Show Error
function showError(error) {
    // Create a div
    const errDiv = document.createElement('div');
    
    // Get elemnts
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errDiv, heading);

    // Clear error after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1500);
}