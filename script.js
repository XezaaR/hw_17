(()=>{
    const form = document.getElementById('travel-form');
    const saveButton = document.getElementById('save-button');
    const travelList = document.getElementById('travel-list');

    let travelData = [];

// Function to render the travel data list
    function renderList() {

        travelList.innerHTML = '';

        // Create a list item for each object
        for (const data of travelData) {
            const li = document.createElement('li');

            li.innerHTML = `
          <b>From ${data.city} to ${data.country}</b>
          <i class="bi bi-pencil-square edit"></i>
          <i class="bi bi-x-circle remove delete-button" data-index="${data.index}"></i>
          <i class="bi bi-three-dots-vertical details"></i><br>
          Expected budget: ${data.budget} ILS<br>
          ${data.startDate}  -  ${data.endDate} | ${data.persons} persons |
          ${data.transferType}
        `;

            travelList.appendChild(li);
            form.reset();
        }
    }

// Event listener to the save button to handle clicks/ adding elements to the array
    saveButton.addEventListener('click', () => {

        const city = form.elements.city.value;
        const country = form.elements.country.value;
        const budget = form.elements.budget.value;
        const startDate = form.elements.startDate.value;
        const endDate = form.elements.endDate.value;
        const persons = form.elements.persons.value;
        const transferType = form.elements.transferType.value;
        const time = new Date();

        travelData.push({
            city,
            country,
            budget,
            startDate,
            endDate,
            persons,
            transferType,
            time,
            index: travelData.length,  // Index property to each object
        });
        
        renderList();

    });

// Event listener to handle clicks 
    travelList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            // Get the index of the item to be deleted
            const index = event.target.dataset.index;

            // Remove the item from the travelData array
            travelData = travelData.filter(data => data.index != index);

            renderList();
        }
        // Details
        if (event.target.classList.contains('details')) {
            
            const li = event.target.parentNode;

            const index = Array.from(travelList.children).indexOf(li);

            const {city, country, persons,
                transferType, time} = travelData[index];

            const timeString = time.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                weekday: 'long'
            });
            alert(`City: ${city}\nCountry: ${country}\nPersons: ${persons}\nTransfer: ${transferType}\nTime: ${timeString}
                `);
        }
    });

// Function to sort the travelData array based on a selected value
    function sortData(value) {
        travelData.sort((a, b) => {
            switch (value) {
                case 'date_added':
                    return a.time - b.time;
                case 'budget':
                    return a.budget - b.budget;
                case 'date':
                    return a.startDate - b.startDate;
                case 'persons':
                    return a.persons - b.persons;
            }
        });
        renderList();
    }
// Get the selected value of the sort type
    const dropdown  = document.getElementById('sort_type');
    dropdown.addEventListener('change',()=>{
        const value = dropdown.value;
        sortData(value);
    })


})()
