import { DUMMY_USER } from '@/data/dummyData';
import { Image, Descriptions } from 'antd';

export default function MyAccount() {
  return (
    <Descriptions title="내 정보" bordered>
      <Descriptions.Item label="프로필">
        <Image height={150} width={200} src={DUMMY_USER.profile_thumb_url} />
      </Descriptions.Item>
      <Descriptions.Item label="이름" style={{ height: '100%' }}>
        {DUMMY_USER.user_name}
      </Descriptions.Item>
      <Descriptions.Item label="아이디">
        {DUMMY_USER.user_email}
      </Descriptions.Item>
      <Descriptions.Item label="전화번호">
        {DUMMY_USER.phone_number}
      </Descriptions.Item>
      <Descriptions.Item label="연차">
        {DUMMY_USER.remaining_vacation}
      </Descriptions.Item>
      <Descriptions.Item label="직급">{DUMMY_USER.position}</Descriptions.Item>
    </Descriptions>
  );
}
