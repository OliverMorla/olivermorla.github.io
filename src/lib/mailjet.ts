import Mailjet from "node-mailjet";

// Here we are instantiating a new Mailjet client with the API key and secret key from the environment variables. 
// the new Mailjet instance is exported so it can be used in other parts of the application. 
// The reason we used the word new is because the Mailjet package is a class that needs to be instantiated before it can be used. 
// This allows for multiple instances of the Mailjet client to be created with different API keys and secret keys if needed.
export const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});
