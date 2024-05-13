import { MainCustomButtonDeny } from "@app/components/Buttons";
import { Dialog } from "@mui/material";
import { NumericFormat } from "react-number-format";

const DetailProductDialog = ({
  onClose,
  open,
  data,
}: {
  open: boolean;
  onClose: any;
  data: any;
}) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
      open={open}
      onClose={onClose}
    >
      <div className="mb-8 flex justify-center">
        <span className="text-md font-semibold">Detail Product</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="mb-3">
            <img
              src={data.image}
              alt={data.name}
              className=" h-60 w-full object-cover rounded"
            />
          </div>
          <div className="text-lg font-bold mb-1">{data.name}</div>
          <div className="mb-2">{data.description}</div>
          <div className="mb-2">
            <NumericFormat
              value={data.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              Stock: <span className="font-bold">{data.stock}</span>
            </div>
            <div>
              Sold:{" "}
              <span className="font-bold">
                {data.sold === null ? 0 : data.sold}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
      </div>
    </Dialog>
  );
};

export default DetailProductDialog;
