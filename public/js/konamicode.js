let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]; // Konami code sequence duh
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showCatImage();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function showCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;
            const catImageElement = document.createElement('div');
            catImageElement.innerHTML = `
                <div id="cat-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 10000; display: flex; justify-content: center; align-items: center;">
                    <img src="${catImageUrl}" alt="Random Cat" style="max-width: 90%; max-height: 90%; border: 2px solid white; border-radius: 10px;">
                    <button id="close-cat" style="position: absolute; top: 20px; right: 20px; background-color: white; color: black; border: none; padding: 10px; cursor: pointer;">Close</button>
                </div>`;
            document.body.appendChild(catImageElement);

            document.getElementById('close-cat').addEventListener('click', () => {
                document.getElementById('cat-modal').remove();
            });
        })
        .catch(err => console.error('Error fetching cat image:', err));
}
