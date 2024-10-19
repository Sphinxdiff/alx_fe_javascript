// Array of quote objects, each with a text and category
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Productivity" },
    { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    const { text, category } = quotes[randomIndex];
    quoteDisplay.textContent = `"${text}" - ${category}`;
}

// Function to create and display the 'Add Quote' form
function createAddQuoteForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="quoteText" placeholder="Enter quote" required>
        <input type="text" id="quoteCategory" placeholder="Enter category" required>
        <button type="submit">Add Quote</button>
    `;
    document.body.appendChild(form);

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        const text = document.getElementById('quoteText').value.trim();
        const category = document.getElementById('quoteCategory').value.trim();
        if (text && category) {
            quotes.push({ text, category });
            alert('Quote added successfully!');
            form.reset();
        } else {
            alert('Please enter both quote and category.');
        }
    });
}

// Initialize the application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote(); // Display a quote when the page loads

    const newQuoteButton = document.getElementById('newQuote');
    newQuoteButton.addEventListener('click', showRandomQuote); // Show new quote on button click

    createAddQuoteForm(); // Create the form for adding new quotes
});
