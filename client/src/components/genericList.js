import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import { PAGE_SIZE } from '../reducers'
import { fetchItems } from '../actions'
// import moment from 'moment';

class GenericList extends Component {

  imageClick() {
      console.log("click");
  }

  renderItem(item) {
    const imgName = item.images ? item.images[0] ? item.images[0] : "No-image-available.jpg" : "No-image-available.jpg"
    const imgUrl = "http://localhost:3001/project/";

    return (
      <div >
        <div className="image">
            <img src={imgUrl + imgName} height="100px" width="100px" alt="" />
        </div>
        <div className="content">
          <div><label> Title: </label> {item.title}</div>
          <div><label> Summary: </label> {item.description}</div>
          <div><label> ____% funded </label> </div>
          <div><label> ______ registered </label></div>
        </div>
        <div>
          <button onClick={this.imageClick.bind(this)}>
            Edit
          </button>
          <button>
            Delete
          </button>
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
        <div key={key} style={style} >
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
