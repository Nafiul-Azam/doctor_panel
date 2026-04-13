import GlassCard from "../common/GlassCard";

const ChamberScheduleCard = ({ schedule }) => {
  return (
    <GlassCard>
      <h3>Chamber Schedule</h3>
      <div className="schedule-stack">
        {schedule.map((slot) => (
          <article key={slot.day}>
            <strong>{slot.day}</strong>
            <p>{slot.hours}</p>
          </article>
        ))}
      </div>
    </GlassCard>
  );
};

export default ChamberScheduleCard;
