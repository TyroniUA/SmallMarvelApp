import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfScroll({ list, nextFunction, hasMore, clickFunction }) {
  return (
    <div className='scroll__parent' id='scrollParent'>
      <InfiniteScroll
        dataLength={list.length} //This is important field to render the next data
        next={nextFunction}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget='scrollParent'
      >
        <div className='scroll__body'>
        {list.map((element) => (
          <div className='scroll__body__element' key={element.name} onClick={() => clickFunction(element)}>{element.name}</div>
        ))}
        </div>

      </InfiniteScroll>
    </div>
  );
}
