import { action } from '@storybook/addon-actions'
import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import ExpandableList from './index'

const content = [
  {
    isExpanded: false,
    sectionTitle: 'Section 1',
    rows: [
      { title: 'title 1', subtitle: 'subtitle1' },
      { title: 'title 2', subtitle: 'subtitle 2' },
    ],
  },
  {
    isExpanded: false,
    sectionTitle: 'Section 2',
    rows: [
      { title: 'title 3', subtitle: 'subtitle3' },
      { title: 'title 4', subtitle: 'subtitle 4' },
    ],
  },
]

storiesOf('Design System / ExpandableList', module).add(
  'Two section list',
  () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <ExpandableList
        content={content}
        onSectionItemPress={action('tapped-item')}
        multiSelect={false}
      />
    </View>
  )
)
