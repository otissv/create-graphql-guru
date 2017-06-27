import mongodb from 'mongodb';

const { ObjectId } = mongodb;

export function objectId (id) {
  return ObjectId(id);
}

export function isObjectEmpty (obj) {
  function check (val) {
    // checks if object is truthy or falsey
    if (!val || val.trim === '') return true;

    // checks objects length property (array)
    if (val.length && val.length === 0) return true;
    if (Object.keys(val).length === 0) return true;
  }

  // checks all object properties are empty
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return check(obj[key]);
    }
  }

  return check(obj);
}

export function queryObjectId (args) {
  if (isObjectEmpty(args)) return {};

  return args._id ? { ...args, _id: objectId(args._id) } : objectId(args);
}
