const fields = [
  { name: "symptoms", label: "Symptoms" },
  { name: "observations", label: "Observations" },
  { name: "diagnosis", label: "Diagnosis" },
  { name: "advice", label: "Advice" },
  { name: "testRecommendation", label: "Test Recommendation" },
  { name: "notes", label: "Additional Notes" },
];

const ConsultationNotesForm = ({ values, onChange }) => {
  return (
    <section className="consultation-form prescription-writing-block">
      <div className="rx-mark">Rx</div>
      <h3>Clinical Consultation Sheet</h3>
      <div className="consultation-fields lined-fields">
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}
            <textarea
              rows={3}
              value={values[field.name]}
              onChange={(event) => onChange(field.name, event.target.value)}
            />
          </label>
        ))}
        <label>
          Follow-up Date
          <input
            type="date"
            value={values.followUpDate}
            onChange={(event) => onChange("followUpDate", event.target.value)}
          />
        </label>
      </div>
      <div className="signature-zone">
        <span>Signature</span>
      </div>
    </section>
  );
};

export default ConsultationNotesForm;
