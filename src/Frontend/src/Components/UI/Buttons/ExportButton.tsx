import Button from '@mui/material/Button';

function ExportButton({ children, onClick }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        padding: '0px 10px',
        cursor: ' pointer',
        fontSize: '14px',
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: '#0056b3',
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ExportButton;
