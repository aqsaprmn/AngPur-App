import { StyledDataGrid } from "@app/components/Tables/Datagrid/Datagrid";
import {
  InputAdornment,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { DataGridPremiumProps, GridRowSpacingParams } from "@mui/x-data-grid-premium";
import { ReactNode, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";

interface DataGridProp extends DataGridPremiumProps {
  currentSize?: number;
  searchQuery?: any;
  onPageSizeChange?: (
    event?: SelectChangeEvent<number>,
    child?: ReactNode
  ) => void;
  pageSizeOptions?: number[];
  loading?: boolean;
}

const CustTableUnpaginated = ({ props }: { props: DataGridProp }) => {
  //   useEffect(() => {}, [props.currentPage, props.currentSize]);
  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);
  return (
    <>
      <div className="bg-white p-7 rounded-lg">
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
          {...props}
          autoHeight
          hideFooterPagination
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          getRowSpacing={getRowSpacing}
        />
      </div>
    </>
  );
};

export default CustTableUnpaginated;
