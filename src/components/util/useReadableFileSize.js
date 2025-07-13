import { useMemo } from 'react';

export function useReadableFileSize(bytes) {
  console.log("useReadableFileSize called with bytes:", bytes);
  const size = useMemo(() => {
    if (bytes === 0) return '0 B';

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(0)} ${sizes[i]}`;
  }, [bytes])

  return size;
}