document.addEventListener("DOMContentLoaded", () => {
    const subscriptionForm = document.getElementById('subscription-form');
    const transactionTable = document.querySelector('#transaction-history tbody');

    subscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const plan = document.querySelector('input[name="plan"]:checked').value;

        fetch('http://localhost:3000/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, amount: plan === 'Premium' ? 20 : 5 })
        })
        .then(response => response.json())
        .then(transaction => {
            // Create a new table row
            const newRow = document.createElement('tr');

            // Add cells for each transaction detail
            const dateCell = document.createElement('td');
            dateCell.textContent = new Date().toLocaleDateString(); // Assuming you don't get a `date` field from the server.

            const planCell = document.createElement('td');
            planCell.textContent = transaction.plan;

            const amountCell = document.createElement('td');
            amountCell.textContent = `$${transaction.amount}`;

            // Append cells to the new row
            newRow.appendChild(dateCell);
            newRow.appendChild(planCell);
            newRow.appendChild(amountCell);

            // Append the new row to the transaction table
            transactionTable.appendChild(newRow);
        })
        .catch(error => console.error('Error:', error));
    });
});
