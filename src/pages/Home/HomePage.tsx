import {
  getAllPtaListQuery,
  getAllPtwListByStatusQuery,
  getPtwDailyQuery,
} from "@app/Services/PtwApi";
import { getReportingSO, getReportingTA } from "@app/Services/reportingApi";
import { Card, CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Data } from "../Occ/Duty/ImplementationOfWork/ApprovalIOWOCC";

function HomePage() {
  const [todaysPTW, setTodaysPTW] = useState<any[]>([]);
  const [todaysIOW, setTodaysIOW] = useState<any[]>([]);
  const [todaysPTA, setTodaysPTA] = useState<any[]>([]);
  const [ptwResultStatus, setPtwResultStatus] = useState<Data>({
    waitingApproval: [] as any[],
    onProgress: [] as any[],
    done: [] as any[],
  });
  const [ptaResultStatus, setPtaResultStatus] = useState<Data>({
    waitingApproval: [] as any,
    approved: [] as any,
    rejected: [] as any,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [eventReportTA, setEventReportTA] = useState<number>(0);
  const [eventReportSO, setEventReportSO] = useState<number>(0);

  const fetchData = async () => {
    try {
      const fetchingTodaysPTW = await getAllPtwListByStatusQuery({
        page: 1,
        size: 5000000,
        status: "",
        username: "",
        referensiAplikasi: "",
        sortOrder: "DESC",
      });
      const fetchingTodaysIow = await getPtwDailyQuery({
        page: 1,
        size: 5000000,
        uuid: "",
        username: "",
        idDaily: "",
        status: "",
      });
      const fetchingTodaysPta = await getAllPtaListQuery({
        username: "",
      });

      const processTodayPTW = fetchingTodaysPTW?.result.content.filter(
        (e: any) => {
          return e.tanggalPtw === dayjs(new Date()).format("DD/MM/YYYY");
        }
      );
      setTodaysPTW(processTodayPTW);
      const processTodayIOW = fetchingTodaysIow?.result.filter((e: any) => {
        return e.idTanggalDaily === dayjs(new Date()).format("DDMMYYYY");
      });
      setTodaysIOW(processTodayIOW);
      const processTodayPTA = (
        fetchingTodaysPta.result.data.content as []
      ).filter(
        (e: any) =>
          dayjs(new Date(Number(e.timestamp) * 1000)).format("DD/MM/YYYY") ===
          dayjs(new Date()).format("DD/MM/YYYY")
      );
      setTodaysPTA(processTodayPTA);

      const beforeProcess = {
        waitingApproval: [] as any[],
        onProgress: [] as any[],
        done: [] as any[],
      };
      await fetchingTodaysPTW?.result.content.map((item: any) => {
        switch (item.status) {
          case "DONE":
            beforeProcess.done.push(item);
            break;
          case "WAITING_VP_APPROVAL" ||
            "WAITING_JM_SHE_APPROVAL" ||
            "WAITING_SHE_APPROVAL" ||
            "WAITING_APPROVAL":
            beforeProcess.waitingApproval.push(item);
            break;
          case "ON_PROGRESS":
            beforeProcess.onProgress.push(item);
            break;
        }
      });

      const beforeProcessPta = {
        waitingApproval: [] as any[],
        approved: [] as any[],
        rejected: [] as any[],
      };

      await (fetchingTodaysPta.result.data.content as any[]).map(
        (item: any) => {
          if (
            item.approval == null ||
            Object.keys(item.approval).length == 0 ||
            item.approval === "null"
          ) {
            beforeProcessPta.waitingApproval.push(item);
            return;
          } else if (item.approval.tindakan === "Ya") {
            beforeProcessPta.approved.push(item);
            return;
          } else {
            beforeProcessPta.rejected.push(item);
            return;
          }
        }
      );
      setPtaResultStatus(beforeProcessPta);
      setPtwResultStatus(beforeProcess);
    } catch (error) {}
  };

  const fetchingNewApi = async () => {
    try {
      const fetchingReportTA = await getReportingTA();
      const fetchingReportSO = await getReportingSO();

      setEventReportTA(fetchingReportTA.result.data.total);
      setEventReportSO(fetchingReportSO.result.data.total);
    } catch (error) {}
  };

  useMemo((): any => {
    try {
      fetchData().then(async () => {
        fetchingNewApi();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading == true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-screen w-">
      <div className="flex gap-x-2 mb-3 w-full">
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white" id="ptwToday">
              TODAYS PTW
            </span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{todaysPTW.length}</span>
          </div>
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">TODAYS IOW</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{todaysIOW.length}</span>
          </div>
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">TODAYS PTA</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{todaysPTA.length}</span>
          </div>
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">REPORT TA EVENT</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{eventReportTA}</span>
          </div>
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">REPORT SO EVENT</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{eventReportSO}</span>
          </div>
        </Card>
      </div>
      <div className="flex mb-3">
        {/* <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">BY STATUS PTW</span>
          </div>
          {Object.keys(ptwResultStatus).map((item) => {
            return (
              <div className="p-2">
                <span>
                  {item} : {ptwResultStatus[item].length}
                </span>
              </div>
            );
          })}
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">BY STATUS PTA</span>
          </div>
          {Object.keys(ptaResultStatus).map((item) => {
            return (
              <div className="p-2">
                <span>
                  {item} : {ptaResultStatus[item].length}
                </span>
              </div>
            );
          })}
        </Card> */}
        <div>
          <div>
            <span className="font-bold">PTW RESULT STATUS</span>
          </div>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: Object.keys(ptwResultStatus).map((e) => e),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: Object.keys(ptwResultStatus).map(
                  (e) => ptwResultStatus[e].length
                ),
              },
            ]}
            width={400}
            height={250}
          />
        </div>
        <div>
          <div>
            <span className="font-bold">PTA RESULT STATUS</span>
          </div>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: Object.keys(ptaResultStatus).map((e) => e),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: Object.keys(ptaResultStatus).map(
                  (e) => ptaResultStatus[e].length
                ),
              },
            ]}
            width={400}
            height={250}
          />
        </div>
      </div>
      {/* <div className="flex gap-x-12">
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">REPORT TA EVENT</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{eventReportTA}</span>
          </div>
        </Card>
        <Card
          style={{
            minWidth: "12rem",
            minHeight: "7rem",
            borderRadius: "8px",
          }}
        >
          <div className="bg-main-red p-2">
            <span className="font-bold text-white">REPORT SO EVENT</span>
          </div>
          <div className="p-2 flex items-center justify-center">
            <span>{eventReportSO}</span>
          </div>
        </Card>
      </div> */}
    </div>
  );
}

export default HomePage;
