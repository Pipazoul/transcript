/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k22js9rlhu8djkk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6xbc2b52",
    "name": "speakers",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jkqe917r9o98cay",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k22js9rlhu8djkk")

  // remove
  collection.schema.removeField("6xbc2b52")

  return dao.saveCollection(collection)
})
