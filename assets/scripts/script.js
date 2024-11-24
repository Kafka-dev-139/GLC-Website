/* makes sidebar appear or dissapear on click */
function myFunction() {
  var x = document.getElementById("MySidebar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

/* Accordion */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


/* TEST TEST TEST */
/* Fiters ------------- Pending ------ Test */
// Get all character cards
const characterCards = document.querySelectorAll('.character-card');

// Get the no results image and message
const noResultsDiv = document.getElementById('no-results');

// Get filter buttons and reset button
const elementButtons = document.querySelectorAll('#element-buttons button');
const typeButtons = document.querySelectorAll('#type-buttons button');
const roleButtons = document.querySelectorAll('#role-buttons button'); // New role buttons
const resetButton = document.getElementById('reset-filters');

// State variables to keep track of selected filters
let selectedElement = '';
let selectedType = '';
let selectedRole = '';  // New role filter
let searchValue = '';

// Set up event listeners for search bar
document.getElementById('search-bar').addEventListener('input', function () {
  searchValue = this.value.toLowerCase();
  filterCards();
});

// Set up event listeners for element buttons
elementButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedElement = this.getAttribute('data-element');
    filterCards();
  });
});

// Set up event listeners for type buttons
typeButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedType = this.getAttribute('data-type');
    filterCards();
  });
});

// Set up event listeners for role buttons (new!)
roleButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedRole = this.getAttribute('data-role');
    filterCards();
  });
});

// Set up event listener for reset button
resetButton.addEventListener('click', function () {
  // Reset filters and search bar
  selectedElement = '';
  selectedType = '';
  selectedRole = '';  // Reset role filter
  searchValue = '';

  // Clear search input
  document.getElementById('search-bar').value = '';

  // Reset all filters
  filterCards();
});

// Filter function
function filterCards() {
  let matchFound = false;

  characterCards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const element = card.getAttribute('data-element');
    const type = card.getAttribute('data-type');
    const role = card.getAttribute('data-role');  // New role attribute

    // Check if the card matches the current filters and search term
    const matchesSearch = name.includes(searchValue);
    const matchesElement = !selectedElement || element === selectedElement;
    const matchesType = !selectedType || type === selectedType;
    const matchesRole = !selectedRole || role === selectedRole;  // New role matching

    if (matchesSearch && matchesElement && matchesType && matchesRole) {
      card.style.display = ''; // Show the card
      matchFound = true; // Mark that we found a match
    } else {
      card.style.display = 'none'; // Hide the card
    }
  });

  // If no matches are found, show the "no results" image, otherwise hide it
  if (!matchFound) {
    noResultsDiv.style.display = 'block';
  } else {
    noResultsDiv.style.display = 'none';
  }
}

/* Webhook  */

// You installed the `express` library earlier. For more information, see "[JavaScript example: Install dependencies](#javascript-example-install-dependencies)."
const express = require('express');

// This initializes a new Express application.
const app = express();

// This defines a POST route at the `/webhook` path. This path matches the path that you specified for the smee.io forwarding. For more information, see "[Forward webhooks](#forward-webhooks)."
//
// Once you deploy your code to a server and update your webhook URL, you should change this to match the path portion of the URL for your webhook.
app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {

  // Respond to indicate that the delivery was successfully received.
  // Your server should respond with a 2XX response within 10 seconds of receiving a webhook delivery. If your server takes longer than that to respond, then GitHub terminates the connection and considers the delivery a failure.
  response.status(202).send('Accepted');

  // Check the `x-github-event` header to learn what event type was sent.
  const githubEvent = request.headers['x-github-event'];

  // You should add logic to handle each event type that your webhook is subscribed to.
  // For example, this code handles the `issues` and `ping` events.
  //
  // If any events have an `action` field, you should also add logic to handle each action that you are interested in.
  // For example, this code handles the `opened` and `closed` actions for the `issue` event.
  //
  // For more information about the data that you can expect for each event type, see "[AUTOTITLE](/webhooks/webhook-events-and-payloads)."
  if (githubEvent === 'issues') {
    const data = request.body;
    const action = data.action;
    if (action === 'opened') {
      console.log(`An issue was opened with this title: ${data.issue.title}`);
    } else if (action === 'closed') {
      console.log(`An issue was closed by ${data.issue.user.login}`);
    } else {
      console.log(`Unhandled action for the issue event: ${action}`);
    }
  } else if (githubEvent === 'ping') {
    console.log('GitHub sent the ping event');
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
});

// This defines the port where your server should listen.
// 3000 matches the port that you specified for webhook forwarding. For more information, see "[Forward webhooks](#forward-webhooks)."
//
// Once you deploy your code to a server, you should change this to match the port where your server is listening.
const port = 3000;

// This starts the server and tells it to listen at the specified port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



