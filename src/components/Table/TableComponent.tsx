import { Button, Modal, Space, Table } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import { FormComponent } from '../Form/FormComponent';
import { IUser, removeUser } from '../../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { tableStyle } from './tableComponentStyle';

export const TableComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const usersArr = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const dataSource = usersArr.map((user) => ({ ...user, key: user.id }));
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: IUser, b: IUser) => a.age - b.age,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: IUser) => {
        return (
          <Space size='middle'>
            <EditTwoTone
              onClick={() => {
                setIsModalOpen(true);
                setEditingUser(record);
              }}
            />
            <DeleteTwoTone
              onClick={() => {
                Modal.confirm({
                  title: 'Are you sure?',
                  okText: 'Yes',
                  okType: 'primary',
                  onOk: () => {
                    dispatch(removeUser(record));
                  },
                });
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div style={tableStyle}>
      <Button type='primary' onClick={() => setIsModalOpen(true)}>
        Добавить
      </Button>

      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        closeIcon={false}
        open={isModalOpen}
        footer={null}
      >
        <FormComponent
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};
