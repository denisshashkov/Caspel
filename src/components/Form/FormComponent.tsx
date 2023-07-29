import { Button, Form, Input, message, Space } from 'antd';
import { addUser, editUser, IUser } from '../../store/usersSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

interface IProps {
  editingUser: IUser | null;
  setEditingUser: (value: null | IUser) => void;
  setIsModalOpen: (value: boolean) => void;
}

export const FormComponent: React.FC<IProps> = ({
  editingUser,
  setEditingUser,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue({
        name: editingUser.name,
        date: editingUser.date,
        age: editingUser.age,
      });
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

  const onFinish = (values: IUser) => {
    if (editingUser) {
      dispatch(editUser({ ...values, id: editingUser?.id }));
      setEditingUser(null);
    } else {
      dispatch(addUser(values));
    }
    setIsModalOpen(false);
    message.success('все прошло успешно!');
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.error('упс, ошибка!');
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='name'
        label='Name'
        rules={[
          { required: true, message: 'please enter your name' },
          { type: 'string', min: 3 },
        ]}
      >
        <Input placeholder='insert name' />
      </Form.Item>
      <Form.Item
        name='date'
        label='Date'
        rules={[
          { required: true, message: 'please enter your date' },
          { type: 'string' },
        ]}
      >
        <Input placeholder='insert date' />
      </Form.Item>
      <Form.Item
        name='age'
        label='Age'
        rules={[
          {
            required: true,
            message: 'must be a number',
            pattern: new RegExp(/^[0-9]+$/),
          },
        ]}
      >
        <Input placeholder='insert date' />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type='primary' htmlType='submit'>
            Ok
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
