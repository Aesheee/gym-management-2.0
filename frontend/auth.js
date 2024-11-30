document.addEventListener("DOMContentLoaded", () => {
    // Log In Form Submission
    const loginForm = document.querySelector('.auth-form[action="/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    window.location.href = 'dashboard.html'; // Redirect after success
                } else {
                    alert('Invalid email or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in.');
            });
        });
    }

    // Registration Form Submission
    const registerForm = document.querySelector('.auth-form[action="/register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful! Please log in.');
                    window.location.href = 'login.html'; // Redirect after success
                } else {
                    alert(data.message || 'Failed to register.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during registration.');
            });
        });
    }
});
