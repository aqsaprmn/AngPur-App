import { AiOutlineLineChart } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { HiClipboardDocument } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { PiClockAfternoonFill } from "react-icons/pi";
import { permissionFullExtractor } from "../Processor";

export const defaultRoleV2 = {
  initialRoute: "/home",
  routes: [
    {
      id: 1,
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      children: [],
      route: "/home",
      expanded: false,
      translationKey: "dashboard",
      isHidden: false,
    },
    {
      id: 2,
      title: "Pre Duty",
      icon: <AiOutlineLineChart />,
      translationKey: "preDuty",
      route: "/pre-duty",
      children: [
        {
          title: "Permit To Access",
          children: [],
          route: "/pre-duty/permit-to-access",
          translationKey: "permitToAccess",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_PRE_DUTY_PERMIT_TO_ACCESS,
          }),
        },
        {
          title: "Permit To Work",
          children: [],
          route: "/pre-duty/permit-to-work",
          translationKey: "permitToWork",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_PRE_DUTY_PERMIT_TO_WORK,
          }),
        },
        {
          title: "Master Pertanyaan",
          children: [],
          route: "/duty/adm/master-question",
          translationKey: "Master Pertanyaan",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_MASTER_QUESTIONS_MENU,
          }),
        },
      ],
      expanded: false,
      isHidden: false,
    },
    {
      id: 3,
      title: "Duty",
      icon: <HiClipboardDocument />,
      route: "/duty",
      expanded: false,
      children: [
        {
          title: "Permit To Work",
          children: [],
          route: "/duty/mt/permit-to-work",
          translationKey: "permitToWork",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_PERMIT_TO_WORK,
          }),
        },
        // {
        //   title: "Kode Dinasan Penyelia",
        //   children: [],
        //   route: "/duty/penyelia/kode-kedinasan",
        //   translationKey: "Kode Dinasan Penyelia",
        //   isHidden: !permissionFullExtractor({
        //     env: import.meta.env.VITE_ALLOWED_DUTY_KODE_DINAS_TA,
        //   }),
        // },
        {
          title: "Implementation of Work",
          children: [],
          route: "/duty/mt/implementation-of-work",
          translationKey: "implementation Of Work",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_IMPLEMENTATION_OF_WORK,
          }),
        },
        {
          title: "Approval PTA",
          children: [],
          route: "/duty/sc/approval-permit-to-access",
          translationKey: "approvalPTA",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_APPROVAL_PTA_SO,
          }),
        },
        {
          title: "User Management",
          children: [],
          route: "/duty/adm/user-management",
          translationKey: "User Management",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_MANAGEMENT_USER_MENU,
          }),
        },
        {
          title: "Hari Besar Nasional",
          children: [],
          route: "/duty/adm/public-holiday",
          translationKey: "Hari Besar Nasional",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_PUBLIC_HOLIDAY_MENU,
          }),
        },
        {
          title: "Rekening Bank",
          children: [],
          route: "/duty/adm/bank-account",
          translationKey: "Rekening Bank",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_BANK_ACCOUNT_MENU,
          }),
        },
        {
          title: "Checklist Aspek",
          children: [],
          route: "/duty/adm/checklist-aspek",
          translationKey: "Checklist Aspek",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_CHECKLIST_ASPEK_MENU,
          }),
        },
        {
          title: "Kode Dinasan",
          children: [],
          route: "/duty/adm-sc/duty-code",
          translationKey: "Kode Dinasan",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_KODE_DINAS_SO,
          }),
        },
        {
          title: "Jadwal Dinasan",
          children: [],
          route: "/duty/sc/duty-schedule",
          translationKey: "Jadwal Dinasan",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_JADWAL_DINAS_SO,
          }),
        },
        {
          title: "Kepala Stasiun",
          children: [],
          route: "/duty/adm/station-assign",
          translationKey: "Kepala Stasiun",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_KEPALA_STASIUN,
          }),
        },
        {
          title: "Approval PTA",
          children: [],
          route: "/duty/occ/approval-permit-to-access",
          translationKey: "approvalPTA",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_APPROVAL_PTA_OCC,
          }),
        },
        {
          title: "Approval IOW",
          children: [],
          route: "/duty/occ/approval-implementation-of-work",
          translationKey: "Approval IOW",
          isHidden: !permissionFullExtractor({
            env: import.meta.env
              .VITE_ALLOWED_DUTY_APPROVAL_IMPLEMENTATION_OF_WORK_OCC,
          }),
        },
        {
          title: "Timetable",
          children: [],
          route: "/duty/occ/timetable",
          translationKey: "Timetable",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_TIMETABLE,
          }),
        },
        {
          title: "Permintaan Langsir",
          children: [],
          route: "/duty/occ/permintaan-langsir",
          translationKey: "Permintaan Langsir",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_QUESTION_SHUNTING_OCC,
          }),
        },
        {
          title: "Rute Kereta",
          children: [],
          route: "/duty/occ/rute-kereta",
          translationKey: "Rute Kereta",
          isHidden: true,
        },
        {
          title: "Operasi Trainset",
          children: [],
          route: "/duty/occ/laporan-siap-operasi",
          translationKey: "Operasi Trainset",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_OPERASI_TRAINSET,
          }),
        },
        {
          title: "Approval PTW",
          children: [],
          route: "/duty/vp/approval-permit-to-work",
          translationKey: "approvalPTW",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_APPROVAL_PERMIT_TO_WORK,
          }),
        },
        {
          title: "Approval PTW",
          children: [],
          route: "/duty/she/approval-permit-to-work",
          translationKey: "approvalPTW",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_APPROVAL_PERMIT_TO_WORK,
          }),
        },
        {
          title: "Permintaan Langsir",
          children: [],
          route: "/duty/penyelia/permintaan-langsir",
          translationKey: "Permintaan Langsir",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_PERMINTAAN_LANGSIR_PENYELIA,
          }),
        },
        {
          title: "Kode Dinasan TA",
          children: [],
          route: "/duty/penyelia/kode-kedinasan",
          translationKey: "Kode Dinasan TA",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_KODE_DINAS_TA,
          }),
        },
        // {
        //   title: "Kehadiran",
        //   children: [],
        //   route: "/duty/penyelia/kehadiran",
        //   translationKey: "Kehadiran",
        //   isHidden: !permissionFullExtractor({
        //     env: import.meta.env.VITE_ALLOWED_DUTY_KEHADIRAN_TA,
        //   }),
        // },
        {
          title: "Jadwal Dinasan TA",
          children: [],
          route: "/duty/penyelia/jadwal-dinas/jadwal-ta",
          translationKey: "Jadwal Dinasan TA",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_JADWAL_DINAS_TA,
          }),
        },
        {
          title: "Kehadiran",
          children: [],
          route: "/duty/penyelia/kehadiran",
          translationKey: "Kehadiran",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_KEHADIRAN_TA,
          }),
        },
        // {
        //   title: "Kehadiran",
        //   children: [],
        //   route: "/duty/penyelia/kehadiran",
        //   translationKey: "Kehadiran",
        //   isHidden: !permissionFullExtractor({
        //     env: import.meta.env.VITE_ALLOWED_DUTY_KEHADIRAN_TA,
        //   }),
        // },
        {
          title: "Trainset",
          children: [],
          route: "/duty/rs/trainset",
          translationKey: "Trainset",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_TRAINSET,
          }),
        },
        {
          title: "Langsir",
          children: [],
          route: "/duty/rs/langsir",
          translationKey: "Langsir",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_LANGSIR,
          }),
        },
        {
          title: "Station Management",
          children: [],
          route: "/duty/adm/station-management",
          translationKey: "Station Management",
          isHidden: true,
        },
        {
          title: "Kode Dinasan",
          children: [],
          route: "/duty/adm/duty-code",
          translationKey: "Kode Dinasan",
          isHidden: true,
        },
        {
          title: "Cek Kesehatan",
          children: [],
          route: "/duty/kes/cek-kesehatan",
          translationKey: "Cek Kesehatan",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_CEK_KESEHATAN,
          }),
        },
        // {
        //   title: "Edit Pertanyaan",
        //   children: [],
        //   route: "/duty/kes/edit-pertanyaan",
        //   translationKey: "Edit Pertanyaan",
        //   isHidden: !permissionFullExtractor({
        //     env: import.meta.env.VITE_ALLOWED_DUTY_EDIT_PERTANYAAN_KESEHATAN,
        //   }),
        // },
        // {
        //   title: "WAD",
        //   children: [
        //     {
        //       title: "Create WAD",
        //       children: [],
        //       route: "/duty/occ/wad/setup",
        //       translationKey: "createWAD",
        //       isHidden: !permissionFullExtractor({
        //         env: import.meta.env.VITE_ALLOWED_DUTY_WAD,
        //       }),
        //     },
        //   ],
        //   route: "/duty/occ/wad",
        //   translationKey: "wad",
        //   isHidden: !permissionFullExtractor({
        //     env: import.meta.env.VITE_ALLOWED_DUTY_WAD,
        //   }),
        // },
      ],
      translationKey: "duty",
      isHidden: false,
    },
    {
      id: 4,
      title: "Post Duty",
      icon: <PiClockAfternoonFill />,
      children: [],
      expanded: false,
      translationKey: "postDuty",
      route: "/post-duty/mt/post-duty-list",
      isHidden: !permissionFullExtractor({
        env: import.meta.env.VITE_ALLOWED_POST_DUTY_PERMIT_TO_WORK,
      }),
    },
    {
      id: 5,
      title: "Report",
      icon: <BiSolidReport />,
      controls: "report",
      expanded: false,
      route: "/report",
      children: [
        {
          title: "Analisa Waktu Kereta Delay",
          children: [],
          route: "/report/occ/analisa-waktu-kereta-delay",
          translationKey: "Analisa Waktu Kereta Delay",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_REPORT_ANALISA_WAKTU_KERETA_DELAY,
          }),
        },
        {
          title: "Laporan Kejadian",
          children: [],
          route: "/report/occ/laporan-kejadian",
          translationKey: "Laporan Kejadian",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_LIST_LAPORAN_KEJADIAN,
          }),
        },
        {
          title: "Emolumen SO",
          children: [],
          route: "/duty/sc/emolumen",
          translationKey: "Emolumen SO",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_EMOLUMEN_SO,
          }),
        },
        {
          title: "Premi",
          children: [],
          route: "/duty/penyelia/premi",
          translationKey: "Premi TA",
          isHidden: !permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_DUTY_PREMI_TA,
          }),
        },
      ],
      translationKey: "report",
      isHidden: false,
    },
  ],
};
