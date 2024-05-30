let intervalId;

async function Start(event) {
  event.preventDefault();

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const formData = new FormData(document.getElementById('dataForm'));
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
  }, 100);
}

async function Stop() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

async function Stop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('Data submission stopped');
  }
}
