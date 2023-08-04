import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import {
  DatePicker,
  Layout,
  Modal,
  Button,
  Space,
  Select,
  Divider,
} from 'antd';
import { useRecoilValue } from 'recoil';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from './calendar';
import Signin from '@/page/home/signin';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

export default function Home() {
  const accessToken = useRecoilValue(AccessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!accessToken);

  // 로그아웃을 하면 isModalOpen이 !accessToken의 상태를 바로 반영하지 않음
  // 따라서 useEffect로 반영이 되도록함
  useEffect(() => {
    setIsModalOpen(!accessToken);
  }, [accessToken]);

  const [schedule, setSchedule] = useState<{
    scheduleType: string;
    startDate: string;
    endDate: string;
  }>({
    scheduleType: '',
    startDate: '',
    endDate: '',
  });

  const handleSelect = (value: string) => {
    setSchedule({
      startDate: '',
      endDate: '',
      scheduleType: value,
    });
  };

  const handleRangePicker = (value: RangePickerProps['value']) => {
    const startDate = value && value[0];
    const endDate = value && value[1];
    setSchedule((prev) => ({
      ...prev,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    }));
  };

  const handleDatePicker = (value: DatePickerProps['value']) => {
    const startDate = dayjs(value).format('YYYY-MM-DD');
    setSchedule((prev) => ({
      ...prev,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: '',
    }));
  };

  const handleSubmitSchedule = () => {};

  return (
    <>
      <Modal
        title="로그인"
        centered
        closeIcon={false}
        footer={null}
        open={isModalOpen}
      >
        <Signin setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Layout
        style={{
          filter: accessToken ? '' : 'blur(5px)',
          userSelect: 'none',
          height: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Sider
          width={300}
          style={{
            background: 'white',
          }}
        >
          <Divider orientation="left" plain>
            승인대기
          </Divider>
          <Divider orientation="left" plain>
            승인확정
          </Divider>
          <Space direction="vertical" style={{ margin: '40px 20px' }}>
            <Select
              defaultValue="DEFAULT"
              style={{ width: '100%' }}
              onChange={handleSelect}
              options={[
                { value: 'DEFAULT', label: '선택' },
                { value: 'ANNUAL', label: '연차' },
                { value: 'DUTY', label: '당직' },
              ]}
            />
            {schedule.scheduleType === 'ANNUAL' ? (
              <RangePicker
                onChange={handleRangePicker}
                style={{ width: '100%' }}
                disabled={schedule.scheduleType !== 'ANNUAL'}
              />
            ) : (
              <DatePicker
                onChange={handleDatePicker}
                style={{ width: '100%' }}
                disabled={schedule.scheduleType !== 'DUTY'}
              />
            )}

            <Button
              type="primary"
              style={{ width: '100%' }}
              onClick={handleSubmitSchedule}
            >
              신청
            </Button>
          </Space>
        </Sider>
        <Layout style={{ padding: '0 15px', flex: 1, height: '100%' }}>
          <Content
            style={{
              padding: '0 10px',
              background: 'white',
              height: '100%',
              overflow: 'auto',
            }}
          >
            {/* 로그인 상태를 확인하기 위해서 isSignedin를 Calendar컴포넌트에 props로 전달 */}
            <Calendar isSignedin={!!accessToken} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
