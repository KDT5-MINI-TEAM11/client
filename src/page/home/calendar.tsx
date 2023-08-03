import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/scheduleList';
import { getAccessTokenFromCookie } from '@/utils/cookies';

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

function calendar({ isSignedin }: propsType) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const schedule = async () => {
      const accessToken = getAccessTokenFromCookie();
      const response = await scheduleList(accessToken, 2023, 8);

      const responseData = response.data.response; // 실제 응답 데이터 추출
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

  const getColorFromState = (scheduleType: string) => {
    if (scheduleType === 'ANNUAL') return '#b1aee5';
    if (scheduleType === 'DUTY') return '#f08080';
    return '#ffffff'; // 기본 색상
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    console.log(arg.date.toLocaleString());
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={events}
        height={'800px'}
        dateClick={handleDateClick}
      />
    </>
  );
}

export default calendar;
