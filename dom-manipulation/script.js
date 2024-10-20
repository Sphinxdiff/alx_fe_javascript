// Array of quote objects
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Productivity" },
    { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Display a random quote
function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Clear previous options
    categoryFilter.innerHTML = '';

    // Add "All Categories" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);

    // Add other category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Add a new quote
function addQuote(text, category) {
    quotes.push({ text, category });
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    alert('Quote added successfully!');
}

// Import quotes from JSON
function importQuotes(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const importedQuotes = JSON.parse(reader.result);
            quotes.push(...importedQuotes);
            localStorage.setItem('quotes', JSON.stringify(quotes));
            populateCategories();
            alert('Quotes imported successfully!');
        } catch {
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
}

// Export quotes to JSON
function exportQuotes() {
    const data = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    populateCategories();

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

    document.getElementById('addQuoteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const text = event.target.quoteText.value.trim();
        const category = event.target.quoteCategory.value.trim();
        if (text && category) {
            addQuote(text, category);
            event.target.reset();
        } else {
            alert('Please enter both quote and category.');
        }
    });

    document.getElementById('importQuotes').addEventListener('change', importQuotes);
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
});
