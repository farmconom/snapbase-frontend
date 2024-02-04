export function scrollToTop() {
  const mainDiv = document.querySelector('#app-main');

  if (mainDiv) {
    mainDiv.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export function scrollToBottom() {
  const mainDiv = document.querySelector('#app-main');
  if (mainDiv) {
    mainDiv.scrollTo({
      top: 9999,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: 9999,
      behavior: 'smooth',
    });
  }
}
