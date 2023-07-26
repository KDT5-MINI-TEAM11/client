import { useState } from 'react';
import { Button, Input, Form, Space, Select, Card } from 'antd';
import { Link } from 'react-router-dom';
import useInput from './useInput';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const { Option } = Select;

export default function SingUp() {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');
  const [prefixPhoneNumber, setPrefixPhoneNumber] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [position, setPosition] = useState('');

  /*   const password = /^(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=.*[a-zA-Z]).{8,16}$/;

  const email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; */

  const onChangePrefixPhoneNumber = (value: string) =>
    setPrefixPhoneNumber(value);

  const onChangePosition = (value: string) => setPosition(value);

  const getPhoneNumber = () => {
    return `${prefixPhoneNumber}${phoneNumber}`;
  };

  const combinedPhoneNumber = getPhoneNumber();

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="이름"
          name="username"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input
            placeholder="ex) 김아무개"
            value={name}
            onChange={onChangeName}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="E-Mail"
          name="e-mail"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input
            placeholder="ex) anyone123@email.com"
            value={email}
            onChange={onChangeEmail}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={onChangePassword}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="confirm_password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: '비밀번호를 입력해주세요' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="연락처"
          name="phone"
          rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
        >
          <Space>
            <Form.Item name="prefixPhoneNumber" noStyle>
              <Select
                placeholder="-선택-"
                style={{ width: 85 }}
                value={prefixPhoneNumber}
                onChange={onChangePrefixPhoneNumber}
              >
                <Option value="010">010</Option>
                <Option value="011">011</Option>
              </Select>
            </Form.Item>
            <Input
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              allowClear
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="position"
          label="직급"
          rules={[{ required: true, message: '직급을 선택해주세요.' }]}
        >
          <Select
            placeholder="-직급-"
            value={position}
            onChange={onChangePosition}
            style={{ width: 85 }}
          >
            <Option value="1">사원</Option>
            <Option value="2">대리</Option>
            <Option value="3">과장</Option>
          </Select>
        </Form.Item>
        {combinedPhoneNumber} {/*출력되는지 확인*/}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
