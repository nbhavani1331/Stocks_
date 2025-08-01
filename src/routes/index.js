const{Router}=require('express');
const IndexControllerController=require('../controllers/index');

const router = Router();
const indexController = new IndexController();

function setRoutes(app){
    app.use('/api/stocks', router);
    router.get('/', indexController.getStocks.bind(indexController));
    router.post('/', indexController.createStock.bind(indexController));
}

module.exports = {setRoutes};