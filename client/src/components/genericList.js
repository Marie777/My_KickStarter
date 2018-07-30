import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import { PAGE_SIZE } from '../reducers'
import { fetchItems } from '../actions'

class GenericList extends Component {
  renderItem(item) {
      return (
        <div key={item.id} className="row">
          <div className="image">
            <img src={item.image} alt="" />
          </div>
          <div className="content">
            <div>{item.title}</div>
            <div>{item.description}</div>
            <div>{item.explanation}</div>
            <div>{item.amount}</div>
            <div>{item.expirationDate}</div>
          </div>
        </div>
      );
  }

  render() {
    const reducerObj = this.props.itemsReducer[this.props.listName] || {};
    const list = reducerObj.data || [];
    const rowCount = reducerObj.hasAll ? list.length : list.length + PAGE_SIZE;

    const loadMoreRows = reducerObj.loading
      ? () => {}
      : () => this.props.dispatch(fetchItems(this.props.listName, list.length, list.length + PAGE_SIZE));

    const isRowLoaded = ({ index }) => reducerObj.hasAll || index < list.length;

    const rowRenderer = ({ index, key, style }) => {
      return (
        <div key={key} style={style}>
          { isRowLoaded({index}) ? this.renderItem(list[index]) : 'loading'}
        </div>
      )
    };

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowRenderer={rowRenderer}
            rowHeight={250}
            width={500}
            height={1000}
            rowCount={rowCount}
          />
        )}
      </InfiniteLoader>
    )
  };
}


function mapStateToProps(state) {
  return {
    itemsReducer: state.itemsReducer,
   };
}

export default connect(mapStateToProps)(GenericList)
