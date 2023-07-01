import { useCallback, useState } from 'react'
import { useLazyAboutYouBusinessDataApiQuery } from '../../../../../src/services/modules/aboutYou'
import { useDispatch, useSelector } from 'react-redux'
import { aboutYouDataBusiness } from '../../../../../src/store/aboutyou'
import { BusinessTiles } from '../../../../../src/services/constants/BusinessTiles'
import { useLazyUpdaetFinishandDoneQuery } from '../../../../services/modules/questionnaireBusiness'
import { useLazyGetQuestionnaireBusinessTileStatusQuery } from '../../../../services/modules/questionnaire'
import { useFocusEffect } from '@react-navigation/native'

export default function ({ navigation }) {
  const [aboutYouBusinessDataApi] = useLazyAboutYouBusinessDataApiQuery()
  const [updaetFinishandDone] = useLazyUpdaetFinishandDoneQuery()
  const [getQuestionnaireBusinessTileStatus] =
    useLazyGetQuestionnaireBusinessTileStatusQuery()
  const [isFetching, setIsFetching] = useState(true)
  const aboutYouBusinessEntity = useSelector(
    state => state?.aboutyou?.aboutYouBusinessEntity
  )
  const aboutYouAddressEntity = useSelector(
    state => state?.aboutyou?.aboutYouAddressEntity
  )
  const aboutYouPrimaryContactEntity = useSelector(
    state => state?.aboutyou?.aboutYouPrimaryContactEntity
  )
  const aboutYouUpdateNodeEntity = useSelector(
    state => state?.aboutyou?.aboutYouUpdateNodeEntity
  )
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      getAboutYouBusinessDataApi()
    }, [])
  )

  const getAboutYouBusinessDataApi = () => {
    aboutYouBusinessDataApi('')
      .unwrap()
      .then(response => {
        setIsFetching(false)
        dispatch(aboutYouDataBusiness(response))
      })
      .catch(err => {
        setIsFetching(false)
      })
  }

  const submitFinishDoneAboutBusiness = (checkFinishDoneClick: boolean) => {
    setIsFetching(true)

    const item1 = {
      tileId: BusinessTiles.BusinessInfoAbout,
      complete: 0,
    }
    const item2 = {
      tileId: BusinessTiles.BusinessInfoAbout,
      complete: 1,
    }
    const payloadData = checkFinishDoneClick ? item2 : item1

    updaetFinishandDone(payloadData)
      .unwrap()
      .then(() => {
        setIsFetching(false)
        getQuestionnaireBusinessTileStatus()
          .unwrap()
          .then(res => {
            setIsFetching(false)
          })
          .catch(err => {})

        navigation.goBack()
      })
      .catch(error => {
        setIsFetching(false)
      })
  }

  return {
    isFetching,
    aboutYouBusinessEntity,
    aboutYouAddressEntity,
    aboutYouPrimaryContactEntity,
    aboutYouUpdateNodeEntity,
    submitFinishDoneAboutBusiness,
  }
}
