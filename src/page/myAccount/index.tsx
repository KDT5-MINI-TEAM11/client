import {
  Image,
  Descriptions,
  Skeleton,
  Input,
  Space,
  Button,
  message,
} from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import defaultProfile from '@/assets/defaultProfile.png';
import { POSITIONS } from '@/data/constants';
import formatPhoneNumber from '@/utils/formatPhonenumber';

import { useEffect, useState } from 'react';
import { getMyAccount } from '@/api/getMyAccount';
import { useRecoilValue } from 'recoil';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import useRefreshToken from '@/hooks/useRefreshToken';
import { changeMyInfo } from '@/api/changeMyInfo';
import PasswordChangeModal from './passwordChangeModal';

interface MyAccountInfoType {
  phoneNumber: string;
  position: string;
  profileThumbUrl: string;
  userEmail: string;
  userName: string;
  usedVacation: string;
}

export default function MyAccount() {
  const [myAccountInfo, setMyAccountInfo] = useState<MyAccountInfoType>({
    phoneNumber: '',
    position: '',
    profileThumbUrl: '',
    userEmail: '',
    userName: '',
    usedVacation: '',
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
          // 성공했을때
          const userData = response.data.response as MyAccountInfoType;
          setMyAccountInfo({
            phoneNumber: userData.phoneNumber,
            position: userData.position,
            profileThumbUrl: userData.profileThumbUrl,
            userEmail: userData.userEmail,
            userName: userData.userName,
            usedVacation: userData.usedVacation,
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

  const handleChangeMyInfo = async () => {
    await refreshAccessToken();
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
    <div style={{ padding: 20 }}>
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
          {myAccountInfo.position}
        </Descriptions.Item>
        <Descriptions.Item label="사용한 연차">
          {myAccountInfo.usedVacation}일
        </Descriptions.Item>
        <Descriptions.Item label="총 연차">
          {POSITIONS[myAccountInfo.position]?.total_vacation}일
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
      <PasswordChangeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
