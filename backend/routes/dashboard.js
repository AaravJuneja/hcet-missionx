document.addEventListener('DOMContentLoaded', () => {
    const missionsSection = document.getElementById('missions');
    const noMissionsMessage = document.getElementById('noMissionsMessage');
    const newMissionBtn = document.getElementById('newMissionBtn');
    const startMissionBtn = document.getElementById('startMissionBtn');
    const missionTitleInput = document.getElementById('missionTitle');
    const missionDetailsInput = document.getElementById('missionDetails');
    const missionAgentsInput = document.getElementById('missionAgents');
    const missionDetailsModal = document.getElementById('missionDetailsModal');
    const saveMissionChangesBtn = document.getElementById('saveMissionChangesBtn');

    // Function to fetch and render missions
    const fetchMissions = () => {
        fetch('http://localhost:3000/missions')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch missions');
                }
            })
            .then(missions => {
                renderMissions(missions);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Function to render missions
    const renderMissions = (missions) => {
        missionsSection.innerHTML = '';
        if (missions.length === 0) {
            noMissionsMessage.style.display = 'block';
        } else {
            noMissionsMessage.style.display = 'none';
            missions.forEach((mission, index) => {
                const missionElement = createMissionElement(mission, index);
                missionsSection.appendChild(missionElement);
            });
        }
    };

    // Function to create mission element
    const createMissionElement = (mission, index) => {
        const missionElement = document.createElement('div');
        missionElement.classList.add('mission', 'mb-4', 'p-3', 'border', 'rounded', 'bg-light');
        missionElement.innerHTML = `
            <h3>${mission.title}</h3>
            <p>${mission.details}</p>
            <p>Agents: ${mission.agents.join(', ')}</p>
            <div class="btn-group" role="group">
                <button onclick="endMission(${index})" class="btn btn-danger">End Mission</button>
                <button onclick="editMission(${index})" class="btn btn-primary">Edit Mission</button>
                <button onclick="imposeEmergency(${index})" class="btn btn-danger">Impose Emergency</button>
                <button onclick="notifyAgents(${index})" class="btn btn-success">Notify Agents</button>
            </div>
            <p>Rank: ${getRank(mission.completed)}</p>
        `;
        return missionElement;
    };

    // Function to start a new mission
    newMissionBtn.addEventListener('click', () => {
        missionTitleInput.value = '';
        missionDetailsInput.value = '';
        missionAgentsInput.value = '';
        $('#newMissionModal').modal('show');
    });

    startMissionBtn.addEventListener('click', () => {
        const title = missionTitleInput.value.trim();
        const details = missionDetailsInput.value.trim();
        const agentsString = missionAgentsInput.value.trim();
        const agents = agentsString.split(',').map(agent => agent.trim());

        if (title && details && agents.length > 0) {
            fetch('http://localhost:3000/missions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, details, agents })
            })
            .then(response => {
                if (response.ok) {
                    fetchMissions();
                    $('#newMissionModal').modal('hide');
                } else {
                    throw new Error('Failed to start mission');
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            alert('Please fill all fields and assign at least one agent.');
        }
    });

    // Function to end a mission
    window.endMission = (index) => {
        fetch(`http://localhost:3000/missions/${index}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchMissions();
            } else {
                throw new Error('Failed to end mission');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    // Function to edit mission details
    window.editMission = (index) => {
        const mission = missions[index];
        missionTitleInput.value = mission.title;
        missionDetailsInput.value = mission.details;
        $('#missionDetailsModal').modal('show');
        saveMissionChangesBtn.onclick = () => {
            const title = missionTitleInput.value.trim();
            const details = missionDetailsInput.value.trim();
            if (title && details) {
                fetch(`http://localhost:3000/missions/${index}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ details })
                })
                .then(response => {
                    if (response.ok) {
                        fetchMissions();
                        $('#missionDetailsModal').modal('hide');
                    } else {
                        throw new Error('Failed to update mission details');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                alert('Please fill all fields');
            }
        };
    };

    // Function to impose emergency on a mission
    window.imposeEmergency = (index) => {
        const mission = missions[index];
        // Logic to impose emergency goes here
        console.log('Emergency imposed on mission:', mission.title);
    };

    // Function to notify agents about a mission
    window.notifyAgents = (index) => {
        const mission = missions[index];
        // Logic to notify agents goes here
        console.log('Agents notified for mission:', mission.title);
    };

    // Function to get rank based on completed missions
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

    // Initial fetch to load missions
    fetchMissions();
});