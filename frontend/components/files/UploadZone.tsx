"use client";

import { uploadFile }
from "@/services/api/file.service";

export default function UploadZone() {

  const handleUpload =
  async (e: any) => {

    const file =
      e.target.files[0];

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "workspaceId",
      "6a2c2c86bd54aa6fdf34690a"
    );

    formData.append(
      "userId",
      "6a2c2bf8bd54aa6fdf346908"
    );

    await uploadFile(
      formData
    );
  };

  return (
    <input
      type="file"
      onChange={handleUpload}
    />
  );
}