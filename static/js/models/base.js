/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
class BaseModel {// eslint-disable-line no-unused-vars
    constructor (collectionName) {
      this.collectionName = collectionName
      this.fields = ['id']
    }
    /**
     * @returns {Number} //документує значення що повертається
     */
  
    getNextId (collection) {
      return collection.length + 1
    }
    /**
     * @returns {Object}
     */
  
    GetEmpty () {
      const entry = {}
  
      this.fields.forEach(element => {
        entry[element] = null
      })
  
      return entry
    }
    /**
     * @returns {Array}
     */
  
    Select () {
      const stored = localStorage.getItem(this.collectionName) // get data
      const collection = stored ? JSON.parse(stored) : [] // get data as appropriate object passed as string or empty
  
      return collection
    }
  
    Commit (collection) { // set data
      localStorage.setItem(this.collectionName, JSON.stringify(collection))
    }
    /**
     * @param {Number} id
     * @returns {BaseModel|undefined}
     */
  
    FindById (id) {
      return this.Select().find(item => item.id == id)
    }
    /**
     * @param {Number} id
     * @returns {Number}
     */
  
    FindIndexById (id) {
      return this.Select().findIndex(item => item.id == id)
    }
  
    Create (row) {
      const collection = this.Select()
      const entry = this.GetEmpty()
  
      entry.id = this.getNextId(collection)
      for (const key in row) { // get key from localstorage
        if (entry.hasOwnProperty(key) && // filter key from inbuilt
            entry.key !== 'id') {
          entry[key] = row[key]
        }
      }
  
      collection.push(entry)
  
      this.Commit(collection)
  
      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  
    Delete (id) {
      let collection = this.Select();
      for (let i = 0; i < collection.length; ++i) {
        if (collection[i].id == id) {
          collection.splice(i, 1); // delete element 1 count times
          break;
        }
      }
      this.Commit(collection);
    }
  
    Update (row) {
      const collection = this.Select()
      const entry = this.GetEmpty()
      let id = row['update-item'];
      let found = collection.find(item => item.id == id);
  
      for (const key in row) {
        if (found.hasOwnProperty(key) &&
            found.key !== 'id') {
          found[key] = row[key];
        }
      }
      this.Commit(collection);
  
      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  }