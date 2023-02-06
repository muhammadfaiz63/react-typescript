import {ContentType} from '../../../utils/enum';

interface Header {
  label: string;
  value: string;
  size?: string;
  type: ContentType;
  align?: string;
  sort?: boolean;
}
export declare interface PropsDesktop {
  data: Array<any>;
  header: Array<Header>;
  page?: number;
  totalPage?: number;
  handlePrev?: () => void;
  handleNext?: () => void;
  handleLimit?: (e: any) => void;
  handlePage?: (e: any) => void;
  handleSort?: (name: string) => void;
  handleDetail?: (e: any) => void;
  handleDelete?: (e: any) => void;
  handleEdit?: (name: string) => void;
  handleEditMultiple?: (e: any) => void;
  multipleId?: boolean;
  limit?: number;
  count?: number;
}

export declare interface PropsMobile {
  data: Array<any>;
  header: Array<Header>;
  page?: number;
  totalPage?: number;
  handlePrev?: () => void;
  handleNext?: () => void;
  handleLimit?: (e: any) => void;
  handleDetail?: (e: any) => void;
  handleDelete?: (e: any) => void;
  handleEdit?: (name: string) => void;
  handleEditMultiple?: (e: any) => void;
  multipleId?: boolean;
  limit?: number;
  count?: number;
}
