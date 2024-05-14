import { MainCustomButton } from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { POSTCreateChecklistAspect } from "@app/Services/Library/ChecklistAspect";
import { Autocomplete, OutlinedInput, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import * as Yup from "yup";

const groupList = ["PRE_DUTY", "DUTY", "POST_DUTY", "OPENING", "CLOSING"];

const indicator = {
  positive: ["YA", "BAIK"],
  negative: ["TIDAK", "TIDAK BAIK"],
};

const ChecklistAspekCreate = () => {
  const navigate = useNavigate();

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    validateForm,
  } = useFormik({
    initialValues: {
      title: "",
      name: "",
      description: "",
      indicator: {
        positive: "",
        negative: "",
      },
      group: [],
    },
    onSubmit: async (val) => {
      toast.loading("Submitting...", {
        id: "loading-toast",
        dismissible: true,
      });

      const fetching = await POSTCreateChecklistAspect({
        version: "2.0.0",
        aspect: {
          title: val.title,
          name: val.name,
          description: val.description,
          indicator: val.indicator,
          group: val.group,
        },
      });

      if (fetching.isSuccess) {
        toast.dismiss("loading-toast");

        return Swal.fire({
          title: "Success",
          text: "Create checklist aspek successfull",
          icon: "success",
        }).then(() => {
          navigate("/duty/adm/checklist-aspek");
        });
      } else if (fetching.isError) {
        toast.dismiss("loading-toast");
        return Swal.fire({
          title: "Oops",
          text: `${fetching.data.error.errorField[0].field} - ${fetching.data.error.errorField[0].message}`,
          icon: "error",
        });
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string(),
      indicator: Yup.object().shape({
        positive: Yup.string().required(),
        negative: Yup.string().required(),
      }),
      answers: Yup.array(Yup.string().required()),
    }),
    validateOnChange: false,
  });

  return (
    <>
      <div>
        <div className="bg-white p-4 rounded-xl">
          {/* TITLE */}
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-lg font-semibold"
              onClick={() => console.log(errors)}
            >
              Checklist Aspek
            </span>
          </div>

          <div className="mb-3 flex flex-col">
            <FormTitle children="Judul" forElement="title" />
            <OutlinedInput
              id="title"
              name="title"
              autoComplete="off"
              onChange={handleChange}
              size="small"
              fullWidth
              className="bg-transparent text-sm mt-4 mb-8"
              sx={{
                borderRadius: "7px",
                borderColor: "#DDDDDD !important",
                "& .Mui-disabled": {
                  borderColor: "red !important",
                },
              }}
              value={values.title}
            />
          </div>

          <div className="mb-3 flex flex-col">
            <FormTitle children="Nama" forElement="name" />
            <OutlinedInput
              id="name"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              size="small"
              fullWidth
              className="bg-transparent text-sm mt-4 mb-8"
              sx={{
                borderRadius: "7px",
                borderColor: "#DDDDDD !important",
                "& .Mui-disabled": {
                  borderColor: "red !important",
                },
              }}
              value={values.name}
            />
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex flex-col mb-3">
              <FormTitle children="Indikator" forElement="total-answers" />
            </div>
            <div className="flex flex-wrap gap-x-3 mb-3">
              <div className="grow">
                <FormTitle children="Positif" forElement="positive" />
                <Autocomplete
                  size="small"
                  id="positive"
                  filterSelectedOptions={true}
                  options={indicator.positive.map((item) => item)}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "7px",
                        },
                      }}
                      {...params}
                      placeholder="Positif"
                    />
                  )}
                  onChange={(_e, v) => {
                    if (v != null) {
                      setFieldValue("indicator.positive", v);
                    }
                  }}
                  isOptionEqualToValue={(option, label) => option == label}
                />
              </div>
              <div className="grow">
                <FormTitle children="Negatif" forElement="negative" />
                <Autocomplete
                  size="small"
                  id="negative"
                  filterSelectedOptions={true}
                  options={indicator.negative.map((item) => item)}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "7px",
                        },
                      }}
                      {...params}
                      placeholder="Negatif"
                    />
                  )}
                  onChange={(_e, v) => {
                    if (v != null) {
                      setFieldValue("indicator.negative", v);
                    }
                  }}
                  isOptionEqualToValue={(option, label) => option == label}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 flex flex-col">
            <FormTitle children="Deskripsi" forElement="description" />
            <OutlinedInput
              id="description"
              name="description"
              multiline
              minRows={3}
              onChange={handleChange}
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
              value={values.description}
            />
          </div>

          <div className="flex flex-wrap gap-x-3 mb-3">
            <div className="grow">
              <FormTitle children="Grup" forElement="group" />
              <Autocomplete
                size="small"
                id="group"
                filterSelectedOptions={true}
                multiple
                options={groupList.map((item) => item)}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "7px",
                      },
                    }}
                    {...params}
                    placeholder="Grup"
                  />
                )}
                onChange={(_e, v) => {
                  if (v != null) {
                    setFieldValue("group", v);
                  }
                }}
                isOptionEqualToValue={(option, label) => option == label}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2">
            <MainCustomButton
              onClick={async () => {
                navigate("/duty/adm/checklist-aspek");
              }}
              backgroundColor="#367196"
            >
              Batal
            </MainCustomButton>

            <MainCustomButton
              onClick={async () => {
                await validateForm();
                console.log("ini errors", errors);
                handleSubmit();
              }}
            >
              Submit
            </MainCustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChecklistAspekCreate;
