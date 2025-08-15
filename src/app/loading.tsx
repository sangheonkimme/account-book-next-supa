import { Loader, Center } from '@mantine/core';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Center style={{ minHeight: '100vh' }}>
      <Loader />
    </Center>
  );
}
