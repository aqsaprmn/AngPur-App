import { POSTCreateKepalaStasiunByNIPP } from "@app/Services/DTA/KepalaStasiun/kepalaStasiunApiList";
import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { StationListResponseType } from "@app/utils/constants/types";
import { Checkbox, Dialog, FormControlLabel, Popover } from "@mui/material";
import { addDays, addMonths, addYears } from "date-fns";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import Swal from "sweetalert2";

const pastMonth = new Date();
const nextMonth = addMonths(new Date(), 1);

const CreatePerChiefAssign = ({
  onClose,
  open,
  stationData,
  chiefData,
}: {
  open: boolean;
  onClose: any;
  stationData: StationListResponseType;
  chiefData: {
    username: string;
    fullName: string;
  };
  // data: any;
}) => {
  const { setFieldValue, values, handleSubmit } = useFormik({
    initialValues: {
      stationList: [],
      effectiveDate: {
        from: new Date(),
        to: null,
      },
    },
    onSubmit: async (val) => {
      const fetching = await POSTCreateKepalaStasiunByNIPP({
        username: chiefData.username,
        body: {
          version: "2.0.0",
          stations: val.stationList,
          effectiveDate:
            val.effectiveDate.to !== null
              ? {
                  startFrom: dayjs(new Date(val.effectiveDate.from)).format(
                    "YYYY-MM-DD"
                  ),
                  endAt: dayjs(new Date(val.effectiveDate.from)).format(
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

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [range, setRange] = useState<DateRange>(defaultSelected);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opened = Boolean(anchorEl);
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
        <span
          className="font-semibold text-md"
          onClick={() => console.log("ini data", values)}
        >
          List Stasiun yang Dikepalai "{chiefData.fullName}"
        </span>
      </div>
      <div className="flex justify-between flex-wrap gap-5 mb-5">
        <div className="flex-1">
          <div>
            <FormTitle children="List Stasiun" />
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex flex-col gap-0 max-h-[10rem] overflow-y-scroll">
              {stationData?.data?.content?.map((item) => {
                return (
                  <FormControlLabel
                    key={item.station.uuid}
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
          {/* <p>{JSON.stringify(values.stationList)}</p> */}
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
            <MainCustomButton onClick={handleClick}>
              {values.effectiveDate.to === null
                ? `${dayjs(new Date(values.effectiveDate.from)).format(
                    "DD MMM YYYY"
                  )} until ~`
                : `${dayjs(new Date(values.effectiveDate.from)).format(
                    "DD MMM YYYY"
                  )} until ${dayjs(new Date(values.effectiveDate.to)).format(
                    "DD MMM YYYY"
                  )}`}
            </MainCustomButton>
            <Popover
              open={opened}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    gap: 5,
                    borderRadius: "10px",
                    padding: "1rem",
                  },
                },
              }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <div>
                <div>
                  <FormTitle
                    children="Tanggal Penerapan"
                    forElement="tanggal-penerapan-popover"
                  />
                </div>
                <DayPicker
                  id="tanggal-penerapan-popover"
                  mode="single"
                  numberOfMonths={1}
                  defaultMonth={pastMonth}
                  selected={values.effectiveDate.from}
                  onSelect={(v, value) => {
                    console.log(v);

                    setRange({
                      ...range,
                      from: value,
                    });
                    setFieldValue("effectiveDate", {
                      ...values.effectiveDate,
                      from: value,
                    });
                  }}
                />
              </div>
              <div>
                <div>
                  <FormTitle
                    children="Tanggal selesai penerapan"
                    forElement="tanggal-selesai-penerapan-popover"
                  />
                </div>
                <DayPicker
                  id="tanggal-selesai-penerapan-popover"
                  mode="single"
                  numberOfMonths={1}
                  defaultMonth={nextMonth}
                  selected={
                    values.effectiveDate.to == null
                      ? addYears(new Date(), 1)
                      : values.effectiveDate.to
                  }
                  onSelect={(v, value) => {
                    console.log(v);

                    setRange({
                      ...range,
                      to: value,
                    });
                    setFieldValue("effectiveDate", {
                      ...values.effectiveDate,
                      to: value,
                    });
                  }}
                />
              </div>
            </Popover>
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

export default CreatePerChiefAssign;
