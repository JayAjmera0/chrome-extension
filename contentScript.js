async function scrapeAndCreateJSON() {
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
        // Make an API call to process the email data
        const response = await fetch('http://127.0.0.1:5000/process_json', {
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
        chrome.runtime.sendMessage({action: "updateCount", count: data['count']});
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Execute the scrape function immediately upon injection
scrapeAndCreateJSON();
