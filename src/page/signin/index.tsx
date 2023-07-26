import { Button, Typography, Card, Form, Input, Space } from 'antd';
import { EMAIL_REGEX } from '@/data/constants';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const onFinish = (values: { email: string; password: string }) => {
  console.log(values);
};

export default function Signin() {
  return (
    <Card
      bordered={false}
      style={{ margin: '0px 20px', minWidth: 400 }}
      title="로그인"
    >
      <Form
        layout="vertical"
        name="basic"
        wrapperCol={{ span: 30, offset: 0 }}
        style={{ maxWidth: 400 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            {
              validator: (_, value) => {
                if (!value || EMAIL_REGEX.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('올바른 형식의 메일을 입력해주세요');
              },
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: '100%' }}
        >
          로그인
        </Button>
        <Space style={{ marginTop: 10 }}>
          <Text>아직 회원가입을 하지 않으셨나요?</Text>
          <Link to="/signup">회원가입</Link>
        </Space>
      </Form>
    </Card>
  );
}
