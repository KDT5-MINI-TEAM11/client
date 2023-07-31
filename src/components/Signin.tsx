import { Button, Typography, Card, Form, Input, Space, message } from 'antd';
import { EMAIL_REGEX } from '@/data/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import setAccessTokenToCookie from '@/utils/setAccessTokenToCookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AccessTokenAtom, isSignedinSelector } from '@/recoil/AccessTokkenAtom';
import { signin } from '@/api/signin';
import { AxiosError } from 'axios';

const { Text } = Typography;

export default function Signin() {
  const setAccessToken = useSetRecoilState(AccessTokenAtom);

  const [messageApi, contextHolder] = message.useMessage();

  const [isSending, setIsSending] = useState(false);

  const onFinish = async (values: {
    userEmail: string;
    userPassword: string;
  }) => {
    setIsSending(true);
    try {
      const response = await signin(values);
      // 로그인 성공
      if (response.status === 200) {
        const { accessToken } = response.data.response;
        // 쿠키에 저장
        setAccessTokenToCookie(accessToken);
        // recoil에 저장
        setAccessToken(accessToken);
        messageApi.open({
          type: 'success',
          content: '로그인 하였습니다.',
        });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content:
          error.response.data.error.message ||
          '로그인에 실패하였습니다. 관리자에게 문의하세요.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const isSignedin = useRecoilValue(isSignedinSelector);
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        display: isSignedin ? 'none' : 'block',
      }}
    >
      {contextHolder}
      <Card bordered={false} style={{ margin: '0px 20px', maxWidth: 400 }}>
        <Form
          layout="vertical"
          name="basic"
          wrapperCol={{ span: 30, offset: 0 }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
          // autoComplete="off"
        >
          <Form.Item
            label="이메일"
            name="userEmail"
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
            // hasFeedback
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="userPassword"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
            disabled={isSending}
            loading={isSending}
          >
            로그인
          </Button>
          <Space style={{ marginTop: 10 }}>
            <Text>아직 회원가입을 하지 않으셨나요?</Text>
            <Link to="/signup">회원가입</Link>
          </Space>
        </Form>
      </Card>
    </div>
  );
}
