const PatientFilterBar = ({ filters, active, onChange }) => {
  return (
    <div className="chip-filter-wrap">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          className={`chip-filter ${active === filter ? "active" : ""}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default PatientFilterBar;
