import CryptoJS from 'crypto-js';

export async function encryptFile(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const fileContent = reader.result;

      // Generate a secure AES key
      const aesKey = CryptoJS.lib.WordArray.random(16).toString();

      // Encrypt the file content with AES
      const encrypted = CryptoJS.AES.encrypt(fileContent, aesKey).toString();

      // Create a Blob with the encrypted content
      const blob = new Blob([encrypted], { type: 'text/plain' });

      // Create a File object from the Blob
      const encryptedFile = new File([blob], file.name + '.enc', { type: 'text/plain' });

      // Return the encrypted file and the AES key
      resolve({ encryptedFile, aesKey });
    };

    reader.onerror = reject;
    reader.readAsText(file); // You can change to readAsArrayBuffer if needed
  });
}
