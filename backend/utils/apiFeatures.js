const { listenerCount } = require('../model/userModel');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString }; /// store in a new variable
    const filterObjs = ['page', 'field', 'sort', 'limit', 'q'];
    filterObjs.forEach((el) => delete queryObj[el]);

    queryObj = JSON.stringify(queryObj);
    queryObj = queryObj.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryObj));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let sortQuery = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortQuery);
    } else {
      this.query = this.query;
    }
    return this;
  }
}
module.exports = APIFeatures;
