import {
  Pagination,
  SelectChangeEvent,
  TablePaginationProps,
} from "@mui/material";
import {
  DataGridPremiumProps,
  GridPagination,
  GridRowSpacingParams,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-premium";
import { ReactNode, useCallback } from "react";
import { StyledDataGrid } from "./Datagrid/Datagrid";

interface DataGridProp extends DataGridPremiumProps {
  currentPage?: number;
  totalPage?: number;
  currentSize?: number;
  totalData?: number;
  searchQuery?: any;
  onPageSizeChange?: (
    event?: SelectChangeEvent<number>,
    child?: ReactNode
  ) => void;
  pageSizeOptions?: number[];
  onPageChange?: (event?: any, page?: number) => void;
  loading?: boolean;
  hidden?: boolean;
}

const CustTableQuickFiltered = ({ props }: { props: DataGridProp }) => {
  //   useEffect(() => {}, [props.currentPage, props.currentSize]);

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  return (
    <>
      <div className="bg-white p-7 rounded-lg" hidden={props.hidden}>
        {/* <div className="mb-3">
          <OutlinedInput
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
        </div> */}
        <StyledDataGrid
          {...props}
          autoHeight
          pagination
          columnVisibilityModel={{
            id: false,
            ID: false,
          }}
          getRowHeight={() => "auto"}
          getRowSpacing={getRowSpacing}
          //   hideFooterSelectedRowCount
        />
      </div>
    </>
  );
};

function Paginations({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
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
  return <GridPagination ActionsComponent={Paginations} {...props} />;
}

export default CustTableQuickFiltered;
