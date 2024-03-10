import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { SyntheticEvent, useMemo, useState } from 'react';
import { FIRST_ELEMENT } from 'src/components/complete-profile-fourth/constants';
import { useLocales } from 'src/locales';
import { StyledAccordionContainer } from './styles';
import { FaqQuestion } from './types';

export default function FaqAccordion(): JSX.Element {
  const { translate } = useLocales();

  const questions: FaqQuestion[] = useMemo(
    () => [
      { title: translate('faq.firstQuestionTitle'), content: translate('faq.firstQuestionAnswer') },
      {
        title: translate('faq.secondQuestionTitle'),
        content: translate('faq.secondQuestionAnswer'),
      },
      { title: translate('faq.thirdQuestionTitle'), content: translate('faq.thirdQuestionAnswer') },
    ],
    [translate]
  );

  const [expanded, setExpanded] = useState<string | boolean>(questions[FIRST_ELEMENT].title);

  const handleChange =
    (panel: string) => (_: SyntheticEvent<Element, Event>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <StyledAccordionContainer>
      {questions.map((question) => (
        <Accordion
          key={question.title}
          expanded={expanded === question.title}
          onChange={handleChange(question.title)}
        >
          <AccordionSummary
            aria-controls={`${question.title}-content`}
            expandIcon={<ExpandMore />}
            id={`${question.title}-header`}
          >
            <Typography>{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{question.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledAccordionContainer>
  );
}
