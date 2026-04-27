import {
  Check,
  Eye,
  FileOutput,
  Printer,
  Save,
  UploadCloud,
} from "lucide-react";
import IconButton from "../common/IconButton";

const PrescriptionActions = ({
  onSaveDraft,
  onPreview,
  onPrint,
  onUploadDocument,
  onGeneratePrescription,
  onMarkComplete,
}) => {
  return (
    <div className="prescription-actions">
      <IconButton
        icon={Save}
        label="Save Draft"
        variant="ghost"
        onClick={onSaveDraft}
      />
      <IconButton
        icon={Printer}
        label="Print"
        variant="ghost"
        onClick={onPrint}
      />
      <IconButton
        icon={Eye}
        label="Preview"
        variant="ghost"
        onClick={onPreview}
      />
      <IconButton
        icon={UploadCloud}
        label="Upload Document"
        variant="ghost"
        onClick={onUploadDocument}
      />
      <IconButton
        icon={FileOutput}
        label="Generate Prescription"
        onClick={onGeneratePrescription}
      />
      <IconButton
        icon={Check}
        label="Mark as Complete"
        onClick={onMarkComplete}
      />
    </div>
  );
};

export default PrescriptionActions;
