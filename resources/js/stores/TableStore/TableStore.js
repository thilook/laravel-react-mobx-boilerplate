import { action, observable } from 'mobx';
import _ from 'lodash';

class TableStore {
  store = null;

  @observable
  isLoading = true;

  @observable
  selectedRows = [];

  @observable
  rowsPerPage = 10;

  @observable
  page = 1;

  @observable
  min = this.page * this.rowsPerPage - 10;

  @observable
  max = this.page * this.rowsPerPage - 1;

  @action
  setStore(store) {
    this.store = store;
  }

  @action
  stopLoading() {
    this.isLoading = false;
  }

  @action
  startLoading() {
    this.isLoading = true;
  }

  @action
  calcTotal(items) {
    return Math.ceil(items / this.rowsPerPage);
  }

  // Select row when clicked
  @action
  handleClick(event, row) {
    const index = _.findIndex(this.selectedRows, row);
    if (_.includes(this.selectedRows, row)) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
  }

  // Delete selected rows
  @action
  handleDelete = () => {
    this.selectedRows.map(item => this.store.delete(item.id));
  };

  // Handles edit on search (filter) input
  @action
  handleFilter = e => this.store.setFilter(e.target.value);

  // Handles ordenation of data
  @action
  handleOrder = key => {
    if (this.store.fieldSort === key) {
      this.store.setOrderingDirection(!this.store.orderingDirection);
    } else {
      this.store.setOrderingDirection(true);
      this.store.setFieldSort(key);
    }
  };

  // Handles select all action
  @action
  handleSelectAll = (event, checked) => {
    if (checked) {
      this.selectedRows = this.store.orderedItems.map(n => n);
      return;
    }
    this.selectedRows = [];
  };

  // Handle page change
  @action
  handleChangePage(isNext, isLast = false) {
    if (typeof isNext !== 'boolean') {
      this.page = isNext;
    } else if (isNext) {
      if (isLast) {
        this.page = 10;
      } else {
        this.page += 1;
      }
    } else if (isLast) {
      this.page = 1;
    } else {
      this.page -= 1;
    }
    this.min = this.page * this.rowsPerPage - 10;
    this.max = this.page * this.rowsPerPage - 1;
  }
}

export default TableStore;
