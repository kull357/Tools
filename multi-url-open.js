document.getElementById('openUrls').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value;
    const urls = urlInput.split(/[\s,]+/); // Split by whitespace or commas

    urls.forEach(url => {
        if (url) {
            window.open(url, '_blank'); // Open each URL in a new tab
        }
    });
});
