import { POSTCreateStation } from "@app/Services/DTA/StationManagement/StationManagementApiList";
import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { FormHelperText, OutlinedInput, Popover } from "@mui/material";
import { addDays, addYears } from "date-fns";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import Swal from "sweetalert2";
import * as Yup from "yup";

const pastMonth = new Date();

const CreateStationADMIN = () => {
  const CreateStationForm = useFormik({
    initialValues: {
      stationCodeInternal: "",
      stationCodeExternal: "",
      stationName: "",
      stationLatitude: "",
      stationLongitude: "",
      jamBukaStasiunJam: "",
      jamBukaStasiunMenit: "",
      jamTutupStasiunJam: "",
      jamTutupStasiunMenit: "",
      waktuBerlakuEfektif: {
        from: new Date(),
        to: addYears(new Date(), 1),
      },
    },
    onSubmit: async (val) => {
      let bukaStasiun = `${
        val.jamBukaStasiunJam === "24" ? "00" : val.jamBukaStasiunJam
      }:${
        val.jamBukaStasiunMenit === "60" ? "59" : val.jamBukaStasiunMenit
      }:00`;
      let tutupStasiun = `${
        val.jamTutupStasiunJam === "24" ? "00" : val.jamTutupStasiunJam
      }:${
        val.jamTutupStasiunMenit === "60" ? "59" : val.jamTutupStasiunMenit
      }:00`;
      const fetching = await POSTCreateStation({
        body: {
          code: {
            internal: val.stationCodeInternal,
            external: val.stationCodeExternal,
          },
          location: {
            latitude: val.stationLatitude,
            longitude: val.stationLongitude,
          },
          name: val.stationName,
          operationHour: [
            {
              openTime: bukaStasiun,
              closeTime: tutupStasiun,
              effectiveDate:
                val.waktuBerlakuEfektif.to == null
                  ? {
                      startFrom: dayjs(
                        new Date((val.waktuBerlakuEfektif as any).from)
                      ).format("YYYY-MM-DD"),
                    }
                  : {
                      startFrom: dayjs(
                        new Date((val.waktuBerlakuEfektif as any).from)
                      ).format("YYYY-MM-DD"),
                      endAt: dayjs(
                        new Date((val.waktuBerlakuEfektif as any).to)
                      ).format("YYYY-MM-DD"),
                    },
            },
          ],
          version: "2.0.0",
        },
      });

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Success",
          text: fetching?.data?.message || "Create station success",
          icon: "success",
        });
      }

      return Swal.fire({
        title: "Oops",
        text: fetching?.data?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
    validationSchema: Yup.object().shape({
      stationCodeInternal: Yup.string().min(3).required(),
      stationCodeExternal: Yup.string().min(3).required(),
      stationName: Yup.string().min(4).required(),
      stationLatitude: Yup.string().test({
        message: "inputted value does not satisfy the requirement",
        test: (val, context) => {
          console.log(val);
          let regex = /^([-]?([1-8]?\d\.\d+)|90\.0+)$/;

          let testing = regex.test(context.parent.stationLatitude);
          if (testing) {
            return true;
          }

          return false;
        },
      }),
      stationLongitude: Yup.string().test({
        message: "inputted value does not satisfy the requirement",
        test: (val, context) => {
          console.log(val);

          let regex =
            /^[-]?((1[0-7]\d(\.\d+)?)|([1-9]?\d(\.\d+)?)|180(\.0+)?)$/;

          let testing = regex.test(context.parent.stationLongitude);

          if (testing) {
            return true;
          }

          return false;
        },
      }),
      jamBukaStasiunJam: Yup.string().test({
        test: (val, con) => {
          console.log(val);

          if (
            Number(con.parent.jamBukaStasiunJam) <= 24 &&
            Number(con.parent.jamBukaStasiunJam > 0)
          ) {
            return true;
          }

          return false;
        },
        message: "must be valid hour 24 format",
      }),
      jamBukaStasiunMenit: Yup.string().test({
        message: "minute format must be valid 60 minutes",
        test: (val, con) => {
          console.log(val);

          if (
            con.parent.jamBukaStasiunMenit <= 60 &&
            Number(con.parent.jamBukaStasiunMenit >= 0)
          ) {
            return true;
          }

          return false;
        },
      }),
      jamTutupStasiunJam: Yup.string().test({
        test: (val, con) => {
          console.log(val);

          if (
            Number(con.parent.jamTutupStasiunJam) <= 24 &&
            con.parent.jamTutupStasiunJam > 0
          ) {
            return true;
          }

          return false;
        },
        message: "must be valid hour 24 format",
      }),
      jamTutupStasiunMenit: Yup.string().test({
        test: (val, con) => {
          console.log(val);

          if (
            Number(con.parent.jamTutupStasiunMenit) <= 60 &&
            con.parent.jamTutupStasiunMenit >= 0
          ) {
            return true;
          }

          return false;
        },
        message: "minute format must be valid 60 minutes",
      }),
    }),
    validateOnChange: false,
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

  const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-white px-4 py-2 rounded-xl">
      <div className="mb-5">
        <span className="text-xl font-bold">Buat Stasiun Baru</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          CreateStationForm.handleSubmit();
        }}
      >
        {/* KODE STASIUN INTERNAL & KODE STASIUN EXTERNAL */}
        <div className="grid grid-cols-12 gap-5 mb-4">
          {/* KODE STASIUN INTERNAL */}
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Kode Stasiun (Internal)"
                forElement="kode-stasiun-internal-textfield"
              />
            </div>
            <OutlinedInput
              id="kode-stasiun-internal-textfield"
              name="stationCodeInternal"
              size="small"
              fullWidth
              error={
                CreateStationForm.errors.stationCodeInternal ? true : false
              }
              onChange={CreateStationForm.handleChange}
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

          {/* KODE STASIUN EXTERNAL */}
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Kode Stasiun (External)"
                forElement="kode-stasiun-external-textfield"
              />
            </div>
            <OutlinedInput
              id="kode-stasiun-external-textfield"
              name="stationCodeExternal"
              size="small"
              fullWidth
              error={
                CreateStationForm.errors.stationCodeExternal ? true : false
              }
              onChange={CreateStationForm.handleChange}
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

        {/* NAMA STASIUN */}
        <div className="w-full mb-4">
          <div>
            <FormTitle
              children="Nama Stasiun"
              forElement="nama-stasiun-textfield"
            />
          </div>
          <OutlinedInput
            id="nama-stasiun-textfield"
            name="stationName"
            size="small"
            fullWidth
            error={CreateStationForm.errors.stationName ? true : false}
            onChange={CreateStationForm.handleChange}
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

        {/* LATITUDE STASIUN & LONGITUDE STASIUN */}
        <div className="grid grid-cols-12 gap-5 mb-4">
          {/* LATITUDE STASIUN */}
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Latitude Stasiun"
                forElement="latitude-stasiun-textfield"
              />
            </div>
            <OutlinedInput
              id="latitude-stasiun-textfield"
              name="stationLatitude"
              size="small"
              fullWidth
              error={CreateStationForm.errors.stationLatitude ? true : false}
              onChange={CreateStationForm.handleChange}
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

          {/* LONGITUDE STASIUN */}
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Longitude Stasiun"
                forElement="station-longitude-textfield"
              />
            </div>
            <OutlinedInput
              id="station-longitude-textfield"
              name="stationLongitude"
              size="small"
              fullWidth
              error={CreateStationForm.errors.stationLongitude ? true : false}
              onChange={CreateStationForm.handleChange}
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

        {/* JAM BUKA STASIUN, JAM TUTUP STASIUN & TANGGAL PENERAPAN OPERASIONAL STASIUN */}
        <div className="grid grid-cols-12 gap-5 mb-10">
          {/* JAM BUKA STASIUN */}
          <div className="col-span-3">
            <div>
              <FormTitle
                children="Jam buka stasiun"
                forElement="operational-hours-textfield"
              />
            </div>
            <div
              className="flex gap-2 flex-wrap items-center mt-3"
              id="operational-hours-textfield"
            >
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="jamBukaStasiunJam"
                value={CreateStationForm.values.jamBukaStasiunJam}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateStationForm.handleChange(e);
                }}
              />
              <span>:</span>
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="jamBukaStasiunMenit"
                value={CreateStationForm.values.jamBukaStasiunMenit}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateStationForm.handleChange(e);
                }}
              />
              <span>WIB</span>
            </div>
            <ul className="list-disc">
              {CreateStationForm.errors.jamBukaStasiunJam ? (
                <li>
                  <FormHelperText
                    sx={{
                      color: "#E41205",
                    }}
                  >
                    {CreateStationForm.errors.jamBukaStasiunJam}
                  </FormHelperText>
                </li>
              ) : null}
              {CreateStationForm.errors.jamBukaStasiunMenit ? (
                <li>
                  <FormHelperText
                    sx={{
                      color: "#E41205",
                    }}
                  >
                    {CreateStationForm.errors.jamBukaStasiunMenit}
                  </FormHelperText>
                </li>
              ) : null}
            </ul>
          </div>

          {/* JAM TUTUP STASIUN */}
          <div className="col-span-3">
            <div>
              <FormTitle
                children="Jam tutup stasiun"
                forElement="closed-hours-textfield"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center mt-3">
              <input
                id="closed-hours-textfield"
                className={`w-8 px-1 py-1 text-center rounded-md border border-slate-400 ${
                  CreateStationForm.errors.jamTutupStasiunJam
                    ? "border-red-500"
                    : ""
                }`}
                name="jamTutupStasiunJam"
                value={CreateStationForm.values.jamTutupStasiunJam}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateStationForm.handleChange(e);
                }}
              />
              <span>:</span>
              <input
                id="closed-hours-textfield"
                className={`w-8 px-1 py-1 text-center rounded-md border border-slate-400 ${
                  CreateStationForm.errors.jamTutupStasiunMenit
                    ? "border-red-500"
                    : ""
                }`}
                name="jamTutupStasiunMenit"
                value={CreateStationForm.values.jamTutupStasiunMenit}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateStationForm.handleChange(e);
                }}
              />
              <span>WIB</span>
            </div>
            <ul className="list-disc">
              {CreateStationForm.errors.jamTutupStasiunJam ? (
                <li>
                  <FormHelperText
                    sx={{
                      color: "#E41205",
                    }}
                  >
                    {CreateStationForm.errors.jamTutupStasiunJam}
                  </FormHelperText>
                </li>
              ) : null}
              {CreateStationForm.errors.jamTutupStasiunMenit ? (
                <li>
                  <FormHelperText
                    sx={{
                      color: "#E41205",
                    }}
                  >
                    {CreateStationForm.errors.jamTutupStasiunMenit}
                  </FormHelperText>
                </li>
              ) : null}
            </ul>
          </div>

          {/* TANGGAL PENERAPAN OPERASIONAL STASIUN */}
          <div className="col-span-6">
            <div className="mb-1">
              <FormTitle
                children="Tanggal penerapan operasional stasiun"
                forElement="assigned-date-station-operational-textfield"
              />
            </div>
            <MainCustomButton onClick={handleClick}>{`${dayjs(
              range?.from as Date
            ).format("DD MMM YYYY")} until ${dayjs(range?.to as Date).format(
              "DD MMM YYYY"
            )}`}</MainCustomButton>
            <Popover
              open={open}
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
                  selected={CreateStationForm.values.waktuBerlakuEfektif.from}
                  onSelect={(v, value) => {
                    console.log(v);

                    setRange({
                      ...range,
                      from: value,
                    });
                    CreateStationForm.setFieldValue("waktuBerlakuEfektif", {
                      ...CreateStationForm.values.waktuBerlakuEfektif,
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
                  selected={
                    CreateStationForm.values.waktuBerlakuEfektif.to == null
                      ? addYears(new Date(), 1)
                      : CreateStationForm.values.waktuBerlakuEfektif.to
                  }
                  onSelect={(v, value) => {
                    console.log(v);

                    setRange({
                      ...range,
                      to: value,
                    });
                    CreateStationForm.setFieldValue("waktuBerlakuEfektif", {
                      ...CreateStationForm.values.waktuBerlakuEfektif,
                      to: value,
                    });
                  }}
                />
              </div>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <MainCustomButtonDeny>Cancel</MainCustomButtonDeny>
          <MainCustomButton type="submit">Simpan</MainCustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateStationADMIN;
