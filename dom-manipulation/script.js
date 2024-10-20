let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Productivity" },
    { text: "Believe you can and you're halfway there.", category: "Belief" }
];

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();
        resolveConflicts(serverQuotes);
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
    }
}

// Sync new quotes to the server
async function syncQuoteToServer(quote) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quote)
        });
        console.log("Quote synced to server.");
    } catch (error) {
        console.error("Error syncing quote:", error);
    }
}

// Conflict resolution: Server data takes precedence
function resolveConflicts(serverQuotes) {
    const localData = JSON.parse(localStorage.getItem('quotes')) || [];
    const mergedQuotes = [...new Map([...serverQuotes, ...localData].map(q => [q.text, q])).values()];
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;
    alert("Quotes synced and conflicts resolved.");
}

// Display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { text, category } = quotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${text}" - ${category}`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify({ text, category }));
}

// Add a new quote and sync it to the server
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    syncQuoteToServer(newQuote);
    alert("Quote added and synced to the server!");
}


// Add a new quote and sync with server
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    syncQuoteToServer(newQuote);
    alert('Quote added and synced with the server!');
}

// Import quotes from JSON
function importQuotes(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const importedQuotes = JSON.parse(reader.result);
        quotes = [...quotes, ...importedQuotes];
        localStorage.setItem('quotes', JSON.stringify(quotes));
        showRandomQuote();
    };
    reader.readAsText(file);
}

// Export quotes as JSON
function exportQuotes() {
    const jsonBlob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Initialize the app on page load
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    fetchQuotesFromServer();

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteForm').addEventListener('submit', event => {
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

    // Initialize the app on page load
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    syncQuotes("syncQuotes"); // Sync quotes on page load

       // Periodic sync every 5 minutes
       setInterval(syncQuotes, 5 * 60 * 1000); // 5 minutes in milliseconds


    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const text = event.target.quoteText.value.trim();
        const category = event.target.quoteCategory.value.trim();
        if (text && category) {
            addQuote(text, category);
            event.target.reset();
        } else {
            alert("Please enter both quote and category.");
        }
    });

    document.getElementById('importQuotes').addEventListener('change', importQuotes);
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
});

    document.getElementById('importQuotes').addEventListener('change', importQuotes);
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
});

