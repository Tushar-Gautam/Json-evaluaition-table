import "./style.css";
import { FileUp } from "lucide-react";
import { FC } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { InputField } from "../InputField";

interface FileUploaderProps {
  getRootProps<T extends DropzoneRootProps>(props?: T): T;
  getInputProps<T extends DropzoneInputProps>(props?: T): T;
  isDragActive: boolean;
  handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleUploadClick(): void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const FileUploader: FC<FileUploaderProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  handleFileInputChange,
  handleUploadClick,
  fileInputRef,
}) => {
  return (
    <div className="upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <InputField {...getInputProps()} />
        <FileUp
          height={44}
          width={44}
          color="white"
          fill="#4E6187"
          strokeWidth={1}
        />
        {isDragActive ? (
          <p>Drop the JSON file here...</p>
        ) : (
          <div>
            <p>Drag and Drop file here</p>
          </div>
        )}
      </div>
      <div className="or-container">
        <span className="line"></span>
        <span className="or-text">or</span>
        <span className="line"></span>
      </div>
      <div>
        <button onClick={handleUploadClick} className="upload-button">
          Choose file from computer
        </button>
        <InputField
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
