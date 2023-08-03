import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function calendar() {
  const event = [
    {
      title: '공부하기',
      start: '2023-08-13',
      end: '2023-08-14',
      color: '#b1aee5',
    },
    {
      title: '축구하기',
      start: '2023-02-15',
      end: '2023-08-19',
      color: '#b1aee5',
    },
    {
      title: '빨래하기',
      start: '2023-08-08',
      end: '2023-08-30',
      color: '#2dee11',
    },
  ];
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={event}
        height={'800px'}
        editable={true}
      />
    </>
  );
}

export default calendar;
