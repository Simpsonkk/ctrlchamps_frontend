import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Item = styled('li')`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  cursor: pointer;
`;

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 288px;
`;

export const Title = styled('h3')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  line-height: 1.6;
  letter-spacing: 0.15px;
`;

export const RejectedTitle = styled('h3')`
  color: ${SECONDARY.semi_gray};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  line-height: 1.6;
  letter-spacing: 0.15px;
`;
