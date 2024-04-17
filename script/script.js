document.addEventListener('DOMContentLoaded', function() {
    const studentInfo = document.getElementById('studentInfo');
  studentInfo.innerText = 'Student ID: 200520843 - Name: Saharsh Viren Patel';
    //Im not able to connect 2 apis but 1 is working
    document.getElementById('loadImage').addEventListener('click', function() {
        fetchImage('nature'); 
    });

    document.getElementById('loadJokes').addEventListener('click', function() {
        fetchDadJokes(3); // fetches 3 dad jokes
    });
});

function fetchImage(category) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/randomimage?category=${category}`,
        headers: { 'X-Api-Key': 'TX/KXVFXYJ2yoRcfmNrCxQ==Mll88wkSKKfHB6BS' }, 
        success: function(result) {
            console.log(result);
            if (result.url) {
                displayImage(result.url);
            } else {
                console.log("No image available.");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching image:', jqXHR.responseText || errorThrown);
        }
    });
}

function fetchDadJokes(limit) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/dadjokes?limit=${limit}`,
        headers: { 'X-Api-Key': 'TX/KXVFXYJ2yoRcfmNrCxQ==Mll88wkSKKfHB6BS' }, 
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            displayJokes(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching jokes:', jqXHR.responseText || errorThrown);
        }
    });
}

function displayImage(imageUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Random Image';
    img.style.maxWidth = '100%'; // Ensure the image fits within the container
    imageContainer.appendChild(img);
}

function displayJokes(jokes) {
    const jokesContainer = document.getElementById('jokesContainer');
    jokesContainer.innerHTML = ''; // Clear previous jokes
    jokes.forEach(joke => {
        const p = document.createElement('p');
        p.textContent = joke.joke;
        jokesContainer.appendChild(p);
    });
}
