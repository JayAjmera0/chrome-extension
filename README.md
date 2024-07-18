# chrome-extension
![image](https://github.com/user-attachments/assets/01b8d681-4394-47e6-8ea2-189ba21f1863)

# Email Summarizer Chrome Extension

## Overview
The Email Summarizer Chrome Extension is designed to enhance productivity by summarizing long emails directly within the Gmail web service. This extension leverages advanced natural language processing techniques to condense lengthy emails into concise summaries, limited to 256 words.

## Key Features
- **Advanced Summarization:** Utilizes a pretrained BART model from Hugging Face and a custom seq2seq model with an attention mechanism to condense long emails into 256-word summaries.
- **Seamless Integration:** Easily integrates with Gmail's web interface, providing quick and concise summaries without disrupting your workflow.
- **Enhanced Productivity:** Saves time and improves focus by allowing users to swiftly grasp the key points of lengthy emails.

## Technical Overview
- **Model Architecture:** Combines a pretrained BART model and a custom seq2seq model with an attention mechanism for high accuracy and relevance in the generated summaries.
- **Training Data:** The custom model is trained on a diverse dataset of emails to enhance its understanding of various email formats and contexts.
- **Performance:** Optimized for speed and efficiency, providing quick summaries without significant latency, ensuring a seamless user experience.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gmail-summarizer-extension.git
   ```
2. Navigate to the project directory:
   ```
   cd gmail-summarizer-extension
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the project directory.

## Usage
- Open Gmail in your Chrome browser.
- Select an email you want to summarize.
- Click the "Summarize" button in the extension toolbar.
- A concise summary of the email will be displayed.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes relevant tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors
- Kruttika Abhyankar
- Jay Ajmera

---

Feel free to customize the content further based on your specific project details and preferences.
