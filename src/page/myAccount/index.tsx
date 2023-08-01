import { DUMMY_USER } from '@/data/dummyData';
import {
  Image,
  Descriptions,
  Skeleton,
  Input,
  Space,
  Button,
  Modal,
} from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import defaultProfile from '@/assets/defaultProfile.png';
import { POSITIONS, PASSWORD_REGEX } from '@/data/constants';
import formatPhoneNumber from '@/utils/formatPhonenumber';

import { useCallback, useEffect, useState } from 'react';
import Form, { RuleObject } from 'antd/es/form';
import { getMyAccount } from '@/api/getMyAccount';

export default function MyAccount() {
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editPhoneNumberInput, setEditPhonNumberInput] = useState(
    DUMMY_USER.phone_number,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchMyAccountInfo = async () => {
      try {
        const response = await getMyAccount();
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyAccountInfo();
  }, []);

  // 모달창제어
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Descriptions
        title="내 정보"
        bordered
        column={{ md: 2, sm: 1 }}
        size="small"
        labelStyle={{ textAlign: 'center' }}
      >
        <Descriptions.Item label="이름">
          {DUMMY_USER.user_name}
        </Descriptions.Item>
        <Descriptions.Item label="이메일">
          {DUMMY_USER.user_email}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              전화번호
              <EditOutlined
                onClick={() => {
                  setEditPhoneNumber(true);
                }}
                style={{ marginLeft: 5, fontSize: 15 }}
                className="icons"
              />
            </>
          }
        >
          {editPhoneNumber ? (
            <>
              <Space.Compact>
                <Input
                  placeholder="-없이입력해주세요"
                  value={editPhoneNumberInput}
                  onChange={(e) => setEditPhonNumberInput(e.target.value)}
                />
                <Button type="primary">수정</Button>
              </Space.Compact>
              <CloseCircleOutlined
                className="icons"
                onClick={() => {
                  setEditPhoneNumber(false);
                  setEditPhonNumberInput(DUMMY_USER.phone_number);
                }}
              />
            </>
          ) : (
            <>{formatPhoneNumber(DUMMY_USER.phone_number)}</>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="직급">
          {POSITIONS[DUMMY_USER.position].label}
        </Descriptions.Item>
        <Descriptions.Item label="남은 연차">
          {DUMMY_USER.remaining_vacation} /{' '}
          {POSITIONS[DUMMY_USER.position].maxVacation}
        </Descriptions.Item>
        <Descriptions.Item label="정보2">$60.00</Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              사진
              <EditOutlined
                style={{ marginLeft: 5, fontSize: 15 }}
                className="icons"
              />
            </>
          }
        >
          <Image
            placeholder={
              <Skeleton.Image active style={{ width: 200, height: 200 }} />
            }
            rootClassName="profile_image"
            width={200}
            height={200}
            src={DUMMY_USER.profile_thumb_url}
            fallback={defaultProfile}
          />
        </Descriptions.Item>
      </Descriptions>

      <Space.Compact>
        <Button
          type="primary"
          style={{
            width: '25rem',
            margin: '40px 0px',
            borderRadius: '10px',
          }}
          onClick={showModal}
        >
          비밀번호수정
        </Button>
        <Modal
          centered
          title="비밀번호 수정"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            layout="vertical"
            name="basic"
            wrapperCol={{ span: 30, offset: 0 }}
            style={{ maxWidth: 350 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Space direction="vertical" style={{ display: 'flex' }}>
              <Form.Item
                label="신규 비밀번호"
                name="newPassword"
                rules={[{ required: true, validator: validatePassword }]}
                hasFeedback
              >
                <Input.Password
                  placeholder="비밀번호는 8자리 이상 16자리 미만입니다."
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="신규 비밀번호 재입력"
                name="confirmPassword"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: '비밀번호를 입력해주세요' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
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
            </Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
            >
              비밀번호 수정
            </Button>
          </Form>
        </Modal>
      </Space.Compact>
    </>
  );
}
