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
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        `;
        routineTable.appendChild(row);

        // Add event listeners for edit and delete buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editRoutine(row, newRoutine));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteRoutine(row, newRoutine.id));

        // Clear the form fields
        document.getElementById('training-form').reset();
      })
      .catch(error => console.error(error));
  });

  // Edit a routine
  const editRoutine = (row, routine) => {
    const exerciseCell = row.cells[0];
    const setsCell = row.cells[1];
    const repsCell = row.cells[2];
    const coachCell = row.cells[3];

    // Replace content with input fields
    exerciseCell.innerHTML = `<input type="text" value="${routine.exercise}">`;
    setsCell.innerHTML = `<input type="number" value="${routine.sets}">`;
    repsCell.innerHTML = `<input type="number" value="${routine.reps}">`;

    // Add save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
      const updatedExercise = exerciseCell.querySelector('input').value;
      const updatedSets = setsCell.querySelector('input').value;
      const updatedReps = repsCell.querySelector('input').value;

      // Send update to backend
      fetch(`http://localhost:5100/api/training/${routine.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise: updatedExercise,
          sets: updatedSets,
          reps: updatedReps,
        }),
      })
        .then(response => response.json())
        .then(updatedRoutine => {
          // Update table with new values
          exerciseCell.textContent = updatedRoutine.exercise;
          setsCell.textContent = updatedRoutine.sets;
          repsCell.textContent = updatedRoutine.reps;
        })
        .catch(error => console.error(error));
    });

    // Replace delete button with save button
    const actionCell = row.cells[4];
    actionCell.innerHTML = '';
    actionCell.appendChild(saveBtn);
  };

  // Delete a routine
  const deleteRoutine = (row, routineId) => {
    fetch(`http://localhost:5100/api/training/${routineId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove row from the table
        row.remove();
      })
      .catch(error => console.error(error));
  };
});
