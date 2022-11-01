import { supabaseClient } from "utility";

export const uploadPatientAvatar = async (
  username: string,
  avatarFile: File
) => {
  const { data, error } = await supabaseClient.storage
    .from("profile-image")
    .upload(`patients/${username}/${avatarFile.name}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getPublicImageUrl = async (bucket: string, path: string) => {
  const { data, error } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(path);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getSignedImageUrl = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .createSignedUrl(path, 60);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const downloadImage = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .download(path);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};
