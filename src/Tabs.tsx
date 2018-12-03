import React, { ReactElement } from 'react';
import TabPanel from './TabPanel';
import { interleave, nextKey } from './utils';

export type ITabsProps = {
  defaultActiveKey: number | string;
  children: ReactElement<TabPanel>[];

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

class Tabs extends React.Component<ITabsProps, IState> {
  constructor(props: ITabsProps) {
    super(props);
    this.state = { activeKey: props.defaultActiveKey };
  }

  isActiveTab = (child: ReactElement<TabPanel>) =>
    (child as any).key === this.state.activeKey;

  switchTo = (key: string | number) => this.setState({ activeKey: key });

  activePanelContent = () => {
    const activeTab = this.props.children.find(this.isActiveTab);
    return activeTab && (activeTab.props as any).children;
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

    const tabNode = (child: ReactElement<TabPanel>) => {
      const childKey = (child as any).key;
      const _tab = tabRenderer(
        <span>{(child.props as any).tab}</span>,
        this.isActiveTab(child)
      );
      return React.cloneElement(_tab as ReactElement<any>, {
        key: childKey,
        onClick: () => this.switchTo(childKey),
        style: { ...(_tab as ReactElement<any>).props.style, cursor: 'pointer' }
      });
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
      style: { ..._rootContainer.props.style }
    });
  }
}

export default Tabs;
