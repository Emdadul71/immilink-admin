import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiChevronRight } from "react-icons/fi";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const events = [
  {
    title: "Meeting with Client",
    start: new Date("2023-05-05:30:00"),
    end: new Date("2023-05-05T15:00:00"),
  },
  {
    title: "Team Meeting",
    start: new Date("2023-05-03T10:00:00"),
    end: new Date("2023-05-03T11:30:00"),
  },
  {
    title: "Lunch with Colleagues",
    start: new Date("2023-05-04T12:30:00"),
    end: new Date("2023-05-04T13:30:00"),
  },
];

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Temp = () => {
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  return (
    // <div className="mt-3">
    //   <div className="flex items-center gap-2 mt-3 mb-4">
    //     <p>Dashboard</p>
    //     <FiChevronRight />
    //     <p>Appointment</p>
    //   </div>

    //   <div className="flex justify-between items-center ">
    //     <h4 className="text-primary">Appointment</h4>
    //   </div>

    //   <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
    //   <div className="mt-3">
    //     <Calendar
    //       localizer={localizer}
    //       events={events}
    //       startAccessor="start"
    //       endAccessor="end"
    //       style={{ height: "calc(100vh - 200px" }}
    //     />
    //   </div>
    // </div>

    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default Temp;
