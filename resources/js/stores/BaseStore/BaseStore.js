import { action, computed } from 'mobx';
import _ from 'lodash';
import { RequestHelper } from '../../helpers';

class BaseStore {
  constructor(
    dataList = null,
    errors = null,
    fields = null,
    fieldSort = null,
    filter = null,
    inProgress = null,
    orderingDirection = null,
    route = null,
    values = null
  ) {
    this.dataList = dataList;
    this.errors = errors;
    this.fields = fields;
    this.fieldSort = fieldSort;
    this.filter = filter;
    this.inProgress = inProgress;
    this.orderingDirection = orderingDirection;
    this.route = route;
    this.values = values;
  }

  // Api Calls
  @action
  add = data =>
    RequestHelper.requests.post(`/api/${this.route}`, data).then(res => {
      this.reset();
      this.list();
      return res;
    });

  @action
  delete = id =>
    RequestHelper.requests
      .del(`/api/${this.route}/${id}`)
      .then(action(() => this.list()))
      .catch(
        action(err => {
          this.list();
          console.log('err', err);
        })
      );

  @action
  detail = id =>
    RequestHelper.requests.get(`${this.route}/${id}`).then(res => {
      this.fillValues(res);
    });

  @action
  list = () => {
    this.inProgress = true;
    return RequestHelper.requests
      .get(`/api/${this.route}`)
      .then(
        action(res => {
          this.dataList = res.data;
        })
      )
      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  };

  @action
  update = (id, data) =>
    RequestHelper.requests.put(`/api/${this.route}/${id}`, data).then(res => {
      this.reset();
      this.list();
      return res;
    });

  // End Api Calls

  // Computed Values For Table
  @computed
  get filteredItems() {
    return _.filter(this.dataList, item => {
      const res = Object.keys(this.fields).map(b => {
        const str1 = _.lowerCase(item[b]);
        const str2 = _.lowerCase(this.filter);
        return str1.includes(str2);
      });
      return _.includes(res, true);
    });
  }

  @computed
  get orderedItems() {
    if (this.orderingDirection) {
      return _.orderBy(this.filteredItems, [this.fieldSort], ['asc']);
    }
    return _.orderBy(this.filteredItems, [this.fieldSort], ['desc']);
  }
  // End Computed Values For Table

  // Setters for table
  @action
  setFilter(value) {
    this.filter = value;
  }

  @action
  setFieldSort = fieldSort => {
    this.fieldSort = fieldSort;
  };

  @action
  setOrderingDirection = asc => {
    this.orderingDirection = asc;
  };
  // End Setters for table

  // Value Mutators
  @action
  setValue(option, value) {
    this.values[option] = value;
  }

  @action
  resetValues = () => {
    Object.keys(this.values).map(option => {
      this.values[option] = '';
      return null;
    });
  };

  @action
  fillValues(res) {
    // TODO generic fill fields
  }
  // End Value Mutators
}

export default BaseStore;
