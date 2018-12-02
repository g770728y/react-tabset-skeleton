import React from 'react';
import TabPanel from './TabPanel';
import { interleave, nextKey } from './utils';

type IProps = {
  defaultActiveKey: number | string;
  children: TabPanel[];

  // 两个tabTitle的间距
  tabGap?: number;

  // 注意是panel的位置，不是tab的位置
  panelPlacement: 'bottom' | 'right';
  rootContainerRenderer?: (content: React.ReactNode) => React.ReactElement<any>;
  tabsContainerRenderer: (
    tabs: React.ReactNodeArray
  ) => React.ReactElement<any>;
  tabRenderer: (
    tabElement: React.ReactNode,
    isActive: boolean
  ) => React.ReactNode;
  panelContainerRenderer: (panel: React.ReactNode) => React.ReactNode;
};

interface IState {
  activeKey: number | string;
}

class Tabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { activeKey: props.defaultActiveKey };
  }

  isActiveTab = (child: TabPanel) =>
    (child as any).key === this.state.activeKey;

  switchTo = (key: string | number) => this.setState({ activeKey: key });

  activePanelContent = () => {
    const activeTab = this.props.children.find(this.isActiveTab);
    return activeTab && activeTab.props.children;
  };

  render() {
    const props = this.props;
    const {
      tabGap,
      rootContainerRenderer,
      tabsContainerRenderer,
      tabRenderer,
      panelContainerRenderer,
      panelPlacement
    } = props;

    const tabNode = (child: TabPanel) => {
      const childKey = (child as any).key;
      return tabRenderer(
        <a
          key={childKey}
          href="javascript:void(0)"
          onClick={() => this.switchTo(childKey)}
        >
          {child.props.tab}
        </a>,
        this.isActiveTab(child)
      );
    };

    let tabsArrayNode = (props.children || []).map(tabNode);

    const gap = () =>
      panelPlacement === 'bottom' ? (
        <div key={nextKey()} style={{ width: tabGap || 0 }} />
      ) : (
        <div key={nextKey()} style={{ height: tabGap || 0 }} />
      );

    tabsArrayNode = interleave(tabsArrayNode, gap);

    let tabsContainer = tabsContainerRenderer(tabsArrayNode);
    tabsContainer = React.cloneElement(tabsContainer, {
      style: {
        ...tabsContainer.props.style,
        display: 'flex',
        flexDirection: panelPlacement === 'bottom' ? 'row' : 'column'
      }
    });

    const content = (
      <>
        {tabsContainer}
        {panelContainerRenderer(this.activePanelContent())}
      </>
    );

    const flexDirection = panelPlacement === 'bottom' ? 'column' : 'row';
    const _rootContainer = rootContainerRenderer ? (
      rootContainerRenderer(content)
    ) : (
      <div style={{ display: 'flex', flexDirection }}>{content}</div>
    );
    return React.cloneElement(_rootContainer, {
      style: { ..._rootContainer.props.style, fontSize: 30 }
    });
  }
}

export default Tabs;
