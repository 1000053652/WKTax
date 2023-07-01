import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { constants } from '../../../designSystem'
import Text from './index'

const { TextRole } = constants

storiesOf('Text', module)
  .add('caption1', () => <Text role={TextRole.caption1}>Caption1 Text</Text>)
  .add('caption2', () => <Text role={TextRole.caption2}>Caption2 Text</Text>)
  .add('footnote', () => <Text role={TextRole.footnote}>Footnote Text</Text>)
  .add('subhead', () => <Text role={TextRole.subhead}>Subhead Text</Text>)
  .add('callout', () => <Text role={TextRole.callout}>Callout Text</Text>)
  .add('body', () => <Text role={TextRole.body}>Body Text</Text>)
  .add('headline', () => <Text role={TextRole.headline}>Headline Text</Text>)
  .add('headline1', () => <Text role={TextRole.headline1}>Headline1 Text</Text>)
  .add('title3', () => <Text role={TextRole.title3}>Title3 Text</Text>)
  .add('title2', () => <Text role={TextRole.title2}>Title2 Text</Text>)
  .add('title1', () => <Text role={TextRole.title1}>Title1 Text</Text>)
