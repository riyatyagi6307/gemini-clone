// Import necessary components from the library
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Constants for the model name and API key
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyD7MzgJjOyaBmPS7gMPRnPI9QgYWGBeswY";

// Async function to run the chat interaction
async function runChat(prompt) {
  try {
    // Initialize GoogleGenerativeAI with your API key
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the generative model instance
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Configuration for text generation
    const generationConfig = {
      temperature: 0.75,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // Safety settings to filter harmful content
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MED_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Start a new chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [], // History can be optionally provided if needed
    });

    // Send the prompt and wait for the response
    const result = await chat.sendMessageStream(prompt);

    // Get the response object from the result
    const response = result.response;

    // Access the response text asynchronously
    const responseText = await response.text(); // Use await here to wait for the text()

    // Log the response text to console
    console.log(responseText);

    // Return the response text
    return responseText;
  } catch (error) {
    // Handle any errors that occur during the chat interaction
    console.error('Error in runChat:', error);
    return null; // Return null or handle error accordingly
  }
}

// Export the runChat function to be used elsewhere
export default runChat;
