import {
  Image,
  Descriptions,
  Skeleton,
  Input,
  Space,
  Button,
  Modal,
  message,
} from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import defaultProfile from '@/assets/defaultProfile.png';
import { POSITIONS, PASSWORD_REGEX } from '@/data/constants';
import formatPhoneNumber from '@/utils/formatPhonenumber';

import { useCallback, useEffect, useState } from 'react';
import Form, { RuleObject } from 'antd/es/form';
import { getMyAccount } from '@/api/getMyAccount';
import { useRecoilValue } from 'recoil';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import useRefreshToken from '@/hooks/useRefreshToken';
import { changeMyInfo } from '@/api/changeMyInfo';

interface MyAccountInfoType {
  phoneNumber: string;
  position: string;
  profileThumbUrl: string;
  userEmail: string;
  userName: string;
}

export default function MyAccount() {
  const [myAccountInfo, setMyAccountInfo] = useState<MyAccountInfoType>({
    phoneNumber: '',
    position: '',
    profileThumbUrl: '',
    userEmail: '',
    userName: '',
  });

  // antd message(화면 상단에 뜨는 메세지)기능
  const [messageApi, contextHolder] = message.useMessage();

  const { refreshAccessToken } = useRefreshToken();
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editPhoneNumberInput, setEditPhonNumberInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = useRecoilValue(AccessTokenAtom);

  useEffect(() => {
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      await refreshAccessToken();
      try {
        const response = await getMyAccount(accessToken);
        if (response.status === 200) {
          console.log(response);
          // 성공했을때
          const userData = response.data.response as MyAccountInfoType;
          setMyAccountInfo({
            phoneNumber: userData.phoneNumber,
            position: userData.position,
            profileThumbUrl: userData.profileThumbUrl,
            userEmail: userData.userEmail,
            userName: userData.userName,
          });
          setEditPhonNumberInput(userData.phoneNumber);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '사용자 정보를 불러오지 못했습니다.',
        );
      }
    };
    getData();
  }, [accessToken]);

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

  const onFinish = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await changeMyInfo(accessToken, {
        userPassword: values.newPassword,
      });
      if (response.status === 200) {
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: '비밀번호를 수정하였습니다.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        error.response.data.error.message ||
          '사용자 정보 수정에 실패하였습니다.',
      );
      messageApi.open({
        type: 'success',
        content:
          error.response.data.error.message ||
          '사용자 정보 수정에 실패하였습니다.',
      });
    }
  };

  const handleChangeMyInfo = async () => {
    try {
      const response = await changeMyInfo(accessToken, {
        phoneNumber: editPhoneNumberInput,
      });
      if (response.status === 200) {
        setMyAccountInfo((prev) => ({
          ...prev,
          phoneNumber: editPhoneNumberInput,
        }));
        // 성공
        console.log(response);
        messageApi.open({
          type: 'success',
          content: '전화번호를 수정하였습니다.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        error.response.data.error.message ||
          '사용자 정보 수정에 실패하였습니다.',
      );
      messageApi.open({
        type: 'error',
        content: '전화번호를 수정실패',
      });
    } finally {
      setEditPhoneNumber(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Descriptions
        title="내 정보"
        bordered
        column={{ md: 2, sm: 1 }}
        size="small"
        labelStyle={{ textAlign: 'center' }}
      >
        <Descriptions.Item label="이름">
          {myAccountInfo.userName}
        </Descriptions.Item>
        <Descriptions.Item label="이메일">
          {myAccountInfo.userEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              전화번호
              {editPhoneNumber ? (
                <CloseCircleOutlined
                  className="icons"
                  style={{ marginLeft: 5, fontSize: 15 }}
                  onClick={() => {
                    setEditPhoneNumber(false);
                    setEditPhonNumberInput(myAccountInfo.phoneNumber);
                  }}
                />
              ) : (
                <EditOutlined
                  onClick={() => {
                    setEditPhoneNumber(true);
                  }}
                  style={{ marginLeft: 5, fontSize: 15 }}
                  className="icons"
                />
              )}
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
                <Button type="primary" onClick={handleChangeMyInfo}>
                  수정
                </Button>
              </Space.Compact>
            </>
          ) : (
            <>{formatPhoneNumber(myAccountInfo.phoneNumber)}</>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="직급">
          {POSITIONS[myAccountInfo.position]?.label}
        </Descriptions.Item>
        <Descriptions.Item label="남은 연차">
          {/* {myAccountInfo.} */}
        </Descriptions.Item>
        <Descriptions.Item label="총 연차수">
          {POSITIONS[myAccountInfo.position]?.total_vacation}
        </Descriptions.Item>

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
            src={myAccountInfo.profileThumbUrl}
            fallback={defaultProfile}
          />
        </Descriptions.Item>
      </Descriptions>

      <Button
        type="primary"
        style={{
          margin: '10px 0px',
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        비밀번호수정
      </Button>
      <Modal
        footer={null}
        centered
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        closeIcon={false}
      >
        <Form
          layout="vertical"
          name="basic"
          wrapperCol={{ span: 30, offset: 0 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Space direction="vertical" style={{ display: 'flex' }}>
            <Form.Item
              label="신규 비밀번호 (영문, 숫자, 특수문자를 포함해주세요.)"
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
    </>
  );
}
