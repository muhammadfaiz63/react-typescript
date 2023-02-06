import {Article, FolderZip, Image, PictureAsPdf, Topic, VideoFile} from '@mui/icons-material';
export const file = [
  {
    type: 'pdf',
    icon: <PictureAsPdf fontSize="large" color="primary" />,
  },
  {
    type: 'docx',
    icon: <Article fontSize="large" color="primary" />,
  },
  {
    type: 'png',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'jpg',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'jpeg',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'gif',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'svg',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'webp',
    icon: <Image fontSize="large" color="primary" />,
  },
  {
    type: 'mp4',
    icon: <VideoFile fontSize="large" color="primary" />,
  },
  {
    type: 'zip',
    icon: <FolderZip fontSize="large" color="primary" />,
  },
];

export function getIcon(url: string) {
  const splitter = url.split('.');
  const type = splitter[splitter.length - 1];
  const icon = file.find((item: any) => item.type === type);
  const nameSplitter = url.split('/');
  const name = nameSplitter[nameSplitter.length - 1];
  return icon ? {...icon, name: name} : {icon: <Topic fontSize="large" color="primary" />, type: 'other', name: name};
}
