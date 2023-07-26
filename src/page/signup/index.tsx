import { useCallback, useState } from 'react';
import { Button, Input, Form, Select, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import useInput from '@/page/signup/useInput';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/data/constants';

export default function SingUp() {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');
  const [prefixPhoneNumber, setPrefixPhoneNumber] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/'); // 회원가입이 성공한 경우 홈으로 이동
  };

  // 이름 유효성 검사
  const validateName = useCallback((_: any, value: string) => {
    const NAME_REGEX = /^[가-힣]{2,20}$/;

    if (!value || NAME_REGEX.test(value)) {
      return Promise.resolve();
    }
    if (!NAME_REGEX.test(value) || /[a-zA-Z0-9]/.test(value)) {
      return Promise.reject(
        new Error('이름은 한글 음절로 두 글자 이상 입력해야합니다.'),
      );
    }
  }, []);

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

  // 연락처 뒷번호 유효성 검사
  const validatePhoneNumber = useCallback((_: any, value: string) => {
    const PHONE_REGEX = /([0-9]{3,4})([0-9]{4})$/;

    if (!value || PHONE_REGEX.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('올바른 전화번호 형식이 아닙니다.'));
  }, []);

  // 연락처 앞자리 선택 동적으로 생성
  const selectedNumbers = [0, 1, 6, 7, 8, 9];

  const selectedNumberOptions = selectedNumbers.map((Number) => {
    const prefix = `01${Number}`;
    return (
      <Option key={prefix} value={prefix}>
        {prefix}
      </Option>
    );
  });

  // 연락처 앞 번호 (ex. 010 or 011) 선택
  // select 방식이라 useInput 커스텀 훅 사용하지않고 state로 관리
  const onChangePrefixPhoneNumber = (value: string) =>
    setPrefixPhoneNumber(value);

  // 연락처 앞번호와 뒤에 번호를 합쳐주는 함수
  const getPhoneNumber = () => {
    return `${prefixPhoneNumber}${phoneNumber}`;
  };

  const combinedPhoneNumber = getPhoneNumber();

  const prefixSelector = (
    <Form.Item name="prefixPhoneNumber" noStyle>
      <Select
        placeholder="-선택-"
        style={{ width: 85 }}
        value={prefixPhoneNumber}
        onChange={onChangePrefixPhoneNumber}
      >
        {selectedNumberOptions}
      </Select>
    </Form.Item>
  );

  // 직급 선택 동적으로 생성
  const selectedPositions = [
    '인턴',
    '사원',
    '주임',
    '대리',
    '과장',
    '차장',
    '부장',
  ];

  const selectedPositionOptions = selectedPositions.map((position) => {
    return (
      <Option key={position} value={position}>
        {position}
      </Option>
    );
  });

  // 직급 선택
  // select 방식이라 state로 관리
  const onChangePosition = (value: string) => setPosition(value);

  const handleSignUp = () => {
    form.validateFields().then(() => {
      form.submit(); // 입력폼이 모두 유효한 경우에만 onFinish가 호출됨
    });
  };

  return (
    <Card
      bordered={false}
      style={{ margin: '0px 20px', minWidth: 400 }}
      title="회원가입"
    >
      <Form
        layout="vertical"
        name="basic"
        wrapperCol={{ span: 30, offset: 0 }}
        style={{ maxWidth: 352 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="이름"
          name="username"
          rules={[
            { required: true, message: '이름을 입력해주세요.' },
            { validator: validateName },
          ]}
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
          rules={[
            { required: true, message: '이메일을 입력해주세요.' },
            { validator: validateEmail },
          ]}
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
          rules={[{ required: true, validator: validatePassword }]}
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
                  new Error('비밀번호가 일치하지 않습니다.'),
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
          rules={[
            { required: true, message: '연락처를 입력해주세요.' },
            { validator: validatePhoneNumber },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
            placeholder="하이픈(-)을 빼고 입력해주세요."
            value={phoneNumber}
            onChange={onChangePhoneNumber}
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
            value={position}
            onChange={onChangePosition}
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
          onClick={handleSignUp}
        >
          회원가입
        </Button>
      </Form>
      {combinedPhoneNumber}
    </Card>
  );
}
