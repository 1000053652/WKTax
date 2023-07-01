import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { bottomTabData, bottomTabDataWithoutTask } from './BottomTabData'
import { BottomTab } from './BottomTab'
import { useSelector } from 'react-redux'
import { RequestDetailsResponse } from '../../../src/services/modules/task/responseTypes'
const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const userRequestListData: RequestDetailsResponse[] = useSelector(
    state => state?.home?.clientUserRequestListData
  )
  const requestdetails: RequestDetailsResponse = useSelector(
    state => state.TaskScreen?.selectedRequestDetails
  )
  const withoutTask =
    userRequestListData?.length === 0 ||
    (requestdetails?.engagementModuleEnabled === false &&
      requestdetails?.organizerModuleEnabled === false &&
      requestdetails?.isReturnExist === false)
  return (
    <Tab.Navigator>
      {withoutTask
        ? bottomTabDataWithoutTask.map(item => BottomTab(item))
        : bottomTabData.map(item => BottomTab(item))}
    </Tab.Navigator>
  )
}

export default MainNavigator
