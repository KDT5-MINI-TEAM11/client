import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Form,
  Select,
  Card,
  Upload,
  message,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX, POSITIONS } from '@/data/constants';
import { RuleObject } from 'antd/es/form';
import { handleUpload } from '@/api/cloudinary';
import { signup } from '@/api/signup';
import { checkEmail, checkEmailAuth } from '@/api/checkEmail';
import { verificationEmail } from '@/api/verification';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AccessTokenAtom, isSignedinSelector } from '@/recoil/AccessTokkenAtom';
import { setAccessTokenToCookie } from '@/utils/cookies';

interface valuseType {
  confirm_password: string;
  phone: string;
  position: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileThumbUrl: any;
  userEmail: string;
  userPassword: string;
  userName: string;
}

export default function SingUp() {
  // 이메일 중복 체크
  const [isEmailCehck, setIsEmailCheck] = useState(false);
  // 이메일 인증 번호 발송
  const [verification, setVerification] = useState(false);
  // 이메일 인증 번호 발송 후에 제출 가능 타이머
  const [timer, setTimer] = useState(0);
  // 이메일 인증 번호 재발송 ui
  const [reSend, setReSend] = useState(false);
  // 이메일 인증 과정 로딩 (중복체크, 인증번호 발송, 인증확인)
  const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증번호 확인
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const setAccessToken = useSetRecoilState(AccessTokenAtom);
  const isSignedin = useRecoilValue(isSignedinSelector);
  const navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();

  const onFinish = async (values: valuseType) => {
    const imageUrl = await getImageUrl(values);

    const newValues = {
      ...values,
      profileThumbUrl: imageUrl,
    };

    setIsSigningUp(true);
    try {
      const response = await signup(newValues);

      // 로그인 성공
      if (response.status === 200) {
        const { accessToken } = response.data.response;

        // 쿠키에 저장
        setAccessTokenToCookie(accessToken);

        // recoil에 저장
        setAccessToken(accessToken);

        // 안내메시지
        messageApi.open({
          type: 'success',
          content: '회원가입이 완료되었습니다.',
        });

        // 회원가입이 성공한 경우 홈으로 이동
        setTimeout(() => {
          navigate('/');
        }, 2000);

        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content:
          error.response.data.error.message ||
          '회원가입에 실패하였습니다. 관리자에게 문의하세요.',
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const getImageUrl = async (values: valuseType) => {
    let imageUrl = null;

    try {
      if (values.profileThumbUrl && values.profileThumbUrl.length > 0) {
        const response = await handleUpload(
          values.profileThumbUrl[0].originFileObj,
        );
        if (response?.status === 200) {
          const data = response.data;
          imageUrl = data.url; // 이미지 URL을 받아옴
        } else {
          throw new Error('이미지 업로드에 실패하였습니다.');
        }
      }
    } catch (error) {
      console.error('오류 발생:', error);
      imageUrl = null; // 오류가 발생했으므로 imageUrl을 null로 설정
    }

    return imageUrl;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // 이메일 유효성 검사
  const validateEmail = useCallback((_: RuleObject, value: string) => {
    if (!value || EMAIL_REGEX.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('올바른 형식의 메일을 입력해주세요.'));
  }, []);

  // 비밀번호 유효성 검사
  const validatePassword = useCallback((_: RuleObject, value: string) => {
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

  // 직급 선택 동적으로 생성
  const selectedPositionOptions = Object.keys(POSITIONS)
    .filter((key) => key !== 'MANAGER')
    .map((key) => {
      return (
        <Option key={key} value={key}>
          {POSITIONS[key].label}
        </Option>
      );
    });

  const handleCheckEmail = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields(['userEmail']);
      const userEmail = values.userEmail;
      const response = await checkEmail(userEmail);

      if (response.data.success) {
        setIsEmailCheck(true); // 중복되지 않은 이메일일 경우
        message.success('사용 가능한 이메일입니다.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.error.message === '이미 가입 된 이메일 입니다.'
      ) {
        setIsEmailCheck(false); // 중복된 이메일일 경우
        message.error('이미 사용 중인 이메일입니다.');
        form.setFieldsValue({ emailAuth: null });
      } else {
        message.error('이메일 중복 체크 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields(['userEmail']);
      const userEmail = values.userEmail;
      const response = await verificationEmail(userEmail);

      if (response.status === 200) {
        message.success('인증번호를 발송했습니다.');
        setTimer(180);
      } else {
        message.warning('이메일을 다시 확인해주세요.');
      }
      return response;
    } catch (error) {
      message.error('인증번호 발송에 오류가 발생했습니다.');
      return null;
    } finally {
      setIsLoading(false);
      setVerification(true);
    }
  };

  const handleReSend = async () => {
    if (reSend) {
      setIsLoading(true);
      try {
        setReSend(false);
        await handleVerificationEmail();
      } catch (error) {
        console.error('이메일 인증 요청 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let exactTimer: string | number | NodeJS.Timeout | undefined;
    if (timer > 0) {
      exactTimer = setTimeout(
        () => setTimer((prevTimer) => prevTimer - 1),
        1000,
      );
    } else if (timer === 0 && verification) {
      setReSend(true);
    }
    return () => {
      if (exactTimer) {
        clearTimeout(exactTimer);
      }
    };
  }, [timer, verification]);

  const handleEmailAuth = async () => {
    try {
      const userEmailData = await form.validateFields(['userEmail']);
      const userEmail = userEmailData.userEmail;
      const emailAuthData = await form.validateFields(['emailAuth']);
      const userEmailAuth = emailAuthData.emailAuth;
      const data = { userEmail, userEmailAuth };
      const response = await checkEmailAuth(data);

      if (response.data.success) {
        message.success('이메일 인증 성공!');
        setEmailVerified(true);
        setTimer(0);
      } else {
        message.error('이메일 인증 실패!');
      }
    } catch (error) {
      message.error('서버 요청에 실패하였습니다.');
    }
  };

  const handleReAuthentication = () => {
    setIsEmailCheck(false);
    setVerification(false);
    setEmailVerified(false);
    setReSend(false);
  };

  return (
    <div
      style={{
        zIndex: 10,
        display: isSignedin ? 'none' : 'block',
      }}
    >
      <Card bordered={false} style={{ margin: '0px 20px', width: 400 }}>
        {contextHolder}
        <Form
          form={form}
          layout="vertical"
          name="basic"
          wrapperCol={{ span: 30, offset: 0 }}
          style={{ maxWidth: 350 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="이름"
            name="userName"
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
            name="emailAuth"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject('필수 진행 항목입니다.');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {isEmailCehck ? (
              verification ? (
                emailVerified ? (
                  // 인증에 성공한 경우 - 재인증 버튼 표시
                  <div>
                    <Button type="primary" onClick={handleReAuthentication}>
                      재인증
                    </Button>
                  </div>
                ) : (
                  // 인증 번호 입력 창과 제출 버튼
                  <div>
                    <Space>
                      <Input placeholder="인증번호를 입력해주세요." />
                      <Button
                        type="primary"
                        onClick={handleEmailAuth}
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        제출
                      </Button>
                      <Button
                        type="primary"
                        onClick={handleReSend}
                        disabled={!reSend}
                        loading={isLoading}
                      >
                        재발송
                      </Button>
                    </Space>
                    <div>남은 시간: {timer}초</div>
                  </div>
                )
              ) : (
                // 인증 번호 전송 버튼
                <Button
                  type="primary"
                  onClick={handleVerificationEmail}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  인증번호 전송
                </Button>
              )
            ) : (
              // 이메일 중복 체크 버튼
              <Button
                type="primary"
                onClick={handleCheckEmail}
                disabled={isLoading}
                loading={isLoading}
              >
                이메일 중복 체크
              </Button>
            )}
          </Form.Item>

          <Form.Item
            label="비밀번호 (영문, 숫자, 특수문자를 포함해주세요.)"
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
            label="연락처 (ex. 01012345678)"
            name="phoneNumber"
            rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="하이픈(-)없이 01012345678"
              allowClear
            />
          </Form.Item>

          <Form.Item
            label="프로필"
            name="profileThumbUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false}>
              <Button>
                <PlusOutlined /> Click to Upload
              </Button>
            </Upload>
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
            disabled={isSigningUp}
            loading={isSigningUp}
          >
            회원가입
          </Button>
        </Form>
      </Card>
    </div>
  );
}
