import { MainCustomButton } from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import EditStationConfirmation from "./Modules/EditStationConfirmation";

const ViewStationADMIN = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const handleCloseConfirmation = () => {
    setConfirmationDialog(false);
  };
  const handleProceedConfirmation = () => {
    EditStationForm.handleSubmit();
  };
  const handleOpenConfirmation = () => {
    setConfirmationDialog(true);
  };

  const EditStationForm = useFormik({
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
      waktuBerlakuEfektif: [],
    },
    onSubmit: () => {
      console.log("print");
      handleCloseConfirmation();
    },
    validationSchema: Yup.object().shape({
      stationCodeInternal: Yup.string().min(3).required(),
      stationCodeExternal: Yup.string().min(3).required(),
      stationName: Yup.string().min(4).required(),
      stationLatitude: Yup.string().min(6).required(),
      stationLongitude: Yup.string().min(6).required(),
    }),
  });

  const fetchDetailData = async () => {
    setLoading(true);
    try {
      // const fetching = await GETDetailStasiun(id as string);
      // const result: StationDetailResponseType = fetching.data.data;
      // let data: Data = {
      //   stationCodeInternal: result.station.code.internal,
      //   stationCodeExternal: result.station.code.external,
      //   stationName: result.station.name,
      //   stationLatitude: result.station.location.latitude,
      //   stationLongitude: result.station.location.longitude,
      //   jamBukaStasiunJam: dayjs(
      //     new Date(result.station.operationHour[0].openTime)
      //   ).format("HH"),
      //   jamBukaStasiunMenit: dayjs(
      //     new Date(result.station.operationHour[0].openTime)
      //   ).format("mm"),
      //   jamTutupStasiunJam: dayjs(
      //     new Date(result.station.operationHour[0].closeTime)
      //   ).format("HH"),
      //   jamTutupStasiunMenit: dayjs(
      //     new Date(result.station.operationHour[0].closeTime)
      //   ).format("mm"),
      //   waktuBerlakuEfektif: {
      //     from: dayjs(
      //       new Date(result.station.operationHour[0].effectiveDate.startFrom)
      //     ),
      //     to: dayjs(
      //       new Date(
      //         result.station.operationHour[0].effectiveDate.endAt as string
      //       )
      //     ),
      //   },
      // };
      // Object.keys(data).map((item) => {
      //   EditStationForm.setFieldValue(item, data[item]);
      // });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    fetchDetailData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white px-4 py-2 rounded-xl">
      <div className="mb-5">
        <span className="text-xl font-bold">View Stasiun "CAWANG"</span>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let errors = await EditStationForm.validateForm();

          if (Object.keys(errors).length == 0) {
            return handleOpenConfirmation();
          }
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
              value={EditStationForm.values.stationCodeInternal}
              error={EditStationForm.errors.stationCodeInternal ? true : false}
              onChange={EditStationForm.handleChange}
              disabled
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
              value={EditStationForm.values.stationCodeExternal}
              error={EditStationForm.errors.stationCodeExternal ? true : false}
              onChange={EditStationForm.handleChange}
              disabled
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
            value={EditStationForm.values.stationName}
            error={EditStationForm.errors.stationName ? true : false}
            onChange={EditStationForm.handleChange}
            disabled
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
        <div className="grid grid-cols-12 gap-5 mb-10">
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
              value={EditStationForm.values.stationLatitude}
              error={EditStationForm.errors.stationLatitude ? true : false}
              onChange={EditStationForm.handleChange}
              disabled
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
              value={EditStationForm.values.stationLongitude}
              error={EditStationForm.errors.stationLongitude ? true : false}
              onChange={EditStationForm.handleChange}
              disabled
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
        <div className="flex justify-end">
          <MainCustomButton
            onClick={() => {
              navigate(-1);
            }}
          >
            Kembali
          </MainCustomButton>
        </div>
      </form>

      {/* CONFIRMATION DIALOG */}
      <EditStationConfirmation
        open={confirmationDialog}
        onClose={handleCloseConfirmation}
        onConfirm={handleProceedConfirmation}
      />
    </div>
  );
};

export default ViewStationADMIN;
