import React, { useState } from 'react';
import { Button, List, Modal, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useLocales } from 'src/locales';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { SeekerActivity } from 'src/redux/api/appointmentApi';

import {
  HealthQuestionnaireBlock,
  HealthQuestionnaireModal,
  ModalBlock,
  ListItemTextStyled,
  ListItemStyled,
  InactiveStyledButton,
} from './styles';

type ChildModalProps = {
  name: string;
  note: string;
  list: string[] | SeekerActivity[];
};

export function ChildModal({ name, note, list }: ChildModalProps): JSX.Element {
  const { translate } = useLocales();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {translate('request_appointment.btns.view')}
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title">
        <HealthQuestionnaireModal>
          <FlowHeader text={translate(name)} iconType="close" callback={handleClose} />
          <ModalBlock>
            <List>
              {list.map((value, index) => (
                <ListItemStyled key={index} disableGutters>
                  <CheckBoxIcon fontSize="medium" color="primary" />
                  <ListItemTextStyled
                    primary={typeof value === 'string' ? value : value.activity.name}
                  />
                  {typeof value !== 'string' && (
                    <InactiveStyledButton variant="contained" disabled>
                      {value.answer}
                    </InactiveStyledButton>
                  )}
                </ListItemStyled>
              ))}
            </List>
            {note && (
              <HealthQuestionnaireBlock>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label={translate('health_questionnaire.note')}
                  variant="standard"
                  size="small"
                  value={translate(note)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </HealthQuestionnaireBlock>
            )}
          </ModalBlock>
        </HealthQuestionnaireModal>
      </Modal>
    </>
  );
}
