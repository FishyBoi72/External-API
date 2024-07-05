document.getElementById('statusCodeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const statusCode = document.getElementById('statusCode').value.trim();

    try {
        const response = await fetch(`/http-cat/${statusCode}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayCatImage(data.imageSrc);
    } catch (error) {
        console.error('Fetch error:', error);
        const catImage = document.getElementById('catImage');
        catImage.innerHTML = 'Error: That code doesn\'t exist!';
    }
});

function displayCatImage(imageSrc) {
    const catImage = document.getElementById('catImage');
    catImage.innerHTML = `<img src="${imageSrc}" alt="HTTP Cat Image">`;
}
