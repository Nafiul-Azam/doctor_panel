const SectionTitle = ({ title, subtitle, action }) => {
  return (
    <div className="section-title-row">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default SectionTitle;
