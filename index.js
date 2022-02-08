const express = require('express');
const userController = require('./controller/userController');
const validation = require('./validations/userValidation');

const app = express();

app.use(express.json());

app.post('/user', 
  validation.displayNameReq,
  validation.emailReq,
  validation.passwordReq,
  userController.createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
