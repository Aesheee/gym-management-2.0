document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/api/coaches')
        .then(response => response.json())
        .then(coaches => {
            const coachSelect = document.getElementById('coach-select');
            coaches.forEach(coach => {
                const option = document.createElement('option');
                option.value = coach.id;
                option.textContent = `${coach.name} - ${coach.specialty}`;
                coachSelect.appendChild(option);
            });
        });

    document.getElementById('training-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const exercise = document.getElementById('exercise').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const coachId = document.getElementById('coach-select').value;

        // Save exercise data to the backend via POST request (backend API needed)
    });
});
