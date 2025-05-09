export interface Campaign {
  status: boolean;
  name: string;
  platform: string;
  startDate: string;
  endDate: string;
  budget: string;
  spent: string;
  impressions: string;
  cpm: string;
  clicksUrl: string;
  ctr: string;
  cpc: string;
}

export interface TableColumn {
  header: string;
  relation: keyof Campaign;
  isToggle?: boolean;
  toggleText?: {
    active: string;
    inactive: string;
  };
}

export const tableColumns: TableColumn[] = [
  {
    header: "ESTADO",
    relation: "status",
    isToggle: true,
    toggleText: {
      active: "ACTIVA",
      inactive: "PAUSA"
    }
  },
  {
    header: "NOMBRE CAMPAÑAS",
    relation: "name",
  },
  {
    header: "PLATAFORMA",
    relation: "platform",
  },
  {
    header: "FECHA INICIAL",
    relation: "startDate",
  },
  {
    header: "FECHA FINAL",
    relation: "endDate",
  },
  {
    header: "PRESUPUESTO",
    relation: "budget",
  },
  {
    header: "GASTO",
    relation: "spent",
  },
  {
    header: "IMPRESIONES",
    relation: "impressions",
  },
  {
    header: "CPM",
    relation: "cpm",
  },
  {
    header: "CLICS URL",
    relation: "clicksUrl",
  },
  {
    header: "CTR",
    relation: "ctr",
  },
  {
    header: "CPC",
    relation: "cpc",
  }
];

export const campaignData: Campaign[] = [
    {
        status: false,
        name: "CAMPAÑA_BDB_TC",
        platform: "META",
        startDate: "01/02/2025",
        endDate: "30/03/2025",
        budget: "$1.000.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      { 
        status: true,
        name: "CAMPAÑA_BDB_CLI",
        platform: "META",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$720.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      { 
        status: false,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "GOOGLE",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "GOOGLE",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "META",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "TIKTOK",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "META",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "TIKTOK",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
      {
        status: true,
        name: "CAMPAÑA_BDB_REFERIDOS",
        platform: "META",
        startDate: "10/02/2025",
        endDate: "15/02/2025",
        budget: "$480.000",
        spent: "$500.000",
        impressions: "100.000",
        cpm: "10",
        clicksUrl: "100",
        ctr: "10",
        cpc: "$10",
      },
];
