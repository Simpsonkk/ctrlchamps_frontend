import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ACCOUNT_VERIFIED_RESPONSE_MESSAGE,
  NO_ACCOUNT_TO_VERIFY_RESPONSE_MESSAGE,
} from 'src/components/sendOTP/constants';
import {
  useRequestNewVerificationCodeMutation,
  useSubmitVerificationCodeMutation,
} from 'src/redux/api/accountVerificationAPI';
import { RootState } from 'src/redux/rootReducer';
import { setToken } from 'src/redux/slices/tokenSlice';
import { useAppDispatch } from 'src/redux/store';

interface UseVerificationProps {
  onSubmit: () => void;
}

interface UseVerificationResult {
  code: string[];
  codeDoesNotMatch: boolean;
  handleInputChange: (index: number) => (value: string) => void;
  handleSubmit: () => Promise<void>;
  requestNewCode: () => Promise<void>;
}

const useVerification = ({ onSubmit }: UseVerificationProps): UseVerificationResult => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [submitCode] = useSubmitVerificationCodeMutation();
  const [requestNewCodeMutation] = useRequestNewVerificationCodeMutation();

  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [codeDoesNotMatch, setCodeDoesNotMatch] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.token.token);

  const decodeToken = (tokenToDecode: string): string => {
    const decoded: { id: string } = jwt_decode(tokenToDecode);

    return decoded.id;
  };

  const fetchNewCode = useCallback(
    async (userId: string) => {
      try {
        await requestNewCodeMutation({ userId })
          .unwrap()
          .catch(({ data }: { data: { message: string; statusCode: number } }) => {
            if (data.message === ACCOUNT_VERIFIED_RESPONSE_MESSAGE) {
              onSubmit();
            } else if (data.message === NO_ACCOUNT_TO_VERIFY_RESPONSE_MESSAGE) {
              router.push('/');
            }
          });
      } catch (error) {
        throw new Error(error);
      }
    },
    [onSubmit, requestNewCodeMutation, router]
  );

  const requestNewCode = useCallback(async () => {
    if (token) {
      const userId = decodeToken(token);
      await fetchNewCode(userId);
    }
  }, [fetchNewCode, token]);

  const handleInputChange = useCallback(
    (index: number) => (value: string) => {
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;

        return newCode;
      });
      setCodeDoesNotMatch(false);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const verificationCode: string = code.join('');
      const userId = decodeToken(token);
      await submitCode({ code: verificationCode, userId })
        .unwrap()
        .then((data) => {
          dispatch(setToken(data.token));
        });
      onSubmit();
    } catch (error) {
      setCodeDoesNotMatch(true);
      setCode(['', '', '', '']);
    }
  }, [code, submitCode, onSubmit, token, dispatch]);

  return {
    code,
    codeDoesNotMatch,
    handleInputChange,
    handleSubmit,
    requestNewCode,
  };
};

export default useVerification;
