import { action, computed, observable } from 'mobx';
import _ from 'lodash';
import { RequestHelper } from '../../helpers';

class BaseStore {
  constructor(
    fields = null,
    formInfo = null,
    formValidation = null,
    route = null,
    values = null
  ) {
    this.fields = fields;
    this.formInfo = formInfo;
    this.formValidation = formValidation;
    this.route = route;
    this.values = values;
  }

  @observable
  errors = null;

  @observable
  dataList = [];

  @observable
  inProgress = false;

  // Table Settings
  @observable
  orderingDirection = true;

  @observable
  fieldSort = 'id';

  @observable
  filter = '';
  // End Table Settings

  // Api Calls
  @action
  add = data => {
    this.inProgress = true;
    return this.formValidation
      .validate(data, { abortEarly: false })
      .then(() =>
        RequestHelper.requests
          .post(`/api/${this.route}`, data)
          .then(res => {
            this.resetValues();
            this.list();
            this.inProgress = false;
            return res;
          })
          .catch(err => {
            this.inProgress = false;
            return err;
          })
      )
      .catch(err => {
        err.inner.map(item => {
          this.formInfo[item.params.path].error = item.message;
        });
        this.inProgress = false;
        return err;
      });
  };

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

  detail = id =>
    RequestHelper.requests.get(`/api/${this.route}/${id}`).then(res => {
      this.fillValues(res.data);
    });

  @action
  list = () => {
    this.inProgress = true;
    return RequestHelper.requests
      .get(`/api/${this.route}`)
      .then(
        action(res => {
          this.dataList = res.data;
          this.inProgress = false;
        })
      )
      .catch(
        action(err => {
          this.inProgress = false;
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
      this.resetValues();
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
    this.formInfo[option].error = null;
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
    Object.keys(this.values).map(option => {
      if (this.formInfo[option].type === 'select') {
        this.values[option] = res[option].map(item => ({
          value: item[this.formInfo[option].relatedPair.value],
          label: item[this.formInfo[option].relatedPair.label],
        }));
      } else {
        this.values[option] = res[option];
      }
      return null;
    });
  }
  // End Value Mutators
}

export default BaseStore;
