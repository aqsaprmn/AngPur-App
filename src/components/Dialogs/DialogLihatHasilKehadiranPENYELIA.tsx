import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Dialog, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { MdStickyNote2 } from "react-icons/md";
import Loader from "../Loader/Loader";
import QuestionCard from "../QuestionCard";

const DialogLihatHasilKehadiranPENYELIA = ({
  open,
  onClose,
  isLoading,
  data,
}: {
  open: boolean;
  onClose: any;
  isLoading: boolean;
  data: AssesmentAnswer[];
}) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [dataHealth, setDataHealth] = useState([]);
  // const [setNonDataHealth] = useState<any>([]);
  // console.log(nonDataHealth);
  useEffect(() => {
    if (data) {
      const healthAssessments = data.filter(
        (assessment: any) => assessment.questionResult.question.healthAssessment
      );
      // const nonHealthAssessments = data.filter(
      //   (assessment: any) =>
      //     !assessment.questionResult.question.healthAssessment
      // );
      setDataHealth(healthAssessments as never[]);
      // setNonDataHealth(nonHealthAssessments as never[]);
    }
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          "-webkit-backdrop-filter": "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <TabContext value={tabIndex.toString()}>
        <TabList
          onChange={(e, v) => {
            setTabIndex(v);
            console.log(e);
          }}
          sx={{
            width: "100%",
            "& .Mui-selected": {
              color: "red",
            },
            "& .MuiTabs-indicator": {
              color: "red",
              backgroundColor: "red",
              width: "75%",
            },
          }}
        >
          <Tab
            sx={{
              flex: 1,
            }}
            label={
              <div className="flex flex-wrap gap-2 items-center">
                <BiPlusMedical />{" "}
                <span className="font-bold text-sm">Kesehatan</span>
              </div>
            }
            value={"1"}
          />
          <Tab
            label={
              <div className="flex flex-wrap gap-2 items-center">
                <MdStickyNote2 />{" "}
                <span className="font-bold text-sm">Assesment</span>
              </div>
            }
            value={"2"}
          />
        </TabList>
        <div className="grid min-h-[180px]">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <TabPanel value="1"></TabPanel>
              <TabPanel value="2">
                {dataHealth.length > 0
                  ? dataHealth.map((item: any) => {
                      return (
                        <QuestionCard
                          key={item?.questionResult?.question?.uuid}
                          title={item?.questionResult?.question?.question}
                          subtitle="Answer"
                          answer={item?.questionResult?.answers}
                          passed={item?.questionResult?.correctAnswer}
                        />
                      );
                    })
                  : null}
              </TabPanel>
            </>
          )}
        </div>
      </TabContext>
    </Dialog>
  );
};

export default DialogLihatHasilKehadiranPENYELIA;
