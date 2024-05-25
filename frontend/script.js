document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const missionContainer = document.getElementById('missions');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    const sendMessageButton = document.getElementById('sendMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful');
                window.location.href = 'dashboard.html';
            } else {
                alert(data.error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert(data.error);
            }
        });
    }

    if (missionContainer) {
        fetch('http://localhost:3000/missions')
            .then(response => response.json())
            .then(missions => {
                missions.forEach(mission => {
                    const missionElement = document.createElement('div');
                    missionElement.classList.add('mission');
                    missionElement.innerHTML = `
                        <h3>${mission.title}</h3>
                        <p>${mission.details}</p>
                        <button onclick="endMission('${mission._id}')">End Mission</button>
                        <button>Add Agent</button>
                        <button>Remove Agent</button>
                        <button>Impose Emergency</button>
                        <button>Notify Agents</button>
                        <button>Edit Mission Details</button>
                    `;
                    missionContainer.appendChild(missionElement);
                });
            });
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', async () => {
            const message = chatInput.value;
            const sender = 'Agent'; // Replace with actual sender's name or ID

            const response = await fetch('http://localhost:3000/communication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sender })
            });

            const newMessage = await response.json();
            const messageElement = document.createElement('div');
            messageElement.textContent = `${newMessage.sender}: ${newMessage.message}`;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
        });

        fetch('http://localhost:3000/communication')
            .then(response => response.json())
            .then(messages => {
                messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `${msg.sender}: ${msg.message}`;
                    chatMessages.appendChild(messageElement);
                });
            });
    }
});

async function endMission(id) {
    const response = await fetch(`http://localhost:3000/missions/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Mission ended successfully');
        location.reload();
    } else {
        alert('Error ending mission');
    }
}