import {
  GETDetailKodeDinas,
  POSTCreateKodeDinas,
} from "@app/Services/DTA/KodeDinasSO/kodeDinasSoApiList";
import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { Data, KodeDinasDetailResponseType } from "@app/utils/constants/types";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const EditDutyCodeADMIN = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState<KodeDinasDetailResponseType>();
  console.log(detailData);

  const CreateDutyCodeForm = useFormik({
    initialValues: {
      dutyCode: null,
      startTimeHour: "",
      freeDuty: false,
      startTimeMinute: "",
      finishTimeHour: "",
      finishTimeMinute: "",
      baseEmolument: 0,
      additionalEmolument: 0,
      firstDuty: false,
      lastDuty: false,
    },
    onSubmit: async (val) => {
      const fetching = await POSTCreateKodeDinas({
        body: {
          version: "2.0.0",
          code: val.dutyCode == null ? "" : val.dutyCode,
          duty: val.freeDuty,
          emolument: {
            base: val.baseEmolument,
            addition: val.additionalEmolument,
          },
          firstDuty: val.firstDuty,
          lastDuty: val.lastDuty,
          scheduleTime: {
            start: `${val.startTimeHour === "24" ? "00" : val.startTimeHour}:${
              val.startTimeMinute === "60" ? "00" : val.startTimeMinute
            }:00`,
            finish: `${
              val.finishTimeHour === "24" ? "00" : val.finishTimeHour
            }:${
              val.finishTimeMinute === "60" ? "00" : val.finishTimeMinute
            }:00`,
          },
        },
      });

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Success",
          text: "Data created successfully",
          icon: "success",
        });
      }
    },
    validationSchema: Yup.object().shape({
      dutyCode: Yup.string().required(),
      freeDuty: Yup.boolean().required(),
      startTimeMinute: Yup.string().test({
        message: "Format is not satisfy the requirement)",
        test: (val, con) => {
          console.log(val);

          if (Number(con.parent.startTimeMinute) > 60) {
            return false;
          } else if (Number(con.parent.startTimeMinute) < 0) {
            return false;
          }

          return true;
        },
      }),
      startTimeHour: Yup.string().test({
        message: "Format is not satisfy the requirement",
        test: (val, con) => {
          console.log(val);

          if (Number(con.parent.startTimeHour) > 24) {
            return false;
          } else if (Number(con.parent.startTimeHour) < 0) {
            return false;
          }

          return true;
        },
      }),
      finishTimeMinute: Yup.string().test({
        message: "Format is not satisfy the requirement)",
        test: (val, con) => {
          console.log(val);

          if (Number(con.parent.finishTimeMinute) > 60) {
            return false;
          } else if (Number(con.parent.finishTimeMinute) < 0) {
            return false;
          }

          return true;
        },
      }),
      finishTimeHour: Yup.string().test({
        message: "Format is not satisfy the requirement",
        test: (val, con) => {
          console.log(val);

          if (Number(con.parent.finishTimeHour) > 24) {
            return false;
          } else if (Number(con.parent.finishTimeHour) < 0) {
            return false;
          }

          return true;
        },
      }),
      baseEmolument: Yup.number().min(1).required(),
      additinonalEmolument: Yup.number().min(0).required(),
      firstDuty: Yup.boolean().required(),
      lastDuty: Yup.boolean().required(),
    }),
  });

  const fetchDetailData = async () => {
    const fetching = await GETDetailKodeDinas(id as string);

    const result = fetching.data as any;
    setDetailData(result);

    const data: Data = {
      dutyCode: result.data.scheduleCode.code,
      startTimeHour: result.data.scheduleCode.scheduleTime.start.split(":")[0],
      freeDuty: result.data.scheduleCode.duty,
      startTimeMinute:
        result.data.scheduleCode.scheduleTime.start.split(":")[1],
      finishTimeHour:
        result.data.scheduleCode.scheduleTime.finish.split(":")[0],
      finishTimeMinute:
        result.data.scheduleCode.scheduleTime.finish.split(":")[1],
      baseEmolument: result.data.scheduleCode.emolument.base,
      additionalEmolument: result.data.scheduleCode.emolument.addition,
      firstDuty: result.data.scheduleCode.firstDuty,
      lastDuty: result.data.scheduleCode.lastDuty,
    };

    Object.keys(data).map((item) => {
      CreateDutyCodeForm.setFieldValue(item, data[item]);
    });
  };

  useMemo(() => {
    fetchDetailData();
  }, []);

  return (
    <form
      className="bg-white px-4 py-4 rounded-lg min-h-[80vh] relative"
      onSubmit={(e) => {
        e.preventDefault();

        CreateDutyCodeForm.handleSubmit();
      }}
    >
      <div className="mb-3">
        <span className="font-bold">Buat Kode Dinasan</span>
      </div>
      {/* KODE DINASAN, JAM MULAI, JAM SELESAI */}
      <div className="grid grid-cols-12 gap-5 mb-4">
        {/* KODE DINASAN */}
        <div className="col-span-6">
          <div>
            <FormTitle
              children="Kode Dinasan"
              forElement="duty-code-textfield"
            />
          </div>
          <OutlinedInput
            id="duty-code-textfield"
            name="dutyCode"
            onChange={CreateDutyCodeForm.handleChange}
            value={CreateDutyCodeForm.values.dutyCode}
            error={CreateDutyCodeForm.errors.dutyCode ? true : false}
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

        {/* LIBUR DINAS */}
        <div className="col-span-2">
          <div>
            <FormTitle children="Dinas" forElement="libur-dinas-textfield" />
          </div>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Ya"
            checked={CreateDutyCodeForm.values.freeDuty}
            onChange={() => {
              CreateDutyCodeForm.setFieldValue(
                "freeDuty",
                !CreateDutyCodeForm.values.freeDuty
              );
            }}
          />
        </div>

        {/* JAM MULAI DAN JAM SELESAI */}
        <div className="col-span-4 flex flex-wrap gap-5">
          {/* JAM MULAI */}
          <div className="flex-1">
            <div>
              <FormTitle children="Jam Mulai" />
            </div>
            <div
              className="flex gap-2 flex-wrap items-center mt-3"
              id="operational-hours-textfield"
            >
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="startTimeHour"
                value={CreateDutyCodeForm.values.startTimeHour}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateDutyCodeForm.handleChange(e);
                }}
              />
              <span>:</span>
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="startTimeMinute"
                value={CreateDutyCodeForm.values.startTimeMinute}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateDutyCodeForm.handleChange(e);
                }}
              />
              <span>WIB</span>
            </div>
            {CreateDutyCodeForm.errors.startTimeHour ||
            CreateDutyCodeForm.errors.startTimeMinute ? (
              <ul>
                <li>
                  <FormHelperText>
                    {CreateDutyCodeForm.errors.startTimeHour}
                  </FormHelperText>
                </li>
                <li>
                  <FormHelperText>
                    {CreateDutyCodeForm.errors.startTimeMinute}
                  </FormHelperText>
                </li>
              </ul>
            ) : null}
          </div>

          {/* JAM SELESAI */}
          <div className="flex-1">
            <div>
              <FormTitle children="Jam Selesai" />
            </div>
            <div
              className="flex gap-2 flex-wrap items-center mt-3"
              id="operational-hours-textfield"
            >
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="finishTimeHour"
                value={CreateDutyCodeForm.values.finishTimeHour}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateDutyCodeForm.handleChange(e);
                }}
              />
              <span>:</span>
              <input
                id="operational-hours-textfield"
                className="w-8 px-1 py-1 text-center rounded-md border border-slate-400"
                name="finishTimeMinute"
                value={CreateDutyCodeForm.values.finishTimeMinute}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return null;
                  }
                  CreateDutyCodeForm.handleChange(e);
                }}
              />
              <span>WIB</span>
            </div>
            {CreateDutyCodeForm.errors.finishTimeHour ||
            CreateDutyCodeForm.errors.finishTimeMinute ? (
              <ul>
                <li>
                  <FormHelperText>
                    {CreateDutyCodeForm.errors.finishTimeHour}
                  </FormHelperText>
                </li>
                <li>
                  <FormHelperText>
                    {CreateDutyCodeForm.errors.finishTimeMinute}
                  </FormHelperText>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* EMOLUMEN DASAR DAN EMOLUMEN TAMBAHAN */}
      <div className="grid grid-cols-12 gap-5 mb-10">
        {/* EMOLUMEN DASAR */}
        <div className="col-span-6">
          <div>
            <FormTitle
              children="Emolumen Dasar"
              forElement="base-emolument-textfield"
            />
          </div>
          <OutlinedInput
            id="base-emolument-textfield"
            name="baseEmolument"
            size="small"
            value={CreateDutyCodeForm.values.baseEmolument}
            onChange={CreateDutyCodeForm.handleChange}
            error={CreateDutyCodeForm.errors.baseEmolument ? true : false}
            fullWidth
            type="number"
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

        {/* EMOLUMEN TAMBAHAN */}
        <div className="col-span-6">
          <div>
            <FormTitle
              children="Emolumen Tambahan"
              forElement="additional-emolument-textfield"
            />
          </div>
          <OutlinedInput
            id="additional-emolument-textfield"
            name="additionalEmolument"
            type="number"
            onChange={CreateDutyCodeForm.handleChange}
            value={CreateDutyCodeForm.values.additionalEmolument}
            error={CreateDutyCodeForm.errors.additionalEmolument ? true : false}
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

      {/* AWAL DINASAN & AKHIR DINASAN */}
      <div className="flex flex-col flex-wrap gap-1">
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Awal Dinasan"
          checked={CreateDutyCodeForm.values.firstDuty}
          onChange={() => {
            CreateDutyCodeForm.setFieldValue(
              "firstDuty",
              !CreateDutyCodeForm.values.firstDuty
            );
          }}
        />
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Akhir Dinasan"
          checked={CreateDutyCodeForm.values.lastDuty}
          onChange={() => {
            CreateDutyCodeForm.setFieldValue(
              "lastDuty",
              !CreateDutyCodeForm.values.lastDuty
            );
          }}
        />
      </div>
      <div className="flex justify-end gap-2 min-h-full items-end absolute bottom-7 right-7">
        <MainCustomButtonDeny>Cancel</MainCustomButtonDeny>
        <MainCustomButton type="submit">Create Code</MainCustomButton>
      </div>
    </form>
  );
};

export default EditDutyCodeADMIN;
