import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";

const noteFields = [
  { name: "chiefComplaint", label: "Chief Complaint", placeholder: "Headache" },
  { name: "history", label: "History", placeholder: "OLD HAEMORRHAGIC STROKE" },
  {
    name: "onExamination",
    label: "On Examination",
    placeholder: "100/60 mm of Hg",
  },
  { name: "diagnosis", label: "Diagnosis", placeholder: "AN" },
  { name: "advice", label: "Advice", placeholder: "Drink plenty of water..." },
  {
    name: "notes",
    label: "Additional Notes",
    placeholder: "Write extra notes...",
  },
];

const createBlankMedicine = () => ({
  name: "",
  dose: "1+0+1",
  duration: "7 din",
  instruction: "",
});

const ConsultationNotesForm = ({
  values = {},
  onChange = () => {},
  previewMode = false,
}) => {
  const sheetRef = useRef(null);
  const medicineInputRefs = useRef([]);
  const [activeMedicineIndex, setActiveMedicineIndex] = useState(null);

  const medicines = useMemo(() => {
    const list = Array.isArray(values.medicines) ? values.medicines : [];
    return list.length > 0 ? list : [createBlankMedicine()];
  }, [values.medicines]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!sheetRef.current) return;

      if (!sheetRef.current.contains(event.target)) {
        setActiveMedicineIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const focusMedicine = (index) => {
    setActiveMedicineIndex(index);

    requestAnimationFrame(() => {
      medicineInputRefs.current[index]?.focus();
    });
  };

  const updateMedicine = (index, key, value) => {
    if (previewMode) return;

    const nextMedicines = medicines.map((medicine, medicineIndex) =>
      medicineIndex === index ? { ...medicine, [key]: value } : medicine,
    );

    setActiveMedicineIndex(index);
    onChange("medicines", nextMedicines);
  };

  const addMedicineAfter = (index) => {
    if (previewMode) return;

    const nextMedicines = [
      ...medicines.slice(0, index + 1),
      createBlankMedicine(),
      ...medicines.slice(index + 1),
    ];

    const nextIndex = index + 1;

    onChange("medicines", nextMedicines);
    focusMedicine(nextIndex);
  };

  const removeMedicine = (index) => {
    if (previewMode) return;

    if (medicines.length === 1) {
      onChange("medicines", [createBlankMedicine()]);
      focusMedicine(0);
      return;
    }

    const nextMedicines = medicines.filter(
      (_, medicineIndex) => medicineIndex !== index,
    );

    const nextIndex =
      index >= nextMedicines.length ? nextMedicines.length - 1 : index;

    onChange("medicines", nextMedicines);
    focusMedicine(nextIndex);
  };

  const handleMedicineEnter = (event, index) => {
    if (previewMode) return;
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (index === medicines.length - 1) {
      addMedicineAfter(index);
      return;
    }

    focusMedicine(index + 1);
  };

  return (
    <section
      ref={sheetRef}
      className="relative"
      onMouseDown={() => setActiveMedicineIndex(null)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,154,163,0.10),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.10))]" />

      <div className="relative mx-auto max-w-[1120px] overflow-hidden border border-white/90 bg-[#fffdf8] shadow-[0_18px_50px_rgba(20,70,77,0.12)]">
        {/* Hospital Header */}
        <div className="relative overflow-hidden border-b border-[#cbdadb] bg-gradient-to-r from-[#f9fffe] via-[#effafa] to-[#e3f5f6] px-4 py-3 sm:px-6">
          <div className="absolute left-0 top-0 h-2 w-full bg-[#2a7fa6]" />

          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-center text-lg font-black leading-tight text-[#b8615a] sm:text-2xl md:text-left">
                রংপুর কমিউনিটি মেডিকেল কলেজ হাসপাতাল
              </p>

              <div className="mt-1 grid gap-0.5 text-[11px] font-bold leading-4 text-[#57777b] sm:text-xs">
                <p>অধ্যাপক ডাঃ মোঃ তোফায়েল হোসাইন ভূঁইয়া</p>
                <p>এমএস নিউরো সার্জারী, ব্রেইন, নার্ভ ও স্পাইন বিশেষজ্ঞ</p>
                <p>রংপুর মেডিকেল কলেজ ও হাসপাতাল, রংপুর</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#c9eef0] bg-white/70 px-4 py-2 text-center shadow-sm md:min-w-[310px]">
              <p className="text-base font-black text-[#2e9a9b] sm:text-lg">
                Professor Dr. Md. Tofael Hossain Bhuiyan
              </p>

              <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#5f858a]">
                MS Neuro Surgery, Brain, Nerve, Spine & Stroke Specialist
              </p>

              <p className="mt-0.5 text-[11px] font-black text-[#cc6b78]">
                Professor & Head of Neurosurgery
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 border-b border-[#d4e6e8] bg-[#fbffff] text-[11px] font-bold text-[#425d61] sm:grid-cols-3 lg:grid-cols-[1.35fr_1fr_0.72fr_0.72fr_1.45fr_1.15fr] sm:text-xs">
          <label className="border-b border-r border-[#d4e6e8] px-3 py-1.5 lg:border-b-0">
            <span className="mr-1 text-[#6f8d92]">Name:</span>
            <input
              value={values.patientName || ""}
              onChange={(event) => onChange("patientName", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              placeholder="Patient name"
              className="w-[calc(100%-48px)] bg-transparent font-black text-[#12464d] outline-none placeholder:text-[#9ab2b5]"
            />
          </label>

          <label className="border-b border-[#d4e6e8] px-3 py-1.5 lg:border-b-0 lg:border-r">
            <span className="mr-1 text-[#6f8d92]">Patient ID:</span>
            <input
              value={values.patientId || ""}
              onChange={(event) => onChange("patientId", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              placeholder="P-1003"
              className="w-[calc(100%-74px)] bg-transparent font-black text-[#12464d] outline-none placeholder:text-[#9ab2b5]"
            />
          </label>

          <label className="border-b border-r border-[#d4e6e8] px-3 py-1.5 sm:border-r-0 lg:border-b-0 lg:border-r">
            <span className="mr-1 text-[#6f8d92]">Age:</span>
            <input
              value={values.age || ""}
              onChange={(event) => onChange("age", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              placeholder="55 Y"
              className="w-[calc(100%-36px)] max-w-[86px] bg-transparent font-black text-[#12464d] outline-none placeholder:text-[#9ab2b5]"
            />
          </label>

          <label className="border-b border-[#d4e6e8] px-3 py-1.5 lg:border-b-0 lg:border-r">
            <span className="mr-1 text-[#6f8d92]">Wt:</span>
            <input
              value={values.weight || ""}
              onChange={(event) => onChange("weight", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              placeholder="46 kg"
              className="w-[calc(100%-30px)] max-w-[86px] bg-transparent font-black text-[#12464d] outline-none placeholder:text-[#9ab2b5]"
            />
          </label>

          <label className="border-r border-[#d4e6e8] px-3 py-1.5 sm:border-r-0 lg:border-r">
            <span className="mr-1 text-[#6f8d92]">Mobile:</span>
            <input
              value={values.mobile || ""}
              onChange={(event) => onChange("mobile", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              placeholder="+880 1711-100003"
              className="w-[calc(100%-50px)] bg-transparent font-black text-[#12464d] outline-none placeholder:text-[#9ab2b5]"
            />
          </label>

          <label className="px-3 py-1.5">
            <span className="mr-1 text-[#6f8d92]">Date:</span>
            <input
              type="date"
              value={values.date || ""}
              onChange={(event) => onChange("date", event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              className="w-[calc(100%-42px)] bg-transparent font-black text-[#12464d] outline-none"
            />
          </label>
        </div>

        <div className="grid min-h-[720px] md:grid-cols-[240px_1fr]">
          {/* Left Clinical Panel */}
          <aside className="border-b border-[#d4e6e8] bg-[#fbffff] p-3 md:border-b-0 md:border-r md:p-4">
            <div className="grid gap-3">
              {noteFields.map((field) => (
                <label
                  key={field.name}
                  className="block"
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <span className="mb-1 block text-[11px] font-black text-[#536f74]">
                    {field.label}
                  </span>

                  <textarea
                    rows={2}
                    value={values[field.name] || ""}
                    placeholder={field.placeholder}
                    readOnly={previewMode}
                    spellCheck={false}
                    onChange={(event) =>
                      onChange(field.name, event.target.value)
                    }
                    className={`min-h-[52px] w-full px-2 py-1.5 text-[14px] font-semibold leading-5 text-[#173f45] outline-none transition [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] placeholder:text-[#9ab2b5] ${
                      previewMode
                        ? "resize-none"
                        : "resize-y focus:border-[#0f9aa3]/45 focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,154,163,0.08)]"
                    }`}
                  />
                </label>
              ))}
            </div>
          </aside>

          {/* Rx Pad */}
          <main className="relative overflow-hidden bg-[#fffdf8] px-3 py-3 sm:px-5 md:px-6 md:py-4">
            <div className="pointer-events-none absolute right-6 top-5 -rotate-6 font-serif text-[90px] font-black leading-none text-[#0f9aa3]/10 sm:text-[120px]">
              Rx
            </div>

            <div className="relative z-10 mb-2 flex flex-col gap-2 border-b border-dashed border-[#0f9aa3]/20 pb-1.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="mt-1 font-serif text-[38px] font-black italic leading-none tracking-tight text-[#12464d] sm:text-[48px]">
                  Rx
                </h3>
              </div>
            </div>

            <div className="relative z-10 grid gap-0.5">
              {medicines.map((medicine, index) => {
                const isActive = activeMedicineIndex === index;

                return (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={() => setActiveMedicineIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setActiveMedicineIndex(index);
                      }
                    }}
                    className={`relative grid items-start gap-1.5 rounded-lg p-1 outline-none transition duration-200 ${
                      isActive
                        ? "grid-cols-[30px_1fr_34px] border border-[#0f9aa3]/25 bg-[#faffff] shadow-[0_6px_18px_rgba(16,118,126,0.07)] sm:grid-cols-[34px_1fr_36px]"
                        : "grid-cols-[30px_1fr] border border-transparent bg-transparent shadow-none sm:grid-cols-[34px_1fr]"
                    }`}
                  >
                    {/* Serial Number */}
                    <div
                      className={`grid h-6 place-items-center text-[12px] font-black text-[#173f45] transition ${
                        isActive ? "bg-[#f6eeee]" : "bg-transparent"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Medicine Box */}
                    <div className="min-w-0">
                      <div className="grid grid-cols-[1fr_74px_70px] items-center gap-1.5 max-sm:grid-cols-[1fr_62px_58px]">
                        <input
                          ref={(element) => {
                            medicineInputRefs.current[index] = element;
                          }}
                          value={medicine.name || ""}
                          placeholder="Tab. Valex CR 300 mg"
                          spellCheck={false}
                          readOnly={previewMode}
                          onFocus={() => setActiveMedicineIndex(index)}
                          onKeyDown={(event) =>
                            handleMedicineEnter(event, index)
                          }
                          onChange={(event) =>
                            updateMedicine(index, "name", event.target.value)
                          }
                          className={`h-7 min-w-0 text-left text-[14px] font-semibold tracking-wide text-[#101b1d] outline-none transition placeholder:text-[#1f2c2f]/50 sm:text-[15px] [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] ${
                            isActive
                              ? "bg-[#f6eeee] px-2"
                              : "bg-transparent px-0"
                          }`}
                        />

                        <input
                          value={medicine.dose || ""}
                          placeholder="1+0+1"
                          spellCheck={false}
                          readOnly={previewMode}
                          onFocus={() => setActiveMedicineIndex(index)}
                          onChange={(event) =>
                            updateMedicine(index, "dose", event.target.value)
                          }
                          className={`h-7 min-w-0 text-center text-[12px] font-semibold text-[#101b1d] outline-none transition placeholder:text-[#1f2c2f]/50 sm:text-[13px] [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] ${
                            isActive
                              ? "bg-[#f6eeee] px-1"
                              : "bg-transparent px-0"
                          }`}
                        />

                        <input
                          value={medicine.duration || ""}
                          placeholder="7 din"
                          spellCheck={false}
                          readOnly={previewMode}
                          onFocus={() => setActiveMedicineIndex(index)}
                          onChange={(event) =>
                            updateMedicine(
                              index,
                              "duration",
                              event.target.value,
                            )
                          }
                          className={`h-7 min-w-0 text-center text-[12px] font-semibold text-[#101b1d] outline-none transition placeholder:text-[#1f2c2f]/50 sm:text-[13px] [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] ${
                            isActive
                              ? "bg-[#f6eeee] px-1"
                              : "bg-transparent px-0"
                          }`}
                        />
                      </div>

                      <input
                        value={medicine.instruction || ""}
                        placeholder="খাওয়ার আগে / পরে / চলবে"
                        spellCheck={false}
                        readOnly={previewMode}
                        onFocus={() => setActiveMedicineIndex(index)}
                        onChange={(event) =>
                          updateMedicine(
                            index,
                            "instruction",
                            event.target.value,
                          )
                        }
                        className="h-5 w-full bg-transparent px-0 text-[11px] font-semibold leading-5 text-[#7a4b55] outline-none placeholder:text-[#b68a92] sm:text-[12px] [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive]"
                      />
                    </div>

                    {/* Active Row Buttons */}
                    {isActive && !previewMode && (
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            addMedicineAfter(index);
                          }}
                          className="grid h-7 w-7 place-items-center rounded-full border border-[#111827]/20 bg-transparent text-[#111827] transition hover:border-[#0f9aa3] hover:bg-[#e9fbfb] hover:text-[#0f9aa3] active:scale-95"
                          title="Add next medicine"
                        >
                          <Plus size={18} strokeWidth={1.8} />
                        </button>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeMedicine(index);
                          }}
                          className="grid h-6 w-6 place-items-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 active:scale-95"
                          title="Remove medicine"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Advice / Follow Up */}
            <div className="relative z-10 mt-4 grid gap-3 border-t border-dashed border-[#0f9aa3]/20 pt-3 md:grid-cols-[1fr_210px]">
              <label
                className="block"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <span className="mb-1 block text-[13px] font-black text-[#366d73]">
                  Doctor&apos;s Final Advice
                </span>

                <textarea
                  rows={3}
                  value={values.finalAdvice || ""}
                  placeholder="Write final advice..."
                  readOnly={previewMode}
                  spellCheck={false}
                  onChange={(event) =>
                    onChange("finalAdvice", event.target.value)
                  }
                  className={`min-h-[78px] w-full bg-[linear-gradient(to_bottom,transparent_25px,rgba(15,154,163,0.18)_26px)] bg-[length:100%_26px] px-1 py-1 text-[15px] font-medium leading-[26px] tracking-wide text-[#173f45] outline-none placeholder:text-[#5f858a]/40 [font-family:'Segoe_Print','Bradley_Hand','Comic_Sans_MS',cursive] ${
                    previewMode ? "resize-none" : "resize-y"
                  }`}
                />
              </label>

              <div className="grid content-between gap-3">
                <label
                  className="block"
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <span className="mb-1 flex items-center gap-2 text-[13px] font-black text-[#366d73]">
                    <CalendarDays size={14} />
                    Follow-up Date
                  </span>

                  <input
                    type="date"
                    value={values.followUpDate || ""}
                    onChange={(event) =>
                      onChange("followUpDate", event.target.value)
                    }
                    className="w-full text-sm font-extrabold text-[#12464d] shadow-[0_10px_24px_rgba(16,118,126,0.04)] outline-none transition focus:border-[#0f9aa3]/45 focus:shadow-[0_0_0_4px_rgba(15,154,163,0.08)]"
                  />
                </label>

                <div className="mt-3 border-t-2 border-[#12464d]/55 pt-2 text-center text-xs font-black text-[#5f858a]">
                  Signature
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ConsultationNotesForm;
