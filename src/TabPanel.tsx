import React from 'react';

export type IProps = {
  tab: React.ReactNode;
  key: string | number;
  children: React.ReactNode;
};

class TabPanel extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return null;
  }
}

export default TabPanel;
