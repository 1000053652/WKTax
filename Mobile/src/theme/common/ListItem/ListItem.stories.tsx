import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import {
  Icon,
  IconName,
  Text,
  ListItem,
  constants,
  Divider,
} from '../../../designSystem'

const { Color, TextAlignment, Orientation, IconSize, Thickness, Dimension } =
  constants

const longText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, atque? Libero quae alias voluptatum quam nulla at voluptate sunt, nisi obcaecati cumque perspiciatis ipsum ea culpa recusandae placeat illum fugit.'
const rightText = 'This is the right test text'
const description = 'This is a test description'
const iconNode = <Icon name={IconName.heart} size={IconSize.xxxLarge1} />
const smallIcon = <Icon name={IconName.envelope} size={IconSize.large3} />
const iconFunc = () => iconNode
const textFunc = () => (
  <>
    <Text textAlign={TextAlignment.right}>Here is a test </Text>
    <Text color={Color.adcDarkGreen}>green color</Text>
  </>
)
const longTitle = 'This is a long, long, long, long title'
const multiRowFunc = () => <View>{textFunc()}</View>
const rightTexts = ['Right content1', 'Right line2', textFunc]
const vspacer = (
  <Divider
    transparent
    orientation={Orientation.vertical}
    thickness={Thickness.medium1}
    length={Dimension.xxxxSmall2}
  />
)

storiesOf('Design System / ListItem', module)
  .add('Title', () => <ListItem title="Title" />)
  .add('Title with Description', () => (
    <ListItem title="Title" description={description} />
  ))
  .add('Title with Right Text', () => (
    <ListItem title="Title" rightSlot={description} />
  ))
  .add('Title with Long Right Text', () => (
    <ListItem title="Title" rightSlot={longText} stretch={false} />
  ))
  .add('Title with Long Right Text, relative width', () => (
    <ListItem
      title="Title"
      rightSlot={longText}
      stretch={false}
      titleWidth="40%"
      rightSlotWidth="60%"
    />
  ))
  .add('Default mode', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[smallIcon]}
      rightSlot={[iconNode, vspacer, iconFunc]}
    />
  ))
  .add('Default mode, null input', () => (
    <ListItem
      title="Title"
      description={['haha', null, longText]}
      leftSlot={[smallIcon, undefined, smallIcon]}
      rightSlot={[iconNode, vspacer, iconFunc]}
    />
  ))
  .add('Default mode, Valign center', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[smallIcon]}
      rightSlot={[iconNode, vspacer, iconFunc]}
      verticalAlign="center"
    />
  ))
  .add('Default mode, Valign center, relative width', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[smallIcon]}
      rightSlot={[iconNode, vspacer, iconFunc]}
      verticalAlign="center"
      stretch={false}
      titleWidth="50%"
      descriptionWidth="65%"
      leftSlotWidth="10%"
      rightSlotWidth="25%"
    />
  ))
  .add('Default mode, fixed width', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[smallIcon]}
      rightSlot={[iconNode, vspacer, iconFunc]}
      stretch={false}
      titleWidth={200}
      descriptionWidth={200}
      leftSlotWidth={30}
      rightSlotWidth={100}
    />
  ))
  .add('descriptionBelow mode', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[iconNode, iconFunc]}
      layout="descriptionBelow"
    />
  ))
  .add('descriptionBelow mode, long left', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[iconNode, iconFunc]}
      layout="descriptionBelow"
      leftSlotWidth={150}
    />
  ))
  .add('descriptionBelow mode, vAlign center ', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[iconNode, iconFunc]}
      layout="descriptionBelow"
      verticalAlign="center"
    />
  ))
  .add('twoColumn mode', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[smallIcon, smallIcon]}
      layout="twoColumn"
    />
  ))
  .add('twoColumn mode, fixed width', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[smallIcon, smallIcon]}
      layout="twoColumn"
      stretch={false}
      leftSlotWidth={100}
      titleWidth={50}
      rightSlotWidth={100}
      descriptionWidth={150}
    />
  ))
  .add('twoColumn mode, relative width', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconNode, iconFunc]}
      rightSlot={[smallIcon, smallIcon]}
      layout="twoColumn"
      leftSlotWidth="30%"
      titleWidth="45%"
      rightSlotWidth="25%"
      descriptionWidth="50%"
    />
  ))
  .add('twoColumn model with Vertical left', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[smallIcon, smallIcon]}
      rightSlot={[smallIcon, vspacer, smallIcon]}
      layout="twoColumn"
      leftSlotDirection="column"
    />
  ))
  .add('titleAbove mode', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconFunc]}
      rightSlot={[smallIcon, smallIcon]}
      layout="titleAbove"
      rightSlotDirection="column"
    />
  ))
  .add('titleAbove mode, vAlign Center', () => (
    <ListItem
      title="Title"
      description={longText}
      leftSlot={[iconFunc]}
      rightSlot={[smallIcon, smallIcon]}
      layout="titleAbove"
      rightSlotDirection="column"
      verticalAlign="center"
    />
  ))
  .add('titleAbove mode, Title with icon', () => (
    <ListItem
      title={[smallIcon, vspacer, 'Title']}
      description={longText}
      layout="titleAbove"
      rightSlotDirection="column"
      verticalAlign="center"
    />
  ))
  .add('Multiple right lines', () => (
    <ListItem
      title="Title"
      rightSlot={rightTexts}
      rightSlotDirection="column"
    />
  ))
  .add('Multiple right lines, valign center', () => (
    <ListItem
      title="Title"
      rightSlot={rightTexts}
      rightSlotDirection="column"
      verticalAlign="center"
    />
  ))
  .add('Wrapped Title', () => (
    <ListItem title={longTitle} rightSlot={rightText} />
  ))
  .add('Wrapped Title, long right', () => (
    <ListItem
      title="This is a long, long title"
      rightSlot={longText}
      titleWidth="40%"
      rightSlotWidth="60%"
    />
  ))
  .add('Left icon', () => (
    <ListItem
      title="Title"
      description="This is a test list item"
      leftSlot={iconFunc}
    />
  ))
  .add('Left icon with colored text', () => (
    <ListItem title="Title" description={multiRowFunc} leftSlot={iconFunc} />
  ))
  .add('Left icon with multi description lines', () => (
    <ListItem
      title="Stores"
      description={['Costco: 10 Miles', 'Market: 2 Miles', 'Shopping: 2 Miles']}
      leftSlot={smallIcon}
      leftSlotWidth="10%"
      descriptionWidth="60%"
    />
  ))
  .add('Right icon', () => (
    <ListItem
      title="Title"
      description="This is a test list item"
      rightSlot={iconFunc}
    />
  ))
  .add('Right icon, stretch false', () => (
    <ListItem
      title="Title"
      description="This is a test list item"
      rightSlot={iconFunc}
      stretch={false}
      rightSlotWidth={Dimension.xxLarge1}
    />
  ))
  .add('Right icons (Vertical)', () => (
    <ListItem
      title="Title"
      description={description}
      rightSlot={[iconNode, iconFunc]}
      rightSlotDirection="column"
    />
  ))
  .add('Right icons (Horizontal)', () => (
    <ListItem
      title="Title"
      description="This is a test list item"
      rightSlot={[iconNode, iconFunc]}
    />
  ))
  .add('Fixed length', () => (
    <ListItem
      title="Title"
      description="This is a test list item"
      rightSlot={[iconNode, iconFunc]}
      stretch={false}
      titleWidth={Dimension.medium1}
    />
  ))
