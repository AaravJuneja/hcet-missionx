document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const missionContainer = document.getElementById('missions');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    const sendMessageButton = document.getElementById('sendMessage');
    const missionsSection = document.getElementById('missions');
    const noMissionsMessage = document.getElementById('noMissionsMessage');
    const createMissionBtn = document.getElementById('createMissionBtn');
    const missionTitleInput = document.getElementById('missionTitle');
    const missionDetailsInput = document.getElementById('missionDetails');
    const missionAgentsInput = document.getElementById('missionAgents');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('http://hcet-missionx.onrender.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (response.ok) {
                    alert('Login successful');
                    window.location.href = 'dashboard.html';
                } else {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('http://hcet-missionx.onrender.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (response.ok) {
                    alert('Registration successful');
                    window.location.href = 'login.html';
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error);
                    });
                }
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }

    if (missionContainer) {
        fetch('http://hcet-missionx.onrender.com/missions')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch missions');
                }
            })
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
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            const message = chatInput.value;
            const sender = 'Agent'; // Replace with actual sender's name or ID

            fetch('http://hcet-missionx.onrender.com/communication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sender })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .then(newMessage => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${newMessage.sender}: ${newMessage.message}`;
                chatMessages.appendChild(messageElement);
                chatInput.value = '';
            })
            .catch(error => {
                console.error(error);
            });
        });

        fetch('http://hcet-missionx.onrender.com/communication')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch messages');
                }
            })
            .then(messages => {
                messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `${msg.sender}: ${msg.message}`;
                    chatMessages.appendChild(messageElement);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
});

function endMission(index) {
    fetch(`http://hcet-missionx.onrender.com/missions/${index}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Mission ended successfully');
            location.reload();
        } else {
            throw new Error('Error ending mission');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

let missions = [];
let editingIndex = -1;

const createMission = () => {
    const title = missionTitleInput.value.trim();
    const details = missionDetailsInput.value.trim();
    const agentsString = missionAgentsInput.value.trim();
    const agents = agentsString.split(',').map(agent => agent.trim());

    if (editingIndex === -1) {
        const mission = { title, details, agents, active: true, completed: 0 };
        missions.push(mission);
    } else {
        missions[editingIndex].title = title;
        missions[editingIndex].details = details;
        missions[editingIndex].agents = agents;
        editingIndex = -1;
    }

    renderMissions();
    $('#newMissionModal').modal('hide');
    createMissionBtn.innerHTML = 'Create';
    missionTitleInput.value = '';
    missionDetailsInput.value = '';
    missionAgentsInput.value = '';
};

const renderMissions = () => {
    missionsSection.innerHTML = '';
    if (missions.length === 0) {
        noMissionsMessage.style.display = 'block';
    } else {
        noMissionsMessage.style.display = 'none';
        missions.forEach((mission, index) => {
            const missionElement = document.createElement('div');
            missionElement.classList.add('mission', 'mb-4', 'p-3', 'border', 'rounded', 'bg-light');
            missionElement.innerHTML = `
                                <h3>${mission.title}</h3>
                <p>${mission.details}</p>
                <p>Agents: ${mission.agents.join(', ')}</p>
                <div class="btn-group" role="group">
                    <button onclick="endMission(${index})" class="btn btn-danger">End Mission</button>
                    <button onclick="editMission(${index})" class="btn btn-primary">Edit Mission</button>
                    <button onclick="addAgent(${index})" class="btn btn-info">Add Agent</button>
                    <button onclick="removeAgent(${index})" class="btn btn-warning">Remove Agent</button>
                    <button onclick="imposeEmergency(${index})" class="btn btn-danger">Impose Emergency</button>
                    <button onclick="notifyAgents(${index})" class="btn btn-success">Notify Agents</button>
                </div>
                <p>Rank: ${getRank(mission.completed)}</p>
            `;
            missionsSection.appendChild(missionElement);
        });
    }
};

const editMission = (index) => {
    const mission = missions[index];
    missionTitleInput.value = mission.title;
    missionDetailsInput.value = mission.details;
    missionAgentsInput.value = mission.agents.join(', ');
    $('#newMissionModal').modal('show');
    createMissionBtn.innerHTML = 'Save Changes';
    editingIndex = index;
};

const addAgent = (index) => {
    const agent = prompt("Enter the name of the agent to add:");
    if (agent) {
        missions[index].agents.push(agent.trim());
        renderMissions();
    }
};

const removeAgent = (index) => {
    const agent = prompt("Enter the name of the agent to remove:");
    if (agent) {
        missions[index].agents = missions[index].agents.filter(a => a !== agent.trim());
        renderMissions();
    }
};

const imposeEmergency = (index) => {
    alert(`Emergency imposed on mission: ${missions[index].title}`);
};

const notifyAgents = (index) => {
    alert(`Agents notified for mission: ${missions[index].title}`);
};

const getRank = (completed) => {
    if (completed >= 50) return 'Radiant';
    if (completed >= 40) return 'Immortal';
    if (completed >= 30) return 'Ascendant';
    if (completed >= 20) return 'Diamond';
    if (completed >= 15) return 'Platinum';
    if (completed >= 10) return 'Gold';
    if (completed >= 5) return 'Silver';
    if (completed >= 3) return 'Bronze';
    return 'Iron';
};