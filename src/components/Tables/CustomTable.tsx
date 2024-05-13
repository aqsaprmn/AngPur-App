import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGridProps } from "@mui/x-data-grid";
import { ReactNode } from "react";
import { CgUnavailable } from "react-icons/cg";
import { RiSearchLine } from "react-icons/ri";
import { StyledDataGrid } from "./Datagrid/Datagrid";

interface DataGridProp extends DataGridProps {
  currentPage: number;
  totalPage: number;
  currentSize: number;
  totalData: number;
  searchQuery?: any;
  onPageSizeChange?: (
    event?: SelectChangeEvent<number>,
    child?: ReactNode
  ) => void;
  pageSizeOptions?: number[];
  onPageChange?: (event?: any, page?: number) => void;
  loading?: boolean;
}

const CustomTable = ({ props }: { props: DataGridProp }) => {
  //   useEffect(() => {}, [props.currentPage, props.currentSize]);

  return (
    <>
      <div className="bg-white p-7 rounded-lg h-full">
        <div className="mb-3">
          <OutlinedInput
            id="password"
            name="password"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            }
            className="bg-transparent text-sm h-12"
            sx={{
              borderRadius: "13px",
              fontSize: "12px",
              minWidth: "15rem",
            }}
            placeholder="Cari"
            onChange={props.searchQuery}
          />
        </div>
        <StyledDataGrid
          rows={props.rows}
          columns={props.columns}
          autoHeight={props.rows.length == 0 ? true : false}
          // density="compact"
          hideFooter
          slots={{
            noRowsOverlay: () => (
              <div className="flex flex-col gap-4 items-center justify-center min-h-full">
                <CgUnavailable
                  style={{
                    transform: "scale(2)",
                  }}
                />
                <span>No data acquired</span>
              </div>
            ),
            loadingOverlay: () => (
              <div className="flex flex-col gap-4 items-center justify-center min-h-full ">
                <CircularProgress />
              </div>
            ),
          }}
          initialState={{
            ...props.initialState,
            pagination: {
              paginationModel: {
                pageSize: props.currentSize,
                page: props.currentPage,
              },
            },
          }}
          sx={{
            overflowX: "scroll",
            overflow: "auto",
          }}
          loading={props.loading ?? false}
        />
      </div>

      <div className="flex justify-between mt-3">
        <div>
          <span className="text-xs">Showing {props.currentSize} items</span>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Pagination
              count={props.totalPage}
              shape="rounded"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#E41205 !important",
                  color: "#FFF",
                },
              }}
              size="small"
              onChange={props.onPageChange}
            />
            <Select
              value={props.currentSize}
              onChange={props.onPageSizeChange}
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
              {props.pageSizeOptions!.map((item, index) => {
                return (
                  <MenuItem value={item} key={index}>
                    <span className="text-xs">{item}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
