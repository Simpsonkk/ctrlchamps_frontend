import styled from '@emotion/styled';
import typography from 'src/theme/typography';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

export const TransactionsModalWrapper = styled.div`
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  background-color: ${PRIMARY.white};
  width: 600px;
  height: 100%;
  border-radius: 4px;
`;

export const TransactionModalTitle = styled.div`
  font-weight: ${typography.fontWeightSemiBold};
  font-size: ${typography.h3};
  color: ${PRIMARY.black};
  width: 90%;
  display: flex;
  justify-content: flex-start;
`;

export const TransactionParagraph = styled.div`
  color: ${SECONDARY.gray_semi_transparent};
  font-weight: ${typography.fontWeightMedium};
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding: 20px 0px;
  width: 90%;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
`;

export const TransactionAmmount = styled.span`
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightSemiBold};
`;

export const IconWrapper = styled.div<{ backgroundColor: string }>`
  background-color: ${(props): string => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-right: 5px;
`;
