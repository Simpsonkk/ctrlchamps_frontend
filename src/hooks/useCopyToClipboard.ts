import { useState } from 'react';

// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type ReturnType = {
  copy: CopyFn;
  copiedText: CopiedValue;
  resetCopiedText: () => void;
};

function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const resetCopiedText = (): void => setCopiedText(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      // eslint-disable-next-line
      console.log('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      // eslint-disable-next-line
      console.log('Copy failed', error);
      resetCopiedText();
      return false;
    }
  };

  return { copiedText, copy, resetCopiedText };
}

export default useCopyToClipboard;
