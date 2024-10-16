document.getElementById('openUrls').addEventListener('click', function() {
            const urlInput = document.getElementById('urlInput').value;
            const urls = urlInput.split(/[\s,]+/); // Split by whitespace or commas
            
            urls.forEach((url, index) => {
                if (url) {
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'http://' + url; // Ensure the URL starts with http or https
                    }
                    
                    // Delay opening each URL to avoid triggering the pop-up blocker
                    setTimeout(() => {
                        window.open(url, '_blank'); 
                    }, index * 500); // Opens each URL after 500ms delay from the last one
                }
            });
        });
