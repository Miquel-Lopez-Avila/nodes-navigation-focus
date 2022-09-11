
# nodes-navigation-focus

[nodes-navigation-focus](https://github.com/Miquel-Lopez-Avila/nodes-navigation-focus) is a **JS library** which **automates** the **focus moviment** in the screen.

The library uses the **react-hooks** to manipulate the **DOM** and recieve and return infomation about the **state** of the element.


## Installation

Install nodes-navigation-focus with npm

```bash
  npm install nodes-navigation-focus
```

## Features

- Manage state of DOM elements
- Move focus state of a complex layout structure
- Allows you recive informartion about the elemenet that is currently focused


## API Reference

We have to understand that we will have 2 types of 'uneNavigation' instance.

One that it will be reference to a DOM element that contains an agrupation of elements that will recive the focus.

And another intance that will reference the specific DOM elements that will recive the focus.

#### Types

You can extract them from the library

```javascript
  import useNavigation, { types } from 'nodes-navigation-focus'
```

| Type | Description                |
| :-------- | :------------------------- |
| `single`  | Used to refere to a single DOM element without parent |
| `line`    | Used to refere to an array of elements |
| `matrix`  | Used to refere to an a array of elements that will be displayed like a matrix|
| `list`    | Used to refere to a list of items, |
| `object`  | Used to refere to an object |


#### Parameters


- Common params

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `focusKey`    | `string` | Element key |
| `extraProps`    | `object` | object that stores element information |

- Common params for **PARENT** reference

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. type of layout structure that |
| `rememberLastFocused`    | `boolean` | Add this option to remember the las element focused in the structure |
| `onFocusedChildNodeChanges`    | `func` | Triggers when the focus in the structure changes |
| `onOut`    | `object` | Triggers when the focus wants to go out of the element |
| `preferredChildFocusKey`  | `string` | Default son key that it will be focused if the references is not specified |

- Common params for **SON** reference

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `parent`    | `ref` | **Required**. the 'useNavigation' hook will recieve the reference of the parent generated with 'useNavigation' hook |
| `onMouseOver` | `func` | triggers when mouse over of the element |
| `onMouseOut` | `func` | triggers when mouse out of the element |
| `onClick` | `func` | triggers when element is clicked |
| `onFocusedNode` | `func` | It will triggers when the element is with focus |
| `onEnterPressedNode`    | `func` | Triggers when the element is pressed with enter |
| `onArrowPress`    | `func` | Trigger when element is pulses a key moviment |


- **Single** type

This type can't have son elements

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `onMove`    | `func` | Triggers when focus wants to go another element |

- **Line** type

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `position`    | `number` | position order |
| `flow`    | `string` | If the structure is gonna be in horizontal or in vertical |

- **List** type

For son:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `row`    | `number` | row order |
| `position`    | `number` | position order |

For parent:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `startPosition`    | `number` | start position of the lsit |
| `rememberLastFocused`    | `boolean` | remember last list focused |
| `rememberLastRowPosition`    | `boolean` | remember last son reference where focused when the focus is moving into the lists |

- **Matrix** type

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `row`    | `string` | row order |
| `column`    | `object` | column order |

#### Navigation utilities

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ref`    | `string` | **Required**. The use of this property returned by 'useNavigation' is required to set the reference with the DOM node |
| `focusSelf`    | `func` | a function to focus the current element |
| `focusSelf`    | `func` | a function to focus the current element |
| `setFocus`    | `func` | a function to change focus between structures |
| `focused`    | `boolean` | gives you information if node is currently focused or not |
| `hasFocusedChild`    | `boolean` | gives you information about if it has some son element node focused |
| `focusKey`    | `string` | return the key of the node |
| `getFocusedNode`    | `func` | return information about focused node |
| `getPressedNode`    | `func` | returns information about las pressed node |

#### useNavigation()

Recieves a ref of a DOM element with a specific configuration and returns a DOM element ref and the state of the element.

## Usage/Examples

```javascript
import useNavigation, { types } from 'nodes-navigation-focus';

const [matrixRef, { focused, setFocus, hasFocusedChild }] = useNavigation({
        type: types.MATRIX,
        focusKey: 'matrix',
        preferredChildFocusKey: 'item-1-1',
        onFocusedChildNodeChanges: (config) => {
            console.log(config)
        },
        onOut: {
            top: () => {
                setFocus('slider')
            },
            left: () => {
                setFocus('menu')
            },
        }
    })
```


## Demo

This is an example of how the focus looks in an application example. Click [here](https://github.com/Miquel-Lopez-Avila/nodes-navigation-focus-example) to see the full demo.

![App Screenshot](https://user-images.githubusercontent.com/75219640/189481193-62e21400-840a-4fd4-b0fe-314ae153ffe7.gif)

## Authors

- [@miquel-lopez-avila](https://github.com/Miquel-Lopez-Avila)


## License

Added GNU General Public License v3.0

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

