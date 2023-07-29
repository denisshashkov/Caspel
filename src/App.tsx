import { Col, Row } from 'antd';
import { TableComponent } from './components/Table/TableComponent';
import { HeaderComponent } from './components/Header/HeaderComponent';

export const App = () => {
  return (
    <>
      <HeaderComponent />

      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <TableComponent />
        </Col>
      </Row>
    </>
  );
};
