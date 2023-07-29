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
import {
  EditOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import defaultProfile from '@/assets/defaultProfile.png';
import { POSITIONS } from '@/data/constants';
import formatPhoneNumber from '@/utils/formatPhonenumber';

import { useState } from 'react';

export default function MyAccount() {
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editPhoneNumberInput, setEditPhonNumberInput] = useState(
    DUMMY_USER.phone_number,
  );
  const [editPassword, setEditPassword] = useState(false);
  const [editPasswordInput, setEditPasswordInput] = useState(
    DUMMY_USER.user_password,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
              비밀번호(영문, 숫자, 특수문자를 포함해주세요)
              <EditOutlined
                onClick={() => {
                  setEditPassword(true);
                }}
                style={{ marginLeft: 5, fontSize: 15 }}
                className="icons"
              />
            </>
          }
        >
          {editPassword ? (
            <>
              <Space.Compact>
                <Button type="primary" onClick={showModal}>
                  비밀번호수정
                </Button>
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Space direction="vertical">
                    <Input.Password placeholder="비밀번호를 입력해주세요" />
                    <Input.Password
                      placeholder="비밀번호를 입력해주세요"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Space>
                </Modal>
              </Space.Compact>
              <CloseCircleOutlined
                className="icons"
                onClick={() => {
                  setEditPassword(false);
                  setEditPasswordInput(DUMMY_USER.user_password);
                }}
              />
            </>
          ) : (
            <>{DUMMY_USER.user_password}</>
          )}
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
            src={DUMMY_USER.profile_thumb_url}
            fallback={defaultProfile}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
