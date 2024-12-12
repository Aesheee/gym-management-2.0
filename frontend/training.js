document.addEventListener("DOMContentLoaded", () => {
 // Fetch and populate coaches
 fetch('http://localhost:5000/api/coaches') // Assuming your server is running on port 3000
.then(response => response.json())

.then(coaches => {
 const coachSelect = document.getElementById('coach');
 coaches.forEach(coach => {
 const option = document.createElement('option');
 option.value = coach.id; // Use coach.id for backend identification

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
 fetch('http://localhost:5000/api/training', { // Assuming your server is running on port 3000
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ exercise, sets, reps, coachId })

 })
 .then(response => response.json())
 .then(training => {
 const routineList = document.getElementById('training-routine');
 const routineItem = document.createElement('li');
 routineItem.textContent = `${training.exercise} - ${training.sets} sets of ${training.reps} reps (Coach: ${training.coachName})`;
 routineList.appendChild(routineItem);
 // Clear the form after adding the exercise to the routine
 document.getElementById('training-form').reset();
 });

 });
 });


