import React from 'react';
import ToDoItem from './ToDoItem';
import SearchBar from './SearchBar';

class ToDoList extends React.Component {
  constructor() {
      super(); //it calls react Component constructor.
      this.state = { //state is a plain js object..init only in constructor
        items: [],
        value: '',
        isUpdate: false,
        id: Math.random(),
        searchValue : '',
        searchResults: []
      };
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.onChangeInputFunction = this.onChangeInputFunction.bind(this);
      this.onChangeSearchFunction = this.onChangeSearchFunction.bind(this);
  }

  editItem(id) {
    this.setState({
      isUpdate : true,
      id
    });
  }

  addItem() {
    let inputText = this.state.value; //object destructring
    let newItems = this.state.items;
    let searchItems = this.state.searchResults;
    let isCheck = false;

    if(this.state.isUpdate) {
      newItems = newItems.map((value, i) => {
        if(value === searchItems[this.state.id] && !isCheck) {
          isCheck = true;
          return inputText;
        }
        return value;
      });
      searchItems[this.state.id] = inputText;
    } else {
      newItems = [...this.state.items, inputText]
      searchItems = [...newItems]
    }
    //this.state.value = '';  dont change state variables directly... use setState instead
    this.setState({
      value : '',
      items : newItems,
      isUpdate : false,
      id : 9999,
      searchResults: searchItems
    });
  }

  removeItem(id) {
    let isCheck = false;
    let newItems = this.state.items.filter((item, i) => {
      if(item === this.state.searchResults[id] && !isCheck) {
        isCheck = true;
      } else {
        return item;
      }
    });
    let searchItems = this.state.searchResults.filter((item, i) => i !== id);
    this.setState({
      items : newItems,
      searchResults: searchItems
    });
  }

  doRenderAddOrUpdateButton() {
    let buttonText = 'Add';
    if(this.state.isUpdate) {buttonText = 'Edit';}
    return (
      <button
        onClick={this.addItem}
        type="button"
        className="btn btn-primary">{buttonText}
      </button>
    );
  }

  onChangeInputFunction() {
    return e => this.setState({value: e.target.value});
  }

  onChangeSearchFunction() {
      return e => {
        let searchResults = this.state.items.filter((value, i) => value.indexOf(e.target.value) > -1);
        this.setState(
          {
            searchValue: e.target.value,
            searchResults: searchResults
        })
      }
  }

  render() { //render is a react component method.
    return (
      <div>
        <div id="addTask">
          <input
            className="input"
            type="text"
            placeholder="Enter Task"
            onChange={this.onChangeInputFunction()}
            value={this.state.value}
          />
          {this.doRenderAddOrUpdateButton()}
        </div>
        <br/>
        <SearchBar
          taskItems={this.state.items}
          searchValue={this.state.searchValue}
          onChangeSearchFunction={this.onChangeSearchFunction}
        />
        <ToDoItem
          searchResults={this.state.searchResults}
          removeItem={this.removeItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
}

export default ToDoList;
