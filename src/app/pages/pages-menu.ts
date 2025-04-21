import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'CONSULTA',
    group: true,
  },
  {
    title: 'ACOD',
    icon: 'list-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Reestruturação',
    icon: 'globe-outline',
    link: '/pages/maps/bubble',
    home: true,
  },
  {
    title: 'BIs',
    icon: 'bar-chart-outline',
    children: [
      {
        title: 'DEC',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
        icon: 'trending-down-outline'
      },
      {
        title: 'NSRIs e RC08',
        link: '/pages/layout/list',
        icon: 'flash-off-outline'
      },
      {
        title: 'TRADs',
        link: '/pages/layout/stepper',
        icon: 'toggle-right-outline'
      },
      {
        title: 'Self Healing',
        link: '/pages/layout/infinite-list',
        icon: 'activity-outline'
      },
      {
        title: 'PCADEC',
        link: '/pages/layout/accordion',
        icon: 'trending-up-outline'
      },
      
    ],
  },
  


  {
    title: 'TOOLS',
    group: true,
  },
  {
    title: 'CODMessage',
    icon: 'message-circle-outline',
    link: '/pages/charts/chartjs',
  },
  {
    title: 'RAs Tool',
    icon: 'flash-outline',
    link: '/pages/iot-dashboard',
  },
 
]