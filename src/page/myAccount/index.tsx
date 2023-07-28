import { DUMMY_USER } from '@/data/dummyData';
import { Image, Descriptions, Skeleton } from 'antd';
import defaultProfile from '@/assets/defaultProfile.png';
import { POSITIONS } from '@/data/constants';
import formatPhoneNumber from '@/utils/formatPhonenumber';

export default function MyAccount() {
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
        <Descriptions.Item label="전화번호">
          {formatPhoneNumber(DUMMY_USER.phone_number)}
        </Descriptions.Item>
        <Descriptions.Item label="직급">
          {POSITIONS[DUMMY_USER.position].label}
        </Descriptions.Item>
        <Descriptions.Item label="남은 연차">
          {DUMMY_USER.remaining_vacation} /{' '}
          {POSITIONS[DUMMY_USER.position].maxVacation}
        </Descriptions.Item>
        <Descriptions.Item label="정보2">$60.00</Descriptions.Item>
        <Descriptions.Item label="시진">
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
