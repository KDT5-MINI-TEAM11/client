import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { DatePicker, Layout, Modal, Button, Select } from 'antd';
import { useRecoilValue } from 'recoil';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from './calendar';
import Signin from '@/page/home/signin';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { getMySchedule } from '@/api/home/mySchedule';
import MySchedule from '@/page/home/mySchedule';
import { IMySchedule } from '@/types/IMySchdule';

const { RangePicker } = DatePicker;

export default function Home() {
  // const {
  //   token: { colorTextLabel },
  // } = theme.useToken();

  const accessToken = useRecoilValue(AccessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!accessToken);

  // 로그아웃을 하면 isModalOpen이 !accessToken의 상태를 바로 반영하지 않음
  // 따라서 useEffect로 반영이 되도록함
  useEffect(() => {
    setIsModalOpen(!accessToken);
  }, [accessToken]);

  const [scheduleInput, setScheduleInput] = useState<{
    scheduleType: string;
    startDate: string;
    endDate: string;
  }>({
    scheduleType: '',
    startDate: '',
    endDate: '',
  });

  const [mySchedule, setMyschedule] = useState<IMySchedule[]>([]);
  // console.log(mySchedule);
  const [isMyScheduleLoading, setIsMyScheduleLoading] = useState(false);

  useEffect(() => {
    setIsMyScheduleLoading(true);
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      try {
        const response = await getMySchedule();
        if (response.status === 200) {
          const myScheduleData = response.data.response as IMySchedule[];
          // 성공했을때
          setMyschedule(
            myScheduleData.map((schedule) => ({
              ...schedule,
              key: Math.random(), // 서버에서 받아야함
            })),
          );
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          // error.response.data.error.message ||
          '내 당직연차 데이터를 불러오지 못했습니다.',
        );
      } finally {
        setIsMyScheduleLoading(false);
      }
    };
    getData();
  }, [accessToken]);

  const myPendingSchedule = useMemo(
    () => mySchedule?.filter((schedule) => schedule.state === 'PENDING'),
    [mySchedule],
  );
  const approvedRejectdSchedule = useMemo(
    () => mySchedule?.filter((schedule) => schedule.state !== 'PENDING'),
    [mySchedule],
  );

  const handleSelect = (value: string) => {
    setScheduleInput({
      startDate: '',
      endDate: '',
      scheduleType: value,
    });
  };

  const handleRangePicker = (value: RangePickerProps['value']) => {
    const startDate = value && value[0];
    const endDate = value && value[1];
    setScheduleInput((prev) => ({
      ...prev,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    }));
  };

  const handleDatePicker = (value: DatePickerProps['value']) => {
    const startDate = dayjs(value).format('YYYY-MM-DD');
    setScheduleInput((prev) => ({
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
            padding: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div style={{ width: '100%' }}>
              <MySchedule
                schedule={myPendingSchedule}
                loading={isMyScheduleLoading}
                caption="요청대기"
              />
            </div>
            <div style={{ width: '100%' }}>
              <MySchedule
                schedule={approvedRejectdSchedule}
                loading={isMyScheduleLoading}
                caption="요청결과"
              />
            </div>
            <div>
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
              {scheduleInput.scheduleType === 'ANNUAL' ? (
                <RangePicker
                  onChange={handleRangePicker}
                  style={{ width: '100%' }}
                  disabled={scheduleInput.scheduleType !== 'ANNUAL'}
                />
              ) : (
                <DatePicker
                  onChange={handleDatePicker}
                  style={{ width: '100%' }}
                  disabled={scheduleInput.scheduleType !== 'DUTY'}
                />
              )}

              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={handleSubmitSchedule}
              >
                신청
              </Button>
            </div>
          </div>
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
            {/* 로그인 상태를 확인하기 위해서 accessToken을 boolean 데이터 형식으로 변환해서 Calendar컴포넌트에 props로 전달 */}
            <Calendar isSignedin={!!accessToken} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}