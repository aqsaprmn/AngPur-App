import { FormTitle } from "@app/components/Texts";
import { KepalaStasiunDetailResponseType } from "@app/utils/constants/types";
import { Dialog, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";

const ViewAssignedKepalaStasiun = ({
  open,
  onClose,
  data,
}: {
  //   data: any;
  open: boolean;
  onClose: any;
  data?: KepalaStasiunDetailResponseType;
}) => {
  const Formik = useFormik({
    initialValues: {
      kepalaStasiun: "",
      tanggalPenerapan: new Date(),
      tanggalSelesai: new Date(),
    },
    onSubmit: () => {},
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
    >
      <div className="flex justify-center mb-5">
        <span className="font-semibold text-md">
          Assign kepala stasiun "CAWANG"
        </span>
      </div>

      <form>
        {/* Kepala Stasiun */}
        <div>
          <div>
            <FormTitle
              children="Kepala Stasiun"
              forElement="kepala-stasiun-textfield"
            />
          </div>
          <OutlinedInput
            id="kepala-stasiun-textfield"
            name="kepala-stasiun"
            size="small"
            fullWidth
            value={data?.data.stationMaster.user.fullName}
            error={Formik.errors.tanggalPenerapan ? true : false}
            onChange={Formik.handleChange}
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
            error={Formik.errors.tanggalPenerapan ? true : false}
            onChange={Formik.handleChange}
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
              forElement="tanggal-selesai-penerapan-kepala-stasiun-textfield"
            />
          </div>
          <OutlinedInput
            id="tanggal-selesai-penerapan-kepala-stasiun-textfield"
            name="tanggalSelesai"
            size="small"
            fullWidth
            error={Formik.errors.tanggalSelesai ? true : false}
            onChange={Formik.handleChange}
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
      </form>
    </Dialog>
  );
};

export default ViewAssignedKepalaStasiun;
