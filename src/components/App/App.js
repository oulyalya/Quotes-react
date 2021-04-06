import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import PostAddForm from '../PostAddForm/PostAddForm';
import PostList from '../PostList/PostList';
import PostStatusFilter from '../PostStatusFilter/PostStatusFilter';
import SearchPanel from '../SearchPanel/SearchPanel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'Человек может поступать так, как желает, но не он решает, что ему пожелать.', important: false, like: false, id: 1 },
        { label: 'В жизни всё идёт по кругу. закат сменяется восходом. Снова и снова.', important: false, like: false, id: 2 },
        { label: 'Конец – это начало, а начало – это конец.', important: true, like: false, id: 3 },
      ],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 4;
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like);
    } else {
      return items;
    }
  }

  onFilterSelect(filter) {
    this.setState({ filter });
  }

  searchPost(items, term) {
    if (term.lemgth === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    })
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const newArray = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArray
      };
    });
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: this.maxId++
    };

    this.setState(({ data }) => {
      const newArray = [...data, newItem];
      return {
        data: newArray
      };
    });
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = { ...old, important: !old.important };
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newArray
      };
    });
  }

  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = { ...old, like: !old.like };
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newArray
      };
    });
  }

  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div className="app" >
        <AppHeader
          liked={liked}
          allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect} />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked} />
        <PostAddForm
          onAdd={this.addItem} />
      </div>
    );
  }
}
