const firebaseStorageReplaceKey = '<image_name>';

const environment = {
  apiUrl: 'https://api-dev.socialbureau.io',
  firebaseStorage: {
    url: `https://firebasestorage.googleapis.com/v0/b/test-backend-d8e54.appspot.com/o/${firebaseStorageReplaceKey}?alt=media`,
    replaceKey: firebaseStorageReplaceKey,
  },
};

export default environment;
