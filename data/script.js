// Fetch data from JSON file
fetch("data/events.json")
  .then(response => response.json())
  .then(events => {
    const eventsContainer = document.querySelector(".events");

    // Display existing events
    events.forEach(event => {
      const eventCard = createEventCard(event);
      eventsContainer.appendChild(eventCard);
    });

    // Add event button click handler
    const addEventButton = document.getElementById("addEvent");
    addEventButton.addEventListener("click", () => {
      const titleInput = document.getElementById("title").value;
      // Get other input field values similarly

      // Create new event object
      const newEvent = {
        title: titleInput,
        // Add other properties
      };

      // Add new event to the JSON array
      events.push(newEvent);

      // Update the JSON file
      updateJSONFile(events);

      // Create and append event card
      const newEventCard = createEventCard(newEvent);
      eventsContainer.appendChild(newEventCard);
    });

    // Helper function to create an event card
    function createEventCard(event) {
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");

      const titleElement = document.createElement("h3");
      titleElement.textContent = event.title;

      // Add other event details to the card

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        // Find index of the event to be deleted
        const index = events.findIndex(e => e.title === event.title);
        if (index !== -1) {
          events.splice(index, 1);
          updateJSONFile(events);
          eventCard.remove();
        }
      });

      eventCard.appendChild(titleElement);
      // Append other event details
      eventCard.appendChild(deleteButton);

      return eventCard;
    }

    // Helper function to update the JSON file
    function updateJSONFile(data) {
      fetch("data/events.json", {
        method: "PUT", // Use "POST" for creating new data
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  })
  .catch(error => console.error("Error fetching data:", error));
