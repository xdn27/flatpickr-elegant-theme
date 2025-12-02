import "./index.css";

export default function SundayHighlightPlugin(options = {}) {
  return function (fp) {

    function markSundays() {
      const days = fp.daysContainer?.querySelectorAll(".flatpickr-day");
      if (!days) return;

      days.forEach(dayEl => {
        const date = dayEl.dateObj;
        if (date && date.getDay() === 0) {
          dayEl.classList.add(options.sundayClass || "fp-sunday");
        }
      });
    }

    function updateWeekdayHeader() {
      const weekdays = fp.calendarContainer?.querySelectorAll(".flatpickr-weekday");
      if (!weekdays || weekdays.length !== 7) return;

      const isSundayFirst = fp.config.locale.firstDayOfWeek === 0;
      const target = isSundayFirst ? weekdays[6] : weekdays[0];
      target.classList.add(options.weekdayClass || "fp-weekday-sunday");
    }

    return {
      onReady() {
        updateWeekdayHeader();
        markSundays();
      },
      onMonthChange: markSundays,
      onYearChange: markSundays,
      onOpen() {
        updateWeekdayHeader();
        markSundays();
      }
    };
  };
}
