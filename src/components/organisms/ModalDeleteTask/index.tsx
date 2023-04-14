import { Row, Button, Stack, Text, Title } from "../../../";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}

export const ModalDeleteTask: FC<Props> = ({ handleClose, handleDelete }) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const handleWaitDelete = async () => {
    setDisabled(true);
    await handleDelete();
    setDisabled(false);
  };

  return (
    <Stack $gap={8}>
      <Title>{t<string>("Tasks.DeleteTask")}</Title>
      <Text>{t<string>("Tasks.DeleteTaskDescription")}</Text>
      <Row
        style={{ width: "100%", marginTop: "24px" }}
        $justifyContent="flex-end"
        $gap={12}
      >
        <Button type="button" mode="secondary" onClick={handleClose}>
          {t<string>("Tasks.Cancel")}
        </Button>

        <Button mode="secondary" disabled={disabled} onClick={handleWaitDelete}>
          {t<string>("Tasks.Delete")}
        </Button>
      </Row>
    </Stack>
  );
};
