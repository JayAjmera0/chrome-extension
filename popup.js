document.addEventListener('DOMContentLoaded', function () {
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === "updateCount") {
            updateCountValue(message.count);
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
