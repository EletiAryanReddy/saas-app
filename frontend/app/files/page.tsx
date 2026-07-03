"use client";

import { useEffect }
from "react";

import {
  getFiles,
} from "@/services/api/file.service";

import {
  useFileStore,
} from "@/store/file.store";

import UploadZone
from "@/components/files/UploadZone";

import FileCard
from "@/components/files/FileCard";

export default function FilesPage() {

  const {
    files,
    setFiles,
  } = useFileStore();

  useEffect(() => {

    loadFiles();

  }, []);

  const loadFiles =
  async () => {

    const data =
      await getFiles(
        "6a2c2c86bd54aa6fdf34690a"
      );

    setFiles(data);
  };

  return (
    <div>

      <UploadZone />

      {files.map(
        (file: any) => (

          <FileCard
            key={file._id}
            file={file}
          />
        )
      )}

    </div>
  );
}