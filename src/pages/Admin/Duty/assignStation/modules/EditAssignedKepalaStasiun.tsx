import { MainCustomButton } from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { Autocomplete, Dialog, Popover, TextField } from "@mui/material";
import { addDays, addMonths, addYears } from "date-fns";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

const pastMonth = new Date();
const nextMonth = addMonths(new Date(), 1);

const EditAssignedKepalaStasiun = ({
  open,
  onClose,
  onConfirm,
}: {
  //   data: any;
  open: boolean;
  onClose: any;
  onConfirm: any;
}) => {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const Formik = useFormik({
    initialValues: {
      kepalaStasiun: "",
      effectiveDate: {
        from: new Date(),
        to: null,
      },
    },
    onSubmit: () => {
      // const fetching =
    },
  });

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
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
    >
      <div className="mb-3 flex justify-center">
        <span className="font-semibold text-md">
          Assign kepala stasiun "CAWANG"
        </span>
      </div>

      <form>
        {/* Kepala Stasiun */}
        <div className="mb-5">
          <div>
            <FormTitle
              children="Kepala Stasiun"
              forElement="kepala-stasiun-textfield"
            />
          </div>
          <Autocomplete
            disablePortal
            value={Formik.values.kepalaStasiun}
            componentName="dariStasiunMainline"
            id="kepala-stasiun-textfield"
            onChange={(e, value) => {
              console.log(e);
              Formik.setFieldValue("kepalaStasiun", value);
            }}
            options={["", "Radian Rasyid"]}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"Kepala Stasiun"}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    borderRadius: "13px",
                    borderColor: "#DDDDDD !important",
                    fontSize: "12px",
                    // backgroundColor: "grey",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  },
                  className: "bg-transparent text-sm h-12 mt-4",
                }}
                error={Formik.errors.kepalaStasiun ? true : false}
              />
            )}
          />
        </div>

        {/* TANGGAL PENERAPAN KEPALA STASIUN */}
        <div className="mb-5">
          <div>
            <FormTitle
              children="Tanggal penerapan kepala stasiun"
              forElement="tanggal-penerapan-kepala-stasiun-textfield"
            />
          </div>
          <MainCustomButton onClick={handleClick} fullWidth>
            {Formik.values.effectiveDate.to == null
              ? `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                  "DD MMM YYYY"
                )} until ~`
              : `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                  "DD MMM YYYY"
                )} - ${dayjs(new Date(Formik.values.effectiveDate.to)).format(
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
                selected={Formik.values.effectiveDate.from}
                onSelect={(v, value) => {
                  console.log(v);

                  setRange({
                    ...range,
                    from: value,
                  });
                  Formik.setFieldValue("effectiveDate", {
                    ...Formik.values.effectiveDate,
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
                  Formik.values.effectiveDate.to == null
                    ? addYears(new Date(), 1)
                    : Formik.values.effectiveDate.to
                }
                onSelect={(v, value) => {
                  console.log(v);

                  setRange({
                    ...range,
                    to: value,
                  });
                  Formik.setFieldValue("effectiveDate", {
                    ...Formik.values.effectiveDate,
                    to: value,
                  });
                }}
              />
            </div>
          </Popover>
        </div>

        {/* TANGGAL SELESAI PENERAPAN KEPALA STASIUN */}
        {/* <div className="mb-5">
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
        </div> */}
        <div>
          <MainCustomButton type="button" onClick={onConfirm} fullWidth>
            Save Changes
          </MainCustomButton>
        </div>
      </form>
    </Dialog>
  );
};

export default EditAssignedKepalaStasiun;
