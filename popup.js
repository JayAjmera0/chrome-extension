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

    // Event listener for the BERT summarization button
    let bertButton = document.getElementById('bertButton');
    if (bertButton) {
        bertButton.addEventListener('click', function() {
            // Show loading spinner when button is clicked
            showLoadingSpinner();
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    function: scrapeAndCreateBertJSON
                });
            });
        });
    } else {
        console.error('bertButton not found.');
    }
});

// Function to scrape and create JSON for BERT summarization
async function scrapeAndCreateBertJSON() {
    // Define your selectors
    const subjectSelector = 'h2.hP';
    const fromSelector = 'span.gD';
    const dateTimeSelector = 'span.g3';
    const contentSelector = 'div.a3s.aiL ';

    // Function to get text content by selector
    function getTextContent(selector) {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : 'Not found';
    }

    // Collecting data
    const emailData = {
        subject: getTextContent(subjectSelector),
        from: getTextContent(fromSelector),
        date_time: getTextContent(dateTimeSelector),
        content: getTextContent(contentSelector),
    };

    // Convert the data to JSON
    const emailDataJson = JSON.stringify(emailData);
    console.log(emailDataJson);

    try {
        // Make an API call to process the email data using BERT route
        const response = await fetch('http://127.0.0.1:5000/bert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: emailDataJson,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Send a message to the popup script to update the UI
        chrome.runtime.sendMessage({action: "updateCount", count: data['summary']});
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
