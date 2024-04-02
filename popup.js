document.addEventListener('DOMContentLoaded', function () {
    // Function to show the loading spinner
    function showLoadingSpinner() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
    }
    
    // Function to hide the loading spinner
    function hideLoadingSpinner() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === "updateCount") {
            updateCountValue(message.count);
            // Hide loading spinner when response is received
            hideLoadingSpinner();
        }
    });

    // Function to update the count value in the popup
    function updateCountValue(count) {
        const countValueElement = document.getElementById('countValue');
        if (countValueElement) {
            countValueElement.innerText = count.toString();
        } else {
            console.error('Element with ID "countValue" not found.');
        }
    }

    // Event listener for the scrape button
    let scrapeButton = document.getElementById('scrapeButton');
    if (scrapeButton) {
        scrapeButton.addEventListener('click', function() {
            // Show loading spinner when button is clicked
            showLoadingSpinner();
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['contentScript.js']
                });
            });
        });
    } else {
        console.error('scrapeButton not found.');
    }
});
