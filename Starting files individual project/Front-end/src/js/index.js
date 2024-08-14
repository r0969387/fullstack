
    // Function to fetch seasonal produce from the API
    const fetchSeasonalProduce = () => {
        const url = "https://my-json-server.typicode.com/r0969387/fake/products";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched produce data:", data);
                const produceList = document.getElementById("produce_listed");
                if (produceList) {
                    produceList.innerHTML = ''; // Clear any existing content
                    data.forEach(produce => {
                        const produceItem = document.createElement("div");
                        produceItem.className = "col-md-4 mb-4";
                        produceItem.innerHTML = `
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${produce.name}</h5>
                                    <p class="card-text">Season: ${produce.season}</p>
                                    <p class="card-text">Price: $${produce.price_per_kg.toFixed(2)} per kg</p>
                                    <p class="card-text">Availability: ${produce.availability}</p>
                                    <p class="card-text">${produce.description}</p>
                                </div>
                            </div>
                        `;
                        produceList.appendChild(produceItem);
                    });
                } else {
                    console.error("Produce list container not found.");
                }
            })
            .catch(error => {
                console.log("Error fetching produce:", error);
                const produceList = document.getElementById("produce_listed");
                if (produceList) {
                    produceList.innerHTML = `<p>There was an error fetching the seasonal produce. Please try again later. Error: ${error.message}</p>`;
                }
            });
    };

    fetchSeasonalProduce();

    // Function to fetch events from the API
    // Function to fetch events from the API
    const fetchEvents = () => {
        const url = "https://my-json-server.typicode.com/r0969387/fake/events";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched events data:", data);
                const eventList = document.getElementById("events_listed");
                if (eventList) {
                    eventList.innerHTML = ''; // Clear any existing content
                    data.forEach((event, index) => {
                        const eventItem = document.createElement("div");
                        eventItem.className = `carousel-item${index === 0 ? ' active' : ''}`; // Add 'active' class to the first item
                        eventItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.description}</p>
                                <p class="card-text"><small class="text-muted">Date: ${event.event_date}, Time: ${event.event_time}</small></p>
                                <p class="card-text"><small class="text-muted">Location: ${event.location}</small></p>
                            </div>
                        </div>
                    `;
                        eventList.appendChild(eventItem);
                    });
                } else {
                    console.error("Event list container not found.");
                }
            })
            .catch(error => {
                console.log("Error fetching events:", error);
                const eventList = document.getElementById("events_listed");
                if (eventList) {
                    eventList.innerHTML = `<p>There was an error fetching the events. Please try again later. Error: ${error.message}</p>`;
                }
            });
    };
    fetchEvents();


    //POST
    //POST
    const submitButton = document.getElementById("send");

    const postContact = (name, email, message) => {
        console.log("Attempting to post contact data...");

        // Build request body
        const body = { name, email, message };
        console.log("Request body:", body);

        // URL to send data to
        const url = "http://127.0.0.1:3210/contact";

        // Options for the fetch() method
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        console.log("Fetch options:", options);

        fetch(url, options)
            .then((response) => {
                console.log("Received response:", response);
                // Check if response is OK
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data received:", data);
                // Check the structure of the received data
                document.getElementById("output").innerHTML = `<p>Thank you! We will contact you back as soon as possible!</p>`;
            })
            .catch((error) => {
                console.error("Error occurred during fetch:", error);
                // Provide user feedback
                document.getElementById("output").innerHTML = `<p>Please try again!</p>`;
            });
    };

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Submit button clicked");

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        console.log("Form values - Name:", name, "Email:", email, "Message:", message);

        postContact(name, email, message);
    });

