document.addEventListener("DOMContentLoaded", () => {
    const subscriptionForm = document.getElementById('subscription-form');
    const transactionTable = document.querySelector('#transaction-history tbody');

    subscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const plan = document.querySelector('input[name="plan"]:checked').value;

        fetch('http://localhost:5100/api/subscribe', {
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
        
        // Fetch transaction history from the server when the page loads
  fetch('http://localhost:5100/api/transactions')
  .then(response => response.json())
  .then(transactions => {
    transactions.forEach(transaction => {
      const newRow = document.createElement('tr');
      const dateCell = document.createElement('td');
      dateCell.textContent = transaction.date;

      const planCell = document.createElement('td');
      planCell.textContent = transaction.plan;

      const amountCell = document.createElement('td');
      amountCell.textContent = `$${transaction.amount}`;

      newRow.appendChild(dateCell);
      newRow.appendChild(planCell);
      newRow.appendChild(amountCell);

      transactionTable.appendChild(newRow);
    });
  })
  .catch(error => console.error('Error:', error));
    });
});
// Filter function
function filterTransactions(transactions, plan) {
  return transactions.filter(transaction => transaction.plan === plan);
}

// Fetch transaction history from the server when the page loads
fetch('http://localhost:5100/api/transactions')
  .then(response => response.json())
  .then(transactions => {
    const filterSelect = document.getElementById('filter-select');
    const transactionTable = document.querySelector('#transaction-history tbody');

    // Add event listener to filter select
    filterSelect.addEventListener('change', (event) => {
      const selectedPlan = event.target.value;
      const filteredTransactions = filterTransactions(transactions, selectedPlan);

      // Clear the transaction table
      transactionTable.innerHTML = '';

      // Populate the transaction table with filtered transactions
      filteredTransactions.forEach(transaction => {
        const newRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;

        const planCell = document.createElement('td');
        planCell.textContent = transaction.plan;

        const amountCell = document.createElement('td');
        amountCell.textContent = `$${transaction.amount}`;

        newRow.appendChild(dateCell);
        newRow.appendChild(planCell);
        newRow.appendChild(amountCell);

        transactionTable.appendChild(newRow);
      });
    });

    // Populate the transaction table with all transactions
    transactions.forEach(transaction => {
      const newRow = document.createElement('tr');
      const dateCell = document.createElement('td');
      dateCell.textContent = transaction.date;

      const planCell = document.createElement('td');
      planCell.textContent = transaction.plan;

      const amountCell = document.createElement('td');
      amountCell.textContent = `$${transaction.amount}`;

      newRow.appendChild(dateCell);
      newRow.appendChild(planCell);
      newRow.appendChild(amountCell);

      transactionTable.appendChild(newRow);
    });
  })
  .catch(error => console.error('Error:', error));

  const subscriptionForm = document.getElementById('subscription-form');
  const clientNameInput = document.getElementById('client-name');
  
  subscriptionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const plan = document.querySelector('input[name="plan"]:checked').value;
    const clientName = clientNameInput.value.trim();
    // Send the plan and client name to the server
    fetch('http://localhost:5100/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, clientName }),
    })
    .then(response => response.json())
    .then(transaction => {
      // Handle the transaction response
    })
    .catch(error => console.error('Error:', error));
  });
  fetch('http://localhost:5100/api/transactions')
    .then(response => response.json())
    .then(transactions => {
      const transactionTable = document.querySelector('#transaction-history tbody');
      transactions.forEach(transaction => {
        const newRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;
  
        const planCell = document.createElement('td');
        planCell.textContent = transaction.plan;
  
        const clientNameCell = document.createElement('td');
        clientNameCell.textContent = transaction.client_name;
  
        const amountCell = document.createElement('td');
        amountCell.textContent = `$${transaction.amount}`;
  
        newRow.appendChild(dateCell);
        newRow.appendChild(planCell);
        newRow.appendChild(clientNameCell);
        newRow.appendChild(amountCell);
  
        transactionTable.appendChild(newRow);
      });
    })
    .catch(error => console.error('Error:', error));