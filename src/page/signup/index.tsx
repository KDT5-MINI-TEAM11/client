import { useCallback } from 'react';
import { Button, Input, Form, Select, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX, POSITIONS } from '@/data/constants';

export default function SingUp() {
  const navigate = useNavigate();
  const { Option } = Select;

  const onFinish = (values: any) => {
    const { prefix, phone, ...otherValues } = values;
    const phoneNumber = `${prefix}${phone}`;

    const newValues = {
      ...otherValues,
      phoneNumber: phoneNumber,
    };
    console.log('Success:', newValues);
    navigate('/'); // 회원가입이 성공한 경우 홈으로 이동
  };

  // 이메일 유효성 검사
  const validateEmail = useCallback((_: any, value: string) => {
    if (!value || EMAIL_REGEX.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('올바른 형식의 메일을 입력해주세요.'));
  }, []);

  // 비밀번호 유효성 검사
  const validatePassword = useCallback((_: any, value: string) => {
    const NUMBER_REGEX = /\d/;
    const SPECIAL_REGEX = /[!@#$%^&*()-+=]/;
    const ENGLISH_REGEX = /[a-zA-Z]/;

    if (!value) {
      return Promise.reject(new Error('비밀번호를 입력해주세요.'));
    }

    if (!NUMBER_REGEX.test(value) && !ENGLISH_REGEX.test(value)) {
      return Promise.reject(
        new Error(
          '비밀번호에는 최소 하나의 숫자와 영어 대소문자가 포함되어야 합니다.',
        ),
      );
    }

    if (!SPECIAL_REGEX.test(value) && !ENGLISH_REGEX.test(value)) {
      return Promise.reject(
        new Error(
          '비밀번호에는 최소 하나의 특수문자와 영어 대소문자가 포함되어야 합니다.',
        ),
      );
    }

    if (!NUMBER_REGEX.test(value) && !SPECIAL_REGEX.test(value)) {
      return Promise.reject(
        new Error(
          '비밀번호에는 최소 하나의 숫자와 특수문자가 포함되어야 합니다.',
        ),
      );
    }

    if (!NUMBER_REGEX.test(value)) {
      return Promise.reject(
        new Error('비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.'),
      );
    }

    if (!SPECIAL_REGEX.test(value)) {
      return Promise.reject(
        new Error('비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다.'),
      );
    }

    if (!ENGLISH_REGEX.test(value)) {
      return Promise.reject(
        new Error(
          '비밀번호에는 최소 하나의 영어 대소문자가 포함되어야 합니다.',
        ),
      );
    }

    if (!PASSWORD_REGEX.test(value)) {
      return Promise.reject(new Error('비밀번호는 8~16자 입니다.'));
    }

    return Promise.resolve();
  }, []);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select placeholder="-선택-" style={{ width: 85 }}>
        <Option value={'010'}>010</Option>
        <Option value={'011'}>011</Option>
      </Select>
    </Form.Item>
  );

  // 직급 선택 동적으로 생성
  const selectedPositionOptions = Object.keys(POSITIONS).map((key) => {
    return (
      <Option key={key} value={key}>
        {POSITIONS[key].label}
      </Option>
    );
  });

  return (
    <Card
      bordered={false}
      style={{ margin: '0px 20px', width: 400 }}
      title="회원가입"
    >
      <Form
        layout="vertical"
        name="basic"
        wrapperCol={{ span: 30, offset: 0 }}
        style={{ maxWidth: 350 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="이름"
          name="username"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="이메일"
          name="userEmail"
          rules={[
            { required: true, message: '이메일을 입력해주세요.' },
            { validator: validateEmail },
          ]}
        >
          <Input placeholder="ex) anyone123@email.com" allowClear />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="userPassword"
          rules={[{ required: true, validator: validatePassword }]}
          hasFeedback
        >
          <Input.Password
            placeholder="비밀번호는 8자리 이상 16자리 미만입니다."
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="confirm_password"
          dependencies={['userPassword']}
          hasFeedback
          rules={[
            { required: true, message: '비밀번호를 입력해주세요' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('userPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('비밀번호가 일치하지 않습니다.'),
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="연락처"
          name="phone"
          rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
            placeholder="하이픈(-)없이 12345678"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="position"
          label="직급"
          rules={[{ required: true, message: '직급을 선택해주세요.' }]}
        >
          <Select
            placeholder="-직급-"
            style={{ width: 85, textAlign: 'center' }}
          >
            {selectedPositionOptions}
          </Select>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: '100%' }}
        >
          회원가입
        </Button>
      </Form>
    </Card>
  );
}
