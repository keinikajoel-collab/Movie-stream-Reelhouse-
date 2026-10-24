import { Alert, Box, CircularProgress, Typography } from '@mui/material';

// Shared loading / error / empty states.
export const Loading = () => (
  <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}><CircularProgress aria-label="Loading" /></Box>
);
export const ErrorMessage = ({ message }) => <Alert severity="error" sx={{ my: 2 }}>{message}</Alert>;
export const Empty = ({ children }) => (
  <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>{children}</Typography>
);
