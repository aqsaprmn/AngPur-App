import { POSTCreateKepalaStasiunByStasiun } from "@app/Services/DTA/KepalaStasiun/kepalaStasiunApiList";
import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { KepalaStasiunListResponseType } from "@app/utils/constants/types";
import { Autocomplete, Dialog, Popover, TextField } from "@mui/material";
import { addDays, addMonths, addYears } from "date-fns";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

const pastMonth = new Date();
const nextMonth = addMonths(new Date(), 1);

const CreateAssignKepalaStasiun = ({
  open,
  onClose,
  data,
  soList,
}: {
  //   data: any;
  open: boolean;
  onClose: any;
  data: {
    metadata: {
      timeInsert: number;
      timeUpdate: number;
      active: boolean;
      trash: boolean;
    };
    uuid: string;
    stations: {
      code: {
        internal: string;
        external: string;
      };
      name: string;
      id: string;
    };
    user: {
      username: string;
      fullName: string;
    };
    effectiveDate: {
      startFrom: string;
      endAt: string;
    };
  } | null;
  soList: KepalaStasiunListResponseType;
}) => {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const Formik = useFormik({
    initialValues: {
      kepalaStasiun: undefined,
      effectiveDate: {
        from: new Date(),
        to: null,
      },
    },
    onSubmit: async (val) => {
      console.log(val.kepalaStasiun);
      const fetching = await POSTCreateKepalaStasiunByStasiun({
        uuid: data?.stations.id as string,
        body: {
          user: {
            username: (val.kepalaStasiun as any)?.user.username,
          },
          effectiveDate: {
            startFrom: dayjs(new Date(val.effectiveDate.from)).format(
              "YYYY-MM-DD"
            ),
            endAt:
              val.effectiveDate.to == null
                ? ""
                : dayjs(new Date(val.effectiveDate.to)).format("YYYY-MM-DD"),
          },
        },
      });
      console.log(fetching);
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
        <span
          className="font-semibold text-md"
          onClick={() => {
            console.log({
              soList,
              data,
              val: Formik.values,
            });
          }}
        >
          Assign kepala stasiun "{data?.stations?.name}"
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          Formik.handleSubmit();
        }}
      >
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
            value={(Formik.values.kepalaStasiun as any)?.user.username}
            componentName="dariStasiunMainline"
            id="kepala-stasiun-textfield"
            onChange={(e, value) => {
              console.log(e);
              Formik.setFieldValue("kepalaStasiun", value);
            }}
            options={soList?.data?.content}
            getOptionLabel={(option) => option?.user?.username}
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
          {/* <MainCustomOutl onClick={handleClick} fullWidth>
            {Formik.values.effectiveDate.to == null
              ? `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                  "DD MMM YYYY"
                )} until ~`
              : `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                  "DD MMM YYYY"
                )} - ${dayjs(new Date(Formik.values.effectiveDate.to)).format(
                  "DD MMM YYYY"
                )}`}
          </MainCustomOutl> */}
          <MainCustomOutlinedButton
            props={{
              children:
                Formik.values.effectiveDate.to == null
                  ? `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                      "DD MMM YYYY"
                    )} until ~`
                  : `${dayjs(new Date(Formik.values.effectiveDate.from)).format(
                      "DD MMM YYYY"
                    )} - ${dayjs(
                      new Date(Formik.values.effectiveDate.to)
                    ).format("DD MMM YYYY")}`,
              fullWidth: true,
              onClick: handleClick,
            }}
          />
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
        <div>
          <MainCustomButton fullWidth type="submit">
            Assign
          </MainCustomButton>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateAssignKepalaStasiun;
