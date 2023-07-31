import { Badge, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { IuserHeaderInfo } from '@/types/IuserHeaderInfo';
import { POSITIONS } from '@/data/constants';
const { Text } = Typography;
export default function UserInfo({
  userHeaderInfo,
}: {
  userHeaderInfo: IuserHeaderInfo;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Avatar src={userHeaderInfo.profileThumbNail} />
      <Link to="/myaccount">{userHeaderInfo.userName}</Link>
      <Badge
        count={userHeaderInfo.position}
        color={POSITIONS[userHeaderInfo?.position]?.color}
      />
      <Text>
        남은연차{' '}
        {POSITIONS[userHeaderInfo?.position]?.total_vacation -
          Number(userHeaderInfo.usedVacation)}
        일
      </Text>
    </div>
  );
}
