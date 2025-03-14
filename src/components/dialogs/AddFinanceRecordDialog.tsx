'use client';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    // useMediaQuery,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    // useTheme,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

interface AddFinanceRecordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddFinanceRecordDialog({
  open,
  onClose,
}: AddFinanceRecordDialogProps) {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            top: '50%',
            gap: '16px',
            left: '50%',
            margin: '0px',
            width: '600px',
            height: '680px',
            borderRadius: '8px',
            position: 'absolute',
            paddingBottom: '24px',
            transform: 'translate(-50%, -50%)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'stretch',
          padding: '8px 16px 8px 32px',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '48px',
            fontStyle: 'normal',
            fontFamily: 'var(--font-bold)',
            color: 'var(--Primary-Black, #212B36)',
          }}
        >
          新增個案
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers={false}
        sx={{
          gap: '16px',
          display: 'flex',
          height: '530px',
          overflowY: 'auto',
          padding: '0px 32px',
          alignSelf: 'stretch',
          flexDirection: 'column',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              姓名
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="請輸入姓名"
              sx={{ mb: 0 }}
            />
          </Box>
          <TextField
            fullWidth
            placeholder="姓名"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '36px',
                display: 'flex',
                '& fieldset': {
                  borderRadius: '8px',
                  border:
                    '1px solid var(--input-Outline-Stoke-Default, rgba(145, 158, 171, 0.20))',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
                '& input': {
                  fontWeight: 400,
                  padding: '0 8px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  fontStyle: 'normal',
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
                },
              },
            }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              您的性別為？
            </FormLabel>
            <RadioGroup defaultValue="">
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="生理男"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="生理女"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              您的年齡為？
            </FormLabel>
            <RadioGroup defaultValue="">
              <FormControlLabel
                value="0-16"
                control={<Radio />}
                label="0-16歲"
              />
              <FormControlLabel
                value="16-18"
                control={<Radio />}
                label="16-18歲"
              />
              <FormControlLabel
                value="18-25"
                control={<Radio />}
                label="18-25歲"
              />
              <FormControlLabel
                value="26-44"
                control={<Radio />}
                label="26-44歲"
              />
              <FormControlLabel
                value="45-64"
                control={<Radio />}
                label="45-64歲"
              />
              <FormControlLabel
                value="65+"
                control={<Radio />}
                label="65歲以上"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              您是否為？
            </FormLabel>
            <RadioGroup defaultValue="">
              <FormControlLabel
                value="new-resident"
                control={<Radio />}
                label="新住民"
              />
              <FormControlLabel
                value="indigenous"
                control={<Radio />}
                label="原住民"
              />
              <FormControlLabel value="none" control={<Radio />} label="無" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              您的最高學歷為？
            </FormLabel>
            <RadioGroup defaultValue="">
              <FormControlLabel
                value="illiterate"
                control={<Radio />}
                label="不識字"
              />
              <FormControlLabel
                value="elementary"
                control={<Radio />}
                label="國小"
              />
              <FormControlLabel
                value="junior-high"
                control={<Radio />}
                label="國中"
              />
              <FormControlLabel
                value="high-school"
                control={<Radio />}
                label="高中/職"
              />
              <FormControlLabel
                value="university"
                control={<Radio />}
                label="大學/專"
              />
              <FormControlLabel
                value="masters"
                control={<Radio />}
                label="碩士"
              />
              <FormControlLabel value="phd" control={<Radio />} label="博士" />
              <FormControlLabel
                value="unknown"
                control={<Radio />}
                label="不詳"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              本人是否具有身心障礙？
            </FormLabel>
            <RadioGroup defaultValue="">
              <FormControlLabel value="yes" control={<Radio />} label="有" />
              <FormControlLabel value="no" control={<Radio />} label="無" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'normal' }}>
              您目前有繳交哪些社會保險？（可複選）
            </FormLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mt: 1,
              }}
            >
              <FormControlLabel control={<Checkbox />} label="全民健康保險" />
              <FormControlLabel control={<Checkbox />} label="勞工保險" />
              <FormControlLabel control={<Checkbox />} label="公務人員保險" />
              <FormControlLabel control={<Checkbox />} label="軍人保險" />
              <FormControlLabel control={<Checkbox />} label="農民保險" />
              <FormControlLabel control={<Checkbox />} label="漁民保險" />
              <FormControlLabel control={<Checkbox />} label="國民年金保險" />
              <FormControlLabel control={<Checkbox />} label="無" />
            </Box>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                minWidth: '80px',
                bgcolor: '#5c443a',
                '&:hover': {
                  bgcolor: '#4a372f',
                },
              }}
            >
              送出
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
