import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import {
  Checkbox,
  Dialog,
  FormControlLabel,
  OutlinedInput,
} from "@mui/material";

const EditPerChiefAssign = ({
  onClose,
  open,
  onConfirm,
}: {
  open: boolean;
  onClose: any;
  onConfirm: any;
  // data: any;
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
      open={open}
      onClose={onClose}
    >
      <div>
        <span>
          List Stasiun yang Dikepalai "Muhammad Radian Rasyid - 09127839123"
        </span>
      </div>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="flex-1">
          <div>
            <FormTitle children="List Stasiun" />
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex flex-col flex-wrap gap-0">
              {["St Cawang", "St Cikoko", "St Ciliwung"].map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox size="small" />}
                    label={item}
                    slotProps={{
                      typography: {
                        sx: {
                          fontSize: "12px",
                          fontWeight: "600",
                        },
                      },
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1">
          {/* TANGGAL PENERAPAN KEPALA STASIUN */}
          <div>
            <div>
              <FormTitle
                children="Tanggal penerapan kepala stasiun"
                forElement="tanggal-penerapan-kepala-stasiun-textfield"
              />
            </div>
            <OutlinedInput
              id="tanggal-penerapan-kepala-stasiun-textfield"
              name="tanggalPenerapan"
              size="small"
              fullWidth
              className="bg-transparent text-sm mt-4 mb-8"
              sx={{
                borderRadius: "7px",
                borderColor: "#DDDDDD !important",
                // backgroundColor: "grey",
                "& .Mui-disabled": {
                  borderColor: "red !important",
                },
              }}
            />
          </div>

          {/* TANGGAL SELESAI PENERAPAN KEPALA STASIUN */}
          <div>
            <div>
              <FormTitle
                children="Tanggal selesai penerapan kepala stasiun"
                forElement="tanggal-selesai-penerapan-kepala-stasiun"
              />
            </div>
            <OutlinedInput
              id="tanggal-penerapan-kepala-stasiun-textfield"
              name="tanggalPenerapan"
              size="small"
              fullWidth
              className="bg-transparent text-sm mt-4 mb-8"
              sx={{
                borderRadius: "7px",
                borderColor: "#DDDDDD !important",
                // backgroundColor: "grey",
                "& .Mui-disabled": {
                  borderColor: "red !important",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton onClick={onConfirm}>Simpan</MainCustomButton>
      </div>
    </Dialog>
  );
};

export default EditPerChiefAssign;
