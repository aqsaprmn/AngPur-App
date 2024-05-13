import { StyledDataGrid } from "@app/components/Tables/Datagrid/Datagrid";
import {
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGridPremiumProps, GridRowSpacingParams } from "@mui/x-data-grid-premium";
import { ReactNode, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";

interface DataGridProp extends DataGridPremiumProps {
  currentPage: number;
  totalPage: number;
  currentSize: number;
  totalData: number;
  searchQuery?: any;
  onPageSizeChange?: (
    event: SelectChangeEvent<number>,
    child?: ReactNode
  ) => void;
  pageSizeOptions?: number[];
  onPageChange?: (event?: any, page?: number) => void;
  loading?: boolean;
  isSearchable?: boolean;
  hidden?: boolean;
}

const CustTable = ({ props }: { props: DataGridProp }) => {
  //   useEffect(() => {}, [props.currentPage, props.currentSize]);
  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);
  return (
    <div hidden={props.hidden}>
      <div className="bg-white p-7 rounded-lg">
        <div className="mb-3" hidden={props.isSearchable == false}>
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
          {...props}
          autoHeight
          hideFooterPagination
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          getRowSpacing={getRowSpacing}
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
              disabled={props.loading}
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
    </div>
  );
};

export default CustTable;
