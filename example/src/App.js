import React, { Component } from 'react';

import { Tabs, TabPanel } from 'react-tabset-skeleton';

export default class App extends Component {
  rootContainerRenderer = content => {
    return <div style={{ background: '#999' }}>{content}</div>;
  };

  tabsContainerRenderer1 = tabs => {
    return (
      <div
        style={{
          background: '#ccc',
          height: 30,
          alignItem: 'flex-end'
        }}
      >
        {tabs}
      </div>
    );
  };

  tabsContainerRenderer2 = tabs => {
    return (
      <div
        style={{
          background: '#ccc',
          width: 100,
          alignItem: 'center'
        }}
      >
        {tabs}
      </div>
    );
  };

  tabRenderer = (tabElement, isActive) => {
    return React.cloneElement(tabElement, {
      style: {
        color: isActive ? 'red' : 'black',
        borderBottom: isActive ? '1px solid #333' : '0',
        width: 100,
        fontSize: 20,
        textAlign: 'center'
      }
    });
  };

  panelContainerRenderer = panel => {
    return <div style={{ padding: 10, border: '1px solid red' }}>{panel}</div>;
  };

  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={'second'}
          tabGap={20}
          panelPlacement={'bottom'}
          rootContainerRenderer={this.rootContainerRenderer}
          tabsContainerRenderer={this.tabsContainerRenderer1}
          tabRenderer={this.tabRenderer}
          panelContainerRenderer={this.panelContainerRenderer}
        >
          <TabPanel tab={1} key={'first'}>
            111
          </TabPanel>
          <TabPanel tab={2} key={'second'}>
            222
          </TabPanel>
          <TabPanel tab={3} key={'third'}>
            333
          </TabPanel>
        </Tabs>

        <div style={{ height: 100 }} />

        <Tabs
          defaultActiveKey={'second'}
          tabGap={20}
          panelPlacement={'right'}
          tabsContainerRenderer={this.tabsContainerRenderer2}
          tabRenderer={this.tabRenderer}
          panelContainerRenderer={this.panelContainerRenderer}
        >
          <TabPanel tab={1} key={'first'}>
            111
          </TabPanel>
          <TabPanel tab={2} key={'second'}>
            222
          </TabPanel>
          <TabPanel tab={3} key={'third'}>
            333
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
