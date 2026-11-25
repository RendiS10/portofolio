import { useState, useCallback } from 'react';

export function useClipboard(resetDelay: number = 2000) {
  const [copied, setCopied] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const copy = useCallback(
    (text: string) => {
      const scheduleReset = () => {
        setTimeout(() => {
          setCopied(false);
          setFailed(false);
        }, resetDelay);
      };

      // Clipboard API ditolak di konteks tidak aman atau saat izin diblokir; pengguna harus tahu salinan gagal.
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setFailed(false);
          setCopied(true);
          scheduleReset();
        })
        .catch(() => {
          setCopied(false);
          setFailed(true);
          scheduleReset();
        });
    },
    [resetDelay]
  );

  return { copied, failed, copy };
}
