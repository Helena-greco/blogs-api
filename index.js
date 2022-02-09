const express = require('express');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const validation = require('./validations/validation');
const catValidation = require('./validations/categoriesValidation');
const catController = require('./controller/categoriesController');

const app = express();

app.use(express.json());

app.post('/user', 
  validation.displayNameReq,
  validation.emailReq,
  validation.passwordReq,
  userController.createUser);

app.post('/login', 
  validation.validPassword,
  validation.validEmail,
  loginController.loginToken);

app.get('/user', 
  validation.tokenValid,
  userController.getAllUsers);

app.get('/user/:id', 
  validation.tokenValid,
  userController.getById);

app.post('/categories', 
  catValidation.nameReq,
  validation.tokenValid,
  catController.createCategory);

app.get('/categories',
  validation.tokenValid,
  catController.getAllCategories);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
