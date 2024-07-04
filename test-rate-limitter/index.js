const axios = require('axios');

async function makeRequests() {
  const promises = [];
  for (let i = 0; i < 100; i++) {
    promises.push(
      axios.get('http://localhost:3000/testapi/getprofile')
        .then(response => {
          console.log(`Request ${i + 1}:`, response.data);
        })
        .catch(error => {
          console.error(`Error on request ${i + 1}:`, error.message);
        })
    );
  }
  await Promise.all(promises);
}

makeRequests();
