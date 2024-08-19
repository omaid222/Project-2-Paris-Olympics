async function fetchMedalData() {
    try {
        const response = await fetch('https://api.olympics.kevle.xyz/medals');
        const data = await response.json();

        if (data && Array.isArray(data.results)) {
            displayTop10Countries(data.results);
        } else {
            console.error('Unexpected data structure:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayTop10Countries(results) {
    const sortedResults = results.sort((a, b) => a.rank - b.rank);
    const top10 = sortedResults.slice(0, 10);

    const tableBody = document.querySelector('#medalTable tbody');

    tableBody.innerHTML = '';

    top10.forEach(entry => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${entry.rank}</td>
            <td>${entry.country.name}</td>
            <td>${entry.medals.gold}</td>
            <td>${entry.medals.silver}</td>
            <td>${entry.medals.bronze}</td>
        `;

        tableBody.appendChild(row);
    });
}

fetchMedalData();

const olympicNewsItems = [
    { title: "Team USA Wins Gold Medal in 4x100m Relay", content: "Team USA obtained a great victory in the 4x100m relay, setting a new Olympic record. Congratulations to the athletes!" },
    { title: "Records Broken of Performance in Men's Gymnastics", content: "The men's gymnastics event saw an incredible performance, with a new world record being set." },
    { title: "Great Win for Host Nation France in Football", content: "France has won the gold medal in football, marking their first Olympic gold in this sport. A gold medal in the host country." },
    { title: "Swimming Star Beats 100m Freestyle Record", content: "In a stunning display of speed, a new record was set in the 100m freestyle. What a tremendous performance by this athlete." },
    { title: "First Ever Olympic Surfing Competition", content: "The Paris 2024 Games feature surfing for the first time. Participants from around the globe exhibitied great performances." }
];


function updateNews() {
    const newsSection = document.getElementById('news');
    newsSection.innerHTML = '<h2>News</h2>'; 

    const shuffledItems = olympicNewsItems.sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, 3);

    selectedItems.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        newsElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        newsSection.appendChild(newsElement);
    });
}

updateNews();
