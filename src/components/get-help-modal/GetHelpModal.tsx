import { useLocales } from 'src/locales';
import FavoriteIcon from 'src/assets/icons/FavoriteIcon';
import { HELP_EMAIL } from 'src/constants';

import { Container, IconContainer, SubTitle, Text, Link } from './styles';

export default function GetHelpModal(): JSX.Element {
  const { translate } = useLocales();

  return (
    <Container>
      <IconContainer>
        <FavoriteIcon />
      </IconContainer>
      <SubTitle>{translate('getHelpModal.subtitle')}</SubTitle>
      <Text>{translate('getHelpModal.text')}</Text>
      <Link href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</Link>
    </Container>
  );
}
