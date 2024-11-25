document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/api/coaches')
        .then(response => response.json())
        .then(coaches => {
            const coachList = document.getElementById('coach-list');
            coaches.forEach(coach => {
                const coachItem = document.createElement('li');
                coachItem.textContent = `${coach.name} - ${coach.specialty}`;
                coachList.appendChild(coachItem);
            });
        });

    document.getElementById('add-coach-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const coachName = document.getElementById('coach-name').value;
        const coachSpecialty = document.getElementById('coach-specialty').value;

        fetch('http://localhost:5000/api/coaches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: coachName, specialty: coachSpecialty })
        })
        .then(response => response.json())
        .then(newCoach => {
            const coachList = document.getElementById('coach-list');
            const coachItem = document.createElement('li');
            coachItem.textContent = `${newCoach.name} - ${newCoach.specialty}`;
            coachList.appendChild(coachItem);
        });
    });
});
