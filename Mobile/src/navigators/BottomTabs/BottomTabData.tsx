import styles from './styles'
import { BottomTabData } from './types'
import { imageConstant } from '../../../src/theme/Images'
import { HomeScreen, TasksScreen } from '../../../src/screens'


export const bottomTabData: [BottomTabData] = [
  {
    name: 'common:HOME',
    screen: HomeScreen,
    selectedIcon: imageConstant.HomeImageSelected,
    unSelectedIcon: imageConstant.HomeImageUnSelected,
    imageStyle: styles.bottomTabImageStyle,
    textSelectedStyle: styles.activeStylesContainerText,
    textUnSelectedStyle: {},
    selectedTestId: 'bottom_tab_home_active',
    unSelectedTestId: 'bottom_tab_home_inactive',
  },
  {
    name: 'common:TASKS',
    screen: TasksScreen,
    selectedIcon: imageConstant.TaskImageBlue,
    unSelectedIcon: imageConstant.TaskImage,
    imageStyle: styles.bottomTabImageStyle,
    textSelectedStyle: styles.activeStylesContainerText,
    textUnSelectedStyle: {},
    selectedTestId: 'bottom_tab_task_active',
    unSelectedTestId: 'bottom_tab_task_inactive',
  },
]

export const bottomTabDataWithoutTask: [BottomTabData] = [
  {
    name: 'common:HOME',
    screen: HomeScreen,
    selectedIcon: imageConstant.HomeImageSelected,
    unSelectedIcon: imageConstant.HomeImageUnSelected,
    imageStyle: styles.bottomTabImageStyle,
    textSelectedStyle: styles.activeStylesContainerText,
    textUnSelectedStyle: {},
    selectedTestId: 'bottom_tab_home_active',
    unSelectedTestId: 'bottom_tab_home_inactive',
  },
]
