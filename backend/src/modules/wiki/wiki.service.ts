import Wiki from "./wiki.model";

export const createWiki = async (
  data: any
) => {
  return Wiki.create(data);
};

export const getWorkspaceWikis =
async (
  workspaceId: string
) => {
  return Wiki.find({
    workspaceId,
  })
  .populate(
    "createdBy",
    "name email"
  )
  .sort({
    updatedAt: -1,
  });
};

export const getWikiById =
async (
  wikiId: string
) => {
  return Wiki.findById(
    wikiId
  )
  .populate(
    "createdBy",
    "name email"
  )
  .populate(
    "collaborators",
    "name email"
  );
};

export const updateWiki =
async (
  wikiId: string,
  data: any
) => {
  return Wiki.findByIdAndUpdate(
    wikiId,
    data,
    {
      new: true,
    }
  );
};

export const deleteWiki =
async (
  wikiId: string
) => {
  return Wiki.findByIdAndDelete(
    wikiId
  );
};

export const searchWiki =
async (
  keyword: string
) => {

  return Wiki.find({
    $or: [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        content: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  });

};