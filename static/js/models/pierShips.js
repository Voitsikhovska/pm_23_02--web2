class PierShips extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('pierShips')
      this.fields = this.fields.concat([
        'ship',
        'pier'
      ])
    }
  }