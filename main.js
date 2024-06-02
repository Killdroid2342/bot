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
  try {
    const response = await axios.post(
      'http://localhost:4001/bot/checkout',
      formDataObject,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function Stop() {}
