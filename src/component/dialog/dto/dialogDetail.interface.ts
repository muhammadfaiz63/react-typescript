import {ContentType} from '../../../utils/enum';

interface Header {
  label: string;
  value: string;
  type: ContentType;
}
export declare interface Props {
  data: any;
  header: Array<Header>;
  open: boolean;
  onClose?: () => void;
  title: string;
}
export declare interface PropsDelete {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  title: string;
}
export declare interface PropsSuccess {
  open: boolean;
  onClose?: () => void;
  title: string;
}
export declare interface PropsFail {
  open: boolean;
  onClose?: () => void;
}
