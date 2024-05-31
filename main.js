let intervalId;

async function Start(event) {
  event.preventDefault();

  if (intervalId) {
    clearInterval(intervalId);
  }

  const formData = new FormData(document.getElementById('dataForm'));
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formDataObject);
}

async function Stop() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

async function Stop() {}
