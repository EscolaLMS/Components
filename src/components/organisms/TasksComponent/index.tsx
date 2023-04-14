/* eslint-disable no-case-declarations */
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { BiListCheck, BiListMinus, BiListPlus, BiListUl } from "react-icons/bi";
import { MdMoreHoriz, MdEditNote, MdDeleteForever } from "react-icons/md";
import {
  Button,
  Checkbox,
  Title,
  Text,
  Row,
  List,
  Dropdown,
  DropdownMenu,
  IconText,
  Modal,
  ModalAddTask,
  Stack,
} from "../../..";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { isAfter, isBefore, isToday, isTomorrow } from "date-fns";
import { API } from "@escolalms/sdk/lib";
import { t } from "i18next";
import {
  TasksContainer,
  TasksHeader,
  TasksBody,
  TasksMenu,
  TasksContent,
  TasksContentHeader,
  TaskItem,
  TaskDate,
  TaskDateWrapper,
  ProgrammeText,
  StyledTitle,
} from "./styles";
import styled, { withTheme } from "styled-components";
import { ModalDeleteTask } from "../ModalDeleteTask";
import { TaskDetailsModal } from "../TaskDetailsModal";

type TasksType = API.Task & { has_notes: boolean };

type CreateByType = "Incoming" | "Personal";

export interface Dropdown {
  id: number;
  content: ReactNode;
}

interface TasksComponentProps {
  sortOptions: { options: Dropdown[]; type: string };
  taskShowAction: {
    options: { id: number; content: ReactNode }[];
    showDone: boolean;
  };
  createBy: { options: Dropdown[]; type: CreateByType };
}

const ChangeStatusCheckbox = ({
  id,
  checked,
  onSuccess,
}: {
  id: number;
  checked: boolean;
  onSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTaskStatus } = useContext(EscolaLMSContext);

  return (
    <Checkbox
      disabled={isLoading}
      checked={checked}
      onChange={(e) => {
        setIsLoading(true);
        updateTaskStatus(id, e.target.checked)
          .then(() => {
            setIsLoading(false);
            onSuccess();
          })
          .catch(() => setIsLoading(false));
      }}
    />
  );
};

const TasksComponent: FC<TasksComponentProps> = ({
  sortOptions,
  taskShowAction,
  createBy,
}) => {
  const [isModalVisible, setIsModalVisible] = useState({
    addTask: false,
    deleteTask: false,
    editTask: false,
  });
  const [taskForActions, setTaskForActions] = useState<API.Task>();

  const { fetchTasks, addTask, fetchProgress, deleteTask, tasks } =
    useContext(EscolaLMSContext);

  const tasksList = tasks.list?.data;
  const [pagination] = useState<{ current: number; pageSize: number }>({
    current: 0,
    pageSize: 100,
  });
  const closeModal = (key: keyof typeof isModalVisible) =>
    setIsModalVisible((prev) => ({ ...prev, [key]: false }));
  const openModal = (key: keyof typeof isModalVisible) =>
    setIsModalVisible((prev) => ({ ...prev, [key]: true }));

  const checkDate = (date: string) => {
    if (isToday(new Date(date))) return "Today";
    if (isTomorrow(new Date(date))) return "Tomorrow";
    if (isBefore(new Date(date), new Date())) return "Overdue";
    if (isAfter(new Date(date), new Date())) return "Upcoming";
  };

  const checkCreateBy = (tasks: API.Task[], create: CreateByType) => {
    const checkedTasks = tasks ?? [];
    return checkedTasks.filter((task) =>
      create === "Personal"
        ? task.created_by?.id === task.user?.id
        : task.created_by?.id !== task.user?.id
    );
  };

  const sortTasks = (tasksToSort: API.Task[], sortType: string) => {
    const checkedTasksToSort = tasksToSort || [];

    switch (sortType) {
      case "Ascending":
        return checkedTasksToSort.sort(
          (a, b) =>
            new Date(a.due_date).valueOf() - new Date(b.due_date).valueOf()
        );
      default:
        return checkedTasksToSort.sort(
          (a, b) =>
            new Date(b.due_date).valueOf() - new Date(a.due_date).valueOf()
        );
    }
  };

  const filterTasks = (
    tasks: TasksType[],
    type: string,
    create: CreateByType
  ) => {
    const sortedTasks = sortTasks(tasks, sortOptions.type);
    const toDoTasks = sortedTasks.filter((task) => task.completed_at === null);

    const getTaskArray = () =>
      taskShowAction.showDone ? sortedTasks : toDoTasks;

    switch (type) {
      case "Today":
        const today = getTaskArray().filter((task) =>
          isToday(new Date(task.due_date))
        );
        return checkCreateBy(today, create);
      case "Upcoming":
        const upcoming = getTaskArray().filter(
          (task) =>
            isAfter(new Date(task.due_date), new Date()) &&
            !isToday(new Date(task.due_date))
        );
        return checkCreateBy(upcoming, create);

      case "Overdue":
        const overdue = getTaskArray().filter(
          (task) =>
            isBefore(new Date(task.due_date), new Date()) &&
            !isToday(new Date(task.due_date))
        );
        return checkCreateBy(overdue, create);
      default:
        return checkCreateBy(getTaskArray(), create);
    }
  };
  const listItems = [
    {
      id: 0,
      icon: <BiListUl size="1.2em" />,
      text: t<string>("Tasks.AllTasks"),
      numberOfItems: tasksList
        ? filterTasks(tasksList as TasksType[], "All", createBy.type).length
        : 0,
    },
    {
      id: 1,
      icon: <BiListCheck size="1.2em" />,
      text: t<string>("Tasks.TodayTasks"),
      numberOfItems: tasksList
        ? filterTasks(tasksList as TasksType[], "Today", createBy.type).length
        : 0,
    },
    {
      id: 2,
      icon: <BiListPlus size="1.2em" />,
      text: t<string>("Tasks.UpcomingTasks"),
      numberOfItems: tasksList
        ? filterTasks(tasksList as TasksType[], "Upcoming", createBy.type)
            .length
        : 0,
    },
    {
      id: 3,
      icon: <BiListMinus size="1.2em" />,
      text: t<string>("Tasks.OverdueTasks"),
      numberOfItems: tasksList
        ? filterTasks(tasksList as TasksType[], "Overdue", createBy.type).length
        : 0,
    },
  ];

  const taskAction = [
    {
      id: 10,
      content: (
        <IconText
          icon={<MdEditNote />}
          text="Edit"
          onClick={() => openModal("editTask")}
        />
      ),
    },
    {
      id: 20,
      content: (
        <IconText
          icon={<MdDeleteForever />}
          text="Delete"
          onClick={() => openModal("deleteTask")}
        />
      ),
    },
  ];

  const refreshTasks = () => fetchTasks(pagination);

  const handleDeleteTask = async () => {
    taskForActions && (await deleteTask(taskForActions.id));
    await fetchTasks(pagination);
    closeModal("deleteTask");
  };

  const addTaskButton = {
    title: t("Tasks.add", {
      defaultValue: "Add task",
    }),
    onClick: () => openModal("addTask"),
  };
  const [selectedListItem, setSelectedListItem] = useState<number>(0);
  const currentlySelectedListItem = listItems.find(
    ({ id }) => id === selectedListItem
  );

  const tasksToShowInList = () =>
    filterTasks(
      tasksList as TasksType[],
      String(currentlySelectedListItem?.text),
      createBy.type
    );

  useEffect(() => {
    fetchTasks(pagination);
    fetchProgress();
  }, [fetchProgress, fetchTasks, pagination]);

  return (
    <>
      <TasksContainer>
        <TasksHeader>
          <Title>{t<string>("Tasks.TasksHeader")}</Title>
          <Button onClick={addTaskButton.onClick} mode="secondary">
            {t<string>("Tasks.AddTask")}
          </Button>
        </TasksHeader>
        <TasksBody>
          <TasksMenu>
            <List
              listItems={listItems}
              selectedListItem={selectedListItem}
              setSelectedListItem={setSelectedListItem}
            />
          </TasksMenu>
          <TasksContent>
            <TasksContentHeader>
              <Title>{currentlySelectedListItem?.text}</Title>
              <DropdownMenu
                child={
                  <Text size="12" noMargin>
                    {`${t<string>("Tasks.CreateBy")}: ${createBy.type}`}
                  </Text>
                }
                menuItems={createBy.options}
              />
              <DropdownMenu
                child={
                  <Text size="12" noMargin>
                    {`${t<string>("Tasks.Sort")}: ${sortOptions.type}`}
                  </Text>
                }
                menuItems={sortOptions.options}
              />
              <DropdownMenu
                child={<MdMoreHoriz size="1.6em" />}
                menuItems={taskShowAction.options}
              />
            </TasksContentHeader>
            {tasksToShowInList().map((item: API.Task) => {
              const { id, title, completed_at, related_type } = item;
              const checkedDate = checkDate(String(item.due_date));
              return (
                <TaskItem key={id}>
                  <Row $gap={16}>
                    <ChangeStatusCheckbox
                      id={id}
                      checked={!!completed_at}
                      onSuccess={refreshTasks}
                    />
                    <Stack>
                      <StyledTitle $isCompleted={!!completed_at} as="h2">
                        {title}
                      </StyledTitle>
                      {related_type && (
                        <ProgrammeText>
                          {String(related_type).replaceAll("\\", " - ")}
                        </ProgrammeText>
                      )}
                    </Stack>
                  </Row>
                  <TaskDateWrapper>
                    <TaskDate $date={checkedDate}>
                      <Text>{checkedDate}</Text>
                    </TaskDate>

                    <DropdownMenu
                      onClick={() =>
                        item !== taskForActions && setTaskForActions(item)
                      }
                      child={<MdMoreHoriz size="1.6em" />}
                      menuItems={taskAction}
                    />
                  </TaskDateWrapper>
                </TaskItem>
              );
            })}
            {tasksToShowInList().length === 0 && (
              <Text>{t<string>("Tasks.NoTasks")}</Text>
            )}
          </TasksContent>
        </TasksBody>
      </TasksContainer>
      <Modal
        visible={isModalVisible.addTask}
        onClose={() => closeModal("addTask")}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        width={800}
      >
        <ModalAddTask
          refreshTasks={refreshTasks}
          addTask={addTask}
          onSuccess={() => {
            closeModal("addTask");
          }}
          onCancel={() => closeModal("addTask")}
        />
      </Modal>

      <Modal
        visible={isModalVisible.editTask}
        onClose={() => closeModal("editTask")}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        width={800}
      >
        <TaskDetailsModal
          task={taskForActions as API.Task & { has_notes: boolean }}
          closeModal={() => closeModal("editTask")}
          onTaskUpdateSuccess={refreshTasks}
          onTaskStatusUpdateSuccess={refreshTasks}
        />
      </Modal>

      <Modal
        visible={isModalVisible.deleteTask}
        onClose={() => closeModal("deleteTask")}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        width={800}
      >
        <ModalDeleteTask
          handleDelete={handleDeleteTask}
          handleClose={() => closeModal("deleteTask")}
        />
      </Modal>
    </>
  );
};

export default withTheme(styled(TasksComponent)``);
