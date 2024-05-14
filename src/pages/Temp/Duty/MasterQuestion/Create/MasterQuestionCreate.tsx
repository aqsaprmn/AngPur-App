import { MainCustomButton } from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import {
  GETListGroupMasterQuestion,
  POSTCreateMasterQuestion,
} from "@app/Services/Assessment/MasterQuestion";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface MasterQuestion {
  fixed: boolean;
  type: "OPTION" | "FREE_TEXT";
  code: string;
  group: {
    code: string;
    name: string;
  };
  question: string;
  answers: {
    answer: {
      text: string;
      correct: boolean;
    };
  }[];
}

type GroupType = {
  group: {
    code: string;
    name: string;
    label?: string;
  };
};

const yesornoInit = [
  {
    answer: {
      text: "YA",
      correct: true,
    },
  },
  {
    answer: {
      text: "TIDAK",
      correct: false,
    },
  },
];

const MasterQuestionsCreate = () => {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState<
    {
      group: {
        code: string;
        name: string;
        label: string;
      };
    }[]
  >([]);

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    validateForm,
  } = useFormik({
    initialValues: {
      fixed: true,
      type: "FREE_TEXT",
      code: "",
      group: {
        code: "",
        name: "",
      },
      question: "",
      answers: yesornoInit,
    } satisfies MasterQuestion,
    onSubmit: async (val) => {
      toast.loading("Submitting...", {
        id: "loading-toast",
        dismissible: true,
      });

      const fetching = await POSTCreateMasterQuestion({
        version: "2.0.0",
        masterQuestion: {
          fixed: val.fixed,
          type: val.type,
          code: val.code,
          group: val.group,
          question: val.question,
          answers: val.answers,
        },
      });

      if (fetching.isSuccess) {
        toast.dismiss("loading-toast");

        return Swal.fire({
          title: "Success",
          text: "Create master question successfull",
          icon: "success",
        }).then(() => {
          navigate("/duty/adm/master-question");
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
      fixed: Yup.boolean(),
      type: Yup.string().oneOf(["OPTION", "FREE_TEXT"]),
      group: Yup.object().shape({
        code: Yup.string().min(1),
        name: Yup.string().min(1),
      }),
      question: Yup.string().min(3),
      answers: Yup.array(
        Yup.object().shape({
          answer: Yup.object().shape({
            text: Yup.string().min(1),
            correct: Yup.boolean(),
          }),
        })
      ),
    }),
    validateOnChange: false,
  });

  const nextFocus = useRef<HTMLInputElement>();

  const [totalAnswer, setTotalAnswer] = useState<number>(values.answers.length);

  const [tempTotalAnswer, setTempTotalAnswer] = useState<number>(
    values.answers.length
  );

  const [answerRows, setAnswerRows] = useState<
    {
      answer: {
        text: string;
        correct: boolean;
      };
    }[]
  >(values.answers);

  const [groupForm, setGroupForm] = useState<string>("");

  const fetchData = async () => {
    const fetching = await GETListGroupMasterQuestion({
      pageNumber: 1,
      pageSize: 1000,
    });

    const groupGo = fetching.data.data.content.map((item: GroupType) => {
      item.group.label = `${item.group.code}-${item.group.name}`;

      return item;
    });

    setGroupList(groupGo);
  };

  useEffect(() => {
    if (!Number.isNaN(totalAnswer)) {
      if (!Number.isNaN(tempTotalAnswer)) {
        if (totalAnswer > tempTotalAnswer) {
          setAnswerRows([
            ...answerRows,
            { answer: { text: "", correct: false } },
          ]);
        }

        if (totalAnswer === tempTotalAnswer) {
          setAnswerRows([...values.answers]);
        }

        if (tempTotalAnswer > 2 && totalAnswer < tempTotalAnswer) {
          const decre = totalAnswer - tempTotalAnswer;

          setAnswerRows([...answerRows].slice(0, decre));
        }
      } else {
        const incre = totalAnswer - yesornoInit.length;

        const appArr = [...yesornoInit];

        for (let i = 1; i <= incre; i++) {
          appArr.push({ answer: { text: "", correct: false } });
        }

        setAnswerRows(appArr);
      }
    } else {
      setAnswerRows([]);
    }
  }, [totalAnswer]);

  const nextBlur = () => {
    const inputBlur = nextFocus.current?.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    if (inputBlur.id === "total-answers") inputBlur.blur();
  };

  useEffect(() => {
    values.answers = [...answerRows] as {
      answer: { text: string; correct: boolean };
    }[];
  }, [answerRows]);

  useEffect(() => {
    const groupSplit = groupForm.split("-");

    if (groupSplit.length > 1) {
      values.group.code = groupSplit[0].trim();
      values.group.name = groupSplit[1].trim();
    } else {
      values.group.name = groupSplit[0];
      values.group.code = "";
    }
  }, [groupForm]);

  useMemo(() => {
    fetchData();
  }, []);

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
              Pertanyaan
            </span>
            <div className="flex">
              <div>
                <FormControlLabel
                  control={<Checkbox value={values.fixed} size="small" />}
                  label="Tetap"
                  onChange={() => setFieldValue("fixed", !values.fixed)}
                  checked={values.fixed}
                  slotProps={{
                    typography: {
                      fontSize: "14px",
                      fontWeight: "600",
                    },
                  }}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={values.type === "FREE_TEXT" ? false : true}
                      size="small"
                    />
                  }
                  label="Pilihan"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const type =
                      target.checked === true ? "OPTION" : "FREE_TEXT";

                    setFieldValue("type", type);
                  }}
                  checked={values.type === "FREE_TEXT" ? false : true}
                  slotProps={{
                    typography: {
                      fontSize: "14px",
                      fontWeight: "600",
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* KODE */}
          <div className="mb-3 flex flex-col">
            <FormTitle children="Kode" forElement="code" />
            <OutlinedInput
              id="code"
              name="code"
              autoComplete="off"
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
              value={values.code}
            />
          </div>

          {/* GROUP */}
          <div className="flex flex-wrap gap-x-3 mb-3">
            <div className="grow">
              <FormTitle children="Grup" forElement="grup" />
              <Autocomplete
                size="small"
                id="grup"
                filterSelectedOptions={true}
                options={groupList.map((item) => item.group.label)}
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
                    setGroupForm(v);
                  }
                }}
                isOptionEqualToValue={(option, label) => option == label}
              />
            </div>
          </div>

          {/* PERTANYAAN */}
          <div className="mb-3 flex flex-col">
            <FormTitle children="Pertanyaan" forElement="question" />
            <OutlinedInput
              id="question"
              name="question"
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
              value={values.question}
            />
          </div>

          {/* JAWABAN */}
          {values.type !== "FREE_TEXT" && (
            <div className="flex flex-col mb-3">
              <div className="flex flex-col mb-3">
                <FormTitle
                  children="Jumlah Jawaban"
                  forElement="total-answers"
                />
                <OutlinedInput
                  ref={nextFocus}
                  id="total-answers"
                  name="answers"
                  size="small"
                  type="number"
                  onBlur={(e) => {
                    if (e.target.value == "") {
                      setTempTotalAnswer(2);
                      setTotalAnswer(2);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value != "") {
                      if (
                        parseInt(e.target.value) < 2 ||
                        parseInt(e.target.value) > 10
                      ) {
                        setTempTotalAnswer(2);
                        setTotalAnswer(2);
                      } else {
                        setTempTotalAnswer(totalAnswer);
                        setTotalAnswer(parseInt(e.target.value));
                      }

                      nextBlur();
                    } else {
                      setTempTotalAnswer(totalAnswer);
                      setTotalAnswer(parseInt(e.target.value));
                    }
                  }}
                  fullWidth
                  className="bg-transparent text-sm mt-4 mb-8"
                  sx={{
                    borderRadius: "7px",
                    borderColor: "#DDDDDD !important",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  }}
                  value={totalAnswer}
                />
              </div>
              {totalAnswer > 1 && (
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="text text-text-title">
                        <th className="text-start">No</th>
                        <th>Jawaban</th>
                        <th>Benar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {answerRows.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}.</td>
                            <td>
                              <div className="flex flex-col mb-3 w-full">
                                <OutlinedInput
                                  id={`answer-${item}`}
                                  name={`answer-${item}`}
                                  size="small"
                                  onChange={(e) => {
                                    const currentAnswers = [...answerRows];

                                    currentAnswers.map((ca, cai) => {
                                      if (i === cai) {
                                        ca.answer.text = e.target.value;
                                      }
                                    });

                                    setAnswerRows([...currentAnswers]);
                                  }}
                                  fullWidth
                                  className="bg-transparent text-sm mt-4 mb-8"
                                  sx={{
                                    borderRadius: "7px",
                                    borderColor: "#DDDDDD !important",
                                    "& .Mui-disabled": {
                                      borderColor: "red !important",
                                    },
                                  }}
                                  value={item.answer.text}
                                />
                              </div>
                            </td>
                            <td className="text-center">
                              <div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      value={item.answer.correct}
                                      size="small"
                                    />
                                  }
                                  label=""
                                  onChange={(e) => {
                                    const currentAnswers = [...answerRows];

                                    const target = e.target as HTMLInputElement;

                                    currentAnswers.map((ca, cai) => {
                                      if (i === cai) {
                                        if (ca.answer.correct === true)
                                          return Swal.fire({
                                            title: "Oops",
                                            text: "Must has one correct answer!",
                                            icon: "error",
                                          });

                                        target.checked === true
                                          ? (ca.answer.correct = target.checked)
                                          : "";
                                      } else {
                                        ca.answer.correct = false;
                                      }
                                    });

                                    setAnswerRows([...currentAnswers]);
                                  }}
                                  checked={item.answer.correct}
                                  slotProps={{
                                    typography: {
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    },
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-2">
            <MainCustomButton
              onClick={async () => {
                navigate("/duty/adm/master-question");
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
            {/* <MainCustomButton backgroundColor="#367196">
              Setujui
            </MainCustomButton> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterQuestionsCreate;
