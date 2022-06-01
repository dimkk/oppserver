import { useQuery } from 'react-query';

export function Fetcher() {
  const { isLoading, error, data } = useQuery('repoData', () => fetch('/api/v1/binance').then((res) => res.text()));

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>'An error has occurred: ' + {error.message}</>;

  return (
    <div>
      <pre>{data}</pre>
    </div>
  );
}
