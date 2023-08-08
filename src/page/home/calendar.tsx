import { useState, useEffect, useRef, Dispatch } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/home/scheduleList';
import { Switch, Button, Space, Typography, Tooltip } from 'antd';
import { getMyAccount } from '@/api/myAccount/getMyAccount';
import { getAccessTokenFromCookie } from '@/utils/cookies';
import { DUTY_ANNUAL } from '@/data/constants';

interface ScheduleItem {
  userName: string;
  scheduleType: string;
  startDate: string;
  endDate: string;
  state: string;
}

interface propsType {
  isSignedin: boolean;
  year: number;
  setYear: Dispatch<React.SetStateAction<number>>;
}

export default function Calendar({ isSignedin, year, setYear }: propsType) {
  // 데이터로 받아올 events를 상태관리
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [events, setEvents] = useState([]);
  // 달력의 현재 년도 상태관리

  // 달력의 현재 월 상태관리
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // switch 체크 상태관리
  const [isAllChecked, setIsAllChecked] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const calendarRef = useRef<FullCalendar | null>(null);

  const { Title } = Typography;

  /*   // 로그아웃 시에 이벤트를 비워서 리렌더링 시키기 위해 사용
  const clearEvents = () => setEvents([]); */

  // 데이터 변경시에 화면 리렌더링 되게
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const schedule = async () => {
      // getAccessTokenFromCookie를 이용해서 쿠키에 저장된 accessToken을 가져옴
      const accessToken = getAccessTokenFromCookie();
      // 엑세스 토큰이 없으면 서버에 요청하지 않음
      if (!accessToken) {
        return;
      }

      setIsLoading(true);

      const listResponse = await scheduleList(year);
      const infoResponse = await getMyAccount();

      // 실제 응답 데이터 추출
      const listResponseData = listResponse.data.response;
      const infoResponseData = infoResponse.data.response;

      // response data를 가져오는데 그 내부에 있는 response라는 배열 데이터를 각각의 요소를
      // 아래의 형태의 객체로 변환해서 events 변수에 저장, setEvents에 전달
      const events = listResponseData
        .filter(
          (item: ScheduleItem) =>
            (isAllChecked && item.state === 'APPROVE') ||
            (item.userName === infoResponseData.userName &&
              item.state === 'APPROVE'),
        )
        .map((item: ScheduleItem) => {
          return {
            title: item.userName,
            start: item.startDate,
            end: item.endDate,
            color: DUTY_ANNUAL[item.scheduleType].color,
          };
        });
      setEvents(events);
      setIsLoading(false);
    };
    schedule();
  }, [isSignedin, year, month, isAllChecked]);

  // 로그아웃 상태면 달력에 이벤트 렌더링 x
  /*   useEffect(() => {
    clearEvents();
  }, [isSignedin]); */

  // scheduleType에 따른 색상 변환

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDayCellContent = (args: any) => {
    // '일' 문자 제거
    return args.date.getDate();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateSet = (info: any) => {
    const date = info.view.currentStart;
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  /* 
  const formatDateToKorean = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }; */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = (info: any) => {
    console.log(info.event.title);
    console.log(info.event.start);
    console.log(info.event.end);
  };

  const goPrev = () => {
    let calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
  };

  const goNext = () => {
    let calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
  };

  const goToday = () => {
    let calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
  };

  return (
    <>
      <div
        style={{
          padding: '0 40px',
          backgroundColor: 'rgb(229 229 229)',
          borderRadius: '20px 20px 0px 0px',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <div style={{ flex: 1 }}>
          <Tooltip title="모든 일정 또는 나의 일정 확인 가능">
            <Switch
              checkedChildren="All"
              unCheckedChildren="My"
              defaultChecked
              checked={isAllChecked}
              onChange={(check) => setIsAllChecked(check)}
              loading={isLoading}
            />
          </Tooltip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Space>
            <Button onClick={goPrev}>&lt;</Button>
            <Tooltip title="오늘로 이동하려면 클릭하세요.">
              <Title style={{ margin: 0, cursor: 'pointer' }} onClick={goToday}>
                {year}년{month}월
              </Title>
            </Tooltip>
            <Button onClick={goNext}> &gt;</Button>
          </Space>
        </div>

        <div style={{ flex: 1 }}></div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={events} // 연차 당직 달력에 표시
        height={'800px'}
        datesSet={handleDateSet}
        locale={'ko'} // 지역
        dayCellContent={renderDayCellContent} // '일' 문자 렌더링 변경
        ref={calendarRef}
        eventClick={handleEventClick}
        headerToolbar={false}
      />
    </>
  );
}
