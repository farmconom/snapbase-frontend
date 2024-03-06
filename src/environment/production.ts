const firebaseStorageReplaceKey = '<image_name>';

const environment = {
  apiUrl: 'https://api.socialbureau.io',
  firebaseStorage: {
    url: `https://firebasestorage.googleapis.com/v0/b/socialbureau-website.appspot.com/o/${firebaseStorageReplaceKey}?alt=media`,
    replaceKey: firebaseStorageReplaceKey,
  },
  emailjs: { publicKey: 'IqxtdBWOQNgpzZeyp' },
};

export default environment;
