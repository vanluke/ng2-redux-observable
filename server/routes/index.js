import routes from './router';
import { items, item, updateItem, createItem, deleteItem } from './items';

routes.get('/items', items);
routes.get('/item/:id', item);

routes.put('/item/:id', updateItem);
routes.post('/item', createItem);

routes.del('/item/:id', deleteItem);

export default routes;
