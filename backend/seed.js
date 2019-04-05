
const seeder=require('seed-generator')
const axios=require('axios')
const buildInput = [
  {
    name: 'name',
    seed: { namespace: 'name', method: 'firstName' }
  },
  {
    name: 'email',
    seed: { namespace: 'internet', method: 'email' ,   unique: true }
  },
  {
    name: 'age',
    seed: {
      namespace: 'random',
      method: 'number',
      vars: { min: 0, max: 100 }
    }
  },
  {
    name: 'password',
    seed: { namespace: 'internet', method: 'password' }

  },
  {
    name: 'phone',
    seed: {
      namespace: 'random',
      method: 'number',
      vars: { min: 100000000, max: 999999999 }
    }
  },
  {
    name: 'role',
    seed: {
      namespace: 'random',
      method: 'number',
      vars: { min: 0, max: 1 }
    }
  }
];


const numberOfResults = 20;
const seededData = seeder.build(buildInput, numberOfResults);
seededData.forEach(function(data) {
  axios.post(`http://localhost:5000/api/register/`,
    data
  ).catch(err => console.log(err));
})
