import "./App.css";
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { EVALUATION_STATUSES, type EvaluationStatus, isValidTableData, SortOrder, TableData } from "@utils";
import { DataTable, FileUploader, Filter, Heading, SearchBar } from "@components";


const JsonTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof TableData>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<EvaluationStatus[]>([...EVALUATION_STATUSES]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setData([]);
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          if (Array.isArray(jsonData) && jsonData.every(isValidTableData)) {
            const processedData = jsonData.map((item) => ({
              ...item,
              taskStartDate: `${format(
                new Date(item.startDate),
                "MMM dd yyyy"
              )} @ ${format(new Date(item.startDate), "HH:mm")} (${
                item.timeZone
              })`,
            }));
            setData(processedData);
            toast.success("File uploaded successfully");
          } else {
            toast.error("Invalid JSON format. Please try again");
          }
        } catch (error) {
          toast.error("Parsing error. Please try again");
          console.error(error);
        }
      };
      reader.readAsText(file);
    } else {
      toast.error("Invalid File, Please upload a valid JSON file");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSort = (column: keyof TableData) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const toggleStatus = (status: EvaluationStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredData = data
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(
      (item) =>
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(item.evaluationStatus)
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <ToastContainer
        autoClose={3000}
        closeOnClick
      />
      <div className="container">
        <Heading />
        <FileUploader
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          handleFileInputChange={handleFileInputChange}
          handleUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
        />
        {data.length > 0 ? (
          <>
          <div className="search-filter-container">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              />
            <Filter
              selectedStatuses={selectedStatuses}
              toggleStatus={toggleStatus}
              />
          </div>
            <DataTable
              sortedData={sortedData}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              handleSort={handleSort}
            />
          </>
        ):null}
      </div>
    </>
  );
};

export default JsonTable;
