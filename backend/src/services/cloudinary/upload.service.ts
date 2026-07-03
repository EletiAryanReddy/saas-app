import cloudinary from "./cloudinary.service";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  fileName: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "saas-files",
          public_id: Date.now() + "-" + fileName,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(fileBuffer);
  });
};