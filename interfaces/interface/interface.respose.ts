export interface MainResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface DataSource {
  imageUrl: string;
  tags: string;
  title: string;
  description: string;
  id: string;
  price: number
}

export interface RequestQueryParamsModel {
  limit?: number;
  page?: number;
  [props: string]: any;
}

export interface ResponseDetailMerchandise {
  id:               string;
  name:             string;
  merk:             string;
  stockMerchandise: number;
  imageUrl:         string;
  sellingPrice:     number;
  capitalPrice:     number;
  TagId:            string;
  createdAt:        Date;
  updatedAt:        Date;
  Tag:              Tag;
}

export interface Tag {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResponseGetListProduct {
  currentPage:  number;
  data:         Data[];
  totalElement: number;
  totalPage:    number;
}

export interface Data {
  id:               string;
  name:             string;
  merk:             string;
  stockMerchandise: number;
  imageUrl:         string;
  sellingPrice:     number;
  capitalPrice:     number;
  TagId:            string;
  createdAt:        Date;
  updatedAt:        Date;
  Tag:              Tag;
}

export interface Tag {
  id:        string;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}