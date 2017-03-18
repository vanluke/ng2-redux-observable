import { MongoClient, ObjectId } from '../../mongoDb';
import config from '../../../server.config';
import parse from 'co-body';
import assert from 'assert';
const mongoDbConfig = config.get('mongoDb');

const itemDocumentName = 'items';

const createId = (item, results) => {
  const temp = {
    _id: results.insertedId
  };
  return Object.assign({}, item, temp._id);
};

const connect = (cb, params) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoDbConfig.uri, (err, db) => {
      assert.equal(null, err);
      cb(db, params)
      .then((result) => {
        db.close();
        resolve(result);
      }).catch((error) => {
        db.close();
        reject(error);
      });
    });
  });
};

const getItemsFromServer = (db) => {
  return new Promise((resolve) => {
    resolve(db.collection(itemDocumentName).find().toArray());
  });
};

const getItemFromServer = (db, id) => {
  const objectId = new ObjectId(id);
  return new Promise((resolve) => {
    const cursor = db.collection(itemDocumentName)
    .find({ '_id': objectId });
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      resolve(doc);
    });
  });
};

const _deleteItem = (db, id) => {
  const objectId = new ObjectId(id);
  return new Promise((resolve, reject) => {
    db.collection(itemDocumentName)
    .deleteOne({ '_id': objectId }, function(err, results) {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const insertItem = (db, item) => {
  return new Promise((resolve, reject) => {
    db.collection(itemDocumentName)
    .insertOne(item, function(err, results) {
      if (err) {
        reject(err);
      }
      const rectResp = createId(item, results);
      resolve(rectResp);
    });
  });
};

const _updateItem = (db, item) => {
  const id = new ObjectId(item._id);
  return new Promise((resolve, reject) => {
    db.collection(itemDocumentName)
    .update({ '_id': id }, {
      $set: {
        'name': item.name,
        'description': item.description
      }
    },
    item, function(err, results) {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const items = async function () {
  const data = await connect(getItemsFromServer);
  this.status = 200;
  this.body = { items: data };
};

const item = async function () {
  const itemId = this.params.id;
  const data = await connect(getItemFromServer, itemId);
  this.status = 200;
  this.body = data;
};

const createItem = async function () {
  const body = await parse(this);
  const response = await connect(insertItem, body);
  this.body = response;
  this.status = 201;
};

const updateItem = async function () {
  const body = await parse(this);
  await connect(_updateItem, body);
  this.body =  body;
  this.status = 201;
};

const deleteItem = async function () {
  const itemId = this.params.id;
  if (!itemId) {
    this.status = 404;
    return;
  }
  await connect(_deleteItem, itemId);
  this.status = 204;
};

export { items, item, createItem, deleteItem, updateItem };
