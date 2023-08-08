import { useState, useEffect, useRef, Dispatch } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/home/scheduleList';
import { Switch } from 'antd';
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
  const calendarRef = useRef(null);

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
            isAllChecked || item.userName === infoResponseData.userName,
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

  return (
    <>
      <Switch
        checkedChildren="All"
        unCheckedChildren="My"
        defaultChecked
        checked={isAllChecked}
        onChange={(check) => setIsAllChecked(check)}
        loading={isLoading}
      />
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
      />
    </>
  );
}
