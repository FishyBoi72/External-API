document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/top-tracks');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayTracks(data);
    } catch (error) {
        console.error('Fetch error:', error);
        const tracksList = document.getElementById('tracksList');
        tracksList.innerText = 'Error fetching top tracks: ' + error.message;
    }
});

function displayTracks(tracks) {
    const tracksList = document.getElementById('tracksList');
    tracksList.innerHTML = ''; // Clear previous content

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.innerHTML = `
            <p><strong>Title:</strong> ${track.title}</p>
            <p><strong>Artist:</strong> ${track.subtitle}</p>
            <hr>
        `;
        tracksList.appendChild(trackElement);
    });
}
