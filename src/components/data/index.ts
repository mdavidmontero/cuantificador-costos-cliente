import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inicio",
      url: "dashboard",
      icon: HomeIcon,
    },
    {
      title: "Productos",
      url: "productos",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      title: "Materia Prima",
      url: "material",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      title: "Unidades de Medida",
      url: "units",
      icon: ChartBarIcon,
    },
    {
      title: "Costos",
      url: "costs",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Cog6ToothIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: QuestionMarkCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: MagnifyingGlassIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DocumentDuplicateIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ChartBarIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: DocumentIcon,
    },
  ],
};
