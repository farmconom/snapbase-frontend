const firebaseStorageReplaceKey = '<image_name>';

const environment = {
  apiUrl: 'http://localhost:3000',
  firebaseStorage: {
    url: `https://firebasestorage.googleapis.com/v0/b/test-backend-d8e54.appspot.com/o/${firebaseStorageReplaceKey}?alt=media`,
    replaceKey: firebaseStorageReplaceKey,
  },
  emailjs: { publicKey: 'IqxtdBWOQNgpzZeyp' },
};

export default environment;
