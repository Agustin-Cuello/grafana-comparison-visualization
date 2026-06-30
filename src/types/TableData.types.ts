export type Cell = string;
export type Header = string;

export type Row = Cell[];

export type TableData = {
    headers: Header[];
    data: Row[];
};
