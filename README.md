
# React native floating action circle button

Simple floating action button component with circle button for react native.




## Demo

![demoFloating](https://user-images.githubusercontent.com/80142234/187081864-8d45206c-68bb-458d-9043-e71a65bc6f7c.gif)



## Installation

```bash
  npm install react-native-floating-action-circle-button
```

## Usage/Examples

**First step:** import Component
```javascript
import FloatingActionButton from 'react-native-floating-action-circle-button';
```

**Second step:** add actions list
```javascript
const actions = [
  {
    icon: Assets.Icons.activeBin,
    label: 'Delete',
    disable: false,
    onPress: null,
  },
  {
    icon: Assets.Icons.inactiveCancelInvoice,
    label: 'Cancel',
    disable: true,
    onPress: null,
  },
  {
    icon: Assets.Icons.activeReport,
    label: 'Report',
    disable: false,
    onPress: null,
  },
];
```

**Third step:** place it in the screen
```javascript
<FloatingActionButton 
  actions={actions}
  backgroundStyle={{
    marginRight: 17,
  }}
  actionButtonStyle={{
    marginRight: 17,
  }}
  anchorButtonStyle={{
    marginRight: 17,
  }}
/>
```

## Props

| Property  | Type            | Default | Description                |
| :-------- | :-------        |:---  | :------------------------- |
| `actions` | `Array<Object>` |`[]`  | Actions to be shown when user press the anchor Floating Button. **Must pass at less one action** |
| `containerStyle` | `style`  |`null`| The custom style for wrapper container |
| `actionButtonStyle` | `style` | `null` | The custom style for actions button |
| `backgroundStyle` | `style` | `null` | The custom style for background and disable |
| `anchorInactiveIcon` | `ImageSourcePropType` | `...` | Icon to be rendered for anchor button when it's not pressed |
| `anchorActiveIcon` | `ImageSourcePropType` | `X` | Icon to be rendered for anchor button when it is pressed |
| `anchorButtonStyle` | `style` | `null` | The custom style for anchor button |

#### `actions` props

| Property  | Type            | Default | Description                |
| :-------- | :-------        |:---  | :------------------------- |
| `disable` | `Boolean` |`false`| Actions status |
| `label` | `string`  |``| Label for action |
| `onPress` | `Function` | `null` | Function to be called when action button is pressed. **Can't press when disable is true** |
| `icon` | `ImageSourcePropType` | `null` | Icon to be rendered inside action button |
| `iconStyle` | `style` | `null` | The custom style for icon inside action button |
| `buttonStyle` | `style` | `null` | The custom style for action button |



## License

[MIT](https://choosealicense.com/licenses/mit/)

