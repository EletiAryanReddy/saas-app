import Task from "./task.model";

export const createTask = async (data: any) => {
  return await Task.create(data);
};

export const getTasksByWorkspace = async (
  workspaceId: string
) => {
  return await Task.find({
    workspaceId,
  })
    .populate("assignedTo")
    .populate("createdBy");
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
) => {
  return await Task.findByIdAndUpdate(
    taskId,
    { status },
    { new: true }
  );
};

export const deleteTask = async (
  taskId: string
) => {
  return await Task.findByIdAndDelete(
    taskId
  );
};