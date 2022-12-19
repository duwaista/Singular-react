import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./UploadStyle.css";
import CustomButton from "../../common/CustomButton";
import useAppSelector from "../../hooks/useAppSelector";
import { actions, AppState } from "../../store/store";

const maxImageSize: number = 5 * 1024 * 1024;
const maxVideoSize: number = 20 * 1024 * 1024;

const Upload = (): JSX.Element | null => {
  const [file, setFile] = useState<File | null>();
  const [fileName, setFileName] = useState("");

  const isLogged = useAppSelector((state) => state.user.isLogged);
  const progress = useSelector((state: AppState) => state.feed.uploadProgress);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFileInputChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const currentFile: File = (target.files as FileList)[0];
    setFile(currentFile);
    setFileName(target.value);
  };

  useEffect(() => {
    if (progress.done && !progress.uploading) {
      setFile(null);
      setFileName("");
    }
  }, [progress]);

  const addFileToUpload = async () => {
    if (!file) return;
    // Move to store? Umm...
    if (file.type.indexOf("image/") === 0 && file.size <= maxImageSize) {
      dispatch(actions.Feed.setUpload({ file, type: "image" }));
    } else if (
      file.type.indexOf("video/") === 0 && file.size <= maxVideoSize
    ) {
      dispatch(actions.Feed.setUpload({ file, type: "video" }));
    } else {
      console.log("File too big");
    }
  };

  const uploadFileProgressBar = useMemo(() => {
    return (
      <div
        style={{ width: `${progress.progress}%` }}
        className="progress-line"
      />
    );
  }, [progress.progress]);

  if (!isLogged) return null;

  return (
    <div className="upload-container">
      <input
        accept="image/*, video/*"
        type="file"
        value={fileName}
        onChange={handleFileInputChange}
        className="upload-input"
      />
      <CustomButton
        height="30px"
        text
        disabled={!file || progress.uploading}
        onClick={() => addFileToUpload()}
      >
        {t("upload")}
      </CustomButton>
      <div className="upload-progress-container">
        {progress.uploading && uploadFileProgressBar}
      </div>
    </div>
  );
};

export default Upload;
