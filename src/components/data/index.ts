import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  DocumentTextIcon,
  SparklesIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
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
      url: "#",
      icon: HomeIcon,
    },
    {
      title: "Productos",
      url: "#",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      title: "Unidades de Medida",
      url: "#",
      icon: ChartBarIcon,
    },
    {
      title: "Categorias",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
          icon: DocumentTextIcon,
        },
        {
          title: "Archived",
          url: "#",
          icon: ArchiveBoxIcon,
        },
      ],
    },
    {
      title: "Proposal",
      icon: DocumentTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
          icon: DocumentDuplicateIcon,
        },
        {
          title: "Archived",
          url: "#",
          icon: ArchiveBoxIcon,
        },
      ],
    },
    {
      title: "Prompts",
      icon: SparklesIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
          icon: DocumentTextIcon,
        },
        {
          title: "Archived",
          url: "#",
          icon: ArchiveBoxIcon,
        },
      ],
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
