import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Prism from 'prismjs';
import qs from 'qs';
import {NavBar, Button} from '@jdcfe/yep-react';
import allDocData from './allDocData';
import Demo from './Demo';
import ComponentTitle from './component/ComponentTitle';

import {Helmet} from 'react-helmet';
import {toCamelCase} from '../site/lib/utils';
import App from './App';

import './Content.scss';
import Image from './image';

import {CATEGORIES, subListDemos} from './utils';
const Content = ({history, location: {pathname, search}}) => {
  setTimeout(() => {
    Prism.highlightAll();
  }, 100);

  if (pathname.match(/\/component\//)) {
    const componentName = pathname.split('/').reverse()[0];
    const currentComponent = allDocData.components[componentName];
    if (!currentComponent) {
      return <h1>404 page not found</h1>;
    }

    const query = qs.parse(search, {ignoreQueryPrefix: true});
    return (
      <Fragment>
        <NavBar
          leftContent=""
          onLeftClick={() => history.goBack()}
          rightContent={
            <img
              className="github"
              src={Image.github}
              onClick={() => {
                window.location.href = 'https://github.com/jdf2e/yep-react';
              }}
            />
          }
        >
          {CATEGORIES.find(item => item.name === currentComponent.category).label}
        </NavBar>
        <div className="page-wrapper">
          <ComponentTitle title={query.title} englishTitle={toCamelCase(componentName)} />
          <Helmet title={toCamelCase(componentName)} />
          {currentComponent && currentComponent.demos ? (
            subListDemos.indexOf(componentName) > -1 ? (
              !query.order ? (
                currentComponent.demos
                  .sort((a, b) => a.order - b.order)
                  .map((demo, index) => (
                    <div key={index}>
                      <Button onClick={() => (window.location.hash = `${window.location.hash}&order=${index}`)}>
                        {demo.title}
                      </Button>
                    </div>
                  ))
              ) : (
                <Demo
                  demo={currentComponent.demos.sort((a, b) => a.order - b.order)[query.order || 0]}
                  componentName={componentName}
                />
              )
            ) : (
              currentComponent.demos
                .sort((a, b) => a.order - b.order)
                .map(demo => <Demo demo={demo} componentName={componentName} />)
            )
          ) : null}
          <style>{currentComponent.style || ''}</style>
        </div>
      </Fragment>
    );
  }
  return <App />;
};

export default withRouter(Content);
