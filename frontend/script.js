document.addEventListener('DOMContentLoaded', () => {
    const missionContainer = document.getElementById('missions');
    const noMissionsMessage = document.getElementById('noMissionsMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendMessageButton = document.getElementById('sendMessage');
    const createMissionButton = document.getElementById('createMission');
    const missionForm = document.getElementById('missionForm');
    const missionModal = new bootstrap.Modal(document.getElementById('missionModal'));
    const editMissionModal = new bootstrap.Modal(document.getElementById('editMissionModal'));
    const editMissionForm = document.getElementById('editMissionForm');
    const editMissionId = document.getElementById('editMissionId');
    const editMissionDetails = document.getElementById('editMissionDetails');

    // Fetch and display missions
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

    // Handle mission creation
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

            // Send mission to the server
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

    // Handle chat message sending
    sendMessageButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
        }
    });

    // Create mission element
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

        // Edit mission button
        missionElement.querySelector('.edit-mission').addEventListener('click', () => {
            editMissionId.value = mission._id;
            editMissionDetails.value = mission.details;
            editMissionModal.show();
        });

        // Complete mission button
        missionElement.querySelector('.complete-mission').addEventListener('click', () => {
            fetch(`http://localhost:3000/missions/${mission._id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => {
                    missionElement.remove();
                    checkNoMissions();
                })
                .catch(error => console.error('Error completing mission:', error));
        });

        // Emergency mission button
        missionElement.querySelector('.emergency-mission').addEventListener('click', () => {
            fetch(`http://localhost:3000/missions/${mission._id}/emergency`, {
                method: 'PUT'
            })
                .then(response => response.json())
                .then(updatedMission => {
                    console.log('Mission set to emergency:', updatedMission);
                    // Optionally, add UI changes for emergency state
                })
                .catch(error => console.error('Error setting emergency:', error));
        });

        // Notify mission button
        missionElement.querySelector('.notify-mission').addEventListener('click', () => {
            fetch(`http://localhost:3000/missions/${mission._id}/notify`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => console.log('Notification sent:', data))
                .catch(error => console.error('Error notifying agents:', error));
        });

        // Add agent button
        missionElement.querySelector('.add-agent').addEventListener('click', () => {
            const agent = prompt('Enter agent name:');
            if (agent) {
                fetch(`http://localhost:3000/missions/${mission._id}/add-agent`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ agent })
                })
                    .then(response => response.json())
                    .then(updatedMission => {
                        mission.agents.push(agent);
                        missionElement.querySelector('.card-text').innerHTML = `<strong>Agents:</strong> ${mission.agents.join(', ')}`;
                    })
                    .catch(error => console.error('Error adding agent:', error));
            }
        });

        // Remove agent button
        missionElement.querySelector('.remove-agent').addEventListener('click', () => {
            const agent = prompt('Enter agent name to remove:');
            if (agent) {
                fetch(`http://localhost:3000/missions/${mission._id}/remove-agent`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ agent })
                })
                    .then(response => response.json())
                    .then(updatedMission => {
                        mission.agents = mission.agents.filter(a => a !== agent);
                        missionElement.querySelector('.card-text').innerHTML = `<strong>Agents:</strong> ${mission.agents.join(', ')}`;
                    })
                    .catch(error => console.error('Error removing agent:', error));
            }
        });

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
                document.querySelector(`.mission[data-id="${missionId}"] .card-text`).textContent = updatedMission.details;
                editMissionModal.hide();
            })
            .catch(error => console.error('Error updating mission:', error));
    });

    // Check if there are no missions
    function checkNoMissions() {
        if (missionContainer.querySelectorAll('.mission').length === 0) {
            noMissionsMessage.style.display = 'block';
        }
    }

    // Logout function
    function logout() {
        console.log('User logged out');
        window.location.href = 'login.html';
    }
});