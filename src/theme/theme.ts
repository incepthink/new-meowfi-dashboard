import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      ...colors.brand,
      main: colors.brand[600]
    },
    secondary: {
      main: colors.neutral[600]
    },
    success: {
      ...colors.success,
      main: colors.success[500]
    },
    warning: {
      ...colors.warning,
      main: colors.warning[500]
    },
    error: {
      ...colors.error,
      main: colors.error[500]
    },
    background: {
      default: colors.neutral[50],
      paper: '#ffffff'
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600]
    }
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: `1px solid ${colors.neutral[200]}`,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            transform: 'translateY(-1px)'
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: colors.neutral[50],
            borderBottom: `2px solid ${colors.neutral[200]}`,
            fontWeight: 600,
            fontSize: '0.875rem',
            color: colors.neutral[700],
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: colors.neutral[50]
          }
        }
      }
    }
  }
});