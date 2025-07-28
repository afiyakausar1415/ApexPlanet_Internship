document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userMessageInput = document.getElementById('userMessage');

    const userNameError = document.getElementById('userNameError');
    const userEmailError = document.getElementById('userEmailError');
    const userMessageError = document.getElementById('userMessageError');

    const messagesList = document.getElementById('messagesList');

    // Function to handle adding a new message
    function addMessageToList(messageText, userName) {
        const newListItem = document.createElement('li');

        // Create a span for the message text
        const messageSpan = document.createElement('span');

        // *** CRITICAL CHANGE HERE: Using traditional string concatenation ***
        messageSpan.textContent = '"' + messageText + '" - ' + userName;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-message-btn'); // Add class for styling

        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            messagesList.removeChild(newListItem); // Remove the parent <li> element
        });

        // Append the span and button to the list item
        newListItem.appendChild(messageSpan);
        newListItem.appendChild(deleteButton);

        // Add the new message to the top of the list
        messagesList.prepend(newListItem);
    }

    // Add event listeners to initial pre-loaded messages (if any)
    // This ensures existing messages can also be deleted
    document.querySelectorAll('.delete-message-btn').forEach(button => {
        button.addEventListener('click', function() {
            button.closest('li').remove(); // Find the closest parent <li> and remove it
        });
    });

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous error messages
        userNameError.textContent = '';
        userEmailError.textContent = '';
        userMessageError.textContent = '';

        // 1. Validate Name
        if (userNameInput.value.trim() === '') {
            userNameError.textContent = 'Name is required.';
            isValid = false;
        }

        // 2. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userEmailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(userEmailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // 3. Validate Message
        if (userMessageInput.value.trim() === '') {
            userMessageError.textContent = 'Message is required.';
            isValid = false;
        }

        if (isValid) {
            // If all validations pass, add the message to the list
            const messageText = userMessageInput.value.trim();
            const userName = userNameInput.value.trim();

            addMessageToList(messageText, userName); // Use the new function

            alert('Thank you for your feedback!');
            feedbackForm.reset(); // Clear the form fields
        }
    });
});