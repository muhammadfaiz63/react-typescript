import {Close, CloudUpload} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, {useState, useRef} from 'react';
import {BoxElement, Form, Iframe, Label, PaperCard} from './style';
import {PropsUpload} from './dto/type';
import axios from '../../utils/axios';
import {globalToasterError} from '../../utils/helper';
import {getIcon} from './dto/file';
export default function UploadFile({onChange, value, accept}: PropsUpload) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState('');
  // ref
  const inputRef: any = useRef(null);

  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  // triggers when file is selected with click
  const handleChange = async (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = async (file: any) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('folderName', 'cms');
      bodyFormData.append('file', file);
      setProgress(0);
      const config = {
        onUploadProgress: ({loaded, total}: any) => {
          const percent = (loaded * 100) / total;
          setProgress(percent);
        },
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const {data} = await axios.post('/v2/static-upload/file', bodyFormData, config);
      onChange?.(data.data.path);
      setProgress(0);
    } catch (error) {
      setProgress(0);
      globalToasterError(error);
    }
  };
  const handleDelete = () => {
    onChange?.('');
  };
  const handleChangeInput = (e: any) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    onChange?.(input);
  };
  const CircularProgressWithLabel = (props: CircularProgressProps & {value: number}) => {
    return (
      <Box sx={{position: 'relative', display: 'inline-flex'}}>
        <CircularProgress variant="determinate" {...props} size="100px" />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary" fontSize="24px">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box mt={2}>
      {value ? (
        <PaperCard elevation={1}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              {getIcon?.(value)?.icon}
              <Box ml={2}>
                <Typography variant="body1">{value.length > 20 ? value.substring(0, 20) + '...' : value}</Typography>
                <Typography variant="body1" color="primary" sx={{cursor: 'pointer'}} onClick={() => setOpen(true)}>
                  preview
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleDelete}>
              <Close fontSize="large" />
            </IconButton>
          </Box>
        </PaperCard>
      ) : (
        <Box>
          <Form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input
              ref={inputRef}
              type="file"
              id="input-file-upload"
              hidden
              onChange={handleChange}
              accept={accept}
              disabled={progress > 0}
            />
            <Label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>
              {progress === 0 ? (
                <Box>
                  <CloudUpload sx={{fontSize: '40px'}} />
                  <Typography variant="body1" mb={3}>
                    Upload File Here
                  </Typography>
                </Box>
              ) : (
                <CircularProgressWithLabel value={progress} />
              )}
            </Label>
            {dragActive && (
              <BoxElement
                id="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></BoxElement>
            )}
          </Form>
          <Box mt={2}>
            <Typography variant="body1">Atau upload melalui URL</Typography>
            <Box mt={2}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="https://example.com/image.jpg"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="contained" onClick={handleSubmit}>
                        Upload
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      <Dialog open={open} fullScreen>
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              {getIcon?.(value)?.name.length > 20
                ? getIcon?.(value)?.name.substring(0, 20) + '...'
                : getIcon?.(value)?.name}
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={() => setOpen(false)}>
              <Close fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
          <Iframe src={value} height="2" width="2" frameBorder="0" />
        </Box>
      </Dialog>
    </Box>
  );
}
