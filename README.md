This project is a Node.js backend that provides encryption and decryption functionality using RSA.

Getting Started
Prerequisites
Node.js (v22 or higher)
npm
Installation
git clone https://github.com/your-username/backend-rsa-encrypted.git
cd backend-rsa-encrypted
npm install
Configuration
Generate RSA key pairs (private and public keys).
Place your keys in a keys/ directory or configure the path in your environment variables.
Running the Project
node server.js --> encrypted
node decrypt-server.js --> decrypted
The server will start and expose endpoints for encryption and decryption.

Usage
Encrypt Data
Send a POST request to localhost:3000/encrypt with the data to encrypt.

{
    "text": "your text here"
}
Decrypt Data
Send a POST request to localhost:3001/decrypt with the encrypted data.

{
    "encrypted": "base64-encoded-string"
}
