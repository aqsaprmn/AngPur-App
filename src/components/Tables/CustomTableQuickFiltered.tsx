import {
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TablePaginationProps,
} from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import {
  GridPagination,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
  DataGridPremiumProps,
  //   DataGridProps,
} from "@mui/x-data-grid-premium";
import { ReactNode } from "react";
import { LicenseInfo } from "@mui/x-license-pro";
import { StyledDataGrid } from "./Datagrid/Datagrid";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_PREMIUM_LICENSE);

interface DataGridProp extends DataGridPremiumProps {
  currentPage: number;
  totalPage: number;
  currentSize: number;
  totalData: number;
  searchQuery?: (e: any) => void;
  onPageSizeChange?: (
    event?: SelectChangeEvent<number>,
    child?: ReactNode
  ) => void;
  pageSizeOptions?: number[];
  onPageChange?: (event?: any, page?: number) => void;
  loading?: boolean;
  useMuiPagination?: boolean;
  withParams?: boolean;
  hidden?: boolean;
  hideFilterBar?: boolean;
  enableKeepGroupedColumnHidden?: boolean;
  disableAggregation?: boolean;
}

const CustomTableQuickFiltered = ({ props }: { props: DataGridProp }) => {
  // console.log(props, 'proppssss')
  return (
    <div className="bg-white p-7 rounded-lg">
      <StyledDataGrid
        {...props}
        rows={props.rows}
        columns={props.columns}
        pagination={props.pagination === undefined ? true : props.pagination}
        autoHeight
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
        pageSizeOptions={[10, 25, 50, 100]}
        hideFooter={
          (props.useMuiPagination ? !props.useMuiPagination : true) &&
          props.withParams
        }
        slots={{
          toolbar: () => {
            return (
              <>
                {props.hideFilterBar
                  ? props.hideFilterBar
                  : true && <GridToolbarQuickFilter />}
                {props.slots?.toolbar}
              </>
            );
          },
          pagination: props.useMuiPagination ? CustomPagination : undefined,
          ...props.slots,
        }}
        columnVisibilityModel={
          props.enableKeepGroupedColumnHidden
            ? undefined
            : {
                id: false,
                ID: false,
                ...props.columnVisibilityModel,
              } || {
                id: false,
                ID: false,
              }
        }
        disableAggregation={
          props.disableAggregation === undefined
            ? true
            : props.disableAggregation
        }
        initialState={
          props.enableKeepGroupedColumnHidden
            ? props.initialState
            : {
                aggregation: props.initialState?.aggregation,
                rowGrouping: props.initialState?.rowGrouping,
                pagination: {
                  paginationModel: {
                    page: props.initialState?.pagination?.paginationModel
                      ? props.currentPage
                      : 1,
                    pageSize: props.currentSize,
                  },
                },
              }
        }
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 500,
            },
          },
        }}
        sx={{
          overflowX: "scroll",
          overflow: "auto",
        }}
        loading={props.loading ?? false}
      />
      {(props.useMuiPagination ? !props.useMuiPagination : true) &&
        props.withParams && (
          <div className="flex justify-between mt-2">
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
        )}
    </div>
  );
};

function Pagination_({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event: any, newPage: any): any => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

export function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination_} {...props} />;
}

export default CustomTableQuickFiltered;
