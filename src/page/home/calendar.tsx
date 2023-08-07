import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/scheduleList';
import { getAccessTokenFromCookie } from '@/utils/cookies';
import { Switch } from 'antd';
import { getMyAccount } from '@/api/getMyAccount';

interface ScheduleItem {
  userName: string;
  scheduleType: string;
  startDate: string;
  endDate: string;
  state: string;
}

interface propsType {
  isSignedin: boolean;
}

export default function Calendar({ isSignedin }: propsType) {
  // 데이터로 받아올 events를 상태관리
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [events, setEvents] = useState([]);
  // 달력의 현재 년도 상태관리
  const [year, setYear] = useState(new Date().getFullYear());
  // 달력의 현재 월 상태관리
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // switch 체크 상태관리
  const [isAllChecked, setIsAllChecked] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const calendarRef = useRef(null);
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

      const listResponse = await scheduleList(accessToken, year, month);
      const infoResponse = await getMyAccount(accessToken);

      // 실제 응답 데이터 추출
      const listResponseData = listResponse.data.response;
      const infoResponseData = infoResponse.data.response;
      console.log(infoResponseData.userName);

      // response data를 가져오는데 그 내부에 있는 response라는 배열 데이터를 각각의 요소를
      // 아래의 형태의 객체로 변환해서 events 변수에 저장, setEvents에 전달
      const events = listResponseData
        .filter(
          (item: ScheduleItem) =>
            isAllChecked || item.userName === infoResponseData.userName,
        )
        .map((item: ScheduleItem) => {
          return {
            title: item.userName,
            start: item.startDate,
            end: item.endDate,
            color: getColorFromState(item.scheduleType),
          };
        });
      setEvents(events);
    };
    schedule();
  }, [isSignedin, year, month, isAllChecked]);

  /*   useEffect(() => {
    clearEvents();
  }, [isSignedin]); */

  // scheduleType에 따른 색상 변환
  const getColorFromState = (scheduleType: string) => {
    if (scheduleType === 'ANNUAL') return '#b1aee5';
    if (scheduleType === 'DUTY') return '#f08080';
    return '#ffffff'; // 기본 색상
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    console.log(arg.date.toLocaleString());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDayCellContent = (args: any) => {
    // '일' 문자 제거
    return args.date.getDate();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateSet = (info: any) => {
    let date = info.view.currentStart;
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  return (
    <>
      <Switch
        checkedChildren="All"
        unCheckedChildren="My"
        defaultChecked
        checked={isAllChecked}
        onChange={(check) => setIsAllChecked(check)}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={events} // 연차 당직 달력에 표시
        height={'800px'}
        datesSet={handleDateSet}
        dateClick={handleDateClick} // 누르면 당일 날짜 콘솔에 찍힘
        locale={'ko'} // 지역
        dayCellContent={renderDayCellContent} // '일' 문자 렌더링 변경
        ref={calendarRef}
      />
    </>
  );
}
