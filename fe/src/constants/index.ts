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
    title: "Attendence",
    icon: ClockIcon,
    path: "/attendence",
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
  },
  {
    id: 2,
    title: "Description",
  },
  {
    id: 3,
    title: "Description (in Nepali)",
  },
  {
    id: 4,
    title: "Taxable",
  },
  {
    id: 5,
    title: "Facility(%)",
  },
  {
    id: 6,
    title: "Deduct CIT",
  },
  {
    id: 7,
    title: "Type",
  },
  {
    id: 8,
    title: "Salary + Allowance Flag",
  },
  {
    id: 9,
    title: "A/C",
  },

  {
    id: 10,
    title: "Disabled",
    width: "w-1/12",
  },
];

export const jobTypeTitle = [
  {
    id: 1,
    title: "Code",
    width: "w-1/12",
  },
  {
    id: 2,
    title: "Description",
    width: "w-1/12",
  },
  {
    id: 3,
    title: "Tax Applicable?",
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
    width: "w-1/12",
  },
  {
    id: 6,
    title: "CIT",
    width: "w-1/12",
  },
  {
    id: 7,
    title: "Pay Gen.",
    width: "w-1/12",
  },
  {
    id: 8,
    title: "Is Grade",
    width: "w-1/12",
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
