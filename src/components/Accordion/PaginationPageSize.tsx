import { MenuItem, Pagination, Select } from "@mui/material";

interface PaginationPageSizeProp {
  currentSize: number;
  currentPage: number;
  totalPage: number;
  onPageChange?: any;
  onPageSizeChange?: any;
  pageSizeOption?: number[];
}

export const PaginationPageSize = (props: PaginationPageSizeProp) => {
  return (
    <div className="flex flex-auto flex-wrap justify-between mt-4">
      <Pagination
        count={props.totalPage}
        shape="rounded"
        sx={{
          "& .Mui-selected": {
            backgroundColor: "#E41205 !important",
            color: "#FFF",
          },
        }}
        page={props.currentPage}
        size="small"
        onChange={props.onPageChange ?? null}
      />
      <Select
        value={props.currentSize}
        onChange={props.onPageSizeChange ?? null}
        size="small"
        className="h-8"
        slotProps={{
          root: {
            style: {
              borderRadius: "10px",
            },
          },
        }}
      >
        {(props.pageSizeOption ?? [10, 20, 39]).map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              <span className="text-xs">{item}</span>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
