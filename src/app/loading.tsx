import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  );
}
