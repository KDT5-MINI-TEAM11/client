import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleList } from '@/api/scheduleList';

interface itemType {
  userNmae: string;
  scheduleType: string;
  startDate: string;
  endDate: string;
}

function calendar() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const schedule = async () => {
      const response = await scheduleList(2023, 8);

      const events = response.data.map((item: itemType) => {
        return {
          title: `${item.userNmae} ${item.scheduleType}`,
          start: item.startDate,
          end: item.endDate,
          color: '#b1aee5',
        };
      });
      setEvents(events);
    };
    schedule();
  }, []);

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
