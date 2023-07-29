import { Divider } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { headerStyle } from './headerStyle';

export const HeaderComponent = () => {
  return (
    <>
      <Header style={headerStyle}>Caspel Task</Header>
      <Divider />
    </>
  );
};
