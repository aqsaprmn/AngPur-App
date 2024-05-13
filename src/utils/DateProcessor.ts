import dayjs from "dayjs";

export const convertDate = ({ date }: { date: Date }) => {
  return Intl.DateTimeFormat("id", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
};

export const getInBetweenDate = (startDate: string, stopDate: string) => {
  let startDateProcessed = new Date(dayjs(startDate, "DDMMYYYY").format());
  let stopDateProcessed = new Date(dayjs(stopDate, "DDMMYYYY").format());

  const date = new Date(startDateProcessed.getTime());

  const dates = [];

  while (date <= stopDateProcessed) {
    dates.push(dayjs(new Date(date)).format("DD/MM/YYYY"));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
export const getInBetweenDateCreateIOW = (
  startDate: string,
  stopDate: string
) => {
  let startDateProcessed = new Date(dayjs(startDate, "DD/MM/YYYY").format());
  let stopDateProcessed = new Date(dayjs(stopDate, "DD/MM/YYYY").format());

  const date = new Date(startDateProcessed.getTime());

  const dates = [];

  while (date <= stopDateProcessed) {
    dates.push(dayjs(new Date(date)).format("DD/MM/YYYY"));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getDateFromIdDaily = (
  data: {
    uuid: string;
    dailyStatus: string;
    idTanggalDaily: string;
    nomorAan: string;
    ptwData: any[];
  }[]
) => {
  const result = data.map((item) => {
    let date = dayjs(item.idTanggalDaily, "DDMMYYYY").format();
    return dayjs(new Date(date)).format("DD/MM/YYYY");
  });

  return result;
};
