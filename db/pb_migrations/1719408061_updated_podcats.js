/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kz49fj4u8zo8hw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "svqf35aq",
    "name": "episodes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "k22js9rlhu8djkk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kz49fj4u8zo8hw")

  // remove
  collection.schema.removeField("svqf35aq")

  return dao.saveCollection(collection)
})
