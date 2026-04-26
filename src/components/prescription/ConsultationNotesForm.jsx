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
    <section className="relative overflow-hidden border border-[#0f9aa3]/15 bg-[radial-gradient(circle_at_top_right,rgba(157,236,239,0.35),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,255,255,0.94))] p-5 shadow-[0_24px_70px_rgba(16,118,126,0.10)] md:p-6">
      {/* Rx Watermark */}
      <div className="pointer-events-none absolute right-5 top-4 z-0 -rotate-6 font-serif text-[72px] font-black leading-none text-[#0f9aa3]/10 md:right-8 md:top-6 md:text-[104px]">
        Rx
      </div>

      {/* Header */}
      <div className="relative z-10 mb-5 flex flex-col gap-3 border-b border-dashed border-[#0f9aa3]/25 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#0f9aa3]">
            Clinical Consultation
          </p>

          <h3 className="text-xl font-black tracking-tight text-[#12464d]">
            Clinical Consultation Sheet
          </h3>

          <p className="mt-1 text-xs font-semibold text-[#6d969a]">
            Write patient notes with real prescription pad feeling
          </p>
        </div>

        <div className="w-fit rounded-full border border-[#bdebed] bg-[#e9fbfb] px-3 py-2 text-[11px] font-black text-[#0f8f99] shadow-sm">
          Doctor Notes
        </div>
      </div>

      {/* Fields */}
      <div className="relative z-10 grid gap-4">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 inline-flex text-sm font-black text-[#366d73]">
              {field.label}
            </span>

            <textarea
              rows={3}
              value={values[field.name] || ""}
              placeholder="Write here..."
              spellCheck={false}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="min-h-[112px] w-full resize-y border-0 bg-[linear-gradient(to_bottom,transparent_31px,rgba(15,154,163,0.18)_32px)] bg-[length:100%_32px] px-1 py-2 text-[18px] font-medium leading-8 tracking-wide text-[#173f45] shadow-none outline-none transition duration-200 placeholder:text-[#5f858a]/40 focus:border-0 focus:bg-[linear-gradient(to_bottom,transparent_31px,rgba(15,154,163,0.24)_32px)] focus:bg-[length:100%_32px] focus:shadow-none [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] max-sm:min-h-[118px] max-sm:px-1 max-sm:text-[17px] max-sm:leading-[31px] max-sm:bg-[length:100%_31px]"
            />
          </label>
        ))}

        <label className="block">
          <span className="mb-2 inline-flex text-sm font-black text-[#366d73]">
            Follow-up Date
          </span>

          <input
            type="date"
            value={values.followUpDate || ""}
            onChange={(event) => onChange("followUpDate", event.target.value)}
            className="w-full max-w-[280px]  px-4 py-3 text-sm font-extrabold text-[#12464d] shadow-[0_10px_24px_rgba(16,118,126,0.04)] outline-none transition duration-200 focus:border-[#0f9aa3]/45 focus:shadow-[0_0_0_4px_rgba(15,154,163,0.08),0_14px_34px_rgba(16,118,126,0.08)]"
          />
        </label>
      </div>

      {/* Signature */}
      <div className="relative z-10 mt-8 flex justify-end max-sm:justify-stretch">
        <div className="min-w-[190px] border-t-2 border-[#12464d]/55 pt-2 text-center text-xs font-black text-[#5f858a] max-sm:w-full">
          Signature
        </div>
      </div>
    </section>
  );
};

export default ConsultationNotesForm;
