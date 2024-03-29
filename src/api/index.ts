import { supabaseClient } from "utility";

// export const uploadPatientAvatar = async (
//   username: string,
//   avatarFile: File
// ) => {
//   const { data, error } = await supabaseClient.storage
//     .from("profile-image")
//     .upload(`patients/${username}/${avatarFile.name}`, avatarFile, {
//       cacheControl: "3600",
//       upsert: true,
//     });

//   if (error) return Promise.reject(error);

//   if (data) return Promise.resolve(data);
// };

export const uploadImage = async (
  imageFile: File,
  bucket: string,
  folderPath: string
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(folderPath + imageFile.name, imageFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getPublicImageUrl = async (bucket: string, path: string) => {
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);

  // if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getSignedImageUrl = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .createSignedUrl(path, 60);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getStoredProcedures = async (
  stored_procedures: string,
  params?: object
) => {
  const { data, error } = await supabaseClient.rpc(stored_procedures, params);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getFunction = async (function_name: string, params?: object) => {
  return getStoredProcedures(function_name, params);
};

export const downloadImage = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .download(path);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};
