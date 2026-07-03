import Settings from "./settings.model";

export const createSettings =
async (data: any) => {
  return await Settings.create(data);
};

export const getSettings =
async (
  workspaceId: string
) => {

  return await Settings.findOne({
    workspaceId,
  });

};

export const updateSettings =
async (
  settingsId: string,
  data: any
) => {

  return await Settings.findByIdAndUpdate(
    settingsId,
    data,
    {
      new: true,
    }
  );

};

export const deleteSettings =
async (
  settingsId: string
) => {

  return await Settings.findByIdAndDelete(
    settingsId
  );

};