// import BackgroundCheckIcon from '../asset/icon/BackgroundCheckIcon';
// import CrimeReportIcon from '../asset/icon/CrimeReportIcon';
// import ForumIcon from '../asset/icon/ForumIcon';
// import HomeIcon from '../asset/icon/HomeIcon';
// import HotIssuesIcon from '../asset/icon/HotIssuesIcon';
// import MarketIcon from '../asset/icon/MarketIcon';
// import OverallStatsIcon from '../asset/icon/OverallStatsIcon';
// import RankingIcon from '../asset/icon/Ranking';
// import RecentsIcon from '../asset/icon/RecentsIcon';
// import StakingIcon from '../asset/icon/StakingIcon';
// import Voting from '../asset/icon/Voting';
// import { Menu } from '../type/menu';
// import VerificationTasksIcon from '../asset/icon/VerificationTasksIcon.tsx';
// import FaucetIcon from '../asset/icon/FaucetIcon.tsx';
// import LuckyDrawIcon from '../asset/icon/LuckyDrawIcon.tsx';
// import AirdropIcon from '../asset/icon/AirdropIcon.tsx';
// import { mainTokenSymbol } from './unit.ts';
// import VerificationReportIcon from '../asset/icon/VerificationReportIcon.tsx';

// const mode = import.meta.env.MODE;

// const otherChildren: Menu[] = [
//   {
//     id: 'luck-draw',
//     label: 'Lucky Draw',
//     icon: LuckyDrawIcon,
//     link: '/lucky-draw',
//     role: ['GUEST', 'USER', 'ADMIN'],
//   },
//   {
//     id: 'airdrop',
//     label: 'Airdrop',
//     icon: AirdropIcon,
//     link: '/airdrop',
//     role: ['GUEST', 'USER', 'ADMIN'],
//   },
//   {
//     id: 'ranking',
//     label: 'Ranking',
//     icon: RankingIcon,
//     link: '/ranking',
//     role: ['GUEST', 'USER', 'ADMIN'],
//   },
//   {
//     id: 'overall-stats',
//     label: 'Overall Stats',
//     icon: OverallStatsIcon,
//     link: '/overall-stats',
//     role: ['GUEST', 'USER', 'ADMIN'],
//   },
// ];

// if (mode == 'development') {
//   otherChildren.push({
//     id: 'faucet',
//     label: `${mainTokenSymbol} Faucet`,
//     icon: FaucetIcon,
//     link: '/faucet',
//     role: ['GUEST', 'USER', 'ADMIN'],
//   });
// }

// export const sidebarMenu: Menu[] = [
//   {
//     id: 'general',
//     label: 'GENERAL',
//     children: [
//       {
//         id: 'home',
//         label: 'Home',
//         icon: HomeIcon,
//         link: '/',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'recents',
//         label: 'Recents',
//         icon: RecentsIcon,
//         link: '/recents',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'hot-issues',
//         icon: HotIssuesIcon,
//         label: 'Hot Issues',
//         link: '/hot-issues',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'forum',
//         icon: ForumIcon,
//         label: 'CrimeWatch Community',
//         link: '/forum',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//     ],
//   },
//   {
//     id: 'crime',
//     label: 'CRIME',
//     children: [
//       {
//         id: 'crime-report',
//         label: 'Crime Report',
//         icon: CrimeReportIcon,
//         link: '/crime-report',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'background-check',
//         label: 'Background Checks',
//         icon: BackgroundCheckIcon,
//         link: '/background-check',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'market',
//         icon: MarketIcon,
//         label: 'Crime Data Market',
//         link: '/market',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//     ],
//   },
//   {
//     id: 'operations',
//     label: 'OPERATIONS',
//     children: [
//       {
//         id: 'verification-report',
//         label: 'Verify Reports',
//         icon: VerificationReportIcon,
//         link: '/verification-report',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'verification-tasks',
//         label: 'Verification Tasks',
//         icon: VerificationTasksIcon,
//         link: '/verification-tasks',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'voting',
//         label: 'Voting',
//         icon: Voting,
//         link: '/voting',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       {
//         id: 'staking',
//         label: 'Staking',
//         icon: StakingIcon,
//         link: '/staking',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },
//       /*
//       {
//         id: 'inspectation',
//         label: 'Inspectation',
//         icon: InspecIcon,
//         link: '/inspectation',
//         role: ['GUEST', 'USER', 'ADMIN'],
//       },*/
//     ],
//   },
//   {
//     id: 'other',
//     label: 'OTHER',
//     children: otherChildren,
//   },
// ];
