function generateSnippet() {
    const input = document.getElementById('prompt').value.toLowerCase();
    const output = document.getElementById('output');
    const preview = document.getElementById('preview');

    // Split input into keywords
    const keywords = input.split(/\s+/).filter(k => k);

    // Score snippets by keyword match
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, code] of Object.entries(SNIPPETS)) {
        let score = 0;
        for (const kw of keywords) {
            if (key.includes(kw)) score++;
            else if (code.toLowerCase().includes(kw)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = code;
        }
    }

    // Show result
    output.textContent = bestMatch || '// No matching snippet found';

    // Live preview
    preview.innerHTML = bestMatch || '<em>No preview available</em>';
}

// Optional: copy to clipboard function
function copySnippet() {
    const code = document.getElementById('output').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Snippet copied!');
    });
}
