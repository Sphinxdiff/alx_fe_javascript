// Array of quote objects, each with a text and category
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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

    // Store last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify({ text, category }));
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
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
            alert('Quote added successfully!');
            form.reset();
        } else {
            alert('Please enter both quote and category.');
        }
    });
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const jsonBlob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importQuotes(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedQuotes = JSON.parse(e.target.result);
            quotes = [...quotes, ...importedQuotes]; // Merge with existing quotes
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
            showRandomQuote(); // Update display
        };
        reader.readAsText(file);
    }
}

// Initialize the application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote(); // Display a quote when the page loads

    // New quote button functionality
    const newQuoteButton = document.getElementById('newQuote');
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Create the form for adding new quotes
    createAddQuoteForm();

    // Add Export button to DOM
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Quotes';
    exportBtn.addEventListener('click', exportQuotes);
    document.body.appendChild(exportBtn);

    // Add Import file input to DOM
    const importFileInput = document.createElement('input');
    importFileInput.type = 'file';
    importFileInput.addEventListener('change', importQuotes);
    document.body.appendChild(importFileInput);
});
