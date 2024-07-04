/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kz49fj4u8zo8hw")

  collection.name = "podcasts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kz49fj4u8zo8hw")

  collection.name = "podcats"

  return dao.saveCollection(collection)
})
