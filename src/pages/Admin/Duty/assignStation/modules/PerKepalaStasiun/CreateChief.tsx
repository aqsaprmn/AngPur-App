import { POSTCreateKepalaStasiunByNIPP } from "@app/Services/DTA/KepalaStasiun/kepalaStasiunApiList";
import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { StationListResponseType } from "@app/utils/constants/types";
import {
  Autocomplete,
  Checkbox,
  Dialog,
  FormControlLabel,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const CreateChief = ({
  onClose,
  open,
  stationData,
  chiefData,
  refetch,
}: {
  open: boolean;
  onClose: any;
  stationData: StationListResponseType;
  chiefData: any[];
  refetch: () => void;
}) => {
  const { setFieldValue, values, handleSubmit } = useFormik({
    initialValues: {
      stationList: [],
      chief: {
        username: "",
        fullName: "",
      },
      effectiveDate: {
        from: new Date(),
        to: null,
      },
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await POSTCreateKepalaStasiunByNIPP({
        username: val.chief.username,
        body: {
          version: "2.0.0",
          stations: val.stationList,
          effectiveDate:
            val.effectiveDate.to !== null
              ? {
                  startFrom: dayjs(new Date(val.effectiveDate.from)).format(
                    "YYYY-MM-DD"
                  ),
                  endAt: dayjs(new Date(val.effectiveDate.to)).format(
                    "YYYY-MM-DD"
                  ),
                }
              : {
                startFrom: dayjs(new Date(val.effectiveDate.from)).format(
                  "YYYY-MM-DD"
                ),
              },
        },
      });
      onClose();

      if (fetching.isSuccess) {
        refetch();
        resetForm();
        return Swal.fire({
          title: "Success",
          text: "Create data successfull",
          icon: "success",
        });
      }

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong",
        icon: "error",
      });
    },
  });

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
      <div className="mb-8 flex justify-center">
        <span className="font-semibold text-md">Buat Kepala Stasiun</span>
      </div>
      <div className="flex justify-between flex-wrap gap-5 mb-5">
        <div className="flex-1">
          <div>
            <FormTitle children="List Stasiun" />
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex flex-col gap-0 max-h-[20rem] overflow-y-scroll">
              {stationData?.data?.content?.map((item) => {
                return (
                  <FormControlLabel
                    key={item.station.uuid}
                    disabled={
                      values.stationList.length >= 6 &&
                      !values.stationList.some(
                        (e: any) => e.station.uuid === item.station.uuid
                      )
                    }
                    control={<Checkbox size="small" />}
                    checked={values.stationList.some(
                      (e: any) => e.station.uuid === item.station.uuid
                    )}
                    onChange={() => {
                      if (
                        values.stationList.some(
                          (e: any) => e.station.uuid === item.station.uuid
                        ) == false
                      ) {
                        return setFieldValue("stationList", [
                          ...values.stationList,
                          {
                            station: {
                              uuid: item.station.uuid,
                            },
                          },
                        ]);
                      } else {
                        return setFieldValue(
                          "stationList",
                          values.stationList.filter(
                            (e: any) => e.station.uuid !== item.station.uuid
                          )
                        );
                      }
                    }}
                    label={item.station.name}
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
          <div className="flex flex-col mb-4">
            <FormTitle children="Pilih Kepala Stasiun" forElement="chief" />
            <Autocomplete
              disablePortal
              value={values.chief}
              isOptionEqualToValue={(opt) => opt.fullName}
              options={chiefData}
              getOptionLabel={(opt) => opt.fullName}
              className="lrt-small-textfield"
              onChange={(_e, value) => {
                if (value) {
                  setFieldValue("chief", {
                    username: value.username,
                    fullName: value.fullName,
                  });
                } else {
                  setFieldValue("chief", {
                    username: "",
                    fullName: "",
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Pilih Kepala Stasiun"
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      height: "39px",
                      borderRadius: "4px",
                      borderColor: "#DDDDDD !important",
                      fontSize: "12px",

                      "& .Mui-disabled": {
                        borderColor: "red !important",
                      },
                    },
                    className: "bg-transparent text-sm lrt-small-textfield",
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-base text-text-title font-bold">
                Tanggal Mulai
              </label>
              <TextField
                type="date"
                className="lrt-small-textfield"
                size="small"
                onChange={(e) => {
                  setFieldValue("effectiveDate", {
                    ...values.effectiveDate,
                    from: e.target.value,
                  });
                }}
                value={dayjs(values.effectiveDate.from).format("YYYY-MM-DD")}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base text-text-title font-bold">
                Tanggal Selesai
              </label>
              <TextField
                type="date"
                className="lrt-small-textfield"
                size="small"
                onChange={(e) => {
                  setFieldValue("effectiveDate", {
                    ...values.effectiveDate,
                    to: e.target.value,
                  });
                }}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Simpan
        </MainCustomButton>
      </div>
    </Dialog>
  );
};

export default CreateChief;
