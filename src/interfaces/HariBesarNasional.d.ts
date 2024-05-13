export interface HariBesarListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
  content: Content[];
}

export interface Content {
  holiday: Holiday;
}

export interface Holiday {
  metadata: Metadata;
  uuid: string;
  date: string;
  description: string;
  point: number;
}

export interface Metadata {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}
