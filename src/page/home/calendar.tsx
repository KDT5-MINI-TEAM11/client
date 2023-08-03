import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/scheduleList';
import { getAccessTokenFromCookie } from '@/utils/cookies';

interface ScheduleItem {
  scheduleType: string;
  startDate: string;
  endDate: string;
  state: string;
}

interface propsType {
  isSignedin: boolean;
}

function calendar({ isSignedin }: propsType) {
  // 데이터로 받아올 events를 상태관리
  const [events, setEvents] = useState([]);

  // 데이터 변경시에 화면 리렌더링 되게
  useEffect(() => {
    const schedule = async () => {
      // getAccessTokenFromCookie를 이용해서 쿠키에 저장된 accessToken을 가져옴
      const accessToken = getAccessTokenFromCookie();
      // accessToken, 년월 매개변수로 전달 (년월 전달하는 방식은 추후에 변경)
      const response = await scheduleList(accessToken, 2023, 8);

      const responseData = response.data.response; // 실제 응답 데이터 추출
      // response data를 가져오는데 그 내부에 있는 response라는 배열 데이터를 각각의 요소를
      // 아래의 형태의 객체로 변환해서 events 변수에 저장, setEvents에 전달
      const events = responseData.map((item: ScheduleItem) => {
        return {
          title: item.scheduleType,
          start: item.startDate,
          end: item.endDate,
          color: getColorFromState(item.scheduleType),
        };
      });
      setEvents(events);
    };
    schedule();
  }, [isSignedin]);

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
  const renderDayCellContent = (ko: any) => {
    // '일' 문자 제거
    return ko.date.getDate();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={events} // 연차 당직 달력에 표시
        height={'800px'}
        dateClick={handleDateClick} // 누르면 당일 날짜 콘솔에 찍힘
        locale={'ko'} // 지역
        dayCellContent={renderDayCellContent} // '일' 문자 렌더링 변경
      />
    </>
  );
}

export default calendar;
