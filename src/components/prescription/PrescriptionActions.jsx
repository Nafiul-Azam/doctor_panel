import { Check, FileOutput, Printer, Save, UploadCloud } from "lucide-react";
import IconButton from "../common/IconButton";

const PrescriptionActions = () => {
  return (
    <div className="prescription-actions">
      <IconButton icon={Save} label="Save Draft" variant="ghost" />
      <IconButton icon={Printer} label="Print" variant="ghost" />
      <IconButton icon={UploadCloud} label="Upload Document" variant="ghost" />
      <IconButton icon={FileOutput} label="Generate Prescription" />
      <IconButton icon={Check} label="Mark as Complete" />
    </div>
  );
};

export default PrescriptionActions;
