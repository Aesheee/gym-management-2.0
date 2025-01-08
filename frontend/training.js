document.addEventListener("DOMContentLoaded", () => {
  // Fetch and populate coaches
  fetch('http://localhost:5100/api/coaches')
    .then(response => response.json())
    .then(coaches => {
      const coachSelect = document.getElementById('coach');
      coaches.forEach(coach => {
        const option = document.createElement('option');
        option.value = coach.id;
        option.textContent = `${coach.name} - ${coach.specialty}`;
        coachSelect.appendChild(option);
      });
    });

  // Add training routine submission handling
  document.getElementById('training-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const coachId = document.getElementById('coach').value;

    // Save exercise data to the backend via POST request
    fetch('http://localhost:5100/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercise, sets, reps, coachId })
    })
      .then(response => response.json())
      .then(newRoutine => {
        // Display alert message
        alert(`Routine created: ${newRoutine.exercise} - ${newRoutine.sets} sets of ${newRoutine.reps} reps (Coach: ${newRoutine.coachName})`);

        // Add the new routine to the table
        const routineTable = document.getElementById('routine-table-body');
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${newRoutine.exercise}</td>
          <td>${newRoutine.sets}</td>
          <td>${newRoutine.reps}</td>
          <td>${newRoutine.coachName}</td>
        `;
        routineTable.appendChild(row);

        // Clear the form fields
        document.getElementById('training-form').reset();
      })
      .catch(error => console.error(error));
  });
});
