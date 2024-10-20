// Array of quote objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Productivity" },
    { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Show a random quote
function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const { text, category } = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${text}" - ${category}`;
}

// Populate categories dynamically in the dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = `<option value="all">All Categories</option>` + 
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory); // Remember filter selection
    showRandomQuote(); // Update displayed quote
}

// Get filtered quotes based on the selected category
function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    return selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
}

// Add a new quote
function addQuote(text, category) {
    quotes.push({ text, category });
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
    populateCategories(); // Update categories
}

// Export quotes to a JSON file
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
document.getElementById('importQuotes').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            quotes = JSON.parse(e.target.result);
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
            populateCategories(); // Update categories
            showRandomQuote(); // Display a new quote
        };
        reader.readAsText(file);
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    populateCategories(); // Populate the dropdown
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) document.getElementById('categoryFilter').value = savedCategory;
    showRandomQuote(); // Show a quote

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
});
