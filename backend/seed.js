
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

const testPatient={
  name: "Name",
  email: "patient@gmail.com",
  age: 10,
  password: "password",
  phone: 9148604532,
  role: 0
}

const testDoct={
  name: "Doc",
  email: "doc@gmail.com",
  age: 40,
  password: "password",
  phone: 9142316674,
  role: 1
}
//


axios.post(`http://localhost:5000/api/register/`,testPatient)
.catch(err => console.log(err));

axios.post(`http://localhost:5000/api/register/`,testDoct)
.catch(err => console.log(err));

const numberOfResults = 20;
const seededData = seeder.build(buildInput, numberOfResults);
seededData.forEach(function(data) {
  axios.post(`http://localhost:5000/api/register/`,data)
  .catch(err => console.log(err));
})
