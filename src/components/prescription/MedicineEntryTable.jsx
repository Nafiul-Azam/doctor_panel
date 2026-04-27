import { Plus } from "lucide-react";
import IconButton from "../common/IconButton";

const MedicineEntryTable = ({ medicines, onAddRow, onUpdate }) => {
  return (
    <section className="medicine-table-wrap prescription-medicine-block">
      <div className="medicine-table">
        <div className="medicine-row head">
          <span>Medicine</span>
          <span>Dose</span>
          <span>Frequency</span>
          <span>Duration</span>
        </div>
        {medicines.map((medicine, index) => (
          <div className="medicine-row" key={`med-${index + 1}`}>
            <input
              value={medicine.name}
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              placeholder="Name"
            />
            <input
              value={medicine.dose}
              onChange={(e) => onUpdate(index, "dose", e.target.value)}
              placeholder="Dose"
            />
            <input
              value={medicine.frequency}
              onChange={(e) => onUpdate(index, "frequency", e.target.value)}
              placeholder="Frequency"
            />
            <input
              value={medicine.duration}
              onChange={(e) => onUpdate(index, "duration", e.target.value)}
              placeholder="Duration"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicineEntryTable;
