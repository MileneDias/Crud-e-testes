import { Router } from 'express';
import cors from 'cors';
import ProdutoController from './app/constrollers/ProdutoController';

const routes = Router();
routes.use(cors());

routes.post(
    '/produtos',
    ProdutoController.store
);

routes.get(
    '/produtos',
    ProdutoController.index
);

routes.put(
    '/produtos/:id',
    ProdutoController.update
);

routes.delete(
    '/produtos/:id',
    ProdutoController.delete
);

export default routes;