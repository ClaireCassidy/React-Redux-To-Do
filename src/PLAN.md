# Plan:

---

## Functionality

- The app will allow users to enter new to-do items via a submit form.
  - The to-do list items will have inputs for:
    - Text
    - Important (Y/N)
    - Date to be completed by
- The submitted to-do list items will be displayed in a list
  - The list will be paginated
    - Each page will consist of 8 items
    - The list itself will have two buttons for increasing and decreasing the pagination index
    - The list will also have a textbox for submitting a specific page to go to
  - The list will have a drop-down allowing users to select a sorting parameter
    - The sorting parameters will be:
      - DEFAULT - Newest First (Sort based on `dateAdded`)
      - Oldest First (The default state of the list)
      - Expires soon (sort by arithemtic difference between `dateToCompleteBy` and cur date (this will catch expired items with a negative time too). Any items will a `null` in this field should go to the end of the list)
      - Important (Items will be sorted first by newest, then by whether or not they have `important` true (result is newest added important items)).
  - The list will have several toggles to customise user experience:
    - Show completed to-dos? (No - filter list by those to-dos which are marked done)
    - Delete completed to-dos automatically? (Yes - onClick calls delete)
  - The list will have several action buttons:
    - Delete Expired To-Dos (Mass delete all to-dos w/ due date before cur date)
    - Delete Completed To-Dos (Mass delete all to-dos marked completed)
- Each to-do list task will be represented in its own to-do list item object
  - To-Do list items will have the following properties:
    - From form:
    - Text : string
    - Important (Y/N) : boolean
    - Date to be completed by : Date

```js
<input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00">
```

    - Implicitly on constructor:
      - Completed : boolean (false)
      - Index : index in list (= state.list.length)
    - Will be created in a reducer (so will have access to state) and contained in an object like:

```js
    {
        dateAdded: Date.now(),
        listIndex: state.list.length,
        text: "get milk",
        important: true/false,
        expires: [Date & time]
    }
```

- To-Do List items may be interacted with by the user
  - To-Do list items can be toggled completed or not completed by clicking the ☐/☑ icon
  - To-Do list items can be toggle important/not important by clicking the ☆/★ icon
  - To-Do list items can be deleted by clicking the ✖ icon.
    - For non-completed items, the user gets an alert asking to confirm

## Components:

1. App
2. To-Do List Submit Form (TdlItemSubmissionForm) - State variables: - textAreaVal (see https://stackoverflow.com/questions/42619553/how-to-get-the-selected-text-from-text-area-in-react) - importantCheckboxVal - dateInputVal
   https://reactjs.org/docs/forms.html

```jsx
    <Checkbox otherProps onChange={e => this.handleChange(e)} />
        => setState

    <button onClick={addToDoListItem(
        {
            text: textAreaVal

        }
    )}>
```

1. To-Do List (TdlList)
    - State:
        - paginationIndex :     int (=0)
        - sortBy          :     enum{dateAddedDesc, dateAddedAsc, expiresSoon, importantFirst} (=dateAddedDesc)
        - showCompletedTodos    : boolean (= true)
        - autoDeleteCompleted   : boolean (= false)
2. To-Do List Item (TdlItem)
    - State:
    
```js
  {
    dateAdded: Date.now(),
    listIndex: state.list.length,
    text: "get milk",
    important: true/false,
    expires: [Date & time]
  }
```

✎✎✏✐

## State Tree:
- toDoItems: array (= [])
- textAreaVal: string (= "")
- dateVal: string (= "")
- importantVal: boolean (= false)

## Technologies:
- React (Front end design)
- Redux (State management)
- Bootstrap (Styling)
````
