document.addEventListener('DOMContentLoaded', () => {
    const missionContainer = document.getElementById('missions');
    const noMissionsMessage = document.getElementById('noMissionsMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    const sendMessageButton = document.getElementById('sendMessage');
    const createMissionButton = document.getElementById('createMission');
    const missionForm = document.getElementById('missionForm');
    const missionModal = new bootstrap.Modal(document.getElementById('missionModal'));
    const editMissionModal = new bootstrap.Modal(document.getElementById('editMissionModal'));
    const editMissionForm = document.getElementById('editMissionForm');
    const editMissionId = document.getElementById('editMissionId');
    const editMissionDetails = document.getElementById('editMissionDetails');
    const userRankElement = document.getElementById('userRank');
    const completedMissionsElement = document.getElementById('completedMissions');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = 'dashboard.html'; // Redirect to dashboard on successful login
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed. Please try again later.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = 'login.html'; // Redirect to login page on successful registration
                } else {
                    alert(data.error || 'Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed. Please try again later.');
            }
        });
    }

    fetch('http://localhost:3000/auth/userinfo')
        .then(response => response.json())
        .then(user => {
            userRankElement.textContent = `Rank: ${user.rank}`;
            completedMissionsElement.textContent = `Completed Missions: ${user.completedMissions}`;
        })
        .catch(error => console.error('Error fetching user info:', error));

    if (missionContainer) {
        fetch('http://localhost:3000/missions')
            .then(response => response.json())
            .then(missions => {
                if (missions.length === 0) {
                    noMissionsMessage.style.display = 'block';
                } else {
                    missions.forEach(mission => createMissionElement(mission));
                    noMissionsMessage.style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching missions:', error));
    }

    missionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const missionTitle = document.getElementById('missionTitle').value;
        const missionDetails = document.getElementById('missionDetails').value;
        const missionAgents = document.getElementById('missionAgents').value.split(',').map(agent => agent.trim());

        if (missionTitle && missionDetails) {
            const newMission = {
                title: missionTitle,
                details: missionDetails,
                agents: missionAgents,
                active: true,
                emergency: false
            };

            createMissionElement(newMission);

            fetch('http://localhost:3000/missions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMission)
            })
                .then(response => response.json())
                .then(data => console.log('Mission created:', data))
                .catch(error => console.error('Error creating mission:', error));
        }

        missionModal.hide();
    });

    sendMessageButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
        }
    });

    function createMissionElement(mission) {
        const missionElement = document.createElement('div');
        missionElement.className = 'mission card my-3';
        missionElement.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${mission.title}</h3>
                <p class="card-text">${mission.details}</p>
                <p class="card-text"><strong>Agents:</strong> ${mission.agents.join(', ')}</p>
                <button class="btn btn-warning btn-sm edit-mission">Edit</button>
                <button class="btn btn-danger btn-sm complete-mission">Complete</button>
                <button class="btn btn-info btn-sm emergency-mission">Emergency</button>
                <button class="btn btn-secondary btn-sm notify-mission">Notify</button>
                <button class="btn btn-success btn-sm add-agent">Add Agent</button>
                <button class="btn btn-danger btn-sm remove-agent">Remove Agent</button>
            </div>
        `;

        missionContainer.appendChild(missionElement);
        noMissionsMessage.style.display = 'none';
    }

    // Handle mission edit form submission
    editMissionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const missionId = editMissionId.value;
        const missionDetails = editMissionDetails.value;

        fetch(`http://localhost:3000/missions/${missionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ details: missionDetails })
        })
            .then(response => response.json())
            .then(updatedMission => {
                const missionElement = document.querySelector(`.mission[data-id="${missionId}"]`);
                missionElement.querySelector('.card-text').textContent = updatedMission.details;
                editMissionModal.hide();
            })
            .catch(error => console.error('Error updating mission:', error));
    });

    // Check if there are no active missions
    function checkNoMissions() {
        if (missionContainer.children.length === 0) {
            noMissionsMessage.style.display = 'block';
        }
    }
});