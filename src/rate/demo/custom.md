---
order: 2
title: 自定义图标
description:
---

```js
import React from 'react';
import {Rate} from '@jdcfe/yep-react';
import ComponentCard from 'ComponentCard';

class Demo extends React.PureComponent {
  state = {
    rating: 6,
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue});
  };

  render() {
    const {rating} = this.state;
    return (
      <div>
        <ComponentCard title="自定义图标">
          <Rate
            className="custom"
            name="rate1"
            starCount={10}
            renderStarIcon={(index, value, name, id) => (
              <i key={`icon_${id}`} style={{fontStyle: 'normal', fontSize: 30}}>
                &#9733;
              </i>
            )}
            value={rating}
            onStarClick={this.onStarClick}
          />
        </ComponentCard>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
