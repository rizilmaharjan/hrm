import { ReactNode } from "react";
import {
  AllowanceIcon,
  ClockIcon,
  DollarSignIcon,
  EmployeeIcon,
  HierarchyIcon,
  HomeIcon,
  JobTypeIcon,
  ServiceEventIcon,
} from "../assets/svg";
import { TsidebarItems } from "../interfaces/types/sidebar.types";

type Province = {
  name: string;
  districts: District[];
};

type District = {
  name: string;
  municipalities: string[];
};

type SidebarItem = {
  id: number;
  title: string;
  icon?: () => ReactNode;
  path: string;
  children?: SidebarItem[];
};

export const sidebarItems: TsidebarItems[] = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    title: "Employee",
    icon: EmployeeIcon,
    path: "/employee",
  },
  {
    title: "Payroll",
    icon: DollarSignIcon,
    path: "/payroll",
  },
  {
    title: "Attendance",
    icon: ClockIcon,
    path: "/attendance",
  },
  {
    title: "Service Event",
    icon: ServiceEventIcon,
    path: "/service-event",
  },
  {
    title: "Allowance",
    icon: AllowanceIcon,
    path: "/allowance",
  },
  {
    title: "Position",
    icon: HierarchyIcon,
    path: "/position",
  },
  {
    title: "Job Type",
    icon: JobTypeIcon,
    path: "/job-type",
  },
];

export const accountList = [
  {
    acc_cd: "2.111",
    dsp_acc_desc: "Dashain Allowance",
  },
  {
    acc_cd: "2.112",
    dsp_acc_desc: "Salary",
  },
  {
    acc_cd: "2.113",
    dsp_acc_desc: "Stipend",
  },
  {
    acc_cd: "2.114",
    dsp_acc_desc: "Overtime",
  },
  {
    acc_cd: "2.115",
    dsp_acc_desc: "Medical Benefit",
  },
  {
    acc_cd: "2.116",
    dsp_acc_desc: "Gratuity",
  },
  {
    acc_cd: "2.117",
    dsp_acc_desc: "Staff Wellfare",
  },
  {
    acc_cd: "2.118",
    dsp_acc_desc: "Examination Expenses",
  },
  {
    acc_cd: "2.119",
    dsp_acc_desc: "Allowances & Facilities",
  },
  {
    acc_cd: "2.120",
    dsp_acc_desc: "Pensions",
  },
  {
    acc_cd: "2.121",
    dsp_acc_desc: "Appron Allowance",
  },
];

export const allowanceTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-[4%]",
  },
  {
    id: 2,
    title: "Description",
    width: "w-[15%]",
  },
  {
    id: 3,
    title: "Description (in Nepali)",
    width: "w-[10%]",
  },
  {
    id: 4,
    title: "Taxable",
    width: "w-[6%]",
  },
  {
    id: 5,
    title: "Facility(%)",
    width: "w-[8%]",
  },
  {
    id: 6,
    title: "Deduct CIT",
    width: "w-[10%]",
  },
  {
    id: 7,
    title: "Type",
    width: "w-[6%]",
  },
  {
    id: 8,
    title: "Sal + Allw Flag",
    width: "w-[10%]",
  },
  {
    id: 9,
    title: "A/C",
    width: "w-[14%]",
  },

  {
    id: 10,
    title: "Disabled",
    width: "w-[6%]",
  },
];

export const jobTypeTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-[4%]",
  },
  {
    id: 2,
    title: "Description",
    width: "w-[18%]",
  },
  {
    id: 3,
    title: "Taxable",
    width: "w-1/12",
  },
  {
    id: 4,
    title: "Flat %",
    width: "w-1/12",
  },
  {
    id: 5,
    title: "PF",
    width: "w-[6%]",
  },
  {
    id: 6,
    title: "CIT",
    width: "w-[6%]",
  },
  {
    id: 7,
    title: "Pay Gen.",
    width: "w-[6%]",
  },
  {
    id: 8,
    title: "Is Grade",
    width: "w-[6%]",
  },
  {
    id: 9,
    title: "Single Rebate",
    width: "w-1/12",
  },
  {
    id: 10,
    title: "Married Rebate",
    width: "w-1/12",
  },
  {
    id: 11,
    title: "Disabled",
    width: "w-1/12",
  },
];

export const serviceEventTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Description",
    width: "w-3/12",
  },
  {
    id: 3,
    title: "Description (in Nepali)",
    width: "w-3/12",
  },
  {
    id: 4,
    title: "Type",
    width: "w-2/12",
  },
  {
    id: 5,
    title: "Salary Adjust",
    width: "w-2/12",
  },
  {
    id: 6,
    title: "Disabled",
    width: "w-1/12",
  },
];

export const LeaveRequestTitle = [
  {
    id: 1,
    title: "Code",
  },
  {
    id: 2,
    title: "Name",
  },
  {
    id: 3,
    title: "Leave Type",
  },
  {
    id: 4,
    title: "Applied Date",
  },
  {
    id: 5,
    title: "From",
  },
  {
    id: 6,
    title: "To",
  },
  {
    id: 7,
    title: "No of Days",
  },
  {
    id: 8,
    title: "Status",
  },
  // {
  //   id: 9,
  //   title: "Action",
  // },
];

export const provincesData: Province[] = [
  {
    name: "Bagmati Province",
    districts: [
      {
        name: "Kathmandu",
        municipalities: [
          "Budhanilakantha",
          "Chandragiri",
          "Dakshinkali",
          "Gokarneshowr",
          "Kageshwori Monahara",
          "Kathmandu",
          "Kirtipur",
          "Nagarjun",
          "Sankharapur",
          "Tarakeshwor",
          "Tokha",
        ],
      },
      {
        name: "Lalitpur",
        municipalities: [
          "Bagmati",
          "Godawari",
          "Konjyosom",
          "Lalitpur",
          "Mahalaxmi",
          "Mahankal",
        ],
      },
      {
        name: "Bhaktapur",
        municipalities: [
          "Bhaktapur",
          "Changunarayan",
          "Madhyapur Thimi",
          "Suryabinayak",
        ],
      },
      {
        name: "Chitwan",
        municipalities: [
          "Bharatpur",
          "Ichchhyakamana",
          "Kalika",
          "Khairahani",
          "Madi",
          "Rapti",
          "Ratnanagar",
        ],
      },
      {
        name: "Rasuwa",
        municipalities: [
          "Amachodingmo",
          "Gosaikunda",
          "Kalika",
          "Naukunda",
          "Uttargaya",
        ],
      },
      {
        name: "Ramechhap",
        municipalities: [
          "Doramba Shailung",
          "Gokulganga",
          "Khadadevi",
          "Likhu Tamakoshi",
          "Manthali",
          "Ramechhap",
          "Sunapati",
          "Umakunda",
        ],
      },
      {
        name: "Kavrepalanchok",
        municipalities: [
          "Banepa",
          "Bethanchowk",
          "Bhumlu",
          "Chaurideurali",
          "Dhulikhel",
          "Khanikhola",
          "Mahabharat",
          "Mandandeupur",
          "Namobouddha",
          "Panauti",
          "Panchkhal",
          "Roshi",
          "Temal",
        ],
      },
      {
        name: "Makwanpur",
        municipalities: [
          "Bagmati",
          "Bakaiya",
          "Bhimphedi",
          "Hetauda",
          "Indrasarowar",
          "Kailash",
          "Makawanpurgadhi",
          "Manahari",
          "Raksirang",
          "Thaha",
        ],
      },
      {
        name: "Dhading",
        municipalities: [
          "Benighat Rorang",
          "Dhunibesi",
          "Gajuri",
          "Galchi",
          "Gangajamuna",
          "Jwalamukhi",
          "Khaniyabash",
          "Netrawati Dabjong",
          "Nilakantha",
          "Rubi Vally",
          "Siddhalek",
          "Thakre",
          "Tripura Sundari",
        ],
      },
      {
        name: "Nuwakot",
        municipalities: [
          "Belkotgadhi",
          "Bidur",
          "Dupcheshwar",
          "Kakani",
          "Kispand",
          "Likhu",
          "Myagang",
          "Panchakanya",
          "Shivapuri",
          "Suryagadhi",
          "Tadi",
          "Tarkeshwar",
        ],
      },
      {
        name: "Sindupalchok",
        municipalities: [
          "Balefi",
          "Barhabise",
          "Bhotekoshi",
          "Chautara SangachokGadhi",
          "Helambu",
          "Indrawati",
          "Jugal",
          "Lisangkhu Pakhar",
          "Melamchi",
          "Panchpokhari Thangpal",
          "Sunkoshi",
          "Tripurasundari",
        ],
      },
      {
        name: "Dolakha",
        municipalities: [
          "Baiteshwor",
          "Bhimeshowr",
          "Bigu",
          "Doramba",
          "Gaurishankar",
          "Jiri",
          "Kalinchok",
          "Melung",
          "Tamakoshi",
          "Shailung",
        ],
      },
      {
        name: "Sindhuli",
        municipalities: [
          "Dudhouli",
          "Ghanglekh",
          "Golanjor",
          "Hariharpurgadhi",
          "Kamalamai",
          "Marin",
          "Phikkal",
          "Sunkoshi",
          "Tinpatan",
        ],
      },
    ],
  },
  {
    name: "Gandaki Province",
    districts: [
      {
        name: "Baglung",
        municipalities: [
          "Badigad",
          "Baglung",
          "Bareng",
          "Dhorpatan",
          "Galkot",
          "Jaimuni",
          "Kanthekhola",
          "Nisikhola",
          "Taman Khola",
          "Tara Khola",
        ],
      },
      {
        name: "Gorkha",
        municipalities: [
          "Aarughat",
          "Ajirkot",
          "Barpak Sulikot",
          "Bhimsen Thapa",
          "Chum Nubri",
          "Dharche",
          "Gandaki",
          "Gorkha",
          "Palungtar",
          "Sahid Lakhan",
          "Siranchowk",
        ],
      },
      {
        name: "Kaski",
        municipalities: [
          "Annapurna",
          "Machhapuchchhre",
          "Madi",
          "Pokhara",
          "Rupa",
        ],
      },
      {
        name: "Lamjung",
        municipalities: [
          "Besisahar",
          "Dordi",
          "Dudhpokhari",
          "Kwholasothar",
          "MadhyaNepal",
          "Marsyangdi",
          "Rainas",
          "Sundarbazar",
        ],
      },
      {
        name: "Manang",
        municipalities: ["Chame", "Manang Ingshyang", "Narpa Bhumi", "Narshon"],
      },
      {
        name: "Mustang",
        municipalities: [
          "Gharapjhong",
          "Lo-Ghekar Damodarkunda",
          "Lomanthang",
          "Thasang",
          "Waragung Muktikhsetra",
        ],
      },
      {
        name: "Myagdi",
        municipalities: [
          "Annapurna",
          "Beni",
          "Dhaulagiri",
          "Malika",
          "Mangala",
          "raghuganga",
        ],
      },
      {
        name: "Nawalparasi(Bardaghat Susta East)",
        municipalities: [
          "Baudeekali",
          "Binayee Tribeni",
          "Bulingtar",
          "Devchuli",
          "Gaidakot",
          "Hupsekot",
          "Kawasoti",
          "Madhyabindu",
        ],
      },
      {
        name: "Parbat",
        municipalities: [
          "Bihadi",
          "Jaljala",
          "Kushma",
          "Mahashila",
          "Modi",
          "Paniyu",
          "Phalebas",
        ],
      },
      {
        name: "Syangja",
        municipalities: [
          "Aandhikhola",
          "Arjunchaupari",
          "Bhirkot",
          "Biruwa",
          "Chapakot",
          "Galyang",
          "Harinas",
          "Kaligandaki",
          "Phedikhola",
          "Putalibazar",
          "Waling",
        ],
      },
      {
        name: "Tanahun",
        municipalities: [
          "Anbukhaireni",
          "Bandipur",
          "Bhanu",
          "Bhimad",
          "Byas",
          "Devghat",
          "Ghiring",
          "Myagde",
          "Rhishing",
          "Shuklagandaki",
        ],
      },
    ],
  },
  {
    name: "Karnali Province",
    districts: [
      {
        name: "Dailekh",
        municipalities: [
          "Aathbis",
          "Bhagawatimai",
          "Bhairabi",
          "Chamunda Bindrasaini",
          "Dullu",
          "Dungeshwar",
          "Gurans",
          "Manabu",
          "Narayan",
          "Naumule",
          "Thantikandh",
        ],
      },
      {
        name: "Dolpa",
        municipalities: [
          "Chharka Tangsong",
          "Dolpa Buddha",
          "Jagdulla",
          "Kaike",
          "Mudkechula",
          "Shey Phoksundo",
          "Thuli Bheri",
          "Tripurasundari",
        ],
      },
      {
        name: "Humla",
        municipalities: [
          "Adanchuli",
          "Chhipka",
          "Kharpunath",
          "Namkha",
          "Sarkegad",
          "Simkot",
          "Tanjakot",
        ],
      },
      {
        name: "Jajarkot",
        municipalities: [
          "Barekot",
          "Bheri",
          "Chhedagad",
          "Junichande",
          "Kuse",
          "Nalagad",
          "Shiwalaya",
        ],
      },
      {
        name: "Jumla",
        municipalities: [
          "Chandannath",
          "Guthichaur",
          "Hima",
          "Kanaskasundari",
          "Patrasi",
          "Sinja",
          "Tatopani",
          "Tila",
        ],
      },
      {
        name: "Kalikot",
        municipalities: [],
      },
      {
        name: "Mugu",
        municipalities: [],
      },
      {
        name: "Rukum West",
        municipalities: [],
      },
      {
        name: "Salyan",
        municipalities: [],
      },
      {
        name: "Surkhet",
        municipalities: [],
      },
    ],
  },
  {
    name: "Koshi Province",
    districts: [
      {
        name: "Bhojpur",
        municipalities: [
          "Bhojpur Municipality",
          "Amchok",
          "Arun",
          "Hatuwagadhi",
          "Pauwadungma",
          "Ramprasad Rai",
          "Salpasilichho",
          "Shadanand Municipality",
          "Tyamke Maiyunm",
        ],
      },
      {
        name: "Dhankuta",
        municipalities: [
          "Dhankuta Municipality",
          "Pakhribas Municipality",
          "Mahalaxmi Municipality",
          "Sangurigadhi Gaunpalika",
          "Chaubise Gaunpalika",
          "Shahidbhumi Gaunpalika",
          "Chhathar Jorpati Gaunpalika",
        ],
      },
      {
        name: "Ilam",
        municipalities: [
          "Ilam Municipality",
          "Deumai Municipality",
          "Mai Municipality",
          "Suryodaya Municipality",
          "Phakphokthum Gaunpalika",
          "Mai Jogmai Municipality",
          "Chulachuli Gaunpalika",
          "Rong Gaunpalika",
          "Mangsebung Gaunpalika",
          "Sandakpur Gaupalika",
        ],
      },
      {
        name: "Jhapa",
        municipalities: [
          "Mechinagar Municipality",
          "Bhadrapur Municipality",
          "Birtamod Municipality",
          "Arjundhara Municipality",
          "Kankai Municipality",
          "Shivasatakshi Municipality",
          "Gauradaha Municipality",
          "Damak Municipality",
        ],
      },
    ],
  },
  {
    name: "Madhesh Province",
    districts: [
      {
        name: "Saptari",
        municipalities: [
          "Rajbiraj Municipality",
          "Bodebarsain Municipality",
          "Dakneshwori Municipality",
          "Kanchanrup Municipality",
          "Bishnupur",
          "Tilathi Koiladi",
          "Hanumannagar Kankalini Municipality",
          "Surunga Municipality",
        ],
      },
    ],
  },
];

export const employeeTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Name",
    width: "w-3/12",
  },
  {
    id: 3,
    title: "email",
    width: "w-2/12",
  },
  {
    id: 4,
    title: "Date of Birth",
    width: "w-2/12",
  },
  {
    id: 5,
    title: "Gender",
    width: "w-1/12",
  },
  {
    id: 6,
    title: "Marital Status",
    width: "w-1/12",
  },
  {
    id: 7,
    title: "Religion",
    width: "w-1/12",
  },
];

export const departmentData = [
  {
    department_cd: "0",
    department_desc: "DEPARTMENT",
  },
  {
    department_cd: "ACA",
    department_desc: "ACADEMIC",
  },
  {
    department_cd: "ANA",
    department_desc: "Anaesthesiology & Critical Care",
  },
  {
    department_cd: "ATM",
    department_desc: "Anatomy",
  },
];

export const employeeSidebar: SidebarItem[] = [
  {
    id: 0,
    title: "Dashboard",
    icon: HomeIcon,
    path: "/",
  },
  {
    id: 1,
    title: "Attendance",
    path: "/attendance",
    icon: ClockIcon,
    children: [
      {
        id: 11,
        title: "Apply Leave",
        path: "/attendance/apply-leave",
      },
      {
        id: 12,
        title: "Leave Request",
        path: "/attendance/leave-request",
      },
    ],
  },
  {
    id: 2,
    title: "Paysheet",
    path: "/paysheet",
    icon: DollarSignIcon,
    children: [
      {
        id: 21,
        title: "Payment Sheet",
        path: "/paysheet/payment-sheet",
      },
      {
        id: 22,
        title: "Tax Sheet",
        path: "/paysheet/tax-sheet",
      },
    ],
  },
];

export const noticeData = [
  {
    id: 1,
    title: "New Collaboration Tool",
    description:
      "We've just launched a new collaboration tool to help teams work more efficiently.",
    date: "May 20, 2024",
  },
  {
    id: 2,
    title: "Upcoming Company Retreat",
    description:
      "Join us for our annual company retreat in the mountains next month.",
    date: "May 18, 2024",
  },
  {
    id: 3,
    title: "New HR Policy Update",
    description:
      "Please review the updated HR policy regarding time off and benefits.",
    date: "May 15, 2024",
  },
];
